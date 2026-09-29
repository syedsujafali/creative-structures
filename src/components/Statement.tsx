import { useScrollTo } from "@/lib/smooth";
import { ArrowUpRight } from "./Icons";
import { FadeUp, RevealWords, SectionLabel } from "./motion";

const PILLARS = [
  {
    num: "01",
    tag: "UNMEDIATED",
    title: "Direct Contractor Partnership",
    desc: "Work directly with our team from initial consultation and site walkthrough through to the final punch list. Clear, single-source communication with zero middleman friction.",
  },
  {
    num: "02",
    tag: "COMPLIANCE",
    title: "Strict NJ Code Engineering",
    desc: "Every residential addition, remodel, roof, and commercial build is constructed strictly to New Jersey building codes using tested, premium-grade materials.",
  },
  {
    num: "03",
    tag: "SCHEDULE",
    title: "Predictable Timelines & Scope",
    desc: "Transparent upfront estimates, clearly sequenced construction phases, predictable milestones, and proactive ongoing progress reporting.",
  },
  {
    num: "04",
    tag: "REPUTATION",
    title: "Licensed & Community Rooted",
    desc: "An independent New Jersey company built on verified craftsmanship, full liability coverage, and long-term structural integrity for local communities.",
  },
];

const AUDIENCE = [
  {
    num: "01",
    category: "Residential Living",
    title: "Homeowners",
    hook: "Craftsmanship for the spaces where your family lives.",
    description:
      "Whether expanding your home's square footage with a seamless addition, remodeling your kitchen and bathrooms, or replacing aging siding and roofing — we deliver renovations that elevate everyday living.",
    cta: "Start Residential Project",
  },
  {
    num: "02",
    category: "Real Estate Assets",
    title: "Property Owners",
    hook: "Protecting and enhancing the value of your investments.",
    description:
      "Capital improvements, multi-unit turnover renovations, comprehensive structural maintenance, and exterior weatherproofing engineered for maximum durability, tenant appeal, and property value.",
    cta: "Discuss Property Upgrades",
  },
  {
    num: "03",
    category: "Commercial & Retail",
    title: "Local Businesses",
    hook: "Functional, branded spaces built around how you work.",
    description:
      "Retail storefronts, boutique office fit-outs, café buildouts, and customer-facing commercial spaces planned for smooth operations, code compliance, and an exceptional customer impression.",
    cta: "Plan Commercial Buildout",
  },
];

export function Statement() {
  const scrollTo = useScrollTo();

  return (
    <section
      id="about"
      data-theme="light"
      data-folio="01|About"
      aria-labelledby="about-title"
      className="grain relative overflow-hidden bg-transparent text-ink border-y border-slate-200/80"
    >
      <div className="relative px-5 py-8 md:px-10 lg:py-12 xl:px-14">
        {/* Top Section Header */}
        <div className="flex flex-col gap-2 border-b border-slate-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionLabel n="01" label="About" />
          <FadeUp delay={0.1}>
            <p className="eyebrow text-accent font-semibold">
              Independent Contractor · <span className="text-stone font-normal">New Jersey LLC</span>
            </p>
          </FadeUp>
        </div>

        {/* Primary Typographic Manifesto */}
        <div className="pt-5 lg:pt-8">
          <h2 id="about-title" className="sr-only">
            About Creative Structures NJ LLC
          </h2>
          <div className="font-display display-tight text-[2.6rem] leading-[1.02] text-ink sm:text-[3.2rem] md:text-[3.8rem] lg:text-[4rem] xl:text-[4.4rem]">
            <RevealWords
              segments={[
                { text: "We build, remodel and elevate the spaces where people " },
                { text: "live", className: "italic text-accent", glow: false },
                { text: " and " },
                { text: "work", className: "italic text-accent", glow: false },
                { text: " — dedicated to homeowners and local businesses across " },
                { text: "New Jersey.", className: "text-accent" },
              ]}
            />
          </div>
        </div>

        {/* ========================================================
            Core Operational Pillars (Clean White Bento Cards)
           ======================================================== */}
        <div className="mt-8 lg:mt-10">
          <div className="flex flex-col gap-2 pb-3 sm:flex-row sm:items-end sm:justify-between border-b border-slate-200">
            <div>
              <FadeUp>
                <p className="eyebrow text-accent font-semibold">Core Pillars</p>
                <h3 className="font-display mt-1 text-[1.8rem] leading-none text-ink md:text-[2.2rem]">
                  How We Build &amp; Deliver
                </h3>
              </FadeUp>
            </div>
            <FadeUp delay={0.1}>
              <p className="eyebrow text-stone">4 Guiding Standards</p>
            </FadeUp>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {PILLARS.map((p, i) => (
              <FadeUp
                key={p.num}
                delay={i * 0.08}
                className="group relative flex flex-col justify-between border border-slate-200/90 bg-white p-5 shadow-sm transition-all duration-300 hover:border-accent/60 hover:shadow-xl"
              >
                <div>
                  <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                    <span className="font-mono text-[13px] font-bold text-accent">
                      {p.num}
                    </span>
                    <span className="eyebrow text-[9.5px] bg-slate-100 px-2 py-0.5 text-stone border border-slate-200">
                      {p.tag}
                    </span>
                  </div>

                  <h4 className="font-display mt-4 text-[1.3rem] leading-[1.15] text-ink transition-colors duration-300 group-hover:text-accent">
                    {p.title}
                  </h4>

                  <p className="mt-2.5 text-[13.5px] leading-relaxed text-stone">
                    {p.desc}
                  </p>
                </div>

                <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between text-[10.5px] font-mono text-stone group-hover:text-accent transition-colors">
                  <span>STANDARD VERIFIED</span>
                  <span className="h-1.5 w-1.5 rotate-45 bg-accent/60 group-hover:bg-accent transition-colors" />
                </div>
              </FadeUp>
            ))}
          </div>
        </div>

        {/* ========================================================
            Client Focus (3 Sculptural White Cards - Hidden on Mobile Only)
           ======================================================== */}
        <div className="mt-8 hidden md:block lg:mt-10">
          <div className="flex flex-col gap-2 pb-3 sm:flex-row sm:items-end sm:justify-between border-b border-slate-200">
            <div>
              <FadeUp>
                <p className="eyebrow text-accent font-semibold">Client Focus</p>
                <h3 className="font-display mt-1 text-[1.8rem] leading-none text-ink md:text-[2.2rem]">
                  Tailored For Every Property Need
                </h3>
              </FadeUp>
            </div>
            <FadeUp delay={0.1}>
              <p className="eyebrow text-stone">Residential · Commercial · Multi-Unit</p>
            </FadeUp>
          </div>

          <div className="mt-5 grid grid-cols-1 gap-5 lg:grid-cols-3">
            {AUDIENCE.map((a, i) => (
              <FadeUp
                key={a.num}
                delay={i * 0.12}
                className="group relative flex flex-col justify-between overflow-hidden border border-slate-200/90 bg-white p-6 shadow-sm transition-all duration-300 hover:border-accent/60 hover:shadow-xl"
              >
                {/* Background Large Number Watermark */}
                <span
                  aria-hidden="true"
                  className="font-display pointer-events-none absolute -top-4 -right-2 text-[7.5rem] leading-none text-slate-900/[0.03] transition-all duration-500 select-none group-hover:text-accent/[0.08] group-hover:scale-105"
                >
                  {a.num}
                </span>

                <div className="relative z-10">
                  <div className="flex items-center gap-2.5">
                    <span className="h-2 w-2 rotate-45 bg-accent" />
                    <span className="eyebrow text-accent font-semibold tracking-wider text-[11px]">
                      {a.category}
                    </span>
                  </div>

                  <h4 className="font-display mt-4 text-[1.8rem] leading-[1.05] text-ink transition-colors duration-300 group-hover:text-accent">
                    {a.title}
                  </h4>

                  <p className="mt-2 text-[13.5px] italic leading-snug text-accent">
                    {a.hook}
                  </p>

                  <p className="mt-3 text-[13.5px] leading-relaxed text-stone">
                    {a.description}
                  </p>
                </div>

                <div className="relative z-10 mt-5 border-t border-slate-100 pt-3.5">
                  <button
                    type="button"
                    onClick={() => scrollTo("#contact")}
                    className="group/btn flex w-full items-center justify-between text-[13px] font-semibold tracking-wide uppercase text-ink transition-colors duration-300 hover:text-accent"
                  >
                    <span>{a.cta}</span>
                    <span className="grid h-7 w-7 place-items-center border border-slate-200 bg-slate-50 transition-all duration-300 group-hover/btn:border-accent group-hover/btn:bg-accent group-hover/btn:text-white">
                      <ArrowUpRight className="text-xs" />
                    </span>
                  </button>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
