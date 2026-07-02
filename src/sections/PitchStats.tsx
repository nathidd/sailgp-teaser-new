import type { StatsSection } from "@/lib/data";
import { SectionId } from "@/lib/data";
import { AboutVideo } from "@/components/AboutVideo";
import { isMeaningful, filterMeaningful } from "@/lib/render-utils";

export function PitchStats({ data }: { data: StatsSection }) {
  const items = filterMeaningful(data.prospect.items_secondary_replacements).filter(
    (item) => isMeaningful(item.value) && isMeaningful(item.label)
  );
  const videoSrc = data.tenant.video?.src;
  const hasVideo = isMeaningful(videoSrc);

  if (!hasVideo && items.length === 0) return null;

  // Duplicate the items so the horizontal marquee can loop seamlessly.
  const loop = items.length > 0 ? [...items, ...items] : [];

  return (
    <section
      id={SectionId.stats}
      className="tp-section tp-about"
      aria-label={data.editable.label ?? "About"}
    >
      {hasVideo && (
        <AboutVideo src={videoSrc!} title={data.tenant.video?.title} />
      )}
      {items.length > 0 && (
        <div className="tp-about__banner" aria-hidden="true">
          <div className="tp-about__track">
            {loop.map((item, i) => (
              <span
                key={`${item._key ?? item.label}-${i}`}
                className="tp-about__item"
              >
                <span className="tp-about__value">
                  {item.value}
                  {isMeaningful(item.suffix) && (
                    <span className="tp-about__suffix">{item.suffix}</span>
                  )}
                </span>
                <span className="tp-about__label">{item.label}</span>
              </span>
            ))}
          </div>
        </div>
      )}
    </section>
  );
}
