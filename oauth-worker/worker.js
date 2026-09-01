/**
 * GitHub OAuth handshake for the Decap CMS photo manager at /admin.
 *
 * The site is static, so the CMS runs entirely in the browser and talks to the
 * GitHub API itself. Only one step cannot happen there: swapping the OAuth code
 * for an access token requires the client secret, and a secret shipped to a
 * browser is not a secret. This worker is that one step and nothing else.
 *
 * It never sees the repository and never stores anything. The token it returns
 * goes straight to the CMS tab that asked for it.
 *
 * Two routes:
 *   GET /auth      — sends the user to GitHub to approve access
 *   GET /callback  — GitHub returns here; exchange the code, hand back the token
 *
 * Deploy: see "Photo manager" in the README.
 * Required secrets: GITHUB_CLIENT_ID, GITHUB_CLIENT_SECRET
 */

/**
 * Only these origins may receive a token, so a copied callback link cannot
 * harvest one. Both are listed so the cutover to the custom domain needs no
 * redeploy: the popup offers the handshake to each, and replies only to the
 * origin that actually answers. Drop the github.io entry once the domain is
 * live and the old URL is no longer used.
 */
const ALLOWED_ORIGINS = [
  'https://onthegomechanic.ca',
  'https://muskoka-boost.github.io',
];

const html = (body, status = 200) =>
  new Response(`<!doctype html><meta charset="utf-8">${body}`, {
    status,
    headers: { 'content-type': 'text/html; charset=utf-8' },
  });

/** Random, URL-safe, and long enough that guessing it is not a strategy. */
const newState = () => {
  const bytes = crypto.getRandomValues(new Uint8Array(24));
  return btoa(String.fromCharCode(...bytes)).replace(/\+/g, '-').replace(/\//g, '_').replace(/=/g, '');
};

const readCookie = (request, name) => {
  const header = request.headers.get('Cookie') || '';
  const hit = header.split(';').map((c) => c.trim()).find((c) => c.startsWith(`${name}=`));
  return hit ? hit.slice(name.length + 1) : null;
};

export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (!env.GITHUB_CLIENT_ID || !env.GITHUB_CLIENT_SECRET) {
      return html('<p>This worker is missing GITHUB_CLIENT_ID or GITHUB_CLIENT_SECRET.</p>', 500);
    }

    // Step 1 — hand off to GitHub.
    if (url.pathname === '/auth') {
      const state = newState();
      const authorize = new URL('https://github.com/login/oauth/authorize');
      authorize.searchParams.set('client_id', env.GITHUB_CLIENT_ID);
      authorize.searchParams.set('redirect_uri', `${url.origin}/callback`);
      // `repo` is the narrowest scope that can commit to a private or public
      // repository. The CMS cannot write photos with anything less.
      authorize.searchParams.set('scope', 'repo');
      authorize.searchParams.set('state', state);

      return new Response(null, {
        status: 302,
        headers: {
          Location: authorize.toString(),
          // Host-only, short-lived, and not readable from JavaScript.
          'Set-Cookie': `oauth_state=${state}; HttpOnly; Secure; SameSite=Lax; Path=/; Max-Age=600`,
        },
      });
    }

    // Step 2 — GitHub sends the user back with a code.
    if (url.pathname === '/callback') {
      const code = url.searchParams.get('code');
      const state = url.searchParams.get('state');
      const expected = readCookie(request, 'oauth_state');

      if (!code) return html('<p>GitHub did not return an authorization code. Close this window and try again.</p>', 400);
      if (!state || !expected || state !== expected) {
        return html('<p>This login could not be verified. Close this window and try again.</p>', 400);
      }

      const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify({
          client_id: env.GITHUB_CLIENT_ID,
          client_secret: env.GITHUB_CLIENT_SECRET,
          code,
          redirect_uri: `${url.origin}/callback`,
        }),
      });

      const data = await tokenResponse.json().catch(() => ({}));
      if (!data.access_token) {
        return html('<p>GitHub refused to issue a token. Close this window and try again.</p>', 502);
      }

      // Decap opens this page in a popup and waits to be spoken to. It answers
      // the "authorizing" ping, then the token is posted back to the CMS tab.
      const payload = JSON.stringify({ token: data.access_token, provider: 'github' });
      return html(
        `<p>Signed in. You can close this window.</p>
<script>
  (function () {
    var payload = ${JSON.stringify(payload)};
    var allowed = ${JSON.stringify(ALLOWED_ORIGINS)};
    function handshake(event) {
      // Reply only to an origin on the list, and only to the one that answered
      // — never to '*', which would hand the token to any page that opened us.
      if (allowed.indexOf(event.origin) === -1) return;
      window.opener.postMessage('authorization:github:success:' + payload, event.origin);
      window.removeEventListener('message', handshake, false);
    }
    window.addEventListener('message', handshake, false);
    // The CMS is on exactly one of these; the others simply never answer.
    allowed.forEach(function (origin) {
      window.opener.postMessage('authorizing:github', origin);
    });
  })();
</script>`,
        200,
      );
    }

    return html('<p>Nothing here. This worker only handles /auth and /callback.</p>', 404);
  },
};
