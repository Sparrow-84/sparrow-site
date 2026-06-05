# Sparrow Inc. Website

The public website for [sparrowinc.org](https://sparrowinc.org) — built with
[Astro](https://astro.build) + Tailwind CSS, deployed on Cloudflare Pages.

It's designed to be **edited by prompting Claude in VS Code**. Most everyday
changes are just edits to small text files; you rarely need to touch the layout.

## Editing the site (the short version)

| I want to change… | Edit this |
|---|---|
| A link, email, phone, donate button, or social URL | `src/consts.ts` |
| The team list | `src/content/team/` (one file per person) |
| The core values | `src/content/values/` |
| Program details (Twin Oaks / LifeChange) | `src/content/programs/` |
| Testimonials | `src/content/testimonials/` |
| FAQ questions & answers | `src/content/faqs/` |
| Impact stats on the home page | `src/content/stats/` |
| The wording on a page | the matching file in `src/pages/` |

Each content file has a small `--- frontmatter ---` block at the top (settings)
and the text below it. If you're unsure, ask Claude: *"update the LifeChange
program contact email"* and it will find the right file.

## Activating the staff & participant portals later

The "Log in" page shows placeholder cards. When a portal is ready, open
`src/consts.ts`, find `PORTALS`, set that portal's `live: true`, and confirm its
`url`. Nothing else needs to change.

## Adding photos

Real photos go in `public/images/...`. Once they're in place, open
`src/lib/media.ts` and set `PHOTOS_READY = true`. Until then the site shows clean
branded placeholders instead of broken images.

## Running locally

```bash
npm install      # first time only
npm run dev      # preview at http://localhost:4321
npm run build    # production build into dist/
npm run check    # type-check content + components
```

## Deploying

Every push to the `main` branch on GitHub auto-deploys to Cloudflare Pages.
See `DEPLOY.md` for first-time setup and the domain cutover checklist.

## Before launch — items to confirm

A few content details were flagged during the build and need confirmation from
staff before going live (see `DEPLOY.md` → "Pre-launch confirmations"): which
`@sparrowinc.org` inboxes are live and monitored, the exact statement of faith,
Twin Oaks eligibility specifics, and team photos/consent.
