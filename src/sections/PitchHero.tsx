import type { HeroSection } from "@/lib/data";
import { SectionId } from "@/lib/data";
import { Headline } from "@/components/Headline";
import { HeroVideo } from "@/components/HeroVideo";
import { Reveal } from "@/components/Reveal";
import { CountUp } from "@/components/CountUp";
import { ScrollIndicator } from "@/components/ScrollIndicator";
import { isMeaningful, filterMeaningful } from "@/lib/render-utils";

export function PitchHero({ data }: { data: HeroSection }) {
  const { editable, tenant, prospect } = data;
  const metrics = filterMeaningful(tenant.metrics).filter(
    (m) => isMeaningful(m.value) && isMeaningful(m.label)
  );

  // Background precedence: per-prospect override → tenant loop video →
  // tenant still fallback. (Brief S1: 30s tenant hero video.)
  const overrideImage = prospect.backgroundImage?.src;
  const videoSrc = tenant.backgroundVideo?.src;
  const fallbackImage = tenant.backgroundImage?.src;

  const hasOverride = isMeaningful(overrideImage);
  // A Vimeo player URL renders as a background iframe; an HLS/mp4 src uses
  // the <video> HeroVideo component.
  const isEmbedVideo =
    !hasOverride && isMeaningful(videoSrc) && videoSrc!.includes("player.vimeo.com");
  const hasVideo = !hasOverride && !isEmbedVideo && isMeaningful(videoSrc);
  const hasFallback =
    !hasOverride && !isEmbedVideo && !hasVideo && isMeaningful(fallbackImage);

  return (
    <section
      id={SectionId.hero}
      className="tp-section tp-hero"
      aria-label="Pitch hero"
    >
      {hasOverride && (
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
      {isEmbedVideo && (
        <>
          <div className="tp-hero__bg-embed" aria-hidden="true">
            <iframe
              src={videoSrc!}
              title="SailGP"
              allow="autoplay; fullscreen; picture-in-picture"
              frameBorder="0"
              tabIndex={-1}
            />
          </div>
          <div className="tp-hero__video-scrim" aria-hidden="true" />
        </>
      )}
      {hasVideo && (
        <>
          <HeroVideo
            src={videoSrc!}
            poster={tenant.backgroundVideo?.poster}
            className="tp-hero__bg-video"
          />
          <div className="tp-hero__video-scrim" aria-hidden="true" />
        </>
      )}
      {hasFallback && (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="tp-hero__bg-image"
            src={tenant.backgroundImage!.src}
            alt={tenant.backgroundImage!.alt ?? ""}
            aria-hidden="true"
          />
          <div className="tp-hero__video-scrim" aria-hidden="true" />
        </>
      )}

      <div className="tp-container tp-hero__inner">
        <Reveal delay={2}>
          <Headline
            data={editable.headline}
            as="h1"
            className="tp-display tp-display--xxl tp-hero__headline"
          />
        </Reveal>
        {isMeaningful(editable.subheadline) && (
          <Reveal delay={3}>
            <p className="tp-body tp-body--lg tp-body--muted tp-hero__subline">
              {editable.subheadline}
            </p>
          </Reveal>
        )}
        {metrics.length > 0 && (
          <Reveal delay={4}>
            <ul className="tp-hero__metrics">
              {metrics.map((m) => (
                <li key={m._key ?? m.label} className="tp-hero__metric">
                  <CountUp value={m.value} className="tp-hero__metric-value" immediate />
                  <span className="tp-hero__metric-label">{m.label}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        )}
      </div>

      <ScrollIndicator
        href={`#${SectionId.pillars}`}
        label="Why it matters"
        className="tp-hero__scroll"
        ariaLabel="Scroll to next section"
      />
    </section>
  );
}
