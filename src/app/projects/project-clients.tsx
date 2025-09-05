"use client";
import { useState } from "react";
import { Section } from "@/components/ui/section";
import { motion } from "framer-motion";
import { categories, projects } from "./data";
import ProjectCarousel from "./project-carousel";
import ProjectFilter from "./project-filter";
import ProjectCard from "./project-card";
import ProjectModal from "./project-modal";

export default function ProjectsClient() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((p) =>
          p.category.toLowerCase().includes(selectedCategory.replace("-", " "))
        );

  const featuredProjects = projects.filter((p) => p.featured);

  return (
    <motion.div initial="hidden" animate="visible">
      {/* Header */}
      <Section className="text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          My <span className="text-primary">Projects</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          A showcase of my work, featuring modern web applications built with
          cutting-edge technologies
        </p>
      </Section>

      {/* Featured Carousel */}
      <Section className="md:py-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Some of my most comprehensive and technically challenging work
          </p>
        </div>
        <ProjectCarousel
          projects={featuredProjects}
          onDetails={setSelectedProject}
        />
      </Section>

      {/* Category Filter */}
      <Section>
        <ProjectFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onSelect={setSelectedCategory}
        />
        <motion.div className="mx-4 grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((p) => (
            <ProjectCard
              key={p.id}
              project={p}
              onDetails={setSelectedProject}
            />
          ))}
        </motion.div>
      </Section>

      <ProjectModal
        project={selectedProject}
        onClose={() => setSelectedProject(null)}
      />
    </motion.div>
  );
}
