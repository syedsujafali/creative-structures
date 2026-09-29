import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { IMG, imgSrc, imgSrcSet } from "@/data/site";

/**
 * A pinned photograph that opens from an inset frame to full bleed as
 * the reader scrolls — a pause between the portfolio and services.
 */
export function Interlude() {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"] });

  const clip = useTransform(
    scrollYProgress,
    [0, 0.62],
    ["inset(17% 19% 17% 19%)", "inset(0% 0% 0% 0%)"]
  );
  const scale = useTransform(scrollYProgress, [0, 0.62], [1.22, 1.02]);
  const shade = useTransform(scrollYProgress, [0.4, 0.8], [0.12, 0.6]);
  const textOpacity = useTransform(scrollYProgress, [0.5, 0.72], [0, 1]);
  const textY = useTransform(scrollYProgress, [0.5, 0.78], [50, 0]);
  const marginOpacity = useTransform(scrollYProgress, [0, 0.28], [1, 0]);

  return (
    <section
      ref={ref}
      data-theme="dark"
      aria-label="Construction detail"
      className="relative h-[190vh] bg-night text-cream lg:h-[230vh]"
    >
      <div className="sticky top-0 h-[100svh] overflow-hidden">
        {/* Margin annotations, covered as the photograph opens */}
        <motion.div
          style={{ opacity: reduce ? 0 : marginOpacity }}
          className="pointer-events-none absolute inset-0 z-10 flex flex-col justify-between px-5 py-20 md:px-10 md:py-24 xl:px-14"
        >
          <div className="flex items-start justify-between">
            <p className="eyebrow text-accent-soft">
              <span className="glow">(—)</span> From the frame up
            </p>
            <p className="eyebrow hidden text-stone md:block">
              <span className="text-accent-soft">Fig. 03</span> — Residential framing
            </p>
          </div>
          <div className="flex items-end justify-between gap-8">
            <p className="max-w-[30ch] text-[14px] leading-relaxed text-stone md:text-[15px]">
              Framing, sheathing and structure — the parts of a building no one sees once it&apos;s
              finished.
            </p>
            <p className="eyebrow hidden text-stone md:block">Scroll</p>
          </div>
        </motion.div>

        <motion.div className="absolute inset-0" style={{ clipPath: reduce ? undefined : clip }}>
          <motion.img
            src={imgSrc(IMG.interlude, 1800)}
            srcSet={imgSrcSet(IMG.interlude, [800, 1200, 1800, 2400])}
            sizes="100vw"
            alt={IMG.interlude.alt}
            loading="lazy"
            decoding="async"
            draggable={false}
            className="h-full w-full object-cover"
            style={{ scale: reduce ? 1 : scale }}
          />
          <motion.div className="absolute inset-0 bg-night" style={{ opacity: reduce ? 0.55 : shade }} />
        </motion.div>

        {/* Red light that rises with the statement */}
        <motion.div
          aria-hidden="true"
          className="ember top-1/2 left-1/2 h-[85vh] w-[110vw] -translate-x-1/2 -translate-y-1/2 lg:w-[80vw]"
          style={{ opacity: reduce ? 1 : textOpacity }}
        />

        <motion.div
          style={{ opacity: reduce ? 1 : textOpacity, y: reduce ? 0 : textY }}
          className="absolute inset-0 flex flex-col items-center justify-center px-5 text-center"
        >
          <p className="font-display display-tight max-w-[13ch] text-[12.5vw] leading-[0.95] md:text-[9vw] lg:text-[6.6vw] 2xl:text-[7.6rem]">
            The finish is only as good as{" "}
            <span className="glow italic text-accent-soft">what&apos;s behind it.</span>
          </p>
          <p className="mt-10 max-w-[44ch] text-[15px] leading-relaxed text-cream/75 md:text-[16px]">
            From framing to final trim, the parts you&apos;ll never see get the same attention as the
            parts you will.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
