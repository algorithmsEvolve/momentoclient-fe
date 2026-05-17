export default function UnsupportedTheme({ invitation }) {
  return (
    <main className="min-h-screen bg-[#f6f1ea] text-[#2b211d] px-6 py-20">
      <div className="mx-auto max-w-2xl rounded-3xl border border-[#d8c8b8] bg-white/80 p-8 shadow-sm">
        <p className="text-xs uppercase tracking-[0.3em] text-[#8f735f]">
          Momento Invitation
        </p>
        <h1 className="mt-4 text-3xl font-semibold">
          Tema belum dipindahkan
        </h1>
        <p className="mt-4 text-sm leading-7 text-[#5f5148]">
          {invitation?.title || "Undangan ini belum memiliki tema yang tersedia di frontend baru."}
        </p>
        <p className="mt-6 text-sm text-[#8f735f]">
          Theme key: {invitation?.theme?.componentKey || invitation?.theme?.slug || "unknown"}
        </p>
      </div>
    </main>
  );
}
