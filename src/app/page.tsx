import { Hero } from "@/components/hero/hero";
import { About } from "@/components/about/about";
import { Projects } from "@/components/projects/projects";
import { BentoGrid } from "@/components/bento/bento-grid";
import { SkillsPlayground } from "@/components/skills/skills-playground";
import { Contact } from "@/components/contact/contact";
import { SiteFooter } from "@/components/contact/site-footer";

export default function Home() {
  return (
    <>
      <main>
        <Hero />
        <About />
        <Projects />
        <BentoGrid />
        <SkillsPlayground />
        <Contact />
      </main>
      <SiteFooter />
    </>
  );
}
