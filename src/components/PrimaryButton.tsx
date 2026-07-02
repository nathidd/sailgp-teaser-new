import type { Cta } from "@/lib/data";

type Props = {
  cta: Cta;
  withArrow?: boolean;
};

function isExternal(href: string): boolean {
  return /^https?:\/\//.test(href);
}

export function PrimaryButton({ cta, withArrow = true }: Props) {
  const external = isExternal(cta.href);
  return (
    <a
      href={cta.href}
      className="tp-btn tp-btn--primary"
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    >
      <span>{cta.label}</span>
      {withArrow && <span aria-hidden="true">→</span>}
    </a>
  );
}
