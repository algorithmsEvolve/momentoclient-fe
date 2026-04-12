const extras = [
  { title: 'Wedding Keepsake', icon: '💍' },
  { title: 'Flower Bouquet', icon: '💐' },
  { title: 'Bridal Shower', icon: '🥂' },
  { title: 'Baby Shower', icon: '👶' },
  { title: 'Birthday Bash', icon: '🎂' },
  { title: 'Engagement Case', icon: '📦' },
  { title: 'Photo Session', icon: '📸' },
  { title: 'Event Planning', icon: '📅' },
];

export default function ExtrasGrid() {
  return (
    <section id="extras" className="py-24 bg-black border-t border-white/5">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-4 italic font-serif">More Extras!</h2>
        <p className="text-gray-medium mb-16 max-w-xl mx-auto">Kami juga menyediakan berbagai layanan tambahan untuk melengkapi setiap momen spesial Anda.</p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
          {extras.map((extra, index) => (
            <div 
              key={index} 
              className="glass-card p-10 flex flex-col items-center justify-center gap-6 hover:border-accent/40 transition-all duration-300 group hover:translate-y-[-5px]"
            >
              <div className="text-5xl group-hover:scale-125 transition-transform duration-300 transform-gpu grayscale group-hover:grayscale-0">
                {extra.icon}
              </div>
              <h3 className="text-sm font-bold uppercase tracking-widest text-white/70 group-hover:text-accent transition-colors">
                {extra.title}
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
