export default function Testimonials() {
  const stats = [
    { label: 'Happy Clients', value: '200+' },
    { label: 'Trusted Vendors', value: '50+' },
    { label: 'Years Experience', value: '15+' },
    { label: 'Press Awards', value: '12' },
  ];

  return (
    <section className="py-24 bg-[#0a0a0a]">
      <div className="max-w-7xl mx-auto px-6 md:px-12 text-center">
        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24">
          {stats.map((stat, i) => (
            <div key={i} className="flex flex-col items-center">
              <span className="text-4xl md:text-5xl font-bold text-accent mb-2">{stat.value}</span>
              <span className="text-gray-medium text-xs uppercase tracking-widest font-bold">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <div className="max-w-4xl mx-auto">
          <svg xmlns="http://www.w3.org/2000/svg" className="w-12 h-12 text-accent/20 mx-auto mb-8" fill="currentColor" viewBox="0 0 24 24"><path d="M14.017 21L14.017 18C14.017 16.895 14.912 16 16.017 16H19.017C19.569 16 20.017 15.552 20.017 15V9C20.017 8.448 19.569 8 19.017 8H16.017C14.912 8 14.017 7.105 14.017 6V3L20.017 3C21.122 3 22.017 3.895 22.017 5V15C22.017 18.314 19.331 21 16.017 21H14.017ZM3.017 21L3.017 18C3.017 16.895 3.912 16 5.017 16H8.017C8.569 16 9.017 15.552 9.017 15V9C9.017 8.448 8.569 8 8.017 8H5.017C3.912 8 3.017 7.105 3.017 6V3L9.017 3C10.122 3 11.017 3.895 11.017 5V15C11.017 18.314 8.331 21 5.017 21H3.017Z" /></svg>
          <p className="text-2xl md:text-4xl font-serif italic text-white/90 leading-relaxed mb-12">
            "Momento truly transformed our wedding preparations. Their attention to detail in the seserahan and mahar was absolutely breathtaking. We couldn't have asked for a better partner for our special day."
          </p>
          <div className="flex items-center justify-center gap-4">
            <div className="w-12 h-12 rounded-full bg-accent/20 border border-accent/40" />
            <div className="text-left">
              <h4 className="font-bold text-white uppercase tracking-widest text-sm">Sarah & David</h4>
              <p className="text-accent text-xs">February 2024 Clients</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
