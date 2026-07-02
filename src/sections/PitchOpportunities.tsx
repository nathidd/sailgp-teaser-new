"use client";

import { useState } from "react";
import type { OpportunitiesSection } from "@/lib/data";
import { SectionId } from "@/lib/data";
import { Headline } from "@/components/Headline";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { isMeaningful, filterMeaningful } from "@/lib/render-utils";

/** Join selected phrases into a sentence: "a", "a and b", "a, b and c". */
function joinCourse(parts: string[]): string {
  if (parts.length === 0) return "";
  if (parts.length === 1) return parts[0];
  return `${parts.slice(0, -1).join(", ")} and ${parts[parts.length - 1]}`;
}

/**
 * Brief Section 7 "Partnership Opportunities" — an interactive course
 * builder. Tap routes to select them; the pips and live summary reflect
 * the combination, and "Discuss this course" carries it into the
 * invitation. (Inspired by the Lovable course builder.)
 */
export function PitchOpportunities({ data }: { data: OpportunitiesSection }) {
  const { tenant, editable } = data;
  const label = editable.label ?? "Your course";
  const items = filterMeaningful(tenant.items).filter((it) => isMeaningful(it.title));
  const ctaLabel = isMeaningful(editable.ctaLabel) ? editable.ctaLabel! : "Discuss this course";
  const ctaHref = isMeaningful(editable.ctaHref) ? editable.ctaHref! : `#${SectionId.invitation}`;

  const [selected, setSelected] = useState<Set<number>>(new Set());
  const toggle = (i: number) =>
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i);
      else next.add(i);
      return next;
    });

  const chosen = items
    .map((it, i) => ({ it, i }))
    .filter(({ i }) => selected.has(i));
  const summary = joinCourse(chosen.map(({ it }) => it.short?.trim() || it.title.toLowerCase()));
  const hasChosen = chosen.length > 0;

  return (
    <section
      id={SectionId.opportunities}
      className="tp-section tp-opportunities"
      aria-label={label}
    >
      <div className="tp-container">
        <div className="tp-opportunities__head">
          {editable.headline && (
            <Reveal delay={1}>
              <Headline data={editable.headline} className="tp-display tp-display--lg" />
            </Reveal>
          )}
          <Reveal delay={1}>
            <p className="tp-opportunities__hint">
              <Icon name="compass" size={16} />
              Tap to build your course.
            </p>
          </Reveal>
        </div>

        {items.length > 0 && (
          <>
            <ul className="tp-course-cards">
              {items.map((it, i) => {
                const isOn = selected.has(i);
                return (
                  <Reveal
                    key={it._key ?? it.title}
                    delay={(Math.min(i, 6) as 0 | 1 | 2 | 3 | 4 | 5 | 6)}
                    className="tp-course-card-wrap"
                  >
                    <button
                      type="button"
                      className={`tp-course-card${isOn ? " is-selected" : ""}`}
                      aria-pressed={isOn}
                      onClick={() => toggle(i)}
                    >
                      <span className="tp-course-card__top">
                        <Icon name={it.icon} className="tp-course-card__icon" />
                        <span className="tp-course-card__toggle" aria-hidden="true">
                          <Icon name={isOn ? "check" : "plus"} size={16} />
                        </span>
                      </span>
                      <span className="tp-course-card__title">{it.title}</span>
                      {isMeaningful(it.description) && (
                        <span className="tp-course-card__desc">{it.description}</span>
                      )}
                      <span className="tp-course-card__route">
                        <Icon name="compass" size={14} />
                        Route {String(i + 1).padStart(2, "0")}
                      </span>
                    </button>
                  </Reveal>
                );
              })}
            </ul>

            <Reveal className="tp-course-builder" delay={1}>
              <span className="tp-course-builder__label">Your course</span>
              <span className="tp-course-builder__pips" aria-hidden="true">
                {items.map((it, i) => (
                  <span
                    key={it._key ?? i}
                    className={`tp-course-builder__pip${selected.has(i) ? " is-on" : ""}`}
                  />
                ))}
              </span>
              <p className="tp-course-builder__value" aria-live="polite">
                {hasChosen ? (
                  <>A course combining {summary}.</>
                ) : (
                  <span className="tp-course-builder__placeholder">
                    Tap routes above to build your course.
                  </span>
                )}
              </p>
              <a
                href={ctaHref}
                className={`tp-btn tp-btn--primary tp-course-builder__cta${
                  hasChosen ? "" : " is-disabled"
                }`}
                aria-disabled={!hasChosen}
              >
                {ctaLabel}
                <span aria-hidden="true">→</span>
              </a>
            </Reveal>
          </>
        )}
      </div>
    </section>
  );
}
