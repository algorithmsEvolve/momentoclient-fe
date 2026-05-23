import Image from "next/image";
import { homeDefaults } from "@/lib/site-content/homeDefaults";

export default function WhySection({ content = {} }) {
  const c = { ...homeDefaults.why, ...content };
  const items = c.items || homeDefaults.why.items;
  const topItems = items.slice(0, 3);
  const bottomItems = items.slice(3);

  return (
    <section className="relative grad-gold min-h-[600px] flex items-center py-12 md:py-20 px-4 md:px-10 z-20 overflow-hidden">
      <div className="max-w-[1240px] mx-auto text-center w-full">
        {/* Top Row */}
        <div className="grid grid-cols-2 md:flex md:flex-row justify-center gap-2 md:gap-[20px] mb-2 md:mb-[40px] w-full">
          {topItems.map((item, i) => (
            <div
              key={i}
              className={`feature-card col-span-1 w-full h-auto md:w-[392px] md:h-[250px] md:min-w-[392px] md:max-w-[392px] p-5 pt-5 pb-6 md:p-[30px] rounded-[15px] md:rounded-[20px] ${i === 2 ? 'col-span-2' : ''}`}
            >
              <Image src={item.icon?.src || '/icons/why/default.svg'} alt={item.icon?.alt || item.title} width={24} height={24} className="object-contain mx-auto mb-[5px]" />
              <h3 className="text-[12px] md:text-[20px] font-bold text-white mb-[10px] md:mb-[20px] font-nav">{item.title}</h3>
              <p className={`text-[11px] md:text-[14px] leading-[18px] md:leading-[22px] text-white font-nav font-normal ${i === 2 ? 'max-w-[320px] mx-auto' : ''}`}>
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-2 md:flex md:flex-row justify-center gap-2 md:gap-[20px] w-full">
          {bottomItems.map((item, i) => (
            <div
              key={i}
              className="feature-card col-span-1 w-full h-auto md:w-[392px] md:h-[250px] md:min-w-[392px] md:max-w-[392px] p-5 pt-5 pb-6 md:p-[30px] rounded-[15px] md:rounded-[20px]"
            >
              <Image src={item.icon?.src || '/icons/why/default.svg'} alt={item.icon?.alt || item.title} width={24} height={24} className="object-contain mx-auto mb-[5px]" />
              <h3 className="text-[12px] md:text-[20px] font-bold text-white mb-[10px] md:mb-[20px] font-nav">{item.title}</h3>
              <p className="text-[11px] md:text-[14px] leading-[18px] md:leading-[22px] text-white font-nav font-normal">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
