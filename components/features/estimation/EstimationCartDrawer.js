'use client';

import { useState } from "react";
import { createPortal } from "react-dom";
import EstimationSidebar from "./EstimationSidebar";

export default function EstimationCartDrawer({
  isOpen,
  onClose,
  cart,
  summary,
  updateQuantity,
  updateCartItem,
  ringboxOptions,
  bedcoverProduct,
  onEditItem,
}) {
  const [isClosing, setIsClosing] = useState(false);

  if (!isOpen || typeof document === "undefined") return null;

  const handleClose = () => {
    setIsClosing(true);
    window.setTimeout(() => {
      setIsClosing(false);
      onClose();
    }, 180);
  };

  return createPortal(
    <div className="fixed inset-0 z-[2147483647]">
      <div
        className={`absolute inset-0 bg-black ${
          isClosing ? "estimation-modal-backdrop--closing" : "estimation-modal-backdrop"
        }`}
      />
      <div
        className={`relative z-10 h-full w-full bg-black ${
          isClosing ? "estimation-modal-panel--closing" : "estimation-modal-panel"
        }`}
      >
        <EstimationSidebar
          cart={cart}
          summary={summary}
          updateQuantity={updateQuantity}
          updateCartItem={updateCartItem}
          ringboxOptions={ringboxOptions}
          bedcoverProduct={bedcoverProduct}
          onEditItem={onEditItem}
          isDrawer
          onClose={handleClose}
        />
      </div>
    </div>,
    document.body
  );
}
