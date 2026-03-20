import "./links.css";

const LINKS = [
  { label: "Website", href: "/", icon: "fa-solid fa-globe", type: "internal" },
  {
    label: "TikTok",
    href: "https://www.tiktok.com/@psychic_crystal_bookshop?_r=1&_t=ZP-94CJty8jLf5",
    icon: "fa-brands fa-tiktok",
    type: "external",
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/psychic_crystal_bookshop?igsh=MXBibml0NWhhaHI0cQ%3D%3D&utm_source=qr",
    icon: "fa-brands fa-instagram",
    type: "external",
  },
  {
    label: "Google",
    href: "https://share.google/fBV5ikbimElfe42Mu",
    icon: "fa-brands fa-google",
    type: "external",
  },
  { label: "Email", href: "mailto:info@psychiccrystalbookshop.com", icon: "fa-solid fa-envelope", type: "external" },
  {
    label: "Call",
    href: "tel:+18472620158",
    icon: "fa-solid fa-phone",
    type: "external",
  },
];

export default function LinksPage() {
  return (
    <main className="links-page">
      <div className="links-page__container" aria-label="Quick links">
        {LINKS.map((l) => (
          <a
            key={l.label}
            className="links-page__button"
            href={l.href}
            target={l.type === "external" ? "_blank" : undefined}
            rel={l.type === "external" ? "noopener noreferrer" : undefined}
            aria-label={l.label}
          >
            <i className={`links-page__icon ${l.icon}`} aria-hidden="true" />
            <span className="links-page__label">{l.label}</span>
          </a>
        ))}
      </div>
    </main>
  );
}

