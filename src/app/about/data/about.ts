// /data/about.ts
import type { LucideIcon } from "lucide-react";
import { Code, Users, Lightbulb, Target } from "lucide-react";

/* =========================
   Types (for DX + safety)
   ========================= */
export interface Experience {
  title: string;
  company: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  technologies: string[];
}

export interface EducationItem {
  degree: string;
  institution: string;
  location: string;
  period: string;
  description: string;
  achievements: string[];
  coursework: string[];
}

export interface Certification {
  name: string;
  issuer: string;
  year: string;
  url: string;
}

export interface PersonalInfo {
  location: string;
  experience: string;
  projects: string;
  clients: string;
  image: string;
}

export interface ValueItem {
  icon: LucideIcon;
  title: string;
  description: string;
}

/* =========================
   Data
   ========================= */

export const experiences: Experience[] = [
  {
    title: "Frontend Engineer",
    company: "Villeto",
    location: "Remote",
    period: "2026 – Present",
    description:
      "Building and maintaining scalable, high-performance user interfaces for Villeto’s spend management platform. Working closely with product, backend, and design teams to deliver secure, intuitive, and production-grade financial workflows.",
    achievements: [
      "Implemented responsive dashboards and complex UI flows for business onboarding, cards, expenses, and vendor management",
      "Integrated REST APIs for authentication, business profiles, and spend management using production-ready error handling",
      "Built reusable UI components with shadcn/ui and Tailwind CSS, improving design consistency and development speed",
      "Optimized application performance with code-splitting, memoization, and controlled re-renders in React",
      "Collaborated with backend engineers to align API contracts and handle edge cases across financial workflows",
      "Improved UX on mobile and tablet devices with adaptive layouts and accessibility-focused components",
    ],
    technologies: [
      "React.js",
      "Next.js (App Router)",
      "TypeScript",
      "Tailwind CSS",
      "shadcn/ui",
      "Zustand",
      "REST APIs",
    ],
  },
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
  // {
  //   title: "Web Developer",
  //   company: "Self-Employed",
  //   location: "Ile-Ife, Nigeria",
  //   period: "07/2024 – 12/2024",
  //   description:
  //     "Delivered websites for small businesses, focusing on responsive design, performance optimization, and interactive user experiences.",
  //   achievements: [
  //     "Developed 3+ landing pages and marketing websites using HTML5, CSS3, JavaScript, and Tailwind",
  //     "Translated Figma designs into responsive, cross-browser compatible web pages",
  //     "Optimized CSS payloads and layout rendering, improving mobile performance by 30%",
  //     "Integrated forms with Formspree and added smooth GSAP animations",
  //     "Participated in code reviews and strengthened Git/GitHub workflows",
  //   ],
  //   technologies: [
  //     "HTML5",
  //     "CSS3",
  //     "JavaScript",
  //     "Tailwind CSS",
  //     "GSAP",
  //     "Git/GitHub",
  //   ],
  // },
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

export const education: EducationItem[] = [
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
      "Tailwind CSS",
    ],
  },
];

export const certifications: Certification[] = [
  {
    name: "The Ultimate React Course 2024: React, Redux & More",
    issuer: "Udemy",
    year: "2024",
    url: "https://www.ude.my/UC-09ca897b-0405-4487-a8a3-3eb458190a6f",
  },
  {
    name: "The Complete JavaScript Course 2023: From Zero to Expert!",
    issuer: "Udemy",
    year: "2023",
    url: "https://ude.my/UC-b832f715-cc80-42da-9f31-6682f003dc2c",
  },
  {
    name: "Advanced CSS and Sass: Flexbox, Grid, Animations and More!",
    issuer: "Udemy",
    year: "2023",
    url: "https://ude.my/UC-8cb8b128-afe5-4ec0-98b6-a996b0594406",
  },
  {
    name: "Build Responsive Real-World Websites with HTML and CSS",
    issuer: "Udemy",
    year: "2023",
    url: "https://ude.my/UC-4a96fb55-dec3-4fef-9f15-17c75eafbd64",
  },
];

export const personalInfo: PersonalInfo = {
  location: "Nigeria, Lagos",
  experience: "3+ Years",
  projects: "15+ Projects",
  clients: "10+ Happy Clients",
  image: "/assets/profile1.jpg",
};

export const values: ValueItem[] = [
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

/* Optional: single grouped export if you like importing one object */
// export default { experiences, education, certifications, personalInfo, values };
