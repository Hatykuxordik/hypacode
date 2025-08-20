"use client";
import { Section } from "@/components/ui/section";
import { TimelineItem } from "@/components/ui/timeline-item";
import { Briefcase } from "lucide-react";
import { experiences } from "./data/about";

export default function ExperienceSection() {
  return (
    <Section className="mb-20">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold mb-4 flex items-center justify-center">
          <Briefcase className="h-8 w-8 mr-3 text-primary" />
          Professional Experience
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          My professional journey in frontend development
        </p>
      </div>

      <div className="space-y-8">
        {experiences.map((exp, index) => (
          <TimelineItem key={index} {...exp} />
        ))}
      </div>
    </Section>
  );
}
