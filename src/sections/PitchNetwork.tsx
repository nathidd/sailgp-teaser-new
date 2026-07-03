import type { NetworkSection } from "@/lib/data";
import { SectionId } from "@/lib/data";
import { Headline } from "@/components/Headline";
import { Reveal } from "@/components/Reveal";
import { Icon } from "@/components/Icon";
import { NetworkPulse } from "@/components/NetworkPulse";
import { MobileEyebrow } from "@/components/MobileEyebrow";
import { isMeaningful, filterMeaningful, splitParagraphs } from "@/lib/render-utils";

/**
 * Brief Section 5 "Business Network" — a stylized network map with SailGP
 * Germany at the hub, orbiting category nodes, and two headline data points.
 * The map is a deterministic radial layout (no fixed node count): the SVG
 * draws the hub + connecting spokes, HTML chips carry the (wrapping) labels.
 * Swap for a richer data-driven map later without touching structure.
 */
export function PitchNetwork({ data }: { data: NetworkSection }) {
  const { tenant, editable } = data;
  const paragraphs = (editable.paragraphs ?? []).flatMap(splitParagraphs);
  const nodes = filterMeaningful(tenant.nodes).filter((n) => isMeaningful(n.label));
  const dataPoints = filterMeaningful(tenant.dataPoints).filter(
    (d) => isMeaningful(d.value) && isMeaningful(d.label)
  );

  const R = 38; // spoke radius, in the 0–100 viewBox / % space
  const layout = nodes.map((node, i) => {
    const angle = (-90 + (360 / Math.max(nodes.length, 1)) * i) * (Math.PI / 180);
    return {
      node,
      x: 50 + R * Math.cos(angle),
      y: 50 + R * Math.sin(angle),
    };
  });

  return (
    <section
      id={SectionId.network}
      className="tp-section tp-network"
      aria-label={editable.label ?? "Who we connect"}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img className="tp-network__bg" src="/assets/images/crowd 5.webp" alt="" aria-hidden="true" />
      <div className="tp-network__bg-scrim" aria-hidden="true" />
      <div className="tp-container tp-network__inner">
        <div className="tp-network__text">
          <div className="tp-section-head">
            {editable.headline && (
              <Reveal delay={1}>
                <MobileEyebrow label="Who we connect" />
                <Headline data={editable.headline} className="tp-display tp-display--lg" />
              </Reveal>
            )}
            {paragraphs.length > 0 && (
              <Reveal delay={2} className="tp-network__body">
                {paragraphs.map((p, i) => (
                  <p key={i} className="tp-body tp-body--muted">
                    {p}
                  </p>
                ))}
              </Reveal>
            )}
          </div>

          {dataPoints.length > 0 && (
            <ul className="tp-network__datapoints">
              {dataPoints.map((d, i) => (
                <Reveal
                  key={d._key ?? d.label}
                  delay={(Math.min(i + 1, 3) as 1 | 2 | 3)}
                  className="tp-network__datapoint"
                >
                  <span className="tp-network__dp-value">
                    {d.value}
                    {isMeaningful(d.suffix) && (
                      <span className="tp-network__dp-suffix">{d.suffix}</span>
                    )}
                  </span>
                  <span className="tp-network__dp-label">
                    <Icon name={d.icon} size={18} className="tp-network__dp-icon" />
                    {isMeaningful(d.source) ? (
                      <span className="tp-tooltip" tabIndex={0}>
                        {d.label}
                        <span className="tp-tooltip__bubble">{d.source}</span>
                      </span>
                    ) : (
                      d.label
                    )}
                  </span>
                </Reveal>
              ))}
            </ul>
          )}
        </div>

        {layout.length > 0 && (
          <Reveal delay={1} className="tp-network__map">
            <svg
              className="tp-network__spokes"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid meet"
              aria-hidden="true"
            >
              {/* Static faint connections. */}
              {layout.map(({ x, y }, i) => (
                <line key={`s-${i}`} className="tp-network__spoke" x1="50" y1="50" x2={x} y2={y} />
              ))}
            </svg>

            {/* One green light at a time: node → SailGP → another node. */}
            <NetworkPulse points={layout.map(({ x, y }) => ({ x, y }))} />

            <span className="tp-network__hub">
              {isMeaningful(tenant.logo?.src) ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={tenant.logo!.src}
                  alt={tenant.logo!.alt ?? tenant.centerLabel ?? "SailGP"}
                  className="tp-network__hub-logo"
                />
              ) : (
                isMeaningful(tenant.centerLabel) ? tenant.centerLabel : "SailGP"
              )}
            </span>

            {layout.map(({ node, x, y }, i) => (
              <span
                key={node._key ?? node.label}
                className="tp-network__node"
                style={{
                  left: `${x}%`,
                  top: `${y}%`,
                  animationDelay: `${0.3 + i * 0.12}s`,
                }}
              >
                {node.label}
              </span>
            ))}
          </Reveal>
        )}
      </div>
    </section>
  );
}
