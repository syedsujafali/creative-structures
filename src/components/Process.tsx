import { motion } from "framer-motion";
import { FadeUp, RevealWords } from "./motion";

const STEPS = [
  {
    num: "01",
    phase: "PHASE 01 · INITIAL INQUIRY",
    title: "Contact Us",
    desc: "Reach out with your vision, property type, and target timeline to initiate project exploration.",
    highlight: "24h Response",
    side: "left" as const,
  },
  {
    num: "02",
    phase: "PHASE 02 · SITE FEASIBILITY",
    title: "Project Consultation",
    desc: "Direct on-site walkthrough with our licensed builders to analyze structural parameters and scope goals.",
    highlight: "On-Site Review",
    side: "right" as const,
  },
  {
    num: "03",
    phase: "PHASE 03 · SCOPE & BUDGET",
    title: "Estimate & Planning",
    desc: "Transparent itemized estimate, material selection, and predictable milestone schedule.",
    highlight: "Itemized Pricing",
    side: "left" as const,
  },
  {
    num: "04",
    phase: "PHASE 04 · PRECISION BUILD",
    title: "Construction",
    desc: "Dedicated on-site trade management, clean jobsite protocols, and proactive milestone photo updates.",
    highlight: "NJ Code Supervised",
    side: "right" as const,
  },
  {
    num: "05",
    phase: "PHASE 05 · QUALITY HANDOVER",
    title: "Final Walkthrough",
    desc: "Rigorous punch-list resolution, municipal certificate approvals, and complete warranty handover.",
    highlight: "100% Client Sign-Off",
    side: "left" as const,
  },
];

export function Process() {
  return (
    <section
      id="process"
      data-theme="dark"
      aria-labelledby="process-title"
      className="relative overflow-hidden bg-[#0a1b30] py-14 text-white md:py-20 lg:py-24 border-y border-slate-800/80"
    >
      {/* Ambient Red & Navy Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute left-1/2 top-0 h-[450px] w-[80vw] max-w-[800px] -translate-x-1/2 rounded-full bg-accent/15 blur-[130px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute right-0 bottom-0 h-[350px] w-[40vw] rounded-full bg-accent/10 blur-[100px]"
      />

      <div className="relative mx-auto max-w-6xl px-5 md:px-10 xl:px-14">
        {/* Centered Top Header */}
        <div className="text-center">
          <FadeUp delay={0.1}>
            <div className="inline-flex items-center gap-2.5 border-2 border-accent/60 bg-accent/15 px-4 py-1.5 text-[13px] sm:text-[14px] font-mono font-bold tracking-[0.2em] text-accent uppercase backdrop-blur-md shadow-md">
              <span className="h-2 w-2 rotate-45 bg-accent shadow-[0_0_8px_rgba(214,40,46,0.8)]" />
              <span>THE PROCESS</span>
            </div>
          </FadeUp>

          <h2
            id="process-title"
            className="font-display display-tight mt-4 text-[2.6rem] leading-[1.08] text-white sm:text-[3.2rem] md:text-[3.8rem] lg:text-[4.2rem]"
          >
            <RevealWords
              segments={[
                { text: "A Clear Path From\n" },
                { text: "Vision", className: "italic text-accent glow", glow: true },
                { text: " to Reality" },
              ]}
            />
          </h2>
          <FadeUp delay={0.25}>
            <p className="mx-auto mt-3 max-w-[48ch] text-[15px] leading-relaxed text-slate-300 md:text-[16px]">
              A sequenced, transparent methodology ensuring flawless execution from initial consultation through final warranty delivery.
            </p>
          </FadeUp>
        </div>

        {/* Alternating Architectural Timeline */}
        <div className="relative mt-12 lg:mt-18">
          {/* Central Vertical Spine (Desktop) */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-6 bottom-6 left-5 hidden w-[2px] bg-gradient-to-b from-accent via-accent/60 to-accent/30 shadow-[0_0_12px_rgba(214,40,46,0.5)] sm:left-7 lg:left-1/2 lg:-translate-x-1/2 lg:block"
          />

          {/* Mobile-Only Left Spine */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute top-6 bottom-6 left-4 w-[2px] bg-gradient-to-b from-accent via-accent/60 to-accent/30 shadow-[0_0_12px_rgba(214,40,46,0.5)] sm:left-6 lg:hidden"
          />

          {/* Steps */}
          <div className="space-y-8 sm:space-y-10 lg:space-y-12">
            {STEPS.map((s, idx) => {
              const isLeft = s.side === "left";
              return (
                <div
                  key={s.num}
                  className="relative grid grid-cols-1 items-center lg:grid-cols-2 lg:gap-20"
                >
                  {/* Diamond Architectural Center Node */}
                  <div
                    aria-hidden="true"
                    className="absolute top-1/2 left-4 z-20 flex h-7 w-7 sm:h-8 sm:w-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rotate-45 border-2 border-accent bg-[#0a1b30] shadow-[0_0_18px_rgba(214,40,46,0.8)] sm:left-6 lg:left-1/2"
                  >
                    <motion.div
                      className="h-2 w-2 sm:h-2.5 sm:w-2.5 bg-accent shadow-[0_0_8px_#d6282e]"
                      animate={{ scale: [1, 1.3, 1] }}
                      transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", delay: idx * 0.25 }}
                    />
                  </div>

                  {/* Left Column Card */}
                  <div
                    className={
                      isLeft
                        ? "pl-10 sm:pl-16 lg:pl-0 lg:pr-10"
                        : "hidden lg:block"
                    }
                  >
                    {isLeft && (
                      <FadeUp delay={idx * 0.08} y={10}>
                        <div className="group relative border border-slate-700/70 bg-white/[0.04] p-4 sm:p-6 backdrop-blur-md shadow-lg transition-all duration-300 hover:border-accent/80 hover:bg-white/[0.08] hover:shadow-[0_0_30px_rgba(214,40,46,0.18)]">
                          {/* Connector Beam to center line (desktop only) */}
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute top-1/2 -right-10 hidden h-px w-10 bg-gradient-to-r from-slate-700 to-accent lg:block"
                          />

                          {/* Phase Eyebrow & Status */}
                          <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
                            <span className="font-mono text-[10.5px] sm:text-[11px] font-bold text-accent tracking-wider">
                              {s.phase}
                            </span>
                            <span className="eyebrow text-[9px] sm:text-[9.5px] bg-accent/20 px-2 py-0.5 text-accent-soft border border-accent/40 font-mono">
                              {s.highlight}
                            </span>
                          </div>

                          {/* Title with Watermark Number */}
                          <div className="mt-3.5 flex items-baseline justify-between">
                            <h3 className="font-display text-[1.35rem] font-semibold text-white sm:text-[1.65rem] group-hover:text-accent transition-colors">
                              {s.title}
                            </h3>
                            <span className="font-display text-[1.6rem] sm:text-[1.8rem] font-bold text-accent/25 select-none">
                              {s.num}
                            </span>
                          </div>

                          {/* Description */}
                          <p className="mt-2 text-[13.5px] sm:text-[14px] leading-relaxed text-slate-300">
                            {s.desc}
                          </p>
                        </div>
                      </FadeUp>
                    )}
                  </div>

                  {/* Right Column Card */}
                  <div
                    className={
                      !isLeft
                        ? "pl-10 sm:pl-16 lg:pl-10 lg:text-left"
                        : "hidden lg:block"
                    }
                  >
                    {!isLeft && (
                      <FadeUp delay={idx * 0.08} y={10}>
                        <div className="group relative border border-slate-700/70 bg-white/[0.04] p-4 sm:p-6 backdrop-blur-md shadow-lg transition-all duration-300 hover:border-accent/80 hover:bg-white/[0.08] hover:shadow-[0_0_30px_rgba(214,40,46,0.18)]">
                          {/* Connector Beam to center line (desktop only) */}
                          <div
                            aria-hidden="true"
                            className="pointer-events-none absolute top-1/2 -left-10 hidden h-px w-10 bg-gradient-to-l from-slate-700 to-accent lg:block"
                          />

                          {/* Phase Eyebrow & Status */}
                          <div className="flex items-center justify-between border-b border-slate-700/60 pb-3">
                            <span className="font-mono text-[11px] font-bold text-accent tracking-wider">
                              {s.phase}
                            </span>
                            <span className="eyebrow text-[9.5px] bg-accent/20 px-2 py-0.5 text-accent-soft border border-accent/40 font-mono">
                              {s.highlight}
                            </span>
                          </div>

                          {/* Title with Watermark Number */}
                          <div className="mt-3.5 flex items-baseline justify-between">
                            <h3 className="font-display text-[1.45rem] font-semibold text-white sm:text-[1.65rem] group-hover:text-accent transition-colors">
                              {s.title}
                            </h3>
                            <span className="font-display text-[1.8rem] font-bold text-accent/25 select-none">
                              {s.num}
                            </span>
                          </div>

                          {/* Description */}
                          <p className="mt-2 text-[14px] leading-relaxed text-slate-300">
                            {s.desc}
                          </p>
                        </div>
                      </FadeUp>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
