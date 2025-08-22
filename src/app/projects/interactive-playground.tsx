"use client";
import { Section } from "@/components/ui/section";
import { LiveCodeSandbox } from "@/components/ui/live-code-sandbox";

export default function InteractivePlayground() {
  return (
    <Section>
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Try It Yourself</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Experiment with my open-source components right in your browser.
        </p>
      </div>
      <LiveCodeSandbox />
    </Section>
  );
}
