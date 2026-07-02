"use client";

import { useState } from "react";
import type { ApproachSection } from "@/lib/data";
import { SectionId } from "@/lib/data";
import { Headline } from "@/components/Headline";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { isMeaningful, filterMeaningful, splitParagraphs } from "@/lib/render-utils";

/**
 * Brief Section 6 "Partnership Approach" — the sales funnel. Five stair-
 * stepped stages taper toward the point; hovering/focusing a stage drives
 * the "Now focusing" detail card on the left. (Inspired by the Lovable
 * approach section.)
 */
export function PitchApproach({ data }: { data: ApproachSection }) {
  const { tenant, editable } = data;
  const label = editable.label ?? "How we partner";
  const paragraphs = (editable.paragraphs ?? []).flatMap(splitParagraphs);
  const stages = filterMeaningful(tenant.stages).filter((s) => isMeaningful(s.stage));

  const defaultIndex = Math.max(
    stages.findIndex((s) => s.current),
    0
  );
  const [active, setActive] = useState(defaultIndex);

  if (stages.length === 0) return null;
  const current = stages[Math.min(active, stages.length - 1)];

  return (
    <section
      id={SectionId.approach}
      className="tp-section tp-section--surface-strong tp-approach"
      aria-label={label}
    >
      <div className="tp-container">
        <div className="tp-approach__inner">
          <div className="tp-approach__text">
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

            <Reveal delay={2} className="tp-approach__focus" aria-live="polite">
              <p className="tp-approach__focus-label">
                <Icon name="compass" size={16} />
                Now focusing
              </p>
              <p className="tp-approach__focus-stage">{current.stage}</p>
              {isMeaningful(current.action) && (
                <p className="tp-approach__focus-action">{current.action}</p>
              )}
              {isMeaningful(current.description) && (
                <p className="tp-approach__focus-desc tp-body tp-body--muted">
                  {current.description}
                </p>
              )}
            </Reveal>
          </div>

          <Reveal delay={1} className="tp-approach__funnel-wrap">
            <div className="tp-approach__funnel-head">
              <span className="tp-approach__hint">Hover to explore</span>
            </div>
            <ol className="tp-approach__funnel">
              {stages.map((s, i) => {
                const indent = stages.length > 1 ? (i / (stages.length - 1)) * 26 : 0;
                return (
                  <li key={s._key ?? s.stage} className="tp-approach__stage-item">
                    <button
                      type="button"
                      className={`tp-funnel-bar${i === active ? " is-active" : ""}`}
                      style={{ marginLeft: `${indent}%`, width: `${100 - indent}%` }}
                      onMouseEnter={() => setActive(i)}
                      onFocus={() => setActive(i)}
                      aria-pressed={i === active}
                    >
                      <span className="tp-funnel-bar__num">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="tp-funnel-bar__stage">{s.stage}</span>
                      {isMeaningful(s.action) && (
                        <span className="tp-funnel-bar__action">{s.action}</span>
                      )}
                    </button>
                  </li>
                );
              })}
            </ol>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
