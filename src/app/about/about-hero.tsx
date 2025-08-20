"use client";
import { Section } from "@/components/ui/section";
import { Button } from "@/components/ui/button";
import TextExpander from "@/components/ui/TextExpander";
import Link from "next/link";
import Image from "next/image";
import { Download } from "lucide-react";
import { personalInfo } from "./data/about";

export default function AboutHero() {
  return (
    <Section>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
        {/* Left side text */}
        <div className="space-y-6">
          <div className="space-y-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-primary">Me</span>
            </h1>
            <p className="text-xl text-muted-foreground">
              Passionate Frontend Developer from Lagos, Nigeria
            </p>
          </div>

          <TextExpander>
            <p>
              I&apos;m a solution-oriented frontend developer with over 3 years
              of experience in building user-friendly, responsive and visually
              appealing web applications.
            </p>
            <p>
              I specialize in modern JavaScript frameworks like React.js and
              Next.js, and I&apos;m passionate about writing clean, efficient
              code to optimize performance.
            </p>
            <p>
              As a strong believer in continuous learning, I stay updated with
              industry trends to enhance my skills and deliver cutting-edge
              solutions.
            </p>
          </TextExpander>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-4 pt-6">
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {personalInfo.experience}
              </div>
              <div className="text-sm text-muted-foreground">Experience</div>
            </div>
            <div className="text-center p-4 bg-muted/50 rounded-lg">
              <div className="text-2xl font-bold text-primary">
                {personalInfo.projects}
              </div>
              <div className="text-sm text-muted-foreground">Projects</div>
            </div>
          </div>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 pt-4">
            <Button asChild size="lg">
              <Link href="/projects">View My Work</Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link
                href="/assets/Sodiq-Atiku-Frontend-Developer-Resume-CV.pdf"
                target="_blank"
              >
                <Download className="mr-2 h-4 w-4" />
                Download Resume
              </Link>
            </Button>
          </div>
        </div>

        {/* Right side image */}
        <div className="hidden md:block relative">
          <div className="relative w-80 h-80 mx-auto">
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full" />
            <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
              <Image
                src={personalInfo.image}
                alt="About image"
                className="cursor-pointer object-cover rounded-full brightness-[90%] dark:brightness-75"
                fill
              />
            </div>
          </div>
        </div>
      </div>
    </Section>
  );
}
