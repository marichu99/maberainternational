"use client";

import { Reorder } from "motion/react";
import { useState, type ReactNode } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { BentoTile } from "./bento-tile";
import { LiveClock } from "./live-clock";
import { GithubStat } from "./github-stat";

type TileId = "role" | "stack" | "location" | "clock" | "github" | "contact";

type TileDef = { id: TileId; span: string };

const initialTiles: TileDef[] = [
  { id: "role", span: "md:col-span-2" },
  { id: "stack", span: "" },
  { id: "location", span: "" },
  { id: "clock", span: "" },
  { id: "github", span: "" },
  { id: "contact", span: "md:col-span-2" },
];

const stack = ["TypeScript", "Python", "React", "Next.js", "SQL", "PyTorch", "MQL5", "Docker"];

function tileContent(id: TileId): ReactNode {
  switch (id) {
    case "role":
      return (
        <>
          <h3 className="font-display text-sm uppercase tracking-[0.3em] text-copper">
            Current role
          </h3>
          <p className="font-display mt-3 text-3xl text-bone">
            Software Engineer — Mabera International
          </p>
        </>
      );
    case "stack":
      return (
        <>
          <h3 className="font-display text-sm uppercase tracking-[0.3em] text-copper">Stack</h3>
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
          <h3 className="font-display text-sm uppercase tracking-[0.3em] text-copper">
            Location
          </h3>
          <p className="font-display mt-3 text-3xl text-bone">Remote</p>
        </>
      );
    case "clock":
      return <LiveClock />;
    case "github":
      return <GithubStat />;
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
            Let&apos;s build →
          </a>
        </>
      );
  }
}

export function BentoGrid() {
  const reducedMotion = useReducedMotion();
  const [order, setOrder] = useState(initialTiles);
  const [expandedId, setExpandedId] = useState<TileId | null>(null);

  return (
    <section
      id="at-a-glance"
      className="relative min-h-screen w-full bg-charcoal px-[6vw] py-24"
    >
      <h2 className="font-display mb-12 text-sm uppercase tracking-[0.3em] text-stone">
        04 — At a glance
      </h2>

      <Reorder.Group
        as="div"
        values={order}
        onReorder={setOrder}
        className="grid grid-cols-1 gap-4 md:grid-cols-3"
      >
        {order.map((tile) => (
          <Reorder.Item
            key={tile.id}
            value={tile}
            as="div"
            dragListener={!reducedMotion}
            className={expandedId === tile.id ? "md:col-span-2 md:row-span-2" : tile.span}
          >
            <BentoTile
              onToggleExpand={() =>
                setExpandedId((current) => (current === tile.id ? null : tile.id))
              }
            >
              {tileContent(tile.id)}
            </BentoTile>
          </Reorder.Item>
        ))}
      </Reorder.Group>
    </section>
  );
}
