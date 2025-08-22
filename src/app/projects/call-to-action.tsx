"use client";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Play } from "lucide-react";

export default function CallToAction() {
  return (
    <Section className="text-center py-10">
      <div className="max-w-2xl mx-auto space-y-6">
        <h2 className="text-3xl font-bold">Interested in Working Together?</h2>
        <p className="text-xl text-muted-foreground">
          I&apos;m always excited to take on new challenges and build amazing
          digital experiences.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button asChild size="lg">
            <Link href="/contact">Start a Project</Link>
          </Button>
          <Button asChild variant="outline" size="lg">
            <Link href="/tools">
              Try My Tools <Play className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </Section>
  );
}
