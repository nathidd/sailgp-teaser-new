/*
 * Typed content schema for the SailGP pitch deck template — Forge-aligned.
 *
 * The deck is an 8-section editorial narrative — SailGP telling its own
 * story and inviting the prospect inside:
 *
 *   hero → pillars → team → positioning → impact → network →
 *   approach → opportunities → invitation
 *
 * (hero + pillars together are brief Section 1 "Sports & Series".)
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
 * This narrative deck is MOSTLY tenant + editable — SailGP's own story is
 * fixed. The only per-prospect surface is:
 *   - the partner logo (hero lockup + the "Your Course" section), and
 *   - the personal note (invitation section).
 * Those three buckets are all `ProspectPayload` carries.
 *
 * Do NOT add `_`-prefixed fields other than the existing `_key` (Sanity
 * row key) — anything else `_`-prefixed is platform-owned.
 *
 * HARD CONSTRAINTS (see pitch-deck-template-brief.md §4):
 *   - Element counts are reference-only; layouts must not hardcode them
 *     (grids use auto-fit/minmax, arrays run through filterMeaningful).
 *   - No hardcoded text lengths — every block must wrap & overflow cleanly.
 *   - Empty array slots must be filtered out at render time.
 *   - Multi-paragraph strings packed with \n\n must be split at render.
 *   - Any missing field/section renders nothing (graceful degradation).
 *   - Stat values stay strings (preserve seller formatting: "$125K",
 *     "89M", "2.1×", "+18%").
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

/** A Vimeo-player embed (rendered by AboutVideo with sound controls). */
export type EmbedVideo = {
  /** Full Vimeo player URL — must NOT use `background=1` (strips audio). */
  src: string;
  title?: string;
};

/** Big-number stat used across pillars, network data points, etc. */
export type StatPoint = {
  _key?: string;
  /** Formatted value string — "89M", "$125K", "2.1×", "+18%", "1st". */
  value: string;
  suffix?: string;
  label: string;
  /** Optional finer-grained note/source. */
  source?: string;
};

// ----- Section 1a — hero --------------------------------------------------

export type HeroSection = {
  tenant: {
    /** Wordmark lockup (Property × subjectline). Optional. */
    wordmark?: { left: string; cross: string; right: string };
    subLabel?: string;
    logo: Asset;
    /** Looping property video used as the hero background. */
    backgroundVideo?: PropertyVideo;
    /** Still fallback when no video / on reduced-data. */
    backgroundImage?: Asset;
    /**
     * A few headline facts pulled forward from the pillars, shown as a
     * compact metric row under the hero copy (brief S1: "wenige Fakten
     * aus der Infografik vorziehen"). Reference count 4; row wraps.
     */
    metrics?: StatPoint[];
  };
  editable: {
    /** Eyebrow tag above the headline, e.g. "ABOUT SAILGP". */
    badge: string;
    /** "\n" inside a .text span renders as a line break (pre-line). */
    headline: HighlightedHeadline;
    subheadline: string;
    /** Lead-in for the partner lockup, e.g. "Exclusively prepared for". */
    partnerLabel: string;
    /** Bottom-left banner micro-label, e.g. "Confidential". */
    confidentialLabel?: string;
    /** Top-center banner copy, e.g. "Exclusive SailGP Partnership". */
    bannerCenterLabel?: string;
    cta?: Cta;
  };
  prospect: {
    /** Short prospect name used in the sticky top banner, e.g. "HONOR". */
    partnerName: string;
    /** Prospect logo for the partnership lockup. Omit → tenant-only lockup. */
    partnerLogo?: Asset;
    /** Optional per-prospect hero background override. */
    backgroundImage?: Asset;
  };
};

// ----- Section 1b — pillars (the four-field infographic) ------------------

/** A race destination plotted on the globe visualization. */
export type Destination = {
  _key?: string;
  city: string;
  country: string;
  /** Human date, e.g. "January 2026". */
  date: string;
  lat: number;
  lng: number;
};

export type PillarItem = {
  _key?: string;
  /** Pillar name, e.g. "Global Scale". */
  title: string;
  /** All-caps sub-head, e.g. "HIGH-STAKES RACING IN ICONIC DESTINATIONS". */
  subtitle: string;
  /** Optional descriptive line under the title (a plain subtitle, not a KPI). */
  caption?: string;
  /** Icon name (see Icon.tsx), e.g. "globe". */
  icon?: string;
  /** Reference count 3–4; grid adapts. */
  stats: StatPoint[];
  /** Optional race destinations, rendered as a pulsing-dot globe. */
  destinations?: Destination[];
};

export type PillarsSection = {
  tenant: {
    items: PillarItem[];
  };
  editable: {
    label?: string;
    headline?: HighlightedHeadline;
  };
};

// ----- Section 2 — team ---------------------------------------------------

export type Founder = {
  _key?: string;
  name: string;
  role: string;
  image?: Asset;
};

export type TeamSection = {
  tenant: {
    founders: Founder[];
    /** Crew portrait strip. */
    crewImages?: Asset[];
    /** Cinematic reel (Vimeo, sound-enabled via AboutVideo). */
    video?: EmbedVideo;
  };
  editable: {
    label?: string;
    headline?: HighlightedHeadline;
    /** Body copy; may pack multiple paragraphs with \n\n. */
    paragraphs?: string[];
    /** Punch line, e.g. "No ego on board. Only execution." */
    statement?: string;
  };
};

// ----- Section 3 — positioning --------------------------------------------

export type PositioningMarker = {
  _key?: string;
  /** e.g. "Data", "Training", "Operations". */
  label: string;
  description?: string;
  /** Icon name (see Icon.tsx), e.g. "gauge". */
  icon?: string;
};

export type PositioningSection = {
  tenant: {
    markers: PositioningMarker[];
    /** Optional looping proof-of-work video (HeroVideo/HLS). */
    loopVideo?: PropertyVideo;
    backgroundImage?: Asset;
  };
  editable: {
    label?: string;
    headline?: HighlightedHeadline;
    paragraphs?: string[];
    /** Visual marker, e.g. "What we build becomes standard." */
    caption?: string;
    /** Punch line, e.g. "When others race what you built…". */
    statement?: string;
  };
};

// ----- Section 4 — impact -------------------------------------------------

export type ImpactInitiative = {
  _key?: string;
  title: string;
  description: string;
  image?: Asset;
  /** Icon name (see Icon.tsx), e.g. "leaf". */
  icon?: string;
};

export type ImpactSection = {
  tenant: {
    /** Co-creation example, e.g. Deutsche Bank. */
    partnerExample?: { name: string; logo?: Asset };
    initiatives: ImpactInitiative[];
    backgroundImage?: Asset;
  };
  editable: {
    label?: string;
    headline?: HighlightedHeadline;
    paragraphs?: string[];
    statement?: string;
  };
};

// ----- Section 5 — network (Business Network) -----------------------------

export type NetworkNode = {
  _key?: string;
  /** e.g. "Finance", "Technology", "Decision Makers". */
  label: string;
  group?: string;
};

export type NetworkSection = {
  tenant: {
    /** Hub label at the center of the map, e.g. "SailGP Germany". */
    centerLabel?: string;
    nodes: NetworkNode[];
    /** Reference count 2 — the headline proof points (218% / 22%). */
    dataPoints: StatPoint[];
  };
  editable: {
    label?: string;
    headline?: HighlightedHeadline;
    paragraphs?: string[];
  };
};

// ----- Section 6 — approach (sales funnel) --------------------------------

export type FunnelStage = {
  _key?: string;
  /** Funnel stage, e.g. "Awareness". */
  stage: string;
  /** Benefit line, e.g. "Increase your Reach". */
  action: string;
  /** Revealed on hover/focus. */
  description?: string;
  /** Flags the stage this pitch is currently focused on ("Now focusing"). */
  current?: boolean;
};

export type ApproachSection = {
  tenant: {
    /** Reference count 5. */
    stages: FunnelStage[];
  };
  editable: {
    label?: string;
    headline?: HighlightedHeadline;
    paragraphs?: string[];
  };
};

// ----- Section 7 — opportunities (Your Course) ----------------------------

export type OpportunityItem = {
  _key?: string;
  /** e.g. "Increase Your Reach". */
  title: string;
  description: string;
  /** Short verb phrase for the "build your course" summary, e.g. "increase reach". */
  short?: string;
  /** Icon name (see Icon.tsx), e.g. "globe". */
  icon?: string;
};

export type OpportunitiesSection = {
  tenant: {
    /** Reference count 5 — mirrors the funnel stages. */
    items: OpportunityItem[];
  };
  /** The prospect's logo rides the course marker. */
  prospect: {
    partnerName?: string;
    partnerLogo?: Asset;
  };
  editable: {
    label?: string;
    headline?: HighlightedHeadline;
    paragraphs?: string[];
    /** "Discuss this course" CTA on the interactive builder. */
    ctaLabel?: string;
    ctaHref?: string;
  };
};

// ----- Section 8 — invitation (Call to Action) ----------------------------

export type InvitationSection = {
  /** The per-prospect personal note, revealed on click. */
  prospect: {
    greeting: string;
    /** Personal note; may pack multiple paragraphs with \n\n. */
    note: string;
    closing?: string;
  };
  tenant: {
    contactName: string;
    contactRole: string;
    contactEmail: string;
    contactPhone: string;
    contactPortraitImage: string;
    signatureImage: string;
    /** Optional cinematic tour footage behind the invitation. */
    backgroundImage?: Asset;
  };
  editable: {
    label?: string;
    headline?: HighlightedHeadline;
    /** The fixed invitation copy ("…isn't a hospitality package."). */
    paragraphs?: string[];
    ctaLabel?: string;
    ctaHref?: string;
  };
};

// ----- Composite ----------------------------------------------------------

export type SiteData = {
  hero: HeroSection;
  pillars: PillarsSection;
  team: TeamSection;
  positioning: PositioningSection;
  impact: ImpactSection;
  network: NetworkSection;
  approach: ApproachSection;
  opportunities: OpportunitiesSection;
  invitation: InvitationSection;
};

/**
 * The shape Forge's AI emits per pitch. This narrative deck personalizes a
 * small surface: the partner logo (hero + course) and the personal note.
 * Everything else is tenant/editable and echoes the defaults.
 *
 * At runtime it is overlaid onto the tenant/editable defaults via
 * `mergeProspect` (see example-prospect.ts).
 */
export type ProspectPayload = {
  hero: HeroSection["prospect"];
  opportunities: OpportunitiesSection["prospect"];
  invitation: InvitationSection["prospect"];
};

/**
 * Stable anchor IDs for in-page nav targets. `pillars` shares the "about"
 * anchor since hero + pillars are one narrative beat (brief Section 1).
 */
export const SectionId = {
  hero: "hero",
  pillars: "about",
  team: "team",
  positioning: "positioning",
  impact: "impact",
  network: "network",
  approach: "approach",
  opportunities: "opportunities",
  invitation: "invitation",
} as const;

export type SectionIdKey = keyof typeof SectionId;
