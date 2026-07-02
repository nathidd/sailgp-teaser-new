import type { PillarsSection } from "@/lib/data";
import { SectionId } from "@/lib/data";
import { Headline } from "@/components/Headline";
import { Reveal } from "@/components/Reveal";
import { isMeaningful, filterMeaningful } from "@/lib/render-utils";

/**
 * Brief Section 1 "Sports & Series" — the four-field infographic.
 * Global Scale · Momentum · Premium Audience · Impact Platform, each a
 * card of big-number stats. Grid is auto-fit so any pillar/stat count works.
 */
export function PitchPillars({ data }: { data: PillarsSection }) {
  const items = filterMeaningful(data.tenant.items).filter((p) =>
    isMeaningful(p.title)
  );
  if (items.length === 0) return null;

  const { label, headline } = data.editable;

  return (
    <section
      id={SectionId.pillars}
      className="tp-section tp-section--surface tp-pillars"
      aria-label={label ?? "Sports & Series"}
    >
      <div className="tp-container">
        <div className="tp-section-head">
          {isMeaningful(label) && (
            <Reveal>
              <p className="tp-eyebrow">{label}</p>
            </Reveal>
          )}
          {headline && (
            <Reveal delay={1}>
              <Headline data={headline} className="tp-display tp-display--lg" />
            </Reveal>
          )}
        </div>

        <div className="tp-pillars__grid">
          {items.map((pillar, i) => {
            const stats = filterMeaningful(pillar.stats).filter(
              (s) => isMeaningful(s.value) && isMeaningful(s.label)
            );
            return (
              <Reveal
                key={pillar._key ?? pillar.title}
                delay={(Math.min(i, 3) as 0 | 1 | 2 | 3)}
                className="tp-pillar"
              >
                <div className="tp-pillar__head">
                  <span className="tp-pillar__index" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <div>
                    <h3 className="tp-display tp-display--md tp-pillar__title">
                      {pillar.title}
                    </h3>
                    {isMeaningful(pillar.subtitle) && (
                      <p className="tp-pillar__subtitle">{pillar.subtitle}</p>
                    )}
                  </div>
                </div>

                {stats.length > 0 && (
                  <ul className="tp-pillar__stats">
                    {stats.map((s) => (
                      <li key={s._key ?? s.label} className="tp-pillar__stat">
                        <span className="tp-pillar__value">
                          {s.value}
                          {isMeaningful(s.suffix) && (
                            <span className="tp-pillar__suffix">{s.suffix}</span>
                          )}
                        </span>
                        <span className="tp-pillar__label">{s.label}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
