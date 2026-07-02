"use client";

import { useState, useEffect, useRef } from "react";
import type { ActivationItem, ActivationsSection } from "@/lib/data";
import { SectionId } from "@/lib/data";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import { isMeaningful, filterMeaningful, splitParagraphs } from "@/lib/render-utils";

const RADIUS = 400;
const AUTO_SPEED = 0.015;

function normalizedAngle(itemAngle: number, rot: number): number {
  const r = ((itemAngle + rot) % 360 + 360) % 360;
  return Math.min(r, 360 - r);
}

function itemDetail(item: ActivationItem): string {
  return filterMeaningful(item.details ?? []).flatMap(splitParagraphs).join(" ").trim();
}

export function PitchActivations({
  data,
  nextSectionId,
}: {
  data: ActivationsSection;
  nextSectionId?: string;
}) {
  const items = filterMeaningful(data.prospect.items).filter(
    (i) => isMeaningful(i.title) || isMeaningful(i.description)
  );
  if (items.length === 0) return null;
  return <Gallery data={data} items={items} nextSectionId={nextSectionId} />;
}

function Gallery({
  data,
  items,
  nextSectionId,
}: {
  data: ActivationsSection;
  items: ActivationItem[];
  nextSectionId?: string;
}) {
  const sectionRef = useRef<HTMLElement>(null);
  const [rotation, setRotation] = useState(0);
  const [isScrolling, setIsScrolling] = useState(false);
  const scrollTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const onScroll = () => {
      setIsScrolling(true);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);

      const { top, height } = section.getBoundingClientRect();
      const scrollable = height - window.innerHeight;
      if (scrollable > 0) {
        const progress = Math.max(0, Math.min(1, -top / scrollable));
        setRotation(progress * 360);
      }

      scrollTimeout.current = setTimeout(() => setIsScrolling(false), 150);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (scrollTimeout.current) clearTimeout(scrollTimeout.current);
    };
  }, []);

  useEffect(() => {
    const tick = () => {
      if (!isScrolling) setRotation((r) => r + AUTO_SPEED);
      rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isScrolling]);

  const anglePerItem = 360 / items.length;

  return (
    <section
      ref={sectionRef}
      id={SectionId.experienceActivations}
      className="tp-activations"
      style={{ height: `${items.length * 100}vh` }}
      aria-label="Experiences & Activations"
    >
      <div className="tp-activations-sticky">
        <div className="tp-container tp-activations__inner">

          {(isMeaningful(data.editable?.label) || isMeaningful(data.editable?.headline) || isMeaningful(data.prospect.description)) && (
            <header className="tp-section-head tp-activations__header">
              {isMeaningful(data.editable?.label) && (
                <p className="tp-eyebrow">{data.editable!.label}</p>
              )}
              {isMeaningful(data.editable?.headline) && (
                <h2 className="tp-display tp-display--lg">{data.editable!.headline}</h2>
              )}
              {isMeaningful(data.prospect.description) && (
                <p className="tp-body tp-body--muted tp-activations__description">{data.prospect.description}</p>
              )}
            </header>
          )}

          {/* 3D rotating gallery */}
          <div className="tp-circ-gallery">
            <div
              className="tp-circ-gallery__scene"
              style={{ transform: `rotateY(${rotation}deg)` }}
            >
              {items.map((item, i) => {
                const itemAngle = i * anglePerItem;
                const norm = normalizedAngle(itemAngle, rotation);
                const opacity = Math.max(0.2, 1 - norm / 180);
                const hasImage = isMeaningful(item.image?.src);
                const detail = itemDetail(item);

                return (
                  <div
                    key={item._key ?? item.title}
                    className={`tp-circ-gallery__card${hasImage ? "" : " tp-circ-gallery__card--empty"}`}
                    style={{
                      transform: `rotateY(${itemAngle}deg) translateZ(${RADIUS}px)`,
                      opacity,
                    }}
                  >
                    {hasImage && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={item.image!.src}
                        alt={item.image!.alt ?? item.title}
                        className="tp-circ-gallery__card-img"
                      />
                    )}
                    {isMeaningful(item.category) && (
                      <span className="tp-circ-gallery__card-pill">{item.category}</span>
                    )}
                    <div className="tp-circ-gallery__card-overlay">
                      {isMeaningful(item.description) && (
                        <p className="tp-eyebrow tp-circ-gallery__card-eyebrow">{item.description}</p>
                      )}
                      {isMeaningful(item.title) && (
                        <h3 className="tp-circ-gallery__card-title">{item.title}</h3>
                      )}
                      {detail && (
                        <p className="tp-circ-gallery__card-detail">{detail}</p>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Next section CTA */}
          {nextSectionId && (
            <div className="tp-activations__next">
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
