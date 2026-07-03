"use client";

import { useEffect, useState } from "react";
import type { ApproachSection } from "@/lib/data";
import { SectionId } from "@/lib/data";
import { Headline } from "@/components/Headline";
import { Reveal } from "@/components/Reveal";
import { FunnelChart } from "@/components/funnel-chart/funnel-chart";
import { isMeaningful, filterMeaningful, splitParagraphs } from "@/lib/render-utils";

/** Tracks a media query; defaults to `false` on the server, resolves after mount. */
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    // Defer the initial read out of the effect body (avoids a sync setState).
    const raf = requestAnimationFrame(update);
    mql.addEventListener("change", update);
    return () => {
      cancelAnimationFrame(raf);
      mql.removeEventListener("change", update);
    };
  }, [query]);
  return matches;
}

/**
 * Brief Section 6 "Partnership Approach" — the sales funnel. A full-width
 * headline + intro sits above a horizontal funnel whose five segments taper
 * from Awareness to Sales, each labelled with its stage name and action.
 */
export function PitchApproach({ data }: { data: ApproachSection }) {
  const { tenant, editable } = data;
  const label = editable.label ?? "How we partner";
  const paragraphs = (editable.paragraphs ?? []).flatMap(splitParagraphs);
  const stages = filterMeaningful(tenant.stages).filter((s) => isMeaningful(s.stage));
  const isMobile = useMediaQuery("(max-width: 600px)");

  if (stages.length === 0) return null;

  // The funnel is a qualitative journey (Awareness → Sales), so we drive the
  // chart's taper with descending synthetic weights rather than real metrics.
  // Each segment surfaces its stage name (prominent) and action (sub-label).
  const denom = Math.max(stages.length - 1, 1);
  const funnelData = stages.map((s, i) => ({
    label: isMeaningful(s.action) ? s.action : "",
    displayValue: s.stage,
    // Gentle taper (100 → 55) so the last steps stay wide, not needle-thin.
    value: 100 - (i / denom) * 45,
    // Ramp opacity up left→right (Awareness faint → Sales solid).
    color: `rgba(231, 255, 0, ${(0.4 + (i / denom) * 0.6).toFixed(3)})`,
  }));

  return (
    <section
      id={SectionId.approach}
      className="tp-section tp-approach"
      aria-label={label}
    >
      <div className="tp-container">
        <div className="tp-approach__inner">
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

          <Reveal delay={2} className="tp-approach__funnel-wrap">
            <FunnelChart
              data={funnelData}
              orientation={isMobile ? "vertical" : "horizontal"}
              color="var(--tp-color-accent)"
              layers={3}
              edges="straight"
              showPercentage={false}
              labelLayout="grouped"
              labelAlign="center"
              labelOrientation="vertical"
              style={{ aspectRatio: isMobile ? "1 / 1.2" : "2.8 / 1" }}
            />
          </Reveal>
        </div>
      </div>
    </section>
  );
}
