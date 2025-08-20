"use client";

import { Section } from "@/components/ui/section";
import { FloatingCard } from "@/components/ui/floating-card";
import { Card, CardContent } from "@/components/ui/card";

export function ContinuousLearning() {
  const stats = [
    { value: "3+", label: "Years of Experience" },
    { value: "15+", label: "Technologies Mastered" },
    { value: "100+", label: "Hours of Learning/Month" },
  ];

  return (
    <Section className="py-12 sm:py-16">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Continuous Learning
        </h2>
        <p className="text-muted-foreground max-w-2xl mx-auto px-4">
          I&apos;m passionate about staying current with the latest web
          development trends and technologies. I regularly explore new
          frameworks, attend webinars, and contribute to open-source projects to
          enhance my skills and knowledge.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
        {stats.map((stat, index) => (
          <FloatingCard key={stat.label} delay={(index + 1) * 0.1}>
            <Card className="text-center">
              <CardContent className="p-6">
                <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
                  {stat.value}
                </div>
                <p className="text-muted-foreground">{stat.label}</p>
              </CardContent>
            </Card>
          </FloatingCard>
        ))}
      </div>
    </Section>
  );
}
