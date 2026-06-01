"use client";

import {
  formatPrice,
  getAdjustedEstimationPrice,
  parsePrice,
} from "@/lib/estimationData";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { ChevronDown, Minus, Plus, X } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import RingboxSelector from "./RingboxSelector";
import { createEstimationOrder } from "@/lib/api/estimationOrders";

const getMaharAddonPlaceholder = (item) => {
  const name = item.name.toLowerCase();

  if (name.includes("perhiasan")) {
    return "Masukan Detail, Contoh : Replika Kalung & Cincin";
  }

  if (name.includes("koin")) {
    return "Masukan Detail, Contoh : Koin Rp. 500 (4 pcs)";
  }

  if (name.includes("logam") || name.includes("lm") || name.includes("emas")) {
    return "Masukan Detail, Contoh : 5gr (2 pcs)";
  }

  if (name.includes("asing") || name.includes("uang")) {
    return "Masukan Detail, Contoh : 10 US Dollar (10 pcs)";
  }

  return "Jelaskan detail custom replika yang diinginkan";
};

const formatBundlingPackageName = (name = "") => {
  const formattedName = name
    .toLowerCase()
    .split(" ")
    .filter(Boolean)
    .map((part) => (/^[ivxlcdm]+$/i.test(part) ? part.toUpperCase() : part.charAt(0).toUpperCase() + part.slice(1)))
    .join(" ");

  return `Paket ${formattedName || "Bundling"}`;
};

const getOptionLabel = (option) => {
  if (!option) return "";
  if (typeof option === "string") return option.replace(" Ringbox", "");
  return String(option.name || option.label || option.value || "").replace(" Ringbox", "");
};

function BundlingInlineSelector({ value, options = [], onChange, placeholder = "Pilih" }) {
  const [isOpen, setIsOpen] = useState(false);
  const displayValue = value || getOptionLabel(options[0]) || placeholder;

  return (
    <div className="relative z-[100]">
      <button
        type="button"
        onClick={() => setIsOpen((current) => !current)}
        className="flex h-[40px] w-[172px] cursor-pointer items-center justify-between overflow-hidden rounded-[10px] border border-[#292929] bg-[#161616] p-0 font-montserrat text-[12px] text-white transition-colors hover:border-[#D4AF37]/50"
      >
        <span className="min-w-0 flex-1 truncate pl-4 text-left">{displayValue}</span>
        <span className="flex h-full w-[40px] items-center justify-center border-l border-[#292929] bg-[#2C2C2C]">
          <ChevronDown className={`h-4 w-4 transition-transform ${isOpen ? "rotate-180" : ""}`} />
        </span>
      </button>

      {isOpen && (
        <div className="absolute left-0 top-full z-[200] mt-1 max-h-[180px] w-full overflow-y-auto rounded-[10px] border border-[#292929] bg-[#161616]">
          {options.map((option) => {
            const label = getOptionLabel(option);

            return (
              <button
                key={label}
                type="button"
                onClick={() => {
                  onChange(label);
                  setIsOpen(false);
                }}
                className="block w-full cursor-pointer px-4 py-3 text-left font-montserrat text-[12px] text-white transition-colors hover:bg-[#2C2C2C]"
              >
                {label}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default function EstimationSidebar({
  cart,
  summary,
  updateQuantity,
  updateCartItem,
  ringboxOptions = [],
  bedcoverProduct,
  onEditItem,
  isDrawer = false,
  onClose,
}) {
  const router = useRouter();
  const { subtotal, discount } = summary;
  const cartItems = Object.values(cart).filter((item) => item.quantity > 0);
  const totalTrays = cartItems.filter(item => item.id.startsWith('tray-')).reduce((sum, item) => sum + item.quantity, 0);
  const hasMaharPackage = cartItems.some((item) => item.type === "mahar");
  const hasMaharFreeBonus = hasMaharPackage && totalTrays >= 6;
  const [selectedRingbox, setSelectedRingbox] = useState(null);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isSubmittingOrder, setIsSubmittingOrder] = useState(false);
  const [showOrderSuccessModal, setShowOrderSuccessModal] = useState(false);
  const [isConfirmationOpen, setIsConfirmationOpen] = useState(false);
  const scrollAreaRef = useRef(null);
  const [scrollbarThumb, setScrollbarThumb] = useState({
    height: 0,
    top: 0,
    visible: false,
  });
  const effectiveRingbox = hasMaharFreeBonus
    ? selectedRingbox || ringboxOptions[0] || null
    : selectedRingbox;
  const maharFreeBonusItems = hasMaharFreeBonus
    ? [
        {
          name: "Kotak Mahar Asli",
          price: 65000,
          detail: "1 pcs",
        },
        {
          name: "Replika Mahar",
          price: 85000,
        },
      ]
    : [];

  const ringboxPrice = effectiveRingbox ? parsePrice(effectiveRingbox.displayPrice || effectiveRingbox.price) : 0;
  const bedcoverPrice = hasMaharFreeBonus || totalTrays > 9 ? (bedcoverProduct?.price || 0) : 0;
  const maharFreeBonusPrice = maharFreeBonusItems.reduce((sum, item) => sum + item.price, 0);
  
  // Calculate display values
  const displaySubtotal = subtotal + ringboxPrice + bedcoverPrice + maharFreeBonusPrice;
  const displayDiscount = discount + ringboxPrice + bedcoverPrice + maharFreeBonusPrice;
  const finalTotal = subtotal - discount; // Free items don't increase final cost

  // Logic to get the adjusted price per item for display in cart list
  const getAdjustedPrice = (item) => {
    return getAdjustedEstimationPrice(item, totalTrays);
  };

  useEffect(() => {
    const element = scrollAreaRef.current;
    if (!element || isDropdownOpen) {
      setScrollbarThumb((current) => ({ ...current, visible: false }));
      return undefined;
    }

    const updateScrollbar = () => {
      const { clientHeight, scrollHeight, scrollTop } = element;
      const visible = scrollHeight > clientHeight + 1;

      if (!visible) {
        setScrollbarThumb((current) =>
          current.visible ? { height: 0, top: 0, visible: false } : current
        );
        return;
      }

      const height = Math.max(32, (clientHeight / scrollHeight) * clientHeight);
      const maxTop = clientHeight - height;
      const top = maxTop > 0
        ? (scrollTop / (scrollHeight - clientHeight)) * maxTop
        : 0;

      setScrollbarThumb({
        height,
        top,
        visible: true,
      });
    };

    updateScrollbar();
    element.addEventListener("scroll", updateScrollbar, { passive: true });
    window.addEventListener("resize", updateScrollbar);

    const resizeObserver = typeof ResizeObserver !== "undefined"
      ? new ResizeObserver(updateScrollbar)
      : null;
    resizeObserver?.observe(element);

    const frame = window.requestAnimationFrame(updateScrollbar);

    return () => {
      element.removeEventListener("scroll", updateScrollbar);
      window.removeEventListener("resize", updateScrollbar);
      resizeObserver?.disconnect();
      window.cancelAnimationFrame(frame);
    };
  }, [cart, displayDiscount, displaySubtotal, isDropdownOpen, selectedRingbox]);

  const renderCompactCounter = (item) => (
    <div className="flex items-center w-[120px] h-[35px] rounded-[10px] border border-[#212121] relative">
      <button
        onClick={() => updateQuantity(item.id, -1)}
        className="w-[35px] h-full bg-[#252525] rounded-l-[9px] flex items-center justify-center transition-all hover:bg-[#303030] cursor-pointer"
      >
        <Minus className="w-6 h-6 text-[#FFF]" />
      </button>
      <div className="flex-1 h-full bg-[#161616] flex items-center justify-center border-l border-r border-[#212121]">
        <input
          type="number"
          value={item.quantity}
          onChange={(e) => {
            const val = parseInt(e.target.value);
            if (!isNaN(val)) updateQuantity(item.id, val - item.quantity);
          }}
          className="w-full h-full bg-transparent text-center font-montserrat font-semibold text-white text-[12px] outline-none [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
        />
      </div>
      <div className="relative h-full flex group/tooltip">
        <button
          onClick={() => updateQuantity(item.id, 1)}
          disabled={item.id.startsWith("tray-") && item.quantity >= 11}
          className={`w-[35px] h-full flex items-center justify-center rounded-r-[9px] transition-all ${item.id.startsWith("tray-") && item.quantity >= 11 ? "bg-[#777] cursor-not-allowed" : "bg-[#252525] cursor-pointer hover:bg-[#303030] active:scale-95"}`}
        >
          <Plus className="w-6 h-6 text-[#FFF]" />
        </button>

        {item.id.startsWith("tray-") && item.quantity >= 11 && (
          <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-[180px] p-2 bg-[#252525] text-white text-[11px] leading-snug font-montserrat font-medium text-center rounded-[8px] shadow-xl border border-white/10 opacity-0 invisible -translate-y-2 group-hover/tooltip:opacity-100 group-hover/tooltip:visible group-hover/tooltip:translate-y-0 transition-all duration-300 z-[9999] pointer-events-none">
            <div className="absolute bottom-full left-1/2 -translate-x-1/2 border-4 border-transparent border-b-[#252525]"></div>
            1 Jenis Tray maksimal hanya bisa disewa sebanyak 11 Tray
          </div>
        )}
      </div>
    </div>
  );

  const renderRequestField = (item, placeholder = "Tulis Request warna...") => {
    const requestValue = item.requestNoteDraft ?? item.requestNote ?? "";
    const isEditingRequest = item.isEditingRequestNote || !item.requestNote;

    if (!isEditingRequest) {
      return (
        <div className="mt-[4px] flex items-center gap-[8px] font-montserrat text-[14px] leading-[20px] text-white">
          <span className="min-w-0">{item.requestNote}</span>
          <button
            type="button"
            onClick={() =>
              updateCartItem?.(item.id, {
                requestNoteDraft: item.requestNote,
                isEditingRequestNote: true,
              })
            }
            className="shrink-0 cursor-pointer text-[#D4AF37] underline underline-offset-2 transition-colors hover:text-[#E6C45A]"
          >
            Ubah
          </button>
        </div>
      );
    }

    return (
      <>
        <textarea
          value={requestValue}
          onChange={(event) =>
            updateCartItem?.(item.id, {
              requestNoteDraft: event.target.value,
            })
          }
          placeholder={placeholder}
          className="mt-[8px] h-[90px] w-full resize-none rounded-[5px] bg-[#252525] px-4 py-3 font-montserrat text-[13px] not-italic leading-[20px] text-white outline-none placeholder:italic placeholder:text-[#969696] focus:ring-1 focus:ring-[#D4AF37]/60"
        />

        <div className="mt-[14px] flex justify-end">
          <button
            type="button"
            onClick={() =>
              updateCartItem?.(item.id, {
                requestNote: requestValue,
                requestNoteDraft: requestValue,
                isEditingRequestNote: false,
              })
            }
            className="cursor-pointer font-montserrat text-[14px] leading-[18px] text-[#D4AF37] underline underline-offset-2 transition-colors hover:text-[#E6C45A]"
          >
            Simpan
          </button>
        </div>
      </>
    );
  };

  const getBundlingOrderDetails = (item) => {
    const packageItems = Array.isArray(item.items) ? item.items : [];
    const wccItem = packageItems.find((bundleItem) =>
      String(bundleItem.name || "").toLowerCase().includes("content creator")
    );
    const trayItem = packageItems.find((bundleItem) =>
      String(bundleItem.name || "").toLowerCase().includes("seserahan")
    );
    const trayOptions = Array.isArray(trayItem?.options) ? trayItem.options : [];
    const defaultTray = trayOptions.find((option) => String(option).toLowerCase().includes("kurogane"))
      || trayOptions[0]
      || "Kurogane";
    const ringboxOptionsForBundling = ringboxOptions.length > 0
      ? ringboxOptions
      : ["Sora", "Haku", "Shiro", "Kuro"];
    const defaultRingbox = ringboxOptionsForBundling.find((option) =>
      getOptionLabel(option).toLowerCase().includes("sora")
    ) || ringboxOptionsForBundling[0];
    const bonusItems = (Array.isArray(item.bonus) ? item.bonus : []).map((bonus) => String(bonus));

    return {
      packageItems,
      wccItem,
      trayItem,
      selectedTray: item.selectedBundlingTray || getOptionLabel(defaultTray),
      selectedRingbox: item.selectedBundlingRingbox || getOptionLabel(defaultRingbox),
      bonusItems,
      hasBedcover: bonusItems.some((bonus) => bonus.toLowerCase().includes("bedcover")),
      hasRingbox: bonusItems.some((bonus) => bonus.toLowerCase().includes("ringbox")),
      hasTransport: bonusItems.some((bonus) => bonus.toLowerCase().includes("transport")) || Boolean(wccItem),
    };
  };

  const formatOrderItem = (item, idx) => {
    const adjustedPrice = getAdjustedPrice(item);
    const itemTotal = adjustedPrice * item.quantity;
    const itemNumber = `${idx + 1}.`;

    if (item.type === "bundling-package") {
      const {
        packageItems,
        wccItem,
        trayItem,
        selectedTray,
        selectedRingbox,
        bonusItems,
        hasBedcover,
        hasRingbox,
        hasTransport,
      } = getBundlingOrderDetails(item);
      const extraPackageItems = packageItems.filter(
        (packageItem) => packageItem !== wccItem && packageItem !== trayItem
      );
      const shownBonusKeywords = ["bedcover", "ringbox", "transport"];
      const remainingBonuses = bonusItems.filter((bonus) =>
        !shownBonusKeywords.some((keyword) => bonus.toLowerCase().includes(keyword))
      );

      return [
        `${itemNumber} ${formatBundlingPackageName(item.name)} - ${formatPrice(item.price)}`,
        item.originalPrice ? `   Harga normal: ${item.originalPrice}` : "",
        wccItem ? `   WCC: ${wccItem.note || wccItem.name}` : "",
        trayItem ? `   Seserahan: 8 Tray (${selectedTray})` : "",
        ...extraPackageItems.map((packageItem) => {
          const detail = [
            packageItem.note,
            Array.isArray(packageItem.options) && packageItem.options.length > 0
              ? packageItem.options.join(" / ")
              : "",
            Array.isArray(packageItem.listItems) && packageItem.listItems.length > 0
              ? packageItem.listItems.join(" / ")
              : "",
          ].filter(Boolean).join(" - ");

          return `   ${packageItem.name}${detail ? `: ${detail}` : ""}`;
        }),
        hasBedcover ? "   Free: Hias Bedcover (1 pcs)" : "",
        hasRingbox ? `   Free: Sewa Ringbox (${selectedRingbox})` : "",
        hasTransport ? "   Free: Transport for WCC" : "",
        ...remainingBonuses.map((bonus) => `   Free: ${bonus}`),
      ].filter(Boolean).join("\n");
    }

    const variantSize = item.selectedVariant?.size || item.selectedVariant?.label || item.selectedVariant?.name;
    const requestNote = item.requestNote || item.requestNoteDraft;
    const replicaDetail = item.replicaDetail || item.replicaDetailDraft;
    const lines = [
      `${itemNumber} ${item.name} (${item.quantity}x) - ${formatPrice(itemTotal)}`,
    ];

    if (variantSize) {
      lines.push(`   Size: ${variantSize}`);
    }

    if (replicaDetail && item.type === "mahar-addon") {
      lines.push(`   Detail: ${replicaDetail}`);
    }

    if (
      requestNote &&
      (item.id?.startsWith("keepsake-") || item.id?.startsWith("bouquet-") || item.type === "wcc-package")
    ) {
      lines.push(`   Request: ${requestNote}`);
    }

    if (item.type === "wcc-package") {
      lines[0] = `${itemNumber} WCC ${item.name} (${item.quantity}x) - ${formatPrice(itemTotal)}`;
    }

    if (item.id?.startsWith("tray-")) {
      lines.push(`   Harga satuan: ${formatPrice(adjustedPrice)}`);
      if (adjustedPrice !== item.price) {
        lines.push(`   Harga normal satuan: ${formatPrice(item.price)}`);
      }
    }

    return lines.join("\n");
  };

  const buildOrderItemPayload = (item) => {
    const adjustedPrice = getAdjustedPrice(item);
    const details = {};
    const variantSize = item.selectedVariant?.size || item.selectedVariant?.label || item.selectedVariant?.name;
    const requestNote = item.requestNote || item.requestNoteDraft;
    const replicaDetail = item.replicaDetail || item.replicaDetailDraft;

    if (variantSize) details.size = variantSize;
    if (replicaDetail && item.type === "mahar-addon") details.replicaDetail = replicaDetail;
    if (
      requestNote &&
      (item.id?.startsWith("keepsake-") || item.id?.startsWith("bouquet-") || item.type === "wcc-package")
    ) {
      details.request = requestNote;
    }

    if (item.type === "bundling-package") {
      const bundlingDetails = getBundlingOrderDetails(item);
      details.packageName = formatBundlingPackageName(item.name);
      details.normalPrice = item.originalPrice || formatPrice(item.originalPriceValue || item.price);
      details.wcc = bundlingDetails.wccItem?.note || bundlingDetails.wccItem?.name || null;
      details.seserahanTray = bundlingDetails.trayItem ? `8 Tray (${bundlingDetails.selectedTray})` : null;
      details.selectedTray = bundlingDetails.selectedTray;
      details.selectedRingbox = bundlingDetails.selectedRingbox;
      details.freeItems = [
        bundlingDetails.hasBedcover ? "Hias Bedcover (1 pcs)" : null,
        bundlingDetails.hasRingbox ? `Sewa Ringbox (${bundlingDetails.selectedRingbox})` : null,
        bundlingDetails.hasTransport ? "Transport for WCC" : null,
        ...bundlingDetails.bonusItems.filter((bonus) =>
          !["bedcover", "ringbox", "transport"].some((keyword) => bonus.toLowerCase().includes(keyword))
        ),
      ].filter(Boolean);
      details.packageItems = bundlingDetails.packageItems.map((packageItem) => ({
        name: packageItem.name,
        note: packageItem.note || "",
        options: packageItem.options || [],
        listItems: packageItem.listItems || [],
      }));
    }

    if (item.id?.startsWith("tray-")) {
      details.unitPriceBeforeDiscount = item.price;
      details.unitPriceAfterDiscount = adjustedPrice;
    }

    return {
      id: item.id,
      name: item.type === "wcc-package" ? `WCC ${item.name}` : item.name,
      type: item.type || "standard",
      quantity: item.quantity,
      unitPrice: adjustedPrice,
      totalPrice: adjustedPrice * item.quantity,
      details,
    };
  };

  const buildOrderMessage = (bonusText) => (
    `Halo Momento, saya ingin melakukan pemesanan untuk paket berikut:\n\n` +
    `*Rincian Pesanan:*\n` +
    cartItems.map(formatOrderItem).join("\n\n") +
    bonusText +
    `\n\n*Ringkasan Biaya:*\n` +
    `- Subtotal: ${formatPrice(displaySubtotal)}\n` +
    `- Diskon: -${formatPrice(displayDiscount)}\n` +
    `- Total Estimasi: *${formatPrice(finalTotal)}*\n\n` +
    `Terima kasih!`
  );

  const handleOrder = () => {
    if (cartItems.length === 0 || isSubmittingOrder) return;
    setIsConfirmationOpen(true);
  };

  const handleConfirmOrder = async () => {
    if (cartItems.length === 0 || isSubmittingOrder) return;

    const bonusItems = [];
    if (effectiveRingbox) {
      bonusItems.push(`- Ringbox: ${effectiveRingbox.name} (~${effectiveRingbox.displayPrice || formatPrice(effectiveRingbox.price)}~ Free)`);
    }
    if ((hasMaharFreeBonus || totalTrays > 9) && bedcoverProduct) {
      bonusItems.push(`- ${bedcoverProduct.name} (~${bedcoverProduct.displayPrice || formatPrice(bedcoverProduct.price)}~ Free)`);
    }
    maharFreeBonusItems.forEach((item) => {
      bonusItems.push(`- ${item.name} (~${formatPrice(item.price)}~ Free)`);
    });
    
    const bonusText = bonusItems.length > 0 ? `\n\n*Bonus & Tambahan:*\n${bonusItems.join("\n")}` : "";
    const orderMessage = buildOrderMessage(bonusText);

    try {
      setIsSubmittingOrder(true);
      await createEstimationOrder({
        items: cartItems.map(buildOrderItemPayload),
        summary: {
          subtotal: displaySubtotal,
          discount: displayDiscount,
          total: finalTotal,
          bonuses: bonusItems,
        },
        whatsappMessage: orderMessage,
        source: "estimation_page",
      });

      window.location.assign(`https://wa.me/6285117797966?text=${encodeURIComponent(orderMessage)}`);
    } catch (error) {
      setIsSubmittingOrder(false);
      window.alert(error.message || "Gagal menyimpan pesanan. Silakan coba lagi.");
    }
  };

  const closeOrderSuccessModal = () => {
    setShowOrderSuccessModal(false);
    router.push("/harga");
  };

  const renderMaharFreeBonuses = () => {
    if (!hasMaharFreeBonus) return null;

    return (
      <div className="ml-[40px]">
        {ringboxOptions.length > 0 && (
          <RingboxSelector
            selectedRingbox={effectiveRingbox}
            onSelect={setSelectedRingbox}
            onOpenChange={setIsDropdownOpen}
            items={ringboxOptions}
          />
        )}

        {bedcoverProduct && (
          <div className="mt-4 flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <span className="text-white font-montserrat font-bold text-[14px]">
                {bedcoverProduct.name || "Hias Bedcover"}
              </span>
              <span className="text-white font-montserrat font-medium text-[12px]">Free</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-white/60 font-montserrat text-[12px]">1 pcs</span>
              <span className="text-white font-montserrat font-bold text-[14px]">
                {bedcoverProduct.displayPrice || formatPrice(bedcoverPrice)}
              </span>
            </div>
          </div>
        )}

        {maharFreeBonusItems.map((bonusItem) => (
          <div key={bonusItem.name} className="mt-4 flex flex-col gap-1">
            <div className="flex justify-between items-center">
              <span className="text-white font-montserrat font-bold text-[14px]">
                {bonusItem.name}
              </span>
              <span className="text-white font-montserrat font-medium text-[12px]">Free</span>
            </div>
            <div className="flex justify-between items-center">
              {bonusItem.detail ? (
                <span className="text-white/60 font-montserrat text-[12px]">
                  {bonusItem.detail}
                </span>
              ) : (
                <span />
              )}
              <span className="text-white font-montserrat font-bold text-[14px]">
                {formatPrice(bonusItem.price)}
              </span>
            </div>
          </div>
        ))}
      </div>
    );
  };

  return (
    <aside className={isDrawer ? "h-full w-full" : "w-full lg:w-[400px] flex-shrink-0 lg:self-start lg:sticky lg:top-[100px]"}>
      <div className={`${isDrawer ? "h-full min-h-0 rounded-none bg-black p-[28px]" : "h-[calc(100vh-140px)] min-h-[500px] rounded-[20px] bg-[#161616] p-[25px]"} flex flex-col`}>
        <div className={`${isDrawer ? "mb-6 flex items-center justify-between border-b border-[#292929] pb-[36px] pt-[8px]" : "mb-6 border-b border-[#292929] pb-6"}`}>
          <h2 className="text-[20px] font-montserrat font-bold text-white">
            Estimasi Harga
          </h2>
          {isDrawer && (
            <button
              type="button"
              onClick={onClose}
              className="cursor-pointer text-white transition-opacity hover:opacity-75"
              aria-label="Tutup cart"
            >
              <X className="h-8 w-8" />
            </button>
          )}
        </div>

        {/* Selected Items List */}
        <div className="relative mb-8 min-h-0 flex-1">
          <div
            ref={scrollAreaRef}
            className={`h-full space-y-6 pr-4 custom-scrollbar overflow-x-hidden ${isDropdownOpen ? 'overflow-visible' : 'overflow-y-auto'}`}
          >
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center opacity-30 py-10">
                <p className="text-white font-montserrat italic text-[14px]">
                  Belum ada produk yang dipilih
                </p>
              </div>
            ) : (
              cartItems.map((item) => {
              const adjustedPrice = getAdjustedPrice(item);
              const isTray = item.id.startsWith("tray-");
              const isMaharItem = item.type === "mahar" || item.type === "mahar-addon";
              const isKeepsakeBouquetItem = item.id.startsWith("keepsake-") || item.id.startsWith("bouquet-");
              const isWccPackageItem = item.type === "wcc-package";
              const isBundlingPackageItem = item.type === "bundling-package";

              if (isMaharItem) {
                const isMaharPackage = item.type === "mahar";
                const variantLabel = item.selectedVariant
                  ? `Size ${item.selectedVariant.size || item.selectedVariant.label || item.selectedVariant.name}`
                  : item.displayPrice;

                if (isMaharPackage) {
                  return (
                    <div key={item.id} className="flex flex-col">
                      <div className="flex gap-4 items-start">
                        <button
                          onClick={() => updateQuantity(item.id, -item.quantity)}
                          className="mt-[2px] cursor-pointer transition-opacity hover:opacity-80"
                        >
                          <Image src="/icons/estimation/delete-icon.svg" alt="Delete" width={24} height={24} />
                        </button>

                        <div className="flex min-w-0 flex-1 items-start justify-between gap-4">
                          <div className="min-w-0">
                            <p className="font-montserrat text-[14px] font-bold leading-[18px] text-white">
                              {item.name}
                            </p>
                            <div className="mt-[4px] flex items-center gap-[5px] font-montserrat text-[12px] leading-[18px] text-white">
                              <span>{variantLabel}</span>
                              {item.selectedVariant && (
                                <button
                                  type="button"
                                  onClick={() => onEditItem?.(item)}
                                  className="cursor-pointer text-[#D4AF37] underline underline-offset-2 transition-colors hover:text-[#E6C45A]"
                                >
                                  Ubah
                                </button>
                              )}
                            </div>
                          </div>

                          <span className="shrink-0 font-montserrat text-[14px] font-bold leading-[18px] text-white">
                            {formatPrice(adjustedPrice * item.quantity)}
                          </span>
                        </div>
                      </div>
                      {renderMaharFreeBonuses()}
                    </div>
                  );
                }

                const replicaDetailValue = item.replicaDetailDraft ?? item.replicaDetail ?? "";
                const isEditingReplicaDetail = item.isEditingReplicaDetail || !item.replicaDetail;

                return (
                  <div key={item.id} className="flex gap-4 items-start">
                    <button
                      onClick={() => updateQuantity(item.id, -item.quantity)}
                      className="mt-[2px] cursor-pointer transition-opacity hover:opacity-80"
                    >
                      <Image src="/icons/estimation/delete-icon.svg" alt="Delete" width={24} height={24} />
                    </button>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <span className="min-w-0 font-montserrat text-[14px] font-bold leading-[18px] text-white">
                          {item.name}
                        </span>
                        <span className="shrink-0 font-montserrat text-[14px] font-bold leading-[18px] text-white">
                          {formatPrice(adjustedPrice * item.quantity)}
                        </span>
                      </div>

                      {isEditingReplicaDetail ? (
                        <>
                          <textarea
                            value={replicaDetailValue}
                            onChange={(event) =>
                              updateCartItem?.(item.id, {
                                replicaDetailDraft: event.target.value,
                              })
                            }
                            placeholder={getMaharAddonPlaceholder(item)}
                            className="mt-[8px] h-[90px] w-full resize-none rounded-[5px] bg-[#252525] px-4 py-3 font-montserrat text-[13px] not-italic leading-[20px] text-white outline-none placeholder:italic placeholder:text-[#969696] focus:ring-1 focus:ring-[#D4AF37]/60"
                          />

                          <div className="mt-[14px] flex justify-end">
                            <button
                              type="button"
                              onClick={() =>
                                updateCartItem?.(item.id, {
                                  replicaDetail: replicaDetailValue,
                                  replicaDetailDraft: replicaDetailValue,
                                  isEditingReplicaDetail: false,
                                })
                              }
                              className="cursor-pointer font-montserrat text-[14px] leading-[18px] text-[#D4AF37] underline underline-offset-2 transition-colors hover:text-[#E6C45A]"
                            >
                              Simpan
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="mt-[4px] flex items-center gap-[8px] font-montserrat text-[14px] leading-[20px] text-white">
                          <span className="min-w-0">{item.replicaDetail}</span>
                          <button
                            type="button"
                            onClick={() =>
                              updateCartItem?.(item.id, {
                                replicaDetailDraft: item.replicaDetail,
                                isEditingReplicaDetail: true,
                              })
                            }
                            className="shrink-0 cursor-pointer text-[#D4AF37] underline underline-offset-2 transition-colors hover:text-[#E6C45A]"
                          >
                            Ubah
                          </button>
                        </div>
                      )}

                      <div className={`${isEditingReplicaDetail ? "mt-[18px]" : "mt-[16px]"} flex h-[35px] w-[120px] items-center rounded-[10px] border border-[#212121] relative`}>
                        <button
                          onClick={() => updateQuantity(item.id, -1)}
                          className="flex h-full w-[35px] cursor-pointer items-center justify-center rounded-l-[9px] bg-[#252525] transition-all hover:bg-[#303030]"
                        >
                          <Minus className="h-6 w-6 text-white" />
                        </button>
                        <div className="flex h-full flex-1 items-center justify-center border-l border-r border-[#212121] bg-[#161616]">
                          <input
                            type="number"
                            value={item.quantity}
                            onChange={(event) => {
                              const value = parseInt(event.target.value);
                              if (!isNaN(value)) updateQuantity(item.id, value - item.quantity);
                            }}
                            className="h-full w-full bg-transparent text-center font-montserrat text-[12px] font-semibold text-white outline-none [appearance:textfield] [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none"
                          />
                        </div>
                        <button
                          onClick={() => updateQuantity(item.id, 1)}
                          className="flex h-full w-[35px] cursor-pointer items-center justify-center rounded-r-[9px] bg-[#252525] transition-all hover:bg-[#303030] active:scale-95"
                        >
                          <Plus className="h-6 w-6 text-white" />
                        </button>
                      </div>
                    </div>
                  </div>
                );
              }

              if (isKeepsakeBouquetItem) {
                const isEditingRequest = item.isEditingRequestNote || !item.requestNote;

                return (
                  <div key={item.id} className="flex gap-4 items-start">
                    <button
                      onClick={() => updateQuantity(item.id, -item.quantity)}
                      className="mt-[2px] cursor-pointer transition-opacity hover:opacity-80"
                    >
                      <Image src="/icons/estimation/delete-icon.svg" alt="Delete" width={24} height={24} />
                    </button>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <span className="min-w-0 font-montserrat text-[14px] font-bold leading-[18px] text-white">
                          {item.name}
                        </span>
                        <span className="shrink-0 font-montserrat text-[14px] font-bold leading-[18px] text-white">
                          {formatPrice(adjustedPrice * item.quantity)}
                        </span>
                      </div>

                      {renderRequestField(item)}

                      <div className={`${isEditingRequest ? "mt-[18px]" : "mt-[16px]"}`}>
                        {renderCompactCounter(item)}
                      </div>
                    </div>
                  </div>
                );
              }

              if (isWccPackageItem) {
                return (
                  <div key={item.id} className="flex gap-4 items-start">
                    <button
                      onClick={() => updateQuantity(item.id, -item.quantity)}
                      className="mt-[2px] cursor-pointer transition-opacity hover:opacity-80"
                    >
                      <Image src="/icons/estimation/delete-icon.svg" alt="Delete" width={24} height={24} />
                    </button>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <span className="min-w-0 font-montserrat text-[14px] font-bold leading-[18px] text-white">
                          WCC {item.name}
                        </span>
                        <span className="shrink-0 font-montserrat text-[14px] font-bold leading-[18px] text-white">
                          {formatPrice(adjustedPrice * item.quantity)}
                        </span>
                      </div>

                      {renderRequestField(item, "Tuliskan jenis acaramu....")}
                    </div>
                  </div>
                );
              }

              if (isBundlingPackageItem) {
                const packageItems = Array.isArray(item.items) ? item.items : [];
                const wccItem = packageItems.find((bundleItem) =>
                  String(bundleItem.name || "").toLowerCase().includes("content creator")
                );
                const trayItem = packageItems.find((bundleItem) =>
                  String(bundleItem.name || "").toLowerCase().includes("seserahan")
                );
                const trayOptions = Array.isArray(trayItem?.options) ? trayItem.options : [];
                const defaultTray = trayOptions.find((option) => String(option).toLowerCase().includes("kurogane"))
                  || trayOptions[0]
                  || "Kurogane";
                const ringboxOptionsForBundling = ringboxOptions.length > 0
                  ? ringboxOptions
                  : ["Sora", "Haku", "Shiro", "Kuro"];
                const defaultRingbox = ringboxOptionsForBundling.find((option) =>
                  getOptionLabel(option).toLowerCase().includes("sora")
                ) || ringboxOptionsForBundling[0];
                const bonusItems = (Array.isArray(item.bonus) ? item.bonus : []).map((bonus) => String(bonus));
                const hasBedcover = bonusItems.some((bonus) => bonus.toLowerCase().includes("bedcover"));
                const hasRingbox = bonusItems.some((bonus) => bonus.toLowerCase().includes("ringbox"));
                const hasTransport = bonusItems.some((bonus) => bonus.toLowerCase().includes("transport")) || Boolean(wccItem);

                return (
                  <div key={item.id} className="flex gap-4 items-start">
                    <button
                      onClick={() => updateQuantity(item.id, -item.quantity)}
                      className="mt-[2px] cursor-pointer transition-opacity hover:opacity-80"
                    >
                      <Image src="/icons/estimation/delete-icon.svg" alt="Delete" width={24} height={24} />
                    </button>

                    <div className="min-w-0 flex-1">
                      <div className="flex items-start justify-between gap-4">
                        <span className="min-w-0 font-montserrat text-[14px] font-bold leading-[18px] text-white">
                          {formatBundlingPackageName(item.name)}
                        </span>
                        <span className="shrink-0 font-montserrat text-[14px] font-bold leading-[18px] text-white">
                          {item.originalPrice || formatPrice((item.originalPriceValue || adjustedPrice) * item.quantity)}
                        </span>
                      </div>

                      {wccItem && (
                        <p className="mt-[16px] font-montserrat text-[14px] font-bold leading-[18px] text-white">
                          WCC {wccItem.note || "Package"}
                        </p>
                      )}

                      {trayItem && (
                        <div className="mt-[16px]">
                          <p className="mb-[8px] font-montserrat text-[14px] font-bold leading-[18px] text-white">
                            8 Tray Seserahan
                          </p>
                          <BundlingInlineSelector
                            value={item.selectedBundlingTray || getOptionLabel(defaultTray)}
                            options={trayOptions.length > 0 ? trayOptions : [defaultTray]}
                            onChange={(value) =>
                              updateCartItem?.(item.id, { selectedBundlingTray: value })
                            }
                          />
                        </div>
                      )}

                      {hasBedcover && (
                        <div className="mt-[18px]">
                          <div className="flex items-center justify-between gap-4">
                            <p className="font-montserrat text-[14px] font-bold leading-[18px] text-white">
                              Hias Bedcover
                            </p>
                            <span className="font-montserrat text-[14px] font-bold leading-[18px] text-white">
                              Free
                            </span>
                          </div>
                          <p className="mt-[4px] font-montserrat text-[12px] leading-[18px] text-white/65">
                            1 pcs
                          </p>
                        </div>
                      )}

                      {hasRingbox && (
                        <div className="mt-[18px]">
                          <div className="mb-[8px] flex items-center justify-between gap-4">
                            <p className="font-montserrat text-[14px] font-bold leading-[18px] text-white">
                              Sewa Ringbox
                            </p>
                            <span className="font-montserrat text-[14px] font-bold leading-[18px] text-white">
                              Free
                            </span>
                          </div>
                          <BundlingInlineSelector
                            value={item.selectedBundlingRingbox || getOptionLabel(defaultRingbox)}
                            options={ringboxOptionsForBundling}
                            onChange={(value) =>
                              updateCartItem?.(item.id, { selectedBundlingRingbox: value })
                            }
                          />
                        </div>
                      )}

                      {hasTransport && (
                        <div className="mt-[20px] flex items-center justify-between gap-4">
                          <p className="font-montserrat text-[14px] font-bold leading-[18px] text-white">
                            Transport for WCC
                          </p>
                          <span className="font-montserrat text-[14px] font-bold leading-[18px] text-white">
                            Free
                          </span>
                        </div>
                      )}
                    </div>
                  </div>
                );
              }

              return (
                <div key={item.id} className="flex flex-col gap-0">
                  <div className="flex gap-4 items-center">
                    {/* Trash Icon */}
                    <button 
                      onClick={() => updateQuantity(item.id, -item.quantity)}
                      className="hover:opacity-80 transition-opacity cursor-pointer"
                    >
                      <Image src="/icons/estimation/delete-icon.svg" alt="Delete" width={24} height={24} />
                    </button>

                    <div className="flex-1 space-y-3">
                      {/* Row 1: Name (Left) and Unit Price (Right) */}
                      <div className="flex justify-between items-center">
                        <span className="text-white font-montserrat font-bold text-[14px]">
                          {item.name}
                        </span>
                        <span className="text-[#FFF] font-montserrat font-normal text-[14px]">
                          {formatPrice(adjustedPrice)}
                        </span>
                      </div>

                      {/* Row 2: Counter (Left) and Subtotal (Right) */}
                      <div className="flex justify-between items-center">
                        {/* Compact Counter */}
                        {renderCompactCounter(item)}

                        <span className="text-white font-montserrat font-bold text-[14px]">
                          {formatPrice(adjustedPrice * item.quantity)}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  {/* Ringbox Selector and Bedcover rendered immediately below the tray item */}
                  {isTray && (
                    <div className="ml-[40px]">
                      {totalTrays >= 8 && !hasMaharFreeBonus && (
                        <RingboxSelector 
                          selectedRingbox={selectedRingbox} 
                          onSelect={setSelectedRingbox}
                          onOpenChange={setIsDropdownOpen}
                          items={ringboxOptions}
                        />
                      )}
                      
                      {totalTrays > 9 && !hasMaharFreeBonus && bedcoverProduct && (
                        <div className="mt-4 flex flex-col gap-1">
                          <div className="flex justify-between items-center">
                            <span className="text-white font-montserrat font-bold text-[14px]">{bedcoverProduct?.name || "Hias Bedcover"}</span>
                            <span className="text-white font-montserrat font-medium text-[12px]">Free</span>
                          </div>
                          <div className="flex justify-between items-center">
                            <span className="text-white/60 font-montserrat text-[12px]">1 pcs</span>
                            <span className="text-white font-montserrat font-bold text-[14px]">
                              {bedcoverProduct?.displayPrice || formatPrice(bedcoverPrice)}
                            </span>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              );
              })
            )}
          </div>
          {scrollbarThumb.visible && !isDropdownOpen && (
            <div className="pointer-events-none absolute right-0 top-0 h-full w-[5px] bg-transparent">
              <div
                className="w-full rounded-full bg-[#969696]"
                style={{
                  height: `${scrollbarThumb.height}px`,
                  transform: `translateY(${scrollbarThumb.top}px)`,
                }}
              />
            </div>
          )}
        </div>

        {/* Footer Sidebar */}
        <div className="mt-auto pt-8 border-t border-white/10 space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-white font-montserrat text-[12px]">Subtotal</span>
            <span className="text-white font-montserrat font-bold text-[12px]">{formatPrice(displaySubtotal)}</span>
          </div>
          {displayDiscount > 0 && (
            <div className="flex justify-between items-center">
              <span className="text-white font-montserrat text-[12px]">Diskon</span>
              <span className="text-white font-montserrat italic text-[12px] tracking-[0px]">-{formatPrice(displayDiscount)}</span>
            </div>
          )}
          <div className="flex justify-between items-center pt-4 border-t border-[#292929]">
            <span className="text-white font-montserrat font-semibold text-[20px] tracking-[-2.5%]">Total :</span>
            <span className="text-white font-montserrat font-bold text-[20px] tracking-[-2.5%]">{formatPrice(finalTotal)}</span>
          </div>

          <button
            onClick={handleOrder}
            disabled={cartItems.length === 0 || isSubmittingOrder}
            className={`w-full py-[15px] rounded-[12px] font-montserrat font-bold text-[16px] transition-all duration-300 shadow-2xl ${
              isSubmittingOrder
                ? "btn-gold cursor-wait"
                : cartItems.length > 0
                ? "btn-gold cursor-pointer hover:scale-[1.02] active:scale-[0.98] hover:shadow-gold/20"
                : "bg-white/5 text-white/20 cursor-not-allowed"
            }`}
          >
            {isSubmittingOrder ? (
              <span className="inline-flex items-center justify-center gap-2">
                <span className="h-4 w-4 animate-spin rounded-full border-2 border-black/30 border-t-black" />
                Menyimpan...
              </span>
            ) : (
              "Pesan Sekarang"
            )}
          </button>

          <p className="text-white/30 font-montserrat italic text-[10px] md:text-[12px] mt-4 text-center leading-relaxed">
            *Untuk Sementara, kamu akan otomatis diarahkan ke whatsapp admin untuk pemesanan
          </p>
        </div>
      </div>
      {isConfirmationOpen && (
        <div className="fixed inset-0 z-[2147483647] flex items-center justify-center bg-black/75 px-5 backdrop-blur-[4px]">
          <div className="w-full max-w-[390px] rounded-[18px] border border-[#D4AF37]/25 bg-[#161616] p-6 shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
            <h3 className="font-montserrat text-[18px] font-bold leading-[25px] text-white">
              Konfirmasi Pesanan
            </h3>
            <p className="mt-3 font-montserrat text-[13px] leading-[21px] text-[#bdbdbd]">
              Pastikan rincian pesanan dan total estimasi sudah benar sebelum pesanan disimpan dan diarahkan ke WhatsApp admin.
            </p>

            <div className="my-6 rounded-[14px] border border-white/10 bg-black/20 p-4 space-y-3">
              <div className="flex items-center justify-between gap-4">
                <span className="font-montserrat text-[12px] text-white/60">Jumlah item</span>
                <span className="font-montserrat text-[13px] font-bold text-white">{cartItems.length}</span>
              </div>
              <div className="flex items-center justify-between gap-4 border-t border-white/10 pt-3">
                <span className="font-montserrat text-[12px] text-white/60">Total estimasi</span>
                <span className="font-montserrat text-[16px] font-bold text-[#D4AF37]">{formatPrice(finalTotal)}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => setIsConfirmationOpen(false)}
                disabled={isSubmittingOrder}
                className="h-[46px] cursor-pointer rounded-[10px] border border-white/10 font-montserrat text-[13px] font-bold text-white transition-colors hover:bg-white/10 disabled:cursor-wait disabled:opacity-50"
              >
                Batal
              </button>
              <button
                type="button"
                onClick={handleConfirmOrder}
                disabled={isSubmittingOrder}
                className="h-[46px] cursor-pointer rounded-[10px] bg-[#D4AF37] font-montserrat text-[13px] font-bold text-black transition-colors hover:bg-[#E6C45A] disabled:cursor-wait disabled:opacity-80"
              >
                {isSubmittingOrder ? "Menyimpan..." : "Konfirmasi"}
              </button>
            </div>
          </div>
        </div>
      )}
      {showOrderSuccessModal && (
        <div className="fixed inset-0 z-[2147483647] flex items-center justify-center bg-black/75 px-5 backdrop-blur-[4px]">
          <div className="w-full max-w-[390px] rounded-[18px] border border-[#D4AF37]/25 bg-[#161616] p-6 text-center shadow-[0_24px_80px_rgba(0,0,0,0.45)]">
            <div className="mx-auto mb-5 flex h-[52px] w-[52px] items-center justify-center rounded-full bg-[#D4AF37]/12 text-[#D4AF37]">
              <svg aria-hidden="true" viewBox="0 0 24 24" className="h-7 w-7" fill="none">
                <path
                  d="M5 12.5L9.2 16.5L19 7"
                  stroke="currentColor"
                  strokeWidth="2.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="font-montserrat text-[18px] font-bold leading-[25px] text-white">
              Terimakasih telah melakukan pesanan
            </h3>
            <p className="mt-3 font-montserrat text-[13px] leading-[21px] text-[#bdbdbd]">
              Silahkan lanjutkan pada pesan WhatsApp kami.
            </p>
            <button
              type="button"
              onClick={closeOrderSuccessModal}
              className="mt-6 h-[46px] w-full cursor-pointer rounded-[10px] bg-[#D4AF37] font-montserrat text-[13px] font-bold text-black transition-colors hover:bg-[#E6C45A]"
            >
              Tutup
            </button>
          </div>
        </div>
      )}
    </aside>
  );
}
