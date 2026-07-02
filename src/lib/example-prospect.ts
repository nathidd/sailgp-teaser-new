/*
 * EXAMPLE PROSPECT PAYLOAD — disposable preview content.
 *
 * `defaults.ts` keeps every prospect field as a {{PLACEHOLDER}} token —
 * that is the contract handed to Forge and it must stay that way. This
 * file is the other half: a worked example payload (HONOR) so the
 * prototype can be viewed with realistic content instead of raw tokens.
 *
 * This is the Forge seam. At runtime Forge produces a `ProspectPayload`
 * and the platform overlays it on the tenant/editable defaults — exactly
 * what `mergeProspect` does below. When Forge is wired up, delete this
 * file (or swap `exampleProspect` for the real Forge call); `data.ts`,
 * `defaults.ts`, and every component stay untouched.
 *
 * The HONOR payload is a fixture, not copy to polish. It mirrors the
 * early Forge JSON export verbatim — including padded-empty array slots
 * (the renderer filters them) and packed-multi-paragraph strings (the
 * renderer splits on \n\n).
 */

import type { ProspectPayload, SiteData } from "./data";
import { defaultSiteData } from "./defaults";

export const exampleProspect: ProspectPayload = {
  hero: {
    partnerName: "HONOR",
    badge: "AI Devices, Racing Intelligence",
    tagline: "AI Devices, Racing Intelligence",
    headline: {
      parts: [
        { text: "When human centric AI meets " },
        { text: "pure performance", highlight: true },
      ],
    },
    subheadline:
      "A global AI device ecosystem meets the world's fastest, most data-driven sailing league",
    partnerLogo: { src: "/assets/Partner Logo White.png", alt: "HONOR" },
    // Forge does not always supply a hero background image — fall back gracefully.
    backgroundImage: { src: "/assets/Catamaran.webp", alt: "SailGP catamaran" },
  },

  stats: {
    items_secondary_replacements: [
      {
        _key: "secondary-0",
        tier: "secondary",
        label: "AI investment",
        value: "10",
        source: "Five-year investment to accelerate AI devices and ecosystem growth",
        suffix: "$B",
      },
      {
        _key: "secondary-1",
        tier: "secondary",
        label: "global markets",
        value: "100",
        source:
          "International consumer reach across smartphones, tablets, wearables and PCs",
        suffix: "+",
      },
      {
        _key: "secondary-2",
        tier: "secondary",
        label: "service centers",
        value: "3,000",
        source: "Global infrastructure supporting premium consumer experiences",
        suffix: "+",
      },
      {
        _key: "secondary-3",
        tier: "secondary",
        label: "clean energy use",
        value: "17",
        source: "Million kWh clean energy used in operations in 2024",
        suffix: "M kWh",
      },
    ],
  },

  tagline: "WHEN HUMAN-CENTRIC AI MEETS PURE PERFORMANCE",

  calendar: {
    events: [
      {
        _key: "cal1",
        date: "January 2026",
        name: "Singapore race",
        country: "Singapore",
        location: "Singapore",
        highlightNote:
          "Southeast Asian smart-city hub and key platform for connected device, AI productivity and mobile imaging storytelling",
        isHighlighted: false,
      },
      {
        _key: "cal2",
        date: "February 2026",
        name: "Sydney race",
        country: "Australia",
        location: "Sydney",
        highlightNote:
          "High-visibility APAC market where mobile-first content, outdoor lifestyle and premium devices naturally connect",
        isHighlighted: false,
      },
      {
        _key: "cal3",
        date: "May 2026",
        name: "San Francisco race",
        country: "USA",
        location: "San Francisco",
        highlightNote:
          "Global technology capital and ideal stage for HONOR's AI ecosystem narrative, partner storytelling and creator-led activations",
        isHighlighted: false,
      },
      {
        _key: "cal4",
        date: "June 2026",
        name: "Sassnitz race",
        country: "Germany",
        location: "Sassnitz",
        highlightNote:
          "European consumer technology showcase with Germany's home team and a premium live audience for AI device activations",
        isHighlighted: false,
      },
      {
        _key: "cal5",
        date: "August 2026",
        name: "Copenhagen race",
        country: "Denmark",
        location: "Copenhagen",
        highlightNote:
          "Nordic innovation market with strong sustainability credentials and a highly digital consumer base",
        isHighlighted: false,
      },
      {
        _key: "cal6",
        date: "November 2026",
        name: "Dubai race",
        country: "UAE",
        location: "Dubai",
        highlightNote:
          "Premium tech and luxury market with strong appetite for flagship devices, creator experiences and next-generation fan engagement",
        isHighlighted: false,
      },
    ],
  },

  keyRights: {
    items: [
      "Inner Hull logo placement ensuring high-visibility brand exposure",
      "Category Exclusivity in AI smartphone and smart device sector",
      "VIP Passes (25x) for the German Event in the teams' Friends of the Team Area, ideal for partner, retailer and executive relationship building",
      "Fan Zone Activation Space for AI camera, creator and device ecosystem experiences",
      "Digital integration opportunities through Newsletter, YouTube and social content",
    ],
  },

  nextSteps: {
    packages: [
      {
        _key: "pkg-global",
        name: "Global Partner",
        tagline: "Worldwide visibility across every race weekend",
        packageValue: "€2,500,000",
        packageValueSuffix: "/ year",
        contractTerm: "3 years",
        annualScaling: "+5% per season",
        keyRights: [
          "Inner-hull logo placement on the F50 catamaran (premium visibility)",
          "Category exclusivity in AI smartphone and smart device sector",
          "Brand integration across all 13 global race weekends",
          "Adrenaline Lounge Passes (50x) for partner & executive hospitality",
          "Digital integration: SailGP Newsletter, YouTube, social and on-board content",
        ],
        breakdown: [
          { _key: "g-bd-1", label: "Brand & logo placements", value: "€1,100,000" },
          { _key: "g-bd-2", label: "Event activation & hospitality", value: "€650,000" },
          { _key: "g-bd-3", label: "Digital & broadcast integration", value: "€500,000" },
          { _key: "g-bd-4", label: "Category exclusivity premium", value: "€250,000" },
          { _key: "g-bd-total", label: "Total", value: "€2,500,000" },
        ],
        isRecommended: true,
      },
      {
        _key: "pkg-official",
        name: "Official Partner",
        tagline: "Focused presence with the German team",
        packageValue: "€950,000",
        packageValueSuffix: "/ year",
        contractTerm: "2 years",
        annualScaling: "+3% per season",
        keyRights: [
          "Upper jib logo placement ensuring high-visibility brand exposure",
          "Fan Zone Activation Space at the German race weekend",
          "Friends of the Team VIP Passes (25x) for retailer & executive relationships",
          "Co-branded digital content series with the GER SailGP Team",
          "Use of SailGP imagery and clips in HONOR's owned channels",
        ],
        breakdown: [
          { _key: "o-bd-1", label: "Brand & logo placements", value: "€420,000" },
          { _key: "o-bd-2", label: "Event activation & hospitality", value: "€280,000" },
          { _key: "o-bd-3", label: "Digital & content rights", value: "€180,000" },
          { _key: "o-bd-4", label: "Production & onboarding", value: "€70,000" },
          { _key: "o-bd-total", label: "Total", value: "€950,000" },
        ],
        isRecommended: false,
      },
    ],
  },

  brandStory: {
    sharedValues: [
      {
        _key: "sv1",
        core: "INNOVATION",
        property:
          "F50 catamarans flying at 100+ km/h. Next-generation foiling technology extracting maximum performance from wind, water, data and split-second decisions.",
        prospect:
          "Global AI device ecosystem company. HONOR is moving beyond smartphones into intelligent phones, connected ecosystems and human-centric AI experiences.",
      },
      {
        _key: "sv2",
        core: "HUMAN POTENTIAL",
        property:
          "Elite athletes, engineers and strategists working as one system under pressure. SailGP turns human decision-making and technology into visible performance.",
        prospect:
          "HONOR's ALPHA PLAN is built around maximizing human potential through open collaboration, agentic AI and seamless human-to-device interaction.",
      },
      {
        _key: "sv3",
        core: "STORYTELLING",
        property:
          "One of the most cinematic sports environments in the world: speed, water, city skylines, teams and data-rich racing moments built for global content.",
        prospect:
          "HONOR is investing in AI imaging, mobile creativity and cinematic storytelling through AiMAGE, Magic Stories and its collaboration with ARRI.",
      },
    ],
    prospectBrand: {
      name: "HONOR",
      title: "HONOR enters the AI device ecosystem era",
      highlights: [
        { label: "Founded", value: "2013" },
        { label: "AI Investment", value: "$10B" },
        { label: "Markets", value: "100+" },
        { label: "Service Centers", value: "3,000+" },
      ],
      paragraphs: [
        "HONOR is no longer just competing in smartphones. It is building toward a global AI device ecosystem, connecting phones, PCs, tablets, wearables and future devices through human-centric intelligence.",
        "That ambition becomes most powerful when people can feel it. When AI helps capture the impossible shot. When real-time data turns a race into a prediction. When devices become part of how fans create, react and participate.",
        "SailGP is built for that kind of proof. It combines extreme speed, live data, athlete performance, cinematic water-level action and global race-weekend energy.",
        "For HONOR, this is not just a sponsorship opportunity. It is a platform to show what intelligent devices can do when the world is watching.",
      ],
      foundingYear: "2013",
      foundingLocation: "Shenzhen, China",
    },
  },

  matchCards: {
    items: [
      {
        _key: "match1",
        tagline: "Both make human performance stronger through advanced technology",
        category: "human potential",
        heroLabel: "Alignment",
        heroValue: "5",
        heroSuffix: "/5",
        sailgpSide:
          "SailGP combines elite athletes, real-time data and F50 engineering to make every decision visible at race speed.",
        prospectSide:
          "HONOR's ALPHA PLAN is built around human-centric AI, opening technology boundaries to maximize human potential through intelligent devices.",
      },
      {
        _key: "match2",
        tagline: "Both push technology from engineering promise into live performance",
        category: "innovation",
        heroLabel: "Alignment",
        heroValue: "5",
        heroSuffix: "/5",
        sailgpSide:
          "F50 catamarans represent pinnacle maritime technology, reaching 100+ km/h through foiling, data, sensors and constant optimization.",
        prospectSide:
          "HONOR is investing $10B over five years to accelerate AI devices across smartphones, PCs, tablets, wearables and next-generation ecosystems.",
      },
      {
        _key: "match3",
        tagline:
          "Both turn speed, pressure and precision into content people want to watch",
        category: "storytelling",
        heroLabel: "Alignment",
        heroValue: "5",
        heroSuffix: "/5",
        sailgpSide:
          "SailGP delivers cinematic race environments with water, wind, city backdrops, athletes and high-speed moments built for digital storytelling.",
        prospectSide:
          "HONOR is scaling AI imaging through AiMAGE, Magic Stories and ARRI collaboration, giving creators tools for richer mobile photography and video.",
      },
      {
        _key: "match4",
        tagline: "Both reach digital-first, premium and globally minded audiences",
        category: "audience",
        heroLabel: "Alignment",
        heroValue: "4",
        heroSuffix: "/5",
        sailgpSide:
          "SailGP reaches a global fanbase through broadcast, social content, premium hospitality and high-value live race weekends.",
        prospectSide:
          "HONOR serves consumers in 100+ markets with smartphones, tablets, PCs, wearables and a growing AI device ecosystem.",
      },
      {
        _key: "match5",
        tagline: "Both use technology as a platform for responsible progress",
        category: "responsibility",
        heroLabel: "Alignment",
        heroValue: "4",
        heroSuffix: "/5",
        sailgpSide:
          "Race for the Future and the Impact League make sustainability performance part of the sporting proposition.",
        prospectSide:
          "HONOR's ESG pillars include Environmental Protection, Tech for Good, Privacy, Youth Empowerment, Supplier CSR and Responsible Governance.",
      },
      {
        _key: "match6",
        tagline:
          "Both create premium live environments where products can be experienced, not explained",
        category: "experience",
        heroLabel: "Alignment",
        heroValue: "5",
        heroSuffix: "/5",
        sailgpSide:
          "Race weekends combine live sport, hospitality, team access, fan zones and media moments in visually powerful venues.",
        prospectSide:
          "HONOR can demonstrate AI camera, device ecosystem, creator tools and agentic AI features in a setting built for hands-on discovery.",
      },
    ],
  },

  valueMatch: {
    comparisons: [
      {
        _key: "vmc1",
        property: "Human skill amplified by F50 engineering and live data",
        prospect: "Human-centric AI designed to maximize everyday potential",
      },
      {
        _key: "vmc2",
        property: "World's fastest sailing championship with F1-level technology",
        prospect: "$10B AI investment to move beyond smartphones into intelligent devices",
      },
      {
        _key: "vmc3",
        property: "Race for the Future platform driving measurable climate action",
        prospect:
          "ESG pillars spanning Environmental Protection, Tech for Good and Youth Empowerment",
      },
      {
        _key: "vmc4",
        property: "89M global fans with strong digital engagement metrics",
        prospect: "Consumer reach across 100+ markets and a broad smart device portfolio",
      },
      {
        _key: "vmc5",
        property: "High-speed, cinematic racing moments built for social and broadcast",
        prospect:
          "AI imaging, Magic Stories and ARRI collaboration built around mobile storytelling",
      },
      {
        _key: "vmc6",
        property: "Live race weekends built for fan zones, hospitality and media access",
        prospect: "Hands-on activation platform for smartphones, wearables, tablets and AI ecosystem demos",
      },
    ],
  },

  experienceActivations: {
    description: "A set of live, social-first experiences that connect HONOR's technology with the speed, emotion and visibility of SailGP.",
    items: [
        {
          _key: "branding-hull0",
          title: "Team Base Branding",
          category: "branding",
          description: "On-site presence",
          details: [
            "HONOR brand presence at the team base - a visible technology hub across hospitality, media and race weekend content.",
          ],
          image: { src: "/assets/Team Branding.webp", alt: "Team base branding" },
        },
        {
          _key: "branding-wear0",
          title: "Forward beams branding",
          category: "branding",
          description: "Race sail logo",
          details: [
            "High-visibility placement during maneuvers, broadcast shots and highlight reels — linking HONOR with speed, precision and intelligent performance.",
          ],
          image: { src: "/assets/Front Catamaran.webp", alt: "Forward beams branding" },
        },
        {
          _key: "act-content0",
          title: "Race Intelligence: Powered by HONOR",
          category: "activation",
          description: "Video Series",
          details: [
            "Short-form series translating SailGP's fastest decisions into visual moments — Erik Heil explains wind shifts, foil setup and race tactics on YouTube, LinkedIn and TikTok.",
          ],
          image: { src: "/assets/Eric Instagram.webp", alt: "Race Intelligence series" },
        },
        {
          _key: "act-content1",
          title: "Shot on HONOR: SailGP Edition",
          category: "activation",
          description: "Creator Content",
          details: [
            "Creator-led mobile series capturing SailGP from angles fans rarely see — athlete POVs, race-weekend galleries and AI camera moments on Instagram, TikTok and YouTube Shorts.",
          ],
          image: { src: "/assets/Shot on HONOR SailGP Edition.webp", alt: "Shot on HONOR" },
        },
        {
          _key: "act-exp1",
          title: "HONOR AI Fan Lab",
          category: "activation",
          description: "Fan Experience",
          details: [
            "Interactive race village experience where fans test HONOR's AI ecosystem through camera challenges, reaction-time games and race predictions — turning product discovery into a SailGP moment.",
          ],
          image: { src: "/assets/HONOR AI Fan Lab.webp", alt: "HONOR AI Fan Lab" },
        },
        {
          _key: "act-exp2",
          title: "Human-Centric AI Summit",
          category: "activation",
          description: "Executive Experience",
          details: [
            "Invitation-only roundtable at a SailGP race weekend — HONOR leaders, athletes and technologists explore how AI and devices are reshaping human performance.",
          ],
          image: { src: "/assets/hero-bg.png", alt: "Human-Centric AI Summit" },
        },
      ],
  },

  matchPoints: [
    {
      _key: "mp1",
      sailgp:
        "Human skill amplified by F50 engineering, data and split-second decisions",
      prospect: "Human-centric AI designed to maximize everyday potential",
    },
    {
      _key: "mp2",
      sailgp:
        "World's fastest sailing league as a live platform for intelligent technology",
      prospect:
        "HONOR ALPHA PLAN transitions the brand into a global AI device ecosystem company",
    },
    {
      _key: "mp3",
      sailgp:
        "Race weekends create cinematic content across broadcast, social and creator channels",
      prospect:
        "AiMAGE, Magic Stories and ARRI collaboration position HONOR around mobile storytelling",
    },
    {
      _key: "mp4",
      sailgp:
        "Global fanbase and premium hospitality environments create high-value product touchpoints",
      prospect: "100+ markets and 3,000+ service centers show HONOR's global consumer infrastructure",
    },
    {
      _key: "mp5",
      sailgp:
        "Race for the Future makes performance and responsible progress part of the same story",
      prospect:
        "HONOR ESG pillars include Environmental Protection, Tech for Good, Privacy and Youth Empowerment",
    },
    {
      _key: "mp6",
      sailgp: "Germany SailGP offers European relevance with global visibility",
      prospect:
        "HONOR can activate across key technology, premium and creator markets from Europe to APAC and the Middle East",
    },
  ],



  motivationLetter: {
    greeting: "Dear HONOR Team,",
    opening:
      "We've been following HONOR's evolution with great interest. Your move from smartphone brand to global AI device ecosystem company is exactly the kind of ambitious shift that deserves a stage where technology becomes visible, emotional and real.\nAt Germany SailGP, we operate in a similar tension: human skill, intelligent systems, pressure, data and nature all coming together in real time. Every race is a live demonstration of what happens when people and technology perform as one.",
    closing:
      "We would be delighted to show you what a partnership between HONOR and SailGP Germany could create.",
    sharedValues: [
      "INNOVATION: Like you, we believe technology should not just impress. It should unlock what people are capable of.",
      "HUMAN POTENTIAL: SailGP turns split-second human decision-making and intelligent systems into visible performance.",
      "STORYTELLING: With HONOR's AI imaging and creator tools, the world's fastest sailing league becomes a global canvas for next-generation mobile content.",
    ],
    partnershipPitch:
      "We're not looking for a logo sponsor. We're looking for a technology partner who can turn high-performance sport into a live showcase for human-centric AI, intelligent devices and cinematic storytelling.",
  },

  pioneersTimeline: {
    brand1Name: "HONOR",
  },
};

/**
 * Overlay a prospect payload onto the tenant/editable defaults. This is
 * the runtime model Forge follows. For mixed-row sections (calendar,
 * sharedValues, matchCards.items, valueMatch.comparisons, matchPoints,
 * brandVisibility.placements) Forge emits the whole row — tenant halves
 * echo the defaults, prospect halves change per pitch.
 */
export function mergeProspect(
  base: SiteData,
  prospect: ProspectPayload
): SiteData {
  return {
    ...base,
    hero: { ...base.hero, prospect: prospect.hero },
    stats: { ...base.stats, prospect: prospect.stats },
    tagline: prospect.tagline,
    calendar: { ...base.calendar, events: prospect.calendar.events },
    keyRights: { ...base.keyRights, prospect: prospect.keyRights },
    nextSteps: { ...base.nextSteps, prospect: prospect.nextSteps },
    brandStory: {
      ...base.brandStory,
      sharedValues: prospect.brandStory.sharedValues,
      prospectBrand: prospect.brandStory.prospectBrand,
      editable: {
        ...base.brandStory.editable,
        subheadline: "HONOR's next chapter needs more than visibility. It needs a stage where intelligent technology can be experienced.",
      },
    },
    matchCards: { ...base.matchCards, items: prospect.matchCards.items },
    valueMatch: prospect.valueMatch,
    experienceActivations: {
      ...base.experienceActivations,
      prospect: prospect.experienceActivations,
    },
    matchPoints: prospect.matchPoints,
    motivationLetter: {
      ...base.motivationLetter,
      prospect: prospect.motivationLetter,
    },
    pioneersTimeline: {
      ...base.pioneersTimeline,
      prospect: prospect.pioneersTimeline,
    },
  };
}

/** `defaultSiteData` with the HONOR example payload overlaid. */
const merged = mergeProspect(defaultSiteData, exampleProspect);

/**
 * In the HONOR example, the prospect is being offered the Global Partner
 * (slot 1) and Official Partner (slot 2) placements. Flipping these slot
 * kinds is the equivalent of what Forge does per-pitch on the live data.
 */
const HONOR_SLOT_KEYS = new Set(["global-1", "official-2"]);

export const exampleSiteData: SiteData = {
  ...merged,
  keyRights: {
    ...merged.keyRights,
    tenant: {
      ...merged.keyRights.tenant,
      tiers: merged.keyRights.tenant.tiers.map((tier) => ({
        ...tier,
        slots: tier.slots.map((slot) =>
          HONOR_SLOT_KEYS.has(slot._key ?? "")
            ? { ...slot, kind: "prospect" as const }
            : slot
        ),
      })),
    },
  },
};
