import { useEffect, useRef, useState } from "react";

/**
 * Returns the value of `data-{attr}` on the deepest element that sits
 * under a horizontal probe line (y position in the viewport).
 * Used to adapt fixed UI (header, folio) to the section beneath it.
 */
export function useDataAt(
  attr: string,
  probe: (viewportHeight: number) => number,
  fallback: string | null = null
) {
  const [value, setValue] = useState<string | null>(fallback);
  const probeRef = useRef(probe);
  probeRef.current = probe;

  useEffect(() => {
    let frame = 0;
    const check = () => {
      frame = 0;
      const y = probeRef.current(window.innerHeight);
      const nodes = document.querySelectorAll<HTMLElement>(`[data-${attr}]`);
      let match: string | null = null;
      nodes.forEach((node) => {
        const r = node.getBoundingClientRect();
        if (r.top <= y && r.bottom > y) match = node.getAttribute(`data-${attr}`);
      });
      // No match (e.g. an interlude without the attribute) keeps the previous value.
      setValue((prev) => (match === null ? prev : match));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(check);
    };
    check();
    const interval = window.setInterval(schedule, 600);
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
      window.clearInterval(interval);
      if (frame) cancelAnimationFrame(frame);
    };
  }, [attr]);

  return value;
}
