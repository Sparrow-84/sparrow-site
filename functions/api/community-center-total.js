// Cloudflare Pages Function: GET /api/community-center-total
//
// Returns how much has been given to the Twin Oaks Community Center campaign
// THROUGH GIVEBUTTER, so the /community-center progress bar stays current.
// Gifts made outside GiveButter are added on the page from
// COMMUNITY_CENTER.raisedOutsideGivebutter in src/consts.ts.
//
// Needs the GIVEBUTTER_API_KEY secret (Cloudflare Pages > sparrow-site >
// Settings > Variables and secrets). Never expose the key to the browser:
// this function only ever returns the single campaign total.
//
// The answer is cached for 10 minutes so page views don't hit GiveButter each time.

const CAMPAIGN_CODE = 'uK0uk8'; // from https://givebutter.com/uK0uk8
const CACHE_SECONDS = 600;

function json(body, maxAge) {
  return new Response(JSON.stringify(body), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': `public, max-age=${maxAge}`,
    },
  });
}

export async function onRequestGet({ env, request, waitUntil }) {
  const cache = caches.default;
  const cacheKey = new Request(new URL('/api/community-center-total', request.url).toString());
  const hit = await cache.match(cacheKey);
  if (hit) return hit;

  if (!env.GIVEBUTTER_API_KEY) return json({ raised: null, error: 'not-configured' }, 60);

  try {
    let url = 'https://api.givebutter.com/v1/campaigns';
    let campaign = null;
    // Follow pagination until the campaign turns up (Sparrow has only a few campaigns).
    for (let page = 0; page < 10 && url && !campaign; page++) {
      const res = await fetch(url, {
        headers: { Authorization: `Bearer ${env.GIVEBUTTER_API_KEY}`, Accept: 'application/json' },
      });
      if (!res.ok) throw new Error(`GiveButter responded ${res.status}`);
      const body = await res.json();
      campaign = (body.data ?? []).find(
        (c) => c.code === CAMPAIGN_CODE || String(c.url ?? '').endsWith(`/${CAMPAIGN_CODE}`),
      );
      url = body.links?.next ?? null;
    }
    if (!campaign) return json({ raised: null, error: 'campaign-not-found' }, 300);

    const response = json({ raised: Number(campaign.raised) || 0 }, CACHE_SECONDS);
    waitUntil(cache.put(cacheKey, response.clone()));
    return response;
  } catch (err) {
    console.error('community-center-total:', err);
    return json({ raised: null, error: 'unavailable' }, 60);
  }
}
