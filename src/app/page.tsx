import { TopBanner } from "@/components/TopBanner";
import { NoiseOverlay } from "@/components/NoiseOverlay";
import { SectionDotNav } from "@/components/SectionDotNav";
import { PitchHero } from "@/sections/PitchHero";
import { PitchStats } from "@/sections/PitchStats";
import { PitchBrandStory } from "@/sections/PitchBrandStory";
import { PitchMatchCards } from "@/sections/PitchMatchCards";
import { PitchActivations } from "@/sections/PitchActivations";
import { PitchKeyRights } from "@/sections/PitchKeyRights";
import { PitchNextSteps } from "@/sections/PitchNextSteps";
import { PitchMotivationLetter } from "@/sections/PitchMotivationLetter";
import { PitchPioneers } from "@/sections/PitchPioneers";
import { defaultSiteData } from "@/lib/defaults";
import { exampleSiteData } from "@/lib/example-prospect";
import { SectionId } from "@/lib/data";

/*
 * true  → renders the HONOR example payload (realistic preview).
 * false → renders the raw {{PLACEHOLDER}} contract from defaults.ts.
 *
 * `valueMatch` and `matchPoints` stay in the schema but are NOT rendered
 * here — see pitch-deck-template-brief.md §4.6. They remain available for
 * a future pitch cockpit.
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
        <PitchStats data={data.stats} />
        <PitchBrandStory data={data.brandStory} />
        <PitchMatchCards
          data={data.matchCards}
          sailgpLogo={data.hero.tenant.logo}
          partnerLogo={data.hero.prospect.partnerLogo}
          partnerName={data.hero.prospect.partnerName}
          nextSectionId={SectionId.experienceActivations}
        />
        <PitchActivations data={data.experienceActivations} nextSectionId={SectionId.keyRights} />
        <PitchKeyRights
          data={data.keyRights}
          partnerLogo={data.hero.prospect.partnerLogo}
          partnerName={data.hero.prospect.partnerName}
        />
        <PitchNextSteps data={data.nextSteps} />
        <PitchMotivationLetter data={data.motivationLetter} />
        <PitchPioneers data={data.pioneersTimeline} />
      </main>
      <NoiseOverlay />
      <SectionDotNav />
    </>
  );
}
