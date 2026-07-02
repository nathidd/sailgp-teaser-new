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
      logo: { src: "/assets/sailgp-logo.png", alt: "SailGP" },
      backgroundVideo: {
        src: "https://stream.mux.com/Kmii1QWVzkSORidua8j7iCyyK1HI9Jt86FOtHtAEsws.m3u8",
        muxPlaybackId: "Kmii1QWVzkSORidua8j7iCyyK1HI9Jt86FOtHtAEsws",
      },
      backgroundImage: { src: "/assets/hero-bg.png", alt: "SailGP racing" },
    },
    editable: {
      badge: "ABOUT SAILGP",
      headline: {
        parts: [
          { text: "Why SailGP\n" },
          { text: "matters", highlight: true },
        ],
      },
      subheadline:
        "High-stakes racing in iconic waterfront destinations — a global sport with unstoppable momentum, a premium audience modern brands want to reach, and a platform built for positive impact.",
      partnerLabel: "Exclusively prepared for",
      confidentialLabel: "Confidential",
      bannerCenterLabel: "Exclusive SailGP Partnership",
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
          subtitle: "HIGH-STAKES RACING IN ICONIC WATERFRONT DESTINATIONS",
          stats: [
            { _key: "sc1", value: "13", label: "Nations competing on a global stage" },
            { _key: "sc2", value: "13", label: "Events across 5 continents" },
            {
              _key: "sc3",
              value: "F50",
              label:
                "Identical catamarans, technology & regulations — team performance is the only differentiator",
            },
          ],
        },
        {
          _key: "pillar-momentum",
          title: "Momentum",
          subtitle: "A GLOBAL SPORT GAINING UNSTOPPABLE MOMENTUM",
          stats: [
            { _key: "mo1", value: "89M", label: "Global fans" },
            {
              _key: "mo2",
              value: "240M",
              label: "Cumulative viewers across 210+ broadcast markets",
            },
            { _key: "mo3", value: "+18%", label: "Broadcast growth (Season 4 → 5)" },
          ],
        },
        {
          _key: "pillar-audience",
          title: "Premium Audience",
          subtitle: "A PREMIUM AUDIENCE MODERN BRANDS WANT TO REACH",
          stats: [
            { _key: "au1", value: "$125K", label: "Average household fan income (affluent)" },
            { _key: "au2", value: "38%", label: "Owner, executive or board level (influential)" },
            {
              _key: "au3",
              value: "2.1×",
              label:
                "More likely to consider sponsors — ahead of F1, UEFA, NBA & Wimbledon (engaged)",
            },
            {
              _key: "au4",
              // TODO(tenant): replace "xx%" with the confirmed figure.
              value: "xx%",
              label: "Sponsorship growth, Season 4 → 5 (attracted)",
            },
          ],
        },
        {
          _key: "pillar-impact",
          title: "Impact Platform",
          subtitle: "A TRUSTED PLATFORM FOR POSITIVE IMPACT",
          stats: [
            {
              _key: "im1",
              value: "1st",
              label: "Sport to disclose to the Carbon Disclosure Project (CDP)",
            },
            {
              _key: "im2",
              value: "1st",
              label: "World impact league tracking the positive actions teams take",
            },
            { _key: "im3", value: "100%", label: "Teams racing with female athletes onboard" },
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
        { _key: "f-vettel", name: "Sebastian Vettel", role: "Co-Founder · 4× Formula 1 World Champion" },
        { _key: "f-riedel", name: "Thomas Riedel", role: "Co-Founder · Technology Entrepreneur" },
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
      backgroundImage: { src: "/assets/crew.png", alt: "Germany SailGP crew" },
    },
    editable: {
      label: "Who we are",
      headline: {
        parts: [
          { text: "Team-Engineered " },
          { text: "Performance", highlight: true },
          { text: " in Motion" },
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
          description: "Turning race telemetry into learning faster than anyone on the water.",
        },
        {
          _key: "mk-training",
          label: "Training",
          description: "Human performance systems that compound every single session.",
        },
        {
          _key: "mk-operations",
          label: "Operations",
          description: "A way of working the league later adopts as standard.",
        },
      ],
      backgroundImage: { src: "/assets/Catamaran.webp", alt: "SailGP F50 on foils" },
    },
    editable: {
      label: "How we compete",
      headline: {
        parts: [
          { text: "Learning speed", highlight: true },
          { text: " creates the edge" },
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
          title: "eDNA Programmes",
          description:
            "Environmental-DNA sampling at race venues turns every event into ocean-health data.",
        },
        {
          _key: "in-women",
          title: "Women on the Water",
          description:
            "Structured pathways that put more women into elite sailing and technical roles.",
        },
        {
          _key: "in-cocreation",
          title: "Measurable Co-Creation",
          description:
            "Partner expertise translated into initiatives with tracked, real-world outcomes.",
        },
      ],
      backgroundImage: { src: "/assets/Front Catamaran.webp", alt: "SailGP racing" },
    },
    editable: {
      label: "How we impact",
      headline: {
        parts: [
          { text: "Built for impact " },
          { text: "beyond sport", highlight: true },
        ],
      },
      paragraphs: [
        "Our way of thinking goes far beyond sport. Together with our partners and their expertise, we turn performance into measurable impact.",
        "Together with partners like Deutsche Bank, we are already building measurable initiatives — from eDNA programmes to structured pathways that put more women on the water.",
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
        "Germany SailGP brings partners into a high-value environment for decision makers — connecting leaders from finance, technology and industry through one of Europe's most powerful business networks.",
        "Race weekends become the meeting point: where relationships are built, ideas are exchanged and conversations move beyond the boardroom.",
      ],
    },
  },

  // ===== Section 6 — approach (sales funnel) ============================
  approach: {
    tenant: {
      stages: [
        { _key: "st-awareness", stage: "Awareness", action: "Increase your Reach" },
        { _key: "st-image", stage: "Image", action: "Recharge your Brand" },
        { _key: "st-activation", stage: "Activation", action: "Engage your Stakeholders" },
        { _key: "st-consideration", stage: "Consideration", action: "Demonstrate your Technology" },
        { _key: "st-sales", stage: "Sales", action: "Grow your Network" },
      ],
    },
    editable: {
      label: "How we partner",
      headline: {
        parts: [
          { text: "Aligned with your " },
          { text: "business goals", highlight: true },
        ],
      },
      paragraphs: [
        "We operate partnerships as performance systems — built to evolve, innovate, and set new standards across sport and business.",
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
        },
        {
          _key: "op-brand",
          title: "Recharge Your Brand",
          description: "Borrow equity from a fast-rising, intelligent challenger brand.",
        },
        {
          _key: "op-stakeholders",
          title: "Engage Your Stakeholders",
          description:
            "Turn fans, clients and team into participants through real experiences and content.",
        },
        {
          _key: "op-tech",
          title: "Demonstrate Your Technology",
          description: "Prove your capabilities in the most demanding performance environment.",
        },
        {
          _key: "op-network",
          title: "Grow Your Network",
          description:
            "Gain executive access and hospitality that opens doors cold outreach never could.",
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
          { text: "sets sail", highlight: true },
        ],
      },
      paragraphs: [
        "Choose your course. Each route maps to a business goal — and every partnership is shaped around the ones that matter most to you.",
      ],
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
      contactPortraitImage: "/assets/contact-portrait.png",
      signatureImage: "/assets/dennis-signature.svg",
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
