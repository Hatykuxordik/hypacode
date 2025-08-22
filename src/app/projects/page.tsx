import { Metadata } from "next";
import ProjectsClient from "./project-clients";
import InteractivePlayground from "./interactive-playground";
import CallToAction from "./call-to-action";

export const metadata: Metadata = {
  title: "Projects - Hypacode Portfolio",
  description:
    "Explore my portfolio of web development projects built with React, Next.js, TypeScript, and modern technologies.",
  keywords: [
    "projects",
    "portfolio",
    "react",
    "nextjs",
    "web development",
    "frontend",
  ],
};
export default function ProjectsPage() {
  return (
    <section className="max-w-7xl mx-4 md:mx-auto ">
      <ProjectsClient />
      <InteractivePlayground />
      <CallToAction />
    </section>
  );
}

// Client Component for interactivity
