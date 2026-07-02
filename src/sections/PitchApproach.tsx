import type { ApproachSection } from "@/lib/data";
import { SectionId } from "@/lib/data";
import { Headline } from "@/components/Headline";
import { Reveal } from "@/components/Reveal";
import { isMeaningful, filterMeaningful, splitParagraphs } from "@/lib/render-utils";

/**
 * Brief Section 6 "Partnership Approach" — the 5-stage sales funnel
 * (Awareness → Sales), each stage carrying its benefit line. Bars taper
 * toward the point; width is derived from the stage count so any count works.
 */
export function PitchApproach({ data }: { data: ApproachSection }) {
  const { tenant, editable } = data;
  const paragraphs = (editable.paragraphs ?? []).flatMap(splitParagraphs);
  const stages = filterMeaningful(tenant.stages).filter((s) => isMeaningful(s.stage));
  const last = Math.max(stages.length - 1, 1);

  return (
    <section
      id={SectionId.approach}
      className="tp-section tp-section--surface-strong tp-approach"
      aria-label={editable.label ?? "How we partner"}
    >
      <div className="tp-container tp-approach__inner">
        <div className="tp-section-head">
          {isMeaningful(editable.label) && (
            <Reveal>
              <p className="tp-eyebrow">{editable.label}</p>
            </Reveal>
          )}
          {editable.headline && (
            <Reveal delay={1}>
              <Headline data={editable.headline} className="tp-display tp-display--lg" />
            </Reveal>
          )}
          {paragraphs.length > 0 && (
            <Reveal delay={2} className="tp-approach__body">
              {paragraphs.map((p, i) => (
                <p key={i} className="tp-body tp-body--muted">
                  {p}
                </p>
              ))}
            </Reveal>
          )}
        </div>

        {stages.length > 0 && (
          <ol className="tp-approach__funnel">
            {stages.map((s, i) => {
              // 100% at the top, tapering to ~62% at the point.
              const width = 100 - (i / last) * 38;
              return (
                <Reveal
                  key={s._key ?? s.stage}
                  delay={(Math.min(i, 6) as 0 | 1 | 2 | 3 | 4 | 5 | 6)}
                  className="tp-approach__stage"
                >
                  <div className="tp-approach__bar" style={{ width: `${width}%` }}>
                    <span className="tp-approach__stage-name">{s.stage}</span>
                    {isMeaningful(s.action) && (
                      <span className="tp-approach__stage-action">{s.action}</span>
                    )}
                  </div>
                  {isMeaningful(s.description) && (
                    <p className="tp-approach__stage-desc tp-body tp-body--muted">
                      {s.description}
                    </p>
                  )}
                </Reveal>
              );
            })}
          </ol>
        )}
      </div>
    </section>
  );
}
