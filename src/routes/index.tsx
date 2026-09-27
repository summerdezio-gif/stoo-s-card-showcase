import { createFileRoute, Link } from "@tanstack/react-router";

import cardFlame from "@/assets/card-flame.png";
import cardTide from "@/assets/card-tide.png";
import cardVolt from "@/assets/card-volt.png";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Stoo's Cards — Collection TCG fan-made" },
      {
        name: "description",
        content:
          "Une collection de cartes TCG fan-made, imaginée et dessinée carte par carte. Découvre, vote, collectionne.",
      },
      { property: "og:title", content: "Stoo's Cards — Collection TCG fan-made" },
      {
        property: "og:description",
        content:
          "Une collection de cartes TCG fan-made, imaginée et dessinée carte par carte. Découvre, vote, collectionne.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Index,
});

type FanCard = {
  name: string;
  type: string;
  hp: string;
  image: string;
  rotate: number;
  left: string;
  zIndex: number;
};

const fanCards: FanCard[] = [
  {
    name: "Pyroclash",
    type: "Feu",
    hp: "140 PV",
    image: cardFlame,
    rotate: -11,
    left: "10%",
    zIndex: 10,
  },
  {
    name: "Maréblanche",
    type: "Eau",
    hp: "120 PV",
    image: cardTide,
    rotate: -1,
    left: "50%",
    zIndex: 30,
  },
  {
    name: "Voltafoudre",
    type: "Électrique",
    hp: "150 PV",
    image: cardVolt,
    rotate: 9,
    left: "90%",
    zIndex: 20,
  },
];

const stats = [
  { value: "48", label: "cartes dessinées" },
  { value: "6", label: "extensions" },
  { value: "11", label: "types" },
];

function SiteNav() {
  return (
    <header className="border-b border-border">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
        <a href="/" className="font-display text-lg font-bold italic tracking-tight">
          Stoo's&nbsp;
          <span className="text-accent-gradient">Cards</span>
        </a>
        <div className="flex items-center gap-1 font-mono text-xs">
          <span className="bg-accent-gradient rounded-full px-4 py-2 font-medium text-primary-foreground">
            Accueil
          </span>
          <Link
            to="/"
            className="rounded-full px-4 py-2 text-muted-foreground transition-colors hover:text-foreground"
          >
            La Collection
          </Link>
        </div>
      </nav>
    </header>
  );
}

function FanCardItem({ card }: { card: FanCard }) {
  return (
    <div
      className="absolute top-1/2 w-40 rounded-2xl border border-border bg-card p-2 shadow-accent-glow sm:w-48 lg:w-52"
      style={{
        left: card.left,
        transform: `translate(-50%, -52%) rotate(${card.rotate}deg)`,
        zIndex: card.zIndex,
      }}
    >
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={card.image}
          alt={`Illustration de la carte ${card.name}`}
          width={800}
          height={1120}
          className="aspect-[3/4.2] w-full object-cover"
        />
        <span className="absolute top-2 right-2 rounded-md border border-border bg-background/80 px-2 py-0.5 font-mono text-[10px] font-medium text-foreground backdrop-blur-sm">
          {card.hp}
        </span>
      </div>
      <div className="flex items-center justify-between px-1.5 py-2">
        <span className="font-display text-sm font-bold italic tracking-tight sm:text-base">
          {card.name}
        </span>
        <span className="font-mono text-[10px] text-muted-foreground">{card.type}</span>
      </div>
    </div>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <SiteNav />

      <main className="hero-glow">
        <section className="mx-auto max-w-6xl px-6 pt-14 pb-16 sm:pt-20 lg:pt-24 lg:pb-24">
          <div className="grid items-center gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-8">
            <div>
              <span className="inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 font-mono text-[11px] text-muted-foreground">
                <span className="bg-accent-gradient size-1.5 rounded-full" />
                Collection TCG fan-made
              </span>

              <h1 className="mt-6 font-display text-5xl font-bold italic tracking-tight sm:text-6xl lg:text-7xl">
                Stoo's <span className="text-accent-gradient">Cards</span>
              </h1>

              <p className="mt-5 max-w-md text-base leading-relaxed text-muted-foreground sm:text-lg">
                Une collection de cartes fan-made, imaginée et dessinée carte par carte.
                Découvre, vote, collectionne.
              </p>

              <div className="mt-8">
                <Link
                  to="/"
                  className="bg-accent-gradient shadow-accent-glow inline-flex items-center gap-2 rounded-full px-6 py-3 font-display text-sm font-bold tracking-tight text-primary-foreground transition-opacity hover:opacity-90"
                >
                  Voir la collection <span aria-hidden>→</span>
                </Link>
              </div>

              <dl className="mt-10 flex max-w-md items-center gap-6 border-t border-border pt-6 sm:gap-8">
                {stats.map((stat, index) => (
                  <div
                    key={stat.label}
                    className={index > 0 ? "border-l border-border pl-6 sm:pl-8" : ""}
                  >
                    <dd className="font-display text-2xl font-bold tracking-tight sm:text-3xl">
                      {stat.value}
                    </dd>
                    <dt className="mt-1 font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
                      {stat.label}
                    </dt>
                  </div>
                ))}
              </dl>
            </div>

            <div
              aria-hidden
              className="relative mx-auto h-[400px] w-full max-w-lg sm:h-[460px] lg:h-[540px]"
            >
              {fanCards.map((card) => (
                <FanCardItem key={card.name} card={card} />
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-border">
        <div className="mx-auto max-w-6xl px-6 py-6">
          <p className="font-mono text-[11px] text-muted-foreground">
            © 2026 Stoo's Cards — Projet fan-made, sans affiliation.
          </p>
        </div>
      </footer>
    </div>
  );
}
