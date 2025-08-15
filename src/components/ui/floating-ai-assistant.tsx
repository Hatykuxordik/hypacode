"use client";

import { useState, useRef, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { 
  Send, 
  Bot, 
  User, 
  MessageCircle, 
  X, 
  Minimize2,
  Code,
  ExternalLink,
  Sparkles
} from "lucide-react";
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
    description: "A full-featured e-commerce platform with user authentication, payment processing, inventory management, and admin dashboard.",
    technologies: ["Next.js", "TypeScript", "Stripe", "Prisma", "PostgreSQL", "Tailwind CSS"],
    liveUrl: "https://ecommerce-demo.hypacode.com",
    githubUrl: "https://github.com/hypacode/ecommerce-platform",
    complexity: "Complex" as const,
    category: "Full Stack",
    keywords: ["ecommerce", "payment", "stripe", "complex", "full-stack", "nextjs", "typescript"]
  },
  {
    title: "SaaS Analytics Dashboard",
    description: "Comprehensive analytics dashboard with real-time data visualization, user management, and subscription handling.",
    technologies: ["React", "D3.js", "Node.js", "MongoDB", "Socket.io", "Chart.js"],
    liveUrl: "https://analytics-demo.hypacode.com",
    githubUrl: "https://github.com/hypacode/saas-dashboard",
    complexity: "Complex" as const,
    category: "SaaS",
    keywords: ["analytics", "dashboard", "react", "d3", "complex", "saas", "realtime"]
  },
  {
    title: "Task Management App",
    description: "A collaborative task management application with real-time updates, team collaboration, and project tracking.",
    technologies: ["React", "Firebase", "Material-UI", "Redux", "TypeScript"],
    liveUrl: "https://tasks-demo.hypacode.com",
    githubUrl: "https://github.com/hypacode/task-manager",
    complexity: "Medium" as const,
    category: "Productivity",
    keywords: ["task", "management", "collaboration", "react", "firebase", "medium"]
  },
  {
    title: "Weather App",
    description: "A beautiful weather application with location-based forecasts, interactive maps, and weather alerts.",
    technologies: ["React Native", "OpenWeather API", "Redux", "Expo"],
    liveUrl: "https://weather-demo.hypacode.com",
    githubUrl: "https://github.com/hypacode/weather-app",
    complexity: "Simple" as const,
    category: "Mobile",
    keywords: ["weather", "mobile", "react native", "api", "simple"]
  }
];

const generateAIResponse = (query: string): { content: string; projectData?: any } => {
  const lowerQuery = query.toLowerCase();
  
  // Find matching projects
  const matchingProjects = projectDatabase.filter(project =>
    project.keywords.some(keyword => lowerQuery.includes(keyword)) ||
    project.technologies.some(tech => lowerQuery.includes(tech.toLowerCase()))
  );

  if (matchingProjects.length > 0) {
    const project = matchingProjects[0];
    return {
      content: `Great question! I found a perfect match for you. Here's one of Hypacode's ${project.complexity.toLowerCase()} projects:`,
      projectData: project,
    };
  }

  // Default responses for common queries
  if (lowerQuery.includes("complex") || lowerQuery.includes("advanced")) {
    return {
      content: "Here's one of the most complex projects in the portfolio:",
      projectData: projectDatabase.find(p => p.complexity === "Complex"),
    };
  }

  if (lowerQuery.includes("react")) {
    return {
      content: "Here's a React project that showcases modern development practices:",
      projectData: projectDatabase.find(p => p.technologies.includes("React")),
    };
  }

  if (lowerQuery.includes("full-stack") || lowerQuery.includes("fullstack")) {
    return {
      content: "Here's a full-stack project demonstrating end-to-end development skills:",
      projectData: projectDatabase.find(p => p.category === "Full Stack"),
    };
  }

  if (lowerQuery.includes("mobile")) {
    return {
      content: "Here's a mobile-focused project with responsive design:",
      projectData: projectDatabase.find(p => p.category === "Mobile"),
    };
  }

  // General response
  return {
    content: "I can help you explore Hypacode's projects! Try asking about specific technologies like 'React projects', 'full-stack work', or 'mobile apps'. You can also ask about project complexity or specific features you're interested in.",
  };
};

export function FloatingAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content: "Hi! I'm Hypacode's AI assistant. Ask me about projects, technologies, or anything you'd like to know! 🚀",
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
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
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsTyping(true);

    // Simulate AI processing
    setTimeout(() => {
      const response = generateAIResponse(input);
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        type: "ai",
        content: response.content,
        timestamp: new Date(),
        projectData: response.projectData,
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
    setTimeout(() => handleSend(), 100);
  };

  return (
    <>
      {/* Floating Chat Button */}
      <AnimatePresence>
        {!isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0, opacity: 0 }}
            className="fixed bottom-6 right-6 z-50"
          >
            <Button
              onClick={() => setIsOpen(true)}
              size="lg"
              className="h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>
            
            {/* Tooltip */}
            <div className="absolute bottom-16 right-0 mb-2 px-3 py-2 bg-foreground text-background text-sm rounded-lg shadow-lg opacity-0 hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
              Chat with Hypacode AI
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Chat Widget */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ scale: 0, opacity: 0, x: 100, y: 100 }}
            animate={{ 
              scale: 1, 
              opacity: 1, 
              x: 0, 
              y: 0,
              height: isMinimized ? "auto" : "500px"
            }}
            exit={{ scale: 0, opacity: 0, x: 100, y: 100 }}
            className="fixed bottom-6 right-6 z-50 w-80 sm:w-96"
          >
            <Card className="shadow-2xl border-2">
              {/* Header */}
              <CardHeader className="pb-3 bg-primary text-primary-foreground rounded-t-lg">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="relative">
                      <Bot className="h-5 w-5" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    </div>
                    Hypacode AI
                    <Badge variant="secondary" className="text-xs bg-primary-foreground/20 text-primary-foreground">
                      Online
                    </Badge>
                  </CardTitle>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsMinimized(!isMinimized)}
                      className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                    >
                      <Minimize2 className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setIsOpen(false)}
                      className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                    >
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                <p className="text-sm text-primary-foreground/80">
                  Your AI guide to explore projects and skills
                </p>
              </CardHeader>

              {/* Chat Content */}
              <AnimatePresence>
                {!isMinimized && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                  >
                    <CardContent className="p-4 h-96 flex flex-col">
                      {/* Messages */}
                      <ScrollArea className="flex-1 pr-2 mb-3">
                        <div className="space-y-3">
                          <AnimatePresence>
                            {messages.map((message) => (
                              <motion.div
                                key={message.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className={`flex gap-2 ${
                                  message.type === "user" ? "justify-end" : "justify-start"
                                }`}
                              >
                                {message.type === "ai" && (
                                  <Avatar className="h-6 w-6 mt-1">
                                    <AvatarFallback className="bg-primary/10">
                                      <Bot className="h-3 w-3 text-primary" />
                                    </AvatarFallback>
                                  </Avatar>
                                )}
                                
                                <div className={`max-w-[85%] ${
                                  message.type === "user" ? "order-first" : ""
                                }`}>
                                  <div
                                    className={`rounded-lg px-3 py-2 text-sm ${
                                      message.type === "user"
                                        ? "bg-primary text-primary-foreground ml-auto"
                                        : "bg-muted"
                                    }`}
                                  >
                                    {message.content}
                                  </div>
                                  
                                  {message.projectData && (
                                    <motion.div
                                      initial={{ opacity: 0, scale: 0.95 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      className="mt-2 p-3 border rounded-lg bg-card text-xs"
                                    >
                                      <h4 className="font-semibold mb-1">{message.projectData.title}</h4>
                                      <p className="text-muted-foreground mb-2 line-clamp-2">
                                        {message.projectData.description}
                                      </p>
                                      <div className="flex flex-wrap gap-1 mb-2">
                                        {message.projectData.technologies.slice(0, 3).map((tech: string) => (
                                          <Badge key={tech} variant="outline" className="text-xs">
                                            {tech}
                                          </Badge>
                                        ))}
                                        {message.projectData.technologies.length > 3 && (
                                          <Badge variant="outline" className="text-xs">
                                            +{message.projectData.technologies.length - 3}
                                          </Badge>
                                        )}
                                      </div>
                                      <div className="flex gap-1">
                                        {message.projectData.liveUrl && (
                                          <Button size="sm" variant="outline" className="text-xs h-6" asChild>
                                            <a href={message.projectData.liveUrl} target="_blank" rel="noopener noreferrer">
                                              <ExternalLink className="h-2 w-2 mr-1" />
                                              Demo
                                            </a>
                                          </Button>
                                        )}
                                        {message.projectData.githubUrl && (
                                          <Button size="sm" variant="outline" className="text-xs h-6" asChild>
                                            <a href={message.projectData.githubUrl} target="_blank" rel="noopener noreferrer">
                                              <Code className="h-2 w-2 mr-1" />
                                              Code
                                            </a>
                                          </Button>
                                        )}
                                      </div>
                                    </motion.div>
                                  )}
                                </div>
                                
                                {message.type === "user" && (
                                  <Avatar className="h-6 w-6 mt-1">
                                    <AvatarFallback className="bg-primary text-primary-foreground">
                                      <User className="h-3 w-3" />
                                    </AvatarFallback>
                                  </Avatar>
                                )}
                              </motion.div>
                            ))}
                          </AnimatePresence>
                          
                          {isTyping && (
                            <motion.div
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              className="flex gap-2"
                            >
                              <Avatar className="h-6 w-6 mt-1">
                                <AvatarFallback className="bg-primary/10">
                                  <Bot className="h-3 w-3 text-primary" />
                                </AvatarFallback>
                              </Avatar>
                              <div className="bg-muted rounded-lg px-3 py-2">
                                <div className="flex space-x-1">
                                  <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" />
                                  <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.1s" }} />
                                  <div className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce" style={{ animationDelay: "0.2s" }} />
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </div>
                        <div ref={messagesEndRef} />
                      </ScrollArea>

                      {/* Quick Questions */}
                      <div className="mb-3">
                        <div className="flex flex-wrap gap-1">
                          {[
                            "Complex projects",
                            "React work",
                            "Full-stack",
                            "Mobile apps"
                          ].map((question) => (
                            <Button
                              key={question}
                              variant="outline"
                              size="sm"
                              className="text-xs h-6"
                              onClick={() => handleQuickQuestion(question)}
                            >
                              {question}
                            </Button>
                          ))}
                        </div>
                      </div>

                      {/* Input */}
                      <div className="flex gap-2">
                        <Input
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          placeholder="Ask about projects or skills..."
                          onKeyPress={(e) => e.key === "Enter" && handleSend()}
                          className="flex-1 text-sm"
                        />
                        <Button onClick={handleSend} size="icon" className="shrink-0 h-9 w-9">
                          <Send className="h-3 w-3" />
                        </Button>
                      </div>
                    </CardContent>
                  </motion.div>
                )}
              </AnimatePresence>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

