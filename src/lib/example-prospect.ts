/*
 * EXAMPLE PROSPECT PAYLOAD — disposable preview content.
 *
 * `defaults.ts` keeps every prospect field as a {{PLACEHOLDER}} token —
 * that is the contract handed to Forge and it must stay that way. This
 * file is the other half: a worked example payload (HONOR) so the
 * prototype can be viewed with realistic content instead of raw tokens.
 *
 * This narrative deck personalizes a small surface, so the payload is
 * small: the partner logo (hero + course) and the personal note. At
 * runtime Forge produces a `ProspectPayload` and the platform overlays it
 * on the tenant/editable defaults — exactly what `mergeProspect` does
 * below. When Forge is wired up, delete this file (or swap `exampleProspect`
 * for the real Forge call); `data.ts`, `defaults.ts`, and every component
 * stay untouched.
 */

import type { ProspectPayload, SiteData } from "./data";
import { defaultSiteData } from "./defaults";

const PARTNER_LOGO = { src: "/assets/Partner Logo White.png", alt: "HONOR" };

export const exampleProspect: ProspectPayload = {
  hero: {
    partnerName: "HONOR",
    partnerLogo: PARTNER_LOGO,
  },

  opportunities: {
    partnerName: "HONOR",
    partnerLogo: PARTNER_LOGO,
  },

  invitation: {
    greeting: "Dear HONOR team,",
    note:
      "We've followed HONOR's move from smartphone brand to global AI device ecosystem, and it's exactly the kind of ambition that deserves a stage where technology becomes visible, emotional and real.\n\nThis invitation isn't a hospitality package. It's a weekend on the inside — paddock access, tech-team briefings, and the moments between races where the real conversations happen. I'd like to host you personally.",
    closing: "Looking forward to meeting you at the water's edge.",
  },
};

/**
 * Overlay a prospect payload onto the tenant/editable defaults. This is
 * the runtime model Forge follows — only the small per-prospect surface
 * (partner logo, personal note) changes per pitch; everything else echoes
 * the tenant/editable defaults.
 */
export function mergeProspect(
  base: SiteData,
  prospect: ProspectPayload
): SiteData {
  return {
    ...base,
    hero: { ...base.hero, prospect: prospect.hero },
    opportunities: { ...base.opportunities, prospect: prospect.opportunities },
    invitation: { ...base.invitation, prospect: prospect.invitation },
  };
}

/** `defaultSiteData` with the HONOR example payload overlaid. */
export const exampleSiteData: SiteData = mergeProspect(
  defaultSiteData,
  exampleProspect
);
