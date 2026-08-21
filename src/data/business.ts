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

  // PLACEHOLDER — the entire site is tap-to-call. Must be real before launch.
  phone: '705-000-0000',
  phoneHref: 'tel:+17050000000',
  smsHref: 'sms:+17050000000',
  email: '', // PLACEHOLDER: leave empty to hide email CTAs entirely

  baseCity: 'Orillia',
  baseRegion: 'ON',
  baseRegionFull: 'Ontario',
  baseCountry: 'CA',
  // No street address published: mobile-only service businesses should use a
  // service-area profile, not a storefront address.
  serviceRadiusKm: 100, // PLACEHOLDER: confirm

  // PLACEHOLDER: confirm real hours. Format is used for both display + schema.
  hours: [
    { days: 'Monday – Friday', display: '8:00 am – 6:00 pm', schema: ['Mo', 'Tu', 'We', 'Th', 'Fr'], open: '08:00', close: '18:00' },
    { days: 'Saturday', display: '9:00 am – 4:00 pm', schema: ['Sa'], open: '09:00', close: '16:00' },
    { days: 'Sunday', display: 'By appointment', schema: ['Su'], open: '00:00', close: '00:00' },
  ],
  afterHours: true, // PLACEHOLDER: confirm emergency/after-hours availability

  yearsInBusiness: null as number | null, // PLACEHOLDER: set a number to display it
  licence: '' as string, // PLACEHOLDER: e.g. '310S Licensed Automotive Technician'

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
