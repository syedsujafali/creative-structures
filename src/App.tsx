import { MotionConfig } from "framer-motion";
import { useCallback, useEffect, useState } from "react";
// import { Band } from "@/components/Band";
import { Contact, type Prefill } from "@/components/Contact";
import { Folio, MobileCTA, ScrollProgress } from "@/components/Folio";
import { Footer } from "@/components/Footer";
import { Gallery } from "@/components/Gallery";
import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { Preloader } from "@/components/Preloader";
import { Process } from "@/components/Process";
import { Reviews } from "@/components/Reviews";
import { ServicesSection } from "@/components/ServicesSection";
import { Statement } from "@/components/Statement";
import type { Service } from "@/data/site";
import { SmoothScroll, useScrollLock, useScrollTo } from "@/lib/smooth";

export default function App() {
  return (
    <MotionConfig reducedMotion="user">
      <SmoothScroll>
        <Site />
      </SmoothScroll>
    </MotionConfig>
  );
}

function Site() {
  const scrollTo = useScrollTo();
  const [heroLoaded, setHeroLoaded] = useState(false);
  const [fontsLoaded, setFontsLoaded] = useState(false);
  const [ready, setReady] = useState(false);
  const [prefill, setPrefill] = useState<Prefill | null>(null);

  // Hold the page still while the entry sequence plays.
  useScrollLock(!ready);

  useEffect(() => {
    let alive = true;
    const done = () => alive && setFontsLoaded(true);
    if (document.fonts?.ready) document.fonts.ready.then(done).catch(done);
    else done();
    // Never keep a visitor waiting on a slow network.
    const safety = window.setTimeout(() => {
      setHeroLoaded(true);
      setFontsLoaded(true);
    }, 3400);
    return () => {
      alive = false;
      window.clearTimeout(safety);
    };
  }, []);

  const onHeroLoad = useCallback(() => setHeroLoaded(true), []);
  const onReady = useCallback(() => setReady(true), []);

  const navigate = useCallback(
    (id: string) => {
      if (id === "top") scrollTo(0);
      else scrollTo(`#${id}`);
    },
    [scrollTo]
  );

  const enquireService = useCallback(
    (s: Service) => {
      setPrefill({
        propertyType: s.category === "Commercial" ? "Retail space" : s.propertyType,
        reference: `${s.name} — ${s.short}`,
        nonce: Date.now(),
      });
      scrollTo("#contact");
    },
    [scrollTo]
  );

  return (
    <>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-[120] focus:bg-accent focus:px-4 focus:py-2 focus:text-cream"
      >
        Skip to content
      </a>

      <Preloader canFinish={heroLoaded && fontsLoaded} onFinish={onReady} />
      <Header ready={ready} onNavigate={navigate} />
      <Folio />
      <ScrollProgress />

      {/* Full-site Architectural Grid with Left-Red and Right-Blue Ambient Wash (Fixed GPU Layer) */}
      <div aria-hidden="true" className="site-gradient-mesh" />

      <main id="main" className="relative z-10 overflow-x-clip bg-transparent">
        <Hero ready={ready} onImageLoad={onHeroLoad} onNavigate={navigate} />
        {/*<Band />*/}
        <Statement />
        <ServicesSection onEnquire={enquireService} />
        <Process />
        <Gallery />
        <Reviews />
        <Contact prefill={prefill} />
      </main>

      <Footer onNavigate={navigate} />
      <MobileCTA onClick={() => navigate("contact")} />
    </>
  );
}
