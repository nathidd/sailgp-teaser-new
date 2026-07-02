/*
 * Default (mock) site content matching the Forge-aligned SiteData schema.
 *
 * Category rules (see data.ts):
 *   🟦 prospect — {{PLACEHOLDER}} tokens only. NEVER real prospect data.
 *   🟩 tenant   — real SailGP Germany property values.
 *   🟨 editable — sensible defaults; sales can override per pitch.
 *
 * For mixed-row sections (brandStory.sharedValues, matchCards.items,
 * valueMatch.comparisons, matchPoints, brandVisibility.placements) the
 * row is shipped whole — tenant halves filled with real values, prospect
 * halves as {{PLACEHOLDER}} tokens. The row count here is the reference
 * count Forge will preserve per pitch.
 *
 * Defaults are English to match Forge's current export language.
 *
 * Open items:
 *   - Calendar events use the 2026 SailGP race set from the early Forge
 *     export. Confirm dates/locations against the official SailGP source
 *     before any public deploy.
 *   - SailGP brand assets (logo, hero video) are TODO — paths reference
 *     /sailgp/* slots that will be populated from the donor repo.
 */

import type { SiteData } from "./data";
import { SectionId } from "./data";

const TENANT = {
  propertyName: "Germany SailGP Team",
  shortName: "SailGP Germany",
  contactName: "Denis Steffens",
  contactRole: "Head of Commercial Partnerships & Marketing",
};

export const defaultSiteData: SiteData = {
  // ===== Section 1 — hero ================================================
  hero: {
    prospect: {
      partnerName: "{{PROSPECT_NAME}}",
      badge: "{{HERO_BADGE}}",
      tagline: "{{HERO_TAGLINE}}",
      headline: { parts: [{ text: "{{HERO_HEADLINE}}" }] },
      subheadline: "{{HERO_SUBHEADLINE}}",
      partnerLogo: {
        src: "{{PROSPECT_LOGO_URL}}",
        alt: "{{PROSPECT_NAME}}",
      },
      backgroundImage: {
        src: "{{PROSPECT_HERO_IMAGE_URL}}",
        alt: "{{PROSPECT_HERO_IMAGE_ALT}}",
      },
    },
    tenant: {
      // TODO: confirm wordmark with stakeholders.
      wordmark: { left: "SailGP", cross: "×", right: "Germany" },
      subLabel: "Presented by Germany SailGP Team",
      logo: {
        src: "/assets/sailgp-logo.png",
        alt: "SailGP",
      },
      backgroundVideo: {
        src: "https://stream.mux.com/Kmii1QWVzkSORidua8j7iCyyK1HI9Jt86FOtHtAEsws.m3u8",
        muxPlaybackId: "Kmii1QWVzkSORidua8j7iCyyK1HI9Jt86FOtHtAEsws",
      },
    },
    editable: {
      partnerLabel: "Prepared for",
      confidentialLabel: "Confidential",
      bannerCenterLabel: "Exclusive SailGP Partnership",
      cta: { label: "Let's talk", href: `#${SectionId.motivationLetter}` },
    },
  },

  // ===== Section 2 — stats ===============================================
  stats: {
    prospect: {
      items_secondary_replacements: [
        {
          _key: "secondary-0",
          tier: "secondary",
          label: "{{STATS_1_LABEL}}",
          value: "{{STATS_1_VALUE}}",
          suffix: "{{STATS_1_SUFFIX}}",
          source: "{{STATS_1_SOURCE}}",
        },
        {
          _key: "secondary-1",
          tier: "secondary",
          label: "{{STATS_2_LABEL}}",
          value: "{{STATS_2_VALUE}}",
          suffix: "{{STATS_2_SUFFIX}}",
          source: "{{STATS_2_SOURCE}}",
        },
        {
          _key: "secondary-2",
          tier: "secondary",
          label: "{{STATS_3_LABEL}}",
          value: "{{STATS_3_VALUE}}",
          suffix: "{{STATS_3_SUFFIX}}",
          source: "{{STATS_3_SOURCE}}",
        },
        {
          _key: "secondary-3",
          tier: "secondary",
          label: "{{STATS_4_LABEL}}",
          value: "{{STATS_4_VALUE}}",
          suffix: "{{STATS_4_SUFFIX}}",
          source: "{{STATS_4_SOURCE}}",
        },
      ],
    },
    tenant: {
      video: {
        // NOTE: do NOT add `background=1` here — that flag strips audio
        // entirely and the "Tap for Sound" control becomes a no-op.
        src: "https://player.vimeo.com/video/1162298466?autoplay=1&loop=1&muted=1&controls=0&playsinline=1",
        title: "SailGP highlights",
      },
    },
    editable: {
      label: "About",
      headline: "Built for global scale",
    },
  },

  // ===== Section 3 — tagline (root-level loose string) ===================
  tagline: "{{ROOT_TAGLINE}}",

  // ===== Section 4 — calendar ============================================
  // Mixed-row entries. Tenant: date/name/country/location. Prospect:
  // highlightNote/isHighlighted. Calendar events are tenant-anchored
  // (real race calendar) but each row gets a prospect-flavoured note.
  // TODO: confirm dates/locations against official 2026 SailGP source.
  calendar: {
    events: [
      {
        _key: "cal1",
        date: "January 2026",
        name: "Singapore race",
        country: "Singapore",
        location: "Singapore",
        highlightNote: "{{CAL_1_NOTE}}",
        isHighlighted: false,
      },
      {
        _key: "cal2",
        date: "February 2026",
        name: "Sydney race",
        country: "Australia",
        location: "Sydney",
        highlightNote: "{{CAL_2_NOTE}}",
        isHighlighted: false,
      },
      {
        _key: "cal3",
        date: "May 2026",
        name: "San Francisco race",
        country: "USA",
        location: "San Francisco",
        highlightNote: "{{CAL_3_NOTE}}",
        isHighlighted: false,
      },
      {
        _key: "cal4",
        date: "June 2026",
        name: "Sassnitz race",
        country: "Germany",
        location: "Sassnitz",
        highlightNote: "{{CAL_4_NOTE}}",
        isHighlighted: false,
      },
      {
        _key: "cal5",
        date: "August 2026",
        name: "Copenhagen race",
        country: "Denmark",
        location: "Copenhagen",
        highlightNote: "{{CAL_5_NOTE}}",
        isHighlighted: false,
      },
      {
        _key: "cal6",
        date: "November 2026",
        name: "Dubai race",
        country: "UAE",
        location: "Dubai",
        highlightNote: "{{CAL_6_NOTE}}",
        isHighlighted: false,
      },
    ],
    editable: {
      label: "The Calendar",
      headline: "Six global stages in 2026",
    },
  },

  // ===== Section 5 — keyRights (Partnership Structure) ===================
  // Tenant owns the partnership tier definitions and the confirmed
  // partners that already sit in each tier. Forge flips one or more
  // slot `kind`s to "prospect" per-pitch (see example-prospect.ts for
  // the worked HONOR example).
  keyRights: {
    tenant: {
      tiers: [
        {
          _key: "tier-title",
          name: "Title Partner",
          slots: [
            { _key: "title-1", kind: "partner", name: "Qatar Airways" },
          ],
        },
        {
          _key: "tier-co-title",
          name: "Co-Title Partner",
          slots: [
            { _key: "co-title-1", kind: "partner", name: "Deutsche Bank" },
          ],
        },
        {
          _key: "tier-global",
          name: "Global Partner",
          slots: [
            { _key: "global-1", kind: "partner", name: "Bogner" },
            { _key: "global-2", kind: "open" },
            { _key: "global-3", kind: "open" },
          ],
        },
        {
          _key: "tier-official",
          name: "Official Partner",
          slots: [
            { _key: "official-1", kind: "partner", name: "Riedel" },
            { _key: "official-2", kind: "partner", name: "Bogner" },
            { _key: "official-3", kind: "open" },
          ],
        },
        {
          _key: "tier-supplier",
          name: "Official Supplier",
          slots: [
            { _key: "supplier-1", kind: "partner", name: "Helly Hansen" },
            { _key: "supplier-2", kind: "partner", name: "Wera" },
            { _key: "supplier-3", kind: "partner", name: "Flaxta" },
            { _key: "supplier-4", kind: "partner", name: "Avea" },
          ],
        },
      ],
    },
    editable: {
      label: "Partnership Structure",
      headline: {
        parts: [
          { text: "Join SailGP as Global or Official Partner" },
        ],
      },
    },
  },

  // ===== Section 6 — nextSteps (Pricing Packages) ========================
  // Two pricing packages — fully prospect-flavoured because pricing and
  // included rights vary per pitch. Forge emits the whole `packages` array.
  nextSteps: {
    prospect: {
      packages: [
        {
          _key: "pkg-global",
          name: "{{PKG_1_NAME}}",
          tagline: "{{PKG_1_TAGLINE}}",
          packageValue: "{{PKG_1_VALUE}}",
          packageValueSuffix: "{{PKG_1_VALUE_SUFFIX}}",
          contractTerm: "{{PKG_1_CONTRACT_TERM}}",
          annualScaling: "{{PKG_1_ANNUAL_SCALING}}",
          keyRights: [
            "{{PKG_1_RIGHT_1}}",
            "{{PKG_1_RIGHT_2}}",
            "{{PKG_1_RIGHT_3}}",
            "{{PKG_1_RIGHT_4}}",
            "{{PKG_1_RIGHT_5}}",
          ],
          breakdown: [
            { _key: "pkg-1-bd-1", label: "{{PKG_1_BD_1_LABEL}}", value: "{{PKG_1_BD_1_VALUE}}" },
            { _key: "pkg-1-bd-2", label: "{{PKG_1_BD_2_LABEL}}", value: "{{PKG_1_BD_2_VALUE}}" },
            { _key: "pkg-1-bd-3", label: "{{PKG_1_BD_3_LABEL}}", value: "{{PKG_1_BD_3_VALUE}}" },
            { _key: "pkg-1-bd-4", label: "{{PKG_1_BD_4_LABEL}}", value: "{{PKG_1_BD_4_VALUE}}" },
            { _key: "pkg-1-bd-total", label: "Total", value: "{{PKG_1_BD_TOTAL}}" },
          ],
          isRecommended: true,
        },
        {
          _key: "pkg-official",
          name: "{{PKG_2_NAME}}",
          tagline: "{{PKG_2_TAGLINE}}",
          packageValue: "{{PKG_2_VALUE}}",
          packageValueSuffix: "{{PKG_2_VALUE_SUFFIX}}",
          contractTerm: "{{PKG_2_CONTRACT_TERM}}",
          annualScaling: "{{PKG_2_ANNUAL_SCALING}}",
          keyRights: [
            "{{PKG_2_RIGHT_1}}",
            "{{PKG_2_RIGHT_2}}",
            "{{PKG_2_RIGHT_3}}",
            "{{PKG_2_RIGHT_4}}",
            "{{PKG_2_RIGHT_5}}",
          ],
          breakdown: [
            { _key: "pkg-2-bd-1", label: "{{PKG_2_BD_1_LABEL}}", value: "{{PKG_2_BD_1_VALUE}}" },
            { _key: "pkg-2-bd-2", label: "{{PKG_2_BD_2_LABEL}}", value: "{{PKG_2_BD_2_VALUE}}" },
            { _key: "pkg-2-bd-3", label: "{{PKG_2_BD_3_LABEL}}", value: "{{PKG_2_BD_3_VALUE}}" },
            { _key: "pkg-2-bd-4", label: "{{PKG_2_BD_4_LABEL}}", value: "{{PKG_2_BD_4_VALUE}}" },
            { _key: "pkg-2-bd-total", label: "Total", value: "{{PKG_2_BD_TOTAL}}" },
          ],
          isRecommended: false,
        },
      ],
    },
    editable: {
      label: "Pricing Packages",
      headline: "Two ways to partner with SailGP Germany",
    },
  },

  // ===== Section 7 — brandStory ==========================================
  brandStory: {
    // Mixed-row entries. Tenant: _key/core/property. Prospect: prospect.
    sharedValues: [
      {
        _key: "sv1",
        core: "INNOVATION",
        property:
          "F50 catamarans flying at 100+ km/h. Next-generation foiling technology extracting maximum performance from wind, water, data and split-second decisions.",
        prospect: "{{SHARED_VALUE_1_PROSPECT}}",
      },
      {
        _key: "sv2",
        core: "HUMAN POTENTIAL",
        property:
          "Elite athletes, engineers and strategists working as one system under pressure. SailGP turns human decision-making and technology into visible performance.",
        prospect: "{{SHARED_VALUE_2_PROSPECT}}",
      },
      {
        _key: "sv3",
        core: "STORYTELLING",
        property:
          "One of the most cinematic sports environments in the world: speed, water, city skylines, teams and data-rich racing moments built for global content.",
        prospect: "{{SHARED_VALUE_3_PROSPECT}}",
      },
    ],
    prospectBrand: {
      name: "{{PROSPECT_NAME}}",
      title: "{{PROSPECT_BRAND_TITLE}}",
      highlights: [
        { label: "{{HIGHLIGHT_1_LABEL}}", value: "{{HIGHLIGHT_1_VALUE}}" },
        { label: "{{HIGHLIGHT_2_LABEL}}", value: "{{HIGHLIGHT_2_VALUE}}" },
        { label: "{{HIGHLIGHT_3_LABEL}}", value: "{{HIGHLIGHT_3_VALUE}}" },
        { label: "{{HIGHLIGHT_4_LABEL}}", value: "{{HIGHLIGHT_4_VALUE}}" },
      ],
      paragraphs: [
        "{{PROSPECT_BRAND_PARAGRAPH_1}}",
        "{{PROSPECT_BRAND_PARAGRAPH_2}}",
        "{{PROSPECT_BRAND_PARAGRAPH_3}}",
      ],
      foundingYear: "{{PROSPECT_FOUNDING_YEAR}}",
      foundingLocation: "{{PROSPECT_FOUNDING_LOCATION}}",
      backgroundImage: {
        src: "{{PROSPECT_BRAND_IMAGE_URL}}",
        alt: "{{PROSPECT_NAME}}",
      },
    },
    tenantBrand: {
      name: TENANT.shortName,
      title: "Germany joins the race",
      highlights: [
        { label: "Year founded", value: "2024" },
        { label: "km/h top speed", value: "100+" },
      ],
      paragraphs: [
        "Germany takes the global stage in 2024, competing in the world's fastest, most sustainable sailing championship. F50 catamarans flying at 100+ km/h, where precision engineering meets nature's ultimate power source: wind. Founded by Sebastian Vettel (four time F1 Champion) and Thomas Riedel (Riedel Communications), this team embodies German excellence with a bold mission: prove that peak performance and sustainability aren't competing values — they're inseparable. SailGP aims to be climate positive. Every race, every decision measured in speed and impact. Germany doesn't just race to win, we race to inspire a world where performance drives purpose, not compromise.",
      ],
      foundingYear: "2024",
      foundingLocation: "Germany",
      backgroundImage: {
        src: "/assets/races/sailgp-sydney.webp",
        alt: "Germany SailGP Team",
      },
    },
    editable: {
      label: "Why we fit",
      headline: {
        parts: [{ text: "From AI Promise to Race-Day Proof" }],
      },
      subheadline: "{{PARTNERSHIP_INTRO}}",
    },
  },

  // ===== Section 8 — matchCards ==========================================
  matchCards: {
    items: [
      {
        _key: "match1",
        tagline: "{{MATCH_1_TAGLINE}}",
        category: "{{MATCH_1_CATEGORY}}",
        heroLabel: "Alignment",
        heroValue: "{{MATCH_1_SCORE}}",
        heroSuffix: "/5",
        sailgpSide:
          "SailGP combines elite athletes, real-time data and F50 engineering to make every decision visible at race speed.",
        prospectSide: "{{MATCH_1_PROSPECT_SIDE}}",
      },
      {
        _key: "match2",
        tagline: "{{MATCH_2_TAGLINE}}",
        category: "{{MATCH_2_CATEGORY}}",
        heroLabel: "Alignment",
        heroValue: "{{MATCH_2_SCORE}}",
        heroSuffix: "/5",
        sailgpSide:
          "F50 catamarans represent pinnacle maritime technology, reaching 100+ km/h through foiling, data, sensors and constant optimization.",
        prospectSide: "{{MATCH_2_PROSPECT_SIDE}}",
      },
      {
        _key: "match3",
        tagline: "{{MATCH_3_TAGLINE}}",
        category: "{{MATCH_3_CATEGORY}}",
        heroLabel: "Alignment",
        heroValue: "{{MATCH_3_SCORE}}",
        heroSuffix: "/5",
        sailgpSide:
          "SailGP delivers cinematic race environments with water, wind, city backdrops, athletes and high-speed moments built for digital storytelling.",
        prospectSide: "{{MATCH_3_PROSPECT_SIDE}}",
      },
      {
        _key: "match4",
        tagline: "{{MATCH_4_TAGLINE}}",
        category: "{{MATCH_4_CATEGORY}}",
        heroLabel: "Alignment",
        heroValue: "{{MATCH_4_SCORE}}",
        heroSuffix: "/5",
        sailgpSide:
          "SailGP reaches a global fanbase through broadcast, social content, premium hospitality and high-value live race weekends.",
        prospectSide: "{{MATCH_4_PROSPECT_SIDE}}",
      },
      {
        _key: "match5",
        tagline: "{{MATCH_5_TAGLINE}}",
        category: "{{MATCH_5_CATEGORY}}",
        heroLabel: "Alignment",
        heroValue: "{{MATCH_5_SCORE}}",
        heroSuffix: "/5",
        sailgpSide:
          "Race for the Future and the Impact League make sustainability performance part of the sporting proposition.",
        prospectSide: "{{MATCH_5_PROSPECT_SIDE}}",
      },
      {
        _key: "match6",
        tagline: "{{MATCH_6_TAGLINE}}",
        category: "{{MATCH_6_CATEGORY}}",
        heroLabel: "Alignment",
        heroValue: "{{MATCH_6_SCORE}}",
        heroSuffix: "/5",
        sailgpSide:
          "Race weekends combine live sport, hospitality, team access, fan zones and media moments in visually powerful venues.",
        prospectSide: "{{MATCH_6_PROSPECT_SIDE}}",
      },
    ],
    editable: {
      label: "Value Match",
      headline: "Six values where we already align",
    },
  },

  // ===== Section 9 — valueMatch (typed-only, NOT rendered) ===============
  // Per brief §4.6. Stays in the schema for a future pitch cockpit.
  valueMatch: {
    comparisons: [
      {
        _key: "vmc1",
        property: "Human skill amplified by F50 engineering and live data",
        prospect: "{{VALUE_MATCH_1_PROSPECT}}",
      },
      {
        _key: "vmc2",
        property:
          "World's fastest sailing championship with F1-level technology",
        prospect: "{{VALUE_MATCH_2_PROSPECT}}",
      },
      {
        _key: "vmc3",
        property:
          "Race for the Future platform driving measurable climate action",
        prospect: "{{VALUE_MATCH_3_PROSPECT}}",
      },
      {
        _key: "vmc4",
        property: "89M global fans with strong digital engagement metrics",
        prospect: "{{VALUE_MATCH_4_PROSPECT}}",
      },
      {
        _key: "vmc5",
        property:
          "High-speed, cinematic racing moments built for social and broadcast",
        prospect: "{{VALUE_MATCH_5_PROSPECT}}",
      },
      {
        _key: "vmc6",
        property:
          "Live race weekends built for fan zones, hospitality and media access",
        prospect: "{{VALUE_MATCH_6_PROSPECT}}",
      },
    ],
  },

  // ===== Section 10 — experienceActivations =================================
  experienceActivations: {
    prospect: {
      description: "{{ACTIVATIONS_DESCRIPTION}}",
      items: [
        {
          _key: "act1",
          title: "{{ACTIVATION_1_TITLE}}",
          category: "{{ACTIVATION_1_CATEGORY}}",
          description: "{{ACTIVATION_1_DESCRIPTION}}",
          image: { src: "{{ACTIVATION_1_IMAGE_URL}}", alt: "{{ACTIVATION_1_TITLE}}" },
        },
        {
          _key: "act2",
          title: "{{ACTIVATION_2_TITLE}}",
          category: "{{ACTIVATION_2_CATEGORY}}",
          description: "{{ACTIVATION_2_DESCRIPTION}}",
          image: { src: "{{ACTIVATION_2_IMAGE_URL}}", alt: "{{ACTIVATION_2_TITLE}}" },
        },
        {
          _key: "act3",
          title: "{{ACTIVATION_3_TITLE}}",
          category: "{{ACTIVATION_3_CATEGORY}}",
          description: "{{ACTIVATION_3_DESCRIPTION}}",
          details: ["{{ACTIVATION_3_DETAIL_1}}", "", ""],
          image: { src: "{{ACTIVATION_3_IMAGE_URL}}", alt: "{{ACTIVATION_3_TITLE}}" },
        },
        {
          _key: "act4",
          title: "{{ACTIVATION_4_TITLE}}",
          category: "{{ACTIVATION_4_CATEGORY}}",
          description: "{{ACTIVATION_4_DESCRIPTION}}",
          details: ["{{ACTIVATION_4_DETAIL_1}}", "", ""],
          image: { src: "{{ACTIVATION_4_IMAGE_URL}}", alt: "{{ACTIVATION_4_TITLE}}" },
        },
        {
          _key: "act5",
          title: "{{ACTIVATION_5_TITLE}}",
          category: "{{ACTIVATION_5_CATEGORY}}",
          description: "{{ACTIVATION_5_DESCRIPTION}}",
          details: ["{{ACTIVATION_5_DETAIL_1}}", "", ""],
          image: { src: "{{ACTIVATION_5_IMAGE_URL}}", alt: "{{ACTIVATION_5_TITLE}}" },
        },
        {
          _key: "act6",
          title: "{{ACTIVATION_6_TITLE}}",
          category: "{{ACTIVATION_6_CATEGORY}}",
          description: "{{ACTIVATION_6_DESCRIPTION}}",
          details: ["{{ACTIVATION_6_DETAIL_1}}", "", ""],
          image: { src: "{{ACTIVATION_6_IMAGE_URL}}", alt: "{{ACTIVATION_6_TITLE}}" },
        },
      ],
    },
    editable: {
      label: "Experiences & Activations",
      headline: "How we bring the partnership to life",
    },
  },

  // ===== Section 12 — matchPoints (typed-only, NOT rendered) =============
  // Per brief §4.6. Stays in the schema for a future pitch cockpit.
  matchPoints: [
    {
      _key: "mp1",
      sailgp:
        "Human skill amplified by F50 engineering, data and split-second decisions",
      prospect: "{{MATCH_POINT_1_PROSPECT}}",
    },
    {
      _key: "mp2",
      sailgp:
        "World's fastest sailing league as a live platform for intelligent technology",
      prospect: "{{MATCH_POINT_2_PROSPECT}}",
    },
    {
      _key: "mp3",
      sailgp:
        "Race weekends create cinematic content across broadcast, social and creator channels",
      prospect: "{{MATCH_POINT_3_PROSPECT}}",
    },
    {
      _key: "mp4",
      sailgp:
        "Global fanbase and premium hospitality environments create high-value product touchpoints",
      prospect: "{{MATCH_POINT_4_PROSPECT}}",
    },
    {
      _key: "mp5",
      sailgp:
        "Race for the Future makes performance and responsible progress part of the same story",
      prospect: "{{MATCH_POINT_5_PROSPECT}}",
    },
    {
      _key: "mp6",
      sailgp: "Germany SailGP offers European relevance with global visibility",
      prospect: "{{MATCH_POINT_6_PROSPECT}}",
    },
  ],

  // ===== Section 14 — motivationLetter ===================================
  motivationLetter: {
    prospect: {
      greeting: "{{LETTER_GREETING}}",
      opening: "{{LETTER_OPENING}}",
      closing: "{{LETTER_CLOSING}}",
      sharedValues: [
        "{{LETTER_SHARED_VALUE_1}}",
        "{{LETTER_SHARED_VALUE_2}}",
        "{{LETTER_SHARED_VALUE_3}}",
      ],
      partnershipPitch: "{{LETTER_PARTNERSHIP_PITCH}}",
    },
    tenant: {
      contactName: TENANT.contactName,
      contactRole: TENANT.contactRole,
      contactEmail: "dsteffens@sailgpger.com",
      contactPhone: "+49 175 67 98 004",
      contactPortraitImage: "/assets/contact-portrait.png",
      signatureImage: "/assets/dennis-signature.svg",
      propertyName: TENANT.propertyName,
      sectionLabel: "Personal Letter",
      ctaLabel: "Let's meet at one of our events",
      ctaHref: `#${SectionId.nextSteps}`,
    },
  },

  // ===== Section 15 — pioneersTimeline ===================================
  pioneersTimeline: {
    prospect: {
      brand1Name: "{{PROSPECT_NAME}}",
    },
    tenant: {
      brand2Name: TENANT.shortName,
    },
  },
};
