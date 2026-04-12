import Image from 'next/image';

const services = [
  {
    id: 'seserahan',
    title: 'Sewa Seserahan',
    description: 'Koleksi box seserahan premium dengan berbagai tema mulai dari Rustic, Modern, hingga Luxury. Detail hiasan yang teliti untuk momen spesial Anda.',
    image: 'https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=2069&auto=format&fit=crop',
    alt: 'Premium Seserahan Service',
    reverse: false,
  },
  {
    id: 'mahar',
    title: 'Frame Mahar',
    description: 'Abadikan mahar Anda dalam bingkai eksklusif dengan desain custom yang estetik. Pilihan material berkualitas tinggi dan pengerjaan tangan profesional.',
    image: 'https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop',
    alt: 'Custom Frame Mahar',
    reverse: true,
  },
  {
    id: 'undangan',
    title: 'Undangan Digital',
    description: 'Solusi undangan modern yang interaktif, ramah lingkungan, dan mudah dibagikan. Dilengkapi dengan RSVP online, peta lokasi, dan playlist musik.',
    image: 'https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop',
    alt: 'Digital Invitation Service',
    reverse: false,
  },
];

export default function ServiceShowcase() {
  return (
    <section className="py-24 bg-black">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        {services.map((service, index) => (
          <div 
            key={service.id}
            id={service.id}
            className={`flex flex-col md:flex-row items-center gap-12 md:gap-24 mb-32 last:mb-0 ${
              service.reverse ? 'md:flex-row-reverse' : ''
            }`}
          >
            {/* Image Content */}
            <div className="flex-1 w-full flex justify-center">
              <div className="relative w-full aspect-[4/5] glass-card overflow-hidden group">
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60" />
              </div>
            </div>

            {/* Text Content */}
            <div className="flex-1 text-center md:text-left">
              <span className="text-accent text-xs font-bold uppercase tracking-[0.3em] mb-4 block">
                Premium Service 0{index + 1}
              </span>
              <h2 className="text-4xl md:text-6xl font-bold mb-8 italic font-serif leading-tight">
                {service.title}
              </h2>
              <p className="text-gray-medium text-lg md:text-xl leading-relaxed mb-10">
                {service.description}
              </p>
              <button className="btn-outline group inline-flex items-center gap-2">
                Learn More
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 transition-transform group-hover:translate-x-1" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><line x1="5" y1="12" x2="19" y2="12"></line><polyline points="12 5 19 12 12 19"></polyline></svg>
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
