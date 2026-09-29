import { useEffect, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, MapPinIcon } from "./Icons";
import { FadeUp, RevealWords, SectionLabel } from "./motion";

export type ReviewItem = {
  id: string;
  index: string;
  headline: string;
  quote: string;
  author: string;
  initials: string;
  location: string;
  category: string;
  date: string;
};

const REVIEWS: ReviewItem[] = [
  {
    id: "rev-1",
    index: "01",
    headline: "Seamless structural tie-in and flawless finishes.",
    quote:
      "Creative Structures delivered our two-story addition on schedule. The structural work and matching exterior siding look as though the home was always built this way.",
    author: "David & Sarah Miller",
    initials: "DM",
    location: "Ridgewood, NJ",
    category: "Additions",
    date: "Aug 2025",
  },
  {
    id: "rev-2",
    index: "02",
    headline: "Direct builder communication with zero middleman.",
    quote:
      "Speaking directly with the builders on site made everything easy. The custom cabinetry and marble island craftsmanship is outstanding.",
    author: "Michael & Elena Kovacs",
    initials: "MK",
    location: "Morristown, NJ",
    category: "Remodeling",
    date: "Oct 2025",
  },
  {
    id: "rev-3",
    index: "03",
    headline: "Two-day roof replacement with military precision.",
    quote:
      "Complete tear-off and architectural shingle installation with a spotless clean jobsite. Weathered heavy storms without a single issue.",
    author: "Robert Callahan",
    initials: "RC",
    location: "Red Bank, NJ",
    category: "Roofing",
    date: "Nov 2025",
  },
  {
    id: "rev-4",
    index: "04",
    headline: "Transformed our master bath into a luxury spa.",
    quote:
      "Flawless marble alignment, custom glass wet room, and clean plumbing rough-ins that passed township inspection on day one.",
    author: "Elena Rostova",
    initials: "ER",
    location: "Montclair, NJ",
    category: "Remodeling",
    date: "Jan 2026",
  },
  {
    id: "rev-5",
    index: "05",
    headline: "Turnkey commercial fit-out on target schedule.",
    quote:
      "Handled our café buildout from municipal codes to final handover with ease. Opened right on our target launch date.",
    author: "Marcus Vance",
    initials: "MV",
    location: "Hoboken, NJ",
    category: "Commercial",
    date: "Feb 2026",
  },
  {
    id: "rev-6",
    index: "06",
    headline: "Outstanding curb appeal and structural quality.",
    quote:
      "Built a brand-new covered front portico with composite siding. Transparent itemized pricing and genuine attention to detail.",
    author: "James & Patricia Thorne",
    initials: "JT",
    location: "Summit, NJ",
    category: "Exterior",
    date: "Mar 2026",
  },
];

export function Reviews() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 15);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 15);

    const cardWidth = scrollRef.current.clientWidth > 768 ? 440 : scrollRef.current.clientWidth * 0.86;
    const index = Math.min(
      REVIEWS.length - 1,
      Math.max(0, Math.round(scrollLeft / cardWidth))
    );
    setActiveIndex(index);
  };

  useEffect(() => {
    checkScroll();
    window.addEventListener("resize", checkScroll);
    return () => window.removeEventListener("resize", checkScroll);
  }, []);

  const handleScroll = (direction: "left" | "right") => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.clientWidth > 768 ? 440 : scrollRef.current.clientWidth * 0.86;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -cardWidth : cardWidth,
      behavior: "smooth",
    });
  };

  const scrollToIndex = (idx: number) => {
    if (!scrollRef.current) return;
    const cardWidth = scrollRef.current.clientWidth > 768 ? 440 : scrollRef.current.clientWidth * 0.86;
    scrollRef.current.scrollTo({
      left: idx * cardWidth,
      behavior: "smooth",
    });
  };

  return (
    <section
      id="reviews"
      data-theme="light"
      aria-labelledby="reviews-title"
      className="grain relative overflow-hidden bg-transparent text-ink border-t border-slate-200"
    >
      <div className="relative px-5 py-8 md:px-10 lg:py-12 xl:px-14">
        {/* Top Header */}
        <div className="flex flex-col gap-2 border-b border-slate-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionLabel n="04" label="Client Reviews" />
          <FadeUp delay={0.1}>
            <div className="flex items-center gap-2">
              <span className="flex text-accent text-sm tracking-wider">★★★★★</span>
              <p className="eyebrow text-accent font-semibold">
                5.0 Rating · <span className="text-stone font-normal">Verified NJ Homeowners &amp; Businesses</span>
              </p>
            </div>
          </FadeUp>
        </div>

        {/* 2-Column Split: Sticky Trust Console (Left) & Scrollable Carousel (Right) */}
        <div className="mt-6 grid grid-cols-1 items-start gap-8 lg:grid-cols-12 lg:gap-10 lg:mt-8">
          {/* ========================================================
              LEFT COLUMN: Trust Score & Navigation Controls
             ======================================================== */}
          <div className="lg:col-span-4 flex flex-col justify-between space-y-6">
            <div>
              <h2
                id="reviews-title"
                className="font-display display-tight text-[2.6rem] leading-[0.98] text-ink sm:text-[3.2rem] lg:text-[3.4rem]"
              >
                <RevealWords
                  segments={[
                    { text: "Trusted across " },
                    { text: "New Jersey", className: "italic text-accent", glow: false },
                    { text: " communities." },
                  ]}
                />
              </h2>

              <FadeUp delay={0.2} className="mt-4">
                <p className="text-[15px] leading-relaxed text-stone">
                  Direct client feedback from homeowners and businesses who experienced our licensed builder standard.
                </p>
              </FadeUp>
            </div>

            {/* Clean Trust Metrics Badge */}
            <FadeUp delay={0.25} className="border border-slate-200/90 bg-white p-5 shadow-sm space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-baseline gap-2">
                  <span className="font-display text-[2.4rem] font-bold leading-none text-ink">5.0</span>
                  <div className="text-accent text-sm flex">★★★★★</div>
                </div>
                <span className="font-mono text-[11px] font-bold px-2 py-0.5 border border-accent/30 bg-accent/10 text-accent">
                  100% VERIFIED
                </span>
              </div>
              <p className="text-[12px] text-stone font-mono">
                Serving all 21 counties in New Jersey with 100% code compliance.
              </p>
            </FadeUp>

            {/* Interactive Carousel Controls */}
            <FadeUp delay={0.3} className="flex items-center justify-between border-t border-slate-200 pt-4">
              <div className="flex items-center gap-2">
                <span className="font-mono text-xs font-bold text-accent">
                  {String(activeIndex + 1).padStart(2, "0")}
                </span>
                <span className="text-stone text-xs font-mono">/</span>
                <span className="font-mono text-xs text-stone">
                  {String(REVIEWS.length).padStart(2, "0")}
                </span>
              </div>

              {/* Navigation Arrows */}
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={() => handleScroll("left")}
                  disabled={!canScrollLeft}
                  className="grid h-10 w-10 place-items-center border border-slate-300 bg-white text-ink shadow-sm transition-all duration-300 hover:border-accent hover:bg-accent hover:text-white disabled:opacity-30 disabled:hover:border-slate-300 disabled:hover:bg-white disabled:hover:text-ink cursor-pointer disabled:cursor-not-allowed"
                  aria-label="Previous review"
                >
                  <ArrowLeft className="text-sm" />
                </button>
                <button
                  type="button"
                  onClick={() => handleScroll("right")}
                  disabled={!canScrollRight}
                  className="grid h-10 w-10 place-items-center border border-slate-300 bg-white text-ink shadow-sm transition-all duration-300 hover:border-accent hover:bg-accent hover:text-white disabled:opacity-30 disabled:hover:border-slate-300 disabled:hover:bg-white disabled:hover:text-ink cursor-pointer disabled:cursor-not-allowed"
                  aria-label="Next review"
                >
                  <ArrowRight className="text-sm" />
                </button>
              </div>
            </FadeUp>
          </div>

          {/* ========================================================
              RIGHT COLUMN: Clean, Concise Review Cards Carousel
             ======================================================== */}
          <div className="lg:col-span-8 min-w-0">
            <div
              ref={scrollRef}
              onScroll={checkScroll}
              className="flex gap-5 overflow-x-auto pb-4 pt-1 snap-x snap-mandatory scroll-smooth no-scrollbar"
              tabIndex={0}
              role="region"
              aria-label="Client testimonials carousel"
            >
              {REVIEWS.map((rev) => (
                <article
                  key={rev.id}
                  className="group relative flex w-[84vw] max-w-[340px] sm:w-[360px] lg:w-[420px] shrink-0 snap-start flex-col justify-between overflow-hidden border border-slate-200/90 bg-white p-5 sm:p-7 shadow-sm transition-all duration-300 hover:border-accent/70 hover:shadow-xl"
                >
                  {/* Top Animated Red Accent Line on hover */}
                  <div className="absolute top-0 inset-x-0 h-[2.5px] bg-accent origin-left scale-x-0 transition-transform duration-300 group-hover:scale-x-100" />

                  <div>
                    {/* Top Status Bar: Category, Index & Stars */}
                    <div className="flex items-center justify-between border-b border-slate-100 pb-3">
                      <div className="flex items-center gap-2">
                        <span className="font-mono text-xs font-bold text-accent px-1.5 py-0.5 bg-accent/10 border border-accent/25">
                          {rev.index}
                        </span>
                        <span className="eyebrow text-[9.5px] bg-slate-100 px-2 py-0.5 text-stone border border-slate-200">
                          {rev.category}
                        </span>
                      </div>

                      <div className="flex items-center gap-1 text-accent text-sm tracking-wider">
                        {"★".repeat(5)}
                      </div>
                    </div>

                    {/* Bold Concise Headline */}
                    <h3 className="font-display mt-4 text-[1.25rem] sm:text-[1.35rem] font-semibold leading-[1.25] text-ink transition-colors duration-300 group-hover:text-accent">
                      &ldquo;{rev.headline}&rdquo;
                    </h3>

                    {/* Clean Short Review Quote */}
                    <p className="mt-3 text-[14px] leading-relaxed text-slate-700">
                      {rev.quote}
                    </p>
                  </div>

                  {/* Author Profile Footer */}
                  <div className="mt-6 flex items-center justify-between border-t border-slate-100 pt-4">
                    <div className="flex items-center gap-3">
                      {/* Monogram Avatar Badge */}
                      <div className="grid h-10 w-10 place-items-center bg-accent/10 border border-accent/30 font-mono text-xs font-bold text-accent shadow-sm group-hover:bg-accent group-hover:text-white transition-colors">
                        {rev.initials}
                      </div>
                      <div>
                        <h4 className="font-display text-[14.5px] font-semibold text-ink group-hover:text-accent transition-colors">
                          {rev.author}
                        </h4>
                        <p className="flex items-center gap-1 text-[12px] text-stone">
                          <MapPinIcon className="text-accent text-xs" />
                          <span>{rev.location}</span>
                        </p>
                      </div>
                    </div>

                    <div className="text-right">
                      <span className="inline-flex items-center gap-1 font-mono text-[10.5px] text-accent font-semibold">
                        <span className="h-1.5 w-1.5 rounded-full bg-accent" />
                        Verified
                      </span>
                      <p className="text-[10px] text-stone/70 mt-0.5 font-mono">
                        {rev.date}
                      </p>
                    </div>
                  </div>
                </article>
              ))}
            </div>

            {/* Clickable Pagination Dots */}
            <div className="mt-5 flex items-center justify-center gap-2">
              {REVIEWS.map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => scrollToIndex(i)}
                  className={`h-2 transition-all duration-300 rounded-full cursor-pointer ${
                    activeIndex === i
                      ? "w-8 bg-accent shadow-[0_0_8px_rgba(214,40,46,0.6)]"
                      : "w-2 bg-slate-300 hover:bg-slate-400"
                  }`}
                  aria-label={`Go to review ${i + 1}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
