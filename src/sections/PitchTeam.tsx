import type { TeamSection } from "@/lib/data";
import { SectionId } from "@/lib/data";
import { Headline } from "@/components/Headline";
import { Reveal } from "@/components/Reveal";
import { MobileEyebrow } from "@/components/MobileEyebrow";
import { isMeaningful, filterMeaningful, splitParagraphs } from "@/lib/render-utils";

/** Brief Section 2 "Team" — founders + human-performance system. */
export function PitchTeam({ data }: { data: TeamSection }) {
  const { tenant, editable } = data;
  const label = editable.label ?? "Who we are";
  const paragraphs = (editable.paragraphs ?? []).flatMap(splitParagraphs);
  const founders = filterMeaningful(tenant.founders).filter((f) => isMeaningful(f.name));

  return (
    <section
      id={SectionId.team}
      className="tp-section tp-team"
      aria-label={label}
    >
      <div className="tp-container">
        <div className="tp-team__inner">
          {founders.length > 0 && (
            <Reveal className="tp-team__photos">
              {founders.map((f) => (
                <div key={f._key ?? f.name} className="tp-team__photo">
                  {isMeaningful(f.image?.src) && (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                      src={f.image?.src}
                      alt={f.image?.alt ?? f.name}
                      className="tp-team__photo-img"
                    />
                  )}
                  <div className="tp-team__photo-scrim" aria-hidden="true" />
                  <div className="tp-team__photo-credit">
                    <strong>{f.name}</strong>
                    {isMeaningful(f.role) && <span>{f.role}</span>}
                  </div>
                </div>
              ))}
            </Reveal>
          )}

          <div className="tp-team__text">
            {editable.headline && (
              <Reveal delay={1}>
                <MobileEyebrow label="Who we are" />
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
                <p className="tp-quote tp-quote--highlight">{editable.statement}</p>
              </Reveal>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
