import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { SERVICES, type Service } from "@/data/site";
import { cn } from "@/utils/cn";
import { ArrowDown, ArrowUpRight, Close } from "./Icons";
import { EASE_ARCH, FadeUp, RevealImage, RevealWords, SectionLabel } from "./motion";

type Props = {
  onEnquire: (s: Service) => void;
};

export function ServicesSection({ onEnquire }: Props) {
  const [selectedService, setSelectedService] = useState<Service | null>(null);

  return (
    <section
      id="services"
      data-theme="light"
      data-folio="02|Services"
      aria-labelledby="services-title"
      className="grain relative overflow-hidden bg-transparent text-ink"
    >
      <div className="relative px-4 py-8 sm:px-6 md:px-10 lg:py-12 xl:px-14">
        {/* Top Header */}
        <div className="flex flex-col gap-2 border-b border-slate-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionLabel n="02" label="Services" />
          <FadeUp delay={0.1}>
            <p className="eyebrow text-accent font-semibold">
              Capabilities &amp; Scope · <span className="text-stone font-normal">New Jersey</span>
            </p>
          </FadeUp>
        </div>

        {/* Headline */}
        <div className="pt-5 lg:pt-8">
          <div className="grid grid-cols-1 items-end gap-5 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-8">
              <h2
                id="services-title"
                className="font-display display-tight text-[2.35rem] leading-[1.02] text-ink xs:text-[2.75rem] sm:text-[3.2rem] md:text-[3.8rem] lg:text-[4.2rem] xl:text-[4.8rem]"
              >
                <RevealWords
                  segments={[
                    { text: "Full-scope " },
                    { text: "construction", className: "italic text-accent", glow: false },
                    { text: " & renovations." },
                  ]}
                />
              </h2>
            </div>
            <div className="lg:col-span-4 lg:pb-1">
              <FadeUp delay={0.2}>
                <p className="max-w-[42ch] text-[14.5px] leading-relaxed text-stone sm:text-[15px] md:text-[16px]">
                  Specialized building, structural additions, remodeling, roofing, and commercial buildouts across New Jersey — delivered directly from concept to completion.
                </p>
              </FadeUp>
            </div>
          </div>
        </div>

        {/* Services Cards Grid */}
        <div className="mt-6 grid grid-cols-1 gap-4 sm:gap-5 md:grid-cols-2 lg:grid-cols-3 lg:mt-8">
          {SERVICES.map((s) => (
            <ServiceCard
              key={s.key}
              service={s}
              onSelect={() => setSelectedService(s)}
              onEnquire={() => onEnquire(s)}
            />
          ))}
        </div>
      </div>

      {/* Service Detail Modal (Tablet & Desktop) */}
      <AnimatePresence>
        {selectedService && (
          <ServiceModal
            service={selectedService}
            onClose={() => setSelectedService(null)}
            onEnquire={() => {
              const s = selectedService;
              setSelectedService(null);
              onEnquire(s);
            }}
          />
        )}
      </AnimatePresence>
    </section>
  );
}

function ServiceCard({
  service,
  onSelect,
  onEnquire,
}: {
  service: Service;
  onSelect: () => void;
  onEnquire: () => void;
  key?: string;
}) {
  const [mobileExpanded, setMobileExpanded] = useState(false);

  return (
    <article className="group relative flex flex-col justify-between overflow-hidden border border-slate-200/90 bg-white shadow-sm transition-all duration-300 hover:border-accent/60 hover:shadow-xl">
      {/* Top Image Frame (Visible on all screens) */}
      <div
        onClick={() => {
          if (window.innerWidth < 768) {
            setMobileExpanded((prev) => !prev);
          } else {
            onSelect();
          }
        }}
        className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100 cursor-pointer"
      >
        <RevealImage
          img={service.image}
          className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-105"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          hover
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/25 via-transparent to-transparent" />

        {/* Badges */}
        <div className="absolute top-3 left-3 flex items-center gap-2">
          <span className="eyebrow border border-slate-200 bg-white/95 px-2 py-0.5 text-ink font-medium shadow-sm backdrop-blur-md">
            {service.category}
          </span>
        </div>

        <span className="eyebrow absolute top-3 right-3 border border-slate-200 bg-white/95 px-2 py-0.5 text-accent font-mono font-bold shadow-sm backdrop-blur-md">
          {service.index}
        </span>
      </div>

      {/* ========================================================
          MOBILE VIEW: Service Name + Collapsible Dropdown
         ======================================================== */}
      <div className="flex flex-col md:hidden p-4">
        {/* Service Header Row with Dropdown Trigger */}
        <button
          type="button"
          onClick={() => setMobileExpanded((prev) => !prev)}
          className="flex items-center justify-between gap-3 text-left w-full cursor-pointer group/title"
          aria-expanded={mobileExpanded}
        >
          <div className="pr-2">
            <span className="eyebrow text-[10px] text-accent font-semibold">{service.caption}</span>
            <h3 className="font-display mt-0.5 text-[1.4rem] font-semibold leading-tight text-ink group-hover/title:text-accent transition-colors">
              {service.name}
            </h3>
          </div>
          <div
            className={cn(
              "grid h-8 w-8 shrink-0 place-items-center border transition-all duration-300",
              mobileExpanded
                ? "border-accent bg-accent text-white rotate-180 shadow-sm"
                : "border-slate-300 bg-slate-50 text-stone group-hover/title:border-accent group-hover/title:text-accent"
            )}
          >
            <ArrowDown className="text-xs transition-transform duration-300" />
          </div>
        </button>

        {/* Animated Dropdown Content on Mobile */}
        <AnimatePresence initial={false}>
          {mobileExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE_ARCH }}
              className="overflow-hidden"
            >
              <div className="pt-3.5 mt-3 border-t border-slate-100 space-y-3">
                <div className="flex items-center justify-between text-stone text-[11px] font-mono">
                  <span className="text-accent font-semibold">Scope &amp; Overview</span>
                  <span className="bg-slate-100 px-2 py-0.5 text-stone border border-slate-200">{service.propertyType}</span>
                </div>

                <p className="text-[13.5px] leading-relaxed text-slate-700">
                  {service.body}
                </p>

                {/* Scope Capabilities */}
                <div className="space-y-1.5 pt-1">
                  <p className="eyebrow text-[10px] text-accent font-semibold">Key Capabilities:</p>
                  <ul className="space-y-1.5">
                    {service.items.map((item) => (
                      <li key={item} className="flex items-start gap-2 border border-slate-100 bg-slate-50/70 p-2 text-[12.5px] text-slate-800">
                        <span className="mt-1 h-1.5 w-1.5 rotate-45 bg-accent shrink-0" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Mobile Action Button */}
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={onEnquire}
                    className="flex w-full items-center justify-between bg-accent px-4 py-3 text-[13px] font-bold uppercase tracking-wider text-white shadow-md transition-all active:scale-[0.99] hover:bg-accent-deep cursor-pointer"
                  >
                    <span>Inquire for Estimate</span>
                    <ArrowUpRight className="text-sm" />
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* ========================================================
          DESKTOP VIEW (md: and up): Full Structured Card
         ======================================================== */}
      <div className="hidden md:flex flex-col justify-between flex-1 p-5 sm:p-6">
        <div>
          <div className="flex items-center justify-between text-stone">
            <span className="eyebrow text-[10px] text-accent font-semibold">{service.caption}</span>
            <span className="eyebrow text-[10px] text-stone">{service.propertyType}</span>
          </div>

          <h3
            onClick={onSelect}
            className="font-display mt-2.5 text-[1.55rem] leading-[1.15] text-ink transition-colors duration-300 group-hover:text-accent cursor-pointer"
          >
            {service.name}
          </h3>

          <p className="mt-2.5 text-[14px] leading-relaxed text-stone">
            {service.body}
          </p>
        </div>

        {/* Action Button */}
        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-3.5">
          <button
            type="button"
            onClick={onEnquire}
            className="group/btn flex items-center gap-1.5 text-[13px] font-semibold text-accent transition-colors duration-300 hover:text-accent-deep"
          >
            <span>Inquire for Estimate</span>
            <ArrowUpRight className="text-sm transition-transform duration-300 group-hover/btn:translate-x-0.5 group-hover/btn:-translate-y-0.5" />
          </button>

          <button
            type="button"
            onClick={onSelect}
            className="eyebrow text-[10px] text-stone transition-colors hover:text-ink"
          >
            Details +
          </button>
        </div>
      </div>
    </article>
  );
}

function ServiceModal({
  service,
  onClose,
  onEnquire,
}: {
  service: Service;
  onClose: () => void;
  onEnquire: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        transition={{ duration: 0.3, ease: EASE_ARCH }}
        className="relative max-h-[90vh] w-full max-w-2xl overflow-y-auto border border-slate-200 bg-white p-6 text-ink shadow-2xl md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute top-6 right-6 grid h-9 w-9 place-items-center border border-slate-200 text-stone transition-colors hover:border-accent hover:text-accent"
          aria-label="Close service modal"
        >
          <Close />
        </button>

        <div className="flex items-center gap-3">
          <span className="eyebrow bg-accent px-2.5 py-1 text-white font-mono font-bold">{service.index}</span>
          <span className="eyebrow text-accent font-semibold">{service.category}</span>
        </div>

        <h3 className="font-display mt-4 text-[2.4rem] leading-[1.05] text-ink md:text-[2.8rem]">
          {service.name}
        </h3>
        <p className="mt-1 text-[14px] text-stone italic">{service.short}</p>

        <p className="mt-5 text-[15.5px] leading-relaxed text-slate-700">
          {service.body}
        </p>

        <div className="mt-8 border-t border-slate-200 pt-6">
          <h4 className="eyebrow text-accent font-semibold mb-3">Scope of Work &amp; Capabilities</h4>
          <ul className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
            {service.items.map((item) => (
              <li key={item} className="flex items-start gap-2.5 border border-slate-200 bg-slate-50 p-3 text-[13.5px] text-ink">
                <span className="mt-1.5 h-1.5 w-1.5 rotate-45 bg-accent shrink-0" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-slate-200 pt-6">
          <div className="text-[13px] text-stone">
            <span>Property Type: </span>
            <span className="text-ink font-semibold">{service.propertyType}</span>
          </div>

          <button
            type="button"
            onClick={onEnquire}
            className="flex items-center justify-center gap-3 bg-accent px-6 py-3.5 text-[14px] font-semibold uppercase tracking-wider text-white shadow-md transition-all hover:bg-accent-deep hover:shadow-lg"
          >
            <span>Request Estimate for this Service</span>
            <ArrowUpRight className="text-base" />
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}
