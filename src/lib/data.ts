/*
 * Typed content schema for the SailGP pitch deck template — Forge-aligned.
 *
 * The 15 top-level sections match the JSON payload Forge emits per pitch:
 *
 *   hero → stats → tagline → calendar → keyRights → nextSteps → brandStory
 *   → matchCards → valueMatch → activations → experiences → matchPoints
 *   → brandVisibility → motivationLetter → pioneersTimeline
 *
 * `tagline` is a loose root-level string, distinct from `hero.tagline`.
 *
 * THREE-BUCKET CATEGORY SYSTEM
 *
 * Every field belongs to one of three structural buckets:
 *
 *   prospect  🟦  Changes per prospect. Forge's AI fills these per pitch.
 *                 In defaults.ts these are {{PLACEHOLDER}} tokens — never
 *                 real values.
 *   tenant    🟩  Fixed SailGP Germany property facts. Real values in
 *                 defaults.ts.
 *   editable  🟨  Default copy a sales user may override per pitch.
 *
 * Where a section's fields divide cleanly into buckets, the type uses
 * `prospect` / `tenant` / `editable` sub-objects (e.g. `hero`, `calendar`,
 * `motivationLetter`).
 *
 * Where a single row mixes buckets — e.g. each `sharedValues` entry has
 * tenant fields (`core`, `property`) AND a prospect field (`prospect`),
 * or each `matchCards` entry has `sailgpSide` (tenant) AND `prospectSide`
 * (prospect) — the row is kept whole to mirror the JSON shape Forge emits.
 * The bucket of each field is documented inline. This avoids a runtime
 * transform between Forge's output and the renderer.
 *
 * Do NOT add `_`-prefixed fields — those are platform-owned.
 *
 * HARD CONSTRAINTS (see pitch-deck-template-brief.md §4):
 *   - Element counts are fixed but layouts must not hardcode them.
 *   - No hardcoded text lengths — every block must wrap & overflow cleanly.
 *   - Empty array slots must be filtered out at render time.
 *   - Multi-paragraph strings packed with \n\n must be split at render.
 *   - Any missing field/section renders nothing (graceful degradation).
 *   - `valueMatch` and `matchPoints` stay typed but are NOT rendered as
 *     frontend sections — see brief §4.6. They remain available for a
 *     future pitch cockpit.
 *   - Stat values stay strings (preserve seller formatting: "$10B",
 *     "100+", "5/5").
 */

// ----- Primitives ---------------------------------------------------------

export type HeadlineSpan = {
  text: string;
  highlight?: boolean;
};

/** Lightweight rich-text shape; at most one highlighted span per headline. */
export type HighlightedHeadline = {
  parts: HeadlineSpan[];
};

export type Cta = {
  label: string;
  /** href starting with '#' scrolls smoothly in-page; others open as-is. */
  href: string;
};

export type Asset = {
  src: string;
  alt?: string;
};

/** A video reference. Forge prefers `muxPlaybackId`; `src` is a /public file. */
export type PropertyVideo = {
  src?: string;
  muxPlaybackId?: string;
  poster?: string;
};

// ----- Section 1 — hero ---------------------------------------------------

export type HeroSection = {
  prospect: {
    /** Short prospect name used in the sticky top banner, e.g. "HONOR". */
    partnerName: string;
    /** Eyebrow tag above the headline, e.g. "AI Devices, Racing Intelligence". */
    badge: string;
    /** Loose copy slug paired with the badge — may equal `badge` in some payloads. */
    tagline: string;
    /** "\n" inside .text breaks render as line breaks (whitespace-pre-line). */
    headline: HighlightedHeadline;
    subheadline: string;
    /** Prospect logo for the partnership lockup. Omit → tenant-only lockup. */
    partnerLogo?: Asset;
    /** AI-generated hero background. Omit → tenant fallback. */
    backgroundImage?: Asset;
  };
  tenant: {
    /** Wordmark lockup (Property × subjectline). */
    wordmark: { left: string; cross: string; right: string };
    subLabel: string;
    logo: Asset;
    /** Looping property video used as the hero background fallback. */
    backgroundVideo?: PropertyVideo;
  };
  editable: {
    /** Lead-in for the partner lockup, e.g. "Exclusively prepared for". */
    partnerLabel: string;
    /** Bottom-left banner micro-label, e.g. "Confidential". */
    confidentialLabel?: string;
    /** Top-center banner copy, e.g. "Exclusive SailGP Partnership". */
    bannerCenterLabel?: string;
    cta?: Cta;
  };
};

// ----- Section 2 — stats --------------------------------------------------

export type StatItem = {
  _key?: string;
  tier?: string;
  label: string;
  value: string;
  suffix?: string;
  source?: string;
};

export type StatsSection = {
  /** Forge replaces the secondary stats per pitch. */
  prospect: {
    items_secondary_replacements: StatItem[];
  };
  tenant: {
    /**
     * Background video for the About section. `src` is rendered as an
     * iframe — pass a full embed URL (e.g. Vimeo player URL with
     * background/autoplay/loop/muted params).
     */
    video?: { src: string; title?: string };
  };
  editable: {
    label?: string;
    /**
     * NOT RENDERED — the About redesign dropped the section heading in
     * favour of the full-bleed video + stats marquee. Kept on the type
     * so Forge payloads don't break; reintroduce a heading element in
     * PitchStats.tsx if it returns.
     */
    headline?: string;
  };
};

// ----- Section 3 — tagline (loose root-level string) ----------------------

/**
 * Loose root-level tagline string — distinct from `hero.tagline`. Lives
 * at the top level of the payload (per the JSON), so it is typed as a
 * bare string rather than a section object. Prospect-flavoured.
 *
 * NOT RENDERED — there is no PitchTagline section in page.tsx. The field
 * stays in the schema/contract so Forge keeps emitting it, but no
 * component currently reads it.
 */
export type TaglineSection = string;

// ----- Section 4 — calendar -----------------------------------------------

export type CalendarEvent = {
  _key?: string;
  /** 🟩 tenant — fixed race facts. */
  date: string;
  /**
   * 🟩 tenant — race name (e.g. "Sydney race"). Used by PitchCalendar
   * only as a row-filter signal (`e.name || e.location`); the rendered
   * card shows `location` instead. Kept on the type because Forge's
   * JSON includes it.
   */
  name: string;
  country: string;
  location: string;
  /** 🟦 prospect — market/audience angle tailored per pitch. */
  highlightNote?: string;
  /** 🟦 prospect — flag races that matter most to this prospect. */
  isHighlighted?: boolean;
};

/**
 * Calendar rows mix tenant + prospect fields. The whole row is kept at
 * the section root (matching the JSON), not nested under tenant/prospect.
 * Bucket per field documented on `CalendarEvent`.
 */
export type CalendarSection = {
  events: CalendarEvent[];
  editable?: {
    label?: string;
    headline?: string;
  };
};

// ----- Section 5 — keyRights (Partnership Structure) ---------------------

/**
 * A single slot inside a partnership tier.
 *
 *  - "partner"  — confirmed external partner; logo + name on tenant.
 *  - "prospect" — slot offered to this prospect. The component renders the
 *                 prospect's logo (from hero.prospect.partnerLogo) and
 *                 highlights the slot as the proposed placement.
 *  - "open"     — no occupant; rendered as "Slot in discussion".
 */
export type PartnershipSlot = {
  _key?: string;
  kind: "partner" | "prospect" | "open";
  /** Logo asset for confirmed partners. */
  logo?: Asset;
  /** Display name; used as fallback when no logo is available. */
  name?: string;
};

/** One row of the partnership-structure grid. Tier name + N slots. */
export type PartnershipTier = {
  _key?: string;
  /** Tier label, e.g. "Title Partner". */
  name: string;
  slots: PartnershipSlot[];
};

/**
 * Partnership Structure section. Tenant owns the tier definitions and
 * confirmed partners; Forge flips one or more slot `kind`s to "prospect"
 * to mark where this prospect is being offered placement.
 *
 * `prospect.items` is the legacy bullet-list content from the previous
 * "Rights" layout — NOT RENDERED by the tier layout, but kept on the
 * type so existing Forge payloads (and example-prospect.ts) still match.
 */
export type KeyRightsSection = {
  tenant: {
    tiers: PartnershipTier[];
  };
  editable: {
    label?: string;
    /** Headline supports an accent span (e.g. "Global or Official Partner"). */
    headline?: HighlightedHeadline;
  };
  prospect?: {
    items?: string[];
  };
};

// ----- Section 6 — nextSteps (Pricing Packages) --------------------------

/** A single line item in a package's cost breakdown. */
export type PricingBreakdownItem = {
  _key?: string;
  /** Description of what the line represents, e.g. "Inner-hull logo placement". */
  label: string;
  /** Value, formatted however Forge emits it — "€450,000", "Included", "—". */
  value: string;
};

/** One pricing tier card. */
export type PricingPackage = {
  _key?: string;
  /** Tier name, e.g. "Global Partner". */
  name: string;
  /** Optional one-line pitch beneath the name. */
  tagline?: string;
  /** Headline price (no currency formatting assumptions), e.g. "€2,500,000". */
  packageValue: string;
  /** Suffix on the headline price, e.g. "/ year" or "per season". */
  packageValueSuffix?: string;
  /** Contract term, e.g. "3 years". */
  contractTerm: string;
  /** Annual scaling description, e.g. "+5% per year" or a multi-year table summary. */
  annualScaling: string;
  /** Included rights bullets — short, scannable. */
  keyRights: string[];
  /** Cost line items. Include a "Total" row here if you want one rendered. */
  breakdown: PricingBreakdownItem[];
  /** Mark this card as the recommended/highlighted option. */
  isRecommended?: boolean;
};

export type NextStepsSection = {
  prospect: {
    packages: PricingPackage[];
  };
  editable: {
    label?: string;
    headline?: string;
  };
};

// ----- Section 7 — brandStory ---------------------------------------------

export type SharedValueRow = {
  _key?: string;
  /** 🟩 tenant — value name, e.g. "INNOVATION". */
  core: string;
  /** 🟩 tenant — how SailGP embodies the value. */
  property: string;
  /** 🟦 prospect — how the prospect embodies the same value. */
  prospect: string;
};

export type BrandHighlight = {
  label: string;
  value: string;
};

/**
 * One "brand block" — used identically for the prospect side AND the
 * tenant side of the Pioneers two-card layout. Same shape on both sides
 * so the renderer can treat the cards symmetrically.
 */
export type BrandBlock = {
  name: string;
  title: string;
  highlights: BrandHighlight[];
  /** Some entries may pack multiple paragraphs with `\n\n`. */
  paragraphs: string[];
  foundingYear?: string;
  foundingLocation?: string;
  /** Card hero image; falls back to a solid card surface when empty. */
  backgroundImage?: Asset;
};

/** Back-compat alias: existing code refers to `ProspectBrand`. */
export type ProspectBrand = BrandBlock;

export type BrandStorySection = {
  /**
   * Shared-value rows mix tenant + prospect fields per row. The whole row
   * is kept (matching JSON shape); bucket per field documented on
   * `SharedValueRow`.
   *
   * Currently typed-but-unrendered — the brand-story section now renders
   * as a two-card "Pioneers" layout (see PitchBrandStory). The sharedValues
   * data still flows in the payload for cockpit/Forge use.
   */
  sharedValues: SharedValueRow[];
  /** Entirely prospect-owned. */
  prospectBrand: BrandBlock;
  /** Tenant counterpart — SailGP Germany's brand block. */
  tenantBrand?: BrandBlock;
  editable?: {
    label?: string;
    /** Section heading with one highlight span (matches hero pattern). */
    headline?: HighlightedHeadline;
    subheadline?: string;
  };
};

// ----- Section 8 — matchCards ---------------------------------------------

export type MatchCard = {
  _key?: string;
  /** 🟦 prospect — single-line pitch of the match. */
  tagline: string;
  /** 🟦 prospect — category tag, e.g. "human potential". */
  category: string;
  /**
   * NOT RENDERED — the three `hero*` fields drove a numeric alignment
   * score (e.g. "Alignment: 5/5") in the pre-Venn match-card layout.
   * The current scroll-driven Venn diagram (commit 27ffa87) doesn't
   * surface them. Left on the type to keep the Forge payload contract
   * stable; bring them back in PitchMatchCards.tsx if a future variant
   * needs the score.
   *
   * 🟨 editable — fixed UI label ("Alignment").
   */
  heroLabel: string;
  /** NOT RENDERED — see `heroLabel`. 🟦 prospect — kept as a string to preserve seller formatting ("5/5"). */
  heroValue: string;
  /** NOT RENDERED — see `heroLabel`. 🟦 prospect — suffix on the alignment hero number. */
  heroSuffix: string;
  /** 🟩 tenant — SailGP side of the comparison. */
  sailgpSide: string;
  /** 🟦 prospect — prospect side of the comparison. */
  prospectSide: string;
};

export type MatchCardsSection = {
  /**
   * Mixed-row entries: tenant `sailgpSide` + prospect `prospectSide` plus
   * prospect tagline/category/heroValue. Whole row stays intact to mirror
   * Forge's JSON. Bucket categorization per field on `MatchCard`.
   */
  items: MatchCard[];
  editable?: {
    label?: string;
    headline?: string;
  };
};

// ----- Section 9 — valueMatch ---------------------------------------------
// Typed-but-NOT-rendered per brief §4.6. The deck would repeat itself if
// we rendered all three comparison shapes; this one stays in the contract
// for a future pitch cockpit. No component imports it.

export type ValueMatchEntry = {
  _key?: string;
  /** 🟩 tenant. */
  property: string;
  /** 🟦 prospect. */
  prospect: string;
};

export type ValueMatchSection = {
  comparisons: ValueMatchEntry[];
};

// ----- Section 10 — experienceActivations ---------------------------------
// Merge of the former sections 10 (Activations) and 11 (Experiences) into a
// single ActivationsSection. The orphaned "Sections 10–11 merged" doc block
// further down is the only paper trail of that merge — kept for context.

export type ActivationItem = {
  _key?: string;
  title: string;
  category: string;
  description: string;
  /** Some entries pack multiple paragraphs with `\n\n`; split at render. */
  details?: string[];
  /** Gallery card image. */
  image?: Asset;
};

/** Fully prospect-owned — entries name prospect-specific products/concepts. */
export type ActivationsSection = {
  prospect: {
    description?: string;
    items: ActivationItem[];
  };
  editable?: {
    label?: string;
    headline?: string;
  };
};

// ----- Section 12 — matchPoints -------------------------------------------
// Typed-but-NOT-rendered per brief §4.6 (see comment on valueMatch above).

export type MatchPoint = {
  _key?: string;
  /** 🟩 tenant. */
  sailgp: string;
  /** 🟦 prospect. */
  prospect: string;
};

export type MatchPointsSection = MatchPoint[];

// ----- Sections 10–11 merged — experienceActivations ---------------------
//
// Historical note only. The two sections were collapsed into the single
// `ActivationsSection` defined further up (line ~360). Sub-sections no
// longer retain individual types/renderers — there is one renderer
// (PitchActivations.tsx) and one nav entry. This block is intentionally
// left as a paper trail so future readers see the merge point. Section
// numbering in surrounding comments skips 11 and 13 for the same reason.

// ----- Section 14 — motivationLetter --------------------------------------

export type MotivationLetterSection = {
  prospect: {
    greeting: string;
    opening: string;
    closing: string;
    sharedValues: string[];
    partnershipPitch: string;
  };
  tenant: {
    contactName: string;
    contactRole: string;
    contactEmail: string;
    contactPhone: string;
    contactPortraitImage: string;
    signatureImage: string;
    propertyName: string;
    sectionLabel: string;
    ctaLabel: string;
    ctaHref: string;
  };
};

// ----- Section 15 — pioneersTimeline --------------------------------------

export type PioneersTimelineSection = {
  prospect: {
    brand1Name: string;
  };
  tenant: {
    brand2Name: string;
  };
};

// ----- Composite ----------------------------------------------------------

export type SiteData = {
  hero: HeroSection;
  stats: StatsSection;
  /** Loose root-level string — see TaglineSection. */
  tagline: TaglineSection;
  calendar: CalendarSection;
  keyRights: KeyRightsSection;
  nextSteps: NextStepsSection;
  brandStory: BrandStorySection;
  matchCards: MatchCardsSection;
  valueMatch: ValueMatchSection;
  experienceActivations: ActivationsSection;
  matchPoints: MatchPointsSection;
  motivationLetter: MotivationLetterSection;
  pioneersTimeline: PioneersTimelineSection;
};

/**
 * The shape Forge's AI emits per pitch — every prospect-flavoured field
 * across the 15 sections. At runtime it is overlaid onto the tenant /
 * editable defaults via `mergeProspect`.
 *
 * For mixed-row sections (brandStory.sharedValues, matchCards.items,
 * valueMatch.comparisons, matchPoints, brandVisibility.placements) Forge
 * emits the whole row — the tenant halves echo the defaults; only the
 * prospect halves change per pitch. This matches the JSON Forge already
 * exports.
 *
 * `defaults.ts` ships these buckets as {{PLACEHOLDER}} tokens (or as full
 * rows where the row is mixed); `example-prospect.ts` holds a worked
 * example built from the HONOR fixture.
 */
export type ProspectPayload = {
  hero: HeroSection["prospect"];
  stats: StatsSection["prospect"];
  tagline: TaglineSection;
  calendar: { events: CalendarEvent[] };
  keyRights: KeyRightsSection["prospect"];
  nextSteps: NextStepsSection["prospect"];
  brandStory: {
    sharedValues: SharedValueRow[];
    prospectBrand: ProspectBrand;
  };
  matchCards: { items: MatchCard[] };
  valueMatch: ValueMatchSection;
  experienceActivations: ActivationsSection["prospect"];
  matchPoints: MatchPointsSection;
  motivationLetter: MotivationLetterSection["prospect"];
  pioneersTimeline: PioneersTimelineSection["prospect"];
};

/**
 * Stable anchor IDs for in-page nav targets. Only sections that render
 * appear here. `valueMatch` and `matchPoints` are typed-but-unrendered
 * (brief §4.6) and intentionally absent.
 */
export const SectionId = {
  hero: "hero",
  stats: "about",
  tagline: "tagline",
  brandStory: "brand-story",
  matchCards: "match",
  calendar: "pitch-calendar",
  experienceActivations: "experience-activations",
  keyRights: "pitch-partnership-structure",
  nextSteps: "pricing-packages",
  pioneersTimeline: "pitch-pioneers",
  motivationLetter: "personal-letter",
} as const;

export type SectionIdKey = keyof typeof SectionId;
