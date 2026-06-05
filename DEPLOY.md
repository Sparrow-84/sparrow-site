# Deploy & Launch Guide — Sparrow Website

This covers the account-level steps to take the site live: GitHub repo → Cloudflare
Pages → forms → domain cutover. Steps 1–4 are safe to do anytime (the current
WordPress site stays live the whole time). Step 6 (DNS cutover) is the only one that
touches the public domain — do it last.

---

## 1. Create the GitHub repo and push

The local repo is already initialized with a first commit. Create an **empty**
GitHub repo named `sparrow-website` (no README/license), then:

```bash
git remote add origin https://github.com/<org-or-user>/sparrow-website.git
git branch -M main
git push -u origin main
```

> Keep this repo separate from the private `SparrowVS` workspace — it deploys
> publicly and must never contain sensitive operational/legal files.

## 2. Connect Cloudflare Pages

1. Cloudflare dashboard → **Workers & Pages** → **Create** → **Pages** → **Connect to Git** → pick `sparrow-website`.
2. Build settings:
   - **Framework preset:** Astro
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
   - **Environment variable:** `NODE_VERSION = 20`
3. Save & Deploy. You'll get a live preview URL like `sparrow-website.pages.dev`.
4. Confirm the pipeline: push any small commit to `main` and watch it auto-deploy.
   **This is the Phase A "prove the pipeline" gate — don't move on until it's green.**

## 3. Environment variables (Cloudflare Pages → Settings → Variables)

| Variable | Value | Why |
|---|---|---|
| `PUBLIC_WEB3FORMS_KEY` | your Web3Forms access key | wires up the contact/volunteer/newsletter forms |
| `PUBLIC_NOINDEX` | `true` (preview only) | keeps the `*.pages.dev` staging site out of Google until cutover; remove/blank it on production |

After setting variables, redeploy so they take effect.

## 4. Forms — Web3Forms

1. Create a free account at [web3forms.com](https://web3forms.com) and verify the
   recipient inbox(es). Put the access key in `PUBLIC_WEB3FORMS_KEY` (step 3).
2. Configure **topic → inbox routing** so each inquiry reaches the person who owns
   that relationship (the "Human Relation Engine" principle). Recommended, based on
   the Google Workspace group setup:
   - **General** → a monitored inbox (Partnerships/Bethany or Ops/Susanna)
   - **Twin Oaks housing** → Resident Services group (Audrey)
   - **LifeChange Program** → Family Support group (Shelly/Audrey)
   - **Volunteering** → Family Support / volunteer coordinator
   - **Partnership** → Partnerships group (Bethany)
3. Submit a test message and confirm it arrives, and that `/thank-you` shows.
4. Newsletter: when the org's Brevo signup form is ready, set `NEWSLETTER.action` in
   `src/consts.ts` to the Brevo form URL. Until then signups route through Web3Forms.

## 5. Pre-launch confirmations (content)

The build pulled content from Sparrow's authoritative reference docs and flagged a
few items that conflicted with the old WordPress site. Confirm these with staff
before launch (search the code for `CONFIRM` / `TODO` comments):

- [ ] **Live inboxes** — which `@sparrowinc.org` addresses are real, monitored inboxes? `info@` is currently an *alias*. Update `CONTACT` in `src/consts.ts`. (`twinoaks@` / `lifechange@` need confirming too.)
- [ ] **Statement of faith** — replace the placeholder paragraph on `/about` with Sparrow's exact wording.
- [ ] **Twin Oaks eligibility** — confirm the 60% AMI criteria, any application fee, and the application steps before publishing (fair-housing sensitivity). Edit `src/content/programs/twin-oaks.md`.
- [ ] **Team** — confirm roles, and which staff/board members consent to a public listing + photo. Board members default to `public: false` in `src/content/team/`.
- [ ] **Testimonials** — confirm attribution and ongoing consent for the quotes in `src/content/testimonials/`.
- [ ] **Photos** — add real images under `public/images/`, then set `PHOTOS_READY = true` in `src/lib/media.ts`.
- [ ] **OG image** — drop a 1200×630 share image at `public/og-default.jpg` and point `Head.astro`'s default `ogImage` at it (currently the logo).

## 6. Domain cutover — DNS (do this LAST)

The single highest-risk step, because **`@sparrowinc.org` email runs on Google
Workspace**. A nameserver change that drops the mail records breaks all staff email.

1. **Confirm access.** The domain's DNS is currently on **DreamHost** (`ns1/2/3.dreamhost.com`). Confirm who holds the DreamHost (or registrar) login.
2. **Export the full DreamHost DNS zone first.** You must replicate **every non-web record** in Cloudflare before flipping nameservers — especially:
   - **MX** records (Google Workspace mail)
   - **SPF** (`TXT`), **DKIM**, and **DMARC** records
   - any existing subdomain records
3. In Cloudflare: add `sparrowinc.org` as a zone, let it import existing records, and **verify the mail records match the DreamHost export.**
4. In the Cloudflare Pages project, add the custom domain (`sparrowinc.org` + `www`).
5. Lower DNS TTLs ~24h ahead. In a low-traffic window, change nameservers at the registrar from DreamHost → Cloudflare. Keep WordPress reachable until propagation confirms.
6. **Immediately test sending and receiving `@sparrowinc.org` email.**
7. Reserve the future portal subdomains in Cloudflare DNS: `staff`, `portal`, `volunteer`.
8. Remove `PUBLIC_NOINDEX` from production, submit the sitemap in Google Search Console, and use Search Console to confirm the old→new 301s resolve.

## 7. Activating the portals later

When a Staff or Participant portal app exists: point its subdomain at the app's
host, then in `src/consts.ts` set that entry's `live: true` (and confirm the `url`).
The "Log in" page updates automatically — no other change needed.
