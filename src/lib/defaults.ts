/*
 * Default (mock) site content matching the Forge-aligned SiteData schema.
 *
 * Category rules (see data.ts):
 *   🟦 prospect — {{PLACEHOLDER}} tokens only. NEVER real prospect data.
 *   🟩 tenant   — real SailGP Germany property values.
 *   🟨 editable — sensible defaults; sales can override per pitch.
 *
 * This is an editorial brand narrative, so almost everything is tenant +
 * editable (SailGP's own story). The only {{PLACEHOLDER}} tokens are the
 * per-prospect surface: the partner logo (hero + course) and the personal
 * note (invitation).
 *
 * Open items:
 *   - Premium-audience sponsorship-growth figure is "xx%" in the brief —
 *     left verbatim as a tenant TODO until the real number lands.
 *   - SailGP hero/loop video + crew/partner assets reference /assets/*
 *     slots; confirm final footage before any public deploy.
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
  // ===== Section 1a — hero ==============================================
  hero: {
    tenant: {
      wordmark: { left: "SailGP", cross: "×", right: "Germany" },
      subLabel: "Presented by Germany SailGP Team",
      logo: { src: "/assets/images/sailgp-logo.png", alt: "SailGP" },
      backgroundVideo: {
        src: "https://player.vimeo.com/video/1162298466?background=1&autoplay=1&loop=1&muted=1",
      },
      backgroundImage: { src: "/assets/images/hero-bg.png", alt: "SailGP racing" },
      metrics: [
        { _key: "hm-fans", value: "89M", label: "Global fans" },
        { _key: "hm-viewers", value: "240M", label: "Cumulative viewers" },
        { _key: "hm-nations", value: "13", label: "Nations" },
        { _key: "hm-events", value: "13", label: "Events" },
      ],
    },
    editable: {
      badge: "ABOUT SAILGP",
      headline: {
        parts: [
          { text: "Why SailGP " },
          { text: "matters", highlight: true },
        ],
      },
      subheadline:
        "High-stakes racing in iconic waterfront destinations. A global sport with unstoppable momentum, a premium audience modern brands want to reach, and a platform built for positive impact.",
      partnerLabel: "Exclusively prepared for",
      confidentialLabel: "Confidential",
      bannerCenterLabel: "SailGP Teaser",
      cta: { label: "Come inside", href: `#${SectionId.invitation}` },
    },
    prospect: {
      partnerName: "{{PROSPECT_NAME}}",
      partnerLogo: { src: "{{PROSPECT_LOGO_URL}}", alt: "{{PROSPECT_NAME}}" },
    },
  },

  // ===== Section 1b — pillars (four-field infographic) ==================
  pillars: {
    tenant: {
      items: [
        {
          _key: "pillar-scale",
          title: "Global Scale",
          subtitle: "High-stakes racing in iconic waterfront destinations",
          caption:
            "Every team races an identical F50, so team performance is the only differentiator.",
          icon: "globe",
          stats: [
            { _key: "sc1", value: "13", label: "Nations competing on a global stage" },
            { _key: "sc2", value: "13", label: "Events across 5 continents" },
          ],
          destinations: [
            { _key: "race1", date: "17 Jan 2026", country: "Australia", city: "Perth", lat: -31.9535, lng: 115.857 },
            { _key: "race2", date: "14 Feb 2026", country: "New Zealand", city: "Auckland", lat: -36.8485, lng: 174.7633 },
            { _key: "race3", date: "28 Feb 2026", country: "Australia", city: "Sydney", lat: -33.8651, lng: 151.2099 },
            { _key: "race4", date: "11 Apr 2026", country: "Brazil", city: "Rio de Janeiro", lat: -22.9083, lng: -43.1964 },
            { _key: "race5", date: "9 May 2026", country: "Bermuda", city: "Bermuda", lat: 32.2995, lng: -64.7903 },
            { _key: "race6", date: "30 May 2026", country: "USA", city: "New York", lat: 40.7143, lng: -74.006 },
            { _key: "race7", date: "20 Jun 2026", country: "Canada", city: "Halifax", lat: 44.6511, lng: -63.5827 },
            { _key: "race8", date: "25 Jul 2026", country: "United Kingdom", city: "Portsmouth", lat: 50.8058, lng: -1.0872 },
            { _key: "race9", date: "22 Aug 2026", country: "Germany", city: "Sassnitz", lat: 54.5157, lng: 13.6445 },
            { _key: "race10", date: "5 Sep 2026", country: "Spain", city: "Valencia", lat: 39.4667, lng: -0.375 },
            { _key: "race11", date: "19 Sep 2026", country: "Switzerland", city: "Geneva", lat: 46.2044, lng: 6.1432 },
            { _key: "race12", date: "21 Nov 2026", country: "UAE", city: "Dubai", lat: 25.277, lng: 55.2962 },
            { _key: "race13", date: "28 Nov 2026", country: "UAE", city: "Abu Dhabi", lat: 24.4667, lng: 54.3667 },
          ],

        },
        {
          _key: "pillar-momentum",
          title: "Momentum",
          subtitle: "A global sport gaining unstoppable momentum",
          icon: "trend",
          stats: [
            { _key: "mo1", value: "89M", label: "Global fans" },
            {
              _key: "mo2",
              value: "240M",
              label: "Cumulative viewers across 210+ broadcast markets",
            },
            { _key: "mo3", value: "+18%", label: "Broadcast growth (Season 4 → 5)" },
          ],
          // Directional S1–S5 audience trajectory landing on today's scale;
          // the S4→S5 step is the real +18% broadcast growth. Swap for
          // audited per-season figures when available.
          series: [
            { label: "S1", value: 118 },
            { label: "S2", value: 152 },
            { label: "S3", value: 181 },
            { label: "S4", value: 203 },
            { label: "S5", value: 240 },
          ],
        },
        {
          _key: "pillar-audience",
          title: "Premium Audience",
          subtitle: "A premium audience modern brands want to reach",
          icon: "users",
          stats: [
            { _key: "au1", tag: "Affluent", value: "$125K", label: "average household fan income" },
            { _key: "au2", tag: "Influential", value: "38%", label: "owner, executive, or board level" },
            {
              _key: "au3",
              tag: "Engaged",
              value: "2.1×",
              label: "more likely to consider sponsors",
            },
          ],
          image: { src: "/assets/images/crowd 4.webp", alt: "SailGP crowd" },
          // Dot positions (x,y as % of the image) — tweak to sit on people.
          spots: [
            { x: 30, y: 52 },
            { x: 52, y: 42 },
            { x: 71, y: 58 },
          ],
        },
        {
          _key: "pillar-impact",
          title: "Impact Platform",
          subtitle: "A trusted platform for positive impact",
          icon: "leaf",
          stats: [
            {
              _key: "im1",
              tag: "Transparent",
              value: "1st",
              label: "Sport to disclose to the Carbon Disclosure Project (CDP)",
            },
            {
              _key: "im2",
              tag: "Accountable",
              value: "1st",
              label: "World impact league tracking the positive actions teams take",
            },
            {
              _key: "im3",
              tag: "Inclusive",
              value: "100%",
              label: "Teams racing with female athletes onboard",
            },
          ],
          image: { src: "/assets/images/Teamwork.webp", alt: "Germany SailGP teamwork" },
          // Dot positions (x,y as % of the image) — tweak to sit on people.
          spots: [
            { x: 32, y: 48 },
            { x: 54, y: 40 },
            { x: 70, y: 56 },
          ],
        },
      ],
    },
    editable: {
      label: "Sports & Series",
      headline: { parts: [{ text: "What sets SailGP apart" }] },
    },
  },

  // ===== Section 2 — team ===============================================
  team: {
    tenant: {
      founders: [
        {
          _key: "f-vettel",
          name: "Sebastian Vettel",
          role: "Co-Founder",
          image: { src: "/assets/images/Sebastian V.webp", alt: "Sebastian Vettel" },
        },
        {
          _key: "f-riedel",
          name: "Thomas Riedel",
          role: "Co-Founder",
          image: { src: "/assets/images/Thomas Riedel.webp", alt: "Thomas Riedel" },
        },
      ],
      crewImages: [
        { src: "/assets/crew/anna-barth.png", alt: "Anna Barth" },
        { src: "/assets/crew/kevin-peponnet.png", alt: "Kevin Peponnet" },
        { src: "/assets/crew/will-tiller.png", alt: "Will Tiller" },
        { src: "/assets/crew/linov-scheel.png", alt: "Linov Scheel" },
        { src: "/assets/crew/erik-kosegarten-heil.png", alt: "Erik Kosegarten-Heil" },
        { src: "/assets/crew/james-wierzbowski.png", alt: "James Wierzbowski" },
      ],
      video: {
        src: "https://player.vimeo.com/video/1162298466?autoplay=1&loop=1&muted=1&controls=0&playsinline=1",
        title: "Germany SailGP Team",
      },
    },
    editable: {
      label: "Who we are",
      headline: {
        parts: [
          { text: "Team-engineered performance " },
          { text: "in motion.", highlight: true },
        ],
      },
      paragraphs: [
        "Germany SailGP was founded by four-time Formula 1 World Champion Sebastian Vettel and technology entrepreneur Thomas Riedel.",
        "Driven by our belief and mindset, we operate as one team within a human performance system built on intelligence, technology and continuous improvement as competitive advantage.",
      ],
      statement: "No ego on board. Only execution.",
    },
  },

  // ===== Section 3 — positioning ========================================
  positioning: {
    tenant: {
      markers: [
        {
          _key: "mk-data",
          label: "Data",
          description: "Real-time telemetry pipelines adopted league-wide.",
          icon: "gauge",
        },
        {
          _key: "mk-training",
          label: "Training",
          description: "Simulator-first onboarding & recovery protocols.",
          icon: "gauge",
        },
        {
          _key: "mk-operations",
          label: "Operations",
          description: "Race-day decision frameworks now standard.",
          icon: "gauge",
        },
      ],
      backgroundImage: { src: "/assets/images/Catamaran.webp", alt: "SailGP F50 on foils" },
    },
    editable: {
      label: "How we compete",
      headline: {
        parts: [
          { text: "Learning speed " },
          { text: "creates the edge.", highlight: true },
        ],
      },
      paragraphs: [
        "In our sport, all teams race identical boats, so performance is defined by how fast data becomes learning.",
        "Through our way of working, we have already introduced innovations in data, training and operations that were later adopted as league standards.",
      ],
      caption: "What we build becomes standard.",
      statement: "When others race what you built, you've already changed the sport.",
    },
  },

  // ===== Section 4 — impact =============================================
  impact: {
    tenant: {
      partnerExample: { name: "Deutsche Bank" },
      initiatives: [
        {
          _key: "in-edna",
          title: "eDNA Programme",
          description: "Marine biodiversity sampling at every race venue.",
          icon: "leaf",
        },
        {
          _key: "in-women",
          title: "Women Pathway",
          description: "Structured routes to bring more women onto the water.",
          icon: "leaf",
        },
        {
          _key: "in-league",
          title: "Impact League",
          description: "Every team ranked on positive-action performance.",
          icon: "leaf",
        },
        {
          _key: "in-carbon",
          title: "Carbon Disclosure",
          description: "First sport to disclose to CDP, with full transparency.",
          icon: "leaf",
        },
      ],
      backgroundImage: { src: "/assets/images/Frauen Gruppenfoto.webp", alt: "Women SailGP sailors" },
    },
    editable: {
      label: "How we impact",
      headline: {
        parts: [
          { text: "Built for impact " },
          { text: "beyond sport.", highlight: true },
        ],
      },
      paragraphs: [
        "Our way of thinking goes far beyond sport. Together with our partners and their expertise, we turn performance into measurable impact.",
        "Together with partners like Deutsche Bank, we are already building measurable initiatives, from eDNA programmes to structured pathways that put more women on the water.",
      ],
      statement: "This is a system still evolving, built to shape what comes next.",
    },
  },

  // ===== Section 5 — network (Business Network) =========================
  network: {
    tenant: {
      centerLabel: "SailGP Germany",
      nodes: [
        { _key: "nd-finance", label: "Finance" },
        { _key: "nd-tech", label: "Technology" },
        { _key: "nd-industry", label: "Industry" },
        { _key: "nd-partners", label: "Partners" },
        { _key: "nd-decision", label: "Decision Makers" },
      ],
      dataPoints: [
        { _key: "dp-value", value: "218%", label: "Higher average deal value" },
        {
          _key: "dp-speed",
          value: "22%",
          label: "Faster deal closure vs standard corporate events",
        },
      ],
    },
    editable: {
      label: "Who we connect",
      headline: {
        parts: [
          { text: "Access leading " },
          { text: "decision makers", highlight: true },
        ],
      },
      paragraphs: [
        "Germany SailGP brings partners into a high-value environment for decision makers, connecting leaders from finance, technology and industry through one of Europe's most powerful business networks.",
        "Race weekends become the meeting point: where relationships are built, ideas are exchanged and conversations move beyond the boardroom.",
      ],
    },
  },

  // ===== Section 6 — approach (sales funnel) ============================
  approach: {
    tenant: {
      stages: [
        {
          _key: "st-awareness",
          stage: "Awareness",
          action: "Increase your Reach",
          description: "Premium global visibility through a tier-one sports platform.",
          current: true,
        },
        {
          _key: "st-image",
          stage: "Image",
          action: "Recharge your Brand",
          description: "Borrow equity from a fast-rising, intelligent challenger brand.",
        },
        {
          _key: "st-activation",
          stage: "Activation",
          action: "Engage your Stakeholders",
          description: "Turn fans, clients and team into participants through real experiences.",
        },
        {
          _key: "st-consideration",
          stage: "Consideration",
          action: "Demonstrate your Technology",
          description: "Prove your capabilities in the most demanding performance environment.",
        },
        {
          _key: "st-sales",
          stage: "Sales",
          action: "Grow your Network",
          description: "Executive access and hospitality that opens doors cold outreach never could.",
        },
      ],
    },
    editable: {
      label: "How we partner",
      headline: {
        parts: [
          { text: "Aligned with your " },
          { text: "business goals.", highlight: true },
        ],
      },
      paragraphs: [
        "We operate partnerships as performance systems, built to evolve, innovate and set new standards across sport and business.",
        "Every partnership is built to deliver measurable, KPI-driven value, enabled by the flexibility and creative freedom of a young property.",
      ],
    },
  },

  // ===== Section 7 — opportunities (Your Course) ========================
  opportunities: {
    tenant: {
      items: [
        {
          _key: "op-reach",
          title: "Increase Your Reach",
          description: "Generate premium global visibility through a tier-one sports platform.",
          short: "increase reach",
          icon: "globe",
        },
        {
          _key: "op-brand",
          title: "Recharge Your Brand",
          description: "Borrow equity from a fast-rising, intelligent challenger brand.",
          short: "recharge brand",
          icon: "sparkle",
        },
        {
          _key: "op-stakeholders",
          title: "Engage Your Stakeholders",
          description:
            "Turn fans, clients and team into participants through real experiences and content.",
          short: "engage stakeholders",
          icon: "users",
        },
        {
          _key: "op-tech",
          title: "Demonstrate Your Technology",
          description: "Prove your capabilities in the most demanding performance environment.",
          short: "demonstrate technology",
          icon: "gauge",
        },
        {
          _key: "op-network",
          title: "Grow Your Network",
          description:
            "Gain executive access and hospitality that opens doors cold outreach never could.",
          short: "grow network",
          icon: "sitemap",
        },
      ],
    },
    prospect: {
      partnerName: "{{PROSPECT_NAME}}",
      partnerLogo: { src: "{{PROSPECT_LOGO_URL}}", alt: "{{PROSPECT_NAME}}" },
    },
    editable: {
      label: "Your course",
      headline: {
        parts: [
          { text: "Five ways your brand " },
          { text: "sets sail.", highlight: true },
        ],
      },
      paragraphs: [
        "Tap to build your course. Each route maps to a business goal. Combine the ones that matter most and we'll shape the partnership around them.",
      ],
      ctaLabel: "Discuss this course",
      ctaHref: `#${SectionId.invitation}`,
    },
  },

  // ===== Section 8 — invitation (Call to Action) ========================
  invitation: {
    prospect: {
      greeting: "{{LETTER_GREETING}}",
      note: "{{LETTER_NOTE}}",
      closing: "{{LETTER_CLOSING}}",
    },
    tenant: {
      contactName: TENANT.contactName,
      contactRole: TENANT.contactRole,
      contactEmail: "dsteffens@sailgpger.com",
      contactPhone: "+49 175 67 98 004",
      contactPortraitImage: "/assets/images/Denis2.webp",
      signatureImage: "/assets/images/dennis-signature.svg",
      backgroundImage: { src: "/assets/images/sailgp-sydney.webp", alt: "SailGP at the water's edge" },
    },
    editable: {
      label: "Exclusive invitation",
      headline: {
        parts: [
          { text: "Experience SailGP at the " },
          { text: "water's edge", highlight: true },
        ],
      },
      paragraphs: [
        "What you're being invited to isn't a hospitality package.",
        "It's a weekend on the inside: paddock access, tech-team briefings, and the moments between races where the actual conversations happen.",
      ],
      ctaLabel: "Reserve your weekend inside",
      ctaHref: "mailto:dsteffens@sailgpger.com",
    },
  },
};
