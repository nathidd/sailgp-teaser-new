import type { HighlightedHeadline } from "@/lib/data";

type Props = {
  data: HighlightedHeadline;
  className?: string;
  as?: keyof React.JSX.IntrinsicElements;
};

export function Headline({ data, className, as = "h2" }: Props) {
  const Tag = as as "h2";
  return (
    <Tag className={className} style={{ whiteSpace: "pre-line" }}>
      {data.parts.map((part, i) =>
        part.shimmer ? (
          <span key={i} className="tp-shimmer-text">
            {part.text}
          </span>
        ) : part.highlight ? (
          <span key={i} className="tp-highlight">
            {part.text}
          </span>
        ) : (
          <span key={i}>{part.text}</span>
        )
      )}
    </Tag>
  );
}
