"use client";

import { AnimatedSection } from "@/components/ui/animated-section";
import { SkillCategory } from "./skill-category";
import { AdditionalTechnologies } from "./additional-technologies";
import { ContinuousLearning } from "./continuous-learning";
import { additionalTechnologies, skillCategories } from "./data";

export default function SkillsPage() {
  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 overflow-y-hidden">
        {/* Header */}
        <AnimatedSection>
          <section className="py-20 text-center">
            <h1 className="text-4xl sm:text-5xl font-bold mb-4">
              My <span className="text-primary">Skills</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
              A comprehensive overview of my technical expertise and the tools I
              use to build modern, scalable, and user-friendly web applications.
            </p>
          </section>
        </AnimatedSection>

        {/* Categories */}
        {skillCategories.map((category, i) => (
          <AnimatedSection key={category.title} delay={i * 0.1}>
            <SkillCategory title={category.title} skills={category.skills} />
          </AnimatedSection>
        ))}

        {/* Additional Tech */}
        <AnimatedSection delay={0.4}>
          <AdditionalTechnologies items={additionalTechnologies} />
        </AnimatedSection>

        {/* Continuous Learning */}
        <AnimatedSection delay={0.6}>
          <ContinuousLearning />
        </AnimatedSection>
      </div>
    </div>
  );
}
