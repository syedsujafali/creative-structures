import { AnimatePresence, motion, useMotionValueEvent, useScroll, type Variants } from "framer-motion";
import { useState } from "react";
import { NAV } from "@/data/site";
import { useScrollLock } from "@/lib/smooth";
import { useDataAt } from "@/lib/useDataAt";
import { cn } from "@/utils/cn";
import logoColor from "@/assets/logo.png";
import logoLight from "@/assets/logo-light.png";
import { ArrowRight, ArrowUpRight } from "./Icons";
import { EASE_ARCH, EASE_OUT } from "./motion";

type Props = {
  ready: boolean;
  onNavigate: (id: string) => void;
};

const menuContainerVariants: Variants = {
  closed: {
    opacity: 0,
    y: -14,
    transition: {
      duration: 0.22,
      ease: EASE_ARCH,
    },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.32,
      ease: EASE_OUT,
      staggerChildren: 0.035,
      delayChildren: 0.05,
    },
  },
};

const menuItemVariants: Variants = {
  closed: {
    opacity: 0,
    y: 10,
    transition: { duration: 0.15 },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.28,
      ease: EASE_OUT,
    },
  },
};

export function Header({ ready, onNavigate }: Props) {
  const folio = useDataAt("folio", (vh) => vh * 0.42, "");
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useScrollLock(menuOpen);

  useMotionValueEvent(scrollY, "change", (y) => {
    setScrolled(y > 20);
  });

  const activeN = folio ? folio.split("|")[0] : scrolled ? "" : "00";

  const go = (id: string) => {
    setMenuOpen(false);
    setTimeout(() => {
      onNavigate(id);
    }, 40);
  };

  return (
    <>
      <motion.header
        className="fixed inset-x-0 top-0 z-[80]"
        initial={{ y: "-100%" }}
        animate={ready ? { y: "0%" } : { y: "-100%" }}
        transition={{ duration: 0.7, ease: EASE_ARCH, delay: ready && !scrolled ? 0.3 : 0 }}
      >
        <div
          className={cn(
            "border-b transition-[background-color,border-color,box-shadow] duration-300",
            menuOpen
              ? "border-white/10 bg-[#0a1b30] text-white shadow-xl"
              : scrolled
              ? "border-slate-200/90 bg-white/92 text-ink shadow-[0_4px_20px_rgba(0,0,0,0.06)] backdrop-blur-md"
              : "border-transparent bg-white/40 text-ink backdrop-blur-[2px]"
          )}
        >
          <div className="flex h-16 items-center justify-between px-4 sm:px-6 md:px-10 lg:h-[76px] xl:px-14">
            <a
              href="#top"
              onClick={(e) => {
                e.preventDefault();
                go("top");
              }}
              className="group relative z-50 flex items-center transition-transform duration-300 ease-out-expo hover:opacity-90"
              aria-label="Creative Structures NJ LLC, back to top"
            >
              <div className="relative h-8 w-36 md:h-[38px] md:w-44">
                <img
                  src={logoColor}
                  alt="Creative Structures NJ LLC"
                  className={cn(
                    "absolute inset-0 h-full w-auto object-contain transition-opacity duration-300",
                    menuOpen ? "opacity-0 pointer-events-none" : "opacity-100"
                  )}
                  draggable={false}
                />
                <img
                  src={logoLight}
                  alt="Creative Structures NJ LLC"
                  className={cn(
                    "absolute inset-0 h-full w-auto object-contain transition-opacity duration-300",
                    menuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
                  )}
                  draggable={false}
                />
              </div>
            </a>

            {/* Desktop Navigation Links */}
            <nav aria-label="Primary" className="hidden items-center gap-9 lg:flex xl:gap-12">
              {NAV.map((item) => {
                const active = activeN === item.n;
                return (
                  <a
                    key={item.id}
                    href={item.id === "top" ? "#top" : `#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      go(item.id);
                    }}
                    className={cn(
                      "group relative py-2 text-[14.5px] font-semibold tracking-wide transition-colors duration-300",
                      active ? "text-accent" : "text-ink hover:text-accent"
                    )}
                    aria-current={active ? "true" : undefined}
                  >
                    <span>{item.label}</span>
                    {/* Modern Expanding Red Underline Animation */}
                    <span
                      className={cn(
                        "absolute inset-x-0 bottom-0 h-[2px] bg-accent transition-transform duration-300 ease-out origin-left",
                        active ? "scale-x-100 shadow-[0_0_8px_rgba(214,40,46,0.6)]" : "scale-x-0 group-hover:scale-x-100"
                      )}
                    />
                  </a>
                );
              })}
            </nav>

            <div className="flex items-center gap-3">
              <a
                href="#contact"
                onClick={(e) => {
                  e.preventDefault();
                  go("contact");
                }}
                className="group relative hidden items-center gap-3 overflow-hidden border border-accent bg-accent px-5 py-2.5 text-[13.5px] font-semibold text-white shadow-sm transition-all duration-300 hover:bg-accent-deep hover:shadow-md lg:inline-flex"
              >
                <span className="absolute inset-0 origin-bottom scale-y-0 bg-accent-deep transition-transform duration-500 ease-arch group-hover:scale-y-100" />
                <span className="relative">Discuss a project</span>
                <ArrowUpRight className="relative text-[15px] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>

              {/* Mobile Animated Hamburger Button */}
              <button
                type="button"
                onClick={() => setMenuOpen((v) => !v)}
                aria-expanded={menuOpen}
                aria-controls="mobile-menu"
                className={cn(
                  "relative z-50 flex items-center gap-2.5 py-2 px-2.5 min-h-[44px] min-w-[44px] rounded-sm transition-all duration-300 lg:hidden cursor-pointer",
                  menuOpen ? "text-white bg-white/10" : "text-ink hover:bg-slate-100"
                )}
                aria-label={menuOpen ? "Close menu" : "Open menu"}
              >
                <span className={cn("eyebrow text-[11px] font-bold tracking-wider", menuOpen ? "text-accent" : "text-ink")}>
                  {menuOpen ? "Close" : "Menu"}
                </span>
                <span className="relative block h-3.5 w-5" aria-hidden="true">
                  <span
                    className={cn(
                      "absolute left-0 h-[2px] w-full transition-all duration-300 ease-out",
                      menuOpen
                        ? "top-1/2 -translate-y-1/2 rotate-45 bg-accent"
                        : "top-0 bg-current"
                    )}
                  />
                  <span
                    className={cn(
                      "absolute left-0 top-1/2 -translate-y-1/2 h-[2px] w-full transition-all duration-300 ease-out",
                      menuOpen ? "opacity-0 scale-x-0" : "opacity-100 scale-x-100 bg-current"
                    )}
                  />
                  <span
                    className={cn(
                      "absolute left-0 h-[2px] transition-all duration-300 ease-out",
                      menuOpen
                        ? "top-1/2 -translate-y-1/2 w-full -rotate-45 bg-accent"
                        : "bottom-0 w-3/4 bg-current"
                    )}
                  />
                </span>
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      {/* Silky-Smooth Animated Mobile Menu Modal */}
      <AnimatePresence>
        {menuOpen && <MobileMenu onGo={go} activeN={activeN} />}
      </AnimatePresence>
    </>
  );
}

function MobileMenu({ onGo, activeN }: { onGo: (id: string) => void; activeN: string }) {
  return (
    <motion.div
      id="mobile-menu"
      className="fixed inset-0 z-[70] flex flex-col bg-[#0a1b30] text-white lg:hidden overflow-hidden pt-16"
      variants={menuContainerVariants}
      initial="closed"
      animate="open"
      exit="closed"
    >
      {/* Soft Ambient Red & Blue Glows in Background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-10 -left-10 h-72 w-72 rounded-full bg-accent/20 blur-[80px]"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-10 -right-10 h-72 w-72 rounded-full bg-[#13396b]/40 blur-[80px]"
      />

      <div className="relative flex h-full flex-col justify-between overflow-y-auto px-5 py-6 pb-[max(1.5rem,env(safe-area-inset-bottom))] sm:px-8">
        <div>
          {/* Header Label */}
          <div className="flex items-center justify-between border-b border-white/10 pb-3">
            <span className="eyebrow text-accent font-bold tracking-widest text-[10px]">
              Navigation
            </span>
            <span className="eyebrow text-slate-400 text-[10px]">
              NJ Statewide
            </span>
          </div>

          {/* Navigation Links */}
          <ul className="mt-2 divide-y divide-white/10">
            {NAV.map((item) => {
              const active = activeN === item.n;
              return (
                <motion.li key={item.id} variants={menuItemVariants}>
                  <a
                    href={item.id === "top" ? "#top" : `#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onGo(item.id);
                    }}
                    className={cn(
                      "group flex w-full items-center justify-between py-3.5 text-left transition-colors duration-200 cursor-pointer",
                      active ? "text-accent" : "text-white/90 hover:text-white"
                    )}
                  >
                    <div className="flex items-center gap-3.5">
                      <span
                        className={cn(
                          "font-mono text-xs font-bold px-1.5 py-0.5 border transition-colors",
                          active
                            ? "border-accent bg-accent text-white"
                            : "border-white/20 text-accent bg-white/5 group-hover:border-accent"
                        )}
                      >
                        {item.n}
                      </span>
                      <span className="font-display text-[1.65rem] xs:text-[1.85rem] font-semibold leading-none tracking-tight group-hover:translate-x-1 transition-transform">
                        {item.label}
                      </span>
                    </div>

                    <span
                      className={cn(
                        "h-2 w-2 rotate-45 transition-all duration-300",
                        active ? "bg-accent scale-125 shadow-[0_0_8px_#d6282e]" : "bg-white/30 group-hover:bg-accent group-hover:scale-110"
                      )}
                    />
                  </a>
                </motion.li>
              );
            })}
          </ul>
        </div>

        {/* Bottom CTA Block */}
        <motion.div
          variants={menuItemVariants}
          className="mt-6 border-t border-white/10 pt-5 space-y-3"
        >
          <p className="text-[13px] leading-relaxed text-slate-300">
            Licensed New Jersey construction &amp; renovation contractor.
          </p>

          <a
            href="#contact"
            onClick={(e) => {
              e.preventDefault();
              onGo("contact");
            }}
            className="flex w-full items-center justify-between bg-accent px-5 py-3.5 text-[14px] font-bold uppercase tracking-wider text-white shadow-lg transition-transform active:scale-[0.99] hover:bg-accent-deep cursor-pointer"
          >
            <span>Request Project Estimate</span>
            <ArrowRight className="text-base" />
          </a>

          <div className="flex items-center justify-between text-[11px] font-mono text-slate-400 pt-1">
            <span>Direct Builder Oversight</span>
            <span className="text-accent">● 24h Response</span>
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

