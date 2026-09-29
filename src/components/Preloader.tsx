import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import logoMark from "@/assets/logo-mark.png";
import { cn } from "@/utils/cn";
import { EASE_ARCH, EASE_OUT } from "./motion";

/**
 * Brief, deliberate page entry. Waits for the cover photograph and
 * fonts (with a minimum dwell) and then lifts like a curtain.
 */
export function Preloader({ canFinish, onFinish }: { canFinish: boolean; onFinish: () => void }) {
  const reduce = useReducedMotion();
  const [minElapsed, setMinElapsed] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [gone, setGone] = useState(false);
  const [lit, setLit] = useState(false);

  useEffect(() => {
    const t = window.setTimeout(() => setMinElapsed(true), reduce ? 0 : 1900);
    return () => window.clearTimeout(t);
  }, [reduce]);

  useEffect(() => {
    if (canFinish && minElapsed && !leaving) {
      setLeaving(true);
      onFinish();
    }
  }, [canFinish, minElapsed, leaving, onFinish]);

  if (gone) return null;

  return (
    <motion.div
      aria-hidden="true"
      className="fixed inset-0 z-[100] flex flex-col justify-between bg-white px-5 py-6 text-ink md:px-10 md:py-8 xl:px-14 shadow-2xl border-b border-slate-200"
      initial={{ clipPath: "inset(0% 0% 0% 0%)" }}
      animate={leaving ? { clipPath: "inset(0% 0% 100% 0%)" } : { clipPath: "inset(0% 0% 0% 0%)" }}
      transition={{ duration: reduce ? 0.01 : 1.15, ease: EASE_ARCH, delay: 0.1 }}
      onAnimationComplete={() => leaving && setGone(true)}
    >
      {/* Top Header */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        <div className="flex items-center gap-2.5">
          <img src={logoMark} alt="Creative Structures" className="h-5 w-auto object-contain" />
          <span className="eyebrow text-stone font-semibold">Creative Structures NJ LLC</span>
        </div>
        <span className="eyebrow text-stone">New Jersey Statewide</span>
      </motion.div>

      {/* Main Center Typography: "Creative" (Blue) & "Structures" (Red) */}
      <motion.div
        animate={leaving ? { y: -80, opacity: 0.2 } : { y: 0, opacity: 1 }}
        transition={{ duration: 1.1, ease: EASE_ARCH, delay: 0.1 }}
      >
        <div className="overflow-hidden pb-[0.1em]">
          <motion.p
            className="font-display display-tight text-[17vw] leading-[0.86] text-ink md:text-[12vw] lg:text-[10.5vw]"
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.2, ease: EASE_OUT, delay: 0.15 }}
          >
            Creative
          </motion.p>
        </div>
        <div
          className={cn(
            "flex items-end justify-between gap-6 pb-[0.12em]",
            lit ? "overflow-visible" : "overflow-hidden"
          )}
        >
          <motion.p
            className={cn(
              "font-display display-tight pl-[9vw] text-[17vw] italic leading-[0.86] text-accent transition-[text-shadow] duration-[900ms] ease-soft md:text-[12vw] lg:text-[10.5vw]",
              lit && "glow"
            )}
            initial={{ y: "110%" }}
            animate={{ y: "0%" }}
            transition={{ duration: 1.2, ease: EASE_OUT, delay: 0.28 }}
            onAnimationComplete={() => setLit(true)}
          >
            Structures
          </motion.p>
          <motion.span
            className="eyebrow hidden pb-[1.4vw] text-stone md:block font-semibold"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.8 }}
          >
            Residential &amp; Commercial
          </motion.span>
        </div>

        {/* Progress Line */}
        <div className="relative mt-8 h-px w-full bg-slate-200">
          <motion.div
            className="glow-line absolute inset-0 origin-left bg-accent"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: canFinish ? 1 : 0.72 }}
            transition={{ duration: 1.5, ease: EASE_ARCH, delay: 0.2 }}
          />
        </div>
      </motion.div>

      {/* Bottom Footer Bar */}
      <motion.div
        className="flex items-center justify-between"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.35 }}
      >
        <span className="eyebrow text-accent font-semibold">Construction &amp; Renovation</span>
        <span className="eyebrow text-stone">Homes · Local business</span>
      </motion.div>
    </motion.div>
  );
}
