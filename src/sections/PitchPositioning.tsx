"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import type { PositioningSection } from "@/lib/data";
import { SectionId } from "@/lib/data";
import { Headline } from "@/components/Headline";
import { Reveal } from "@/components/Reveal";
import { MobileEyebrow } from "@/components/MobileEyebrow";
import { isMeaningful, splitParagraphs } from "@/lib/render-utils";

/** Tracks a media query; false on the server, resolves after mount. */
function useMediaQuery(query: string): boolean {
  const [matches, setMatches] = useState(false);
  useEffect(() => {
    const mql = window.matchMedia(query);
    const update = () => setMatches(mql.matches);
    const raf = requestAnimationFrame(update);
    mql.addEventListener("change", update);
    return () => {
      cancelAnimationFrame(raf);
      mql.removeEventListener("change", update);
    };
  }, [query]);
  return matches;
}

const img = (n: string) => `/assets/images/${n}.webp`;
const LEFT = ["races 1", "boot 6", "races 4"].map(img);
const RIGHT = ["races 3", "sailgp-rio", "boot 5"].map(img);

/**
 * Brief Section 3 "Positioning" — presented as a sticky parallax race gallery
 * with the copy sitting in the middle column on desktop (flanked by two image
 * columns that drift at different rates). On mobile the copy stacks on top and
 * the images form a static grid below.
 */
export function PitchPositioning({ data }: { data: PositioningSection }) {
  const { editable } = data;
  const label = editable.label ?? "How we compete";
  const paragraphs = (editable.paragraphs ?? []).flatMap(splitParagraphs);

  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const isDesktop = useMediaQuery("(min-width: 901px)");
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const yL = useTransform(scrollYProgress, [0, 1], ["0%", "-46%"]);
  const yR = useTransform(scrollYProgress, [0, 1], ["-46%", "0%"]);
  const parallax = isDesktop && !reduce;

  return (
    <section
      id={SectionId.positioning}
      ref={ref}
      className="tp-section tp-compete"
      aria-label={label}
    >
      <div className="tp-compete__sticky">
        <motion.div
          className="tp-compete__col tp-compete__col--left"
          style={parallax ? { y: yL } : undefined}
          aria-hidden="true"
        >
          {LEFT.map((src, i) => (
            <Reveal key={src} delay={(Math.min(i, 3) as 0 | 1 | 2 | 3)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="tp-compete__img" />
            </Reveal>
          ))}
        </motion.div>

        <div className="tp-compete__text">
          {editable.headline && (
            <Reveal delay={1}>
              <MobileEyebrow label="How we compete" />
              <Headline data={editable.headline} className="tp-display tp-display--lg" />
            </Reveal>
          )}
          {paragraphs.length > 0 && (
            <Reveal delay={2} className="tp-compete__body">
              {paragraphs.map((p, i) => (
                <p key={i} className="tp-body tp-body--muted">
                  {p}
                </p>
              ))}
            </Reveal>
          )}
          {isMeaningful(editable.statement) && (
            <Reveal delay={2}>
              <p className="tp-quote tp-quote--highlight">{editable.statement}</p>
            </Reveal>
          )}
        </div>

        <motion.div
          className="tp-compete__col tp-compete__col--right"
          style={parallax ? { y: yR } : undefined}
          aria-hidden="true"
        >
          {RIGHT.map((src, i) => (
            <Reveal key={src} delay={(Math.min(i, 3) as 0 | 1 | 2 | 3)}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={src} alt="" className="tp-compete__img" />
            </Reveal>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
