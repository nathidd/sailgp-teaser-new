import type { PositioningSection } from "@/lib/data";
import { SectionId } from "@/lib/data";
import { Headline } from "@/components/Headline";
import { Reveal } from "@/components/Reveal";
import { HeroVideo } from "@/components/HeroVideo";
import { isMeaningful, filterMeaningful, splitParagraphs } from "@/lib/render-utils";

/** Brief Section 3 "Positioning" — learning speed / what we build becomes standard. */
export function PitchPositioning({ data }: { data: PositioningSection }) {
  const { tenant, editable } = data;
  const paragraphs = (editable.paragraphs ?? []).flatMap(splitParagraphs);
  const markers = filterMeaningful(tenant.markers).filter((m) => isMeaningful(m.label));
  const hasVideo = isMeaningful(tenant.loopVideo?.src);
  const hasImage = !hasVideo && isMeaningful(tenant.backgroundImage?.src);

  return (
    <section
      id={SectionId.positioning}
      className="tp-section tp-positioning"
      aria-label={editable.label ?? "How we compete"}
    >
      {hasVideo && (
        <>
          <HeroVideo src={tenant.loopVideo!.src!} className="tp-positioning__bg" />
          <div className="tp-positioning__scrim" aria-hidden="true" />
        </>
      )}
      {hasImage && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="tp-positioning__bg"
            src={tenant.backgroundImage!.src}
            alt=""
            aria-hidden="true"
          />
          <div className="tp-positioning__scrim" aria-hidden="true" />
        </>
      )}

      <div className="tp-container tp-positioning__inner">
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
            <Reveal delay={2} className="tp-positioning__body">
              {paragraphs.map((p, i) => (
                <p key={i} className="tp-body tp-body--muted">
                  {p}
                </p>
              ))}
            </Reveal>
          )}
        </div>

        {markers.length > 0 && (
          <div className="tp-positioning__markers">
            {isMeaningful(editable.caption) && (
              <Reveal>
                <p className="tp-positioning__caption">{editable.caption}</p>
              </Reveal>
            )}
            <ul className="tp-positioning__marker-grid">
              {markers.map((m, i) => (
                <Reveal
                  key={m._key ?? m.label}
                  delay={(Math.min(i + 1, 3) as 1 | 2 | 3)}
                  className="tp-positioning__marker"
                >
                  <span className="tp-positioning__marker-dot" aria-hidden="true" />
                  <h3 className="tp-positioning__marker-label">{m.label}</h3>
                  {isMeaningful(m.description) && (
                    <p className="tp-body tp-body--muted">{m.description}</p>
                  )}
                </Reveal>
              ))}
            </ul>
          </div>
        )}

        {isMeaningful(editable.statement) && (
          <Reveal className="tp-positioning__statement-wrap">
            <p className="tp-display tp-display--lg tp-positioning__statement">
              {editable.statement}
            </p>
          </Reveal>
        )}
      </div>
    </section>
  );
}
