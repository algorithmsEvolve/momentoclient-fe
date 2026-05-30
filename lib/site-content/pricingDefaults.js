import {
  addOns,
  bouquetPackages,
  bundlingPackages,
  maharPackages,
  pricingCategories,
  seserahanPackages,
  wccAddOns,
  wccPackages,
} from "@/lib/pricingData";

export const pricingDefaults = {
  version: 1,
  seo: {
    title: "Pricelist | Momento Project",
    description:
      "Daftar harga produk dan layanan Momento Project - Sewa Seserahan, Mahar, Undangan Digital, dan lainnya.",
    ogImageUrl: "",
  },
  settings: {
    defaultCategory: "seserahan",
    showCategoryHeader: true,
  },
  categories: pricingCategories.map((item) => ({
    id: item.id,
    name: item.name,
    sidebarName: item.sidebar_name || item.name,
    enabled: true,
  })),
  sections: {
    seserahan: {
      eyebrow: "Pricelist",
      title: "Seserahan",
      basePriceLabel: "Harga Per box :",
      emptyState: {
        title: "Paket seserahan belum tersedia",
        description: "Silakan hubungi Momento untuk informasi terbaru.",
      },
      packages: seserahanPackages.map((pkg) => ({
        id: pkg.id,
        name: pkg.name,
        basePrice: pkg.basePrice,
        images: (pkg.images || []).map((src) => ({ src, alt: pkg.name })),
        pricing: pkg.pricing || [],
        enabled: true,
      })),
      addOns: {
        eyebrow: "Add Ons",
        title: "RINGBOX, HIAS BEDCOVER",
        items: addOns.map((item, index) => ({
          id: `seserahan-addon-${index + 1}`,
          name: item.name,
          price: item.price,
          note: item.note,
          image: {
            src: item.image,
            alt: item.name,
          },
          enabled: true,
        })),
        bedcover: {
          id: "hias-bedcover",
          name: "Hias Bedcover",
          price: "Rp. 65.000",
          note: "*bisa ubah warna",
          image: {
            src: "/images/pricelist/seserahan/addons/hias-1.png",
            alt: "Hias Bedcover",
          },
          enabled: true,
        },
      },
    },
    mahar: {
      eyebrow: "Pricelist",
      title: "Mahar",
      freeNotes: [
        "Replika rupiah kertas maks. 10 lembar",
        "Packaging kardus & bubblewrap",
      ],
      excludedLabel: "Belum termasuk :",
      excludedText: "Replika mahar seperti LM, Perhiasan, Mata Uang Asing, dsb.",
      packages: maharPackages.map((item) => ({
        id: item.id,
        name: item.name,
        image: {
          src: item.image,
          alt: item.name,
        },
        pricing: item.pricing || [],
        enabled: true,
      })),
      custom: {
        title: "Custom Mahar",
        description: "Harga disesuaikan biaya barang dan tingkat kesulitan pembuatan.",
        excludedLabel: "Belum termasuk :",
        excludedText: "Replika mahar seperti LM, Perhiasan, Mata Uang Asing, dsb.",
        images: [1, 2, 3, 4].map((num) => ({
          src: `/images/pricelist/mahar/custom-${num}.png`,
          alt: `Custom Mahar ${num}`,
        })),
        enabled: true,
      },
      addOns: {
        eyebrow: "Add Ons",
        title: "REPLIKA MAHAR",
        items: [
          { id: "mahar-addon-1", name: "Mata uang Asing", price: "Rp. 5.000/pcs", enabled: true },
          { id: "mahar-addon-2", name: "Koin Kuno", price: "Rp. 5.000/pcs", enabled: true },
          { id: "mahar-addon-3", name: "LM 1 - 10 Gram", price: "Rp. 10.000/pcs", enabled: true },
          { id: "mahar-addon-4", name: "LM > 10 Gram", price: "Rp. 10.000/pcs", enabled: true },
          { id: "mahar-addon-5", name: "Set Perhiasan", price: "Rp. 15.000/set", enabled: true },
        ],
      },
    },
    undangan: {
      mode: "placeholder",
      placeholder: {
        image: { src: "/images/momento-logo.png", alt: "Momento" },
        title: "On Progress",
        description:
          "Kami sedang meracik konten terbaik untuk Pricelist Undangan Digital. Nantikan pembaruan dari kami segera!",
      },
      packages: [],
    },
    keepsake: {
      eyebrow: "Pricelist",
      title: "Wedding Keepsake",
      main: {
        name: "Keepsake",
        price: "Rp. 115.000",
        image: { src: "/images/extras/keepsake.png", alt: "Wedding Keepsake" },
        includeTitle: "Include :",
        includes: [
          "Envelope + Wax Seal",
          "2 Name with Tassel",
          "2 Vows with Ribbon",
          "1 Quotes",
          "1 Location + Wax Seal",
          "1 Dates",
          "1 Initial Logo",
          "Sifon Ribbon -+ 1m",
        ],
        enabled: true,
      },
      addOns: {
        eyebrow: "Add Ons",
        title: "AKSESORIS KEEPSAKE",
        items: [
          { id: "keepsake-addon-1", name: "Artificial Flower", price: "Rp. 5.000", enabled: true },
          { id: "keepsake-addon-2", name: "Acrylic Logo", price: "Rp. 15.000", enabled: true },
          { id: "keepsake-addon-3", name: "Stamp Wax", price: "Rp. 30.000", enabled: true },
          { id: "keepsake-addon-4", name: "Spoon Wax", price: "Rp. 30.000", enabled: true },
          { id: "keepsake-addon-5", name: "Alas Satin 30x30", price: "Rp. 30.000", enabled: true },
          { id: "keepsake-addon-6", name: "Europe Magnifier", price: "Rp. 35.000", enabled: true },
        ],
      },
    },
    bouqet: {
      eyebrow: "Pricelist",
      title: "Flower Bouqet",
      packages: bouquetPackages.map((item) => ({
        id: item.id,
        name: item.name,
        image: { src: item.image, alt: item.name },
        detailsTitle: "Detail :",
        details: item.details || [],
        price: item.price,
        enabled: true,
      })),
    },
    wcc: {
      eyebrow: "Pricelist",
      title: "Wedding Content Creator",
      packages: wccPackages.map((item) => ({
        id: item.id,
        name: item.name,
        desc: item.desc,
        detailsTitle: "Detail :",
        details: item.details || [],
        price: item.price,
        enabled: true,
      })),
      addOns: {
        eyebrow: "Add Ons",
        title: "CONTENT WCC",
        items: wccAddOns.map((item, index) => ({
          id: `wcc-addon-${index + 1}`,
          name: item.name,
          price: item.price,
          enabled: true,
        })),
      },
    },
    bundling: {
      eyebrow: "Bundling",
      groups: bundlingPackages.map((group, groupIndex) => ({
        id: `bundling-group-${groupIndex + 1}`,
        category: group.category,
        packages: (group.packages || []).map((item) => ({
          id: item.id,
          name: item.name,
          originalPrice: item.originalPrice,
          price: item.price,
          items: (item.items || []).map((bundleItem) => ({
            name: bundleItem.name,
            note: bundleItem.note || "",
            icon: bundleItem.icon ? { src: bundleItem.icon, alt: bundleItem.name } : null,
            options: bundleItem.options || [],
            isList: Boolean(bundleItem.isList),
            listItems: bundleItem.listItems || [],
          })),
          bonus: item.bonus || [],
          enabled: true,
        })),
      })),
    },
  },
  extraBanner: {
    title: "Penasaran dengan estimasi harga untuk kebutuhanmu? Klik tombol di bawah dan mulai hitung sekarang.",
    buttonText: "HITUNG ESTIMASI HARGA",
    buttonHref: "/estimasi",
    showDecoration: true,
  },
};
