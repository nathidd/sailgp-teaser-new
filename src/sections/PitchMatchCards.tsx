"use client";

import { useRef, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { MatchCardsSection, Asset } from "@/lib/data";
import { SectionId } from "@/lib/data";
import { isMeaningful, filterMeaningful } from "@/lib/render-utils";
import { ScrollIndicator } from "@/components/ScrollIndicator";

const slide = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.42, ease: "easeOut" as const } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.22, ease: "easeIn" as const } },
};

export function PitchMatchCards({
  data,
  sailgpLogo,
  partnerLogo,
  partnerName,
  nextSectionId,
}: {
  data: MatchCardsSection;
  sailgpLogo?: Asset;
  partnerLogo?: Asset;
  partnerName?: string;
  nextSectionId?: string;
}) {
  const items = filterMeaningful(data.items).filter(
    (m) =>
      isMeaningful(m.category) ||
      isMeaningful(m.sailgpSide) ||
      isMeaningful(m.prospectSide)
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section || items.length === 0) return;

    function onScroll() {
      const { top, height } = section!.getBoundingClientRect();
      const scrollable = height - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.max(0, Math.min(1, -top / scrollable));
      setActiveIndex(Math.min(Math.floor(progress * items.length), items.length - 1));
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [items.length]);

  if (items.length === 0) return null;

  const active = items[activeIndex];
  const showSailgpLogo = sailgpLogo && isMeaningful(sailgpLogo.src);
  const showPartnerLogo = partnerLogo && isMeaningful(partnerLogo.src);

  return (
    <section
      ref={sectionRef}
      id={SectionId.matchCards}
      className="tp-venn-section"
      style={{ height: `${items.length * 100}vh` }}
      aria-label="Shared values"
    >
      <div className="tp-venn-sticky">
        <div className="tp-container tp-venn-container">
          <header className="tp-venn__header">
            {isMeaningful(data.editable?.label) && (
              <p className="tp-eyebrow">{data.editable!.label}</p>
            )}
            {isMeaningful(data.editable?.headline) && (
              <h2 className="tp-display tp-display--lg">{data.editable!.headline}</h2>
            )}
          </header>

          <div className="tp-venn__dots" aria-label="Values" role="tablist">
            {items.map((item, i) => (
              <button
                key={item._key ?? i}
                role="tab"
                aria-selected={i === activeIndex}
                aria-label={item.category}
                className={`tp-venn__dot${i === activeIndex ? " is-active" : ""}`}
                onClick={() => {
                  const section = sectionRef.current;
                  if (!section) return;
                  const scrollable = section.getBoundingClientRect().height - window.innerHeight;
                  const target = section.offsetTop + (i / items.length) * scrollable;
                  window.scrollTo({ top: target, behavior: "smooth" });
                }}
              />
            ))}
          </div>

          <div className="tp-venn">
            {/* Decorative rings + text overlays */}
            <div className="tp-venn__circles">
              {/* Left circle — logo at top center */}
              <div className="tp-venn__circle tp-venn__circle--left">
                {showSailgpLogo && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={sailgpLogo!.src}
                    alt={sailgpLogo!.alt ?? "Germany SailGP Team"}
                    className="tp-venn__circle-logo"
                  />
                )}
              </div>

              {/* Right circle — logo at top center */}
              <div className="tp-venn__circle tp-venn__circle--right">
                {showPartnerLogo && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={partnerLogo!.src}
                    alt={partnerLogo!.alt ?? partnerName ?? "Partner"}
                    className="tp-venn__circle-logo"
                  />
                )}
              </div>

              {/* Left text — floats over the left non-overlap zone */}
              <div className="tp-venn__text tp-venn__text--left">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`l-${activeIndex}`}
                    className="tp-venn__side-text"
                    variants={slide}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    {active.sailgpSide}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Right text — floats over the right non-overlap zone */}
              <div className="tp-venn__text tp-venn__text--right">
                <AnimatePresence mode="wait">
                  <motion.p
                    key={`r-${activeIndex}`}
                    className="tp-venn__side-text"
                    variants={slide}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    {active.prospectSide}
                  </motion.p>
                </AnimatePresence>
              </div>

              {/* Center overlap — shared value name */}
              <div className="tp-venn__center" aria-hidden>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={`c-${activeIndex}`}
                    className="tp-venn__shared-value"
                    variants={slide}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                  >
                    {active.category}
                  </motion.span>
                </AnimatePresence>
              </div>
            </div>


            {/* Tagline */}
            <AnimatePresence mode="wait">
              <motion.p
                key={`t-${activeIndex}`}
                className="tp-venn__tagline"
                variants={slide}
                initial="initial"
                animate="animate"
                exit="exit"
              >
                {active.tagline}
              </motion.p>
            </AnimatePresence>
          </div>

          {nextSectionId && (
            <div className="tp-venn__next">
              <ScrollIndicator
                href={`#${nextSectionId}`}
                label="Click to continue"
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
