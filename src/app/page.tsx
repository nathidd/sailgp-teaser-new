import { TopBanner } from "@/components/TopBanner";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { SectionDotNav } from "@/components/SectionDotNav";
import { PitchHero } from "@/sections/PitchHero";
import { PitchPillars } from "@/sections/PitchPillars";
import { PitchTeam } from "@/sections/PitchTeam";
import { PitchPositioning } from "@/sections/PitchPositioning";
import { PitchImpact } from "@/sections/PitchImpact";
import { PitchNetwork } from "@/sections/PitchNetwork";
import { PitchApproach } from "@/sections/PitchApproach";
import { PitchOpportunities } from "@/sections/PitchOpportunities";
import { PitchInvitation } from "@/sections/PitchInvitation";
import { defaultSiteData } from "@/lib/defaults";
import { exampleSiteData } from "@/lib/example-prospect";

/*
 * true  → renders the HONOR example payload (realistic preview).
 * false → renders the raw {{PLACEHOLDER}} contract from defaults.ts.
 *
 * This narrative deck is mostly tenant/editable copy; the toggle only
 * swaps the small per-prospect surface (partner logo + personal note).
 */
const USE_EXAMPLE_PROSPECT = true;

export default function Page() {
  const data = USE_EXAMPLE_PROSPECT ? exampleSiteData : defaultSiteData;
  return (
    <>
      <a id="top" />
      <TopBanner data={data.hero} />
      <main>
        <PitchHero data={data.hero} />
        <PitchPillars data={data.pillars} />
        <PitchTeam data={data.team} />
        <PitchPositioning data={data.positioning} />
        <PitchImpact data={data.impact} />
        <PitchNetwork data={data.network} />
        <PitchApproach data={data.approach} />
        <PitchOpportunities data={data.opportunities} />
        <PitchInvitation data={data.invitation} />
      </main>
      <NoiseOverlay />
      <SectionDotNav />
    </>
  );
}
