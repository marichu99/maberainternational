export type Project = {
  slug: string;
  name: string;
  blurb: string;
  problem: string;
  build: string;
  result: string;
  colorFrom: string;
  colorTo: string;
};

// NOTE: colors here are placeholders standing in for real project screenshots.
// Swap `colorFrom`/`colorTo` out for actual thumbnail images once available.
export const projects: Project[] = [
  {
    slug: "fundmaster",
    name: "Fundmaster",
    blurb: "Pension administration platform.",
    problem: "Describe the problem Fundmaster solved.",
    build: "Describe what you built and the stack.",
    result: "Describe the measurable result.",
    colorFrom: "#8B5A2B",
    colorTo: "#1C1B1A",
  },
  {
    slug: "kwamz-ai",
    name: "Kwamz AI",
    blurb: "M-Pesa agent dashboard.",
    problem: "Describe the problem Kwamz AI solved.",
    build: "Describe what you built and the stack.",
    result: "Describe the measurable result.",
    colorFrom: "#B87333",
    colorTo: "#3B2418",
  },
  {
    slug: "orb-expert-advisor",
    name: "ORB Expert Advisor",
    blurb: "MT5 trading bot.",
    problem: "Describe the problem the ORB EA solved.",
    build: "Describe what you built and the stack.",
    result: "Describe the measurable result.",
    colorFrom: "#3A3836",
    colorTo: "#1C1B1A",
  },
  {
    slug: "bookie-arbitrage",
    name: "Bookie Arbitrage Scraper",
    blurb: "Sports betting arbitrage scraper.",
    problem: "Describe the problem the scraper solved.",
    build: "Describe what you built and the stack.",
    result: "Describe the measurable result.",
    colorFrom: "#8A8580",
    colorTo: "#3B2418",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
