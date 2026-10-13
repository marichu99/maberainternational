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

// NOTE: colors here are placeholders standing in for real product screenshots.
// Swap `colorFrom`/`colorTo` out for actual thumbnail images once available.
// Copy below is draft case-study framing — tighten with real numbers once available.
export const projects: Project[] = [
  {
    slug: "fundmaster",
    name: "Fundmaster",
    blurb: "Pension administration platform.",
    problem:
      "A retirement fund operator was running member records, contributions, and statements through spreadsheets and manual reconciliation — slow, error-prone, and hard to audit.",
    build:
      "A web platform that automates contribution processing, member statements, and compliance reporting, with role-based access for fund administrators.",
    result:
      "Manual reconciliation work cut from days to hours, with an audit trail on every transaction.",
    colorFrom: "#8B5A2B",
    colorTo: "#1C1B1A",
  },
  {
    slug: "kwamz-ai",
    name: "Kwamz AI",
    blurb: "M-Pesa agent dashboard.",
    problem:
      "Mobile money agents had no real-time visibility into float, transaction volume, or commission — decisions were made blind, after the fact.",
    build:
      "A dashboard that ingests mobile money transaction data and surfaces live float position, transaction trends, and commission tracking per agent.",
    result:
      "Agents and operators get same-day visibility instead of end-of-week reconciliation.",
    colorFrom: "#B87333",
    colorTo: "#3B2418",
  },
  {
    slug: "orb-expert-advisor",
    name: "ORB Expert Advisor",
    blurb: "MT5 trading automation.",
    problem:
      "A systematic trading strategy existed on paper but depended on a trader watching the market open every session to execute it by hand.",
    build:
      "An MT5 expert advisor that detects the opening range and manages entries, stops, and position sizing automatically — no manual intervention required.",
    result: "The strategy now runs unattended across sessions with consistent, rules-based execution.",
    colorFrom: "#3A3836",
    colorTo: "#1C1B1A",
  },
  {
    slug: "bookie-arbitrage",
    name: "Bookie Arbitrage Scraper",
    blurb: "Odds-monitoring automation.",
    problem:
      "Arbitrage windows between bookmakers close within minutes — tracking odds by hand across multiple sites wasn't fast enough to act on.",
    build:
      "A system that polls multiple bookmakers' odds in real time, calculates arbitrage margins, and surfaces actionable opportunities as they appear.",
    result: "Opportunity detection moved from manual checking to continuous automated monitoring.",
    colorFrom: "#8A8580",
    colorTo: "#3B2418",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
