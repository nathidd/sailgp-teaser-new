import type { ImpactSection } from "@/lib/data";
import { SectionId } from "@/lib/data";
import { Headline } from "@/components/Headline";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { isMeaningful, filterMeaningful, splitParagraphs } from "@/lib/render-utils";

/** Brief Section 4 "Impact" — co-creation beyond sport (Deutsche Bank et al). */
export function PitchImpact({ data }: { data: ImpactSection }) {
  const { tenant, editable } = data;
  const label = editable.label ?? "How we impact";
  const paragraphs = (editable.paragraphs ?? []).flatMap(splitParagraphs);
  const initiatives = filterMeaningful(tenant.initiatives).filter((it) =>
    isMeaningful(it.title)
  );
  const imgSrc = tenant.backgroundImage?.src;
  const hasImage = isMeaningful(imgSrc);

  return (
    <section
      id={SectionId.impact}
      className="tp-section tp-section--surface tp-impact"
      aria-label={label}
    >
      <div className="tp-container">
        <div className="tp-impact__inner">
          {hasImage && (
            <Reveal className="tp-impact__media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imgSrc} alt={tenant.backgroundImage?.alt ?? ""} />
            </Reveal>
          )}

          <div className="tp-impact__content">
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

            {initiatives.length > 0 && (
              <ul className="tp-impact__grid">
                {initiatives.map((it, i) => (
                  <Reveal
                    key={it._key ?? it.title}
                    delay={(Math.min(i + 1, 4) as 1 | 2 | 3 | 4)}
                    className="tp-impact__card"
                  >
                    <span className="tp-impact__card-head">
                      <Icon name={it.icon} size={18} className="tp-impact__card-icon" />
                      <span className="tp-impact__card-title">{it.title}</span>
                    </span>
                    {isMeaningful(it.description) && (
                      <p className="tp-body tp-body--muted">{it.description}</p>
                    )}
                  </Reveal>
                ))}
              </ul>
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
