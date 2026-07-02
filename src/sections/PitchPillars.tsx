"use client";

import { useState } from "react";
import type { PillarsSection } from "@/lib/data";
import { SectionId } from "@/lib/data";
import { CountUp } from "@/components/CountUp";
import { Icon } from "@/components/Icon";
import { isMeaningful, filterMeaningful } from "@/lib/render-utils";

/**
 * Brief Section 1 "Sports & Series" — a tabbed infographic. The four
 * pillars (Global Scale · Momentum · Premium Audience · Impact Platform)
 * live as tabs on the left; the active pillar's stats fill the panel on
 * the right, with animated count-up numbers.
 */
export function PitchPillars({ data }: { data: PillarsSection }) {
  const items = filterMeaningful(data.tenant.items).filter((p) => isMeaningful(p.title));
  const [active, setActive] = useState(0);
  if (items.length === 0) return null;

  const label = data.editable.label ?? "Sports & Series";
  const current = items[Math.min(active, items.length - 1)];
  const stats = filterMeaningful(current.stats).filter(
    (s) => isMeaningful(s.value) && isMeaningful(s.label)
  );

  return (
    <section
      id={SectionId.pillars}
      className="tp-section tp-pillars"
      aria-label={label}
    >
      <div className="tp-container">
        <div className="tp-pillars__layout">
          <ol className="tp-pillars__tabs" role="tablist" aria-label={label}>
            {items.map((pillar, i) => (
              <li key={pillar._key ?? pillar.title}>
                <button
                  type="button"
                  role="tab"
                  aria-selected={i === active}
                  className={`tp-pillar-tab${i === active ? " is-active" : ""}`}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setActive(i)}
                >
                  <Icon name={pillar.icon} className="tp-pillar-tab__icon" />
                  <span className="tp-pillar-tab__text">
                    <span className="tp-pillar-tab__index">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span className="tp-pillar-tab__title">{pillar.title}</span>
                  </span>
                  <span className="tp-pillar-tab__arrow" aria-hidden="true">
                    <Icon name="arrow" size={18} />
                  </span>
                </button>
              </li>
            ))}
          </ol>

          <div className="tp-pillars__panel" role="tabpanel">
            <p className="tp-pillar-panel__eyebrow">
              <Icon name={current.icon} size={18} />
              {current.title}
            </p>
            {isMeaningful(current.subtitle) && (
              <h3 className="tp-display tp-display--lg tp-pillar-panel__title">
                {current.subtitle}
              </h3>
            )}
            {stats.length > 0 && (
              <ul className="tp-pillar-panel__stats">
                {stats.map((s) => (
                  <li key={s._key ?? s.label} className="tp-pillar-panel__stat">
                    <span className="tp-pillar-panel__value">
                      <CountUp value={s.value} />
                    </span>
                    <span className="tp-pillar-panel__label">{s.label}</span>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
