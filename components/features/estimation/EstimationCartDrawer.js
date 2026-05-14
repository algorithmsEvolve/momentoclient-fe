'use client';

import { X } from "lucide-react";
import EstimationSidebar from "./EstimationSidebar";

export default function EstimationCartDrawer({ isOpen, onClose, cart, summary, updateQuantity }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Drawer */}
      <div className="relative w-[90%] max-w-[400px] h-full bg-[#161616] shadow-2xl flex flex-col animate-in slide-in-from-right duration-300">
        <div className="p-4 border-b border-[#292929] flex items-center justify-between">
            <span className="text-white font-montserrat font-bold">Cart</span>
            <button onClick={onClose} className="text-white">
                <X className="w-6 h-6" />
            </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4">
            <EstimationSidebar cart={cart} summary={summary} updateQuantity={updateQuantity} />
        </div>
      </div>
    </div>
  );
}
