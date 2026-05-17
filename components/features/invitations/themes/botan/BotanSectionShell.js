export default function BotanSectionShell({
  id,
  eyebrow,
  title,
  children,
  className = "",
}) {
  return (
    <section id={id} className={`botan-shell ${className}`}>
      <div className="botan-shell__inner">
        <p className="botan-shell__eyebrow">{eyebrow}</p>
        <h2 className="botan-shell__title">{title}</h2>
        <div className="botan-shell__body mt-5">{children}</div>
      </div>
    </section>
  );
}
