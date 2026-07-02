import type { PositioningSection } from "@/lib/data";
import { SectionId } from "@/lib/data";
import { Headline } from "@/components/Headline";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { isMeaningful, filterMeaningful, splitParagraphs } from "@/lib/render-utils";

/** Brief Section 3 "Positioning" — learning speed / what we build becomes standard. */
export function PitchPositioning({ data }: { data: PositioningSection }) {
  const { tenant, editable } = data;
  const label = editable.label ?? "How we compete";
  const paragraphs = (editable.paragraphs ?? []).flatMap(splitParagraphs);
  const markers = filterMeaningful(tenant.markers).filter((m) => isMeaningful(m.label));
  const imgSrc = tenant.backgroundImage?.src;
  const hasImage = isMeaningful(imgSrc);

  return (
    <section
      id={SectionId.positioning}
      className="tp-section tp-positioning"
      aria-label={label}
    >
      <div className="tp-container">
        <div className="tp-topbar">
          <Reveal>
            <p className="tp-eyebrow">{label}</p>
          </Reveal>
          <span className="tp-topbar__index">03 / 08</span>
        </div>

        <div className="tp-positioning__inner">
          <div className="tp-positioning__text">
            {editable.headline && (
              <Reveal delay={1}>
                <Headline data={editable.headline} className="tp-display tp-display--lg" />
              </Reveal>
            )}
            {paragraphs.length > 0 && (
              <Reveal delay={2} className="tp-positioning__body">
                {paragraphs.map((p, i) => (
                  <p key={i} className="tp-body tp-body--muted">
                    {p}
                  </p>
                ))}
              </Reveal>
            )}
            {isMeaningful(editable.statement) && (
              <Reveal delay={2}>
                <p className="tp-quote tp-quote--plain">{editable.statement}</p>
              </Reveal>
            )}

            {markers.length > 0 && (
              <Reveal delay={3} className="tp-innovation">
                <ol className="tp-innovation__list">
                  {markers.map((m, i) => (
                    <li key={m._key ?? m.label} className="tp-innovation__row">
                      <span className="tp-innovation__num">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span className="tp-innovation__label">{m.label}</span>
                      {isMeaningful(m.description) && (
                        <span className="tp-innovation__desc">{m.description}</span>
                      )}
                      <Icon name={m.icon} className="tp-innovation__icon" size={20} />
                    </li>
                  ))}
                </ol>
              </Reveal>
            )}
          </div>

          {hasImage && (
            <Reveal delay={1} className="tp-positioning__media">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={imgSrc} alt={tenant.backgroundImage?.alt ?? ""} />
              {isMeaningful(editable.caption) && (
                <span className="tp-positioning__tag">{editable.caption}</span>
              )}
            </Reveal>
          )}
        </div>
      </div>
    </section>
  );
}
