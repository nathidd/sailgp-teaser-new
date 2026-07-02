"use client";

import { useEffect, useState } from "react";
import { SectionId } from "@/lib/data";

const SECTIONS = [
  { id: SectionId.hero, label: "Intro" },
  { id: SectionId.stats, label: "About" },
  { id: SectionId.brandStory, label: "Why We Fit" },
  { id: SectionId.matchCards, label: "How we match" },
  { id: SectionId.experienceActivations, label: "Experiences & Activations" },
  { id: SectionId.keyRights, label: "Partnership Structure" },
  { id: SectionId.nextSteps, label: "Pricing Packages" },
  { id: SectionId.motivationLetter, label: "Letter" },
];

export function SectionDotNav() {
  const [active, setActive] = useState<string>(SectionId.hero);

  useEffect(() => {
    if (typeof IntersectionObserver === "undefined") return;

    const observers: IntersectionObserver[] = [];

    for (const section of SECTIONS) {
      const el = document.getElementById(section.id);
      if (!el) continue;

      const observer = new IntersectionObserver(
        (entries) => {
          for (const entry of entries) {
            if (entry.isIntersecting) setActive(section.id);
          }
        },
        { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
      );
      observer.observe(el);
      observers.push(observer);
    }

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  return (
    <nav className="tp-dot-nav" aria-label="Page navigation">
      <ol className="tp-dot-nav__list">
        {SECTIONS.map(({ id, label }) => (
          <li key={id} className="tp-dot-nav__item">
            <a
              href={`#${id}`}
              className={`tp-dot-nav__dot${active === id ? " is-active" : ""}`}
              aria-label={label}
              aria-current={active === id ? "true" : undefined}
            >
              <span className="tp-dot-nav__label">{label}</span>
              <span className="tp-dot-nav__pip" aria-hidden="true" />
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
