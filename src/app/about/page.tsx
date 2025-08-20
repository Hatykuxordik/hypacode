import { Section } from "@/components/ui/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TimelineItem } from "@/components/ui/timeline-item";
import {
  Download,
  Calendar,
  Award,
  Briefcase,
  GraduationCap,
  Code,
  Users,
  Lightbulb,
  Target,
} from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import Image from "next/image";
import TextExpander from "@/components/ui/TextExpander";

export const metadata: Metadata = {
  title: "About - Hypacode Portfolio",
  description:
    "Learn about my journey as a frontend developer, my experience, education, and passion for creating exceptional web experiences.",
  keywords: [
    "about",
    "experience",
    "education",
    "frontend developer",
    "web development",
    "career",
  ],
};

const experiences = [
  {
    title: "Frontend Developer",
    company: "Freelance / Personal Projects",
    location: "Remote",
    period: "06/2023 – Present",
    description:
      "Building responsive, accessible, and visually appealing UIs for various projects. Collaborated with backend teams, integrated APIs, and optimized performance across applications.",
    achievements: [
      "Developed responsive UIs from Figma designs with cross-browser compatibility and WCAG compliance",
      "Built and deployed landing pages, dashboards, and blogs with Tailwind, TypeScript, and Firebase",
      "Integrated payment gateways, authentication, and Google Maps APIs for production-ready features",
      "Refactored legacy code and implemented lazy loading & code-splitting, improving load times by 45%",
      "Maintained client communication and feedback loops to align with project scope",
    ],
    technologies: [
      "React.js",
      "Next.js",
      "TypeScript",
      "Tailwind CSS",
      "Firebase",
      "Supabase",
    ],
  },
  {
    title: "Web Developer",
    company: "Self-Employed",
    location: "Ile-Ife, Nigeria",
    period: "07/2024 – 12/2024",
    description:
      "Delivered websites for small businesses, focusing on responsive design, performance optimization, and interactive user experiences.",
    achievements: [
      "Developed 3+ landing pages and marketing websites using HTML5, CSS3, JavaScript, and Tailwind",
      "Translated Figma designs into responsive, cross-browser compatible web pages",
      "Optimized CSS payloads and layout rendering, improving mobile performance by 30%",
      "Integrated forms with Formspree and added smooth GSAP animations",
      "Participated in code reviews and strengthened Git/GitHub workflows",
    ],
    technologies: [
      "HTML5",
      "CSS3",
      "JavaScript",
      "Tailwind CSS",
      "GSAP",
      "Git/GitHub",
    ],
  },
  {
    title: "Frontend Engineer (React + Firebase)",
    company: "Independent Project Work",
    location: "Remote",
    period: "11/2023 – 03/2024",
    description:
      "Designed and developed modular systems and dashboards with real-time features and state-driven logic for seamless user interactions.",
    achievements: [
      "Built a modular KYC onboarding system with file uploads, inline validations, and dynamic state-driven forms",
      "Created a real-time dashboard with transaction filtering and contextual sorting",
      "Integrated authentication and live-update APIs ensuring seamless data flow",
    ],
    technologies: ["React.js", "Firebase", "TypeScript", "Tailwind CSS"],
  },
];

const education = [
  {
    degree: "Bachelor of Science in Biochemistry and Molecular Biology",
    institution: "Obafemi Awolowo University (OAU)",
    location: "Ile-Ife, Nigeria",
    period: "2019 – 2024",
    description:
      "Undergraduate degree with strong emphasis on biochemical pathways, molecular biology, and experimental pharmacology.",
    achievements: [
      "Graduated with Second Class Honors (4.32/5.0)",
      "AOJF 2024 Undergraduate Research Grant Recipient",
      "Team Lead for over 20 undergraduate students, mentoring peers through study forums, curated resources, and mock assessments",
      "Delivered lectures as an Academic Tutor to 200–300 level undergraduates",
    ],
    coursework: [
      "Protein and Lipid Biochemistry",
      "Lipoprotein Metabolism and Transport",
      "Organic and Molecular Spectroscopy",
      "Drug Design and Delivery",
      "Pharmacotechnology and Drug Formulation",
      "Systems Biology and Metabolic Pathways",
    ],
  },
  {
    degree: "Ongoing Full Stack Web Development Training",
    institution: "Self-Guided (Udemy, YouTube, Docs)",
    location: "Online",
    period: "2019 – Present",
    description:
      "Continuous professional development through online resources, project-based learning, and constant exploration of emerging web technologies.",
    achievements: [
      "Self-taught JavaScript, React, Next.js, and TypeScript while building production-level projects",
      "Adapted quickly to new frameworks and libraries",
      "Applied modern frontend and backend practices to freelance and personal projects",
    ],
    coursework: [
      "Html and Css",
      "JavaScript",
      "React",
      "Next.js",
      "TypeScript",
      "Firebase",
      "TTailwind CSS",
    ],
  },
];

const certifications = [
  {
    name: "AWS Certified Developer",
    issuer: "Amazon Web Services",
    year: "2023",
  },
  { name: "React Developer Certification", issuer: "Meta", year: "2022" },
  { name: "Google Analytics Certified", issuer: "Google", year: "2021" },
  { name: "Scrum Master Certified", issuer: "Scrum Alliance", year: "2021" },
];

const personalInfo = {
  location: "Nigeria, Lagos",
  experience: "3+ Years",
  projects: "15+ Projects",
  clients: "10+ Happy Clients",
  image: "/assets/profile1.jpg",
};

const values = [
  {
    icon: Code,
    title: "Clean Code",
    description:
      "I believe in writing clean, efficient, and maintainable code that follows best practices and industry standards.",
  },
  {
    icon: Users,
    title: "Collaboration",
    description:
      "I thrive in collaborative environments, working closely with cross-functional teams to create seamless user experiences.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description:
      "I stay updated with industry trends and continuously learn new technologies to deliver cutting-edge solutions.",
  },
  {
    icon: Target,
    title: "Goal-Oriented",
    description:
      "I focus on delivering solutions that align with business goals and provide real value to users and stakeholders.",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <Section>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
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
                  I&apos;m a solution-oriented frontend developer with over 3
                  years of experience in building user-friendly, responsive and
                  visually appealing web applications. My journey in web
                  development started with a curiosity about how websites work,
                  and it has evolved into a passion for creating digital
                  experiences that make a difference.
                </p>

                <p>
                  I specialize in modern JavaScript frameworks like React.js and
                  Next.js, and I&apos;m passionate about writing clean,
                  efficient code to optimize performance and compatibility. I
                  have experience working with TypeScript, Tailwind CSS,
                  Firebase, Supabase, and various API integrations.
                </p>

                <p>
                  As a strong believer in continuous learning, I stay updated
                  with industry trends to enhance my skills and deliver
                  cutting-edge solutions. I thrive in collaborative
                  environments, working closely with cross-functional teams to
                  create seamless user experiences that align with business
                  goals.
                </p>
              </TextExpander>

              <div className="grid grid-cols-2 gap-4 pt-6">
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    {personalInfo.experience}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    Experience
                  </div>
                </div>
                <div className="text-center p-4 bg-muted/50 rounded-lg">
                  <div className="text-2xl font-bold text-primary">
                    {personalInfo.projects}
                  </div>
                  <div className="text-sm text-muted-foreground">Projects</div>
                </div>
              </div>

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

            <div className="hidden md:block relative">
              <div className="relative w-80 h-80 mx-auto">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full" />
                {/* Placeholder for profile image */}
                <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                  <Image
                    src={personalInfo.image}
                    alt={`About image`}
                    className="cursor-pointer object-cover rounded-full brightness-[90%] dark:brightness-75"
                    fill
                  />
                </div>
              </div>
            </div>
          </div>
        </Section>

        {/* Values Section */}
        <Section>
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">My Core Values</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              These principles guide my approach to development and
              collaboration, ensuring I deliver high-quality solutions that
              exceed expectations.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Card key={index} className="hover-lift ">
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className="p-3 bg-primary/10 rounded-lg">
                        <Icon className="h-6 w-6 text-primary" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-lg font-semibold">{value.title}</h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                          {value.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </Section>

        {/* Experience Section */}
        <Section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center">
              <Briefcase className="h-8 w-8 mr-3 text-primary" />
              Professional Experience
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              My professional journey in frontend development, from junior
              developer to senior roles
            </p>
          </div>

          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <TimelineItem
                key={index}
                title={exp.title}
                subtitle={exp.company}
                period={exp.period}
                location={exp.location}
                description={exp.description}
                achievements={exp.achievements}
                technologies={exp.technologies}
              />
            ))}
          </div>
        </Section>

        {/* Education Section */}
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

        {/* Certifications */}
        <Section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center">
              <Award className="h-8 w-8 mr-3 text-primary" />
              Certifications & Achievements
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Professional certifications and recognitions that validate my
              expertise
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            {certifications.map((cert, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <h3 className="font-semibold text-lg mb-2">
                        {cert.name}
                      </h3>
                      <p className="text-muted-foreground mb-2">
                        {cert.issuer}
                      </p>
                      <Badge
                        variant="secondary"
                        className="flex items-center w-fit"
                      >
                        <Calendar className="h-3 w-3 mr-1" />
                        {cert.year}
                      </Badge>
                    </div>
                    <Award className="h-8 w-8 text-primary/60" />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </Section>

        {/* CTA Section */}
        <Section className="text-center py-20">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">Let's Work Together</h2>
            <p className="text-xl text-muted-foreground">
              I'm always excited to take on new challenges and collaborate on
              interesting projects. Let's create something amazing together!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">Get In Touch</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/projects">View My Projects</Link>
              </Button>
            </div>
          </div>
        </Section>
      </div>
    </div>
  );
}
