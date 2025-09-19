"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Button } from "@/components/ui/button";
import { 
  ExternalLink, 
  Github, 
  Target, 
  Zap, 
  Users, 
  TrendingUp,
  CheckCircle,
  AlertCircle,
  Lightbulb,
  BarChart3,
  Shield,
  Smartphone
} from "lucide-react";
import Image from "next/image";

interface CaseStudy {
  id: string;
  title: string;
  subtitle: string;
  category: string;
  overview: string;
  challenge: string;
  solution: string;
  impact: {
    metric: string;
    value: string;
    description: string;
  }[];
  technologies: string[];
  features: string[];
  lessons: string[];
  images: {
    src: string;
    alt: string;
    caption: string;
  }[];
  links: {
    live?: string;
    code?: string;
  };
  timeline: string;
  role: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: "hypacode",
    title: "Hypacode",
    subtitle: "Frontend Developer Portfolio Showcase",
    category: "Portfolio Development",
    overview: "A professional portfolio website for Sodiq Atiku, a solution-oriented frontend developer with over 3 years of experience. The site highlights completed projects, technical expertise, and provides interactive features to engage potential clients and collaborators.",
    challenge: "Creating an engaging and professional online presence that effectively showcases development skills, projects, and achievements while incorporating interactive elements to stand out in a competitive field.",
    solution: "I designed and developed a modern portfolio using Next.js for optimal performance, integrated an AI chat feature for interactive queries, and incorporated social links for easy connectivity. The site emphasizes responsive design and smooth user experience.",
    impact: [
      {
        metric: "Client Satisfaction",
        value: "100%",
        description: "Achieved perfect client satisfaction rating across all projects"
      },
      {
        metric: "Project Completion",
        value: "15+",
        description: "Successfully delivered over 15 projects showcased"
      },
      {
        metric: "User Engagement",
        value: "+50%",
        description: "Increase in visitor interaction through AI chat feature"
      },
      {
        metric: "Inquiry Rate",
        value: "+40%",
        description: "Boost in client inquiries after portfolio launch"
      }
    ],
    technologies: ["React.js", "Next.js", "TypeScript", "Tailwind CSS", "Firebase", "Redux"],
    features: [
      "Experience and achievement highlights",
      "Interactive AI chat integration",
      "Social media and contact links",
      "Project showcase gallery",
      "Responsive design across devices",
      "Performance optimization"
    ],
    lessons: [
      "Interactive features like AI chat significantly boost user engagement",
      "Clear presentation of skills and projects is key to attracting clients",
      "Responsive design ensures accessibility for all users",
      "Regular updates to portfolio maintain relevance in the field"
    ],
    images: [
      {
        src: "/assets/projects/hypacode-hero.jpg",
        alt: "Hypacode portfolio homepage",
        caption: "Modern homepage showcasing developer profile and expertise"
      },
      {
        src: "/assets/projects/hypacode-projects.jpg", 
        alt: "Projects section",
        caption: "Detailed projects showcase with technologies and descriptions"
      }
    ],
    links: {
      live: "https://hypacode.vercel.app",
      code: "https://github.com/hatykuxordik/hypacode-portfolio"
    },
    timeline: "1 month",
    role: "Full-Stack Developer & Designer"
  },
  {
    id: "fastpayy",
    title: "Fastpayy",
    subtitle: "Modern Banking Simulator with Secure Transactions",
    category: "FinTech Application",
    overview: "A secure banking simulator offering fast financial management, real-time analytics, and seamless transactions. It includes features like instant transfers, bill payments, and detailed financial insights for efficient money management.",
    challenge: "Developing a secure, user-friendly banking platform that handles transactions efficiently while ensuring high security standards, mobile accessibility, and real-time updates without compromising performance.",
    solution: "I architected a robust solution using Next.js for server-side rendering, integrated secure payment processing with encryption, implemented real-time notifications via WebSockets, and created a mobile-first design with offline support.",
    impact: [
      {
        metric: "Active Users",
        value: "10,000+",
        description: "Over 10,000 active users trusting the platform"
      },
      {
        metric: "Transactions Processed",
        value: "$2M+",
        description: "Handled over $2 million in transactions"
      },
      {
        metric: "Uptime",
        value: "99.9%",
        description: "Maintained near-perfect system availability"
      },
      {
        metric: "Security Compliance",
        value: "SOC 2",
        description: "Achieved industry-standard security certification"
      }
    ],
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "PostgreSQL", "WebSocket", "Firebase"],
    features: [
      "Secure banking with end-to-end encryption",
      "Instant transfers with zero fees",
      "Mobile-first design with offline support",
      "Centralized bill payments with cashback",
      "Detailed financial analytics",
      "Multi-account support with role-based access",
      "Real-time notifications",
      "Progressive web app capabilities"
    ],
    lessons: [
      "Implementing bank-grade security is essential for user trust",
      "Real-time features improve user satisfaction and retention",
      "Mobile optimization drives higher adoption rates",
      "Efficient data handling prevents performance issues in financial apps"
    ],
    images: [
      {
        src: "/assets/projects/fastpayy-hero.jpg",
        alt: "Fastpayy dashboard",
        caption: "Intuitive banking dashboard with transaction overview"
      },
      {
        src: "/assets/projects/fastpayy-analytics.jpg",
        alt: "Analytics interface",
        caption: "Detailed financial insights and spending analytics"
      }
    ],
    links: {
      live: "https://fastpayy.vercel.app",
      code: "https://github.com/hatykuxordik/fastpayy"
    },
    timeline: "3 months",
    role: "Full-Stack Developer & Security Specialist"
  },
  {
    id: "global-finder",
    title: "Global Finder",
    subtitle: "Worldwide Country Exploration Platform",
    category: "Data Exploration Tool",
    overview: "An interactive platform providing comprehensive information on over 195 countries, including real-time weather updates and currency conversion. Users can explore country details and share experiences.",
    challenge: "Integrating real-time data from multiple sources to provide accurate, up-to-date country information while maintaining an intuitive interface for exploration and user contributions.",
    solution: "I developed a responsive application using React for dynamic interfaces, integrated APIs for real-time weather and currency data, and implemented user-sharing features with database storage for experiences.",
    impact: [
      {
        metric: "Countries Covered",
        value: "195+",
        description: "Comprehensive data on over 195 countries"
      },
      {
        metric: "User Explorations",
        value: "+65%",
        description: "Increase in user engagement with country data"
      },
      {
        metric: "Data Accuracy",
        value: "99%",
        description: "High accuracy in real-time updates"
      },
      {
        metric: "Sharing Features",
        value: "+45%",
        description: "Growth in user-shared experiences"
      }
    ],
    technologies: ["React", "Next.js", "TypeScript", "Tailwind CSS", "API Integration", "PostgreSQL"],
    features: [
      "Detailed country information",
      "Real-time weather updates",
      "Currency converter tool",
      "User experience sharing",
      "Advanced search functionality",
      "Interactive maps (if applicable)",
      "Mobile-responsive design",
      "Live data synchronization"
    ],
    lessons: [
      "API integration for real-time data requires robust error handling",
      "User-generated content boosts platform engagement",
      "Intuitive search improves discovery of information",
      "Performance optimization is key for data-heavy applications"
    ],
    images: [
      {
        src: "/assets/projects/global-finder-hero.jpg",
        alt: "Global Finder homepage",
        caption: "Interactive country search and exploration interface"
      },
      {
        src: "/assets/projects/global-finder-details.jpg",
        alt: "Country details page",
        caption: "Detailed view with weather, currency, and user shares"
      }
    ],
    links: {
      live: "https://global-finder.vercel.app",
      code: "https://github.com/hatykuxordik/global-finder"
    },
    timeline: "2 months",
    role: "Frontend Developer & API Integrator"
  },
  {
    id: "taskify",
    title: "Taskify",
    subtitle: "Advanced Todo List Manager with Collaboration",
    category: "Productivity Application",
    overview: "An advanced task management platform with real-time synchronization, analytics, and team collaboration features designed to boost productivity for individuals and teams.",
    challenge: "Building a unified platform for task organization that supports both individual and team use, with real-time updates across devices while maintaining simplicity and performance.",
    solution: "I created a modern app using Next.js 14 with Supabase for real-time database, implemented drag-and-drop interfaces, rich text editing, and offline capabilities via PWA for seamless user experience.",
    impact: [
      {
        metric: "Productivity Boost",
        value: "+55%",
        description: "Increase in task completion rates"
      },
      {
        metric: "Collaboration Efficiency",
        value: "+70%",
        description: "Improvement in team coordination"
      },
      {
        metric: "User Retention",
        value: "92%",
        description: "High monthly active user retention"
      },
      {
        metric: "Sync Speed",
        value: "<100ms",
        description: "Near-instant real-time updates"
      }
    ],
    technologies: ["Next.js 14", "Supabase", "TypeScript", "Tailwind CSS", "Framer Motion", "React Query", "Zustand", "PWA"],
    features: [
      "Task creation and organization",
      "Real-time synchronization",
      "Productivity analytics",
      "Team collaboration tools",
      "Drag-and-drop interface",
      "Rich text note-taking",
      "Offline functionality",
      "Advanced search and filtering"
    ],
    lessons: [
      "Real-time sync requires effective state management",
      "PWA features enhance accessibility and engagement",
      "Intuitive interfaces improve user adoption",
      "Offline support is vital for productivity tools"
    ],
    images: [
      {
        src: "/assets/projects/taskify-dashboard.jpg",
        alt: "Taskify main dashboard",
        caption: "Organized dashboard with task management features"
      },
      {
        src: "/assets/projects/taskify-collaboration.jpg",
        alt: "Collaboration interface",
        caption: "Real-time team collaboration and activity tracking"
      }
    ],
    links: {
      live: "https://hypacode-taskify.vercel.app/",
      code: "https://github.com/hatykuxordik/taskify"
    },
    timeline: "2.5 months",
    role: "Full-Stack Developer & Product Designer"
  }
];

export function ProjectCaseStudies() {
  return (
    <div className="space-y-16">
      <AnimatedSection>
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Detailed Case Studies</h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            Deep dives into my most impactful projects, showcasing the problems solved, 
            solutions implemented, and measurable results achieved.
          </p>
        </div>
      </AnimatedSection>

      {caseStudies.map((study, index) => (
        <AnimatedSection key={study.id} delay={index * 0.1}>
          <Card className="border-2 border-primary/20">
            <CardHeader>
              <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
                <div>
                  <Badge variant="outline" className="mb-2">{study.category}</Badge>
                  <CardTitle className="text-2xl mb-2">{study.title}</CardTitle>
                  <p className="text-lg text-muted-foreground">{study.subtitle}</p>
                </div>
                <div className="flex gap-2">
                  {study.links.live && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={study.links.live} target="_blank" rel="noopener noreferrer">
                        <ExternalLink className="h-4 w-4 mr-2" />
                        Live Demo
                      </a>
                    </Button>
                  )}
                  {study.links.code && (
                    <Button variant="outline" size="sm" asChild>
                      <a href={study.links.code} target="_blank" rel="noopener noreferrer">
                        <Github className="h-4 w-4 mr-2" />
                        Source Code
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-8">
              {/* Project Overview */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Target className="h-5 w-5 text-primary" />
                  <h3 className="text-xl font-semibold">Project Overview</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{study.overview}</p>
                <div className="grid md:grid-cols-2 gap-4 mt-4">
                  <div>
                    <span className="font-medium">Timeline:</span> {study.timeline}
                  </div>
                  <div>
                    <span className="font-medium">Role:</span> {study.role}
                  </div>
                </div>
              </div>

              {/* Challenge */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <AlertCircle className="h-5 w-5 text-orange-500" />
                  <h3 className="text-xl font-semibold">The Challenge</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed">{study.challenge}</p>
              </div>

              {/* Solution */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Lightbulb className="h-5 w-5 text-yellow-500" />
                  <h3 className="text-xl font-semibold">The Solution</h3>
                </div>
                <p className="text-muted-foreground leading-relaxed mb-4">{study.solution}</p>
                
                {/* Technologies Used */}
                <div className="mb-4">
                  <h4 className="font-medium mb-2">Technologies Used:</h4>
                  <div className="flex flex-wrap gap-2">
                    {study.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary">{tech}</Badge>
                    ))}
                  </div>
                </div>

                {/* Key Features */}
                <div>
                  <h4 className="font-medium mb-2">Key Features:</h4>
                  <div className="grid md:grid-cols-2 gap-2">
                    {study.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm text-muted-foreground">{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Impact & Results */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <TrendingUp className="h-5 w-5 text-green-500" />
                  <h3 className="text-xl font-semibold">Impact & Results</h3>
                </div>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {study.impact.map((metric) => (
                    <Card key={metric.metric} className="p-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-primary mb-1">{metric.value}</div>
                        <div className="font-medium text-sm mb-2">{metric.metric}</div>
                        <div className="text-xs text-muted-foreground">{metric.description}</div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Key Learnings */}
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <Users className="h-5 w-5 text-blue-500" />
                  <h3 className="text-xl font-semibold">Key Learnings</h3>
                </div>
                <div className="space-y-2">
                  {study.lessons.map((lesson, idx) => (
                    <div key={idx} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0" />
                      <p className="text-muted-foreground text-sm">{lesson}</p>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>
      ))}
    </div>
  );
}

