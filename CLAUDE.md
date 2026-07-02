@AGENTS.md

# SailGP — Pitch Deck Template

A single-page pitch deck template for **SailGP Germany**, structured for
handoff to **Forge**, a multi-tenant platform that injects AI-generated,
per-prospect content into the deck. Built by adapting the architecture
of the earlier `premier-padel-teaser` prototype (the Forge port took 17
minutes there — that speed came from the architecture, not the content).

---

## Stack

| Layer | Version | Notes |
|---|---|---|
| Next.js | 16.2.6 | Breaking changes from prior versions — see AGENTS.md |
| React | 19.2.4 | |
| TypeScript | 5.x | strict |
| Tailwind CSS | 4.x | PostCSS-based, **no `tailwind.config.js`** |
| Turbopack | bundled | dev bundler via `next dev` |
| Fonts | — | Days One (display) + Roboto (body), via `next/font/google` |

---

## Commands

```bash
npm run dev      # dev server with Turbopack
npm run build    # production build
npm run lint     # eslint
```

---

## Project structure

```
src/
  app/
    page.tsx          assembles the 13 rendered sections; USE_EXAMPLE_PROSPECT toggle
    layout.tsx        root layout, fonts, .template-sailgp-pitch wrapper
    globals.css       Tailwind base + reset
  sections/           one file per rendered section — PitchHero, PitchStats,
                      PitchTagline, PitchBrandStory, PitchMatchCards,
                      PitchCalendar, PitchActivations, PitchExperiences,
                      PitchBrandVisibility, PitchKeyRights, PitchNextSteps,
                      PitchMotivationLetter, PitchPioneers
  components/         reusable atoms (Nav, SectionDotNav, Reveal, Headline,
                      PrimaryButton, NoiseOverlay, …)
  lib/
    data.ts           SiteData schema + ProspectPayload type (15 sections)
    defaults.ts       defaultSiteData — the placeholder contract
    example-prospect.ts  worked HONOR fixture payload + mergeProspect
    animations.ts     useReveal, useScrolledPast
    render-utils.ts   isMeaningful / filterMeaningful / splitParagraphs
  styles/
    template.css      all template styles, scoped under .template-sailgp-pitch
```

---

## Content model — read this first

The page is **15 typed sections** (13 rendered, 2 typed-only):

```
hero → stats → tagline → brandStory → matchCards → calendar →
activations → experiences → brandVisibility → keyRights →
nextSteps → motivationLetter → pioneersTimeline
```

`valueMatch` and `matchPoints` stay in the schema and in Forge's payload
but are **not rendered** — see [pitch-deck-template-brief.md §4.6](pitch-deck-template-brief.md).
They remain available for a future pitch cockpit.

All content flows through `SiteData` in [src/lib/data.ts](src/lib/data.ts).
Never hardcode copy in section components — every value is a typed prop.

### Three content categories

Every field belongs to one of three structural buckets:

| Bucket | Meaning | In `defaults.ts` |
|---|---|---|
| 🟦 `prospect` | Changes per prospect — Forge's AI generates it | `{{PLACEHOLDER}}` tokens, **never** real values |
| 🟩 `tenant` | Fixed SailGP Germany property facts | Real values |
| 🟨 `editable` | Default copy a sales user may override | Real default copy |

Where a section divides cleanly, the type uses `prospect` / `tenant` /
`editable` sub-objects. Where a single row mixes buckets (e.g. each
`matchCards.items[i]` has `sailgpSide` tenant + `prospectSide` prospect),
the row stays whole to mirror the JSON Forge emits — the bucket of each
field is documented inline.

Never add `_`-prefixed fields — those are platform-owned.

### Hard constraints — template must survive regeneration

These rules let the template render any payload of this shape — long
copy, padded-empty arrays, packed multi-paragraph strings. See
[src/lib/render-utils.ts](src/lib/render-utils.ts) for the helpers that
enforce them.

1. **Element counts are fixed; layouts don't depend on them.** Reference
   counts: `matchCards.items` 6, `calendar.events` 6, `brandStory.sharedValues`
   3, `valueMatch.comparisons` 6, `matchPoints` 6, `activations.items` 6,
   `experiences.items` 3. Designed to look best at these counts; grids
   use auto-fit/minmax so any count works.
2. **No hardcoded text lengths.** Every text block wraps and overflows
   cleanly — no `line-clamp`, no fixed heights.
3. **Empty slots are filtered out.** Generators pad fixed arrays with
   empty strings (`paragraphs: ["...", "", ""]`, blank `details` entries).
   Components run every array through `filterMeaningful` so blanks render
   nothing.
4. **Multi-paragraph strings are split.** `splitParagraphs(str)` breaks
   on `\n\n` so packed prose renders as separate `<p>` elements.
5. **Graceful degradation.** Any missing field/section renders nothing.
6. **`valueMatch` and `matchPoints` are typed-but-unrendered.** No
   frontend component imports them.

### The Forge seam — how per-prospect content is injected

- **`defaults.ts`** is the contract: `tenant` + `editable` carry real
  values; every `prospect` field is a `{{PLACEHOLDER}}` token. Mixed-row
  arrays ship the tenant halves real and the prospect halves as tokens.
- **`ProspectPayload`** (data.ts) is the shape Forge's AI emits — every
  prospect bucket across the 15 sections.
- **`mergeProspect(defaultSiteData, payload)`** overlays a payload onto
  the defaults and returns a complete `SiteData`.
- **`example-prospect.ts`** is the worked HONOR example. Disposable
  preview content; HONOR appears ONLY here, never in `defaults.ts`.
- **`page.tsx`** has a `USE_EXAMPLE_PROSPECT` toggle — `true` renders the
  example, `false` renders the raw `{{PLACEHOLDER}}` contract.

**To wire up Forge:** replace `exampleProspect` with the real
AI-generated payload (or delete `example-prospect.ts` and call
`mergeProspect` with Forge's output). `data.ts`, `defaults.ts`, and every
component stay untouched.

---

## Styling conventions

- All custom styles in [src/styles/template.css](src/styles/template.css),
  scoped under `.template-sailgp-pitch`.
- Design tokens use the `--tp-*` namespace (colors, typography, layout).
- Signature gradient: `--tp-gradient: linear-gradient(90deg, #6614e3, #ff10da)`.
- Breakpoints (mobile-first): mobile ≤600px · tablet 601–1024px ·
  tablet-landscape 1025–1100px · desktop ≥1101px.
- Defaults are English-first (matches Forge's current export language).

---

## Animation system

Custom hooks in [src/lib/animations.ts](src/lib/animations.ts):

- `useReveal` — IntersectionObserver scroll-reveal. Respects
  `prefers-reduced-motion`, fires once.
- `useScrolledPast` — scroll-position watcher (Nav frosted-glass state).

`<Reveal>` / `<RevealLi>` in `src/components/` wrap `useReveal` for
standard fade/slide-up entrances. All animation hooks are `"use client"`
— any component importing them needs the directive too.

---

## Git

Never add a `Co-Authored-By` trailer to commit messages.

---

## Open items

- **SailGP brand assets** (logo, hero video) are TODO — `defaults.ts`
  points to `/sailgp/logo.svg` and `/sailgp/hero-video.mp4` slots. Port
  from the donor repo as a final pass.
- **Calendar dates** in `defaults.ts` come from the early Forge export —
  confirm against the official 2026 SailGP source before any deploy.
- **JSON-shape confirmation with Bernhard** — content will regenerate per
  prospect, but the field contract should not change after the template
  is built. Worth one confirmation before significant Forge integration.
