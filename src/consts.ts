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
  ein: '30-1210825',
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
  generalFund: 'https://givebutter.com/nzMxFi',
  communityCenter: 'https://givebutter.com/uK0uk8',
  hopeFund: 'https://givebutter.com/TT17Ds',
};

/** Public Form 990 (board-approved for the website, without Schedule B). Swap the link when a new year's 990 is filed. */
export const FORM_990_URL =
  'https://drive.google.com/file/d/1AzMU51V8ENawLdUaVEuB7l2ARBEF4f2u/view?usp=sharing';

/**
 * Credibility badges shown in the footer (and the Candid seal on About → Financial transparency).
 *
 * Candid: the seal image is served live by Candid, so it changes tier (Gold → Platinum) and
 * year on its own. Nothing to update here.
 *
 * GreatNonprofits: our own badge, NOT their embed code (theirs loads Google Ads/Analytics
 * tracking, which our privacy policy promises we don't use). The badge says "N five-star
 * reviews", which stays true even if not updated — new reviews can only make it out of date,
 * never wrong. Check the profile quarterly and bump `fiveStarReviews` to the current count
 * of FIVE-star reviews only.
 */
export const CANDID = {
  profileUrl:
    'https://app.candid.org/profile/9859589/sparrow-30-1210825/?pkId=64ea9e5e-3cd4-4d06-84f4-54f37c4fc256',
  sealSrc: 'https://widgets.guidestar.org/prod/v1/pdp/transparency-seal/9859589/svg',
};

export const GREATNONPROFITS = {
  profileUrl: 'https://greatnonprofits.org/org/sparrow',
  fiveStarReviews: 6, // last checked 2026-11-22
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

/** Newsletter — routes to Brevo's "TSM – New Website Signup" form, feeding the existing "The Sparrow Monthly" list. */
export const NEWSLETTER = {
  action: 'https://5891115d.sibforms.com/serve/MUIFAJqWjStg0b-BrEHusG7gqpocNsJWHVhA8ZLYY3gqgj89mRjtqhgBJ73CQ3Lux4T2WoFAFZ46ts0Fvia_NkNECIMmBZs6OE5UULfhgn7dl8QMJGJOv5NxPoVwGcpdirbz685Uo-UC0LTEbVG2PH7mdOdSBjKWTpT5CYp8cRpA6kZitnF-61-t5v_12KjTlVC-Ws55A6Rt6uhC',
};

/**
 * Google reCAPTCHA v2 (checkbox) site key for the Brevo newsletter signup form, registered
 * at google.com/recaptcha/admin as "Sparrow TSM Signup" (domain sparrowinc.org). Public-safe
 * by design — it only identifies which site is asking, unlike the matching secret key, which
 * lives solely in Brevo's own form settings (Brevo verifies the token server-side on its own
 * endpoint) and must never be added here.
 */
export const RECAPTCHA_SITE_KEY = '6LevD7ctAAAAACsq7Rv1Z7wWBzBSr0ueLY-vMvi9';

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
    url: 'https://staff.sparrowinc.org',
    live: true,
  },
  {
    key: 'participant',
    label: 'Participant Portal',
    blurb: 'For LifeChange families.',
    url: 'https://portal.sparrowinc.org',
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
