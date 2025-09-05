export const personalDetails = {
  name: "Sodiq Atiku",
  location: "Lagos, Nigeria",
  experience: "3+ years",
  projectsCompleted: "15+",
  clientSatisfaction: "100%",
  coreValues: [
    {
      title: "Clean Code",
      description:
        "Writing clean, efficient, and maintainable code that follows best practices and industry standards.",
    },
    {
      title: "Collaboration",
      description:
        "Thrives in collaborative environments, working closely with cross-functional teams to create seamless user experiences.",
    },
    {
      title: "Innovation",
      description:
        "Stays updated with industry trends and continuously learns new technologies to deliver cutting-edge solutions.",
    },
    {
      title: "Goal-Oriented",
      description:
        "Focuses on delivering solutions that align with business goals and provide real value to users and stakeholders.",
    },
  ],
  professionalExperience: [
    {
      title: "Frontend Developer",
      company: "Freelance / Personal Projects",
      duration: "06/2023 – Present",
      location: "Remote",
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
      duration: "07/2024 – 12/2024",
      location: "Ile-Ife, Nigeria",
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
      duration: "11/2023 – 03/2024",
      location: "Remote",
      achievements: [
        "Built a modular KYC onboarding system with file uploads, inline validations, and dynamic state-driven forms",
        "Created a real-time dashboard with transaction filtering and contextual sorting",
        "Integrated authentication and live-update APIs ensuring seamless data flow",
      ],
      technologies: ["React.js", "Firebase", "TypeScript", "Tailwind CSS"],
    },
  ],
  education: [
    {
      degree: "Bachelor of Science in Biochemistry and Molecular Biology",
      university: "Ile-Ife, Nigeria",
      duration: "2019 – 2024",
      achievements: [
        "Graduated with Second Class Honors (4.32/5.0)",
        "AOJF 2024 Undergraduate Research Grant Recipient",
        "Team Lead for over 20 undergraduate students, mentoring peers through study forums, curated resources, and mock assessments",
        "Delivered lectures as an Academic Tutor to 200–300 level undergraduates",
      ],
      technologies: [
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
      university: "Online",
      duration: "2019 – Present",
      achievements: [
        "Self-taught JavaScript, React, Next.js, and TypeScript while building production-level projects",
        "Adapted quickly to new frameworks and libraries",
        "Applied modern frontend and backend practices to freelance and personal projects",
      ],
      technologies: [
        "Html and Css",
        "JavaScript",
        "React",
        "Next.js",
        "TypeScript",
        "Firebase",
        "Tailwind CSS",
      ],
    },
  ],
  certifications: [
    {
      title: "The Ultimate React Course 2024: React, Redux & More",
      issuer: "Udemy",
      year: "2024",
    },
    {
      title: "The Complete JavaScript Course 2023: From Zero to Expert!",
      issuer: "Udemy",
      year: "2023",
    },
    {
      title: "Advanced CSS and Sass: Flexbox, Grid, Animations and More!",
      issuer: "Udemy",
      year: "2023",
    },
    {
      title: "Build Responsive Real-World Websites with HTML and CSS",
      issuer: "Udemy",
      year: "2023",
    },
  ],
};

export const skillsData = {
  frontendTechnologies: [
    {
      name: "React.js",
      description:
        "Building dynamic and interactive user interfaces with hooks, context, and modern patterns.",
      proficiency: "Expert",
    },
    {
      name: "Next.js",
      description:
        "Server-side rendering, static generation, and full-stack React applications.",
      proficiency: "Advanced",
    },
    {
      name: "TypeScript",
      description:
        "Type-safe JavaScript development for better code quality and maintainability.",
      proficiency: "Advanced",
    },
    {
      name: "JavaScript (ES6+)",
      description:
        "Modern JavaScript features, async/await, modules, and functional programming.",
      proficiency: "Expert",
    },
  ],
  coreTechnologies: [
    "React.js",
    "Next.js",
    "TypeScript",
    "Tailwind CSS",
    "Firebase",
    "Redux",
  ],
};

export const toolsData = [
  {
    name: "Color Palette Generator",
    description: "Generate beautiful color palettes for your projects",
  },
  {
    name: "Responsive Design Tester",
    description: "Test how websites look on different devices",
  },
  {
    name: "Real-Time Collaboration Whiteboard",
    description: "Multi-user drawing with live collaboration features",
  },
  {
    name: "Project Cost Estimator",
    description: "Calculate project costs and timelines instantly",
  },
];

export const projectDatabase = [
  {
    title: "E-commerce Platform",
    description:
      "A full-featured e-commerce platform with user authentication, payment processing, inventory management, and admin dashboard. Built with Next.js, TypeScript, and Stripe integration.",
    technologies: [
      "Next.js",
      "TypeScript",
      "Stripe",
      "Prisma",
      "PostgreSQL",
      "Tailwind CSS",
    ],
    liveUrl: "https://ecommerce-demo.hypacode.com",
    githubUrl: "https://github.com/hypacode/ecommerce-platform",
    complexity: "Complex" as const,
    category: "Full Stack",
    keywords: [
      "ecommerce",
      "payment",
      "stripe",
      "complex",
      "full-stack",
      "nextjs",
      "typescript",
    ],
  },
  {
    title: "SaaS Analytics Dashboard",
    description:
      "Comprehensive analytics dashboard with real-time data visualization, user management, and subscription handling. Features interactive charts and responsive design.",
    technologies: [
      "React",
      "D3.js",
      "Node.js",
      "MongoDB",
      "Socket.io",
      "Chart.js",
    ],
    liveUrl: "https://analytics-demo.hypacode.com",
    githubUrl: "https://github.com/hypacode/saas-dashboard",
    complexity: "Complex" as const,
    category: "SaaS",
    keywords: [
      "analytics",
      "dashboard",
      "react",
      "d3",
      "complex",
      "saas",
      "realtime",
    ],
  },
  {
    title: "Taskify",
    description:
      "A modern, full-featured task management and note-taking application built with Next.js 14+, Supabase, and TypeScript. Taskify combines powerful todo list functionality with rich note-taking capabilities in a beautiful, responsive interface.",
    technologies: [
      "Next.js 14",
      "Supabase",
      "TypeScript",
      "Framer Motion",
      "Tailwind CSS",
    ],
    liveUrl: "https://taskify.hypacode.com",
    githubUrl: "https://github.com/hypacode/taskify",
    complexity: "Medium" as const,
    category: "Web App",
    keywords: [
      "task management",
      "note-taking",
      "nextjs",
      "supabase",
      "typescript",
      "productivity",
    ],
  },
  {
    title: "Global Finder",
    description:
      "A comprehensive, modern web application built with Next.js 15 that provides detailed information about countries worldwide, including real-time weather data, currency conversion, interactive comparisons, and more.",
    technologies: [
      "Next.js 15",
      "TypeScript",
      "TailwindCSS",
      "REST APIs",
      "Leaflet.js",
      "Chart.js",
      "Framer Motion",
    ],
    liveUrl: "https://global-finder.hypacode.com",
    githubUrl: "https://github.com/hypacode/global-finder",
    complexity: "Medium" as const,
    category: "Web App",
    keywords: [
      "country info",
      "weather",
      "currency converter",
      "nextjs",
      "typescript",
      "interactive",
    ],
  },
  {
    title: "Wild Oasis",
    description:
      "A premium cabin-rental showcase website developed. Designed to present immersive cabin experiences with intuitive booking and rustic elegance.",
    technologies: [
      "Next.js",
      "Tailwind CSS",
      "Responsive Design",
      "Stripe",
      "Supabase",
    ],
    liveUrl: "https://wild-oasis.hypacode.com",
    githubUrl: "https://github.com/hypacode/wild-oasis",
    complexity: "Medium" as const,
    category: "Web App",
    keywords: ["cabin rental", "booking", "nextjs", "tailwind", "responsive"],
  },
  {
    title: "Fastpay",
    description:
      "A modern banking simulator built with Next.js, Supabase, and TypeScript. Fastpay offers secure authentication, instant money transfers, real-time analytics, and advanced banking operations in a sleek, responsive interface.",
    technologies: [
      "Next.js 14",
      "TypeScript",
      "TailwindCSS",
      "Supabase",
      "Stripe",
      "Chart.js",
    ],
    liveUrl: "https://fastpay.hypacode.com",
    githubUrl: "https://github.com/hypacode/fastpay",
    complexity: "Complex" as const,
    category: "Fintech",
    keywords: [
      "banking simulator",
      "fintech",
      "nextjs",
      "supabase",
      "typescript",
      "authentication",
    ],
  },
  {
    title: "GameSnap",
    description:
      "Production-ready live sports scores & predictions platform built with Next.js 15+, TypeScript, and React Query—combining features from Scores24, SofaScore, Soccer24, and FlashScore.",
    technologies: [
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS",
      "React Query",
      "Socket.io",
      "Redis",
      "PostgreSQL",
      "REST APIs",
    ],
    liveUrl: "https://gamesnap.hypacode.com",
    githubUrl: "https://github.com/hypacode/gamesnap",
    complexity: "Complex" as const,
    category: "Web App",
    keywords: [
      "sports scores",
      "predictions",
      "nextjs",
      "typescript",
      "real-time",
      "api",
    ],
  },
  {
    title: "HypaCode Portfolio",
    description:
      "A sleek, modern portfolio website built with Next.js, showcasing a collection of web development projects with a focus on clean design, smooth animations, and responsive layouts.",
    technologies: [
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "Framer Motion",
      "Shadcn UI",
    ],
    liveUrl: "https://hypacode.vercel.app",
    githubUrl: "https://github.com/hypacode/portfolio",
    complexity: "Simple" as const,
    category: "Portfolio",
    keywords: [
      "portfolio",
      "website",
      "nextjs",
      "typescript",
      "tailwind",
      "responsive",
    ],
  },
];
