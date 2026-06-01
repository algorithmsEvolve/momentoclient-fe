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
  if (typeof priceStr === "number") return priceStr;
  // Handle "IDR 1.000.000" or "Rp. 70.000"
  const cleanStr = String(priceStr).replace(/[^\d]/g, "");
  return parseInt(cleanStr, 10) || 0;
};

export const formatPrice = (num) => {
  const formatted = num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `Rp. ${formatted}`;
};

const normalizeId = (value, fallback = "item") => {
  const normalized = String(value || fallback)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

  return normalized || fallback;
};

const imageSrc = (image, fallback = "/images/momento-logo.png") => {
  if (!image) return fallback;
  if (typeof image === "string") return image;
  return image.src || fallback;
};

const getPricingBoxes = (row) => {
  const match = String(row?.boxes || "").match(/\d+/);
  return match ? parseInt(match[0], 10) : 0;
};

const fallbackSeserahanProducts = [
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
];

const formatPriceRange = (pricing = []) => {
  const prices = pricing.map((item) => parsePrice(item.price)).filter(Boolean);
  if (prices.length === 0) return "Rp. 0";

  const minPrice = Math.min(...prices);
  const maxPrice = Math.max(...prices);

  if (minPrice === maxPrice) return formatPrice(minPrice);

  return `${formatPrice(minPrice)}~${formatPrice(maxPrice)}`;
};

export const buildSeserahanEstimationProducts = (section) => {
  if (!section) return fallbackSeserahanProducts;

  const packages = Array.isArray(section.packages) ? section.packages : [];
  const addOnItems = Array.isArray(section.addOns?.items) ? section.addOns.items : [];
  const bedcover = section.addOns?.bedcover;

  const trays = packages
    .filter((pkg) => pkg?.enabled !== false)
    .map((pkg, index) => {
      const price = parsePrice(pkg.basePrice);
      const id = normalizeId(pkg.id || pkg.name || `tray-${index + 1}`);

      return {
        id: `tray-${id}`,
        name: `${pkg.name || "Seserahan"} Tray`,
        price,
        displayPrice: pkg.basePrice || formatPrice(price),
        image: imageSrc(pkg.images?.[0]),
        pricingRows: Array.isArray(pkg.pricing) ? pkg.pricing : [],
      };
    });

  const ringboxes = addOnItems
    .filter((item) => item?.enabled !== false)
    .map((item, index) => {
      const price = parsePrice(item.price);
      const id = normalizeId(item.id || item.name || `ringbox-${index + 1}`);
      const name = item.name?.toLowerCase().includes("ringbox")
        ? item.name
        : `${item.name || "Ringbox"} Ringbox`;

      return {
        id: `addon-${id}`,
        name,
        price,
        displayPrice: item.price || formatPrice(price),
        image: imageSrc(item.image),
        type: "ringbox",
      };
    });

  const bedcoverProduct = bedcover?.enabled === false
    ? []
    : [
        {
          id: `addon-${normalizeId(bedcover?.id || bedcover?.name || "hias-bedcover")}`,
          name: bedcover?.name || "Hias Bedcover",
          price: parsePrice(bedcover?.price || "Rp. 65.000"),
          displayPrice: bedcover?.price || "Rp. 65.000",
          image: imageSrc(
            bedcover?.image || bedcover?.images?.[0],
            "/images/pricelist/seserahan/addons/hias-1.png"
          ),
          type: "bedcover",
        },
      ];

  const products = [...trays, ...ringboxes, ...bedcoverProduct];
  return products.length > 0 ? products : fallbackSeserahanProducts;
};

export const getAdjustedEstimationPrice = (item, totalTrays) => {
  if (!item?.id?.startsWith("tray-") || totalTrays <= 6) return item?.price || 0;

  const targetBoxes = totalTrays > 9 ? 10 : 8;
  const row = (item.pricingRows || []).find((pricingRow) => getPricingBoxes(pricingRow) === targetBoxes);
  const rowPrice = parsePrice(row?.price);

  if (!rowPrice || !targetBoxes) return item.price;

  return Math.round(rowPrice / targetBoxes);
};

export const buildMaharEstimationProducts = (section) => {
  const packages = Array.isArray(section?.packages) ? section.packages : [];
  const addOnItems = Array.isArray(section?.addOns?.items) ? section.addOns.items : [];

  if (!section || packages.length === 0) {
    return maharPackages.map((p) => ({
      id: `mahar-${p.id}`,
      name: `Mahar ${p.name}`,
      price: parsePrice(p.pricing[0]?.price),
      displayPrice: formatPriceRange(p.pricing),
      image: p.image,
      variants: p.pricing || [],
      type: "mahar",
    }));
  }

  const maharProducts = packages
    .filter((item) => item?.enabled !== false)
    .map((item, index) => {
      const variants = Array.isArray(item.pricing) ? item.pricing : [];
      const id = normalizeId(item.id || item.name || `mahar-${index + 1}`);

      return {
        id: `mahar-${id}`,
        name: item.name?.toLowerCase().startsWith("mahar")
          ? item.name
          : `Mahar ${item.name || "Custom"}`,
        price: parsePrice(variants[0]?.price),
        displayPrice: formatPriceRange(variants),
        image: imageSrc(item.image),
        variants,
        type: "mahar",
      };
    });

  const addOns = addOnItems
    .filter((item) => item?.enabled !== false)
    .map((item, index) => {
      const price = parsePrice(item.price);
      const id = normalizeId(item.id || item.name || `mahar-addon-${index + 1}`);

      return {
        id: `mahar-addon-${id}`,
        name: item.name || "Add On Mahar",
        price,
        displayPrice: formatPrice(price),
        image: imageSrc(item.image),
        note: "*Tersedia ketika memilih tipe mahar",
        type: "mahar-addon",
      };
    });

  const products = [...maharProducts, ...addOns];
  return products.length > 0 ? products : estimationProducts.mahar;
};

export const buildWccEstimationProducts = (section) => {
  const packages = Array.isArray(section?.packages) ? section.packages : [];
  const addOnItems = Array.isArray(section?.addOns?.items) ? section.addOns.items : [];

  if (!section || packages.length === 0) {
    return [
      ...wccPackages.map((p) => ({
        id: `wcc-${p.id}`,
        name: p.name,
        desc: p.desc,
        price: parsePrice(p.price),
        displayPrice: p.price,
        image: p.image || "/images/extras/wcc.png",
        type: "wcc-package",
      })),
      ...wccAddOns.map((item, index) => ({
        id: `wcc-addon-${index + 1}`,
        name: item.name,
        price: parsePrice(item.price),
        displayPrice: item.price,
        type: "wcc-addon",
      })),
    ];
  }

  const wccProducts = packages
    .filter((item) => item?.enabled !== false)
    .map((item, index) => {
      const price = parsePrice(item.price);
      const id = normalizeId(item.id || item.name || `wcc-${index + 1}`);

      return {
        id: `wcc-${id}`,
        name: item.name || "WCC",
        desc: item.desc || "",
        price,
        displayPrice: item.price || formatPrice(price),
        image: imageSrc(item.image, "/images/extras/wcc.png"),
        type: "wcc-package",
      };
    });

  const addOns = addOnItems
    .filter((item) => item?.enabled !== false)
    .map((item, index) => {
      const price = parsePrice(item.price);
      const id = normalizeId(item.id || item.name || `wcc-addon-${index + 1}`);

      return {
        id: `wcc-addon-${id}`,
        name: item.name || "WCC Add On",
        price,
        displayPrice: item.price || formatPrice(price),
        type: "wcc-addon",
      };
    });

  return [...wccProducts, ...addOns];
};

export const buildBundlingEstimationGroups = (section) => {
  const groups = Array.isArray(section?.groups) ? section.groups : [];
  const sourceGroups = groups.length > 0
    ? groups
    : bundlingPackages.map((group, groupIndex) => ({
        id: `bundling-group-${groupIndex + 1}`,
        category: group.category,
        packages: group.packages,
      }));

  return sourceGroups
    .filter(Boolean)
    .map((group, groupIndex) => ({
      id: group.id || `bundling-group-${groupIndex + 1}`,
      eyebrow: section?.eyebrow || "Bundling",
      category: group.category || "Bundling Package",
      packages: (Array.isArray(group.packages) ? group.packages : [])
        .filter((pkg) => pkg?.enabled !== false)
        .map((pkg, packageIndex) => {
          const id = normalizeId(pkg.id || pkg.name || `bundling-${groupIndex + 1}-${packageIndex + 1}`);
          const price = parsePrice(pkg.price);
          const originalPriceValue = parsePrice(pkg.originalPrice);

          return {
            id: `bundling-${id}`,
            name: pkg.name || "Bundling Package",
            price,
            displayPrice: pkg.price || formatPrice(price),
            originalPrice: pkg.originalPrice || "",
            originalPriceValue: originalPriceValue || price,
            items: Array.isArray(pkg.items) ? pkg.items : [],
            bonus: Array.isArray(pkg.bonus) ? pkg.bonus : [],
            type: "bundling-package",
          };
        }),
    }))
    .filter((group) => group.packages.length > 0);
};

export const flattenEstimationProducts = (productsByCategory) =>
  Object.values(productsByCategory)
    .flatMap((value) => {
      if (!Array.isArray(value)) return [];
      if (value[0]?.packages) return value.flatMap((group) => group.packages || []);
      return value;
    });

export const estimationProducts = {
  seserahan: fallbackSeserahanProducts,
  mahar: maharPackages.map((p) => ({
    id: `mahar-${p.id}`,
    name: `Mahar ${p.name}`,
    price: parsePrice(p.pricing[0].price), // Base size price
    displayPrice: formatPriceRange(p.pricing),
    image: p.image,
    variants: p.pricing,
    type: "mahar",
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
    name: p.name,
    desc: p.desc,
    price: parsePrice(p.price),
    displayPrice: p.price,
    image: p.image || "/images/extras/wcc.png",
    type: "wcc-package",
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

export const buildEstimationProducts = (pricingContent) => {
  const bundlingGroups = buildBundlingEstimationGroups(pricingContent?.sections?.bundling);

  return {
    ...estimationProducts,
    seserahan: buildSeserahanEstimationProducts(pricingContent?.sections?.seserahan),
    mahar: buildMaharEstimationProducts(pricingContent?.sections?.mahar),
    wcc: buildWccEstimationProducts(pricingContent?.sections?.wcc),
    bundling: bundlingGroups.flatMap((group) => group.packages),
    bundlingGroups,
  };
};
