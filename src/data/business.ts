/**
 * SINGLE SOURCE OF TRUTH for every business fact on the site.
 *
 * Anything marked PLACEHOLDER is a guess and MUST be confirmed by the owner
 * before this site goes live. Nothing here is invented trust signalling —
 * credentials, ratings and review counts are left empty until verified.
 */

export const business = {
  name: 'Mobile Mechanic On The Go',
  legalName: 'Mobile Mechanic On The Go', // PLACEHOLDER: confirm registered trade name
  tagline: 'The shop comes to you.',

  phone: '416-897-8653',
  phoneHref: 'tel:+14168978653',
  smsHref: 'sms:+14168978653',
  email: '', // PLACEHOLDER: leave empty to hide email CTAs entirely

  baseCity: 'Orillia',
  baseRegion: 'ON',
  baseRegionFull: 'Ontario',
  baseCountry: 'CA',
  // No street address published: mobile-only service businesses should use a
  // service-area profile, not a storefront address.
  serviceRadiusKm: 100, // PLACEHOLDER: confirm

  // Confirmed by the owner: open seven days, 7:00 am every morning, 7:00 pm
  // close on weekdays and 9:00 pm on weekends. One row per distinct block —
  // `display` is the visible string, `schema` + `open`/`close` feed the
  // opening-hours structured data. A row where `open` equals `close` is treated
  // as "not really open" and left out of the schema entirely.
  hours: [
    { days: 'Monday – Friday', display: '7:00 am – 7:00 pm', schema: ['Mo', 'Tu', 'We', 'Th', 'Fr'], open: '07:00', close: '19:00' },
    { days: 'Saturday – Sunday', display: '7:00 am – 9:00 pm', schema: ['Sa', 'Su'], open: '07:00', close: '21:00' },
  ],
  afterHours: true, // PLACEHOLDER: confirm emergency/after-hours availability

  yearsInBusiness: null as number | null, // PLACEHOLDER: set a number to display it
  // Empty on purpose: no licence or trade ticket is claimed anywhere on the
  // site. Leaving this blank hides the About credentials block and keeps the
  // footer wording to plain 'Mobile automotive service'. Set it to the exact
  // ticket held (e.g. '310S Licensed Automotive Technician') ONLY if that
  // licence is genuinely held and the owner wants it published.
  licence: '' as string,

  // Left null on purpose. Never publish a star rating you cannot verify.
  rating: null as number | null,
  reviewCount: null as number | null,

  social: {
    google: 'https://www.google.com/search?kgmid=/g/11ym0jknxy',
    facebook: '', // PLACEHOLDER
    instagram: '', // PLACEHOLDER
  },

  siteUrl: 'https://mobilemechaniconthego.ca', // PLACEHOLDER: confirm domain
} as const;

export const hasEmail = business.email.length > 0;
export const hasLicence = business.licence.length > 0;
