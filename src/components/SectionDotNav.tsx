"use client";

import { useEffect, useState } from "react";
import { SectionId } from "@/lib/data";

const SECTIONS = [
  { id: SectionId.hero, label: "Intro" },
  { id: SectionId.pillars, label: "Why SailGP" },
  { id: SectionId.team, label: "Who we are" },
  { id: SectionId.positioning, label: "How we compete" },
  { id: SectionId.impact, label: "How we impact" },
  { id: SectionId.network, label: "Who we connect" },
  { id: SectionId.approach, label: "How we partner" },
  { id: SectionId.opportunities, label: "Your course" },
  { id: SectionId.invitation, label: "Invitation" },
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
