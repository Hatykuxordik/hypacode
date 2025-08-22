"use client";

import { Section } from "@/components/ui/section";
import { LiveCodeSandbox } from "@/components/ui/live-code-sandbox";
import { BuildWithMePlayground } from "@/components/ui/build-with-me-playground";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  ExternalLink,
  Github,
  Play,
  Layout,
  Code,
  Eye,
  Star,
  GitFork,
  Calendar,
  Tag,
} from "lucide-react";
import Link from "next/link";
import { Metadata } from "next";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import React, { useState } from "react";

// export const metadata: Metadata = {
//   title: "Projects - Hypacode Portfolio",
//   description:
//     "Explore my portfolio of web development projects built with React, Next.js, TypeScript, and modern technologies.",
//   keywords: [
//     "projects",
//     "portfolio",
//     "react",
//     "nextjs",
//     "web development",
//     "frontend",
//   ],
// };

const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description:
      "A full-featured e-commerce platform with user authentication, payment processing, inventory management, and admin dashboard. Built with Next.js, TypeScript, and Stripe integration.",
    longDescription:
      "This comprehensive e-commerce solution provides a seamless shopping experience with advanced features like real-time inventory management, personalized recommendations, and multi-payment gateway integration. Built with performance and scalability in mind.",
    image: "/api/placeholder/600/400",
    tags: [
      "Next.js",
      "TypeScript",
      "Stripe",
      "Prisma",
      "PostgreSQL",
      "Tailwind CSS",
    ],
    liveUrl: "https://ecommerce-demo.hypacode.com",
    githubUrl: "https://github.com/hatykuxordik/ecommerce-platform",
    featured: true,
    category: "Full Stack",
    stars: 45,
    forks: 12,
    date: "2024-01-15",
    status: "Completed",
  },
  {
    id: 2,
    title: "SaaS Analytics Dashboard",
    description:
      "Comprehensive analytics dashboard with real-time data visualization, user management, and subscription handling. Features interactive charts and responsive design.",
    longDescription:
      "Built for modern teams, this application offers intuitive project management with drag-and-drop functionality, real-time collaboration, time tracking, and comprehensive reporting features.",
    image: "/api/placeholder/600/400",
    tags: ["React", "D3.js", "Node.js", "MongoDB", "Socket.io", "Chart.js"],
    liveUrl: "https://analytics-demo.hypacode.com",
    githubUrl: "https://github.com/hatykuxordik/saas-dashboard",
    featured: true,
    category: "SaaS",
    stars: 32,
    forks: 8,
    date: "2024-02-20",
    status: "Completed",
  },
  {
    id: 3,
    title: "Mobile Banking App",
    description:
      "Secure mobile banking application with biometric authentication, real-time transactions, and comprehensive financial management tools.",
    longDescription:
      "An elegant weather application featuring interactive weather maps, 7-day forecasts, severe weather alerts, and beautiful data visualizations powered by multiple weather APIs.",
    image: "/api/placeholder/600/400",
    tags: ["React Native", "Firebase", "Plaid API", "Redux", "TypeScript"],
    liveUrl: "https://banking-demo.hypacode.com",
    githubUrl: "https://github.com/hatykuxordik/mobile-banking",
    featured: true,
    category: "Mobile",
    stars: 28,
    forks: 6,
    date: "2023-11-10",
    status: "Completed",
  },
  {
    id: 4,
    title: "Task Management System",
    description:
      "Collaborative task management platform with real-time updates, team collaboration features, and project tracking capabilities.",
    longDescription:
      "This portfolio demonstrates advanced frontend development skills with smooth animations, interactive components, and modern design principles. Built with performance and accessibility in mind.",
    image: "/api/placeholder/600/400",
    tags: [
      "Next.js",
      "Supabase",
      "TypeScript",
      "Framer Motion",
      "Tailwind CSS",
    ],
    liveUrl: "https://tasks-demo.hypacode.com",
    githubUrl: "https://github.com/hatykuxordik/task-management",
    featured: false,
    category: "Productivity",
    stars: 15,
    forks: 3,
    date: "2024-03-01",
    status: "Completed",
  },
  {
    id: 5,
    title: "Real Estate Platform",
    description:
      "Modern real estate platform with property listings, advanced search filters, virtual tours, and agent management system.",
    longDescription:
      "Streamline social media management with this powerful dashboard featuring post scheduling, analytics tracking, engagement monitoring, and integration with major social platforms.",
    image: "/api/placeholder/600/400",
    tags: ["React", "Node.js", "Express", "MongoDB", "Cloudinary", "Mapbox"],
    liveUrl: "https://realestate-demo.hypacode.com",
    githubUrl: "https://github.com/hatykuxordik/real-estate",
    featured: false,
    category: "Business",
    stars: 22,
    forks: 5,
    date: "2024-01-30",
    status: "In Progress",
  },
  {
    id: 6,
    title: "Social Media Dashboard",
    description:
      "Social media management dashboard for scheduling posts, analyzing engagement, and managing multiple social media accounts.",
    longDescription:
      "Stay updated with cryptocurrency markets through real-time price tracking, portfolio management, price alerts, and comprehensive market analysis tools.",
    image: "/api/placeholder/600/400",
    tags: ["Vue.js", "Laravel", "MySQL", "Redis", "Social APIs"],
    liveUrl: "https://social-demo.hypacode.com",
    githubUrl: "https://github.com/hatykuxordik/social-dashboard",
    featured: false,
    category: "Marketing",
    stars: 18,
    forks: 4,
    date: "2023-12-15",
    status: "Completed",
  },
];

const categories = [
  { id: "all", name: "All", count: projects.length },
  {
    id: "Full Stack",
    name: "Full Stack",
    count: projects.filter((p) => p.category === "Full Stack").length,
  },
  {
    id: "SaaS",
    name: "SaaS",
    count: projects.filter((p) => p.category === "SaaS").length,
  },
  {
    id: "Mobile",
    name: "Mobile",
    count: projects.filter((p) => p.category === "Mobile").length,
  },
  {
    id: "Productivity",
    name: "Productivity",
    count: projects.filter((p) => p.category === "Productivity").length,
  },
  {
    id: "Business",
    name: "Business",
    count: projects.filter((p) => p.category === "Business").length,
  },
  {
    id: "Marketing",
    name: "Marketing",
    count: projects.filter((p) => p.category === "Marketing").length,
  },
];

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 3000 },
    items: 3,
  },
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 3,
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2,
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1,
  },
};

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export default function ProjectsPage() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedProject, setSelectedProject] = useState(null);

  const filteredProjects =
    selectedCategory === "all"
      ? projects
      : projects.filter((project) => project.category === selectedCategory);

  const featuredProjects = projects.filter((project) => project.featured);

  const ProjectCardComponent = ({ project, featured = false }) => (
    <motion.div
      variants={itemVariants}
      whileHover={{ y: -10 }}
      className={`group hover:shadow-lg transition-all duration-300 overflow-hidden rounded-lg border ${
        featured ? "border-primary" : "border-border"
      } flex flex-col`}
    >
      <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center relative">
        <div className="absolute top-2 left-2">
          {featured && (
            <Badge variant="secondary" className="bg-yellow-500 text-black">
              Featured
            </Badge>
          )}
        </div>
        <div className="absolute top-2 right-2">
          <Badge
            variant={project.status === "Completed" ? "default" : "secondary"}
            className={
              project.status === "Completed"
                ? "bg-green-500 text-white"
                : "bg-orange-500 text-white"
            }
          >
            {project.status}
          </Badge>
        </div>
        <div className="text-4xl font-bold text-primary/20">
          {project.title.charAt(0)}
        </div>
      </div>

      <CardContent className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <Badge variant="secondary" className="mb-3">
              {project.category}
            </Badge>
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

        <p className="text-muted-foreground mb-4 leading-relaxed line-clamp-3 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tech, index) => (
            <Badge
              key={index}
              variant="outline"
              className="text-xs bg-primary/30"
            >
              {tech}
            </Badge>
          ))}
          {project.tags.length > 3 && (
            <Badge variant="outline" className="text-xs bg-muted/50">
              +{project.tags.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex items-center justify-between mb-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4" />
              <span>{project.stars}</span>
            </div>
            <div className="flex items-center space-x-1">
              <GitFork className="w-4 h-4" />
              <span>{project.forks}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{new Date(project.date).toLocaleDateString()}</span>
          </div>
        </div>

        <div className="flex space-x-3">
          <motion.a
            href={project.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1"
          >
            <Button variant="outline" className="w-full">
              <Code className="w-4 h-4 mr-2" />
              Code
            </Button>
          </motion.a>
          <motion.a
            href={project.liveUrl}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1"
          >
            <Button variant="default" className="w-full">
              <Eye className="w-4 h-4 mr-2" />
              Live
            </Button>
          </motion.a>
          <motion.button
            onClick={() => setSelectedProject(project)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1"
          >
            <Button variant="outline" className="w-full">
              Details
            </Button>
          </motion.button>
        </div>
      </CardContent>
    </motion.div>
  );

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <Section className="text-center mb-16">
          <motion.div variants={itemVariants}>
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              My <span className="text-primary">Projects</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              A showcase of my work, featuring modern web applications built
              with cutting-edge technologies
            </p>
          </motion.div>
        </Section>

        {/* Featured Projects Carousel */}
        <Section className="mb-20">
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Featured Projects</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Highlighting some of my most comprehensive and technically
              challenging projects
            </p>
          </motion.div>
          <div className="relative">
            <Carousel
              responsive={responsive}
              infinite={true}
              autoPlay={true}
              autoPlaySpeed={4000}
              keyBoardControl={true}
              customTransition="transform 300ms ease-in-out"
              transitionDuration={300}
              containerClass="carousel-container !overflow-x-clip !overflow-y-visible"
              removeArrowOnDeviceType={["tablet", "mobile"]}
              dotListClass="custom-dot-list-style"
              itemClass="carousel-item-padding-40-px"
            >
              {featuredProjects.map((project) => (
                <div key={project.id} className="px-4">
                  <ProjectCardComponent project={project} featured={true} />
                </div>
              ))}
            </Carousel>
          </div>
        </Section>

        {/* Category Filter */}
        <Section>
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-2 mb-12"
          >
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={
                  selectedCategory === category.id ? "default" : "outline"
                }
                size="sm"
                className="mb-2"
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.name} ({category.count})
              </Button>
            ))}
          </motion.div>

          {/* Projects Grid */}
          <motion.div
            variants={containerVariants}
            className="mx-4 grid md:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence mode="wait">
              {filteredProjects.map((project) => (
                <ProjectCardComponent key={project.id} project={project} />
              ))}
            </AnimatePresence>
          </motion.div>
        </Section>

        {/* Project Modal */}
        <AnimatePresence>
          {selectedProject && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[1000] flex items-center justify-center p-4"
              onClick={() => setSelectedProject(null)}
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-background rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto border border-border"
                onClick={(e) => e.stopPropagation()}
              >
                <Card>
                  <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-6">
                      <div>
                        <h3 className="text-3xl font-bold mb-2">
                          {selectedProject.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                          <div className="flex items-center space-x-1">
                            <Calendar className="w-4 h-4" />
                            <span>
                              {new Date(
                                selectedProject.date
                              ).toLocaleDateString()}
                            </span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <Tag className="w-4 h-4" />
                            <span>{selectedProject.status}</span>
                          </div>
                        </div>
                      </div>
                      <Button
                        variant="ghost"
                        onClick={() => setSelectedProject(null)}
                      >
                        ✕
                      </Button>
                    </div>

                    <p className="text-muted-foreground mb-6 leading-relaxed">
                      {selectedProject.longDescription}
                    </p>

                    <div className="mb-6">
                      <h4 className="text-lg font-semibold mb-3">
                        Technologies Used
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedProject.tags.map((tag, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-sm bg-primary/30"
                          >
                            {tag}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div className="flex space-x-4">
                      <Button asChild>
                        <Link href={selectedProject.githubUrl} target="_blank">
                          <Github className="w-5 h-5 mr-2" />
                          View Code
                        </Link>
                      </Button>
                      <Button asChild>
                        <Link href={selectedProject.liveUrl} target="_blank">
                          <ExternalLink className="w-5 h-5 mr-2" />
                          Live Demo
                        </Link>
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Interactive Playground */}
        <Section className="mb-20 ">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">
              Interactive{" "}
              <span className="text-primary">Component Playground</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Want to see how I handle theming and component design? Play with
              the controls below and watch the component update in real-time.
              This demonstrates my approach to building flexible, customizable
              UI components.
            </p>
          </div>

          <LiveCodeSandbox />
        </Section>

        {/* Build with Me Playground */}
        <Section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4 flex items-center justify-center">
              <Layout className="h-8 w-8 mr-3 text-primary" />
              Build with Me Playground
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Experience real-time UI building! Drag and drop components to
              create your layout, watch the code generate live, and export your
              creation. This showcases advanced state management and live code
              generation capabilities.
            </p>
          </div>

          <BuildWithMePlayground />
        </Section>

        {/* CTA Section */}
        <Section className="text-center py-20">
          <div className="max-w-2xl mx-auto space-y-6">
            <h2 className="text-3xl font-bold">
              Interested in Working Together?
            </h2>
            <p className="text-xl text-muted-foreground">
              I'm always excited to take on new challenges and build amazing
              digital experiences.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild size="lg">
                <Link href="/contact">Start a Project</Link>
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
    </motion.div>
  );
}
