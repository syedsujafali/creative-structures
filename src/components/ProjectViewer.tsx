import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useCallback, useEffect, useRef, useState, type KeyboardEvent } from "react";
import { imgSrc, imgSrcSet, type Project } from "@/data/site";
import { useScrollLock } from "@/lib/smooth";
import { cn } from "@/utils/cn";
import { ArrowLeft, ArrowRight, Close, Mark } from "./Icons";
import { EASE_ARCH, EASE_OUT } from "./motion";

type Props = {
  projects: Project[];
  index: number | null;
  onIndex: (i: number) => void;
  onClose: () => void;
  onEnquire: (p: Project) => void;
};

const pad = (n: number) => String(n).padStart(2, "0");

const slide: Variants = {
  enter: (d: number) => ({
    clipPath: d > 0 ? "inset(0% 0% 0% 100%)" : "inset(0% 100% 0% 0%)",
    x: "0%",
    zIndex: 2,
  }),
  center: { clipPath: "inset(0% 0% 0% 0%)", x: "0%", zIndex: 2 },
  exit: (d: number) => ({
    clipPath: "inset(0% 0% 0% 0%)",
    x: d > 0 ? "-14%" : "14%",
    zIndex: 1,
  }),
};

export function ProjectViewer({ projects, index, onIndex, onClose, onEnquire }: Props) {
  const open = index !== null;
  const project = index !== null ? projects[index] : null;
  const total = projects.length;
  const [dir, setDir] = useState(1);
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);

  useScrollLock(open);

  const go = useCallback(
    (d: number) => {
      if (index === null) return;
      setDir(d);
      onIndex((index + d + total) % total);
    },
    [index, total, onIndex]
  );

  const jump = (i: number) => {
    if (index === null || i === index) return;
    setDir(i > index ? 1 : -1);
    onIndex(i);
  };

  // Keyboard navigation
  useEffect(() => {
    if (!open) return;
    const onKey = (e: globalThis.KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      else if (e.key === "ArrowRight") go(1);
      else if (e.key === "ArrowLeft") go(-1);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, go, onClose]);

  // Focus management: move focus in, restore on close
  useEffect(() => {
    if (!open) return;
    const previous = document.activeElement as HTMLElement | null;
    const t = window.setTimeout(() => closeRef.current?.focus({ preventScroll: true }), 60);
    return () => {
      window.clearTimeout(t);
      previous?.focus?.({ preventScroll: true });
    };
  }, [open]);

  const trapFocus = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key !== "Tab" || !dialogRef.current) return;
    const nodes = dialogRef.current.querySelectorAll<HTMLElement>(
      'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])'
    );
    if (!nodes.length) return;
    const first = nodes[0];
    const last = nodes[nodes.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  return (
    <AnimatePresence>
      {project && index !== null && (
        <motion.div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-labelledby="viewer-title"
          onKeyDown={trapFocus}
          data-lenis-prevent
          className="fixed inset-0 z-[90] flex flex-col overflow-y-auto bg-night text-cream lg:overflow-hidden"
          initial={{ clipPath: "inset(100% 0% 0% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          exit={{ clipPath: "inset(0% 0% 100% 0%)" }}
          transition={{ duration: 0.95, ease: EASE_ARCH }}
        >
          {/* Top bar */}
          <div className="flex h-16 shrink-0 items-center justify-between border-b border-cream/10 px-5 md:px-10 lg:h-20 xl:px-14">
            <div className="flex items-center gap-3">
              <Mark className="h-5 w-5" />
              <span className="eyebrow hidden text-accent-soft sm:inline">Selected work</span>
            </div>
            <div className="eyebrow tabular-nums text-stone">
              <span className="glow text-accent-soft">{pad(index + 1)}</span> / {pad(total)}
            </div>
            <button
              ref={closeRef}
              type="button"
              onClick={onClose}
              className="group flex items-center gap-3"
              aria-label="Close project viewer"
            >
              <span className="eyebrow hidden sm:inline">Close</span>
              <span className="grid h-10 w-10 place-items-center border border-cream/20 transition-colors duration-500 group-hover:border-accent group-hover:bg-accent">
                <Close />
              </span>
            </button>
          </div>

          {/* Body */}
          <div className="grid min-h-0 flex-1 gap-x-8 px-5 py-5 md:px-10 lg:grid-cols-12 lg:py-8 xl:px-14">
            {/* Image stage */}
            <motion.div
              className="relative h-[58svh] min-h-[300px] overflow-hidden bg-ink-2 lg:col-span-8 lg:h-full"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.3 }}
            >
              <AnimatePresence initial={false} custom={dir}>
                <motion.div
                  key={project.id}
                  custom={dir}
                  variants={slide}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ duration: 1.05, ease: EASE_ARCH }}
                  className="absolute inset-0 touch-pan-y"
                  drag="x"
                  dragConstraints={{ left: 0, right: 0 }}
                  dragElastic={0.16}
                  onDragEnd={(_, info) => {
                    if (info.offset.x < -70) go(1);
                    else if (info.offset.x > 70) go(-1);
                  }}
                >
                  <motion.img
                    src={imgSrc(project.image, 1600)}
                    srcSet={imgSrcSet(project.image, [800, 1200, 1600, 2200])}
                    sizes="(min-width: 1024px) 64vw, 100vw"
                    alt={project.image.alt}
                    draggable={false}
                    className="h-full w-full object-cover"
                    style={{ objectPosition: project.image.position }}
                    initial={{ scale: 1.12 }}
                    animate={{ scale: 1 }}
                    transition={{ duration: 1.7, ease: EASE_OUT }}
                  />
                </motion.div>
              </AnimatePresence>

              <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[3] h-28 bg-gradient-to-t from-ink/50 to-transparent" />

              <div className="absolute bottom-4 left-4 z-[4] hidden md:block">
                <span className="eyebrow text-cream/80">Swipe or use ← → to browse</span>
              </div>

              <div className="absolute right-4 bottom-4 z-[4] flex gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous project"
                  className="grid h-12 w-12 place-items-center border border-cream/20 bg-night/60 backdrop-blur-sm transition-colors duration-500 hover:border-accent hover:bg-accent"
                >
                  <ArrowLeft />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next project"
                  className="grid h-12 w-12 place-items-center border border-cream/20 bg-night/60 backdrop-blur-sm transition-colors duration-500 hover:border-accent hover:bg-accent"
                >
                  <ArrowRight />
                </button>
              </div>
            </motion.div>

            {/* Details */}
            <div className="flex min-h-0 flex-col pt-8 pb-6 lg:col-span-4 lg:overflow-y-auto lg:pt-0 lg:pb-0">
              <div className="flex flex-wrap gap-2">
                {project.tags.map((t) => (
                  <span key={t} className="eyebrow border border-accent-soft/40 px-2.5 py-1 text-accent-soft">
                    {t}
                  </span>
                ))}
              </div>

              <div className="mt-6 overflow-hidden pb-[0.1em]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.h2
                    id="viewer-title"
                    key={project.id}
                    className="font-display display-tight text-[2.9rem] leading-[0.95] lg:text-[3.6rem]"
                    initial={{ y: "105%" }}
                    animate={{ y: "0%" }}
                    exit={{ y: "-105%" }}
                    transition={{ duration: 0.55, ease: EASE_OUT }}
                  >
                    {project.title}
                  </motion.h2>
                </AnimatePresence>
              </div>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.45, ease: EASE_OUT }}
                >
                  <p className="mt-6 max-w-[40ch] text-[17px] leading-relaxed text-cream/75">
                    {project.summary}
                  </p>
                  <div className="mt-8">
                    <p className="eyebrow text-accent-soft">Type of work</p>
                    <ul className="mt-3 border-t border-cream/10">
                      {project.scope.map((s, i) => (
                        <li
                          key={s}
                          className="flex items-center justify-between border-b border-cream/10 py-3 text-[15px]"
                        >
                          <span>{s}</span>
                          <span className="eyebrow text-accent-soft">{pad(i + 1)}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </motion.div>
              </AnimatePresence>

              <button
                type="button"
                onClick={() => onEnquire(project)}
                className="group relative mt-8 flex w-full items-center justify-between overflow-hidden bg-accent px-5 py-4 text-left text-[15px]"
              >
                <span className="absolute inset-0 origin-left scale-x-0 bg-accent-deep transition-transform duration-700 ease-arch group-hover:scale-x-100" />
                <span className="relative">Discuss a similar project</span>
                <ArrowRight className="relative transition-transform duration-500 group-hover:translate-x-1" />
              </button>

              <div className="mt-auto pt-10">
                <p className="eyebrow text-accent-soft">More work</p>
                <div className="no-scrollbar mt-3 flex gap-2 overflow-x-auto pb-1">
                  {projects.map((p, i) => (
                    <button
                      key={p.id}
                      type="button"
                      onClick={() => jump(i)}
                      aria-label={`View ${p.title}`}
                      aria-current={i === index ? "true" : undefined}
                      className={cn(
                        "relative h-14 w-20 shrink-0 overflow-hidden transition-opacity duration-500",
                        i === index ? "opacity-100" : "opacity-35 hover:opacity-80"
                      )}
                    >
                      <img
                        src={imgSrc(p.image, 240)}
                        alt=""
                        loading="lazy"
                        className="h-full w-full object-cover"
                      />
                      {i === index && (
                        <motion.span
                          layoutId="thumb-active"
                          className="absolute inset-0 border border-accent-soft"
                          transition={{ duration: 0.5, ease: EASE_OUT }}
                        />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
