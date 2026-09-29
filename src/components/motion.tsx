import {
  motion,
  useInView,
  useReducedMotion,
  useScroll,
  useTransform,
  type MotionValue,
} from "framer-motion";
import {
  Fragment,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type ReactNode,
  type Ref,
} from "react";
import { cn } from "@/utils/cn";
import { imgSrc, imgSrcSet, type Img } from "@/data/site";

export const EASE_ARCH = [0.77, 0, 0.175, 1] as const;
export const EASE_OUT = [0.16, 1, 0.3, 1] as const;

/* ------------------------------------------------------------------
   RevealWords — each word rises from behind a mask.
   Use "\n" inside text for a line break that only applies on desktop.
------------------------------------------------------------------- */

/** `glow: true` ignites a red glow once the word has landed. */
type WordSegment = { text: string; className?: string; glow?: boolean };

type RevealWordsProps = {
  segments: WordSegment[] | string;
  className?: string;
  delay?: number;
  stagger?: number;
  duration?: number;
  /** When provided, controls playback. Otherwise plays when scrolled into view. */
  play?: boolean;
  amount?: number;
};

export function RevealWords({
  segments,
  className,
  delay = 0,
  stagger = 0.035,
  duration = 0.85,
  play,
  amount = 0.08,
}: RevealWordsProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount, margin: "0px 0px 60px 0px" });
  const reduce = useReducedMotion();
  const active = play ?? inView;
  const segs: WordSegment[] = typeof segments === "string" ? [{ text: segments }] : segments;
  const words = segs.reduce((n, s) => n + s.text.split(/\s+/).filter(Boolean).length, 0);
  const [lit, setLit] = useState(false);

  // Once every word has landed, lift the masks and let any glow ignite.
  useEffect(() => {
    if (!active || lit) return;
    const ms = reduce ? 0 : (delay + Math.max(0, words - 1) * stagger + duration) * 1000;
    const t = window.setTimeout(() => setLit(true), ms);
    return () => window.clearTimeout(t);
  }, [active, lit, reduce, delay, stagger, duration, words]);

  let counter = 0;

  return (
    <span ref={ref} className={className}>
      {segs.map((seg, si) => (
        <Fragment key={si}>
          {seg.text.split(/(\s+)/).map((part, pi) => {
            if (part === "") return null;
            if (/^\s+$/.test(part)) {
              return part.includes("\n") ? (
                <Fragment key={pi}>
                  {" "}
                  <br className="hidden lg:inline" />
                </Fragment>
              ) : (
                <Fragment key={pi}> </Fragment>
              );
            }
            const i = counter++;
            return (
              <span
                key={pi}
                className={cn(
                  "-mx-[0.06em] -mb-[0.16em] inline-block px-[0.06em] pb-[0.16em] align-top",
                  lit ? "overflow-visible" : "overflow-hidden"
                )}
              >
                <motion.span
                  className={cn(
                    "inline-block will-change-transform",
                    seg.className,
                    seg.glow && "transition-[text-shadow] duration-[1800ms] ease-soft",
                    seg.glow && lit && "glow"
                  )}
                  initial={reduce ? false : { y: "118%" }}
                  animate={active ? { y: "0%" } : undefined}
                  transition={{ duration, ease: EASE_OUT, delay: delay + i * stagger }}
                >
                  {part}
                </motion.span>
              </span>
            );
          })}
        </Fragment>
      ))}
    </span>
  );
}

/* ------------------------------------------------------------------
   RevealImage — photograph uncovered by a moving mask, settling from
   a slight scale. Optional scroll parallax and hover zoom (via .group).
------------------------------------------------------------------- */

const CLIP_FROM = {
  bottom: "inset(100% 0% 0% 0%)",
  top: "inset(0% 0% 100% 0%)",
  left: "inset(0% 100% 0% 0%)",
  right: "inset(0% 0% 0% 100%)",
} as const;

type RevealImageProps = {
  img: Img;
  className?: string;
  imgClassName?: string;
  sizes?: string;
  widths?: number[];
  priority?: boolean;
  parallax?: number;
  delay?: number;
  duration?: number;
  from?: keyof typeof CLIP_FROM;
  play?: boolean;
  zoom?: number;
  hover?: boolean;
  onLoad?: () => void;
  imgRef?: Ref<HTMLImageElement>;
  children?: ReactNode;
};

export function RevealImage({
  img,
  className,
  imgClassName,
  sizes = "100vw",
  widths,
  priority,
  parallax = 0,
  delay = 0,
  duration = 1.15,
  from = "bottom",
  play,
  zoom = 1.14,
  hover,
  onLoad,
  imgRef,
  children,
}: RevealImageProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "0px 0px 80px 0px" });
  const reduce = useReducedMotion();
  const active = play ?? inView;

  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const travel = parallax / (1 + (2 * parallax) / 100);
  const y = useTransform(scrollYProgress, [0, 1], [`-${travel}%`, `${travel}%`]);

  return (
    <div ref={ref} className={cn("relative overflow-hidden", className)}>
      <motion.div
        className="absolute inset-0 overflow-hidden"
        initial={reduce ? false : { clipPath: CLIP_FROM[from] }}
        animate={active ? { clipPath: "inset(0% 0% 0% 0%)" } : undefined}
        transition={{ duration, ease: EASE_ARCH, delay }}
      >
        <motion.div
          className="absolute inset-x-0"
          style={{
            top: `-${parallax}%`,
            bottom: `-${parallax}%`,
            y: parallax && !reduce ? y : 0,
          }}
        >
          <div
            className={cn(
              "h-full w-full",
              hover && "transition-[scale] duration-[1400ms] ease-out-expo group-hover:scale-[1.045]"
            )}
          >
            <motion.img
              ref={imgRef}
              src={imgSrc(img, 1600)}
              srcSet={imgSrcSet(img, widths)}
              sizes={sizes}
              alt={img.alt}
              loading={priority ? "eager" : "lazy"}
              decoding="async"
              fetchPriority={priority ? "high" : "auto"}
              draggable={false}
              onLoad={onLoad}
              className={cn("h-full w-full object-cover", imgClassName)}
              style={{ objectPosition: img.position }}
              initial={reduce ? false : { scale: zoom }}
              animate={active ? { scale: 1 } : undefined}
              transition={{ duration: duration + 0.5, ease: EASE_OUT, delay }}
            />
          </div>
        </motion.div>
      </motion.div>
      {children}
    </div>
  );
}

/* ------------------------------------------------------------------
   FadeUp — quiet entrance for supporting copy and controls.
------------------------------------------------------------------- */

export function FadeUp({
  children,
  className,
  delay = 0,
  y = 16,
  play,
  amount = 0.05,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  play?: boolean;
  amount?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount, margin: "0px 0px 70px 0px" });
  const reduce = useReducedMotion();
  const active = play ?? inView;
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      animate={active ? { opacity: 1, y: 0 } : undefined}
      transition={{ duration: 0.8, ease: EASE_OUT, delay }}
    >
      {children}
    </motion.div>
  );
}

/* ------------------------------------------------------------------
   Rule — a fine dividing line that draws itself in.
------------------------------------------------------------------- */

export function Rule({
  className,
  delay = 0,
  play,
  origin = "left",
}: {
  className?: string;
  delay?: number;
  play?: boolean;
  origin?: "left" | "right" | "center";
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.05, margin: "0px 0px 60px 0px" });
  const reduce = useReducedMotion();
  const active = play ?? inView;
  const o = origin === "left" ? "0% 50%" : origin === "right" ? "100% 50%" : "50% 50%";
  return (
    <motion.div
      ref={ref}
      aria-hidden="true"
      className={cn("h-px w-full bg-current/20", className)}
      style={{ transformOrigin: o }}
      initial={reduce ? false : { scaleX: 0 }}
      animate={active ? { scaleX: 1 } : undefined}
      transition={{ duration: 1.0, ease: EASE_ARCH, delay }}
    />
  );
}

/* ------------------------------------------------------------------
   ScrollWords — words (and small inline photographs) come into full
   tone as the reader scrolls through the passage.
------------------------------------------------------------------- */

export type ScrollSegment = { text: string; className?: string } | { img: Img; className?: string };

type Token =
  | { kind: "space" }
  | { kind: "word"; text: string; className?: string }
  | { kind: "img"; img: Img; className?: string };

export function ScrollWords({
  segments,
  className,
}: {
  segments: ScrollSegment[];
  className?: string;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 0.88", "end 0.5"] });

  const tokens: Token[] = [];
  segments.forEach((seg) => {
    if ("img" in seg) {
      tokens.push({ kind: "space" }, { kind: "img", img: seg.img, className: seg.className }, { kind: "space" });
      return;
    }
    seg.text.split(/(\s+)/).forEach((p) => {
      if (!p) return;
      if (/^\s+$/.test(p)) tokens.push({ kind: "space" });
      else tokens.push({ kind: "word", text: p, className: seg.className });
    });
  });

  const count = tokens.filter((t) => t.kind !== "space").length;
  let n = 0;

  return (
    <p ref={ref} className={className}>
      {tokens.map((t, i) => {
        if (t.kind === "space") return <Fragment key={i}> </Fragment>;
        const idx = n++;
        const start = idx / count;
        const end = Math.min(1, start + 2 / count);
        return t.kind === "word" ? (
          <ScrollWord key={i} progress={scrollYProgress} range={[start, end]} className={t.className} still={!!reduce}>
            {t.text}
          </ScrollWord>
        ) : (
          <ScrollInlineImage key={i} progress={scrollYProgress} range={[start, end]} img={t.img} className={t.className} still={!!reduce} />
        );
      })}
    </p>
  );
}

function ScrollWord({
  progress,
  range,
  children,
  className,
  still,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  children: ReactNode;
  className?: string;
  still: boolean;
}) {
  const opacity = useTransform(progress, range, [0.14, 1]);
  return (
    <motion.span className={className} style={{ opacity: still ? 1 : opacity }}>
      {children}
    </motion.span>
  );
}

function ScrollInlineImage({
  progress,
  range,
  img,
  className,
  still,
}: {
  progress: MotionValue<number>;
  range: [number, number];
  img: Img;
  className?: string;
  still: boolean;
}) {
  const clip = useTransform(progress, range, ["inset(0% 50% 0% 50%)", "inset(0% 0% 0% 0%)"]);
  return (
    <span
      aria-hidden="true"
      className={cn(
        "relative inline-block h-[0.78em] w-[1.45em] -translate-y-[0.08em] overflow-hidden align-middle",
        className
      )}
    >
      <motion.img
        src={imgSrc(img, 480)}
        alt=""
        loading="lazy"
        decoding="async"
        draggable={false}
        style={{ clipPath: still ? undefined : clip }}
        className="absolute inset-0 h-full w-full object-cover"
      />
    </span>
  );
}

/* ------------------------------------------------------------------
   FitText — scales a single line of type to the container width.
------------------------------------------------------------------- */

export function FitText({ children, className }: { children: ReactNode; className?: string }) {
  const wrap = useRef<HTMLDivElement>(null);
  const text = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const el = text.current;
    const box = wrap.current;
    if (!el || !box) return;
    const fit = () => {
      el.style.fontSize = "100px";
      const w = el.getBoundingClientRect().width;
      if (!w) return;
      el.style.fontSize = `${(box.clientWidth / w) * 100 * 0.995}px`;
    };
    fit();
    const ro = new ResizeObserver(fit);
    ro.observe(box);
    document.fonts?.ready.then(fit).catch(() => undefined);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={wrap} className={cn("w-full", className)}>
      <span ref={text} className="inline-block whitespace-nowrap">
        {children}
      </span>
    </div>
  );
}

/* ------------------------------------------------------------------
   SectionLabel — Prominent, bold architectural section identifier badge
------------------------------------------------------------------- */

export function SectionLabel({
  n,
  label,
  className,
}: {
  n?: string;
  label: string;
  /** Kept for compatibility */
  tone?: "light" | "dark";
  className?: string;
}) {
  return (
    <FadeUp className={cn("inline-flex items-center", className)} y={8}>
      <div className="inline-flex items-center gap-2.5 border-2 border-accent/50 bg-accent/[0.12] px-4 py-1.5 shadow-sm backdrop-blur-md transition-all">
        <span className="h-2 w-2 rotate-45 bg-accent shadow-[0_0_8px_rgba(214,40,46,0.8)]" />
        {n && (
          <>
            <span className="font-mono text-[13px] sm:text-[14px] font-bold text-accent tracking-wider">
              {n}
            </span>
            <span className="h-4 w-px bg-accent/40" />
          </>
        )}
        <span className="font-mono text-[13px] sm:text-[14px] font-bold uppercase tracking-[0.2em] text-accent">
          {label}
        </span>
      </div>
    </FadeUp>
  );
}

