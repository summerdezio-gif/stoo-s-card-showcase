import { createFileRoute } from "@tanstack/react-router";

import { SiteFooter, SiteNav } from "@/components/site-chrome";
import cardDragon from "@/assets/card-dragon.png";
import cardFlame from "@/assets/card-flame.png";
import cardTide from "@/assets/card-tide.png";

export const Route = createFileRoute("/profil")({
  head: () => ({
    meta: [
      { title: "Mon Profil — Stoo's Cards" },
      {
        name: "description",
        content:
          "Retrouvez votre pseudo, vos points et votre collection de cartes sur votre profil de dresseur Stoo's Cards.",
      },
    ],
    links: [{ rel: "canonical", href: "/profil" }],
  }),
  component: ProfilPage,
});

// Données d'exemple, à remplacer par la vraie session dresseur une fois
// Supabase branché.
const dresseur = {
  pseudo: "Stoo",
  points: 1240,
  cartesPossedees: 3,
  boostersOuverts: 18,
  totalPointsGagnes: 4820,
};

const cartesPossedees = [
  { name: "Pyroclash", type: "Feu", hp: "140 PV", image: cardFlame },
  { name: "Maréblanche", type: "Eau", hp: "120 PV", image: cardTide },
  { name: "Dracorage", type: "Dragon", hp: "160 PV", image: cardDragon },
];

function StatBlock({ value, label }: { value: string | number; label: string }) {
  return (
    <div>
      <div className="font-display text-2xl font-bold italic tracking-tight">
        {value}
      </div>
      <div className="mt-1 font-mono text-[10px] tracking-wide text-muted-foreground uppercase">
        {label}
      </div>
    </div>
  );
}

function OwnedCardTile({
  card,
}: {
  card: (typeof cartesPossedees)[number];
}) {
  return (
    <article className="group rounded-2xl border border-border bg-card p-2 transition-all duration-200 hover:-translate-y-1 hover:border-primary/40 hover:shadow-accent-glow">
      <div className="relative overflow-hidden rounded-xl">
        <img
          src={card.image}
          alt={`Illustration de la carte ${card.name}`}
          width={800}
          height={1120}
          loading="lazy"
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
        <span className="font-mono text-[10px] text-muted-foreground">
          {card.type}
        </span>
      </div>
    </article>
  );
}

function ProfilPage() {
  const hasCards = cartesPossedees.length > 0;

  return (
    <div className="hero-glow min-h-screen bg-background text-foreground">
      <SiteNav active="profil" />

      <main>
        <section className="mx-auto max-w-6xl px-6 pt-14 pb-10 sm:pt-16">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <div className="bg-accent-gradient flex size-16 items-center justify-center rounded-2xl font-display text-2xl font-bold italic text-primary-foreground">
                {dresseur.pseudo.charAt(0)}
              </div>
              <div>
                <h1 className="font-display text-2xl font-bold italic tracking-tight sm:text-3xl">
                  {dresseur.pseudo}
                </h1>
                <span className="mt-1 inline-flex items-center gap-1.5 rounded-full border border-border px-3 py-1 font-mono text-[11px] text-muted-foreground">
                  <span className="bg-accent-gradient size-1.5 rounded-full" />
                  {dresseur.points.toLocaleString("fr-FR")} points
                </span>
              </div>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap gap-8 rounded-2xl border border-border bg-card px-6 py-5 sm:gap-12">
            <StatBlock value={dresseur.cartesPossedees} label="Cartes possédées" />
            <StatBlock value={dresseur.boostersOuverts} label="Boosters ouverts" />
            <StatBlock
              value={dresseur.totalPointsGagnes.toLocaleString("fr-FR")}
              label="Points gagnés au total"
            />
          </div>
        </section>

        <section className="mx-auto max-w-6xl px-6 pb-16">
          <h2 className="font-display text-xl font-bold italic tracking-tight">
            Ma <span className="text-accent-gradient">collection</span>
          </h2>

          {hasCards ? (
            <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {cartesPossedees.map((card) => (
                <OwnedCardTile key={card.name} card={card} />
              ))}
            </div>
          ) : (
            <div className="mt-6 flex flex-col items-center gap-2 rounded-2xl border border-dashed border-border bg-card/20 py-16 text-center">
              <p className="font-mono text-xs text-muted-foreground">
                Ouvre ton premier booster pour commencer ta collection.
              </p>
            </div>
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
