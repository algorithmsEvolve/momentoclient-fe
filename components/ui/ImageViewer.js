'use client';

import { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { createPortal } from 'react-dom';
import Image from 'next/image';
import { X, ZoomIn, ZoomOut, ChevronLeft, ChevronRight, Maximize2, RotateCw } from 'lucide-react';

export default function ImageViewer({ images = [], src, alt, isOpen, onClose, initialIndex = 0 }) {
  const [mounted, setMounted] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [startPos, setStartPos] = useState({ x: 0, y: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const imageRef = useRef(null);

  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setIsLoading(true);
  }, [currentIndex, isOpen]);

  // Normalize images to array of objects
  const normalizedImages = useMemo(() => {
    if (images && images.length > 0) {
      return images.map(img => typeof img === 'string' ? { src: img } : { src: img.imageUrl || img.src, alt: img.alt });
    }
    if (src) {
      return [{ src, alt }];
    }
    return [];
  }, [images, src, alt]);

  useEffect(() => {
    const frame = requestAnimationFrame(() => setMounted(true));
    return () => cancelAnimationFrame(frame);
  }, []);

  const handleNext = useCallback((e) => {
    if (e) e.stopPropagation();
    if (normalizedImages.length <= 1) return;
    setCurrentIndex(prev => (prev + 1) % normalizedImages.length);
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setRotation(0);
  }, [normalizedImages.length]);

  const handlePrev = useCallback((e) => {
    if (e) e.stopPropagation();
    if (normalizedImages.length <= 1) return;
    setCurrentIndex(prev => (prev - 1 + normalizedImages.length) % normalizedImages.length);
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setRotation(0);
  }, [normalizedImages.length]);

  useEffect(() => {
    let timerId;
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      timerId = setTimeout(() => {
        setScale(1);
        setPosition({ x: 0, y: 0 });
        setRotation(0);
        
        // Find index if src was provided instead of initialIndex
        if (src && normalizedImages.length > 1) {
          const idx = normalizedImages.findIndex(img => img.src === src);
          if (idx !== -1) setCurrentIndex(idx);
        } else {
          setCurrentIndex(initialIndex);
        }
      }, 0);
    } else {
      document.body.style.overflow = 'unset';
    }

    const handleKeyDown = (e) => {
      if (!isOpen) return;
      if (e.key === 'Escape') onClose();
      if (e.key === 'ArrowLeft') handlePrev();
      if (e.key === 'ArrowRight') handleNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      if (timerId) clearTimeout(timerId);
      window.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose, src, normalizedImages, initialIndex, handleNext, handlePrev]);

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

  const handleRotate = (e) => {
    e.stopPropagation();
    setRotation(prev => (prev + 90) % 360);
  };

  const resetTransform = (e) => {
    if (e) e.stopPropagation();
    setScale(1);
    setPosition({ x: 0, y: 0 });
    setRotation(0);
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

  if (!mounted || !isOpen || normalizedImages.length === 0) return null;

  const currentImg = normalizedImages[currentIndex];

  return createPortal(
    <div 
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-black/95 backdrop-blur-md animate-in fade-in duration-300 select-none"
      onClick={onClose}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      {/* Top Bar / Controls */}
      <div className="absolute top-0 inset-x-0 h-20 flex items-center justify-between px-6 z-30 bg-gradient-to-b from-black/60 to-transparent">
        <div className="flex items-center gap-2 text-white/80 font-montserrat text-sm">
          <span className="bg-white/10 px-3 py-1 rounded-full border border-white/5">
            {currentIndex + 1} / {normalizedImages.length}
          </span>
          {currentImg.alt && <span className="hidden md:inline-block ml-2 opacity-60">| {currentImg.alt}</span>}
        </div>

        <div className="flex items-center gap-2 md:gap-4">
          <div className="flex items-center gap-1 md:gap-3 bg-black/40 backdrop-blur-md px-3 md:px-5 py-2 rounded-full border border-white/10">
            <button 
              onClick={handleZoomOut}
              disabled={scale <= 1}
              className="text-white/70 hover:text-gold disabled:opacity-20 transition-colors cursor-pointer p-1"
              title="Zoom Out"
            >
              <ZoomOut size={20} />
            </button>
            <span className="text-white/50 text-[10px] md:text-[12px] font-mono w-8 md:w-12 text-center">
              {Math.round(scale * 100)}%
            </span>
            <button 
              onClick={handleZoomIn}
              className="text-white/70 hover:text-gold transition-colors cursor-pointer p-1"
              title="Zoom In"
            >
              <ZoomIn size={20} />
            </button>
            <div className="w-[1px] h-4 bg-white/10 mx-1"></div>
            <button 
              onClick={handleRotate}
              className="text-white/70 hover:text-gold transition-colors cursor-pointer p-1"
              title="Rotate"
            >
              <RotateCw size={20} />
            </button>
            <button 
              onClick={resetTransform}
              className="text-white/70 hover:text-gold transition-colors cursor-pointer p-1"
              title="Reset"
            >
              <Maximize2 size={20} />
            </button>
          </div>

          <button 
            onClick={onClose}
            className="p-2 text-white/70 hover:text-gold transition-all duration-200 cursor-pointer hover:rotate-90 bg-white/5 rounded-full md:bg-transparent"
            aria-label="Close viewer"
          >
            <X size={28} />
          </button>
        </div>
      </div>

      {/* Navigation Arrows */}
      {normalizedImages.length > 1 && (
        <>
          <button 
            onClick={handlePrev}
            className="absolute left-4 z-30 p-4 text-white/50 hover:text-gold transition-all duration-300 hover:bg-white/5 rounded-full cursor-pointer group"
          >
            <ChevronLeft size={48} className="group-hover:-translate-x-1 transition-transform" />
          </button>
          <button 
            onClick={handleNext}
            className="absolute right-4 z-30 p-4 text-white/50 hover:text-gold transition-all duration-300 hover:bg-white/5 rounded-full cursor-pointer group"
          >
            <ChevronRight size={48} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </>
      )}

      {/* Image Container */}
      <div 
        className={`relative w-full flex-1 flex items-center justify-center transition-transform duration-300 ease-out ${isDragging ? 'cursor-grabbing' : scale > 1 ? 'cursor-grab' : 'cursor-zoom-in'}`}
        onClick={(e) => e.stopPropagation()}
        onMouseDown={handleMouseDown}
        onDoubleClick={toggleZoom}
      >
        {isLoading && (
          <div className="absolute inset-0 flex items-center justify-center z-20 bg-black/60 backdrop-blur-sm pointer-events-none animate-in fade-in duration-200">
            <div className="w-12 h-12 border-4 border-white/10 border-t-[#d4af37] rounded-full animate-spin"></div>
          </div>
        )}
        <div 
          ref={imageRef}
          className={`relative w-full h-[70vh] md:h-[80vh] pointer-events-none transition-all duration-300 ${isLoading ? 'opacity-0 scale-95' : 'opacity-100 scale-100'}`}
          style={{
            transform: `translate(${position.x}px, ${position.y}px) scale(${scale}) rotate(${rotation}deg)`,
            transition: isDragging ? 'none' : 'transform 0.2s ease-out, opacity 0.2s ease-in-out'
          }}
        >
          <Image
            src={currentImg.src}
            alt={currentImg.alt || ''}
            fill
            className="object-contain"
            priority
            quality={100}
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
          />
        </div>
      </div>

      {/* Bottom Thumbnails Strip */}
      {normalizedImages.length > 1 && (
        <div className="absolute bottom-0 inset-x-0 h-24 md:h-32 flex items-center justify-center z-30 bg-gradient-to-t from-black/80 to-transparent overflow-hidden">
          <div className="flex gap-2 md:gap-3 px-6 overflow-x-auto no-scrollbar py-4 max-w-full">
            {normalizedImages.map((img, idx) => (
              <button
                key={idx}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentIndex(idx);
                  setScale(1);
                  setPosition({ x: 0, y: 0 });
                  setRotation(0);
                }}
                className={`relative flex-shrink-0 w-12 h-12 md:w-16 md:h-16 rounded-lg overflow-hidden border-2 transition-all duration-300 ${idx === currentIndex ? 'border-gold scale-110 shadow-lg shadow-gold/20' : 'border-white/10 opacity-40 hover:opacity-100 hover:scale-105'}`}
              >
                <img src={img.src} alt="" className="w-full h-full object-cover" />
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Instructions */}
      <div className="absolute bottom-6 right-10 text-white/20 text-[9px] font-montserrat uppercase tracking-[0.2em] hidden lg:block z-40 pointer-events-none">
        Arrows to navigate • ESC to close • Double click zoom • Rotate support
      </div>
    </div>,
    document.body
  );
}
