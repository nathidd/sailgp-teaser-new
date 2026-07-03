"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { PillarsSection } from "@/lib/data";
import { SectionId } from "@/lib/data";
import { PillarGlobe } from "@/components/PillarGlobe";
import { isMeaningful, filterMeaningful } from "@/lib/render-utils";

/**
 * Brief Section 1 "Sports & Series" — a scroll-driven tabbed infographic.
 * The section is tall (one viewport per pillar) with a sticky stage: a
 * full-width tab bar auto-advances as you scroll, and the active pillar's
 * title + KPIs render below (count-up re-fires on each tab).
 */
export function PitchPillars({ data }: { data: PillarsSection }) {
  const items = filterMeaningful(data.tenant.items).filter((p) => isMeaningful(p.title));
  const ref = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [hoveredSpot, setHoveredSpot] = useState<number | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || items.length === 0) return;
    const onScroll = () => {
      const rect = el.getBoundingClientRect();
      const total = el.offsetHeight - window.innerHeight;
      const scrolled = Math.min(Math.max(-rect.top, 0), Math.max(total, 1));
      const p = total > 0 ? scrolled / total : 0;
      const idx = Math.min(items.length - 1, Math.max(0, Math.floor(p * items.length)));
      setActive(idx);
      setHoveredSpot(null);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [items.length]);

  if (items.length === 0) return null;

  const current = items[Math.min(active, items.length - 1)];
  const stats = filterMeaningful(current.stats).filter(
    (s) => isMeaningful(s.value) && isMeaningful(s.label)
  );

  // One persistent globe across the globe pillars (Global Scale + Momentum).
  const globeItem = items.find((p) => (p.destinations?.length ?? 0) > 0);
  const globeDestinations = (globeItem?.destinations ?? []).map((d, i) => ({
    id: d._key ?? `${d.city}-${i}`,
    city: d.city,
    date: d.date,
    lat: d.lat,
    lng: d.lng,
  }));
  const usesGlobe = !!(current.destinations?.length || current.broadcast);
  const globeMode = current.broadcast ? "broadcast" : "destinations";

  // Clicking a tab scrolls to the start of that pillar's scroll band.
  const jumpTo = (i: number) => {
    const el = ref.current;
    if (!el) return;
    const sectionTop = el.getBoundingClientRect().top + window.scrollY;
    const total = el.offsetHeight - window.innerHeight;
    window.scrollTo({ top: sectionTop + (i / items.length) * total + 8, behavior: "smooth" });
  };

  return (
    <section
      id={SectionId.pillars}
      ref={ref}
      className="tp-section tp-pillars"
      aria-label={data.editable.label ?? "Sports & Series"}
      style={{ height: `${items.length * 100}vh`, padding: 0 }}
    >
      <div className="tp-pillars__sticky">
        <div className="tp-container tp-pillars__stage">
          <div className="tp-pillars__tabbar" role="tablist" aria-label={data.editable.label ?? "Sports & Series"}>
            {items.map((p, i) => (
              <button
                key={p._key ?? p.title}
                type="button"
                role="tab"
                aria-selected={i === active}
                className={`tp-pillars__tab${i === active ? " is-active" : ""}`}
                onClick={() => jumpTo(i)}
              >
                <span className="tp-pillars__tab-num">{String(i + 1).padStart(2, "0")}</span>
                <span className="tp-pillars__tab-name">{p.title}</span>
              </button>
            ))}
            <span
              className="tp-pillars__tab-fill"
              style={{
                width: `${100 / items.length}%`,
                transform: `translateX(${active * 100}%)`,
              }}
              aria-hidden="true"
            />
          </div>

          <div className="tp-pillars__content">
            {/* Persistent viz: one globe (mode morphs) across globe pillars,
                plus the crowd image for image pillars. */}
            <div className="tp-pillars__viz">
              <div className={`tp-pillars__globe-wrap${usesGlobe ? "" : " is-hidden"}`}>
                <PillarGlobe mode={globeMode} destinations={globeDestinations} />
              </div>
              {isMeaningful(current.image?.src) && (current.spots?.length ?? 0) > 0 && (
                <div className="tp-pillars__crowd">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={current.image!.src}
                    alt={current.image!.alt ?? ""}
                    className="tp-pillars__crowd-img"
                  />
                  <div className="tp-pillars__crowd-scrim" aria-hidden="true" />
                  {current.spots!.map((sp, i) => {
                    const tag = stats[i]?.tag;
                    const dim = hoveredSpot !== null && hoveredSpot !== i;
                    return (
                      <button
                        key={i}
                        type="button"
                        className={`tp-pillars__spot${dim ? " is-dim" : ""}`}
                        style={{ left: `${sp.x}%`, top: `${sp.y}%` }}
                        onMouseEnter={() => setHoveredSpot(i)}
                        onMouseLeave={() => setHoveredSpot(null)}
                        onFocus={() => setHoveredSpot(i)}
                        onBlur={() => setHoveredSpot(null)}
                        aria-label={tag}
                      >
                        <span className="tp-pillars__spot-pulse" />
                        <span className="tp-pillars__spot-pulse tp-pillars__spot-pulse--2" />
                        <span className="tp-pillars__spot-dot" />
                        {isMeaningful(tag) && (
                          <span className="tp-pillars__spot-label">{tag}</span>
                        )}
                      </button>
                    );
                  })}
                </div>
              )}
            </div>

            <div className="tp-pillars__textstack">
            <AnimatePresence initial={false}>
              <motion.div
                key={current._key ?? active}
                className="tp-pillars__textblock"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.5, ease: [0.4, 0, 0.2, 1] }}
              >
                {(isMeaningful(current.subtitle) || isMeaningful(current.caption)) && (
                  <div className="tp-pillars__head">
                    {isMeaningful(current.subtitle) && (
                      <h3 className="tp-display tp-display--lg tp-pillars__title">
                        {current.subtitle}
                      </h3>
                    )}
                    {isMeaningful(current.caption) && (
                      <p className="tp-pillars__caption">{current.caption}</p>
                    )}
                  </div>
                )}
                {stats.length > 0 && (
                  <ul className="tp-pillars__stats">
                    {stats.map((s, i) => (
                      <li
                        key={s._key ?? s.label}
                        className={`tp-pillars__stat${
                          hoveredSpot !== null && hoveredSpot !== i ? " is-dim" : ""
                        }`}
                      >
                        <span className="tp-pillars__value">{s.value}</span>
                        <span className="tp-pillars__label">{s.label}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </motion.div>
            </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
