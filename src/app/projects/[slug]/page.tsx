import Link from "next/link";
import { notFound } from "next/navigation";
import { getProject, projects } from "@/data/projects";

export function generateStaticParams() {
  return projects.map((project) => ({ slug: project.slug }));
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <main className="min-h-screen bg-charcoal px-[6vw] py-24 text-bone">
      <Link href="/#projects" className="text-sm uppercase tracking-[0.3em] text-stone">
        ← Back
      </Link>

      <h1 className="font-display mt-8 text-5xl md:text-7xl">{project.name}</h1>
      <p className="mt-4 max-w-2xl text-xl text-stone">{project.blurb}</p>

      <div
        className="mt-12 h-64 w-full max-w-3xl rounded-sm"
        style={{
          background: `linear-gradient(135deg, ${project.colorFrom}, ${project.colorTo})`,
        }}
      />

      <div className="mt-16 grid max-w-3xl gap-10 md:grid-cols-3">
        <div>
          <h2 className="font-display text-sm uppercase tracking-[0.3em] text-copper">
            Problem
          </h2>
          <p className="mt-3 text-bone">{project.problem}</p>
        </div>
        <div>
          <h2 className="font-display text-sm uppercase tracking-[0.3em] text-copper">
            What I built
          </h2>
          <p className="mt-3 text-bone">{project.build}</p>
        </div>
        <div>
          <h2 className="font-display text-sm uppercase tracking-[0.3em] text-copper">
            Result
          </h2>
          <p className="mt-3 text-bone">{project.result}</p>
        </div>
      </div>
    </main>
  );
}
