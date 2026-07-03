"use client";

import { useEffect, useState } from "react";
import type { ApproachSection } from "@/lib/data";
import { SectionId } from "@/lib/data";
import { Headline } from "@/components/Headline";
import { Reveal } from "@/components/Reveal";
import { FunnelChart } from "@/components/funnel-chart/funnel-chart";
import { isMeaningful, filterMeaningful, splitParagraphs } from "@/lib/render-utils";

/** Tracks whether the referenced element is in view; toggles on every crossing. */
function useInView() {
  const [node, setNode] = useState<HTMLElement | null>(null);
  const [inView, setInView] = useState(false);
  useEffect(() => {
    if (!node) return;
    const io = new IntersectionObserver(
      (entries) => setInView(entries.some((e) => e.isIntersecting)),
      { threshold: 0.15 }
    );
    io.observe(node);
    return () => io.disconnect();
  }, [node]);
  return [setNode, inView] as const;
}

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
  const [hovered, setHovered] = useState<number | null>(null);
  const [funnelRef, funnelInView] = useInView();
  // Mount the funnel only while it's in view (on every breakpoint). It unmounts
  // when scrolled away and remounts on re-entry, so its staggered "one after
  // another" entrance replays each time the section comes back into view.
  const showFunnel = funnelInView;

  if (stages.length === 0) return null;

  // Emotional backdrop: each stage carries an image that fades in behind the
  // section when its funnel segment is hovered; a default stage shows at rest.
  const defaultIndex = Math.max(
    stages.findIndex((s) => s.current),
    0
  );
  const activeImage = hovered ?? defaultIndex;

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
      {stages.map((s, i) =>
        isMeaningful(s.image?.src) ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={s._key ?? i}
            className={`tp-approach__bg${i === activeImage ? " is-active" : ""}`}
            src={s.image!.src}
            alt=""
            aria-hidden="true"
          />
        ) : null
      )}
      <div className="tp-approach__bg-scrim" aria-hidden="true" />

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
            <div
              ref={funnelRef}
              style={{ aspectRatio: isMobile ? "1 / 1.2" : "2.8 / 1" }}
            >
              {showFunnel && (
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
                  hoveredIndex={hovered}
                  onHoverChange={setHovered}
                  style={{ aspectRatio: "auto", width: "100%", height: "100%" }}
                />
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
