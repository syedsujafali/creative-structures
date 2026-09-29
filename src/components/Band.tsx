import { motion, useReducedMotion } from "framer-motion";
import { Fragment } from "react";

const ROW_A = [
  "Residential construction",
  "Custom Remodeling",
  "Additions & Extensions",
  "Roofing & Weatherproofing",
];
const ROW_B = [
  "Exterior Siding & Trim",
  "Whole-Home Renovation",
  "Commercial Fit-Outs",
  "New Jersey LLC",
];

function Diamond() {
  return (
    <span
      aria-hidden="true"
      className="mx-[0.45em] inline-block h-[0.14em] w-[0.14em] translate-y-[-0.12em] rotate-45 border border-current align-middle opacity-80"
    />
  );
}

/** Infinite looping marquee band with reduced height */
export function Band() {
  const reduce = useReducedMotion();

  return (
    <section
      data-theme="dark"
      aria-label="Core Services & Disciplines"
      className="band-lit relative z-10 overflow-hidden py-5 text-cream md:py-7 lg:py-8"
    >
      <ul className="sr-only">
        {[...ROW_A, ...ROW_B].map((t) => (
          <li key={t}>{t}</li>
        ))}
      </ul>

      <div aria-hidden="true" className="font-display display-tight select-none space-y-1 md:space-y-1.5">
        {/* Row 1 - Continuous Leftward Infinite Loop */}
        <div className="flex overflow-hidden">
          <motion.div
            animate={reduce ? undefined : { x: ["0%", "-50%"] }}
            transition={{
              ease: "linear",
              duration: 24,
              repeat: Infinity,
            }}
            className="glow-light flex shrink-0 whitespace-nowrap text-[2rem] leading-[1.08] sm:text-[2.5rem] md:text-[3rem] lg:text-[3.6rem]"
          >
            {[0, 1, 2, 3].map((k) => (
              <Fragment key={k}>
                {ROW_A.map((t) => (
                  <span key={`${k}-${t}`} className="flex items-center">
                    {t}
                    <Diamond />
                  </span>
                ))}
              </Fragment>
            ))}
          </motion.div>
        </div>

        {/* Row 2 - Continuous Rightward Infinite Loop */}
        <div className="flex overflow-hidden">
          <motion.div
            animate={reduce ? undefined : { x: ["-50%", "0%"] }}
            transition={{
              ease: "linear",
              duration: 28,
              repeat: Infinity,
            }}
            className="flex shrink-0 whitespace-nowrap text-[2rem] leading-[1.08] text-cream/75 italic sm:text-[2.5rem] md:text-[3rem] lg:text-[3.6rem]"
          >
            {[0, 1, 2, 3].map((k) => (
              <Fragment key={k}>
                {ROW_B.map((t) => (
                  <span key={`${k}-${t}`} className="flex items-center">
                    {t}
                    <Diamond />
                  </span>
                ))}
              </Fragment>
            ))}
          </motion.div>
        </div>
      </div>

      <div className="mt-3.5 flex items-center justify-between px-5 md:mt-5 md:px-10 xl:px-14">
        <span className="eyebrow text-[10px] text-cream/80">Homes · Exterior · Commercial</span>
        <span className="eyebrow text-[10px] text-cream/80">New Jersey</span>
      </div>
    </section>
  );
}
