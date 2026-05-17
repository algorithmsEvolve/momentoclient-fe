import Image from "next/image";

export default function BotanFloatingMenu({ invitation, onNavigate }) {
  const items = [
    ["opening", "/themes/botan/component/opening-fm.svg", "Opening"],
    ["date", "/themes/botan/component/time-fm.svg", "Date"],
    ["location", "/themes/botan/component/location-fm.svg", "Location"],
    ["gallery", "/themes/botan/component/wish-fm.svg", "Gallery"],
  ];

  return (
    <div className="botan-floating-menu px-4 py-3 md:hidden">
      <div className="mx-auto flex w-fit items-center gap-3 rounded-[30px] bg-[#efeae4] px-4 py-2 shadow-[2px_2px_5px_rgba(0,0,0,0.15)]">
        {items.map(([id, icon, label]) => (
          <button
            key={id}
            type="button"
            onClick={() => onNavigate(id)}
            className="flex h-10 w-10 items-center justify-center rounded-full transition active:scale-95"
            title={label}
            aria-label={label}
          >
            <Image
              src={icon}
              alt=""
              width={24}
              height={24}
              className="h-6 w-6 object-contain"
              aria-hidden="true"
            />
          </button>
        ))}
      </div>
      <p className="mt-2 text-center text-[10px] uppercase tracking-[0.25em] text-[#66646f]">
        {invitation?.theme?.name || "Botan"}
      </p>
    </div>
  );
}
