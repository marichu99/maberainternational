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
    slug: "wardqueue",
    name: "WardQueue",
    blurb: "Job-application bot for UK allied-health roles.",
    problem:
      "Allied-health professionals in the UK lose hours re-entering the same information into dozens of job applications on healthjobsuk.com, one posting at a time.",
    build:
      "A bot that applies to matching postings on the candidate's behalf, backed by a dashboard that reports how many jobs were applied to today versus how many are still queued.",
    result:
      "Job hunting moves from a manual, repetitive task to something that runs in the background while the candidate works.",
    colorFrom: "#B5472B",
    colorTo: "#15181A",
  },
  {
    slug: "leviathan",
    name: "Leviathan",
    blurb: "Tender and supplier management system.",
    problem:
      "Tracking active tenders, suppliers, products, and contracts across spreadsheets made it easy to miss deadlines and lose visibility into which supplier was tied to which contract.",
    build:
      "A full-stack system that centralizes tenders, suppliers, products, and contracts behind role-based auth, with a single source of truth for what's active and what's expired.",
    result: "Tender and contract status is now one query away instead of scattered across spreadsheets.",
    colorFrom: "#0f3460",
    colorTo: "#0d1b2a",
  },
  {
    slug: "tally333",
    name: "Tally333",
    blurb: "Live election results tallying with AI form reading.",
    problem:
      "Parallel vote tabulation for Kenyan elections traditionally needs an army of people manually reading and re-keying results forms from thousands of polling stations before a trustworthy count can be published.",
    build:
      "Field agents photograph a results form at their polling station, Claude's vision model reads the candidate names and vote counts off it, and a live dashboard tallies results in real time as submissions are approved — covering all 6 elective positions across 47 counties, 290 constituencies, and roughly 24,600 polling stations.",
    result:
      "Results move from a photographed form to a verified, live public tally with no manual data-entry pipeline in between.",
    colorFrom: "#3B6E53",
    colorTo: "#1C1B1A",
  },
];

export function getProject(slug: string) {
  return projects.find((project) => project.slug === slug);
}
