export const projects = [
  {
    id: 1,
    title: "E-commerce Platform",
    description:
      "A full-featured e-commerce platform with user authentication, payment processing, inventory management, and admin dashboard. Built with Next.js, TypeScript, and Stripe integration.",
    longDescription:
      "This comprehensive e-commerce solution provides a seamless shopping experience with advanced features like real-time inventory management, personalized recommendations, and multi-payment gateway integration. Built with performance and scalability in mind.",
    image: "/",
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
    title: "Taskify",
    description:
      "A modern, full-featured task management and note-taking application built with Next.js 14+, Supabase, and TypeScript. Taskify combines powerful todo list functionality with rich note-taking capabilities in a beautiful, responsive interface.",
    longDescription:
      "Taskify is an advanced productivity app that unifies task management and note-taking into a seamless experience. Users can create, organize, and prioritize tasks with due dates, track progress across categories, and gain insights with real-time task statistics. Alongside tasks, Taskify provides a rich note-taking system featuring tags, pinning, auto-save, and full-text search. The application supports secure authentication with Supabase (including Google OAuth), guest mode with local storage, dark/light themes, and real-time synchronization. Designed with a modern responsive UI, Taskify is mobile-ready, PWA-capable, and deployable on Vercel for global accessibility.",
    image: "/assets/projects/taskify.png",
    tags: ["Next.js 14", "Supabase", "TypeScript", "TailwindCSS", "shadcn/ui"],
    liveUrl: "https://hypacode-taskify.vercel.app",
    githubUrl: "https://github.com/hatykuxordik/taskify",
    featured: true,
    category: "Web Application",
    stars: 1,
    forks: 1,
    date: "2025-08-10",
    status: "Completed",
  },
  {
    id: 4,
    title: "Global Finder",
    description:
      "A comprehensive, modern web application built with Next.js 15 that provides detailed information about countries worldwide, including real-time weather data, currency conversion, interactive comparisons, and more.",
    longDescription:
      "Global Finder is a feature-rich platform designed to help users explore countries worldwide with an elegant, responsive interface. It offers smart search with autocomplete, detailed country profiles (integrated with real-time weather), side-by-side country comparisons, and a favorites system with local persistence. Interactive tools such as currency converters, distance calculators, timezone and temperature converters further enhance usability. Built with Next.js 15, TypeScript, TailwindCSS, and Framer Motion, Global Finder is optimized for performance, accessibility (WCAG 2.1 AA), and SEO, while also being PWA-ready for offline capabilities. APIs integrated include REST Countries, OpenWeatherMap, IP Geolocation, and Exchange Rates, ensuring accurate, real-time data. With responsive design, dark/light themes, and security best practices, Global Finder delivers a professional, mobile-first experience.",
    image: "/assets/projects/global-finder.png",
    tags: [
      "Next.js 15",
      "TypeScript",
      "TailwindCSS",
      "Framer Motion",
      "REST Countries API",
      "OpenWeatherMap API",
      "Exchange Rates API",
    ],
    liveUrl: "https://globalfinder-demo.hypacode.com",
    githubUrl: "https://github.com/hatykuxordik/global-finder",
    featured: true,
    category: "Personal Web App Blog Api",
    stars: 1,
    forks: 1,
    date: "2024-04-15",
    status: "Completed",
  },
  {
    id: 5,
    title: "Wild Oasis",
    description:
      "A premium cabin-rental showcase website developed. Designed to present immersive cabin experiences with intuitive booking and rustic elegance.",
    longDescription:
      "Wild Oasis is a visually striking, responsive web experience built with Next.js and TailwindCSS. Designed to highlight premium forest-cabin getaways, the site features dynamic layouts, smooth animations, and mobile-first UX. Key objectives included transforming design prototypes into interactive real-world UI, crafting strong first impressions, and guiding users toward booking action. Developed with performance, accessibility, and immersive storytelling in mind, this site elevates digital presence for nature-lodging brands.",
    image: "/api/placeholder/600/400",
    tags: [
      "Next.js",
      "Tailwind CSS",
      "Responsive Design",
      "UI/UX",
      "Animation",
    ],
    liveUrl: "https://the-wild-oasis-website.vercel.app",
    githubUrl: "https://github.com/hatykuxordik/the-wild-oasis-website",
    featured: false,
    category: "Personal",
    stars: 0,
    forks: 0,
    date: "2025-06-01",
    status: "In Progress",
  },
  {
    id: 6,
    title: "Fastpay",
    description:
      "A modern banking simulator built with Next.js, Supabase, and TypeScript. Fastpay offers secure authentication, instant money transfers, real-time analytics, and advanced banking operations in a sleek, responsive interface.",
    longDescription:
      "Fastpay is a full-featured digital banking simulation app that provides users with core financial operations such as instant money transfers, bill payments, airtime purchases with cashback, and loan requests with approval logic. Advanced features include a real-time analytics dashboard powered by Recharts, transaction management with filtering and categorization, guest mode for quick trials, and a fully responsive design with dark/light themes. Security is at the core, with Supabase Auth, PIN-based transaction protection, encrypted data storage, and robust session handling. Built with Next.js 14, TailwindCSS, and Supabase, Fastpay is PWA-ready with offline capabilities, push notifications, and optimized performance. Designed to showcase modern fintech experiences, Fastpay balances usability, interactivity, and security for a realistic online banking feel.",
    image: "/assets/projects/fastpay.png",
    tags: [
      "Next.js 14",
      "TypeScript",
      "TailwindCSS",
      "Supabase",
      "Recharts",
      "PWA",
    ],
    liveUrl: "https://fastpayy.vercel.app/login",
    githubUrl: "https://github.com/hatykuxordik/fastpay",
    featured: true,
    category: "Fintech Web Application Mobile",
    stars: 1,
    forks: 1,
    date: "2024-07-20", //
    status: "In Progress",
  },
  {
    id: 7,
    title: "GameSnap",
    description:
      "Production-ready live sports scores & predictions platform built with Next.js 15+, TypeScript, and React Query—combining features from Scores24, SofaScore, Soccer24, and FlashScore.",
    longDescription:
      "GameSnap unifies live scores, fixtures, results, standings, expert predictions, and aggregated sports news into a single, blazing-fast Next.js application. It ships with responsive UI, dark/light theming, API-Football integration (with TheSportsDB fallback), WCAG-compliant components, SEO metadata, and background polling that feels like WebSockets. Designed for high Lighthouse scores and Core Web Vitals, the app uses React Query for caching/ISR-like freshness, plus a modular architecture ready for growth (auth, PWA, push alerts, i18n, advanced analytics).",

    image: "/images/projects/gamesnap/cover-600x400.png",
    tags: [
      "Next.js 15",
      "TypeScript",
      "Tailwind CSS",
      "@tanstack/react-query",
      "Axios",
      "Lucide",
      "next-themes",
      "API-Football",
      "TheSportsDB",
    ],

    liveUrl: "https://gamesnap.example.com",
    githubUrl: "https://github.com/hatykuxordik/gamesnap",
    featured: true,
    category: "Web Application Api",
    stars: 1,
    forks: 1,
    date: "2025-08-28",
    status: "In Progress",
  },
  {
    id: 8,
    title: "HypaCode Portfolio",
    description:
      "A sleek, modern portfolio website built with Next.js, showcasing a collection of web development projects with a focus on clean design, smooth animations, and responsive layouts.",
    longDescription:
      "HypaCode Portfolio is a professional showcase of web development projects, designed to highlight technical expertise and creativity. Built with Next.js, TypeScript, and TailwindCSS, the site features a responsive, mobile-first design with smooth animations powered by Framer Motion. It includes a dynamic project gallery, detailed project descriptions, and interactive elements to engage visitors. The portfolio is optimized for performance, SEO, and accessibility (WCAG 2.1 AA), with PWA support for offline access. Dark and light theme toggles enhance user experience, while secure coding practices ensure reliability. The site integrates with Vercel for seamless deployment and scalability, providing a polished, user-friendly experience across devices.",
    image: "/assets/projects/hypacode.png",
    tags: [
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "Framer Motion",
      "Vercel",
      "PWA",
      "Responsive Design",
    ],
    liveUrl: "https://hypacode.vercel.app/",
    githubUrl: "https://github.com/hatykuxordik/hypacode",
    featured: true,
    category: "Portfolio Personal Blog",
    stars: 2,
    forks: 0,
    date: "2025-06-10",
    status: "Completed",
  },
];

export const categories = [
  { id: "all", name: "All", count: projects.length },
  {
    id: "personal",
    name: "Personal Projects",
    count: projects.filter((p) => p.category.toLowerCase().includes("personal"))
      .length,
  },
  {
    id: "fintech",
    name: "Fintech",
    count: projects.filter((p) => p.category.toLowerCase().includes("fintech"))
      .length,
  },
  {
    id: "e-commerce",
    name: "E-commerce",
    count: projects.filter((p) =>
      p.category.toLowerCase().includes("e-commerce")
    ).length,
  },
  {
    id: "landing-page",
    name: "Landing Page",
    count: projects.filter((p) => p.category.toLowerCase().includes("landing"))
      .length,
  },
  {
    id: "web-app",
    name: "Web App",
    count: projects.filter((p) => p.category.toLowerCase().includes("web app"))
      .length,
  },
  {
    id: "portfolio",
    name: "Portfolio",
    count: projects.filter((p) =>
      p.category.toLowerCase().includes("portfolio")
    ).length,
  },
  {
    id: "blog",
    name: "Blog",
    count: projects.filter((p) => p.category.toLowerCase().includes("blog"))
      .length,
  },
  {
    id: "dashboard",
    name: "Dashboard",
    count: projects.filter((p) =>
      p.category.toLowerCase().includes("dashboard")
    ).length,
  },
  {
    id: "api",
    name: "API",
    count: projects.filter((p) => p.category.toLowerCase().includes("api"))
      .length,
  },
];
