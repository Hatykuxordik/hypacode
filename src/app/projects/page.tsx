import { Section } from "@/components/ui/section";
import { ProjectCard } from "@/components/ui/project-card";
import { InteractivePlayground } from "@/components/ui/interactive-playground";
import { BuildWithMePlayground } from "@/components/ui/build-with-me-playground";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Github, Play, Layout } from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects - Hypacode Portfolio",
  description: "Explore my portfolio of web development projects built with React, Next.js, TypeScript, and modern technologies.",
  keywords: ["projects", "portfolio", "react", "nextjs", "web development", "frontend"],
};

const projects = [
  {
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform with user authentication, payment processing, inventory management, and admin dashboard. Built with Next.js, TypeScript, and Stripe integration.",
    image: "/api/placeholder/600/400",
    tags: ["Next.js", "TypeScript", "Stripe", "Prisma", "PostgreSQL", "Tailwind CSS"],
    liveUrl: "https://ecommerce-demo.hypacode.com",
    githubUrl: "https://github.com/hypacode/ecommerce-platform",
    featured: true,
    category: "Full Stack"
  },
  {
    title: "SaaS Analytics Dashboard",
    description: "Comprehensive analytics dashboard with real-time data visualization, user management, and subscription handling. Features interactive charts and responsive design.",
    image: "/api/placeholder/600/400",
    tags: ["React", "D3.js", "Node.js", "MongoDB", "Socket.io", "Chart.js"],
    liveUrl: "https://analytics-demo.hypacode.com",
    githubUrl: "https://github.com/hypacode/saas-dashboard",
    featured: true,
    category: "SaaS"
  },
  {
    title: "Mobile Banking App",
    description: "Secure mobile banking application with biometric authentication, real-time transactions, and comprehensive financial management tools.",
    image: "/api/placeholder/600/400",
    tags: ["React Native", "Firebase", "Plaid API", "Redux", "TypeScript"],
    liveUrl: "https://banking-demo.hypacode.com",
    githubUrl: "https://github.com/hypacode/mobile-banking",
    featured: true,
    category: "Mobile"
  },
  {
    title: "Task Management System",
    description: "Collaborative task management platform with real-time updates, team collaboration features, and project tracking capabilities.",
    image: "/api/placeholder/600/400",
    tags: ["Next.js", "Supabase", "TypeScript", "Framer Motion", "Tailwind CSS"],
    liveUrl: "https://tasks-demo.hypacode.com",
    githubUrl: "https://github.com/hypacode/task-management",
    featured: false,
    category: "Productivity"
  },
  {
    title: "Real Estate Platform",
    description: "Modern real estate platform with property listings, advanced search filters, virtual tours, and agent management system.",
    image: "/api/placeholder/600/400",
    tags: ["React", "Node.js", "Express", "MongoDB", "Cloudinary", "Mapbox"],
    liveUrl: "https://realestate-demo.hypacode.com",
    githubUrl: "https://github.com/hypacode/real-estate",
    featured: false,
    category: "Business"
  },
  {
    title: "Social Media Dashboard",
    description: "Social media management dashboard for scheduling posts, analyzing engagement, and managing multiple social media accounts.",
    image: "/api/placeholder/600/400",
    tags: ["Vue.js", "Laravel", "MySQL", "Redis", "Social APIs"],
    liveUrl: "https://social-demo.hypacode.com",
    githubUrl: "https://github.com/hypacode/social-dashboard",
    featured: false,
    category: "Marketing"
  }
];

const categories = ["All", "Full Stack", "SaaS", "Mobile", "Productivity", "Business", "Marketing"];

export default function ProjectsPage() {
  const featuredProjects = projects.filter(project => project.featured);
  
  return (
    <div className="min-h-screen py-20">
      {/* Header */}
      <Section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          My <span className="text-primary">Projects</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          A collection of web applications and tools I've built using modern technologies. 
          Each project showcases different aspects of full-stack development and user experience design.
        </p>
      </Section>

      {/* Interactive Playground */}
      <Section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">
            Interactive <span className="text-primary">Component Playground</span>
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Want to see how I handle theming and component design? Play with the controls below 
            and watch the component update in real-time. This demonstrates my approach to 
            building flexible, customizable UI components.
          </p>
        </div>
        
        <InteractivePlayground />
      </Section>

      {/* Build with Me Playground */}
      <Section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4 flex items-center justify-center">
            <Layout className="h-8 w-8 mr-3 text-primary" />
            Build with Me Playground
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Experience real-time UI building! Drag and drop components to create your layout, 
            watch the code generate live, and export your creation. This showcases advanced 
            state management and live code generation capabilities.
          </p>
        </div>
        
        <BuildWithMePlayground />
      </Section>

      {/* Featured Projects */}
      <Section className="mb-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Highlighting some of my most comprehensive and technically challenging projects
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {featuredProjects.map((project, index) => (
            <Card key={index} className="group hover:shadow-lg transition-all duration-300">
              <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-t-lg flex items-center justify-center">
                <div className="text-4xl font-bold text-primary/20">{project.title.charAt(0)}</div>
              </div>
              
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{project.title}</h3>
                    <Badge variant="secondary" className="mb-3">{project.category}</Badge>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Button size="sm" variant="outline" asChild>
                      <Link href={project.liveUrl} target="_blank">
                        <ExternalLink className="h-4 w-4" />
                      </Link>
                    </Button>
                    <Button size="sm" variant="outline" asChild>
                      <Link href={project.githubUrl} target="_blank">
                        <Github className="h-4 w-4" />
                      </Link>
                    </Button>
                  </div>
                </div>
                
                <p className="text-muted-foreground mb-4 leading-relaxed">
                  {project.description}
                </p>
                
                <div className="flex flex-wrap gap-2">
                  {project.tags.map((tag, tagIndex) => (
                    <Badge key={tagIndex} variant="outline" className="text-xs">
                      {tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </Section>

      {/* All Projects */}
      <Section>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">All Projects</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Browse through all my projects by category
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map((category) => (
            <Button
              key={category}
              variant={category === "All" ? "default" : "outline"}
              size="sm"
              className="mb-2"
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {projects.map((project, index) => (
            <ProjectCard
              key={index}
              title={project.title}
              description={project.description}
              image={project.image}
              tags={project.tags}
              link={project.liveUrl}
            />
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="text-center py-20">
        <div className="max-w-2xl mx-auto space-y-6">
          <h2 className="text-3xl font-bold">Interested in Working Together?</h2>
          <p className="text-xl text-muted-foreground">
            I'm always excited to take on new challenges and build amazing digital experiences.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild size="lg">
              <Link href="/contact">
                Start a Project
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link href="/tools">
                Try My Tools
                <Play className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </Section>
    </div>
  );
}

