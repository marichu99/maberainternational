// Static rather than `new Date().getFullYear()`: Cache Components prerendering
// rejects non-deterministic values at build time. Bump yearly.
const COPYRIGHT_YEAR = 2026;

// TODO: point these at the business's real profiles.
const links = [
  { label: "GitHub", href: "https://github.com/your-github-username" },
  { label: "LinkedIn", href: "https://linkedin.com/company/your-linkedin" },
  { label: "Email", href: "mailto:hello@maberainternational.com" },
];

export function SiteFooter() {
  return (
    <footer className="flex w-full flex-col items-center gap-4 bg-bone px-[6vw] py-10 text-charcoal md:flex-row md:justify-between">
      <span className="text-sm uppercase tracking-[0.3em] text-charcoal/60">
        © {COPYRIGHT_YEAR} Mabera International
      </span>
      <nav className="flex gap-6">
        {links.map((link) => (
          <a
            key={link.label}
            href={link.href}
            data-magnetic
            className="text-sm uppercase tracking-[0.2em] transition-colors hover:text-cognac"
          >
            {link.label}
          </a>
        ))}
      </nav>
    </footer>
  );
}
