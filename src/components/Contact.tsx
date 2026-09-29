import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState, type ChangeEvent, type FormEvent } from "react";
import { type PropertyType } from "@/data/site";
import { cn } from "@/utils/cn";
import { ArrowDown, ArrowRight, CheckIcon, ClockIcon, Close, MapPinIcon, ShieldIcon } from "./Icons";
import { EASE_ARCH, EASE_OUT, FadeUp, RevealWords, SectionLabel } from "./motion";

export type Prefill = { propertyType?: PropertyType; reference?: string; nonce: number };

const DISCIPLINES = [
  {
    id: "remodel",
    title: "Kitchen & Bath Remodeling",
    subtitle: "Custom cabinetry, stone surfaces, luxury fixtures & layouts",
    index: "01",
  },
  {
    id: "addition",
    title: "Home Additions & Expansions",
    subtitle: "Second stories, sunrooms, master suites & structural framing",
    index: "02",
  },
  {
    id: "newbuild",
    title: "New Home Construction",
    subtitle: "Ground-up custom residential builds & building envelope",
    index: "03",
  },
  {
    id: "roofing",
    title: "Roofing & Weatherproofing",
    subtitle: "Architectural shingles, tear-offs, custom flashing & drainage",
    index: "04",
  },
  {
    id: "exterior",
    title: "Siding, Trim & Porticos",
    subtitle: "Clapboard siding, covered porticos, windows & millwork",
    index: "05",
  },
  {
    id: "commercial",
    title: "Commercial & Retail Buildouts",
    subtitle: "Storefronts, boutique offices, cafes & NJ code renovations",
    index: "06",
  },
  {
    id: "other",
    title: "General Inquiries / Custom Scope",
    subtitle: "Structural repairs, specialized carpentry or consult",
    index: "07",
  },
] as const;

type FormValues = {
  name: string;
  email: string;
  phone: string;
  location: string;
  service: string;
  message: string;
};

type FormErrors = Partial<Record<keyof FormValues, string>>;

const INITIAL_VALUES: FormValues = {
  name: "",
  email: "",
  phone: "",
  location: "",
  service: DISCIPLINES[0].title,
  message: "",
};

export function Contact({ prefill }: { prefill: Prefill | null }) {
  const [values, setValues] = useState<FormValues>(INITIAL_VALUES);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<"idle" | "sending" | "sent">("idle");
  const [reference, setReference] = useState<string | null>(null);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown on click outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    if (!prefill) return;
    if (prefill.reference) {
      setReference(prefill.reference);
      const match = DISCIPLINES.find((s) => prefill.reference?.toLowerCase().includes(s.title.toLowerCase().slice(0, 8)));
      if (match) setValues((v) => ({ ...v, service: match.title }));
    }
  }, [prefill]);

  const update = (key: keyof FormValues) => (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const val = e.target.value;
    setValues((prev) => ({ ...prev, [key]: val }));
    if (errors[key]) setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const selectDiscipline = (title: string) => {
    setValues((prev) => ({ ...prev, service: title }));
    setDropdownOpen(false);
  };

  const validate = (): FormErrors => {
    const errs: FormErrors = {};
    if (!values.name.trim()) errs.name = "Please enter your name";
    if (!values.email.trim()) errs.email = "Please enter your email address";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) errs.email = "Please enter a valid email";
    if (!values.phone.trim()) errs.phone = "Please enter your phone number";
    else if (values.phone.replace(/\D/g, "").length < 7) errs.phone = "Please enter a valid phone number";
    if (!values.message.trim() || values.message.trim().length < 5) {
      errs.message = "Please tell us a little about your project";
    }
    return errs;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) return;

    setStatus("sending");
    window.setTimeout(() => setStatus("sent"), 1000);
  };

  const handleReset = () => {
    setValues(INITIAL_VALUES);
    setErrors({});
    setReference(null);
    setStatus("idle");
  };

  const selectedDisciplineObj = DISCIPLINES.find((d) => d.title === values.service) || DISCIPLINES[0];

  return (
    <section
      id="contact"
      data-theme="light"
      data-folio="04|Contact"
      aria-labelledby="contact-title"
      className="grain relative overflow-hidden bg-transparent text-ink border-t border-slate-200"
    >
      <div className="relative px-5 py-8 md:px-10 lg:py-12 xl:px-14">
        {/* Section Top Header (Full Width) */}
        <div className="flex flex-col gap-2 border-b border-slate-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionLabel n="05" label="Contact &amp; Inquiries" />
          <FadeUp delay={0.1}>
            <div className="flex items-center gap-2.5">
              <span className="breathe h-2 w-2 rounded-full bg-accent" />
              <p className="eyebrow text-accent font-semibold">
                Estimating Open · <span className="text-stone font-normal">New Jersey Statewide</span>
              </p>
            </div>
          </FadeUp>
        </div>

        {/* Heroic Headline Strip */}
        <div className="pt-5 lg:pt-8">
          <div className="grid grid-cols-1 items-end gap-5 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-8">
              <h2
                id="contact-title"
                className="font-display display-tight text-[2.6rem] leading-[1.02] text-ink sm:text-[3.2rem] md:text-[3.8rem] lg:text-[4.2rem] xl:text-[4.8rem]"
              >
                <RevealWords
                  segments={[
                    { text: "Let's talk about " },
                    { text: "your project.", className: "italic text-accent", glow: false },
                  ]}
                />
              </h2>
            </div>
            <div className="lg:col-span-4 lg:pb-1">
              <FadeUp delay={0.2}>
                <p className="max-w-[42ch] text-[15px] leading-relaxed text-stone md:text-[16px]">
                  Tell us what you have in mind. We&apos;ll review your requirements and reach out directly to schedule a walkthrough and provide a clear estimate.
                </p>
              </FadeUp>
            </div>
          </div>
        </div>

        {/* Balanced Full-Width 2-Column Grid (Form prioritized first on mobile) */}
        <div className="mt-6 grid grid-cols-1 items-stretch gap-6 lg:grid-cols-12 lg:gap-8 lg:mt-8">
          {/* ========================================================
              FORM COLUMN (First on mobile, right on desktop)
             ======================================================== */}
          <div className="order-1 lg:order-2 lg:col-span-7">
            <FadeUp delay={0.15} className="relative h-full flex flex-col justify-between border border-slate-200 bg-white p-4.5 sm:p-7 md:p-10 shadow-lg">
              <AnimatePresence mode="wait" initial={false}>
                {status !== "sent" ? (
                  <motion.form
                    key="form"
                    noValidate
                    onSubmit={handleSubmit}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: EASE_OUT }}
                    className="space-y-4 sm:space-y-6"
                  >
                    {/* Attached Service Banner if clicked from Services */}
                    <AnimatePresence>
                      {reference && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          className="overflow-hidden"
                        >
                          <div className="flex items-center justify-between border border-accent/40 bg-accent/10 px-3.5 py-2.5 text-[12.5px] sm:text-[13px] text-ink">
                            <span className="flex items-center gap-2">
                              <span className="h-1.5 w-1.5 rotate-45 bg-accent shrink-0" />
                              <span className="text-stone">Inquiring for:</span>
                              <span className="font-semibold text-accent truncate max-w-[200px] sm:max-w-none">{reference}</span>
                            </span>
                            <button
                              type="button"
                              onClick={() => setReference(null)}
                              className="text-stone transition-colors hover:text-ink cursor-pointer ml-2"
                              aria-label="Remove reference"
                            >
                              <Close />
                            </button>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Row 1: Name & Phone */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                      <div>
                        <label htmlFor="c-name" className="eyebrow block mb-1 text-[11px] text-slate-700 font-semibold">
                          Full Name <span className="text-accent">*</span>
                        </label>
                        <input
                          id="c-name"
                          type="text"
                          autoComplete="name"
                          value={values.name}
                          onChange={update("name")}
                          placeholder="e.g. John Doe"
                          className={cn(
                            "w-full border bg-slate-50/70 px-3.5 py-3 text-[16px] sm:text-[15px] text-ink placeholder:text-slate-400 transition-colors focus:border-accent focus:bg-white focus:outline-none",
                            errors.name ? "border-accent" : "border-slate-300 hover:border-slate-400"
                          )}
                        />
                        {errors.name && <p className="mt-1 text-[11px] text-accent font-mono">{errors.name}</p>}
                      </div>

                      <div>
                        <label htmlFor="c-phone" className="eyebrow block mb-1 text-[11px] text-slate-700 font-semibold">
                          Phone Number <span className="text-accent">*</span>
                        </label>
                        <input
                          id="c-phone"
                          type="tel"
                          autoComplete="tel"
                          value={values.phone}
                          onChange={update("phone")}
                          placeholder="(201) 000-0000"
                          className={cn(
                            "w-full border bg-slate-50/70 px-3.5 py-3 text-[16px] sm:text-[15px] text-ink placeholder:text-slate-400 transition-colors focus:border-accent focus:bg-white focus:outline-none",
                            errors.phone ? "border-accent" : "border-slate-300 hover:border-slate-400"
                          )}
                        />
                        {errors.phone && <p className="mt-1 text-[11px] text-accent font-mono">{errors.phone}</p>}
                      </div>
                    </div>

                    {/* Row 2: Email & Town/County */}
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5">
                      <div>
                        <label htmlFor="c-email" className="eyebrow block mb-1 text-[11px] text-slate-700 font-semibold">
                          Email Address <span className="text-accent">*</span>
                        </label>
                        <input
                          id="c-email"
                          type="email"
                          autoComplete="email"
                          value={values.email}
                          onChange={update("email")}
                          placeholder="john@example.com"
                          className={cn(
                            "w-full border bg-slate-50/70 px-3.5 py-3 text-[16px] sm:text-[15px] text-ink placeholder:text-slate-400 transition-colors focus:border-accent focus:bg-white focus:outline-none",
                            errors.email ? "border-accent" : "border-slate-300 hover:border-slate-400"
                          )}
                        />
                        {errors.email && <p className="mt-1 text-[11px] text-accent font-mono">{errors.email}</p>}
                      </div>

                      <div>
                        <label htmlFor="c-location" className="eyebrow block mb-1 text-[11px] text-slate-700 font-semibold">
                          Town / County in NJ <span className="text-stone/60 font-normal">(Optional)</span>
                        </label>
                        <input
                          id="c-location"
                          type="text"
                          value={values.location}
                          onChange={update("location")}
                          placeholder="e.g. Paramus, Bergen County"
                          className="w-full border border-slate-300 bg-slate-50/70 px-3.5 py-3 text-[16px] sm:text-[15px] text-ink placeholder:text-slate-400 transition-colors hover:border-slate-400 focus:border-accent focus:bg-white focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Row 3: Custom Architectural Discipline Dropdown */}
                    <div ref={dropdownRef} className="relative w-full">
                      <div className="flex items-center justify-between gap-2 mb-1">
                        <label className="eyebrow block text-[11px] text-slate-700 font-semibold truncate">
                          Project Discipline
                        </label>
                        <span className="eyebrow text-accent text-[9.5px] font-semibold shrink-0">
                          Direct Scope Matching
                        </span>
                      </div>

                      {/* Custom Dropdown Trigger Button */}
                      <button
                        type="button"
                        onClick={() => setDropdownOpen((v) => !v)}
                        aria-expanded={dropdownOpen}
                        className={cn(
                          "group relative flex w-full items-center justify-between border bg-slate-50/70 p-3 text-left transition-all duration-300 min-h-[50px] cursor-pointer overflow-hidden",
                          dropdownOpen
                            ? "border-accent bg-white shadow-md ring-1 ring-accent"
                            : "border-slate-300 hover:border-slate-400"
                        )}
                      >
                        <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1 pr-2">
                          <span className="font-mono text-xs font-bold px-1.5 py-0.5 border border-accent/40 bg-accent/10 text-accent shrink-0">
                            {selectedDisciplineObj.index}
                          </span>
                          <div className="min-w-0 flex-1">
                            <span className="font-display block text-[13.5px] sm:text-[15px] font-semibold text-ink group-hover:text-accent transition-colors leading-tight truncate">
                              {selectedDisciplineObj.title}
                            </span>
                            <span className="block text-[11px] sm:text-[11.5px] text-stone truncate">
                              {selectedDisciplineObj.subtitle}
                            </span>
                          </div>
                        </div>

                        <div className="grid h-7 w-7 shrink-0 place-items-center border border-slate-300 bg-white text-stone transition-all duration-300 group-hover:border-accent group-hover:text-accent ml-1">
                          <ArrowDown
                            className={cn(
                              "text-xs transition-transform duration-300",
                              dropdownOpen && "rotate-180 text-accent"
                            )}
                          />
                        </div>
                      </button>

                      {/* Floating Animated Dropdown Menu Panel */}
                      <AnimatePresence>
                        {dropdownOpen && (
                          <motion.div
                            initial={{ opacity: 0, y: -6, scale: 0.99 }}
                            animate={{ opacity: 1, y: 4, scale: 1 }}
                            exit={{ opacity: 0, y: -6, scale: 0.99 }}
                            transition={{ duration: 0.25, ease: EASE_ARCH }}
                            className="absolute inset-x-0 top-full z-40 max-h-64 sm:max-h-72 overflow-y-auto border border-slate-200 bg-white p-1.5 sm:p-2 shadow-2xl"
                          >
                            <div className="space-y-1">
                              {DISCIPLINES.map((d) => {
                                const isSelected = values.service === d.title;
                                return (
                                  <button
                                    key={d.id}
                                    type="button"
                                    onClick={() => selectDiscipline(d.title)}
                                    className={cn(
                                      "group/item flex w-full items-center justify-between border p-2.5 text-left transition-all duration-200 cursor-pointer",
                                      isSelected
                                        ? "border-accent bg-accent/10 text-ink font-semibold"
                                        : "border-transparent text-slate-700 hover:border-slate-200 hover:bg-slate-50 hover:text-ink"
                                    )}
                                  >
                                    <div className="flex items-center gap-2.5 sm:gap-3 min-w-0 flex-1 pr-2">
                                      <span
                                        className={cn(
                                          "font-mono text-[11px] px-1.5 py-0.5 border shrink-0",
                                          isSelected
                                            ? "border-accent bg-accent text-white font-bold"
                                            : "border-slate-200 bg-slate-100 text-stone"
                                        )}
                                      >
                                        {d.index}
                                      </span>
                                      <div className="min-w-0 flex-1">
                                        <p className={cn("font-display text-[13.5px] sm:text-[14px] truncate", isSelected ? "text-accent font-bold" : "text-ink")}>
                                          {d.title}
                                        </p>
                                        <p className="text-[11px] text-stone truncate">
                                          {d.subtitle}
                                        </p>
                                      </div>
                                    </div>

                                    {isSelected && (
                                      <CheckIcon className="text-accent text-base shrink-0" />
                                    )}
                                  </button>
                                );
                              })}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {/* Row 4: Project Scope Textarea */}
                    <div>
                      <label htmlFor="c-message" className="eyebrow block mb-1 text-[11px] text-slate-700 font-semibold">
                        Project Overview &amp; Requirements <span className="text-accent">*</span>
                      </label>
                      <textarea
                        id="c-message"
                        rows={3}
                        value={values.message}
                        onChange={update("message")}
                        placeholder="Tell us about the property, your timeline, or any specific goals..."
                        className={cn(
                          "w-full resize-none border bg-slate-50/70 p-3 text-[16px] sm:text-[15px] text-ink placeholder:text-slate-400 transition-colors focus:border-accent focus:bg-white focus:outline-none",
                          errors.message ? "border-accent ring-1 ring-accent" : "border-slate-300 hover:border-slate-400"
                        )}
                      />
                      {errors.message && <p className="mt-1 text-[11px] text-accent font-mono">{errors.message}</p>}
                    </div>

                    {/* Submit Action */}
                    <div className="pt-1">
                      <button
                        type="submit"
                        disabled={status === "sending"}
                        className="group relative flex w-full items-center justify-center gap-2.5 sm:gap-3 overflow-hidden bg-accent py-3.5 sm:py-4 px-4 sm:px-6 text-[13.5px] sm:text-[14.5px] font-bold uppercase tracking-wider text-white shadow-md transition-all duration-300 active:scale-[0.99] hover:bg-accent-deep hover:shadow-lg disabled:cursor-wait cursor-pointer text-center"
                      >
                        <span className="absolute inset-0 origin-left scale-x-0 bg-accent-deep transition-transform duration-300 ease-arch group-hover:scale-x-100" />
                        <span className="relative">
                          {status === "sending" ? "Sending Details…" : "Request Free Project Estimate"}
                        </span>
                        <span className="relative">
                          {status === "sending" ? (
                            <span className="block h-4 w-4 animate-spin rounded-full border border-white/30 border-t-white" />
                          ) : (
                            <ArrowRight className="text-base transition-transform duration-300 group-hover:translate-x-1" />
                          )}
                        </span>
                      </button>

                      <div className="mt-3 flex flex-col sm:flex-row items-center justify-between gap-1.5 text-[11.5px] text-stone text-center sm:text-left">
                        <span>🔒 Direct contractor contact. Kept private.</span>
                        <span>⚡ Response within 24 hours</span>
                      </div>
                    </div>
                  </motion.form>
                ) : (
                  /* Confirmation State */
                  <motion.div
                    key="sent"
                    role="status"
                    initial={{ opacity: 0, scale: 0.98 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, ease: EASE_ARCH }}
                    className="py-8 text-center"
                  >
                    <div className="mx-auto grid h-14 w-14 place-items-center border border-accent bg-accent/15 text-accent shadow-md">
                      <CheckIcon className="text-2xl" />
                    </div>

                    <h3 className="font-display mt-5 text-[2rem] sm:text-[2.2rem] leading-tight text-ink md:text-[2.6rem]">
                      Thank You, {values.name.split(" ")[0] || "Friend"}.
                    </h3>

                    <p className="mt-3 text-[14.5px] sm:text-[15px] leading-relaxed text-stone max-w-lg mx-auto">
                      Your project request has been logged directly with our team. We will review the parameters and contact you at <span className="text-accent font-semibold">{values.email}</span> within 24 business hours.
                    </p>

                    <div className="mt-6 max-w-md mx-auto border border-slate-200 bg-slate-50 p-4 text-left text-[13.5px]">
                      <div className="flex justify-between border-b border-slate-200 pb-2">
                        <span className="text-stone">Discipline:</span>
                        <span className="font-semibold text-ink">{values.service}</span>
                      </div>
                      <div className="flex justify-between pt-2">
                        <span className="text-stone">Contact:</span>
                        <span className="font-semibold text-ink">{values.phone}</span>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={handleReset}
                      className="group mt-6 inline-flex items-center gap-2 text-[14px] font-semibold text-accent transition-colors hover:text-accent-deep cursor-pointer"
                    >
                      <span className="u-line">Send another project request</span>
                      <ArrowRight className="transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </FadeUp>
          </div>

          {/* ========================================================
              TRUST BENTO CARDS (Second on mobile, left on desktop)
             ======================================================== */}
          <div className="order-2 lg:order-1 flex flex-col justify-between space-y-4 sm:space-y-5 lg:col-span-5">
            {/* Bento Card 1: Direct Partnership */}
            <FadeUp delay={0.15} className="border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm transition-all hover:border-accent/60 hover:shadow-md">
              <div className="flex items-center gap-3 text-accent mb-2">
                <span className="font-mono text-xs font-bold px-2 py-0.5 border border-accent/30 bg-accent/10">01</span>
                <span className="eyebrow text-ink font-semibold">Single-Source Contractor</span>
              </div>
              <h3 className="font-display text-[1.35rem] sm:text-[1.45rem] leading-snug text-ink">
                Direct Communication &amp; Oversight
              </h3>
              <p className="mt-2 text-[13.5px] sm:text-[14px] leading-relaxed text-stone">
                You work directly with our licensed builders from initial consultation to final punch list. No sales reps, no broker fees, and no middleman friction.
              </p>
            </FadeUp>

            {/* Bento Card 2: NJ Code Compliance */}
            <FadeUp delay={0.2} className="border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm transition-all hover:border-accent/60 hover:shadow-md">
              <div className="flex items-center gap-3 text-accent mb-2">
                <ShieldIcon className="text-lg text-accent" />
                <span className="eyebrow text-ink font-semibold">Licensed &amp; Insured</span>
              </div>
              <h3 className="font-display text-[1.35rem] sm:text-[1.45rem] leading-snug text-ink">
                Rigorous NJ Code Standards
              </h3>
              <p className="mt-2 text-[13.5px] sm:text-[14px] leading-relaxed text-stone">
                Every residential addition, kitchen/bath remodel, roof replacement, and commercial build is constructed strictly to New Jersey municipal building codes.
              </p>
            </FadeUp>

            {/* Bento Card 3: 24h Response Guarantee */}
            <FadeUp delay={0.25} className="border border-slate-200/90 bg-white p-5 sm:p-6 shadow-sm transition-all hover:border-accent/60 hover:shadow-md">
              <div className="flex items-center gap-3 text-accent mb-2">
                <ClockIcon className="text-lg text-accent" />
                <span className="eyebrow text-ink font-semibold">Rapid Turnaround</span>
              </div>
              <h3 className="font-display text-[1.35rem] sm:text-[1.45rem] leading-snug text-ink">
                24-Hour Review &amp; Scheduling
              </h3>
              <p className="mt-2 text-[13.5px] sm:text-[14px] leading-relaxed text-stone">
                Inquiries are reviewed within 1 business day for prompt scope discussions, project feasibility, and on-site walkthrough scheduling.
              </p>
            </FadeUp>

            {/* Location & Entity Footer */}
            <FadeUp delay={0.3} className="border-t border-slate-200 pt-4 flex items-center justify-between">
              <div>
                <p className="font-display text-[15px] sm:text-[15.5px] text-ink font-semibold">Creative Structures NJ LLC</p>
                <p className="text-[12px] text-stone">Serving All 21 Counties in New Jersey</p>
              </div>
              <div className="flex items-center gap-2 text-accent font-mono text-xs font-semibold">
                <MapPinIcon className="text-base" />
                <span>NJ STATEWIDE</span>
              </div>
            </FadeUp>
          </div>
        </div>
      </div>
    </section>
  );
}
