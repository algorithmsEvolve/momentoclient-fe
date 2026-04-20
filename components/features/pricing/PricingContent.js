'use client';

import { useState } from 'react';
import Image from 'next/image';
import { pricingCategories, seserahanPackages, addOns } from '@/lib/pricingData';
import ImageViewer from '@/components/ui/ImageViewer';

export default function PricingContent() {
  const [activeCategory, setActiveCategory] = useState('seserahan');
  const [viewerState, setViewerState] = useState({ isOpen: false, src: '', alt: '' });

  const openViewer = (src, alt) => {
    setViewerState({ isOpen: true, src, alt });
  };

  return (
    <div className="w-full pt-[110px] md:pt-[150px] pb-20">
      <div className="max-w-7xl mx-auto px-4 md:px-10 flex flex-col md:flex-row gap-10 lg:gap-[49px]">
      
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-[240px] flex-shrink-0 border-r border-white/10 pr-0">
        <nav className="flex flex-col sticky top-[120px]">
          {pricingCategories.map((cat, index) => {
            const isGroupEnd = index === 2 || index === 6;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`group relative flex items-center h-[60px] cursor-pointer transition-all duration-300 border-b border-white/5 last:border-0 ${
                  isGroupEnd ? 'mb-4 border-b-white/20' : ''
                }`}
              >
                {activeCategory === cat.id && (
                  <div className="absolute left-0 top-[15px] bottom-[15px] w-[3px] bg-[#D4AF37] rounded-full" />
                )}
                <span className={`pl-[25px] text-[16px] font-montserrat font-bold tracking-[0.5px] whitespace-nowrap antialiased transition-colors duration-300 ${
                  activeCategory === cat.id ? 'text-[#D4AF37]' : 'text-white hover:text-[#D4AF37]'
                }`}>
                  {cat.name}
                </span>
              </button>
            );
          })}
        </nav>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1">
        {/* Section Header */}
        <div className="mb-[30px]">
          <p className="text-white font-montserrat text-[16px] md:text-[20px] opacity-60 mb-0">Pricelist</p>
          <h1 className="text-[28px] md:text-[32px] font-serif font-bold text-white uppercase tracking-[-1px] leading-tight">
            {pricingCategories.find(c => c.id === activeCategory)?.name || 'Price List'}
          </h1>
        </div>

        {/* Packages Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-20">
          {activeCategory === 'seserahan' && seserahanPackages.map((pkg) => (
            <div key={pkg.id} className="bg-[#161616] rounded-[20px] p-[30px] flex flex-col md:flex-row gap-8 md:gap-10 border border-white/5 shadow-2xl transition-all duration-300 hover:border-[#D4AF37]/20">
              
              {/* Package Details - Container for Image & Text */}
              <div className="flex-1 flex flex-col">
                {/* Header Information */}
                <div className="mb-[32px]">
                  <h2 className="text-[24px] font-montserrat font-bold text-white tracking-[-2.5%] leading-tight mb-0">{pkg.name}</h2>
                  <p className="text-white font-montserrat text-[14px] leading-[22px] antialiased">
                    <span className="opacity-60">Harga Per box :</span> <span className="font-bold"> {pkg.basePrice}</span>
                  </p>
                </div>

                <div className="flex flex-col md:flex-row gap-8 lg:gap-[30px]">
                  {/* Package Image - Precise Dimensions: 173x210 */}
                  <div 
                    className="w-[173px] h-[210px] flex-shrink-0 cursor-zoom-in group"
                    onClick={() => openViewer(pkg.images[0], pkg.name)}
                  >
                    <div className="relative w-full h-full rounded-[5px] overflow-hidden border border-white/5 transition-transform duration-500 group-hover:scale-[1.03]">
                      <Image 
                        src={pkg.images[0]} 
                        alt={pkg.name} 
                        fill 
                        className="object-cover"
                      />
                    </div>
                  </div>

                  {/* Pricing Items - Precise Figma Typography */}
                  <div className="flex-1 flex flex-col gap-[15px] pt-0">
                    {pkg.pricing.map((opt, idx) => (
                      <div key={idx} className="flex flex-col border-b border-white/10 pb-[15px] last:border-0 last:pb-0">
                        <div className="flex justify-between items-center">
                          <span className="text-[#D4AF37] font-montserrat font-bold text-[14px] uppercase">{opt.boxes}</span>
                          <span className="text-white font-montserrat font-semibold text-[16px] tracking-[0.5px]">{opt.price}</span>
                        </div>
                        {opt.free && (
                          <div className="flex flex-col gap-0 mt-2">
                            <span className="text-white font-montserrat font-bold text-[12px] leading-tight">Free :</span>
                            <p className="text-white/60 text-[12px] font-montserrat font-normal leading-relaxed mt-1">
                              {opt.free}
                            </p>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Add Ons Section */}
        {activeCategory === 'seserahan' && (
          <div className="mt-20">
            <div className="mb-[30px]">
              <p className="text-white font-montserrat text-[16px] md:text-[20px] opacity-60 mb-0">Add Ons</p>
              <h2 className="text-[28px] md:text-[32px] font-serif font-bold text-white uppercase tracking-[-1px] leading-tight">
                RINGBOX, HIAS BEDCOVER
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-[15px] items-start">
              {/* Ringboxes - First 6 items */}
              {addOns.slice(0, 6).map((item, i) => (
                <div key={i} className="bg-[#161616] p-[15px] rounded-[10px] flex items-start gap-[15px] border border-white/5 transition-all hover:border-[#D4AF37]/20">
                  {/* Image - Precise Dimensions: 90x90 */}
                  <div 
                    className="relative w-[90px] h-[90px] rounded-[5px] overflow-hidden flex-shrink-0 cursor-zoom-in group"
                    onClick={() => openViewer(item.image, item.name)}
                  >
                    <div className="absolute inset-0 bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity z-10" />
                    <Image 
                      src={item.image} 
                      alt={item.name} 
                      fill 
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  {/* Content Area */}
                  <div className="flex flex-col pt-0">
                    <h3 className="text-white font-montserrat font-bold text-[20px] leading-tight mb-[5px]">{item.name}</h3>
                    <p className="text-white font-montserrat text-[12px] leading-[22px] antialiased">
                      <span>Harga Sewa :</span> <span className="font-bold"> {item.price}</span>
                    </p>
                    <p className="text-[#D4AF37] text-[11px] font-montserrat font-medium italic leading-[22px] mt-[17px]">
                      {item.note || '*tidak bisa ubah warna'}
                    </p>
                  </div>
                </div>
              ))}

              {/* Hias Bedcover - Large Featured Card */}
              <div className="bg-[#161616] p-[15px] rounded-[20px] border border-white/5 md:row-span-3 lg:col-start-3 lg:row-start-1 lg:row-span-3 flex flex-col h-full">
                <div className="grid grid-cols-2 gap-[10px] mb-[25px]">
                  <div 
                    className="relative aspect-square rounded-[8px] overflow-hidden cursor-zoom-in group"
                    onClick={() => openViewer("/images/pricelist/seserahan/addons/hias-1.png", "Hias Bedcover 1")}
                  >
                    <Image src="/images/pricelist/seserahan/addons/hias-1.png" fill className="object-cover transition-transform duration-500 group-hover:scale-110" alt="Hias Bedcover 1" />
                  </div>
                  <div 
                     className="relative aspect-square rounded-[8px] overflow-hidden cursor-zoom-in group"
                     onClick={() => openViewer("/images/pricelist/seserahan/addons/hias-2.png", "Hias Bedcover 2")}
                  >
                    <Image src="/images/pricelist/seserahan/addons/hias-2.png" fill className="object-cover transition-transform duration-500 group-hover:scale-110" alt="Hias Bedcover 2" />
                  </div>
                  <div 
                     className="relative aspect-square rounded-[8px] overflow-hidden cursor-zoom-in group"
                     onClick={() => openViewer("/images/pricelist/seserahan/addons/hias-3.png", "Hias Bedcover 3")}
                  >
                    <Image src="/images/pricelist/seserahan/addons/hias-3.png" fill className="object-cover transition-transform duration-500 group-hover:scale-110" alt="Hias Bedcover 3" />
                  </div>
                  <div 
                     className="relative aspect-square rounded-[8px] overflow-hidden cursor-zoom-in group"
                     onClick={() => openViewer("/images/pricelist/seserahan/addons/hias-4.png", "Hias Bedcover 4")}
                  >
                    <Image src="/images/pricelist/seserahan/addons/hias-4.png" fill className="object-cover transition-transform duration-500 group-hover:scale-110" alt="Hias Bedcover 4" />
                  </div>
                </div>
                <div className="mt-auto">
                  <h3 className="text-white font-montserrat font-bold text-[20px] mb-1">Hias Bedcover</h3>
                  <p className="text-white text-[14px] font-montserrat">Harga Sewa : <span className="text-white font-bold">Rp. 65.000</span></p>
                </div>
              </div>

              {/* Remaining items if any (e.g. Kuro if it were extra) */}
            </div>
          </div>
        )}
      </main>
      </div>

      {/* Modern Image Viewer Component */}
      <ImageViewer 
        src={viewerState.src}
        alt={viewerState.alt}
        isOpen={viewerState.isOpen}
        onClose={() => setViewerState({ ...viewerState, isOpen: false })}
      />
    </div>
  );
}
