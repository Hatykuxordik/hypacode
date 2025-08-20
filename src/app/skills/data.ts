import {
  Database,
  Cloud,
  Smartphone,
  Zap,
  Globe,
  GitBranch,
  Code2,
  Paintbrush,
  Shield,
  Settings,
  TrendingUp,
} from "lucide-react";

export const skillCategories = [
  {
    title: "Frontend Technologies",
    skills: [
      {
        name: "React.js",
        icon: Code2,
        description:
          "Building dynamic and interactive user interfaces with hooks, context, and modern patterns.",
        proficiency: "Expert",
        level: 95,
      },
      {
        name: "Next.js",
        icon: Code2,
        description:
          "Server-side rendering, static generation, and full-stack React applications.",
        proficiency: "Advanced",
        level: 90,
      },
      {
        name: "TypeScript",
        icon: Code2,
        description:
          "Type-safe JavaScript development for better code quality and maintainability.",
        proficiency: "Advanced",
        level: 88,
      },
      {
        name: "JavaScript (ES6+)",
        icon: Code2,
        description:
          "Modern JavaScript features, async/await, modules, and functional programming.",
        proficiency: "Expert",
        level: 92,
      },
    ],
  },
  {
    title: "Styling & Design",
    skills: [
      {
        name: "Tailwind CSS",
        icon: Paintbrush,
        description:
          "Utility-first CSS framework for rapid UI development and consistent design systems.",
        proficiency: "Expert",
        level: 92,
      },
      {
        name: "SASS/SCSS",
        icon: Paintbrush,
        description:
          "Advanced CSS with variables, mixins, and modular architecture.",
        proficiency: "Advanced",
        level: 88,
      },
      {
        name: "Responsive Design",
        icon: Smartphone,
        description:
          "Mobile-first approach ensuring perfect rendering across all devices.",
        proficiency: "Expert",
        level: 95,
      },
      {
        name: "CSS Animations",
        icon: Zap,
        description:
          "Creating smooth transitions, keyframe animations, and micro-interactions.",
        proficiency: "Advanced",
        level: 85,
      },
    ],
  },
  {
    title: "Backend & Database",
    skills: [
      {
        name: "Firebase",
        icon: Database,
        description:
          "Authentication, Firestore database, hosting, and real-time data synchronization.",
        proficiency: "Advanced",
        level: 85,
      },
      {
        name: "Supabase",
        icon: Database,
        description:
          "PostgreSQL database, authentication, and real-time subscriptions.",
        proficiency: "Intermediate",
        level: 75,
      },
      {
        name: "API Integration",
        icon: Globe,
        description:
          "RESTful APIs, GraphQL, payment gateways, and third-party service integration.",
        proficiency: "Advanced",
        level: 88,
      },
      {
        name: "Authentication",
        icon: Shield,
        description:
          "JWT tokens, OAuth, social logins, and secure user management.",
        proficiency: "Advanced",
        level: 82,
      },
    ],
  },
  {
    title: "State Management & Tools",
    skills: [
      {
        name: "Redux Toolkit",
        icon: Settings,
        description:
          "Predictable state management for complex applications with modern Redux patterns.",
        proficiency: "Advanced",
        level: 85,
      },
      {
        name: "Git & GitHub",
        icon: GitBranch,
        description:
          "Version control, branching strategies, pull requests, and collaborative development.",
        proficiency: "Advanced",
        level: 92,
      },
      {
        name: "Deployment",
        icon: Cloud,
        description:
          "Vercel, Netlify, and other modern deployment platforms with CI/CD.",
        proficiency: "Advanced",
        level: 88,
      },
      {
        name: "Performance Optimization",
        icon: TrendingUp,
        description:
          "Code splitting, lazy loading, image optimization, and Core Web Vitals.",
        proficiency: "Advanced",
        level: 85,
      },
    ],
  },
];

export const additionalTechnologies = [
  "GSAP Animations",
  "Framer Motion",
  "React Hook Form",
  "Shadcn/ui Components",
  "Figma to Code",
  "Cross-browser Compatibility",
  "WCAG Accessibility",
  "SEO Optimization",
  "Google Maps API",
  "Stripe Integration",
  "Formspree Forms",
];
