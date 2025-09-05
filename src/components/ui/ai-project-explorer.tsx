// "use client";

// import { useState, useRef, useEffect } from "react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import { Avatar, AvatarFallback } from "@/components/ui/avatar";
// import { Send, Bot, User, Sparkles, Code, ExternalLink } from "lucide-react";
// import { motion, AnimatePresence } from "framer-motion";

// interface Message {
//   id: string;
//   type: "user" | "ai";
//   content: string;
//   timestamp: Date;
//   projectData?: {
//     title: string;
//     description: string;
//     technologies: string[];
//     liveUrl?: string;
//     githubUrl?: string;
//     complexity: "Simple" | "Medium" | "Complex";
//     category: string;
//   };
// }

// const personalDetails = {
//   name: "Sodiq Atiku",
//   location: "Lagos, Nigeria",
//   experience: "3+ years",
//   projectsCompleted: "15+",
//   clientSatisfaction: "100%",
//   coreValues: [
//     {
//       title: "Clean Code",
//       description:
//         "Writing clean, efficient, and maintainable code that follows best practices and industry standards.",
//     },
//     {
//       title: "Collaboration",
//       description:
//         "Thrives in collaborative environments, working closely with cross-functional teams to create seamless user experiences.",
//     },
//     {
//       title: "Innovation",
//       description:
//         "Stays updated with industry trends and continuously learns new technologies to deliver cutting-edge solutions.",
//     },
//     {
//       title: "Goal-Oriented",
//       description:
//         "Focuses on delivering solutions that align with business goals and provide real value to users and stakeholders.",
//     },
//   ],
//   professionalExperience: [
//     {
//       title: "Frontend Developer",
//       company: "Freelance / Personal Projects",
//       duration: "06/2023 – Present",
//       location: "Remote",
//       achievements: [
//         "Developed responsive UIs from Figma designs with cross-browser compatibility and WCAG compliance",
//         "Built and deployed landing pages, dashboards, and blogs with Tailwind, TypeScript, and Firebase",
//         "Integrated payment gateways, authentication, and Google Maps APIs for production-ready features",
//         "Refactored legacy code and implemented lazy loading & code-splitting, improving load times by 45%",
//         "Maintained client communication and feedback loops to align with project scope",
//       ],
//       technologies: [
//         "React.js",
//         "Next.js",
//         "TypeScript",
//         "Tailwind CSS",
//         "Firebase",
//         "Supabase",
//       ],
//     },
//     {
//       title: "Web Developer",
//       company: "Self-Employed",
//       duration: "07/2024 – 12/2024",
//       location: "Ile-Ife, Nigeria",
//       achievements: [
//         "Developed 3+ landing pages and marketing websites using HTML5, CSS3, JavaScript, and Tailwind",
//         "Translated Figma designs into responsive, cross-browser compatible web pages",
//         "Optimized CSS payloads and layout rendering, improving mobile performance by 30%",
//         "Integrated forms with Formspree and added smooth GSAP animations",
//         "Participated in code reviews and strengthened Git/GitHub workflows",
//       ],
//       technologies: [
//         "HTML5",
//         "CSS3",
//         "JavaScript",
//         "Tailwind CSS",
//         "GSAP",
//         "Git/GitHub",
//       ],
//     },
//     {
//       title: "Frontend Engineer (React + Firebase)",
//       company: "Independent Project Work",
//       duration: "11/2023 – 03/2024",
//       location: "Remote",
//       achievements: [
//         "Built a modular KYC onboarding system with file uploads, inline validations, and dynamic state-driven forms",
//         "Created a real-time dashboard with transaction filtering and contextual sorting",
//         "Integrated authentication and live-update APIs ensuring seamless data flow",
//       ],
//       technologies: ["React.js", "Firebase", "TypeScript", "Tailwind CSS"],
//     },
//   ],
//   education: [
//     {
//       degree: "Bachelor of Science in Biochemistry and Molecular Biology",
//       university: "Ile-Ife, Nigeria",
//       duration: "2019 – 2024",
//       achievements: [
//         "Graduated with Second Class Honors (4.32/5.0)",
//         "AOJF 2024 Undergraduate Research Grant Recipient",
//         "Team Lead for over 20 undergraduate students, mentoring peers through study forums, curated resources, and mock assessments",
//         "Delivered lectures as an Academic Tutor to 200–300 level undergraduates",
//       ],
//       technologies: [
//         "Protein and Lipid Biochemistry",
//         "Lipoprotein Metabolism and Transport",
//         "Organic and Molecular Spectroscopy",
//         "Drug Design and Delivery",
//         "Pharmacotechnology and Drug Formulation",
//         "Systems Biology and Metabolic Pathways",
//       ],
//     },
//     {
//       degree: "Ongoing Full Stack Web Development Training",
//       university: "Online",
//       duration: "2019 – Present",
//       achievements: [
//         "Self-taught JavaScript, React, Next.js, and TypeScript while building production-level projects",
//         "Adapted quickly to new frameworks and libraries",
//         "Applied modern frontend and backend practices to freelance and personal projects",
//       ],
//       technologies: [
//         "Html and Css",
//         "JavaScript",
//         "React",
//         "Next.js",
//         "TypeScript",
//         "Firebase",
//         "Tailwind CSS",
//       ],
//     },
//   ],
//   certifications: [
//     {
//       title: "The Ultimate React Course 2024: React, Redux & More",
//       issuer: "Udemy",
//       year: "2024",
//     },
//     {
//       title: "The Complete JavaScript Course 2023: From Zero to Expert!",
//       issuer: "Udemy",
//       year: "2023",
//     },
//     {
//       title: "Advanced CSS and Sass: Flexbox, Grid, Animations and More!",
//       issuer: "Udemy",
//       year: "2023",
//     },
//     {
//       title: "Build Responsive Real-World Websites with HTML and CSS",
//       issuer: "Udemy",
//       year: "2023",
//     },
//   ],
// };

// const skillsData = {
//   frontendTechnologies: [
//     {
//       name: "React.js",
//       description:
//         "Building dynamic and interactive user interfaces with hooks, context, and modern patterns.",
//       proficiency: "Expert",
//     },
//     {
//       name: "Next.js",
//       description:
//         "Server-side rendering, static generation, and full-stack React applications.",
//       proficiency: "Advanced",
//     },
//     {
//       name: "TypeScript",
//       description:
//         "Type-safe JavaScript development for better code quality and maintainability.",
//       proficiency: "Advanced",
//     },
//     {
//       name: "JavaScript (ES6+)",
//       description:
//         "Modern JavaScript features, async/await, modules, and functional programming.",
//       proficiency: "Expert",
//     },
//   ],
//   coreTechnologies: [
//     "React.js",
//     "Next.js",
//     "TypeScript",
//     "Tailwind CSS",
//     "Firebase",
//     "Redux",
//   ],
// };

// const toolsData = [
//   {
//     name: "Color Palette Generator",
//     description: "Generate beautiful color palettes for your projects",
//   },
//   {
//     name: "Responsive Design Tester",
//     description: "Test how websites look on different devices",
//   },
//   {
//     name: "Real-Time Collaboration Whiteboard",
//     description: "Multi-user drawing with live collaboration features",
//   },
//   {
//     name: "Project Cost Estimator",
//     description: "Calculate project costs and timelines instantly",
//   },
// ];

// const projectDatabase = [
//   {
//     title: "E-commerce Platform",
//     description:
//       "A full-featured e-commerce platform with user authentication, payment processing, inventory management, and admin dashboard. Built with Next.js, TypeScript, and Stripe integration.",
//     technologies: [
//       "Next.js",
//       "TypeScript",
//       "Stripe",
//       "Prisma",
//       "PostgreSQL",
//       "Tailwind CSS",
//     ],
//     liveUrl: "https://ecommerce-demo.hypacode.com",
//     githubUrl: "https://github.com/hypacode/ecommerce-platform",
//     complexity: "Complex" as const,
//     category: "Full Stack",
//     keywords: [
//       "ecommerce",
//       "payment",
//       "stripe",
//       "complex",
//       "full-stack",
//       "nextjs",
//       "typescript",
//     ],
//   },
//   {
//     title: "SaaS Analytics Dashboard",
//     description:
//       "Comprehensive analytics dashboard with real-time data visualization, user management, and subscription handling. Features interactive charts and responsive design.",
//     technologies: [
//       "React",
//       "D3.js",
//       "Node.js",
//       "MongoDB",
//       "Socket.io",
//       "Chart.js",
//     ],
//     liveUrl: "https://analytics-demo.hypacode.com",
//     githubUrl: "https://github.com/hypacode/saas-dashboard",
//     complexity: "Complex" as const,
//     category: "SaaS",
//     keywords: [
//       "analytics",
//       "dashboard",
//       "react",
//       "d3",
//       "complex",
//       "saas",
//       "realtime",
//     ],
//   },
//   {
//     title: "Taskify",
//     description:
//       "A modern, full-featured task management and note-taking application built with Next.js 14+, Supabase, and TypeScript. Taskify combines powerful todo list functionality with rich note-taking capabilities in a beautiful, responsive interface.",
//     technologies: [
//       "Next.js 14",
//       "Supabase",
//       "TypeScript",
//       "Framer Motion",
//       "Tailwind CSS",
//     ],
//     liveUrl: "https://taskify.hypacode.com",
//     githubUrl: "https://github.com/hypacode/taskify",
//     complexity: "Medium" as const,
//     category: "Web App",
//     keywords: [
//       "task management",
//       "note-taking",
//       "nextjs",
//       "supabase",
//       "typescript",
//       "productivity",
//     ],
//   },
//   {
//     title: "Global Finder",
//     description:
//       "A comprehensive, modern web application built with Next.js 15 that provides detailed information about countries worldwide, including real-time weather data, currency conversion, interactive comparisons, and more.",
//     technologies: [
//       "Next.js 15",
//       "TypeScript",
//       "TailwindCSS",
//       "REST APIs",
//       "Leaflet.js",
//       "Chart.js",
//       "Framer Motion",
//     ],
//     liveUrl: "https://global-finder.hypacode.com",
//     githubUrl: "https://github.com/hypacode/global-finder",
//     complexity: "Medium" as const,
//     category: "Web App",
//     keywords: [
//       "country info",
//       "weather",
//       "currency converter",
//       "nextjs",
//       "typescript",
//       "interactive",
//     ],
//   },
//   {
//     title: "Wild Oasis",
//     description:
//       "A premium cabin-rental showcase website developed. Designed to present immersive cabin experiences with intuitive booking and rustic elegance.",
//     technologies: [
//       "Next.js",
//       "Tailwind CSS",
//       "Responsive Design",
//       "Stripe",
//       "Supabase",
//     ],
//     liveUrl: "https://wild-oasis.hypacode.com",
//     githubUrl: "https://github.com/hypacode/wild-oasis",
//     complexity: "Medium" as const,
//     category: "Web App",
//     keywords: ["cabin rental", "booking", "nextjs", "tailwind", "responsive"],
//   },
//   {
//     title: "Fastpay",
//     description:
//       "A modern banking simulator built with Next.js, Supabase, and TypeScript. Fastpay offers secure authentication, instant money transfers, real-time analytics, and advanced banking operations in a sleek, responsive interface.",
//     technologies: [
//       "Next.js 14",
//       "TypeScript",
//       "TailwindCSS",
//       "Supabase",
//       "Stripe",
//       "Chart.js",
//     ],
//     liveUrl: "https://fastpay.hypacode.com",
//     githubUrl: "https://github.com/hypacode/fastpay",
//     complexity: "Complex" as const,
//     category: "Fintech",
//     keywords: [
//       "banking simulator",
//       "fintech",
//       "nextjs",
//       "supabase",
//       "typescript",
//       "authentication",
//     ],
//   },
//   {
//     title: "GameSnap",
//     description:
//       "Production-ready live sports scores & predictions platform built with Next.js 15+, TypeScript, and React Query—combining features from Scores24, SofaScore, Soccer24, and FlashScore.",
//     technologies: [
//       "Next.js 15",
//       "TypeScript",
//       "Tailwind CSS",
//       "React Query",
//       "Socket.io",
//       "Redis",
//       "PostgreSQL",
//       "REST APIs",
//     ],
//     liveUrl: "https://gamesnap.hypacode.com",
//     githubUrl: "https://github.com/hypacode/gamesnap",
//     complexity: "Complex" as const,
//     category: "Web App",
//     keywords: [
//       "sports scores",
//       "predictions",
//       "nextjs",
//       "typescript",
//       "real-time",
//       "api",
//     ],
//   },
//   {
//     title: "HypaCode Portfolio",
//     description:
//       "A sleek, modern portfolio website built with Next.js, showcasing a collection of web development projects with a focus on clean design, smooth animations, and responsive layouts.",
//     technologies: [
//       "Next.js",
//       "TypeScript",
//       "TailwindCSS",
//       "Framer Motion",
//       "Shadcn UI",
//     ],
//     liveUrl: "https://hypacode.vercel.app",
//     githubUrl: "https://github.com/hypacode/portfolio",
//     complexity: "Simple" as const,
//     category: "Portfolio",
//     keywords: [
//       "portfolio",
//       "website",
//       "nextjs",
//       "typescript",
//       "tailwind",
//       "responsive",
//     ],
//   },
// ];

// export function AIProjectExplorer() {
//   const [messages, setMessages] = useState<Message[]>([
//     {
//       id: "1",
//       type: "ai",
//       content:
//         "Hi! I'm your AI guide to Hypacode's portfolio. Ask me about projects, technologies, or anything you'd like to know! 🚀",
//       timestamp: new Date(),
//     },
//   ]);
//   const [input, setInput] = useState("");
//   const [isTyping, setIsTyping] = useState(false);
//   const scrollAreaRef = useRef<HTMLDivElement>(null);

//   const scrollToBottom = () => {
//     if (scrollAreaRef.current) {
//       const scrollContainer = scrollAreaRef.current.querySelector(
//         "[data-radix-scroll-area-viewport]"
//       );
//       if (scrollContainer) {
//         scrollContainer.scrollTop = scrollContainer.scrollHeight;
//       }
//     }
//   };

//   useEffect(() => {
//     scrollToBottom();
//   }, [messages]);

//   const handleSend = async () => {
//     if (!input.trim()) return;

//     const userMessage: Message = {
//       id: Date.now().toString(),
//       type: "user",
//       content: input,
//       timestamp: new Date(),
//     };

//     setMessages((prev) => [...prev, userMessage]);
//     setInput("");
//     setIsTyping(true);

//     // Simulate AI thinking time
//     setTimeout(() => {
//       const aiResponse = generateAIResponse(input);
//       const aiMessage: Message = {
//         id: (Date.now() + 1).toString(),
//         type: "ai",
//         content: aiResponse.content,
//         timestamp: new Date(),
//         projectData: aiResponse.projectData,
//       };

//       setMessages((prev) => [...prev, aiMessage]);
//       setIsTyping(false);
//     }, 1000 + Math.random() * 1000);
//   };

//   const handleKeyPress = (e: React.KeyboardEvent) => {
//     if (e.key === "Enter" && !e.shiftKey) {
//       e.preventDefault();
//       handleSend();
//     }
//   };

//   const generateAIResponse = (
//     query: string
//   ): { content: string; projectData?: any } => {
//     const lowerQuery = query.toLowerCase();

//     // Personal details queries
//     if (
//       lowerQuery.includes("your name") ||
//       lowerQuery.includes("who are you") ||
//       lowerQuery.includes("personal details")
//     ) {
//       return {
//         content: `I am an AI assistant designed to help you explore the portfolio of Sodiq Atiku. Sodiq is a passionate Frontend Developer from Lagos, Nigeria, with ${personalDetails.experience} of experience. He has completed ${personalDetails.projectsCompleted} projects and maintains ${personalDetails.clientSatisfaction} client satisfaction.`,
//       };
//     }

//     if (
//       lowerQuery.includes("core values") ||
//       lowerQuery.includes("principles")
//     ) {
//       const values = personalDetails.coreValues
//         .map((v) => `**${v.title}**: ${v.description}`)
//         .join("\n\n");
//       return {
//         content: `Sodiq's core values are:\n\n${values}`,
//       };
//     }

//     if (
//       lowerQuery.includes("experience") ||
//       lowerQuery.includes("work history") ||
//       lowerQuery.includes("professional journey")
//     ) {
//       const experience = personalDetails.professionalExperience
//         .map(
//           (exp) =>
//             `**${exp.title}** at ${exp.company} (${exp.duration}, ${
//               exp.location
//             }). Key achievements include: ${exp.achievements.join(
//               "; "
//             )}. Technologies used: ${exp.technologies.join(", ")}.`
//         )
//         .join("\n\n");
//       return {
//         content: `Sodiq's professional journey includes:\n\n${experience}`,
//       };
//     }

//     if (lowerQuery.includes("education") || lowerQuery.includes("learning")) {
//       const education = personalDetails.education
//         .map(
//           (edu) =>
//             `**${edu.degree}** from ${edu.university} (${
//               edu.duration
//             }). Key achievements: ${edu.achievements.join(
//               "; "
//             )}. Relevant areas of study: ${edu.technologies.join(", ")}.`
//         )
//         .join("\n\n");
//       return {
//         content: `Sodiq's educational background and continuous learning journey:\n\n${education}`,
//       };
//     }

//     if (
//       lowerQuery.includes("certifications") ||
//       lowerQuery.includes("achievements")
//     ) {
//       const certifications = personalDetails.certifications
//         .map((cert) => `**${cert.title}** from ${cert.issuer} (${cert.year}).`)
//         .join("\n\n");
//       return {
//         content: `Sodiq has earned several certifications, including:\n\n${certifications}`,
//       };
//     }

//     // Skills queries
//     if (
//       lowerQuery.includes("frontend technologies") ||
//       lowerQuery.includes("frontend skills")
//     ) {
//       const frontendSkills = skillsData.frontendTechnologies
//         .map(
//           (skill) =>
//             `**${skill.name}** (${skill.proficiency}): ${skill.description}`
//         )
//         .join("\n\n");
//       return {
//         content: `Sodiq's frontend technology expertise includes:\n\n${frontendSkills}`,
//       };
//     }

//     if (
//       lowerQuery.includes("core technologies") ||
//       lowerQuery.includes("tech stack")
//     ) {
//       return {
//         content: `Sodiq's core technologies include: ${skillsData.coreTechnologies.join(
//           ", "
//         )}.`,
//       };
//     }

//     // Tools queries
//     if (
//       lowerQuery.includes("tools") ||
//       lowerQuery.includes("interactive tools")
//     ) {
//       const interactiveTools = toolsData
//         .map((tool) => `**${tool.name}**: ${tool.description}`)
//         .join("\n\n");
//       return {
//         content: `Sodiq has developed several interactive tools, such as:\n\n${interactiveTools}`,
//       };
//     }

//     // Project queries
//     if (
//       lowerQuery.includes("complex project") ||
//       lowerQuery.includes("most advanced") ||
//       lowerQuery.includes("challenging project")
//     ) {
//       const complexProjects = projectDatabase.filter(
//         (p) => p.complexity === "Complex"
//       );
//       if (complexProjects.length > 0) {
//         const project = complexProjects[0];
//         return {
//           content: `Here's one of Sodiq's most complex projects: The **${
//             project.title
//           }** is a comprehensive ${project.category.toLowerCase()} application that showcases advanced development skills. It features ${project.description.toLowerCase()}`,
//           projectData: project,
//         };
//       }
//     }

//     if (lowerQuery.includes("react project")) {
//       const reactProjects = projectDatabase.filter((p) =>
//         p.technologies.some((tech) => tech.toLowerCase().includes("react"))
//       );
//       if (reactProjects.length > 0) {
//         const project = reactProjects[0];
//         return {
//           content: `Here's one of Sodiq's standout React projects: **${project.title}**. This project demonstrates advanced React patterns and state management. ${project.description}`,
//           projectData: project,
//         };
//       }
//     }

//     if (
//       lowerQuery.includes("next.js project") ||
//       lowerQuery.includes("nextjs project")
//     ) {
//       const nextProjects = projectDatabase.filter((p) =>
//         p.technologies.some(
//           (tech) =>
//             tech.toLowerCase().includes("next.js") ||
//             tech.toLowerCase().includes("nextjs")
//         )
//       );
//       if (nextProjects.length > 0) {
//         const project = nextProjects[0];
//         return {
//           content: `Absolutely! Sodiq loves working with Next.js. Check out **${project.title}** - it's built with Next.js and showcases server-side rendering, API routes, and modern React patterns. ${project.description}`,
//           projectData: project,
//         };
//       }
//     }

//     if (
//       lowerQuery.includes("mobile app") ||
//       lowerQuery.includes("mobile development")
//     ) {
//       return {
//         content: `Currently, Sodiq's portfolio focuses on web applications, but he has the skills to develop mobile apps using technologies like React Native. Would you like me to recommend a web-based project with mobile-friendly design instead? For example, **Taskify** is a responsive web app built with Next.js 14 and Supabase, offering a seamless experience on mobile devices.`,
//         projectData: projectDatabase.find((p) => p.title === "Taskify"),
//       };
//     }

//     if (
//       lowerQuery.includes("full-stack project") ||
//       lowerQuery.includes("backend project") ||
//       lowerQuery.includes("database project")
//     ) {
//       const fullStackProjects = projectDatabase.filter(
//         (p) => p.category === "Full Stack"
//       );
//       if (fullStackProjects.length > 0) {
//         const project = fullStackProjects[0];
//         return {
//           content: `Perfect! Here's Sodiq's full-stack expertise in action: **${project.title}**. This project demonstrates both frontend and backend development skills. ${project.description}`,
//           projectData: project,
//         };
//       }
//     }

//     // Specific project queries
//     const projectMatch = projectDatabase.find((p) =>
//       lowerQuery.includes(p.title.toLowerCase())
//     );
//     if (projectMatch) {
//       return {
//         content: `Here's details on **${projectMatch.title}**: ${
//           projectMatch.description
//         } It's a ${projectMatch.complexity.toLowerCase()} ${projectMatch.category.toLowerCase()} project built with ${projectMatch.technologies.join(
//           ", "
//         )}.`,
//         projectData: projectMatch,
//       };
//     }

//     // Keyword-based project search
//     const keywordMatch = projectDatabase.find((p) =>
//       p.keywords.some((keyword) => lowerQuery.includes(keyword))
//     );
//     if (keywordMatch) {
//       return {
//         content: `I found a project that matches your query: **${keywordMatch.title}**. ${keywordMatch.description}`,
//         projectData: keywordMatch,
//       };
//     }

//     if (
//       lowerQuery.includes("project") ||
//       lowerQuery.includes("work") ||
//       lowerQuery.includes("portfolio")
//     ) {
//       return {
//         content: `Sodiq has ${projectDatabase.length} featured projects in his portfolio, ranging from simple websites to complex full-stack applications. They cover various domains including e-commerce, SaaS, fintech, and productivity tools. What type of project interests you most? Try asking about a specific project like "Tell me about Taskify" or a category like "Show me fintech projects".`,
//       };
//     }

//     // Default response
//     return {
//       content: `Hi there! 👋 I'm your AI assistant for exploring Hypacode's portfolio. I can help you discover projects, understand technical skills, and find specific examples. Try asking me about:\n\n• "Tell me about Sodiq Atiku"\n• "What are his core values?"\n• "Show me his professional experience"\n• "What frontend technologies does he use?"\n• "Show me his most complex project"\n• "What interactive tools has he built?"\n• "Tell me about Taskify"\n\nWhat would you like to explore?`,
//     };
//   };

//   return (
//     <Card className="w-full max-w-4xl mx-auto h-[600px] flex flex-col">
//       <CardHeader className="border-b">
//         <CardTitle className="flex items-center">
//           <Sparkles className="h-5 w-5 mr-2 text-primary" />
//           AI Project Explorer
//           <Badge variant="secondary" className="ml-2">
//             Beta
//           </Badge>
//         </CardTitle>
//         <p className="text-sm text-muted-foreground">
//           Chat with AI to explore projects and discover technical expertise
//         </p>
//       </CardHeader>

//       <CardContent className="flex-1 flex flex-col p-0">
//         <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
//           <div className="space-y-4">
//             <AnimatePresence>
//               {messages.map((message) => (
//                 <motion.div
//                   key={message.id}
//                   initial={{ opacity: 0, y: 20 }}
//                   animate={{ opacity: 1, y: 0 }}
//                   exit={{ opacity: 0, y: -20 }}
//                   className={`flex ${
//                     message.type === "user" ? "justify-end" : "justify-start"
//                   }`}
//                 >
//                   <div
//                     className={`flex items-start space-x-2 max-w-[80%] ${
//                       message.type === "user"
//                         ? "flex-row-reverse space-x-reverse"
//                         : ""
//                     }`}
//                   >
//                     <Avatar className="h-8 w-8">
//                       <AvatarFallback>
//                         {message.type === "user" ? (
//                           <User className="h-4 w-4" />
//                         ) : (
//                           <Bot className="h-4 w-4" />
//                         )}
//                       </AvatarFallback>
//                     </Avatar>

//                     <div
//                       className={`rounded-lg p-3 ${
//                         message.type === "user"
//                           ? "bg-primary text-primary-foreground"
//                           : "bg-muted"
//                       }`}
//                     >
//                       <div className="whitespace-pre-wrap text-sm">
//                         {message.content}
//                       </div>

//                       {message.projectData && (
//                         <motion.div
//                           initial={{ opacity: 0, height: 0 }}
//                           animate={{ opacity: 1, height: "auto" }}
//                           className="mt-3 p-3 bg-background rounded border"
//                         >
//                           <div className="flex items-start justify-between mb-2">
//                             <h4 className="font-semibold text-foreground">
//                               {message.projectData.title}
//                             </h4>
//                             <Badge variant="outline">
//                               {message.projectData.complexity}
//                             </Badge>
//                           </div>

//                           <p className="text-xs text-muted-foreground mb-3">
//                             {message.projectData.description}
//                           </p>

//                           <div className="flex flex-wrap gap-1 mb-3">
//                             {message.projectData.technologies
//                               .slice(0, 4)
//                               .map((tech: string) => (
//                                 <Badge
//                                   key={tech}
//                                   variant="secondary"
//                                   className="text-xs"
//                                 >
//                                   {tech}
//                                 </Badge>
//                               ))}
//                             {message.projectData.technologies.length > 4 && (
//                               <Badge variant="secondary" className="text-xs">
//                                 +{message.projectData.technologies.length - 4}{" "}
//                                 more
//                               </Badge>
//                             )}
//                           </div>

//                           <div className="flex space-x-2">
//                             {message.projectData.liveUrl && (
//                               <Button size="sm" variant="outline" asChild>
//                                 <a
//                                   href={message.projectData.liveUrl}
//                                   target="_blank"
//                                   rel="noopener noreferrer"
//                                 >
//                                   <ExternalLink className="h-3 w-3 mr-1" />
//                                   Live Demo
//                                 </a>
//                               </Button>
//                             )}
//                             {message.projectData.githubUrl && (
//                               <Button size="sm" variant="outline" asChild>
//                                 <a
//                                   href={message.projectData.githubUrl}
//                                   target="_blank"
//                                   rel="noopener noreferrer"
//                                 >
//                                   <Code className="h-3 w-3 mr-1" />
//                                   Code
//                                 </a>
//                               </Button>
//                             )}
//                           </div>
//                         </motion.div>
//                       )}
//                     </div>
//                   </div>
//                 </motion.div>
//               ))}
//             </AnimatePresence>

//             {isTyping && (
//               <motion.div
//                 initial={{ opacity: 0, y: 20 }}
//                 animate={{ opacity: 1, y: 0 }}
//                 className="flex justify-start"
//               >
//                 <div className="flex items-start space-x-2">
//                   <Avatar className="h-8 w-8">
//                     <AvatarFallback>
//                       <Bot className="h-4 w-4" />
//                     </AvatarFallback>
//                   </Avatar>
//                   <div className="bg-muted rounded-lg p-3">
//                     <div className="flex space-x-1">
//                       <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
//                       <div
//                         className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
//                         style={{ animationDelay: "0.1s" }}
//                       />
//                       <div
//                         className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce"
//                         style={{ animationDelay: "0.2s" }}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </motion.div>
//             )}
//           </div>
//         </ScrollArea>

//         <div className="border-t p-4">
//           <div className="flex space-x-2">
//             <Input
//               value={input}
//               onChange={(e) => setInput(e.target.value)}
//               onKeyPress={handleKeyPress}
//               placeholder="Ask about projects, technologies, or skills..."
//               disabled={isTyping}
//               className="flex-1"
//             />
//             <Button onClick={handleSend} disabled={isTyping || !input.trim()}>
//               <Send className="h-4 w-4" />
//             </Button>
//           </div>

//           <div className="flex flex-wrap gap-2 mt-2">
//             {[
//               "Show me your most complex project",
//               "React projects",
//               "Full-stack work",
//               "Tell me about Taskify",
//             ].map((suggestion) => (
//               <Button
//                 key={suggestion}
//                 variant="ghost"
//                 size="sm"
//                 className="text-xs h-6"
//                 onClick={() => setInput(suggestion)}
//                 disabled={isTyping}
//               >
//                 {suggestion}
//               </Button>
//             ))}
//           </div>
//         </div>
//       </CardContent>
//     </Card>
//   );
// }
