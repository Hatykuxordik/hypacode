// app/page.tsx (Next.js 13+)
import Link from "next/link";
import { Github, Linkedin, Mail, Download } from "lucide-react";

// UI Components
import { Section } from "@/components/ui/section";
import { StatsCard } from "@/components/ui/stats-card";
import { CompactClock } from "@/components/ui/compact-clock";
import { AnimatedSection } from "@/components/ui/animated-section";
import { StaggeredText } from "@/components/ui/staggered-text";
import { FloatingCard } from "@/components/ui/floating-card";
import { MagneticButton } from "@/components/ui/magnetic-button";
import { Badge } from "@/components/ui/badge";
import { SocialIcon } from "@/components/ui/social-icon";
import AnimatedProfilePic from "@/components/ui/AnimatedProfilePic";

// SEO / JSON-LD
import { organizationSchema, personSchema, websiteSchema } from "@/lib/json-ld";

// Next.js Static Rendering
export const dynamic = "force-static";

export default function HomePage() {
  // ✅ Centralized config
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

  const socials = [
    {
      href: "https://github.com/hatykuxordik",
      label: "GitHub",
      Icon: Github,
    },
    {
      href: "https://linkedin.com/in/hatykuxordik",
      label: "LinkedIn",
      Icon: Linkedin,
    },
    {
      href: "mailto:hatykuxordik@gmail.com",
      label: "Email",
      Icon: Mail,
    },
  ];

  const technologies = [
    "React.js",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Firebase",
    "Redux",
  ];

  return (
    <div className="min-h-screen">
      {/* ✅ Structured SEO (JSON-LD) */}
      {[organizationSchema, personSchema, websiteSchema].map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}

      {/* Clock Widget */}
      <CompactClock />

      {/* === About Section === */}
      <AnimatedSection direction="right" delay={0.2}>
        <Section className="pt-2 pb-20 md:pt-20 px-4 sm:px-6 mg:px-8">
          <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
            {/* Content */}
            <div className="space-y-6">
              <p className="text-primary text-lg font-medium">
                Hello, I&apos;m
              </p>
              <StaggeredText
                text="Sodiq Atiku"
                className="text-4xl sm:text-5xl lg:text-6xl font-bold text-primary"
              />
              <h3 className="text-xl sm:text-2xl font-semibold text-muted-foreground">
                Frontend Developer
              </h3>
              <p className="text-base sm:text-lg text-muted-foreground leading-relaxed">
                Solution-oriented frontend developer with over 3 years of
                experience building responsive, user-friendly, and visually
                engaging applications using React.js, Next.js, and TypeScript.
              </p>

              {/* Social Links */}
              <div className="flex items-center space-x-4">
                {socials.map(({ href, label, Icon }) => (
                  <SocialIcon
                    key={label}
                    href={href}
                    label={label}
                    Icon={Icon}
                  />
                ))}
              </div>

              {/* CTA Buttons */}
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

            {/* Profile Picture */}
            <FloatingCard
              delay={0.4}
              hoverScale={1.05}
              hoverRotate={2}
              className="hover:shadow-none"
            >
              <AnimatedProfilePic images={profileImages} interval={4000} />
            </FloatingCard>
          </div>
        </Section>
      </AnimatedSection>

      {/* === Stats Section === */}
      <AnimatedSection delay={0.3}>
        <Section className="bg-muted/50">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 sm:grid-cols-3 gap-6">
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
        </Section>
      </AnimatedSection>

      {/* === Core Technologies === */}
      <AnimatedSection direction="left" delay={0.2}>
        <Section>
          <div className="text-center mb-12">
            <StaggeredText
              text="Core Technologies"
              className="text-2xl sm:text-3xl font-bold mb-4"
            />
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Tools and frameworks I use to build high-performance web
              applications
            </p>
          </div>

          {/* Tech Badges */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {technologies.map((tech, i) => (
              <FloatingCard key={tech} delay={i * 0.1}>
                <Badge variant="secondary" className="px-4 py-2 text-sm">
                  {tech}
                </Badge>
              </FloatingCard>
            ))}
          </div>

          {/* CTA */}
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
