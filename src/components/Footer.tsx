import logoColor from "@/assets/logo.png";
import { NAV } from "@/data/site";
import { ArrowUpRight } from "./Icons";
import { FadeUp, FitText, Rule } from "./motion";

export function Footer({ onNavigate }: { onNavigate: (id: string) => void }) {
  const year = new Date().getFullYear();

  return (
    <footer
      id="footer"
      data-theme="dark"
      data-folio=""
      className="relative overflow-hidden bg-night text-cream"
    >
      {/* Red light rising behind the wordmark */}
      <div
        aria-hidden="true"
        className="ember -bottom-[40%] left-1/2 h-[90%] w-[130vw] -translate-x-1/2 lg:w-[100vw]"
      />

      <div className="relative px-5 pt-8 pb-6 md:px-10 xl:px-14">
        <Rule className="bg-cream/15" />
        <div className="grid gap-8 pt-8 md:grid-cols-2 lg:grid-cols-12 lg:gap-x-8">
          <FadeUp className="lg:col-span-5">
            <div className="flex items-center">
              <img
                src={logoColor}
                alt="Creative Structures NJ LLC"
                className="h-10 w-auto object-contain md:h-12 bg-white/95 px-3 py-1.5 rounded-sm shadow-sm"
                draggable={false}
              />
            </div>
            <p className="mt-4 max-w-[42ch] text-[15px] leading-relaxed text-stone">
              Construction and renovation for{" "}
              <span className="text-accent-soft">homeowners and local businesses</span> in New Jersey —
              residential construction, remodeling, additions, roofing, exterior improvements and
              smaller commercial projects.
            </p>
          </FadeUp>

          <FadeUp delay={0.08} className="lg:col-span-3 lg:col-start-7">
            <p className="eyebrow text-accent-soft">Index</p>
            <ul className="mt-4 space-y-2">
              {NAV.map((item) => (
                <li key={item.id}>
                  <a
                    href={`#${item.id}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigate(item.id);
                    }}
                    className="group flex items-baseline gap-3 text-[15px] text-cream/80 transition-colors hover:text-accent-soft"
                  >
                    <span className="eyebrow text-[10px] text-accent-soft">{item.n}</span>
                    <span className="transition-transform duration-500 ease-out-expo group-hover:translate-x-1">
                      {item.label}
                    </span>
                  </a>
                </li>
              ))}
            </ul>
          </FadeUp>

          <FadeUp delay={0.16} className="md:col-span-2 lg:col-span-3 lg:col-start-10">
            <p className="eyebrow text-accent-soft">Start a project</p>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                onNavigate("contact");
              }}
              className="group font-display mt-3 inline-flex items-center gap-3 text-[2rem] leading-none transition-[color,text-shadow] duration-500 hover:text-accent-soft hover:glow"
            >
              Discuss a project
              <ArrowUpRight className="text-[1.5rem] text-accent-soft transition-transform duration-500 group-hover:translate-x-1 group-hover:-translate-y-1" />
            </a>
            <button
              type="button"
              onClick={() => onNavigate("top")}
              className="group eyebrow mt-6 flex items-center gap-2 text-stone transition-colors hover:text-accent-soft"
            >
              Back to top
              <span className="inline-block transition-transform duration-500 group-hover:-translate-y-1">↑</span>
            </button>
          </FadeUp>
        </div>

        <div aria-hidden="true" className="mt-8 lg:mt-10">
          <FitText className="font-display display-tight leading-[0.78] text-cream select-none">
            Creative <span className="glow italic text-accent-soft">Structures</span>
          </FitText>
        </div>

        <div className="mt-4 flex flex-col gap-2 border-t border-cream/15 pt-4 md:flex-row md:items-center md:justify-between">
          <span className="eyebrow text-stone">© {year} Creative Structures NJ LLC</span>
          <span className="eyebrow text-stone">
            Residential &amp; commercial construction · <span className="text-accent-soft">New Jersey</span>
          </span>
        </div>
      </div>
    </footer>
  );
}
