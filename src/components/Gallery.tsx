import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import { imgSrc, imgSrcSet, type Img } from "@/data/site";
import { ArrowLeft, ArrowRight, Close, ExpandIcon } from "./Icons";
import { EASE_ARCH, FadeUp, RevealWords, SectionLabel } from "./motion";

export type GalleryImage = {
  id: string;
  index: string;
  title: string;
  category: string;
  location: string;
  image: Img;
};

export const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: "g-12",
    index: "12",
    title: "Contemporary Commercial Workspace",
    category: "Commercial",
    location: "Mercer County, NJ",
    image: {
      id: 7534213,
      alt: "Contemporary commercial meeting room with wooden table and chairs",
      orientation: "landscape",
    },
  },
  {
    id: "g-11",
    index: "11",
    title: "Exterior Siding, Windows & Trim",
    category: "Exterior",
    location: "Hunterdon County, NJ",
    image: {
      id: 18894951,
      alt: "Lattice window set into gray clapboard siding with planter below",
      orientation: "portrait",
    },
  },
  {
    id: "g-10",
    index: "10",
    title: "New Shingle Roof Installation & Ridges",
    category: "Roofing",
    location: "Ocean County, NJ",
    image: {
      id: 31771166,
      alt: "Roofer installing shingles on a new residential roof under cloudy sky",
      orientation: "portrait",
    },
  },
  {
    id: "g-9",
    index: "09",
    title: "Commercial Storefront & Glass Glazing",
    category: "Commercial",
    location: "Passaic County, NJ",
    image: {
      id: 12730623,
      alt: "Urban retail storefront with large glass windows and entrance",
      orientation: "landscape",
    },
  },
  {
    id: "g-8",
    index: "08",
    title: "Two-Story Rear Addition & Covered Terrace",
    category: "Additions",
    location: "Middlesex County, NJ",
    image: {
      id: 7061662,
      alt: "Suburban house with two story rear addition and covered terrace",
      orientation: "landscape",
    },
  },
  {
    id: "g-7",
    index: "07",
    title: "Modern Boutique Café & Retail Buildout",
    category: "Commercial",
    location: "Hudson County, NJ",
    image: {
      id: 14110982,
      alt: "Minimal café interior with wooden service counter and pendant lights",
      orientation: "portrait",
    },
  },
  {
    id: "g-6",
    index: "06",
    title: "Covered Portico & Clapboard Siding",
    category: "Exterior",
    location: "Union County, NJ",
    image: {
      id: 18326826,
      alt: "Classic front porch and portico with picket fence and clapboard siding",
      orientation: "landscape",
    },
  },
  {
    id: "g-5",
    index: "05",
    title: "Architectural Shingle Roofing & Flashing",
    category: "Roofing",
    location: "Monmouth County, NJ",
    image: {
      id: 33404248,
      alt: "Professional roofer installing architectural shingles on residential roof",
      orientation: "landscape",
      position: "50% 40%",
    },
  },
  {
    id: "g-4",
    index: "04",
    title: "Sunlit Architectural Sunroom Addition",
    category: "Additions",
    location: "Somerset County, NJ",
    image: {
      id: 36777961,
      alt: "Sunroom addition with expansive windows overlooking garden",
      orientation: "landscape",
    },
  },
  {
    id: "g-3",
    index: "03",
    title: "Spa Master Bath & Dual Vanity Suite",
    category: "Remodeling",
    location: "Essex County, NJ",
    image: {
      id: 11701111,
      alt: "Bathroom renovation with blue double vanity and marble walls",
      orientation: "portrait",
    },
  },
  {
    id: "g-2",
    index: "02",
    title: "Luxury Chef's Kitchen & Marble Island",
    category: "Remodeling",
    location: "Morris County, NJ",
    image: {
      id: 37153451,
      alt: "Bright luxury kitchen remodel with waterfall marble island and wood cabinetry",
      orientation: "landscape",
    },
  },
  {
    id: "g-1",
    index: "01",
    title: "Ground-Up Custom Home Construction",
    category: "Residential",
    location: "Bergen County, NJ",
    image: {
      id: 36777845,
      alt: "Modern two-story custom home with garage and manicured driveway",
      orientation: "landscape",
    },
  },
];

export function Gallery() {
  const [selectedImage, setSelectedImage] = useState<GalleryImage | null>(null);

  const selectedIndex = selectedImage
    ? GALLERY_IMAGES.findIndex((item) => item.id === selectedImage.id)
    : -1;

  const navigateModal = (direction: "prev" | "next") => {
    if (selectedIndex === -1) return;
    const nextIndex =
      direction === "next"
        ? (selectedIndex + 1) % GALLERY_IMAGES.length
        : (selectedIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length;
    setSelectedImage(GALLERY_IMAGES[nextIndex]);
  };

  // Keyboard navigation for lightbox
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedImage) return;
      if (e.key === "Escape") setSelectedImage(null);
      if (e.key === "ArrowRight") navigateModal("next");
      if (e.key === "ArrowLeft") navigateModal("prev");
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedImage, selectedIndex]);

  return (
    <section
      id="gallery"
      data-theme="light"
      data-folio="03|Gallery"
      aria-labelledby="gallery-title"
      className="grain relative overflow-hidden bg-transparent text-ink border-t border-slate-200"
    >
      <div className="relative px-5 py-8 md:px-10 lg:py-12 xl:px-14">
        {/* Section Header */}
        <div className="flex flex-col gap-2 border-b border-slate-200 pb-4 sm:flex-row sm:items-end sm:justify-between">
          <SectionLabel n="03" label="Gallery" />
          <FadeUp delay={0.1}>
            <p className="eyebrow text-accent font-semibold">
              Project Portfolio · <span className="text-stone font-normal">New Jersey Statewide</span>
            </p>
          </FadeUp>
        </div>

        {/* Headline & Subtitle */}
        <div className="pt-5 lg:pt-8">
          <div className="grid grid-cols-1 items-end gap-5 lg:grid-cols-12 lg:gap-10">
            <div className="lg:col-span-8">
              <h2
                id="gallery-title"
                className="font-display display-tight text-[2.6rem] leading-[0.98] text-ink sm:text-[3.2rem] md:text-[3.8rem] lg:text-[4.2rem] xl:text-[4.8rem]"
              >
                <RevealWords
                  segments={[
                    { text: "Built with " },
                    { text: "precision", className: "italic text-accent", glow: false },
                    { text: " across New Jersey." },
                  ]}
                />
              </h2>
            </div>
            <div className="lg:col-span-4 lg:pb-1">
              <FadeUp delay={0.2}>
                <p className="max-w-[42ch] text-[15px] leading-relaxed text-stone md:text-[16px]">
                  A visual showcase of our craftsmanship across residential additions, luxury remodels, roofing, and commercial buildouts.
                </p>
              </FadeUp>
            </div>
          </div>
        </div>

        {/* 4x3 Pure Image Grid (12 Images total, 4 per row on desktop) */}
        <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4 lg:mt-8">
          {GALLERY_IMAGES.map((item, idx) => (
            <FadeUp
              key={item.id}
              delay={idx * 0.04}
              className="group relative aspect-[4/3] w-full overflow-hidden border border-slate-200/90 bg-slate-100 shadow-sm transition-all duration-300 hover:border-accent/70 hover:shadow-xl cursor-pointer"
            >
              <div
                onClick={() => setSelectedImage(item)}
                className="relative h-full w-full overflow-hidden"
              >
                <img
                  src={imgSrc(item.image, 1000)}
                  srcSet={imgSrcSet(item.image, [480, 800, 1000, 1400])}
                  sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
                  alt={item.image.alt}
                  loading="lazy"
                  style={{ objectPosition: item.image.position || "center" }}
                  className="h-full w-full object-cover transition-transform duration-700 ease-out-expo group-hover:scale-110"
                />

                {/* Subtle dark gradient overlay on hover */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                {/* Category & Index Badges (Visible on Hover) */}
                <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <span className="eyebrow bg-white/95 px-2 py-0.5 text-[10px] text-ink font-semibold shadow-sm backdrop-blur-md">
                    {item.category}
                  </span>
                </div>

                <span className="eyebrow absolute top-2.5 right-2.5 bg-accent px-2 py-0.5 text-[10px] text-white font-mono font-bold shadow-sm opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  {item.index}
                </span>

                {/* Bottom title on hover */}
                <div className="absolute inset-x-0 bottom-0 p-3 transform translate-y-2 opacity-0 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="font-display text-[13.5px] sm:text-[14px] font-semibold text-white leading-tight drop-shadow-md line-clamp-1">
                    {item.title}
                  </p>
                  <p className="text-[11px] font-mono text-white/80 mt-0.5">
                    📍 {item.location}
                  </p>
                </div>

                {/* Center Expand Icon */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100 pointer-events-none">
                  <div className="grid h-9 w-9 place-items-center rounded-full bg-white/90 text-ink shadow-lg backdrop-blur-md transition-transform duration-300 group-hover:scale-105">
                    <ExpandIcon className="text-sm text-accent" />
                  </div>
                </div>
              </div>
            </FadeUp>
          ))}
        </div>
      </div>

      {/* Full-Screen Image Lightbox Modal */}
      <AnimatePresence>
        {selectedImage && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/85 p-4 backdrop-blur-md"
            onClick={() => setSelectedImage(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.3, ease: EASE_ARCH }}
              className="relative max-h-[92vh] w-full max-w-5xl overflow-hidden border border-slate-800 bg-slate-950 text-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setSelectedImage(null)}
                className="absolute top-4 right-4 z-20 grid h-10 w-10 place-items-center bg-black/60 text-white shadow-md backdrop-blur-md transition-colors hover:bg-accent hover:text-white"
                aria-label="Close image modal"
              >
                <Close />
              </button>

              {/* Main Image Frame */}
              <div className="relative flex items-center justify-center bg-black min-h-[360px] max-h-[75vh]">
                <img
                  src={imgSrc(selectedImage.image, 1800)}
                  srcSet={imgSrcSet(selectedImage.image, [800, 1200, 1600, 2200])}
                  alt={selectedImage.image.alt}
                  className="h-full w-full object-contain max-h-[75vh]"
                />

                {/* Category Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="eyebrow bg-accent px-3 py-1 text-xs text-white font-mono font-bold shadow-md">
                    {selectedImage.category}
                  </span>
                </div>

                {/* Left/Right Lightbox Navigation Arrows */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateModal("prev");
                  }}
                  className="absolute left-4 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center bg-black/60 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-accent hover:text-white"
                  aria-label="Previous image"
                >
                  <ArrowLeft className="text-base" />
                </button>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    navigateModal("next");
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 grid h-11 w-11 place-items-center bg-black/60 text-white shadow-lg backdrop-blur-md transition-colors hover:bg-accent hover:text-white"
                  aria-label="Next image"
                >
                  <ArrowRight className="text-base" />
                </button>
              </div>

              {/* Lightbox Caption Bar */}
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-t border-slate-800 bg-slate-900 px-6 py-4">
                <div>
                  <h3 className="font-display text-[18px] sm:text-[20px] font-semibold text-white">
                    {selectedImage.title}
                  </h3>
                  <p className="text-[12.5px] font-mono text-stone">
                    📍 {selectedImage.location}
                  </p>
                </div>

                <div className="text-[12px] font-mono text-slate-400">
                  Image <span className="text-accent font-bold">{selectedIndex + 1}</span> of {GALLERY_IMAGES.length}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
