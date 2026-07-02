import type { ImpactSection } from "@/lib/data";
import { SectionId } from "@/lib/data";
import { Headline } from "@/components/Headline";
import { Reveal } from "@/components/Reveal";
import { isMeaningful, filterMeaningful, splitParagraphs } from "@/lib/render-utils";

/** Brief Section 4 "Impact" — co-creation beyond sport (Deutsche Bank et al). */
export function PitchImpact({ data }: { data: ImpactSection }) {
  const { tenant, editable } = data;
  const paragraphs = (editable.paragraphs ?? []).flatMap(splitParagraphs);
  const initiatives = filterMeaningful(tenant.initiatives).filter((it) =>
    isMeaningful(it.title)
  );
  const partner = tenant.partnerExample;

  return (
    <section
      id={SectionId.impact}
      className="tp-section tp-section--surface tp-impact"
      aria-label={editable.label ?? "How we impact"}
    >
      <div className="tp-container tp-impact__inner">
        <div className="tp-impact__lead">
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
            <Reveal delay={2} className="tp-impact__body">
              {paragraphs.map((p, i) => (
                <p key={i} className="tp-body tp-body--muted">
                  {p}
                </p>
              ))}
            </Reveal>
          )}
          {partner && isMeaningful(partner.name) && (
            <Reveal delay={3} className="tp-impact__partner">
              <span className="tp-impact__partner-label">In co-creation with</span>
              {isMeaningful(partner.logo?.src) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={partner.logo!.src}
                  alt={partner.logo!.alt ?? partner.name}
                  className="tp-impact__partner-logo"
                />
              ) : (
                <strong className="tp-impact__partner-name">{partner.name}</strong>
              )}
            </Reveal>
          )}
        </div>

        {initiatives.length > 0 && (
          <ul className="tp-impact__grid">
            {initiatives.map((it, i) => (
              <Reveal
                key={it._key ?? it.title}
                delay={(Math.min(i + 1, 3) as 1 | 2 | 3)}
                className="tp-impact__card"
              >
                {isMeaningful(it.image?.src) && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    src={it.image!.src}
                    alt={it.image!.alt ?? it.title}
                    className="tp-impact__card-img"
                  />
                )}
                <div className="tp-impact__card-body">
                  <h3 className="tp-display tp-display--sm tp-impact__card-title">
                    {it.title}
                  </h3>
                  {isMeaningful(it.description) && (
                    <p className="tp-body tp-body--muted">{it.description}</p>
                  )}
                </div>
              </Reveal>
            ))}
          </ul>
        )}
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
