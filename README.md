# SailGP — Pitch Deck Template

A single-page pitch deck template for **SailGP Germany**, structured for
handoff to **Forge** — a multi-tenant platform that injects AI-generated,
per-prospect content into the deck.

## Stack

- **Next.js 16.2.6** (App Router, Turbopack) · **React 19.2.4** · **TypeScript** (strict)
- **Tailwind 4** — reset/preflight only; all template styles in [src/styles/template.css](src/styles/template.css), scoped under `.template-sailgp-pitch`
- **Days One** + **Roboto** via `next/font/google`
- Scroll animations via IntersectionObserver ([src/lib/animations.ts](src/lib/animations.ts)) — no animation library

## Running locally

```bash
npm install
npm run dev      # http://localhost:3000
npm run build    # production build
npm start        # production server
npm run lint     # eslint
```

## The 13 rendered sections

```
hero → stats → tagline → brandStory → matchCards → calendar →
activations → experiences → brandVisibility → keyRights →
nextSteps → motivationLetter → pioneersTimeline
```

`valueMatch` and `matchPoints` are typed-but-unrendered — they stay in
the payload contract for a future pitch cockpit (see
[pitch-deck-template-brief.md §4.6](pitch-deck-template-brief.md)).

## Content model

All content flows through `SiteData` ([src/lib/data.ts](src/lib/data.ts)).
Every field belongs to one of three buckets:

- 🟦 **`prospect`** — changes per prospect; Forge's AI generates it. `{{PLACEHOLDER}}` tokens in `defaults.ts`.
- 🟩 **`tenant`** — fixed SailGP Germany property facts. Real values in `defaults.ts`.
- 🟨 **`editable`** — default copy a sales user can override.

### The Forge seam

| File | Role |
|---|---|
| [src/lib/data.ts](src/lib/data.ts) | `SiteData` schema + `ProspectPayload` (the shape Forge's AI emits) |
| [src/lib/defaults.ts](src/lib/defaults.ts) | `defaultSiteData` — the contract: tenant + editable filled, prospect = tokens |
| [src/lib/example-prospect.ts](src/lib/example-prospect.ts) | A worked example payload (HONOR) + `mergeProspect` overlay |
| [src/app/page.tsx](src/app/page.tsx) | `USE_EXAMPLE_PROSPECT` toggle — example preview vs. raw tokens |
| [src/lib/render-utils.ts](src/lib/render-utils.ts) | `isMeaningful` / `filterMeaningful` / `splitParagraphs` — the helpers every section uses to handle empty slots and packed multi-paragraph strings |

`mergeProspect(defaultSiteData, payload)` overlays a prospect payload on
the defaults — exactly the runtime model Forge follows. **To go live:**
swap `exampleProspect` for Forge's real AI payload; `data.ts`,
`defaults.ts`, and the components stay untouched.

See [CLAUDE.md](CLAUDE.md) for the full architecture notes, including the
hard constraints the template must satisfy to survive Forge regeneration.

## Open items

- **SailGP brand assets** (logo, hero video) are TODO — `defaults.ts` points
  to `/sailgp/logo.svg` and `/sailgp/hero-video.mp4` slots.
- **Calendar dates** in `defaults.ts` come from the early Forge export —
  confirm against the official 2026 SailGP source before any deploy.
- **Confirm JSON shape stability with Bernhard** before deeper Forge work.
- **Browser QA:** run `npm run build && npm start`, check Chrome + Safari
  at desktop and 390px before declaring "ready".
