"use client";
import { Section } from "@/components/ui/section";
import { TimelineItem } from "@/components/ui/timeline-item";
import { GraduationCap } from "lucide-react";
import { education } from "./data/about";

export default function EducationSection() {
  return (
    <Section className="mb-20 bg-muted/50">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 flex items-center justify-center">
          <GraduationCap className="h-8 w-8 mr-3 text-primary" />
          Education & Learning
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          My educational background and continuous learning journey in
          technology
        </p>
      </div>

      <div className="space-y-8">
        {education.map((edu, index) => (
          <TimelineItem
            key={index}
            title={edu.degree}
            subtitle={edu.institution}
            period={edu.period}
            location={edu.location}
            description={edu.description}
            achievements={edu.achievements}
            technologies={edu.coursework}
          />
        ))}
      </div>
    </Section>
  );
}
