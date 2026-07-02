import type { TeamSection } from "@/lib/data";
import { SectionId } from "@/lib/data";
import { Headline } from "@/components/Headline";
import { Reveal } from "@/components/Reveal";
import { AboutVideo } from "@/components/AboutVideo";
import { isMeaningful, filterMeaningful, splitParagraphs } from "@/lib/render-utils";

/** Brief Section 2 "Team" — founders + human-performance system + crew. */
export function PitchTeam({ data }: { data: TeamSection }) {
  const { tenant, editable } = data;
  const paragraphs = (editable.paragraphs ?? []).flatMap(splitParagraphs);
  const founders = filterMeaningful(tenant.founders).filter((f) => isMeaningful(f.name));
  const crew = filterMeaningful(tenant.crewImages).filter((c) => isMeaningful(c.src));
  const hasVideo = isMeaningful(tenant.video?.src);
  const hasImage = !hasVideo && isMeaningful(tenant.backgroundImage?.src);

  return (
    <section
      id={SectionId.team}
      className="tp-section tp-team"
      aria-label={editable.label ?? "Who we are"}
    >
      <div className="tp-container tp-team__inner">
        <div className="tp-team__text">
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
            <Reveal delay={2} className="tp-team__body">
              {paragraphs.map((p, i) => (
                <p key={i} className="tp-body tp-body--muted">
                  {p}
                </p>
              ))}
            </Reveal>
          )}
          {founders.length > 0 && (
            <Reveal delay={3}>
              <ul className="tp-team__founders">
                {founders.map((f) => (
                  <li key={f._key ?? f.name} className="tp-team__founder">
                    <strong>{f.name}</strong>
                    {isMeaningful(f.role) && <span>{f.role}</span>}
                  </li>
                ))}
              </ul>
            </Reveal>
          )}
        </div>

        <Reveal delay={1} className="tp-team__media">
          {hasVideo ? (
            <AboutVideo src={tenant.video!.src} title={tenant.video?.title} />
          ) : hasImage ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={tenant.backgroundImage!.src}
              alt={tenant.backgroundImage!.alt ?? ""}
              className="tp-team__media-img"
            />
          ) : null}
        </Reveal>
      </div>

      {isMeaningful(editable.statement) && (
        <div className="tp-container">
          <Reveal className="tp-team__statement-wrap">
            <p className="tp-display tp-display--lg tp-team__statement">
              {editable.statement}
            </p>
          </Reveal>
        </div>
      )}

      {crew.length > 0 && (
        <Reveal className="tp-team__crew" delay={1}>
          <ul className="tp-team__crew-track">
            {crew.map((c, i) => (
              <li key={c.src + i} className="tp-team__crew-item">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={c.src} alt={c.alt ?? ""} />
              </li>
            ))}
          </ul>
        </Reveal>
      )}
    </section>
  );
}
