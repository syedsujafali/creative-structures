import { IMG, PRINCIPLES } from "@/data/site";
import { FadeUp, RevealImage, RevealWords, Rule, SectionLabel } from "./motion";

export function Approach() {
  return (
    <section
      id="approach"
      data-theme="dark"
      data-folio="03|Approach"
      aria-labelledby="approach-title"
      className="grain overflow-x-clip bg-ink-2 text-cream"
    >
      <div className="px-5 pt-28 pb-28 md:px-10 lg:pt-44 lg:pb-40 xl:px-14">
        <div className="grid lg:grid-cols-12 lg:gap-x-8">
          {/* Photographs */}
          <div className="relative mr-10 md:mr-40 lg:col-span-5 lg:mr-0">
            <RevealImage
              img={IMG.approachMain}
              className="aspect-[4/5] lg:aspect-[3/4]"
              sizes="(min-width: 1024px) 40vw, 85vw"
              parallax={8}
            />
            <div className="absolute -right-10 -bottom-16 w-[52%] bg-ink-2 p-[6px] md:-right-24 lg:-right-28 lg:-bottom-20 lg:w-[54%]">
              <RevealImage
                img={IMG.approachDetail}
                className="aspect-[4/3]"
                sizes="(min-width: 1024px) 22vw, 45vw"
                delay={0.25}
                from="left"
              />
            </div>
            <FadeUp className="mt-5">
              <p className="eyebrow text-stone">
                <span className="text-accent-soft">Fig. 04</span> — Measure, then build
              </p>
            </FadeUp>
          </div>

          {/* Copy */}
          <div className="mt-32 lg:col-span-6 lg:col-start-7 lg:mt-0 lg:pt-24">
            <SectionLabel n="03" label="Approach" />
            <h2
              id="approach-title"
              className="font-display display-tight mt-8 text-[11.5vw] leading-[0.98] md:text-[7.4vw] lg:text-[4.7vw] 2xl:text-[5.4rem]"
            >
              <RevealWords segments="Straightforward to work with." className="block" />
              <RevealWords
                segments={[{ text: "Particular about the work.", className: "italic text-accent-soft" }]}
                className="block"
                delay={0.25}
              />
            </h2>
            <FadeUp delay={0.1} className="mt-10 max-w-[46ch] space-y-5">
              <p className="text-[17px] leading-relaxed text-cream/70 lg:text-[18px]">
                Every project starts with a property and an owner who needs the work done well. We
                keep the process direct and the communication clear, and we treat the details — the
                trim lines, the transitions, the finishes — as part of the job rather than an
                afterthought.
              </p>
              <p className="text-[17px] leading-relaxed text-cream/70 lg:text-[18px]">
                Whether it&apos;s a family home, a rental property or a storefront, the approach is
                the same.
              </p>
            </FadeUp>
          </div>
        </div>

        {/* Principles */}
        <div className="mt-32 lg:mt-48">
          <div className="mb-5 flex items-center gap-4 text-stone">
            <span className="h-3 w-px bg-cream/30" />
            <Rule className="bg-cream/15" />
            <span className="eyebrow shrink-0 text-accent-soft">Four working principles</span>
            <Rule className="bg-cream/15" origin="right" />
            <span className="h-3 w-px bg-cream/30" />
          </div>
          <ol className="grid border-t border-cream/15 md:grid-cols-2 lg:grid-cols-4">
            {PRINCIPLES.map((p, i) => (
              <li
                key={p.n}
                className="group border-b border-cream/15 py-9 md:odd:pr-8 md:even:border-l md:even:pl-8 lg:border-b-0 lg:border-l lg:px-8 lg:first:border-l-0 lg:first:pl-0 lg:odd:pr-8"
              >
                <FadeUp delay={i * 0.1}>
                  <span className="font-display block text-[5.5rem] leading-[0.8] text-accent-soft/30 transition-[color,text-shadow] duration-700 group-hover:text-accent-soft group-hover:glow lg:text-[7.5rem]">
                    {p.n}
                  </span>
                  <h3 className="font-display mt-8 text-[2rem] leading-none lg:mt-10">{p.title}</h3>
                  <p className="mt-4 max-w-[30ch] text-[16px] leading-relaxed text-stone">{p.body}</p>
                </FadeUp>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
