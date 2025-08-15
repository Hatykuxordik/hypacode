"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Send, Bot, User, Sparkles, Code, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  id: string;
  type: "user" | "ai";
  content: string;
  timestamp: Date;
  projectData?: {
    title: string;
    description: string;
    technologies: string[];
    liveUrl?: string;
    githubUrl?: string;
    complexity: "Simple" | "Medium" | "Complex";
    category: string;
  };
}

const projectDatabase = [
  {
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform with user authentication, payment processing, inventory management, and admin dashboard. Built with Next.js, TypeScript, and Stripe integration.",
    technologies: ["Next.js", "TypeScript", "Stripe", "Prisma", "PostgreSQL", "Tailwind CSS"],
    liveUrl: "https://ecommerce-demo.hypacode.com",
    githubUrl: "https://github.com/hypacode/ecommerce-platform",
    complexity: "Complex" as const,
    category: "Full Stack",
    keywords: ["ecommerce", "payment", "stripe", "complex", "full-stack", "nextjs", "typescript"]
  },
  {
    title: "SaaS Analytics Dashboard",
    description: "Comprehensive analytics dashboard with real-time data visualization, user management, and subscription handling. Features interactive charts and responsive design.",
    technologies: ["React", "D3.js", "Node.js", "MongoDB", "Socket.io", "Chart.js"],
    liveUrl: "https://analytics-demo.hypacode.com",
    githubUrl: "https://github.com/hypacode/saas-dashboard",
    complexity: "Complex" as const,
    category: "SaaS",
    keywords: ["analytics", "dashboard", "react", "d3", "complex", "saas", "realtime"]
  },
  {
    title: "Mobile Banking App",
    description: "Secure mobile banking application with biometric authentication, real-time transactions, and comprehensive financial management tools.",
    technologies: ["React Native", "Firebase", "Plaid API", "Redux", "TypeScript"],
    liveUrl: "https://banking-demo.hypacode.com",
    githubUrl: "https://github.com/hypacode/mobile-banking",
    complexity: "Complex" as const,
    category: "Mobile",
    keywords: ["mobile", "banking", "react-native", "firebase", "complex", "fintech"]
  },
  {
    title: "Task Management System",
    description: "Collaborative task management platform with real-time updates, team collaboration features, and project tracking capabilities.",
    technologies: ["Next.js", "Supabase", "TypeScript", "Framer Motion", "Tailwind CSS"],
    liveUrl: "https://tasks-demo.hypacode.com",
    githubUrl: "https://github.com/hypacode/task-management",
    complexity: "Medium" as const,
    category: "Productivity",
    keywords: ["task", "management", "collaboration", "nextjs", "supabase", "medium"]
  },
  {
    title: "Portfolio Website",
    description: "Modern portfolio website with interactive components, dark mode, and responsive design. Built with Next.js and Tailwind CSS.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Shadcn UI"],
    liveUrl: "https://portfolio.hypacode.com",
    githubUrl: "https://github.com/hypacode/portfolio",
    complexity: "Simple" as const,
    category: "Portfolio",
    keywords: ["portfolio", "website", "simple", "nextjs", "tailwind", "responsive"]
  }
];

// Simulate AI responses based on user queries
const generateAIResponse = (query: string): { content: string; projectData?: any } => {
  const lowerQuery = query.toLowerCase();
  
  // Complex project queries
  if (lowerQuery.includes("complex") || lowerQuery.includes("most advanced") || lowerQuery.includes("challenging")) {
    const complexProjects = projectDatabase.filter(p => p.complexity === "Complex");
    const project = complexProjects[0]; // Get the first complex project
    
    return {
      content: `Here's my most complex project! The **${project.title}** is a comprehensive ${project.category.toLowerCase()} application that showcases advanced development skills. It features ${project.description.toLowerCase()}`,
      projectData: project
    };
  }
  
  // React-specific queries
  if (lowerQuery.includes("react")) {
    const reactProjects = projectDatabase.filter(p => 
      p.technologies.some(tech => tech.toLowerCase().includes("react"))
    );
    const project = reactProjects[0];
    
    return {
      content: `Great question! Here's one of my standout React projects: **${project.title}**. This project demonstrates advanced React patterns and state management. ${project.description}`,
      projectData: project
    };
  }
  
  // Next.js queries
  if (lowerQuery.includes("next") || lowerQuery.includes("nextjs")) {
    const nextProjects = projectDatabase.filter(p => 
      p.technologies.some(tech => tech.toLowerCase().includes("next"))
    );
    const project = nextProjects[0];
    
    return {
      content: `Absolutely! I love working with Next.js. Check out **${project.title}** - it's built with Next.js and showcases server-side rendering, API routes, and modern React patterns. ${project.description}`,
      projectData: project
    };
  }
  
  // Mobile queries
  if (lowerQuery.includes("mobile") || lowerQuery.includes("app")) {
    const mobileProjects = projectDatabase.filter(p => p.category === "Mobile");
    if (mobileProjects.length > 0) {
      const project = mobileProjects[0];
      return {
        content: `Here's my mobile development work! **${project.title}** is a ${project.category.toLowerCase()} application built with React Native. ${project.description}`,
        projectData: project
      };
    }
  }
  
  // Full-stack queries
  if (lowerQuery.includes("full") || lowerQuery.includes("backend") || lowerQuery.includes("database")) {
    const fullStackProjects = projectDatabase.filter(p => p.category === "Full Stack");
    if (fullStackProjects.length > 0) {
      const project = fullStackProjects[0];
      return {
        content: `Perfect! Here's my full-stack expertise in action: **${project.title}**. This project demonstrates both frontend and backend development skills. ${project.description}`,
        projectData: project
      };
    }
  }
  
  // Skills queries
  if (lowerQuery.includes("skill") || lowerQuery.includes("technology") || lowerQuery.includes("tech stack")) {
    return {
      content: `I specialize in modern web technologies! My core skills include React, Next.js, TypeScript, Node.js, and various databases. I've worked with ${projectDatabase.length} major projects using technologies like ${Array.from(new Set(projectDatabase.flatMap(p => p.technologies))).slice(0, 8).join(", ")}. Would you like to see a specific project or technology in action?`
    };
  }
  
  // General project queries
  if (lowerQuery.includes("project") || lowerQuery.includes("work") || lowerQuery.includes("portfolio")) {
    return {
      content: `I have ${projectDatabase.length} featured projects in my portfolio, ranging from simple websites to complex full-stack applications. They cover various domains including e-commerce, SaaS, mobile apps, and productivity tools. What type of project interests you most?`
    };
  }
  
  // Default response
  return {
    content: `Hi there! 👋 I'm your AI assistant for exploring Hypacode's portfolio. I can help you discover projects, understand technical skills, and find specific examples. Try asking me about:

• "Show me your most complex React project"
• "What full-stack projects do you have?"
• "Tell me about your mobile development work"
• "What technologies do you specialize in?"

What would you like to explore?`
  };
};

export function AIProjectExplorer() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: "Hi! I'm your AI guide to Hypacode's portfolio. Ask me about projects, technologies, or anything you'd like to know! 🚀",
      timestamp: new Date()
    }
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: "user",
      content: input,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI thinking time
    setTimeout(() => {
      const aiResponse = generateAIResponse(input);
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: aiResponse.content,
        timestamp: new Date(),
        projectData: aiResponse.projectData
      };

      setMessages(prev => [...prev, aiMessage]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Card className="w-full max-w-4xl mx-auto h-[600px] flex flex-col">
      <CardHeader className="border-b">
        <CardTitle className="flex items-center">
          <Sparkles className="h-5 w-5 mr-2 text-primary" />
          AI Project Explorer
          <Badge variant="secondary" className="ml-2">Beta</Badge>
        </CardTitle>
        <p className="text-sm text-muted-foreground">
          Chat with AI to explore projects and discover technical expertise
        </p>
      </CardHeader>

      <CardContent className="flex-1 flex flex-col p-0">
        <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
          <div className="space-y-4">
            <AnimatePresence>
              {messages.map((message) => (
                <motion.div
                  key={message.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className={`flex ${message.type === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div className={`flex items-start space-x-2 max-w-[80%] ${
                    message.type === "user" ? "flex-row-reverse space-x-reverse" : ""
                  }`}>
                    <Avatar className="h-8 w-8">
                      <AvatarFallback>
                        {message.type === "user" ? <User className="h-4 w-4" /> : <Bot className="h-4 w-4" />}
                      </AvatarFallback>
                    </Avatar>
                    
                    <div className={`rounded-lg p-3 ${
                      message.type === "user" 
                        ? "bg-primary text-primary-foreground" 
                        : "bg-muted"
                    }`}>
                      <div className="whitespace-pre-wrap text-sm">
                        {message.content}
                      </div>
                      
                      {message.projectData && (
                        <motion.div
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          className="mt-3 p-3 bg-background rounded border"
                        >
                          <div className="flex items-start justify-between mb-2">
                            <h4 className="font-semibold text-foreground">{message.projectData.title}</h4>
                            <Badge variant="outline">{message.projectData.complexity}</Badge>
                          </div>
                          
                          <p className="text-xs text-muted-foreground mb-3">
                            {message.projectData.description}
                          </p>
                          
                          <div className="flex flex-wrap gap-1 mb-3">
                            {message.projectData.technologies.slice(0, 4).map((tech: string) => (
                              <Badge key={tech} variant="secondary" className="text-xs">
                                {tech}
                              </Badge>
                            ))}
                            {message.projectData.technologies.length > 4 && (
                              <Badge variant="secondary" className="text-xs">
                                +{message.projectData.technologies.length - 4} more
                              </Badge>
                            )}
                          </div>
                          
                          <div className="flex space-x-2">
                            {message.projectData.liveUrl && (
                              <Button size="sm" variant="outline" asChild>
                                <a href={message.projectData.liveUrl} target="_blank" rel="noopener noreferrer">
                                  <ExternalLink className="h-3 w-3 mr-1" />
                                  Live Demo
                                </a>
                              </Button>
                            )}
                            {message.projectData.githubUrl && (
                              <Button size="sm" variant="outline" asChild>
                                <a href={message.projectData.githubUrl} target="_blank" rel="noopener noreferrer">
                                  <Code className="h-3 w-3 mr-1" />
                                  Code
                                </a>
                              </Button>
                            )}
                          </div>
                        </motion.div>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
            
            {isTyping && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex justify-start"
              >
                <div className="flex items-start space-x-2">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>
                      <Bot className="h-4 w-4" />
                    </AvatarFallback>
                  </Avatar>
                  <div className="bg-muted rounded-lg p-3">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                      <div className="w-2 h-2 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>
        </ScrollArea>

        <div className="border-t p-4">
          <div className="flex space-x-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about projects, technologies, or skills..."
              disabled={isTyping}
              className="flex-1"
            />
            <Button onClick={handleSend} disabled={isTyping || !input.trim()}>
              <Send className="h-4 w-4" />
            </Button>
          </div>
          
          <div className="flex flex-wrap gap-2 mt-2">
            {["Show me your most complex project", "React projects", "Full-stack work", "Mobile apps"].map((suggestion) => (
              <Button
                key={suggestion}
                variant="ghost"
                size="sm"
                className="text-xs h-6"
                onClick={() => setInput(suggestion)}
                disabled={isTyping}
              >
                {suggestion}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

