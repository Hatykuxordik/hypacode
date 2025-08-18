import { Section } from "@/components/ui/section";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { TimelineItem } from "@/components/ui/timeline-item";
import { Download, MapPin, Calendar, Award, Briefcase, GraduationCap } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About - Hypacode Portfolio",
  description: "Learn about my journey as a frontend developer, my experience, education, and passion for creating exceptional web experiences.",
  keywords: ["about", "experience", "education", "frontend developer", "web development", "career"],
};

const experiences = [
  {
    title: "Senior Frontend Developer",
    company: "TechCorp Solutions",
    location: "San Francisco, CA",
    period: "2022 - Present",
    description: "Leading frontend development for enterprise-level applications. Architecting scalable React applications, mentoring junior developers, and implementing modern development practices.",
    achievements: [
      "Improved application performance by 40% through code optimization",
      "Led migration from legacy codebase to modern React/TypeScript stack",
      "Mentored 5+ junior developers and established coding standards"
    ],
    technologies: ["React", "TypeScript", "Next.js", "GraphQL", "AWS"]
  },
  {
    title: "Frontend Developer",
    company: "StartupXYZ",
    location: "Austin, TX",
    period: "2020 - 2022",
    description: "Developed responsive web applications for a fast-growing fintech startup. Collaborated closely with design and backend teams to deliver pixel-perfect user interfaces.",
    achievements: [
      "Built and launched 3 major product features used by 10k+ users",
      "Reduced bundle size by 30% through code splitting and optimization",
      "Implemented comprehensive testing suite with 90%+ coverage"
    ],
    technologies: ["React", "Redux", "Styled Components", "Jest", "Cypress"]
  },
  {
    title: "Junior Frontend Developer",
    company: "WebAgency Pro",
    location: "Remote",
    period: "2019 - 2020",
    description: "Started my professional journey building websites and web applications for various clients. Gained experience in multiple frameworks and learned best practices.",
    achievements: [
      "Delivered 15+ client projects on time and within budget",
      "Learned modern development workflows and version control",
      "Contributed to open-source projects and community initiatives"
    ],
    technologies: ["HTML/CSS", "JavaScript", "Vue.js", "WordPress", "PHP"]
  }
];

const education = [
  {
    degree: "Bachelor of Science in Computer Science",
    institution: "University of Technology",
    location: "California, USA",
    period: "2015 - 2019",
    description: "Focused on software engineering, web technologies, and computer systems. Graduated with honors and participated in various coding competitions.",
    achievements: [
      "Graduated Magna Cum Laude with 3.8 GPA",
      "President of Computer Science Student Association",
      "Winner of Annual Hackathon 2018 & 2019"
    ],
    coursework: ["Data Structures", "Algorithms", "Web Development", "Database Systems", "Software Engineering"]
  },
  {
    degree: "Full Stack Web Development Bootcamp",
    institution: "CodeAcademy Intensive",
    location: "Online",
    period: "2018",
    description: "Intensive 6-month program covering modern web development technologies and best practices. Built multiple full-stack applications.",
    achievements: [
      "Top 5% of cohort with 98% completion rate",
      "Built and deployed 8 full-stack applications",
      "Received job placement assistance and career mentoring"
    ],
    coursework: ["React", "Node.js", "MongoDB", "Express", "DevOps"]
  }
];

const certifications = [
  { name: "AWS Certified Developer", issuer: "Amazon Web Services", year: "2023" },
  { name: "React Developer Certification", issuer: "Meta", year: "2022" },
  { name: "Google Analytics Certified", issuer: "Google", year: "2021" },
  { name: "Scrum Master Certified", issuer: "Scrum Alliance", year: "2021" }
];

const personalInfo = {
  location: "San Francisco, CA",
  experience: "5+ Years",
  projects: "50+ Projects",
  clients: "30+ Happy Clients"
};

export default function AboutPage() {
  return (
    <div className="min-h-screen py-20">
      {/* Header */}
      <Section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          About <span className="text-primary">Me</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Passionate frontend developer with a love for creating exceptional digital experiences. 
          Here's my journey, experience, and what drives me to build amazing web applications.
        </p>
      </Section>

      {/* Personal Introduction */}
      <Section className="mb-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">
              Hello, I'm <span className="text-primary">Hypacode</span>
            </h2>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I'm a passionate frontend developer with over 5 years of experience creating 
              user-friendly, responsive, and visually appealing web applications. My journey 
              started with a curiosity about how websites work, and it has evolved into a 
              deep passion for crafting exceptional digital experiences.
            </p>
            <p className="text-lg text-muted-foreground leading-relaxed">
              I specialize in modern JavaScript frameworks like React and Next.js, and I'm 
              always eager to learn new technologies and best practices. When I'm not coding, 
              you can find me contributing to open-source projects, writing technical articles, 
              or exploring the latest web development trends.
            </p>
            
            {/* Quick Stats */}
            <div className="grid grid-cols-2 gap-4 pt-6">
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{personalInfo.experience}</div>
                <div className="text-sm text-muted-foreground">Experience</div>
              </div>
              <div className="text-center p-4 bg-muted/50 rounded-lg">
                <div className="text-2xl font-bold text-primary">{personalInfo.projects}</div>
                <div className="text-sm text-muted-foreground">Projects</div>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button asChild size="lg">
                <Link href="/projects">View My Work</Link>
              </Button>
              <Button asChild variant="outline" size="lg">
                <Link href="/resume.pdf" target="_blank">
                  <Download className="mr-2 h-4 w-4" />
                  Download Resume
                </Link>
              </Button>
            </div>
          </div>

          {/* Profile Image */}
          <div className="relative">
            <div className="relative w-80 h-80 mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full" />
              <div className="absolute top-4 right-4 bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-medium flex items-center">
                <MapPin className="h-3 w-3 mr-1" />
                SF, CA
              </div>
              <div className="absolute bottom-8 left-8 bg-secondary text-secondary-foreground px-3 py-1 rounded-full text-sm font-medium">
                Available for Work
              </div>
              {/* Placeholder for profile image */}
              <div className="w-full h-full rounded-full bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center">
                <div className="text-6xl font-bold text-primary/20">H</div>
              </div>
            </div>
          </div>
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
            My professional journey in frontend development, from junior developer to senior roles
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
            My educational background and continuous learning journey in technology
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
            Professional certifications and recognitions that validate my expertise
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-6">
          {certifications.map((cert, index) => (
            <Card key={index} className="hover:shadow-lg transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg mb-2">{cert.name}</h3>
                    <p className="text-muted-foreground mb-2">{cert.issuer}</p>
                    <Badge variant="secondary" className="flex items-center w-fit">
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
            I'm always excited to take on new challenges and collaborate on interesting projects. 
            Let's create something amazing together!
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
  );
}

