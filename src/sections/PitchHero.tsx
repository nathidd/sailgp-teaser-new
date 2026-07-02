import type { HeroSection } from "@/lib/data";
import { SectionId } from "@/lib/data";
import { Headline } from "@/components/Headline";
import { HeroVideo } from "@/components/HeroVideo";
import { Reveal } from "@/components/Reveal";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import { isMeaningful } from "@/lib/render-utils";

export function PitchHero({ data }: { data: HeroSection }) {
  const { prospect, tenant } = data;
  const hasBgImage = isMeaningful(prospect.backgroundImage?.src);
  const videoSrc = tenant.backgroundVideo?.src;
  const hasBgVideo = !hasBgImage && isMeaningful(videoSrc);
  return (
    <section
      id={SectionId.hero}
      className="tp-section tp-hero"
      aria-label="Pitch hero"
    >
      {hasBgImage && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="tp-hero__bg-image"
            src={prospect.backgroundImage!.src}
            alt={prospect.backgroundImage!.alt ?? ""}
            aria-hidden="true"
          />
          <div className="tp-hero__video-scrim" aria-hidden="true" />
        </>
      )}
      {hasBgVideo && (
        <>
          <HeroVideo
            src={videoSrc!}
            poster={tenant.backgroundVideo?.poster}
            className="tp-hero__bg-video"
          />
          <div className="tp-hero__video-scrim" aria-hidden="true" />
        </>
      )}
      <div className="tp-container tp-hero__inner">
        <Reveal delay={2}>
          <Headline
            data={prospect.headline}
            as="h1"
            className="tp-display tp-display--xxl tp-hero__headline"
          />
        </Reveal>
        {isMeaningful(prospect.subheadline) && (
          <Reveal delay={3}>
            <p className="tp-body tp-body--lg tp-body--muted tp-hero__subline">
              {prospect.subheadline}
            </p>
          </Reveal>
        )}
      </div>
      <ScrollIndicator
        href={`#${SectionId.stats}`}
        label="Scroll to watch video"
        className="tp-hero__scroll"
        ariaLabel="Scroll to next section"
      />
    </section>
  );
}
