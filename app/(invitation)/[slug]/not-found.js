export default function InvitationNotFound() {
  return (
    <main className="min-h-screen bg-[#f4eadf] px-6 py-20 text-[#35281f]">
      <div className="mx-auto max-w-xl rounded-3xl border border-[#d8c8b8] bg-white/85 p-8 shadow-sm">
        <p className="text-xs uppercase tracking-[0.35em] text-[#9c7f69]">
          Momento Invitation
        </p>
        <h1 className="mt-4 text-3xl font-semibold">Undangan tidak ditemukan</h1>
        <p className="mt-3 text-sm leading-7 text-[#61544b]">
          Slug yang diminta tidak memiliki data undangan publik yang aktif.
        </p>
      </div>
    </main>
  );
}
