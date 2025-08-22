export const projects = [
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

export const categories = [
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
