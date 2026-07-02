import type { Asset, KeyRightsSection, PartnershipSlot } from "@/lib/data";
import { SectionId } from "@/lib/data";
import { Headline } from "@/components/Headline";
import { Reveal } from "@/components/Reveal";
import { isMeaningful, filterMeaningful } from "@/lib/render-utils";

type Props = {
  data: KeyRightsSection;
  partnerLogo?: Asset;
  partnerName?: string;
};

export function PitchKeyRights({ data, partnerLogo, partnerName }: Props) {
  const tiers = filterMeaningful(data.tenant.tiers).filter(
    (t) => isMeaningful(t.name) && (t.slots?.length ?? 0) > 0
  );
  if (tiers.length === 0) return null;

  return (
    <section
      id={SectionId.keyRights}
      className="tp-section tp-section--surface tp-partnership"
      aria-label="Partnership structure"
    >
      <div className="tp-container">
        {(isMeaningful(data.editable?.label) || data.editable?.headline) && (
          <Reveal>
            <header className="tp-section-head tp-partnership__head">
              {isMeaningful(data.editable?.label) && (
                <p className="tp-eyebrow">{data.editable!.label}</p>
              )}
              {data.editable?.headline && (
                <Headline
                  data={data.editable.headline}
                  as="h2"
                  className="tp-display tp-display--lg tp-partnership__headline"
                />
              )}
            </header>
          </Reveal>
        )}

        <ul className="tp-partnership__tiers">
          {tiers.map((tier) => (
            <li key={tier._key ?? tier.name} className="tp-partnership__tier">
              <Reveal className="tp-partnership__tier-inner">
                <span className="tp-partnership__tier-name">{tier.name}</span>
                <div
                  className="tp-partnership__slots"
                  style={{ "--slot-count": tier.slots.length } as React.CSSProperties}
                >
                  {tier.slots.map((slot, i) => (
                    <Slot
                      key={slot._key ?? i}
                      slot={slot}
                      partnerLogo={partnerLogo}
                      partnerName={partnerName}
                    />
                  ))}
                </div>
              </Reveal>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Slot({
  slot,
  partnerLogo,
  partnerName,
}: {
  slot: PartnershipSlot;
  partnerLogo?: Asset;
  partnerName?: string;
}) {
  if (slot.kind === "open") {
    return (
      <div className="tp-partnership__slot tp-partnership__slot--open">
        <span>Slot in discussion</span>
      </div>
    );
  }

  const isProspect = slot.kind === "prospect";
  const logo = isProspect ? partnerLogo : slot.logo;
  const name = isProspect ? partnerName : slot.name;

  const content = isMeaningful(logo?.src) ? (
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src={logo!.src}
      alt={logo!.alt ?? name ?? ""}
      className="tp-partnership__slot-logo"
    />
  ) : (
    isMeaningful(name) && (
      <span className="tp-partnership__slot-name">{name}</span>
    )
  );

  // Prospect slots link to the Pricing Packages section so the reader
  // can jump from "where you'd sit" to "what it costs".
  if (isProspect) {
    return (
      <a
        href={`#${SectionId.nextSteps}`}
        className="tp-partnership__slot tp-partnership__slot--prospect"
        aria-label={`See pricing for ${name ?? "this slot"}`}
      >
        {content}
      </a>
    );
  }

  return <div className="tp-partnership__slot">{content}</div>;
}
