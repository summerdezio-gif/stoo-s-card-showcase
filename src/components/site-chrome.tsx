import { Link } from "@tanstack/react-router";

const pillActive =
  "bg-accent-gradient rounded-full px-4 py-2 font-medium text-primary-foreground";
const pillIdle =
  "rounded-full px-4 py-2 text-muted-foreground transition-colors hover:text-foreground";

export function SiteNav({
  active,
}: {
  active: "home" | "collection" | "profil";
}) {
  return (
    <header className="border-b border-border">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <Link
          to="/"
          className="font-display text-lg font-bold italic tracking-tight"
        >
          Stoo's&nbsp;<span className="text-accent-gradient">Cards</span>
        </Link>
        <div className="flex items-center gap-1 font-mono text-xs">
          <Link to="/" className={active === "home" ? pillActive : pillIdle}>
            Accueil
          </Link>
          <Link
            to="/collection"
            className={active === "collection" ? pillActive : pillIdle}
          >
            La Collection
          </Link>
          <Link
            to="/profil"
            className={active === "profil" ? pillActive : pillIdle}
          >
            Mon Profil
          </Link>
        </div>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="border-t border-border">
      <div className="mx-auto max-w-6xl px-6 py-6">
        <p className="font-mono text-[11px] text-muted-foreground">
          © 2026 Stoo's Cards — Projet fan-made, sans affiliation.
        </p>
      </div>
    </footer>
  );
}
