/*
 * EXAMPLE PROSPECT PAYLOAD — disposable preview content.
 *
 * `defaults.ts` keeps every prospect field as a {{PLACEHOLDER}} token; that
 * is the contract handed to Forge and it must stay that way. This file is
 * the other half: a worked example payload (hansgrohe) so the prototype can
 * be viewed with realistic content instead of raw tokens.
 *
 * This narrative deck personalizes a small surface: the partner name/logo
 * (top banner) and the personal note (invitation). At runtime Forge produces
 * a `ProspectPayload` and the platform overlays it on the tenant/editable
 * defaults, exactly what `mergeProspect` does below. When Forge is wired up,
 * delete this file (or swap `exampleProspect` for the real Forge call);
 * `data.ts`, `defaults.ts`, and every component stay untouched.
 */

import type { ProspectPayload, SiteData } from "./data";
import { defaultSiteData } from "./defaults";

// NOTE: placeholder wordmark — swap public/assets/images/hansgrohe-logo.svg
// with the official asset (same path) and it appears in the top banner.
const PARTNER_LOGO = { src: "/assets/images/hansgrohe-logo.svg", alt: "hansgrohe" };

export const exampleProspect: ProspectPayload = {
  hero: {
    partnerName: "hansgrohe",
    partnerLogo: PARTNER_LOGO,
  },

  opportunities: {
    partnerName: "hansgrohe",
    partnerLogo: PARTNER_LOGO,
  },

  invitation: {
    greeting: "Dear hansgrohe Team,",
    note:
      "Few brands understand water like hansgrohe. For over a century you've turned engineering precision into design people feel every day, and led on efficiency and responsibility.\n\nWater is our arena too. SailGP wins the way you build: through learning speed, precision and a team with no ego on board. And like you, we're not looking for a sponsor. We want a partner to create measurable impact with a premium, global audience.",
    closing:
      "I'd be glad to host you at a race weekend and show you what hansgrohe and SailGP Germany could set in motion.\n\nWith best regards,",
  },
};

/**
 * Overlay a prospect payload onto the tenant/editable defaults. This is the
 * runtime model Forge follows: only the small per-prospect surface (partner
 * name/logo, personal note) changes per pitch; everything else echoes the
 * tenant/editable defaults.
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

/** `defaultSiteData` with the hansgrohe example payload overlaid. */
export const exampleSiteData: SiteData = mergeProspect(
  defaultSiteData,
  exampleProspect
);
