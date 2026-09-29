import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { useEffect, useState } from "react";
import { useDataAt } from "@/lib/useDataAt";
import { cn } from "@/utils/cn";
import { ArrowRight } from "./Icons";
import { EASE_OUT } from "./motion";

/** A thin, glowing red reading line along the top edge of the viewport. */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  return (
    <motion.div
      aria-hidden="true"
      className="glow-line pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-accent-soft"
      style={{ scaleX }}
    />
  );
}

/** Running folio on the left margin — like a magazine page marker. */
export function Folio() {
  const folio = useDataAt("folio", (vh) => vh * 0.5, "");
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 140, damping: 30, mass: 0.4 });
  const [n, label] = (folio ?? "").split("|");
  const visible = Boolean(folio);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none fixed bottom-8 left-[18px] z-40 hidden flex-col items-center gap-4 text-cream transition-opacity duration-700 xl:flex",
        visible ? "opacity-100" : "opacity-0"
      )}
    >
      <div className="relative h-44 w-4 overflow-hidden">
        <AnimatePresence initial={false}>
          <motion.div
            key={folio ?? "none"}
            className="absolute inset-0 flex items-end justify-center"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.6, ease: EASE_OUT }}
          >
            <span className="eyebrow vertical-text whitespace-nowrap">
              <span className="text-accent-soft">{n}</span>
              <span className="opacity-40"> — </span>
              <span className="opacity-70">{label}</span>
            </span>
          </motion.div>
        </AnimatePresence>
      </div>
      <div className="relative h-16 w-px bg-cream/15">
        <motion.div
          className="glow-line absolute inset-0 origin-top bg-accent-soft"
          style={{ scaleY: progress }}
        />
      </div>
    </div>
  );
}

/** Mobile-only contact bar — appears after the cover, retreats near the form. */
export function MobileCTA({ onClick }: { onClick: () => void }) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const ids = ["top", "contact", "footer"];
    const visible = new Set<string>();
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) visible.add(e.target.id);
          else visible.delete(e.target.id);
        });
        setShow(visible.size === 0);
      },
      { threshold: 0, rootMargin: "0px 0px -15% 0px" }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-x-3 bottom-[max(0.75rem,env(safe-area-inset-bottom))] z-30 lg:hidden"
          initial={{ y: "140%" }}
          animate={{ y: "0%" }}
          exit={{ y: "140%" }}
          transition={{ duration: 0.5, ease: EASE_OUT }}
        >
          <button
            type="button"
            onClick={onClick}
            className="glow-box flex w-full items-center justify-between bg-accent px-5 py-4 text-[15px] text-cream"
          >
            <span className="flex items-center gap-3">
              <span className="breathe h-[5px] w-[5px] rotate-45 bg-cream" />
              Discuss a project
            </span>
            <ArrowRight className="text-lg" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
