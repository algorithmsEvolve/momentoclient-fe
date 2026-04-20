'use client';

import { useEffect, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { X, ZoomIn, ZoomOut } from 'lucide-react';

export default function ImageViewer({ src, alt, isOpen, onClose }) {
  const [mounted, setMounted] = useState(false);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);

  useEffect(() => {
    setMounted(true);
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reset state when opening new image
      setScale(1);
      setPosition({ x: 0, y: 0 });
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => {
      window.removeEventListener('keydown', handleEsc);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  const handleZoomIn = (e) => {
    e.stopPropagation();
    setScale(prev => Math.min(prev + 0.5, 4));
  };

  const handleZoomOut = (e) => {
    e.stopPropagation();
    if (scale <= 1) return;
    const newScale = Math.max(scale - 0.5, 1);
    setScale(newScale);
    if (newScale === 1) setPosition({ x: 0, y: 0 });
  };

  const handleMouseDown = (e) => {
    if (scale === 1) return;
    e.preventDefault();
    setIsDragging(true);
    setStartPos({ x: e.clientX - position.x, y: e.clientY - position.y });
  };

  const handleMouseMove = (e) => {
    if (!isDragging || scale === 1) return;
    setPosition({
      x: e.clientX - startPos.x,
      y: e.clientY - startPos.y
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const toggleZoom = (e) => {
    e.stopPropagation();
    if (scale > 1) {
      setScale(1);
      setPosition({ x: 0, y: 0 });
    } else {
      setScale(2.5);
    }
  };

  if (!mounted || !isOpen) return null;

  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in duration-300 select-none"
      onClick={onClose}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Controls Overlay */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-20 flex items-center gap-4 bg-black/40 backdrop-blur-md px-6 py-3 rounded-full border border-white/10">
        <button 
          onClick={handleZoomOut}
          disabled={scale <= 1}
          className="text-white/70 hover:text-[#D4AF37] disabled:opacity-30 disabled:hover:text-white/70 transition-colors cursor-pointer"
        >
          <ZoomOut size={24} />
        </button>
        <span className="text-white/50 text-[12px] font-mono w-12 text-center">
          {Math.round(scale * 100)}%
        </span>
        <button 
          onClick={handleZoomIn}
          className="text-white/70 hover:text-[#D4AF37] transition-colors cursor-pointer"
        >
          <ZoomIn size={24} />
        </button>
      </div>

      {/* Close Button */}
      <button 
        onClick={onClose}
        className="absolute top-6 right-6 z-20 p-2 text-white/70 hover:text-[#D4AF37] transition-all duration-200 cursor-pointer hover:rotate-90"
        aria-label="Close viewer"
      >
        <X size={32} />
      </button>

      {/* Image Container */}
      <div 
        className={`relative w-full h-full flex items-center justify-center transition-transform duration-300 ease-out ${isDragging ? 'cursor-grabbing' : scale > 1 ? 'cursor-grab' : 'cursor-zoom-in'}`}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleMouseDown}
        onDoubleClick={toggleZoom}
      >
        <div 
          ref={imageRef}
          className="relative w-full h-[80vh] pointer-events-none"
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale})`,
            transition: isDragging ? 'none' : 'transform 0.2s ease-out'
          }}
        >
          <Image
            src={src}
            alt={alt || ''}
            fill
            className="object-contain"
            priority
            quality={100}
          />
        </div>
      </div>

      {/* Instructions */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/30 text-[11px] font-montserrat uppercase tracking-widest hidden md:block">
        Scroll to zoom • Double click to toggle • Drag to pan
      </div>
    </div>,
    document.body
  );
}
