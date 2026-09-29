/* ------------------------------------------------------------------
   Content for Creative Structures NJ LLC.
   Only information supplied in the brief is presented as fact.
   Project entries describe TYPES of work — no names, addresses,
   prices, dates or statistics are invented.
------------------------------------------------------------------- */

export type Img = {
  id: number;
  alt: string;
  orientation: "landscape" | "portrait";
  /** CSS object-position for art-directed crops */
  position?: string;
};

const BASE = "https://images.pexels.com/photos";

export function imgSrc(img: Img, w = 1600) {
  return `${BASE}/${img.id}/pexels-photo-${img.id}.jpeg?auto=compress&cs=tinysrgb&w=${w}`;
}

export function imgSrcSet(img: Img, widths: number[] = [480, 800, 1200, 1600, 2200]) {
  return widths.map((w) => `${imgSrc(img, w)} ${w}w`).join(", ");
}

/* ---------------------------- Imagery ---------------------------- */

export const IMG = {
  heroHouse: {
    id: 12551958,
    alt: "Traditional two-story house exterior with warm lights at dusk",
    orientation: "landscape",
    position: "50% 55%",
  },
  heroStore: {
    id: 9060352,
    alt: "Brick corner storefront with a striped awning on a sunny street",
    orientation: "portrait",
  },
  inlineHome: {
    id: 6035306,
    alt: "Blue suburban house with a white front porch",
    orientation: "landscape",
  },
  inlineWork: {
    id: 7060906,
    alt: "White storefront beside a brick commercial building",
    orientation: "landscape",
  },
  interlude: {
    id: 33404353,
    alt: "Wooden house framing under construction on a cloudy day",
    orientation: "landscape",
  },
  capHomes: {
    id: 7746919,
    alt: "Wooden house exterior with stone accents and a covered porch",
    orientation: "landscape",
    position: "45% 50%",
  },
  capHomesDetail: {
    id: 15226810,
    alt: "Built-in window seat with bookshelves",
    orientation: "portrait",
  },
  capExterior: {
    id: 38293535,
    alt: "Roofing contractor working on a residential roof beneath trees",
    orientation: "portrait",
  },
  capExteriorDetail: {
    id: 18894950,
    alt: "White window set into green wooden siding",
    orientation: "portrait",
  },
  capCommercial: {
    id: 3341066,
    alt: "Coffee and book shop facade on a city street",
    orientation: "portrait",
  },
  capCommercialDetail: {
    id: 7046168,
    alt: "Small office meeting room with a wooden table",
    orientation: "landscape",
  },
  approachMain: {
    id: 7285922,
    alt: "Carpenter measuring a wooden plank with a square and pencil",
    orientation: "portrait",
  },
  approachDetail: {
    id: 4792483,
    alt: "Floor plan drawing on a wooden surface beside a pen and ruler",
    orientation: "landscape",
  },
  contact: {
    id: 6791507,
    alt: "Hands measuring wood with a pencil and ruler on a workbench",
    orientation: "portrait",
  },
} satisfies Record<string, Img>;

/* ---------------------------- Projects --------------------------- */

export const CATEGORIES = [
  "All",
  "Residential",
  "Remodeling",
  "Additions",
  "Roofing",
  "Exterior",
  "Commercial",
] as const;

export type Category = (typeof CATEGORIES)[number];

export const PROPERTY_TYPES = [
  "House",
  "Residential property",
  "Retail space",
  "Office",
  "Other commercial",
] as const;

export type PropertyType = (typeof PROPERTY_TYPES)[number];

export type Project = {
  id: string;
  title: string;
  tags: Exclude<Category, "All">[];
  summary: string;
  scope: string[];
  image: Img;
  propertyType: PropertyType;
};

export const PROJECTS: Project[] = [
  {
    id: "new-home",
    title: "New home construction",
    tags: ["Residential"],
    summary:
      "Ground-up residential construction — structure, exterior envelope and interior finishes carried through as one coordinated project.",
    scope: ["New construction", "Exterior envelope", "Interior finishes"],
    image: {
      id: 36777845,
      alt: "Modern two-story suburban house with a garage and driveway",
      orientation: "landscape",
    },
    propertyType: "House",
  },
  {
    id: "bath",
    title: "Bathroom renovation",
    tags: ["Remodeling", "Residential"],
    summary:
      "A bathroom rebuilt around better storage, clean tile lines and durable fixtures, with the lighting to match.",
    scope: ["Tile & stone", "Vanity & fixtures", "Lighting"],
    image: {
      id: 11701111,
      alt: "Bathroom with blue vanity cabinetry, twin sinks and marble walls",
      orientation: "portrait",
    },
    propertyType: "House",
  },
  {
    id: "siding",
    title: "Siding & window trim",
    tags: ["Exterior"],
    summary:
      "Clapboard siding and window trim, detailed to shed water properly and to look right up close.",
    scope: ["Siding", "Window trim", "Exterior details"],
    image: {
      id: 18894951,
      alt: "Lattice window set into gray clapboard siding with a planter below",
      orientation: "portrait",
    },
    propertyType: "House",
  },
  {
    id: "kitchen",
    title: "Kitchen remodel",
    tags: ["Remodeling", "Residential"],
    summary:
      "Layout, cabinetry, counters and lighting brought together in a single, carefully sequenced remodel.",
    scope: ["Layout", "Cabinetry & counters", "Lighting & finishes"],
    image: {
      id: 37153451,
      alt: "Bright kitchen with a marble island, wood cabinetry and large windows",
      orientation: "landscape",
    },
    propertyType: "House",
  },
  {
    id: "roof-replacement",
    title: "Roof replacement",
    tags: ["Roofing", "Exterior"],
    summary:
      "Residential roofing with close attention to the flashing, edges and transitions that keep the weather out.",
    scope: ["Tear-off", "Underlayment", "Shingles & flashing"],
    image: {
      id: 33404248,
      alt: "Roofer using a nail gun to install shingles on a residential roof",
      orientation: "landscape",
      position: "50% 40%",
    },
    propertyType: "House",
  },
  {
    id: "cafe",
    title: "Café renovation",
    tags: ["Commercial"],
    summary:
      "An interior renovation for a small food business, planned around how the space has to work day to day.",
    scope: ["Interior renovation", "Counter & millwork", "Lighting"],
    image: {
      id: 14110982,
      alt: "Minimal café interior with a wooden counter, black stools and pendant lights",
      orientation: "portrait",
    },
    propertyType: "Other commercial",
  },
  {
    id: "storefront",
    title: "Storefront improvements",
    tags: ["Commercial"],
    summary:
      "Street-facing improvements for a local business — the entrance, the glazing and the exterior finishes.",
    scope: ["Storefront", "Entrance", "Exterior finishes"],
    image: {
      id: 12730623,
      alt: "Small urban storefront with a large glass window on a sunny day",
      orientation: "landscape",
    },
    propertyType: "Retail space",
  },
  {
    id: "sunroom",
    title: "Sunroom addition",
    tags: ["Additions", "Residential"],
    summary:
      "Added living space full of daylight, built to feel as though it was always part of the house.",
    scope: ["Addition", "Windows", "Interior finishes"],
    image: {
      id: 36777961,
      alt: "Sunlit enclosed porch with wicker furniture overlooking greenery",
      orientation: "landscape",
    },
    propertyType: "House",
  },
  {
    id: "roof-new",
    title: "Shingle roof installation",
    tags: ["Roofing"],
    summary:
      "A new shingle roof on a residential build, laid out cleanly from the eaves to the ridge.",
    scope: ["Roofing", "Flashing", "Ridge & edges"],
    image: {
      id: 31771166,
      alt: "Roofer installing shingles on a new residential roof under a cloudy sky",
      orientation: "portrait",
    },
    propertyType: "House",
  },
  {
    id: "porch",
    title: "Front porch & entry",
    tags: ["Exterior", "Residential"],
    summary:
      "Exterior carpentry that changes how a house meets the street — porch, railings, trim and entry.",
    scope: ["Porch", "Railings & trim", "Entry"],
    image: {
      id: 18326826,
      alt: "Classic wooden house porch with a decorative entrance and picket fence",
      orientation: "landscape",
    },
    propertyType: "House",
  },
  {
    id: "rear-addition",
    title: "Rear addition & terrace",
    tags: ["Additions", "Residential"],
    summary:
      "More room at the back of the house, opened up to the yard and matched to the existing home.",
    scope: ["Addition", "Terrace", "Exterior finishes"],
    image: {
      id: 7061662,
      alt: "Suburban house with a covered terrace opening onto a backyard lawn",
      orientation: "landscape",
    },
    propertyType: "House",
  },
  {
    id: "office",
    title: "Small office renovation",
    tags: ["Commercial"],
    summary:
      "Updated meeting and work space for a small business — finishes, lighting and a cleaner layout.",
    scope: ["Interior renovation", "Finishes", "Lighting"],
    image: {
      id: 7534213,
      alt: "Contemporary meeting room with a wooden table and chairs",
      orientation: "landscape",
    },
    propertyType: "Office",
  },
];

/* ---------------------------- Services --------------------------- */

export type Service = {
  key: string;
  index: string;
  category: "Residential" | "Remodeling" | "Exterior" | "Commercial";
  name: string;
  short: string;
  body: string;
  items: string[];
  image: Img;
  caption: string;
  propertyType: PropertyType;
};

export const SERVICES: Service[] = [
  {
    key: "new-construction",
    index: "01",
    category: "Residential",
    name: "New Home Construction",
    short: "Ground-up residential building & framing",
    body: "Turnkey residential construction carried through from foundation to final finishes. We coordinate framing, mechanical rough-ins, envelope insulation, and custom interior carpentry into one unified build.",
    items: [
      "Full ground-up home construction",
      "Structural framing & load-bearing engineering",
      "Complete building envelope & high-R insulation",
      "Turnkey interior & exterior finishing",
    ],
    image: {
      id: 36777845,
      alt: "Modern custom two-story home exterior",
      orientation: "landscape",
    },
    caption: "New Construction",
    propertyType: "House",
  },
  {
    key: "remodeling",
    index: "02",
    category: "Remodeling",
    name: "Kitchen & Bath Remodeling",
    short: "Custom cabinetry, stone & luxury fixtures",
    body: "Full-scale interior transformations designed for daily living. We rebuild kitchens and bathrooms around durable custom cabinetry, stone surfaces, premium fixtures, and architectural lighting.",
    items: [
      "Custom kitchen layout & island design",
      "Tile, natural stone & vanity installations",
      "Spa bathrooms, walk-in showers & fixtures",
      "Complete electrical, plumbing & lighting sequences",
    ],
    image: {
      id: 37153451,
      alt: "Luxury modern kitchen remodel with marble counters",
      orientation: "landscape",
    },
    caption: "Interior Remodeling",
    propertyType: "House",
  },
  {
    key: "additions",
    index: "03",
    category: "Residential",
    name: "Home Additions & Expansions",
    short: "Two-story additions, sunrooms & suites",
    body: "Expand your home's footprint with additions engineered to integrate seamlessly with the existing roofline, architectural character, and foundation of your property.",
    items: [
      "Second-story additions & structural expansions",
      "Sunroom, master suite & family room extensions",
      "Foundation tying, roof tie-in & weather sealing",
      "Interior flow reconfiguration & matching finishes",
    ],
    image: {
      id: 36777961,
      alt: "Sunlit residential home extension and porch addition",
      orientation: "landscape",
    },
    caption: "Home Additions",
    propertyType: "House",
  },
  {
    key: "roofing",
    index: "04",
    category: "Exterior",
    name: "Roofing & Weatherproofing",
    short: "Full roof replacements, shingles & flashing",
    body: "Heavy-duty residential roofing designed to withstand Northeast weather. We specialize in complete tear-offs, architectural shingle systems, ice and water shielding, and custom copper/aluminum flashing.",
    items: [
      "Complete tear-off & architectural shingles",
      "Ice & water barrier underlayment protection",
      "Chimney, skylight & valley custom flashing",
      "Soffit ventilation, fascia & ridge cap systems",
    ],
    image: {
      id: 33404248,
      alt: "Professional roofer installing shingles on residential roof",
      orientation: "landscape",
      position: "50% 40%",
    },
    caption: "Roofing Systems",
    propertyType: "House",
  },
  {
    key: "exterior",
    index: "05",
    category: "Exterior",
    name: "Siding, Trim & Porticos",
    short: "Clapboard, porticos, windows & entries",
    body: "Elevate your property's curb appeal and weather envelope with premium clapboard or composite siding, energy-efficient window replacements, covered porticos, and decorative exterior trim.",
    items: [
      "Clapboard, vinyl & fiber-cement siding",
      "Covered front porticos, porch entries & railings",
      "High-efficiency window & door installations",
      "Custom exterior PVC/composite trim & millwork",
    ],
    image: {
      id: 18326826,
      alt: "Custom front porch, portico entry and clapboard siding",
      orientation: "landscape",
    },
    caption: "Exterior Trim & Siding",
    propertyType: "House",
  },
  {
    key: "commercial",
    index: "06",
    category: "Commercial",
    name: "Storefronts & Commercial Fit-Outs",
    short: "Retail buildouts, offices & code renovations",
    body: "Construction and renovations tailored for local businesses, landlords, and retailers across New Jersey. We plan and build commercial spaces sized for efficient business operations.",
    items: [
      "Retail storefront & facade renovations",
      "Commercial office fit-outs & reconfigurations",
      "Café, boutique & customer area improvements",
      "ADA compliance, egress & local NJ code upgrades",
    ],
    image: {
      id: 14110982,
      alt: "Modern boutique café and commercial interior space",
      orientation: "portrait",
    },
    caption: "Commercial Construction",
    propertyType: "Retail space",
  },
];

/* --------------------------- Principles -------------------------- */

export const PRINCIPLES = [
  {
    n: "01",
    title: "Direct",
    body: "You deal with us directly, from the first conversation to the finished project.",
  },
  {
    n: "02",
    title: "Clear",
    body: "Plain communication about scope, sequence and what to expect as the work moves along.",
  },
  {
    n: "03",
    title: "Careful",
    body: "Attention to the details of each job — including the ones most people will never notice.",
  },
  {
    n: "04",
    title: "Organized",
    body: "Work that's planned and kept in order, with respect for the home or business around it.",
  },
];

/* --------------------------- Navigation -------------------------- */

export const NAV = [
  { id: "top", label: "Home", n: "00" },
  { id: "about", label: "About", n: "01" },
  { id: "services", label: "Services", n: "02" },
  { id: "gallery", label: "Gallery", n: "03" },
  { id: "contact", label: "Contact", n: "04" },
];
