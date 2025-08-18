import { HeroSection } from "@/components/ui/hero-section";
import { Section } from "@/components/ui/section";
import { StatsCard } from "@/components/ui/stats-card";
import { CompactClock } from "@/components/ui/compact-clock";
import { AIProjectExplorer } from "@/components/ui/ai-project-explorer";
import { AnimatedSection } from "@/components/ui/animated-section";
import { StaggeredText } from "@/components/ui/staggered-text";
import { FloatingCard } from "@/components/ui/floating-card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Linkedin, Mail, Download, Sparkles } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { organizationSchema, personSchema, websiteSchema } from "@/lib/json-ld";
import { SocialIcon } from "@/components/ui/social-icon";
import AnimatedProfilePic from "../components/ui/AnimatedProfilePic";

export const dynamic = "force-static";

export default function HomePage() {
  const profileImages = [
    "/assets/profile1.jpg",
    "/assets/profile2.jpg",
    "/assets/profile3.jpg",
  ];

  const stats = [
    { value: "3+", label: "Years Experience", color: "text-blue-600" },
    { value: "15+", label: "Projects Completed", color: "text-green-600" },
    { value: "100%", label: "Client Satisfaction", color: "text-purple-600" },
  ];

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(personSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }}
      />

      {/* Compact Clock Widget */}
      <CompactClock />

      {/* Hero Section */}
      {/* <AnimatedSection>
        <Section className="pt-20 pb-16">
          <div className="text-center">
            <StaggeredText 
              text="Frontend Developer"
              className="text-4xl md:text-6xl font-bold mb-6"
            />
            <StaggeredText 
              text="Building Modern Web Experiences"
              className="text-xl md:text-2xl text-muted-foreground mb-8"
              delay={0.2}
            />
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto mb-12">
              Crafting responsive, user-friendly applications with React, Next.js, and modern technologies
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <MagneticButton>
                <Button size="lg" asChild>
                  <Link href="/projects">View My Work</Link>
                </Button>
              </MagneticButton>
              <MagneticButton>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/contact">Get In Touch</Link>
                </Button>
              </MagneticButton>
            </div>
          </div>
        </Section>
      </AnimatedSection> */}

      {/* AI Project Explorer */}
      {/* <AnimatedSection delay={0.4}>
        <Section className="py-20">
          <div className="text-center mb-12">
            <StaggeredText 
              text="AI Project Explorer"
              className="text-3xl font-bold mb-4 flex items-center justify-center"
            />
            <div className="flex items-center justify-center mb-4">
              <Sparkles className="h-8 w-8 mr-3 text-primary" />
            </div>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Chat with AI to discover my projects and technical expertise. Ask about specific technologies, 
              project complexity, or anything you'd like to know!
            </p>
          </div>
          
          <FloatingCard delay={0.6}>
            <AIProjectExplorer />
          </FloatingCard>
        </Section>
      </AnimatedSection> */}

      {/* About Preview Section */}
      <AnimatedSection direction="right" delay={0.2}>
        <Section className="pt-2 pb-20 md:pt-20 md:pb-20 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            <div>
              <p className="text-primary text-lg font-medium mb-2">
                Hello, I&apos;m
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Content */}
              <div className="space-y-6">
                <StaggeredText
                  text="Sodiq Atiku"
                  className="text-6xl font-bold text-primary"
                />
                <h3 className="text-2xl font-semibold text-muted-foreground">
                  Frontend Developer
                </h3>
                <p className="text-lg text-muted-foreground leading-relaxed">
                  Solution-oriented frontend developer with over 3 years of
                  experience in building user-friendly, responsive and visually
                  appealing web applications using modern technologies like
                  React.js, Next.js, and TypeScript.
                </p>

                {/* Social Links */}
                <div className="flex items-center space-x-4">
                  <SocialIcon
                    href="https://github.com/hatykuxordik"
                    label="GitHub"
                    Icon={Github}
                  />
                  <SocialIcon
                    href="https://linkedin.com/in/hatykuxordik"
                    label="LinkedIn"
                    Icon={Linkedin}
                  />
                  <SocialIcon
                    href="mailto:hatykuxordik@gmail.com"
                    label="Email"
                    Icon={Mail}
                  />
                </div>

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-4">
                  <MagneticButton asChild size="lg">
                    <Link href="/projects">View My Work</Link>
                  </MagneticButton>
                  <MagneticButton asChild variant="outline" size="lg">
                    <Link
                      href="/assets/Sodiq-Atiku-Frontend-Developer-Resume-CV.pdf"
                      target="_blank"
                    >
                      <Download className="mr-2 h-4 w-4" />
                      Download Resume
                    </Link>
                  </MagneticButton>
                </div>
              </div>

              {/* Profile Image */}
              <FloatingCard
                delay={0.4}
                hoverScale={1.05}
                hoverRotate={20}
                className="hover:shadow-none"
              >
                <AnimatedProfilePic
                  images={profileImages}
                  interval={4000} // Change image every 4 seconds
                />
              </FloatingCard>
            </div>
          </div>
        </Section>
      </AnimatedSection>

      {/* Stats Section */}
      <AnimatedSection delay={0.3}>
        <Section className="bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {stats.map((stat, i) => (
                <FloatingCard key={stat.label} delay={(i + 1) * 0.1}>
                  <StatsCard
                    value={stat.value}
                    label={stat.label}
                    valueClassName={stat.color}
                    className="bg-background shadow-lg"
                  />
                </FloatingCard>
              ))}
            </div>
          </div>
        </Section>
      </AnimatedSection>

      {/* Core Technologies Section */}
      <AnimatedSection direction="left" delay={0.2}>
        <Section>
          <div className="text-center mb-12">
            <StaggeredText
              text="Core Technologies"
              className="text-3xl font-bold mb-4"
            />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              The modern tools and technologies I use to build exceptional web
              experiences
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              "React.js",
              "Next.js",
              "TypeScript",
              "Tailwind CSS",
              "Firebase",
              "Redux",
            ].map((tech, index) => (
              <FloatingCard key={tech} delay={index * 0.1}>
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  {tech}
                </Badge>
              </FloatingCard>
            ))}
          </div>

          <div className="text-center">
            <MagneticButton asChild variant="outline" size="lg">
              <Link href="/skills">View All Skills</Link>
            </MagneticButton>
          </div>
        </Section>
      </AnimatedSection>
    </div>
  );
}
