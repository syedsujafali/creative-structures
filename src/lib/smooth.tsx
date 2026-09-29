import Lenis from "lenis";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from "react";

const LenisContext = createContext<Lenis | null>(null);

const easeInOutQuart = (t: number) =>
  t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

export function SmoothScroll({ children }: { children: ReactNode }) {
  const [lenis, setLenis] = useState<Lenis | null>(null);

  useEffect(() => {
    if ("scrollRestoration" in history) history.scrollRestoration = "manual";
    window.scrollTo(0, 0);

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;

    const instance = new Lenis({
      duration: 1.15,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 1.1,
    });

    let frame = 0;
    const raf = (time: number) => {
      instance.raf(time);
      frame = requestAnimationFrame(raf);
    };
    frame = requestAnimationFrame(raf);
    setLenis(instance);

    return () => {
      cancelAnimationFrame(frame);
      instance.destroy();
      setLenis(null);
    };
  }, []);

  return <LenisContext.Provider value={lenis}>{children}</LenisContext.Provider>;
}

export function useLenis() {
  return useContext(LenisContext);
}

/** Smoothly scroll to a selector (e.g. "#services") or a pixel offset. */
export function useScrollTo() {
  const lenis = useContext(LenisContext);
  return useCallback(
    (target: string | number, opts: { offset?: number; immediate?: boolean } = {}) => {
      if (lenis) {
        lenis.start();
        lenis.scrollTo(target, {
          offset: opts.offset ?? -10,
          duration: 1.2,
          easing: easeInOutQuart,
          immediate: opts.immediate,
        });
        return;
      }

      if (target === 0 || target === "#top" || target === "top") {
        window.scrollTo({ top: 0, behavior: opts.immediate ? "auto" : "smooth" });
        return;
      }

      const selector = typeof target === "string" ? (target.startsWith("#") ? target : `#${target}`) : null;
      const el = selector ? document.querySelector(selector) : null;
      if (el) {
        const headerOffset = 64;
        const top = el.getBoundingClientRect().top + window.pageYOffset - headerOffset + (opts.offset ?? 0);
        window.scrollTo({ top, behavior: opts.immediate ? "auto" : "smooth" });
      }
    },
    [lenis]
  );
}

/** Lock page scroll (used by overlays). Works smoothly with or without Lenis. */
export function useScrollLock(locked: boolean) {
  const lenis = useContext(LenisContext);
  useEffect(() => {
    if (!locked) {
      lenis?.start();
      return;
    }
    lenis?.stop();

    return () => {
      lenis?.start();
    };
  }, [locked, lenis]);
}
