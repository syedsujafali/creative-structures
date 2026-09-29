import { motion, useScroll, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";
import { IMG } from "@/data/site";
import { ArrowDown, ArrowUpRight } from "./Icons";
import { FadeUp, RevealImage, RevealWords, Rule } from "./motion";

type Props = {
  ready: boolean;
  onImageLoad: () => void;
  onNavigate: (id: string) => void;
  onService?: (index: number) => void;
};

const STATS = [
  {
    num: "15+",
    label: "Years of Experience",
    detail: "Licensed NJ General Contractor",
    index: "01",
  },
  {
    num: "250+",
    label: "Projects Completed",
    detail: "Residential & Commercial Builds",
    index: "02",
  },
  {
    num: "21",
    label: "NJ Counties Served",
    detail: "Statewide Project Coverage",
    index: "03",
  },
  {
    num: "100%",
    label: "NJ Code Compliance",
    detail: "Permits & Inspections Passed",
    index: "04",
  },
];

export function Hero({ ready, onImageLoad, onNavigate }: Props) {
  const ref = useRef<HTMLElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const mobileImgRef = useRef<HTMLImageElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const imageY = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const textY = useTransform(scrollYProgress, [0, 1], ["0%", "-18%"]);

  useEffect(() => {
    const img = imgRef.current || mobileImgRef.current;
    if (img && img.complete && img.naturalWidth > 0) onImageLoad();
  }, [onImageLoad]);

  return (
    <section
      id="top"
      ref={ref}
      data-theme="light"
      data-folio=""
      aria-label="Introduction"
      className="relative overflow-hidden bg-transparent text-ink"
    >
      <div className="flex flex-col px-4 pt-20 pb-6 sm:px-6 md:px-10 lg:pt-24 lg:pb-8 xl:px-14">
        {/* ---------- Composition (Split 2-Column Desktop / Background-Image Overlay on Mobile) ---------- */}
        <div className="grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-0 lg:min-h-[480px]">
          {/* Left Column: Content (with Mobile Ambient Image Background) */}
          <div className="relative flex flex-col justify-center overflow-hidden rounded-sm border border-slate-200/80 bg-white/80 p-5 shadow-sm backdrop-blur-sm sm:p-8 lg:col-span-6 lg:overflow-visible lg:rounded-none lg:border-none lg:bg-transparent lg:p-0 lg:pr-10 lg:py-4 lg:shadow-none xl:col-span-5 xl:pr-14">
            {/* Mobile-Only Background Hero Image with Less Opacity & Soft Gradient Blend */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 z-0 overflow-hidden lg:hidden"
            >
              <RevealImage
                img={IMG.heroHouse}
                play={ready}
                priority
                imgRef={mobileImgRef}
                onLoad={onImageLoad}
                className="h-full w-full object-cover opacity-20 scale-105"
                sizes="100vw"
                duration={1.6}
                delay={0.1}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-white via-white/85 to-white/70" />
              <div className="absolute inset-0 bg-gradient-to-r from-white/90 via-white/60 to-white/90" />
            </div>

            <motion.div style={{ y: textY }} className="relative z-10">
              <FadeUp play={ready} delay={0.3} y={10} className="flex items-center gap-2.5 sm:gap-3">
                <span className="h-px w-6 sm:w-8 bg-accent" />
                <span className="eyebrow text-[10px] sm:text-[11px] text-accent font-semibold tracking-wider">
                  Construction &amp; Renovation — New Jersey
                </span>
              </FadeUp>

              <h1 className="font-display display-tight mt-3 sm:mt-4 text-[2.35rem] leading-[1.02] text-ink xs:text-[2.75rem] sm:text-[3.5rem] md:text-[4.2rem] lg:mt-6 lg:text-[3.4rem] xl:text-[4.2rem] 2xl:text-[4.8rem]">
                <RevealWords
                  play={ready}
                  delay={0.4}
                  stagger={0.06}
                  duration={1.25}
                  segments={[
                    { text: "Built with " },
                    { text: "care", className: "italic text-accent", glow: false },
                    { text: "\nfor homes " },
                    { text: "and", className: "italic text-accent" },
                    { text: "\nlocal business." },
                  ]}
                />
              </h1>

              <FadeUp play={ready} delay={0.9}>
                <p className="mt-3 sm:mt-4 max-w-[38ch] text-[14.5px] leading-relaxed text-stone sm:text-[15.5px] md:text-[16.5px]">
                  <span className="font-semibold text-ink">Creative Structures NJ</span> is an independent
                  licensed contractor for residential construction, additions, remodeling, roofing and commercial fit-outs across New Jersey.
                </p>
              </FadeUp>

              <FadeUp play={ready} delay={1.1} className="mt-5 sm:mt-6 flex flex-col sm:flex-row items-stretch sm:items-center gap-3 sm:gap-4">
                <a
                  href="#contact"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("contact");
                  }}
                  className="group relative inline-flex items-center justify-center gap-3 overflow-hidden bg-accent px-6 py-3.5 text-[13.5px] font-semibold uppercase tracking-[0.06em] text-white shadow-md transition-all duration-300 hover:bg-accent-deep hover:shadow-lg text-center"
                >
                  <span className="absolute inset-0 origin-left scale-x-0 bg-accent-deep transition-transform duration-500 ease-arch group-hover:scale-x-100" />
                  <span className="relative">Discuss a project</span>
                  <ArrowUpRight className="relative text-base transition-transform duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </a>
                <a
                  href="#services"
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigate("services");
                  }}
                  className="group relative inline-flex items-center justify-center gap-2 border border-slate-300 bg-white px-6 py-3.5 text-[13.5px] font-semibold uppercase tracking-[0.06em] text-ink shadow-sm transition-all duration-300 hover:border-slate-500 hover:text-accent text-center"
                >
                  <span>Explore services</span>
                  <ArrowDown className="text-sm transition-transform duration-500 group-hover:translate-y-0.5" />
                </a>
              </FadeUp>
            </motion.div>
          </div>

          {/* Right Column: Hero Image with Red Vertical Divider (Desktop Only) */}
          <div className="relative hidden pt-6 lg:col-span-6 lg:block lg:pl-10 lg:pt-0 xl:col-span-7 xl:pl-14">
            {/* Subtle Red Architectural Divider Line */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-y-0 -left-[1px] hidden w-px bg-accent/80 shadow-[0_0_8px_rgba(214,40,46,0.35)] lg:block"
            />

            <div className="relative h-full min-h-[320px] sm:min-h-[380px] lg:min-h-[460px] xl:min-h-[500px] w-full overflow-hidden border border-slate-200/80 shadow-md">
              <motion.div style={{ y: imageY }} className="absolute inset-0">
                <RevealImage
                  img={IMG.heroHouse}
                  play={ready}
                  priority
                  imgRef={imgRef}
                  onLoad={onImageLoad}
                  className="h-full w-full object-cover"
                  sizes="(min-width: 1024px) 50vw, 95vw"
                  zoom={1.18}
                  duration={1.8}
                  delay={0.2}
                />
                <div className="pointer-events-none absolute inset-y-0 left-0 hidden w-28 bg-gradient-to-r from-black/10 to-transparent lg:block" />
                <div className="pointer-events-none absolute inset-x-0 bottom-0 h-28 bg-gradient-to-t from-black/20 to-transparent" />
              </motion.div>

              {/* Crop mark */}
              <span className="pointer-events-none absolute top-0 left-0 hidden h-3 w-3 border-t border-l border-accent lg:block" />

              <FadeUp play={ready} delay={1.4} y={8} className="absolute top-4 right-4">
                <span className="eyebrow bg-white/95 px-3 py-1.5 text-ink font-medium shadow-sm backdrop-blur-md border border-slate-200">
                  Residential exterior
                </span>
              </FadeUp>
            </div>
          </div>
        </div>

        {/* ---------- 4 Key Architectural Metric Boxes (Clean Minimalist on Mobile) ---------- */}
        <div className="relative z-10 mt-6 sm:mt-8 lg:mt-10">
          <Rule play={ready} delay={0.9} className="bg-slate-200" />
          <div className="grid grid-cols-2 gap-2.5 pt-3.5 sm:gap-4 md:grid-cols-4 sm:pt-5">
            {STATS.map((stat, i) => (
              <FadeUp
                key={stat.label}
                play={ready}
                delay={1.2 + i * 0.08}
                y={10}
                className="group relative overflow-hidden border border-slate-200/90 bg-white p-3 sm:p-5 shadow-sm transition-all duration-300 hover:border-accent/60 hover:shadow-md"
              >
                {/* Top Accent Line on hover */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-accent origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />

                <div className="flex items-center justify-between">
                  <span className="font-mono text-[10px] sm:text-[11px] font-bold text-accent">
                    {stat.index}
                  </span>
                  <span className="h-1.5 w-1.5 rotate-45 bg-accent/40 group-hover:bg-accent transition-colors" />
                </div>

                <div className="mt-1 sm:mt-2">
                  {/* Number (Prominent on all screens) */}
                  <span className="font-display block text-[1.85rem] xs:text-[2.1rem] sm:text-[2.6rem] lg:text-[2.8rem] font-bold leading-none text-ink group-hover:text-accent transition-colors">
                    {stat.num}
                  </span>

                  {/* Main Heading (Visible on all screens) */}
                  <h3 className="font-display mt-1 sm:mt-2 text-[12.5px] xs:text-[13.5px] sm:text-[15px] font-semibold text-ink leading-tight">
                    {stat.label}
                  </h3>

                  {/* Sub-content Detail: Hidden on Mobile as requested */}
                  <p className="mt-0.5 text-[12px] text-stone hidden sm:block">
                    {stat.detail}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
