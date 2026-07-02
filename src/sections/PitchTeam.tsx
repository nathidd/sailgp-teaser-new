import type { TeamSection } from "@/lib/data";
import { SectionId } from "@/lib/data";
import { Headline } from "@/components/Headline";
import { Reveal } from "@/components/Reveal";
import { isMeaningful, filterMeaningful, splitParagraphs } from "@/lib/render-utils";

/** Brief Section 2 "Team" — founders + human-performance system. */
export function PitchTeam({ data }: { data: TeamSection }) {
  const { tenant, editable } = data;
  const label = editable.label ?? "Who we are";
  const paragraphs = (editable.paragraphs ?? []).flatMap(splitParagraphs);
  const founders = filterMeaningful(tenant.founders).filter((f) => isMeaningful(f.name));
  const imgSrc = tenant.backgroundImage?.src;
  const hasImage = isMeaningful(imgSrc);

  return (
    <section
      id={SectionId.team}
      className="tp-section tp-team"
      aria-label={label}
    >
      <div className="tp-container">
        <div className="tp-topbar">
          <Reveal>
            <p className="tp-eyebrow">{label}</p>
          </Reveal>
          <span className="tp-topbar__index">02 / 08</span>
        </div>

        <div className="tp-team__inner">
          <Reveal className="tp-team__media">
            {hasImage && (
              <>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={imgSrc}
                  alt={tenant.backgroundImage?.alt ?? ""}
                  className="tp-team__media-img"
                />
                <div className="tp-team__media-scrim" aria-hidden="true" />
              </>
            )}
            {founders.length > 0 && (
              <ul className="tp-team__credits">
                {founders.map((f) => (
                  <li key={f._key ?? f.name} className="tp-team__credit">
                    <strong>{f.name}</strong>
                    {isMeaningful(f.role) && <span>{f.role}</span>}
                  </li>
                ))}
              </ul>
            )}
          </Reveal>

          <div className="tp-team__text">
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
            {isMeaningful(editable.statement) && (
              <Reveal delay={3}>
                <p className="tp-quote">{editable.statement}</p>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
