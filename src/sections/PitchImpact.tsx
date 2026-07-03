"use client";

import type { ImpactSection } from "@/lib/data";
import { SectionId } from "@/lib/data";
import { Headline } from "@/components/Headline";
import { Reveal } from "@/components/Reveal";
import { MobileEyebrow } from "@/components/MobileEyebrow";
import { isMeaningful, filterMeaningful, splitParagraphs } from "@/lib/render-utils";
import { useReveal } from "@/lib/animations";

/** Brief Section 4 "Impact" — co-creation beyond sport (Deutsche Bank et al). */
export function PitchImpact({ data }: { data: ImpactSection }) {
  const { tenant, editable } = data;
  const label = editable.label ?? "How we impact";
  const paragraphs = (editable.paragraphs ?? []).flatMap(splitParagraphs);
  const initiatives = filterMeaningful(tenant.initiatives).filter((it) =>
    isMeaningful(it.title)
  );
  const { ref, visible } = useReveal<HTMLElement>({
    threshold: 0.05,
    rootMargin: "0px 0px -10% 0px",
  });

  return (
    <section
      ref={ref}
      id={SectionId.impact}
      className={`tp-section tp-impact tp-impact--grow ${visible ? "is-visible" : ""}`.trim()}
      aria-label={label}
    >
      {initiatives.length > 0 && (
        <Reveal className="tp-impact__banner">
          <div className="tp-impact__banner-track">
            {[...initiatives, ...initiatives].map((it, i) => (
              <span
                key={`${it._key ?? it.title}-${i}`}
                className="tp-impact__banner-item"
                aria-hidden={i >= initiatives.length}
              >
                {it.title}
              </span>
            ))}
          </div>
        </Reveal>
      )}

      <div className="tp-container">
        <div className="tp-impact__inner">
          <div className="tp-impact__content">
            {editable.headline && (
              <Reveal delay={1}>
                <MobileEyebrow label="How we impact" />
                <Headline data={editable.headline} className="tp-display tp-display--lg" />
              </Reveal>
            )}
            {paragraphs.length > 0 && (
              <Reveal delay={2} className="tp-impact__body">
                {paragraphs.map((p, i) => (
                  <p key={i} className="tp-body tp-body--muted">
                    {p}
                  </p>
                ))}
              </Reveal>
            )}
          </div>
        </div>
      </div>

      {isMeaningful(editable.statement) && (
        <div className="tp-container">
          <Reveal className="tp-impact__statement-wrap">
            <p className="tp-display tp-display--md tp-impact__statement">
              {editable.statement}
            </p>
          </Reveal>
        </div>
      )}
    </section>
  );
}
