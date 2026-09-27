import { useState } from "react";
import { createFileRoute } from "@tanstack/react-router";

import { SiteFooter, SiteNav } from "@/components/site-chrome";
import cardDragon from "@/assets/card-dragon.png";
import cardFlame from "@/assets/card-flame.png";
import cardShadow from "@/assets/card-shadow.png";
import cardTide from "@/assets/card-tide.png";
import cardVerdant from "@/assets/card-verdant.png";
import cardVolt from "@/assets/card-volt.png";

export const Route = createFileRoute("/collection")({
  head: () => ({
    meta: [
      { title: "La Collection — Stoo's Cards" },
      {
        name: "description",
        content:
          "Explorez la collection de cartes TCG fan-made de Stoo's Cards : recherchez par nom, filtrez par type, puis votez pour vos favorites.",
      },
      { property: "og:title", content: "La Collection — Stoo's Cards" },
      {
        property: "og:description",
        content:
          "Explorez la collection de cartes TCG fan-made de Stoo's Cards : recherchez par nom, filtrez par type, puis votez pour vos favorites.",
      },
      { property: "og:url", content: "/collection" },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/collection" }],
  }),
  component: CollectionPage,
});

const TYPES = [
  "Feu",
  "Eau",
  "Plante",
  "Électrik",
  "Psy",
  "Combat",
  "Ténèbres",
  "Acier",
  "Fée",
  "Dragon",
  "Normal",
] as const;

type CardType = (typeof TYPES)[number];

type CollectionCard = {
  name: string;
  type: CardType;
  hp: string;
  image: string;
};

const collectionCards: CollectionCard[] = [
  { name: "Pyroclash", type: "Feu", hp: "140 PV", image: cardFlame },
  { name: "Maréblanche", type: "Eau", hp: "120 PV", image: cardTide },
  { name: "Voltafoudre", type: "Électrik", hp: "150 PV", image: cardVolt },
  { name: "Sylvantique", type: "Plante", hp: "130 PV", image: cardVerdant },
  { name: "Ombreloyale", type: "Ténèbres", hp: "110 PV", image: cardShadow },
  { name: "Dracorage", type: "Dragon", hp: "160 PV", image: cardDragon },
];

const EMPTY_SLOT_COUNT = 6;

function CollectionCardTile({ card }: { card: CollectionCard }) {
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

function EmptySlot() {
  return (
    <div className="flex aspect-[3/4.2] items-center justify-center rounded-2xl border border-dashed border-border bg-card/20">
      <span className="font-mono text-[10px] text-muted-foreground/60">
        Carte à venir
      </span>
    </div>
  );
}

function CollectionPage() {
  const [query, setQuery] = useState("");
  const [activeType, setActiveType] = useState<CardType | null>(null);

  const normalized = query.trim().toLowerCase();
  const filtered = collectionCards.filter(
    (card) =>
      (!activeType || card.type === activeType) &&
      (!normalized ||
        card.name.toLowerCase().includes(normalized) ||
        card.type.toLowerCase().includes(normalized)),
  );
  const showEmptySlots = !normalized && !activeType;

  return (
    <div className="hero-glow min-h-screen bg-background text-foreground">
      <SiteNav active="collection" />

      <main>
        <section className="mx-auto max-w-6xl px-6 pt-14 pb-16 sm:pt-16">
          <span className="inline-flex items-center gap-2 rounded-full border border-border px-3.5 py-1.5 font-mono text-[11px] text-muted-foreground">
            <span className="bg-accent-gradient size-1.5 rounded-full" />
            Explore · Filtre · Vote
          </span>

          <h1 className="mt-6 font-display text-4xl font-bold italic tracking-tight sm:text-5xl">
            La <span className="text-accent-gradient">Collection</span>
          </h1>

          <p className="mt-4 max-w-xl text-base leading-relaxed text-muted-foreground">
            Chaque carte est dessinée à la main puis ajoutée ici une à une.
            Cherchez, filtrez par type, et retrouvez vos favorites.
          </p>

          <div className="mt-8 flex max-w-md items-center rounded-full border border-border bg-card px-4 py-2.5">
            <svg
              aria-hidden
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="size-4 shrink-0 text-muted-foreground"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </svg>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Rechercher une carte"
              className="min-w-0 flex-1 bg-transparent px-3 font-mono text-sm text-foreground outline-none placeholder:text-muted-foreground"
            />
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            {TYPES.map((type) => {
              const isActive = activeType === type;
              return (
                <button
                  key={type}
                  type="button"
                  onClick={() => setActiveType(isActive ? null : type)}
                  className={
                    isActive
                      ? "bg-accent-gradient rounded-full border border-transparent px-3.5 py-1.5 font-mono text-[11px] font-medium text-primary-foreground"
                      : "rounded-full border border-border px-3.5 py-1.5 font-mono text-[11px] text-muted-foreground transition-colors hover:border-foreground/20 hover:text-foreground"
                  }
                >
                  {type}
                </button>
              );
            })}
          </div>

          {filtered.length > 0 || showEmptySlots ? (
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4">
              {filtered.map((card) => (
                <CollectionCardTile key={card.name} card={card} />
              ))}
              {showEmptySlots &&
                Array.from({ length: EMPTY_SLOT_COUNT }, (_, index) => (
                  <EmptySlot key={index} />
                ))}
            </div>
          ) : (
            <p className="mt-10 font-mono text-xs text-muted-foreground">
              Aucune carte ne correspond à cette recherche.
            </p>
          )}
        </section>
      </main>

      <SiteFooter />
    </div>
  );
}
