// Editorial prototype assortment, not authoritative prices or stock.
// Paired views include AI-generated prototype angles; see docs/assets.md.
export type HomepageGarment = {
  slug: string;
  name: string;
  color: string;
  pricePaise: number;
  sideImage: string;
  frontImage: string;
  photoLift?: { side?: number; front?: number };
  cutout?: boolean;
};

const originalGarments: HomepageGarment[] = [
  {
    slug: "heavyweight-oversized-tee",
    name: "Heavyweight Oversized Tee",
    color: "Chalk",
    pricePaise: 129900,
    sideImage:
      "/images/products/oversized-tee-chalk-side-cutout-silver-hook.png",
    frontImage:
      "/images/products/oversized-tee-chalk-front-cutout-silver-hook.png",
    cutout: true,
    photoLift: { side: 0.34, front: 5.92 },
  },
  {
    slug: "relaxed-linen-shirt",
    name: "Relaxed Linen Shirt",
    color: "Bone",
    pricePaise: 199900,
    sideImage: "/images/products/linen-shirt-bone-side-cutout-silver-hook.png",
    frontImage:
      "/images/products/linen-shirt-bone-front-cutout-silver-hook.png",
    cutout: true,
    photoLift: { side: 0.96, front: 0.9 },
  },
  {
    slug: "everyday-hoodie",
    name: "Everyday Hoodie",
    color: "Graphite",
    pricePaise: 249900,
    sideImage: "/images/products/hoodie-graphite-side-cutout-silver-hook.png",
    frontImage: "/images/products/hoodie-graphite-front-cutout-silver-hook.png",
    cutout: true,
    photoLift: { side: 0.76, front: 1.67 },
  },
  {
    slug: "everyday-coord",
    name: "Everyday Co-ord",
    color: "Slate",
    pricePaise: 349900,
    sideImage: "/images/products/coord-slate-side-cutout-silver-hook.png",
    frontImage: "/images/products/coord-slate-front-cutout-silver-hook.png",
    cutout: true,
    photoLift: { side: 1.03, front: 0.83 },
  },
];

const colourGarments: HomepageGarment[] = [
  {
    slug: "heavyweight-oversized-tee-olive",
    name: "Heavyweight Oversized Tee",
    color: "Olive",
    pricePaise: 129900,
    frontImage:
      "/images/products/oversized-tee-olive-front-cutout-silver-hook.png",
    sideImage:
      "/images/products/oversized-tee-olive-side-cutout-silver-hook.png",
    cutout: true,
    photoLift: { side: 0.48, front: 0.83 },
  },
  {
    slug: "heavyweight-oversized-tee-espresso",
    name: "Heavyweight Oversized Tee",
    color: "Espresso",
    pricePaise: 129900,
    frontImage:
      "/images/products/oversized-tee-espresso-front-cutout-silver-hook.png",
    sideImage:
      "/images/products/oversized-tee-espresso-side-cutout-silver-hook.png",
    cutout: true,
    photoLift: { side: 0.9, front: 0.83 },
  },
  {
    slug: "heavyweight-oversized-tee-clay",
    name: "Heavyweight Oversized Tee",
    color: "Clay",
    pricePaise: 129900,
    frontImage:
      "/images/products/oversized-tee-clay-front-cutout-silver-hook.png",
    sideImage:
      "/images/products/oversized-tee-clay-side-cutout-silver-hook.png",
    cutout: true,
    photoLift: { side: 0.48, front: 1.31 },
  },
  {
    slug: "everyday-hoodie-navy",
    name: "Everyday Hoodie",
    color: "Navy",
    pricePaise: 249900,
    frontImage: "/images/products/hoodie-navy-front-cutout-silver-hook.png",
    sideImage: "/images/products/hoodie-navy-side-cutout-silver-hook.png",
    cutout: true,
    photoLift: { side: 0.41, front: 1.28 },
  },
  {
    slug: "everyday-hoodie-burgundy",
    name: "Everyday Hoodie",
    color: "Burgundy",
    pricePaise: 249900,
    frontImage: "/images/products/hoodie-burgundy-front-cutout-silver-hook.png",
    sideImage: "/images/products/hoodie-burgundy-side-cutout-silver-hook.png",
    cutout: true,
    photoLift: { side: 0.41, front: 0.88 },
  },
  {
    slug: "everyday-hoodie-grey-marl",
    name: "Everyday Hoodie",
    color: "Grey Marl",
    pricePaise: 249900,
    frontImage:
      "/images/products/hoodie-grey-marl-front-cutout-silver-hook.png",
    sideImage: "/images/products/hoodie-grey-marl-side-cutout-silver-hook.png",
    cutout: true,
    photoLift: { side: 1.17, front: 0.88 },
  },
];

const linenColours: HomepageGarment[] = [
  {
    slug: "relaxed-linen-shirt-white",
    name: "Relaxed Linen Shirt",
    color: "White",
    pricePaise: 199900,
    sideImage: "/images/products/linen-shirt-white-side-cutout-silver-hook.png",
    frontImage:
      "/images/products/linen-shirt-white-front-cutout-silver-hook.png",
    cutout: true,
    photoLift: { side: 0.41, front: 0.9 },
  },
  {
    slug: "relaxed-linen-shirt-black",
    name: "Relaxed Linen Shirt",
    color: "Black",
    pricePaise: 199900,
    sideImage: "/images/products/linen-shirt-black-side-cutout-silver-hook.png",
    frontImage:
      "/images/products/linen-shirt-black-front-cutout-silver-hook.png",
    cutout: true,
    photoLift: { side: 0.76, front: 0.83 },
  },
  {
    slug: "relaxed-linen-shirt-baby-pink",
    name: "Relaxed Linen Shirt",
    color: "Baby Pink",
    pricePaise: 199900,
    sideImage:
      "/images/products/linen-shirt-baby-pink-side-cutout-silver-hook.png",
    frontImage:
      "/images/products/linen-shirt-baby-pink-front-cutout-silver-hook.png",
    cutout: true,
    photoLift: { side: 0.55, front: 1.03 },
  },
];

export const homepageGarments: HomepageGarment[] = [
  originalGarments[0]!,
  linenColours[0]!,
  colourGarments[0]!,
  originalGarments[1]!,
  colourGarments[3]!,
  colourGarments[1]!,
  originalGarments[2]!,
  colourGarments[4]!,
  linenColours[1]!,
  colourGarments[2]!,
  linenColours[2]!,
  originalGarments[3]!,
  colourGarments[5]!,
];
