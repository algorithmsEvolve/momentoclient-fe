import {
  seserahanPackages,
  maharPackages,
  addOns,
  bouquetPackages,
  wccPackages,
  wccAddOns,
  bundlingPackages,
} from "./pricingData";

export const parsePrice = (priceStr) => {
  if (!priceStr) return 0;
  // Handle "IDR 1.000.000" or "Rp. 70.000"
  const cleanStr = priceStr.replace(/[^\d]/g, "");
  return parseInt(cleanStr, 10) || 0;
};

export const formatPrice = (num) => {
  const formatted = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `Rp. ${formatted}`;
};

export const estimationProducts = {
  seserahan: [
    // Trays (prices from Figma image)
    ...seserahanPackages.map((p) => {
      let price = parsePrice(p.basePrice);
      // Override Suisho as per updated pricing (90k base)
      if (p.id === "suisho") price = 90000;
      // Kagayaki base is now 100k
      return {
        id: `tray-${p.id}`,
        name: `${p.name} Tray`,
        price: price,
        displayPrice: formatPrice(price),
        image: p.images[0],
      };
    }),
    // Ringboxes (prices from Figma image)
    ...addOns.map((a) => {
      let price = 60000; // Sora, Haku, Hinoki, Yoru are 60k in Figma
      if (a.name.toLowerCase().includes("shirō")) price = 70000;
      if (a.name.toLowerCase().includes("kurō")) price = 70000;
      return {
        id: `addon-${a.name.toLowerCase().replace(/\s+/g, "-")}`,
        name: `${a.name.replace(/[āōū]/g, (match) => ({'ā':'a','ō':'o','ū':'u'}[match]))} Ringbox`,
        price: price,
        displayPrice: formatPrice(price),
        image: a.image,
      };
    }),
    // Hias Bedcover
    {
      id: "addon-hias-bedcover",
      name: "Hias Bedcover",
      price: 65000,
      displayPrice: "Rp. 65.000",
      image: "/images/pricelist/seserahan/addons/hias-1.png",
    },
  ],
  mahar: maharPackages.map((p) => ({
    id: `mahar-${p.id}`,
    name: `Frame ${p.name}`,
    price: parsePrice(p.pricing[0].price), // Base size price
    displayPrice: p.pricing[0].price,
    image: p.image,
    variants: p.pricing,
  })),
  undangan: [], // On Progress
  keepsake: [
    {
      id: "keepsake-main",
      name: "Wedding Keepsake",
      price: 115000,
      displayPrice: "Rp. 115.000",
      image: "/images/extras/keepsake.png",
    },
  ],
  bouqet: bouquetPackages.map((p) => ({
    id: `bouquet-${p.id}`,
    name: `${p.name} Bouquet`,
    price: parsePrice(p.price),
    displayPrice: p.price,
    image: p.image,
  })),
  wcc: wccPackages.map((p) => ({
    id: `wcc-${p.id}`,
    name: `${p.name} Package`,
    price: parsePrice(p.price),
    displayPrice: p.price,
    image: "/images/extras/mc.png", // Fallback image for WCC
  })),
  bundling: bundlingPackages.flatMap((cat) =>
    cat.packages.map((p) => ({
      id: `bundling-${p.id}`,
      name: p.name,
      price: parsePrice(p.price),
      displayPrice: p.price,
      image: "/images/pricelist/bundling/flower.png", // Fallback image
    }))
  ),
};
