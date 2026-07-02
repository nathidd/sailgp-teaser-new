import { SectionId } from "@/lib/data";
import { Reveal } from "@/components/Reveal";
import { isMeaningful } from "@/lib/render-utils";

/**
 * Renders the loose root-level `tagline` string as a standalone visual beat
 * between sections. The hero already supports an optional tagline above
 * its badge; this is the dedicated "spacer" treatment for the same string
 * when the brief calls for a full-width emphasis moment.
 */
export function PitchTagline({ value }: { value: string }) {
  if (!isMeaningful(value)) return null;
  return (
    <section
      id={SectionId.tagline}
      className="tp-section tp-tagline"
      aria-label="Tagline"
    >
      <div className="tp-container">
        <Reveal>
          <p className="tp-display tp-display--xl tp-tagline__text">{value}</p>
        </Reveal>
      </div>
    </section>
  );
}
