import type { OpportunitiesSection } from "@/lib/data";
import { SectionId } from "@/lib/data";
import { Headline } from "@/components/Headline";
import { Reveal } from "@/components/Reveal";
import { isMeaningful, filterMeaningful, splitParagraphs } from "@/lib/render-utils";

/** True for real asset paths — filters out unresolved {{PLACEHOLDER}} tokens. */
function isRenderableSrc(src?: string): boolean {
  return !!src && (src.startsWith("/") || src.startsWith("http"));
}

/**
 * Brief Section 7 "Partnership Opportunities" — the prospect charts a
 * course through five waypoints (Reach → Network). The partner logo rides
 * the start of the course rail; the five opportunities render as cards.
 */
export function PitchOpportunities({ data }: { data: OpportunitiesSection }) {
  const { tenant, prospect, editable } = data;
  const paragraphs = (editable.paragraphs ?? []).flatMap(splitParagraphs);
  const items = filterMeaningful(tenant.items).filter((it) => isMeaningful(it.title));
  const logoSrc = prospect.partnerLogo?.src;
  const hasLogo = isRenderableSrc(logoSrc);
  const partnerName = isMeaningful(prospect.partnerName) ? prospect.partnerName : "Your brand";

  return (
    <section
      id={SectionId.opportunities}
      className="tp-section tp-opportunities"
      aria-label={editable.label ?? "Your course"}
    >
      <div className="tp-container">
        <div className="tp-section-head">
          {isMeaningful(editable.label) && (
            <Reveal>
              <p className="tp-eyebrow">{editable.label}</p>
            </Reveal>
          )}
          {editable.headline && (
            <Reveal delay={1}>
              <Headline data={editable.headline} className="tp-display tp-display--lg" />
            </Reveal>
          )}
          {paragraphs.length > 0 && (
            <Reveal delay={2} className="tp-opportunities__body">
              {paragraphs.map((p, i) => (
                <p key={i} className="tp-body tp-body--muted">
                  {p}
                </p>
              ))}
            </Reveal>
          )}
        </div>

        {items.length > 0 && (
          <>
            <Reveal className="tp-course" delay={1}>
              <span className="tp-course__vessel" aria-label={`${partnerName} sets the course`}>
                {hasLogo ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={logoSrc} alt={prospect.partnerLogo?.alt ?? partnerName} />
                ) : (
                  <span className="tp-course__vessel-name">{partnerName}</span>
                )}
              </span>
              <span className="tp-course__rail" aria-hidden="true" />
              <ol className="tp-course__waypoints">
                {items.map((it, i) => (
                  <li key={it._key ?? it.title} className="tp-course__waypoint">
                    <span className="tp-course__buoy">{i + 1}</span>
                    <span className="tp-course__waypoint-label">{it.title}</span>
                  </li>
                ))}
              </ol>
            </Reveal>

            <ul className="tp-opportunities__grid">
              {items.map((it, i) => (
                <Reveal
                  key={it._key ?? it.title}
                  delay={(Math.min(i, 6) as 0 | 1 | 2 | 3 | 4 | 5 | 6)}
                  className="tp-opportunity"
                >
                  <span className="tp-opportunity__index" aria-hidden="true">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  <h3 className="tp-display tp-display--sm tp-opportunity__title">
                    {it.title}
                  </h3>
                  {isMeaningful(it.description) && (
                    <p className="tp-body tp-body--muted">{it.description}</p>
                  )}
                </Reveal>
              ))}
            </ul>
          </>
        )}
      </div>
    </section>
  );
}
