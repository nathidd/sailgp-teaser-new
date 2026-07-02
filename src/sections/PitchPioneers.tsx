import type { PioneersTimelineSection } from "@/lib/data";
import { SectionId } from "@/lib/data";
import { Reveal } from "@/components/Reveal";
import { isMeaningful } from "@/lib/render-utils";

export function PitchPioneers({ data }: { data: PioneersTimelineSection }) {
  const brand1 = data.prospect.brand1Name;
  const brand2 = data.tenant.brand2Name;
  if (!isMeaningful(brand1) && !isMeaningful(brand2)) return null;

  return (
    <section
      id={SectionId.pioneersTimeline}
      className="tp-section tp-pioneers"
      aria-label="Pioneers lockup"
    >
      <div className="tp-container">
        <Reveal>
          <div className="tp-pioneers__lockup">
            {isMeaningful(brand1) && (
              <span className="tp-pioneers__brand">{brand1}</span>
            )}
            <span className="tp-pioneers__cross" aria-hidden="true">
              ×
            </span>
            {isMeaningful(brand2) && (
              <span className="tp-pioneers__brand">{brand2}</span>
            )}
          </div>
          <p className="tp-eyebrow tp-pioneers__caption">Pioneers, together</p>
        </Reveal>
      </div>
    </section>
  );
}
