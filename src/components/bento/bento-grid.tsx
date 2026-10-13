"use client";

import { useState, type ReactNode } from "react";
import { BentoTile } from "./bento-tile";
import { UsCoverage } from "./us-coverage";
import { EntityBadge } from "./entity-badge";

type TileId = "focus" | "stack" | "location" | "coverage" | "entity" | "contact";

type TileDef = { id: TileId; span: string };

const tiles: TileDef[] = [
  { id: "focus", span: "md:col-span-2" },
  { id: "stack", span: "" },
  { id: "location", span: "" },
  { id: "coverage", span: "" },
  { id: "entity", span: "" },
  { id: "contact", span: "md:col-span-2" },
];

const stack = ["TypeScript", "Python", "React", "Next.js", "SQL", "PyTorch", "MQL5", "Docker"];

function tileContent(id: TileId): ReactNode {
  switch (id) {
    case "focus":
      return (
        <>
          <h3 className="font-display text-sm uppercase tracking-[0.3em] text-copper">
            What we do
          </h3>
          <p className="font-display mt-3 text-3xl text-bone">
            Automation systems for U.S. businesses — workflows, AI agents, and reporting.
          </p>
        </>
      );
    case "stack":
      return (
        <>
          <h3 className="font-display text-sm uppercase tracking-[0.3em] text-copper">Toolkit</h3>
          <ul className="mt-3 flex flex-wrap gap-2">
            {stack.map((item) => (
              <li
                key={item}
                className="rounded-full border border-stone/30 px-3 py-1 text-sm text-bone"
              >
                {item}
              </li>
            ))}
          </ul>
        </>
      );
    case "location":
      return (
        <>
          <h3 className="font-display text-sm uppercase tracking-[0.3em] text-copper">Based</h3>
          <p className="font-display mt-3 text-3xl text-bone">Remote</p>
          <p className="mt-1 text-sm text-stone">Serving businesses across the U.S.</p>
        </>
      );
    case "coverage":
      return <UsCoverage />;
    case "entity":
      return <EntityBadge />;
    case "contact":
      return (
        <>
          <h3 className="font-display text-sm uppercase tracking-[0.3em] text-copper">
            Contact
          </h3>
          <a
            href="#contact"
            data-magnetic
            onClick={(event) => event.stopPropagation()}
            className="font-display mt-3 inline-block text-3xl text-bone transition-colors hover:text-copper"
          >
            Let&apos;s automate →
          </a>
        </>
      );
  }
}

export function BentoGrid() {
  const [expandedId, setExpandedId] = useState<TileId | null>(null);

  return (
    <section
      id="at-a-glance"
      className="relative min-h-screen w-full bg-charcoal px-[6vw] py-24"
    >
      <h2 className="font-display mb-12 text-sm uppercase tracking-[0.3em] text-stone">
        04 — At a glance
      </h2>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {tiles.map((tile) => (
          <div
            key={tile.id}
            className={expandedId === tile.id ? "md:col-span-2 md:row-span-2" : tile.span}
          >
            <BentoTile
              onToggleExpand={() =>
                setExpandedId((current) => (current === tile.id ? null : tile.id))
              }
            >
              {tileContent(tile.id)}
            </BentoTile>
          </div>
        ))}
      </div>
    </section>
  );
}
