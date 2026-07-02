import type { BrandStorySection } from "@/lib/data";
import { SectionId } from "@/lib/data";
import { Headline } from "@/components/Headline";
import { Reveal } from "@/components/Reveal";
import { isMeaningful, filterMeaningful, splitParagraphs } from "@/lib/render-utils";

export function PitchBrandStory({ data }: { data: BrandStorySection }) {
  const { prospectBrand, editable } = data;
  const paragraphs = filterMeaningful(prospectBrand?.paragraphs ?? []).flatMap(splitParagraphs);
  const headlineHasParts = (editable?.headline?.parts?.length ?? 0) > 0;

  if (!headlineHasParts && paragraphs.length === 0) return null;

  return (
    <section
      id={SectionId.brandStory}
      className="tp-section tp-partnership-section"
      aria-label="Why We Fit"
    >
      <div className="tp-container tp-partnership__container">
        <Reveal>
          <div className="tp-partnership__card">
            <header className="tp-partnership__header">
              {isMeaningful(editable?.label) && (
                <p className="tp-eyebrow tp-eyebrow--dark">{editable!.label}</p>
              )}
              {headlineHasParts && (
                <Headline
                  data={editable!.headline!}
                  as="h2"
                  className="tp-display tp-display--lg tp-partnership__headline tp-partnership__headline--dark"
                />
              )}
              {isMeaningful(editable?.subheadline) && (
                <p className="tp-partnership__subline tp-partnership__subline--dark">{editable!.subheadline}</p>
              )}
            </header>
            {paragraphs.length > 0 && (
              <div className="tp-partnership__prose">
                {paragraphs.map((p, i) => (
                  <p key={i} className="tp-body tp-partnership__para">{p}</p>
                ))}
              </div>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
