import type { SVGProps } from "react";

type P = SVGProps<SVGSVGElement>;

const base = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.15,
  strokeLinecap: "square" as const,
  vectorEffect: "non-scaling-stroke",
};

export function ArrowRight(props: P) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" {...props}>
      <path d="M3 12h17M14 6l6 6-6 6" {...base} />
    </svg>
  );
}

export function ArrowUpRight(props: P) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" {...props}>
      <path d="M6 18L18 6M8 6h10v10" {...base} />
    </svg>
  );
}

export function ArrowDown(props: P) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" {...props}>
      <path d="M12 3v17M6 14l6 6 6-6" {...base} />
    </svg>
  );
}

export function ArrowLeft(props: P) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" {...props}>
      <path d="M21 12H4M10 6l-6 6 6 6" {...base} />
    </svg>
  );
}

export function Plus(props: P) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" {...props}>
      <path d="M12 4v16M4 12h16" {...base} />
    </svg>
  );
}

export function Close(props: P) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" {...props}>
      <path d="M5 5l14 14M19 5L5 19" {...base} />
    </svg>
  );
}

export function CheckIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" {...props}>
      <path d="M4 12l5 5L20 6" {...base} />
    </svg>
  );
}

export function MapPinIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" {...props}>
      <path d="M12 21s-7-6.5-7-11a7 7 0 1 1 14 0c0 4.5-7 11-7 11z" {...base} />
      <circle cx="12" cy="10" r="2.5" {...base} />
    </svg>
  );
}

export function ShieldIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" {...props}>
      <path d="M12 3L4 7v6c0 5 3.5 9.5 8 11 4.5-1.5 8-6 8-11V7l-8-4z" {...base} />
      <path d="M9 12l2 2 4-4" {...base} />
    </svg>
  );
}

export function ClockIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" {...props}>
      <circle cx="12" cy="12" r="9" {...base} />
      <path d="M12 7v5l3 2" {...base} />
    </svg>
  );
}

export function ExpandIcon(props: P) {
  return (
    <svg viewBox="0 0 24 24" width="1em" height="1em" aria-hidden="true" {...props}>
      <path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" {...base} />
    </svg>
  );
}

import markLight from "@/assets/logo-mark-light.png";
import markColor from "@/assets/logo-mark.png";

/** Brand mark — Creative Structures CS monogram logo mark. */
export function Mark({
  className = "h-7 w-7",
  variant = "light",
}: {
  className?: string;
  accent?: string;
  glow?: boolean;
  variant?: "light" | "dark";
}) {
  return (
    <img
      src={variant === "dark" ? markColor : markLight}
      alt="Creative Structures Mark"
      className={className}
      draggable={false}
    />
  );
}

