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
    greeting: "Dear Alibaba Team,",
    note:
      "We've been following Alibaba's journey with great admiration. As a global force in commerce, technology, logistics and cloud infrastructure, you don't just connect markets. You shape how people, businesses and ideas move across the world.\n\nAt Germany SailGP, we share that same ambition. Our sport is built on speed, precision and innovation, powered by nature and amplified by technology. Every race pushes the limits of performance, data and teamwork on a global stage.\n\nWe are not looking for sponsors. We are looking for partners who want to create meaningful impact, reach high-value audiences and be part of one of the world's fastest-growing sports platforms.",
    closing:
      "We would be delighted to show you what a partnership between Alibaba and Germany SailGP Team could create.\n\nWith best regards,",
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
