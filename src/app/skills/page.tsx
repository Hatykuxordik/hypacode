"use client";

import { useState } from "react";
import { Section } from "@/components/ui/section";
import { AnimatedSection } from "@/components/ui/animated-section";
import { StaggeredText } from "@/components/ui/staggered-text";
import { FloatingCard } from "@/components/ui/floating-card";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { motion } from "framer-motion";
import { 
  Code, 
  Palette, 
  Database, 
  Cloud, 
  Smartphone, 
  Zap,
  Globe,
  GitBranch,
  TestTube,
  Layers,
  Code2,
  Paintbrush,
  Server,
  Shield,
  Settings,
  TrendingUp
} from "lucide-react";

const skillCategories = [
  {
    title: "Frontend Technologies",
    skills: [
      { 
        name: "React.js", 
        icon: Code2,
        description: "Building dynamic and interactive user interfaces with hooks, context, and modern patterns.",
        proficiency: "Expert",
        level: 95
      },
      { 
        name: "Next.js", 
        icon: Code2,
        description: "Server-side rendering, static generation, and full-stack React applications.",
        proficiency: "Advanced",
        level: 90
      },
      { 
        name: "TypeScript", 
        icon: Code2,
        description: "Type-safe JavaScript development for better code quality and maintainability.",
        proficiency: "Advanced",
        level: 88
      },
      { 
        name: "JavaScript (ES6+)", 
        icon: Code2,
        description: "Modern JavaScript features, async/await, modules, and functional programming.",
        proficiency: "Expert",
        level: 92
      }
    ]
  },
  {
    title: "Styling & Design",
    skills: [
      { 
        name: "Tailwind CSS", 
        icon: Paintbrush,
        description: "Utility-first CSS framework for rapid UI development and consistent design systems.",
        proficiency: "Expert",
        level: 92
      },
      { 
        name: "SASS/SCSS", 
        icon: Paintbrush,
        description: "Advanced CSS with variables, mixins, and modular architecture.",
        proficiency: "Advanced",
        level: 88
      },
      { 
        name: "Responsive Design", 
        icon: Smartphone,
        description: "Mobile-first approach ensuring perfect rendering across all devices.",
        proficiency: "Expert",
        level: 95
      },
      { 
        name: "CSS Animations", 
        icon: Zap,
        description: "Creating smooth transitions, keyframe animations, and micro-interactions.",
        proficiency: "Advanced",
        level: 85
      }
    ]
  },
  {
    title: "Backend & Database",
    skills: [
      { 
        name: "Firebase", 
        icon: Database,
        description: "Authentication, Firestore database, hosting, and real-time data synchronization.",
        proficiency: "Advanced",
        level: 85
      },
      { 
        name: "Supabase", 
        icon: Database,
        description: "PostgreSQL database, authentication, and real-time subscriptions.",
        proficiency: "Intermediate",
        level: 75
      },
      { 
        name: "API Integration", 
        icon: Globe,
        description: "RESTful APIs, GraphQL, payment gateways, and third-party service integration.",
        proficiency: "Advanced",
        level: 88
      },
      { 
        name: "Authentication", 
        icon: Shield,
        description: "JWT tokens, OAuth, social logins, and secure user management.",
        proficiency: "Advanced",
        level: 82
      }
    ]
  },
  {
    title: "State Management & Tools",
    skills: [
      { 
        name: "Redux Toolkit", 
        icon: Settings,
        description: "Predictable state management for complex applications with modern Redux patterns.",
        proficiency: "Advanced",
        level: 85
      },
      { 
        name: "Git & GitHub", 
        icon: GitBranch,
        description: "Version control, branching strategies, pull requests, and collaborative development.",
        proficiency: "Advanced",
        level: 92
      },
      { 
        name: "Deployment", 
        icon: Cloud,
        description: "Vercel, Netlify, and other modern deployment platforms with CI/CD.",
        proficiency: "Advanced",
        level: 88
      },
      { 
        name: "Performance Optimization", 
        icon: TrendingUp,
        description: "Code splitting, lazy loading, image optimization, and Core Web Vitals.",
        proficiency: "Advanced",
        level: 85
      }
    ]
  }
];

const additionalTechnologies = [
  "GSAP Animations", "Framer Motion", "React Hook Form", "Zod Validation",
  "Shadcn/ui Components", "Figma to Code", "Cross-browser Compatibility",
  "WCAG Accessibility", "SEO Optimization", "Google Maps API", "Stripe Integration", "Formspree Forms"
];

const getProficiencyColor = (proficiency: string) => {
  switch (proficiency) {
    case "Expert":
      return "text-green-600 bg-green-50 border-green-200";
    case "Advanced":
      return "text-blue-600 bg-blue-50 border-blue-200";
    case "Intermediate":
      return "text-yellow-600 bg-yellow-50 border-yellow-200";
    default:
      return "text-gray-600 bg-gray-50 border-gray-200";
  }
};

export default function SkillsPage() {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <div className="min-h-screen py-12 sm:py-16 lg:py-20">
      {/* Header */}
      <AnimatedSection>
        <Section className="text-center mb-12 sm:mb-16">
          <StaggeredText
            text="My Skills"
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6"
          />
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            A comprehensive overview of my technical expertise and the tools I use to build 
            modern, scalable, and user-friendly web applications.
          </p>
        </Section>
      </AnimatedSection>

      {/* Skill Categories */}
      {skillCategories.map((category, categoryIndex) => (
        <AnimatedSection key={category.title} delay={categoryIndex * 0.1}>
          <Section className="mb-16 sm:mb-20">
            <div className="text-center mb-8 sm:mb-12">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">{category.title}</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
              {category.skills.map((skill, skillIndex) => (
                <motion.div
                  key={skill.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: skillIndex * 0.1 }}
                  onHoverStart={() => setHoveredSkill(skill.name)}
                  onHoverEnd={() => setHoveredSkill(null)}
                >
                  <Card className="h-full hover:shadow-lg transition-all duration-300 group">
                    <CardContent className="p-6 text-center">
                      {/* Icon */}
                      <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                        <skill.icon className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
                      </div>
                      
                      {/* Skill Name */}
                      <h3 className="text-lg font-semibold mb-2">{skill.name}</h3>
                      
                      {/* Description */}
                      <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
                        {skill.description}
                      </p>
                      
                      {/* Proficiency Badge */}
                      <div className="mb-4">
                        <Badge 
                          variant="outline" 
                          className={`${getProficiencyColor(skill.proficiency)} font-medium`}
                        >
                          Proficiency: {skill.proficiency}
                        </Badge>
                      </div>
                      
                      {/* Progress Bar */}
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Proficiency</span>
                          <span className="font-medium">{skill.level}%</span>
                        </div>
                        <Progress 
                          value={hoveredSkill === skill.name ? skill.level : 0} 
                          className="h-2"
                        />
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </Section>
        </AnimatedSection>
      ))}

      {/* Additional Technologies */}
      <AnimatedSection delay={0.4}>
        <Section className="bg-muted/30 py-12 sm:py-16">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Additional Technologies & Tools</h2>
          </div>
          
          <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
            {additionalTechnologies.map((tech, index) => (
              <motion.div
                key={tech}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
              >
                <Badge 
                  variant="outline" 
                  className="text-sm py-2 px-4 hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
                >
                  {tech}
                </Badge>
              </motion.div>
            ))}
          </div>
        </Section>
      </AnimatedSection>

      {/* Continuous Learning */}
      <AnimatedSection delay={0.6}>
        <Section className="py-12 sm:py-16">
          <div className="text-center mb-8 sm:mb-12">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">Continuous Learning</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto px-4">
              I'm passionate about staying current with the latest web development trends and technologies. 
              I regularly explore new frameworks, attend webinars, and contribute to open-source projects 
              to enhance my skills and knowledge.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <FloatingCard delay={0.1}>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">3+</div>
                  <p className="text-muted-foreground">Years of Experience</p>
                </CardContent>
              </Card>
            </FloatingCard>

            <FloatingCard delay={0.2}>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">15+</div>
                  <p className="text-muted-foreground">Technologies Mastered</p>
                </CardContent>
              </Card>
            </FloatingCard>

            <FloatingCard delay={0.3}>
              <Card className="text-center">
                <CardContent className="p-6">
                  <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">100+</div>
                  <p className="text-muted-foreground">Hours of Learning/Month</p>
                </CardContent>
              </Card>
            </FloatingCard>
          </div>
        </Section>
      </AnimatedSection>
    </div>
  );
}

