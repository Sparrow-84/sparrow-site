/**
 * Single source of truth for site-wide config, external URLs, and contact routing.
 *
 * Non-developers: most "where does this link/button go?" answers live in THIS file.
 * Change a value here and it updates everywhere it's used. You should rarely need
 * to touch the page or component files for a URL or address change.
 */

export const SITE = {
  name: 'Sparrow Inc.',
  shortName: 'Sparrow',
  url: 'https://sparrowinc.org',
  tagline: 'Where hope is found.',
  description:
    'Sparrow is a faith-based nonprofit in Corvallis, Oregon, walking families out of homelessness through affordable housing at Twin Oaks and the LifeChange Program.',
  verse:
    '"Even the sparrow has found a home, and the swallow a nest for herself." — Psalm 84:3 (NIV)',
};

export const ORG = {
  legalName: 'Sparrow Inc.',
  incorporated: 2019,
  address: {
    street: '245 SW Twin Oaks Circle',
    city: 'Corvallis',
    state: 'OR',
    zip: '97333',
  },
};

/** Donations — existing GiveButter campaigns. Swap a URL here if the processor ever changes. */
export const GIVEBUTTER = {
  communityCenter: 'https://givebutter.com/uK0uk8',
  hopeFund: 'https://givebutter.com/TT17Ds',
};

export const SOCIAL = {
  facebook: 'https://www.facebook.com/sparrowcorvallis',
  instagram: 'https://www.instagram.com/sparrowcorvallis/',
};

/**
 * Public-facing contact addresses + phones.
 * ⚠️ CONFIRM each email is a LIVE, MONITORED inbox before launch (plan reconciliation #5).
 *    `info@` is currently a Google Workspace ALIAS, not its own inbox — confirm where it lands.
 *    Phones are verified: Twin Oaks (541) 753-3334, LifeChange 971-209-2450.
 */
export const CONTACT = {
  general: { email: 'info@sparrowinc.org', label: 'General' },
  twinOaks: { email: 'twinoaks@sparrowinc.org', phone: '(541) 753-3334', label: 'Twin Oaks housing' },
  lifeChange: { email: 'lifechange@sparrowinc.org', phone: '(971) 209-2450', label: 'LifeChange Program' },
};

/**
 * Web3Forms access key. Public-safe by design: the key maps to a verified recipient
 * inbox configured in the Web3Forms dashboard, so staff emails never appear in page
 * source. Set PUBLIC_WEB3FORMS_KEY in the environment (Cloudflare Pages → Settings →
 * Environment variables). Configure topic→inbox routing in the Web3Forms dashboard:
 *   General → a monitored inbox (e.g. Partnerships/Bethany or Ops/Susanna)
 *   Twin Oaks housing → Resident Services group (Audrey)
 *   LifeChange → Family Support group (Shelly/Audrey)
 *   Volunteer → Family Support / volunteer coordinator
 *   Partnership → Partnerships group (Bethany)
 */
export const WEB3FORMS_KEY =
  import.meta.env.PUBLIC_WEB3FORMS_KEY ?? 'YOUR-WEB3FORMS-ACCESS-KEY';

/** Newsletter — route to the org's existing email tool (Brevo). Fill in the real action URL. */
export const NEWSLETTER = {
  action: '', // TODO: Brevo subscribe form action URL
};

/** Merchandise store — the site's own Shop page (which links out to the live Printify store). */
export const SHOP_URL = '/shop';

/**
 * "Single front door" — login entry points to FUTURE apps that don't exist yet.
 * When a portal ships: confirm its `url`, flip `live` to true. Nothing else changes.
 */
export const PORTALS = [
  {
    key: 'staff',
    label: 'Staff Portal',
    blurb: 'For Sparrow staff.',
    // Staging host; swap to https://staff.sparrowinc.org once the custom domain is set up.
    url: 'https://sparrow-staff-portal-b3o.pages.dev',
    live: true,
  },
  {
    key: 'participant',
    label: 'Participant Portal',
    blurb: 'For LifeChange families.',
    // Staging host; swap to https://portal.sparrowinc.org once the custom domain is set up
    // (then update Supabase Auth → URL Configuration to match).
    url: 'https://sparrow-lcp-portal-aj7.pages.dev',
    live: true,
  },
  {
    key: 'volunteer',
    label: 'Volunteer & Board',
    blurb: 'For volunteers and board members.',
    url: 'https://volunteer.sparrowinc.org',
    live: false,
  },
] as const;

/** Primary navigation. */
export const NAV = [
  { label: 'About', href: '/about' },
  { label: 'LifeChange', href: '/life-change-program' },
  { label: 'Twin Oaks', href: '/twin-oaks' },
  { label: 'Get Involved', href: '/get-involved' },
  { label: 'Contact', href: '/contact' },
  { label: 'Shop', href: '/shop' },
];
