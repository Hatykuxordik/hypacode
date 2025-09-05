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
  Trash2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import {
  personalDetails,
  skillsData,
  toolsData,
  projectDatabase,
} from "@/lib/hypacodeData";

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
  formattedContent?: {
    title?: string;
    sections?: { heading: string; items: string[] }[];
    text?: string;
  };
}

export function FloatingAIAssistant() {
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      type: "ai",
      content:
        "Hi! I'm Hypacode's AI assistant. Ask me about projects, technologies, or anything you'd like to know! 🚀",
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
        formattedContent: response.formattedContent,
      };
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1500);
  };

  const handleQuickQuestion = (question: string) => {
    setInput(question);
    setTimeout(() => handleSend(), 100);
  };

  const clearChat = () => {
    setMessages([
      {
        id: "1",
        type: "ai",
        content:
          "Chat cleared! I'm Hypacode's AI assistant. Ask me about projects, technologies, or anything you'd like to know! 🚀",
        timestamp: new Date(),
      },
    ]);
  };

  const generateAIResponse = (
    query: string
  ): { content: string; projectData?: any; formattedContent?: any } => {
    const lowerQuery = query.toLowerCase();

    // Check for clear chat command
    if (
      lowerQuery.includes("clear chat") ||
      lowerQuery.includes("reset chat")
    ) {
      clearChat();
      return { content: "" };
    }

    // Personal details queries
    if (
      lowerQuery.includes("name") ||
      lowerQuery.includes("who are you") ||
      lowerQuery.includes("personal details") ||
      lowerQuery.includes("who is sodiq atiku") ||
      lowerQuery.includes("sodiq")
    ) {
      return {
        content: `Sodiq Atiku is a passionate Frontend Developer from Lagos, Nigeria, with ${personalDetails.experience} of experience. He has completed ${personalDetails.projectsCompleted} projects and maintains ${personalDetails.clientSatisfaction} client satisfaction.`,
        formattedContent: {
          text: `Sodiq Atiku is a passionate Frontend Developer from Lagos, Nigeria, with ${personalDetails.experience} of experience. He has completed ${personalDetails.projectsCompleted} projects and maintains ${personalDetails.clientSatisfaction} client satisfaction.`,
        },
      };
    }

    if (
      lowerQuery.includes("core values") ||
      lowerQuery.includes("principles") ||
      lowerQuery.includes("values")
    ) {
      const values = personalDetails.coreValues.map((v) => ({
        heading: v.title,
        description: v.description,
      }));
      return {
        content: `Sodiq's core values are:\n\n${values
          .map((v) => `**${v.heading}**: ${v.description}`)
          .join("\n\n")}`,
        formattedContent: {
          title: "Sodiq's Core Values",
          sections: values.map((v) => ({
            heading: v.heading,
            items: [v.description],
          })),
        },
      };
    }

    if (
      lowerQuery.includes("experience") ||
      lowerQuery.includes("work history") ||
      lowerQuery.includes("professional journey") ||
      lowerQuery.includes("job")
    ) {
      const experience = personalDetails.professionalExperience.map((exp) => ({
        heading: `${exp.title} at ${exp.company} (${exp.duration}, ${exp.location})`,
        items: [
          `Achievements: ${exp.achievements.join("; ")}`,
          `Technologies: ${exp.technologies.join(", ")}`,
        ],
      }));
      return {
        content: `Sodiq's professional journey includes:\n\n${personalDetails.professionalExperience
          .map(
            (exp) =>
              `**${exp.title}** at ${exp.company} (${exp.duration}, ${
                exp.location
              }). Key achievements include: ${exp.achievements.join(
                "; "
              )}. Technologies used: ${exp.technologies.join(", ")}.`
          )
          .join("\n\n")}`,
        formattedContent: {
          title: "Professional Experience",
          sections: experience,
        },
      };
    }

    if (
      lowerQuery.includes("education") ||
      lowerQuery.includes("learning") ||
      lowerQuery.includes("degree") ||
      lowerQuery.includes("school")
    ) {
      const education = personalDetails.education.map((edu) => ({
        heading: `${edu.degree} - ${edu.university} (${edu.duration})`,
        items: [
          `Achievements: ${edu.achievements.join("; ")}`,
          `Relevant areas: ${edu.technologies.join(", ")}`,
        ],
      }));
      return {
        content: `Sodiq's educational background and continuous learning journey:\n\n${personalDetails.education
          .map(
            (edu) =>
              `**${edu.degree}** from ${edu.university} (${
                edu.duration
              }). Key achievements: ${edu.achievements.join(
                "; "
              )}. Relevant areas of study: ${edu.technologies.join(", ")}.`
          )
          .join("\n\n")}`,
        formattedContent: {
          title: "Education and Learning",
          sections: education,
        },
      };
    }

    if (
      lowerQuery.includes("certifications") ||
      lowerQuery.includes("achievements") ||
      lowerQuery.includes("cert") ||
      lowerQuery.includes("courses")
    ) {
      const certifications = personalDetails.certifications.map((cert) => ({
        heading: cert.title,
        items: [`Issuer: ${cert.issuer} (${cert.year})`],
      }));
      return {
        content: `Sodiq has earned several certifications, including:\n\n${personalDetails.certifications
          .map(
            (cert) => `**${cert.title}** from ${cert.issuer} (${cert.year}).`
          )
          .join("\n\n")}`,
        formattedContent: {
          title: "Certifications",
          sections: certifications,
        },
      };
    }

    // Skills queries
    if (
      lowerQuery.includes("frontend technologies") ||
      lowerQuery.includes("frontend skills") ||
      lowerQuery.includes("frontend")
    ) {
      const frontendSkills = skillsData.frontendTechnologies.map((skill) => ({
        heading: `${skill.name} (${skill.proficiency})`,
        items: [skill.description],
      }));
      return {
        content: `Sodiq's frontend technology expertise includes:\n\n${skillsData.frontendTechnologies
          .map(
            (skill) =>
              `**${skill.name}** (${skill.proficiency}): ${skill.description}`
          )
          .join("\n\n")}`,
        formattedContent: {
          title: "Frontend Technology Expertise",
          sections: frontendSkills,
        },
      };
    }

    if (
      lowerQuery.includes("core technologies") ||
      lowerQuery.includes("tech stack") ||
      lowerQuery.includes("stack") ||
      lowerQuery.includes("technologies")
    ) {
      return {
        content: `Sodiq's core technologies include: ${skillsData.coreTechnologies.join(
          ", "
        )}.`,
        formattedContent: {
          text: `Sodiq's core technologies include: ${skillsData.coreTechnologies.join(
            ", "
          )}.`,
        },
      };
    }

    // Tools queries
    if (
      lowerQuery.includes("tools") ||
      lowerQuery.includes("interactive tools") ||
      lowerQuery.includes("developed tools")
    ) {
      const interactiveTools = toolsData.map((tool) => ({
        heading: tool.name,
        items: [tool.description],
      }));
      return {
        content: `Sodiq has developed several interactive tools, such as:\n\n${toolsData
          .map((tool) => `**${tool.name}**: ${tool.description}`)
          .join("\n\n")}`,
        formattedContent: {
          title: "Interactive Tools",
          sections: interactiveTools,
        },
      };
    }

    // Project queries
    if (
      lowerQuery.includes("complex project") ||
      lowerQuery.includes("complex") ||
      lowerQuery.includes("most advanced") ||
      lowerQuery.includes("challenging project")
    ) {
      const complexProjects = projectDatabase.filter(
        (p) => p.complexity === "Complex"
      );
      if (complexProjects.length > 0) {
        const project = complexProjects[0];
        return {
          content: `Here's one of Sodiq's most complex projects: The **${
            project.title
          }** is a comprehensive ${project.category.toLowerCase()} application that showcases advanced development skills. It features ${project.description.toLowerCase()}`,
          projectData: project,
          formattedContent: {
            title: "Complex Project",
            text: `The ${
              project.title
            } is a comprehensive ${project.category.toLowerCase()} application that showcases advanced development skills. It features ${project.description.toLowerCase()}`,
          },
        };
      }
    }

    if (lowerQuery.includes("react project") || lowerQuery.includes("react")) {
      const reactProjects = projectDatabase.filter((p) =>
        p.technologies.some((tech) => tech.toLowerCase().includes("react"))
      );
      if (reactProjects.length > 0) {
        const project = reactProjects[0];
        return {
          content: `Here's one of Sodiq's standout React projects: **${project.title}**. This project demonstrates advanced React patterns and state management. ${project.description}`,
          projectData: project,
          formattedContent: {
            title: "React Project",
            text: `${project.title} demonstrates advanced React patterns and state management. ${project.description}`,
          },
        };
      }
    }

    if (
      lowerQuery.includes("next.js project") ||
      lowerQuery.includes("nextjs project") ||
      lowerQuery.includes("next.js") ||
      lowerQuery.includes("nextjs")
    ) {
      const nextProjects = projectDatabase.filter((p) =>
        p.technologies.some(
          (tech) =>
            tech.toLowerCase().includes("next.js") ||
            tech.toLowerCase().includes("nextjs")
        )
      );
      if (nextProjects.length > 0) {
        const project = nextProjects[0];
        return {
          content: `Absolutely! Sodiq loves working with Next.js. Check out **${project.title}** - it's built with Next.js and showcases server-side rendering, API routes, and modern React patterns. ${project.description}`,
          projectData: project,
          formattedContent: {
            title: "Next.js Project",
            text: `${project.title} is built with Next.js and showcases server-side rendering, API routes, and modern React patterns. ${project.description}`,
          },
        };
      }
    }

    if (
      lowerQuery.includes("mobile app") ||
      lowerQuery.includes("mobile development") ||
      lowerQuery.includes("mobile")
    ) {
      const mobileProjects = projectDatabase.filter(
        (p) => p.category === "Mobile"
      );
      if (mobileProjects.length > 0) {
        const project = mobileProjects[0];
        return {
          content: `Here's Sodiq's mobile development work! **${
            project.title
          }** is a ${project.category.toLowerCase()} application built with React Native. ${
            project.description
          }`,
          projectData: project,
          formattedContent: {
            title: "Mobile Development",
            text: `${
              project.title
            } is a ${project.category.toLowerCase()} application built with React Native. ${
              project.description
            }`,
          },
        };
      } else {
        const project = projectDatabase.find((p) => p.title === "Taskify");
        return {
          content: `Currently, Sodiq's portfolio focuses on web applications, but he has the skills to develop mobile apps using technologies like React Native. Would you like me to recommend a web-based project with mobile-friendly design instead? For example, **Taskify** is a responsive web app built with Next.js 14 and Supabase, offering a seamless experience on mobile devices.`,
          projectData: project,
          formattedContent: {
            title: "Mobile-Friendly Project",
            text: `Currently, Sodiq's portfolio focuses on web applications, but he has the skills to develop mobile apps using technologies like React Native. For example, Taskify is a responsive web app built with Next.js 14 and Supabase, offering a seamless experience on mobile devices.`,
          },
        };
      }
    }

    if (
      lowerQuery.includes("full-stack project") ||
      lowerQuery.includes("fullstack") ||
      lowerQuery.includes("backend project") ||
      lowerQuery.includes("database project") ||
      lowerQuery.includes("full-stack")
    ) {
      const fullStackProjects = projectDatabase.filter(
        (p) => p.category === "Full Stack"
      );
      if (fullStackProjects.length > 0) {
        const project = fullStackProjects[0];
        return {
          content: `Perfect! Here's Sodiq's full-stack expertise in action: **${project.title}**. This project demonstrates both frontend and backend development skills. ${project.description}`,
          projectData: project,
          formattedContent: {
            title: "Full-Stack Project",
            text: `${project.title} demonstrates both frontend and backend development skills. ${project.description}`,
          },
        };
      }
    }

    // Specific project queries
    const projectMatch = projectDatabase.find((p) =>
      lowerQuery.includes(p.title.toLowerCase())
    );
    if (projectMatch) {
      return {
        content: `Here's details on **${projectMatch.title}**: ${
          projectMatch.description
        } It's a ${projectMatch.complexity.toLowerCase()} ${projectMatch.category.toLowerCase()} project built with ${projectMatch.technologies.join(
          ", "
        )}.`,
        projectData: projectMatch,
        formattedContent: {
          title: projectMatch.title,
          text: `${
            projectMatch.description
          } It's a ${projectMatch.complexity.toLowerCase()} ${projectMatch.category.toLowerCase()} project built with ${projectMatch.technologies.join(
            ", "
          )}.`,
        },
      };
    }

    // Keyword-based project search
    const keywordMatch = projectDatabase.find(
      (p) =>
        p.keywords.some((keyword) => lowerQuery.includes(keyword)) ||
        p.technologies.some((tech) => lowerQuery.includes(tech.toLowerCase()))
    );
    if (keywordMatch) {
      return {
        content: `I found a project that matches your query: **${keywordMatch.title}**. ${keywordMatch.description}`,
        projectData: keywordMatch,
        formattedContent: {
          title: keywordMatch.title,
          text: keywordMatch.description,
        },
      };
    }

    if (
      lowerQuery.includes("project") ||
      lowerQuery.includes("work") ||
      lowerQuery.includes("portfolio")
    ) {
      return {
        content: `Sodiq has ${projectDatabase.length} featured projects in his portfolio, ranging from simple websites to complex full-stack applications. They cover various domains including e-commerce, SaaS, fintech, and productivity tools. What type of project interests you most? Try asking about a specific project like "Tell me about Taskify" or a category like "Show me fintech projects".`,
        formattedContent: {
          title: "Portfolio Overview",
          text: `Sodiq has ${projectDatabase.length} featured projects in his portfolio, ranging from simple websites to complex full-stack applications. They cover various domains including e-commerce, SaaS, fintech, and productivity tools. What type of project interests you most? Try asking about a specific project like "Tell me about Taskify" or a category like "Show me fintech projects".`,
        },
      };
    }

    // Dynamic additions for more general questions
    if (
      lowerQuery.includes("current date") ||
      lowerQuery.includes("what day is it") ||
      lowerQuery.includes("date") ||
      lowerQuery.includes("time")
    ) {
      const date = new Date().toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
      });
      return {
        content: `The current date is ${date}. But remember, I'm focused on the portfolio—ask me about projects!`,
        formattedContent: {
          text: `The current date is ${date}. But I'm focused on the portfolio—ask me about projects!`,
        },
      };
    }

    if (lowerQuery.includes("weather")) {
      const project = projectDatabase.find((p) => p.title === "Global Finder");
      return {
        content: `I can't check live weather, but in Sodiq's portfolio, there's the Global Finder project which includes real-time weather data for countries. Check it out!`,
        projectData: project,
        formattedContent: {
          title: "Weather-Related Project",
          text: `I can't check live weather, but in Sodiq's portfolio, there's the Global Finder project which includes real-time weather data for countries.`,
        },
      };
    }

    if (lowerQuery.includes("calculate") || lowerQuery.includes("math")) {
      return {
        content: `I'm not equipped for complex calculations like a full AI, but for simple math, you can use JavaScript in the console. For example, 2 + 2 = 4. For more advanced stuff, consider using Grok at x.ai.`,
        formattedContent: {
          text: `I'm not equipped for complex calculations like a full AI, but for simple math, you can use JavaScript in the console. For example, 2 + 2 = 4. For more advanced stuff, consider using Grok at x.ai.`,
        },
      };
    }

    if (lowerQuery.includes("joke") || lowerQuery.includes("tell me a joke")) {
      return {
        content: `Why did the developer go broke? Because he used up all his cache! 😄 Now, back to the portfolio—what project would you like to know about?`,
        formattedContent: {
          text: `Why did the developer go broke? Because he used up all his cache! 😄 Now, back to the portfolio—what project would you like to know about?`,
        },
      };
    }

    // Closest match search if no exact match
    const allData = {
      ...personalDetails,
      ...skillsData,
      toolsData,
      projectDatabase,
    };
    const dataString = JSON.stringify(allData).toLowerCase();
    if (dataString.includes(lowerQuery)) {
      if (dataString.includes(lowerQuery) && lowerQuery.includes("cert")) {
        return generateAIResponse("certifications");
      } else if (
        dataString.includes(lowerQuery) &&
        lowerQuery.includes("edu")
      ) {
        return generateAIResponse("education");
      } else if (
        dataString.includes(lowerQuery) &&
        lowerQuery.includes("exp")
      ) {
        return generateAIResponse("experience");
      } else if (
        dataString.includes(lowerQuery) &&
        lowerQuery.includes("skill")
      ) {
        return generateAIResponse("tech stack");
      } else if (
        dataString.includes(lowerQuery) &&
        lowerQuery.includes("tool")
      ) {
        return generateAIResponse("tools");
      } else if (
        dataString.includes(lowerQuery) &&
        lowerQuery.includes("project")
      ) {
        return generateAIResponse("projects");
      } else {
        return {
          content: `I found something related to "${query}" in the data, but it's not a direct match. Here's a general overview: Sodiq is skilled in various technologies and has multiple projects. Ask more specifically!`,
          formattedContent: {
            text: `I found something related to "${query}" in the data, but it's not a direct match. Here's a general overview: Sodiq is skilled in various technologies and has multiple projects. Ask more specifically!`,
          },
        };
      }
    }

    // Default response for unmatched queries
    return {
      content: `I'm Hypacode's specialized AI assistant, dedicated to providing in-depth information about Sodiq Atiku's portfolio and professional work. I can share detailed insights on projects, skills, experience, education, certifications, tools, and more. For example, you can ask about 'Sodiq's experience,' 'React projects,' or 'core values.' For broader or more complex questions beyond this scope, you can explore further with Grok at https://x.ai or ChatGPT at https://chat.openai.com. What aspect of Sodiq's portfolio would you like to dive into?`,
      formattedContent: {
        text: `I'm Hypacode's specialized AI assistant, dedicated to providing in-depth information about Sodiq Atiku's portfolio and professional work. I can share detailed insights on projects, skills, experience, education, certifications, tools, and more. For example, you can ask about 'Sodiq's experience,' 'React projects,' or 'core values.' For broader or more complex questions beyond this scope, you can explore further with Grok at https://x.ai or ChatGPT at https://chat.openai.com. What aspect of Sodiq's portfolio would you like to dive into?`,
      },
    };
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
              className="cursor-pointer h-14 w-14 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90"
            >
              <MessageCircle className="h-6 w-6" />
            </Button>

            {/* Tooltip */}
            <div className="absolute right-16 -top-2 px-3 py-2 bg-foreground text-background text-sm rounded-lg shadow-lg opacity-0 hover:opacity-100 transition-opacity duration-300 whitespace-nowrap">
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
              height: isMinimized ? "auto" : "500px",
            }}
            exit={{ scale: 0, opacity: 0, x: 100, y: 100 }}
            className="fixed bottom-20 md:bottom-12 right-6 z-50 w-80 sm:w-96"
          >
            <Card className="relative shadow-2xl border-2">
              {/* Header */}
              <CardHeader className="pb-3 bg-primary text-primary-foreground rounded-t-lg">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-lg">
                    <div className="relative">
                      <Bot className="h-5 w-5" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-400 rounded-full animate-pulse" />
                    </div>
                    Hypacode AI
                    <Badge
                      variant="secondary"
                      className="text-xs bg-primary-foreground/20 text-primary-foreground"
                    >
                      Online
                    </Badge>
                  </CardTitle>
                  <div className="flex items-center gap-1">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={clearChat}
                      className="h-8 w-8 text-primary-foreground hover:bg-primary-foreground/20"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
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
                    <CardContent className="p-4 h-96 flex flex-col overflow-y-auto flex-nowrap">
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
                                  message.type === "user"
                                    ? "justify-end"
                                    : "justify-start"
                                }`}
                              >
                                {message.type === "ai" && (
                                  <Avatar className="h-6 w-6 mt-1">
                                    <AvatarFallback className="bg-primary/10">
                                      <Bot className="h-3 w-3 text-primary" />
                                    </AvatarFallback>
                                  </Avatar>
                                )}

                                <div
                                  className={`max-w-[85%] ${
                                    message.type === "user" ? "order-first" : ""
                                  }`}
                                >
                                  {message.formattedContent ? (
                                    <div
                                      className={`rounded-lg px-3 py-2 text-sm ${
                                        message.type === "user"
                                          ? "bg-primary text-primary-foreground ml-auto"
                                          : "bg-muted"
                                      }`}
                                    >
                                      {message.formattedContent.title && (
                                        <h3 className="text-base font-semibold mb-2">
                                          {message.formattedContent.title}
                                        </h3>
                                      )}
                                      {message.formattedContent.text && (
                                        <p className="text-sm">
                                          {message.formattedContent.text}
                                        </p>
                                      )}
                                      {message.formattedContent.sections && (
                                        <div className="space-y-3">
                                          {message.formattedContent.sections.map(
                                            (section, index) => (
                                              <div key={index}>
                                                <h4 className="text-sm font-medium text-foreground">
                                                  {section.heading}
                                                </h4>
                                                <ul className="list-disc pl-5 text-sm text-muted-foreground">
                                                  {section.items.map(
                                                    (item, idx) => (
                                                      <li key={idx}>{item}</li>
                                                    )
                                                  )}
                                                </ul>
                                              </div>
                                            )
                                          )}
                                        </div>
                                      )}
                                    </div>
                                  ) : (
                                    <div
                                      className={`rounded-lg px-3 py-2 text-sm ${
                                        message.type === "user"
                                          ? "bg-primary text-primary-foreground ml-auto"
                                          : "bg-muted"
                                      }`}
                                    >
                                      {message.content}
                                    </div>
                                  )}

                                  {message.projectData && (
                                    <motion.div
                                      initial={{ opacity: 0, scale: 0.95 }}
                                      animate={{ opacity: 1, scale: 1 }}
                                      className="mt-2 p-3 border rounded-lg bg-card text-xs"
                                    >
                                      <h4 className="font-semibold mb-1">
                                        {message.projectData.title}
                                      </h4>
                                      <p className="text-muted-foreground mb-2 line-clamp-2">
                                        {message.projectData.description}
                                      </p>
                                      <div className="flex flex-wrap gap-1 mb-2">
                                        {message.projectData.technologies
                                          .slice(0, 3)
                                          .map((tech: string) => (
                                            <Badge
                                              key={tech}
                                              variant="outline"
                                              className="text-xs"
                                            >
                                              {tech}
                                            </Badge>
                                          ))}
                                        {message.projectData.technologies
                                          .length > 3 && (
                                          <Badge
                                            variant="outline"
                                            className="text-xs"
                                          >
                                            +
                                            {message.projectData.technologies
                                              .length - 3}
                                          </Badge>
                                        )}
                                      </div>
                                      <div className="flex gap-1">
                                        {message.projectData.liveUrl && (
                                          <Button
                                            size="sm"
                                            variant="outline"
                                            className="text-xs h-6"
                                            asChild
                                          >
                                            <a
                                              href={message.projectData.liveUrl}
                                              target="_blank"
                                              rel="noopener noreferrer"
                                            >
                                              <ExternalLink className="h-2 w-2 mr-1" />
                                              Demo
                                            </a>
                                          </Button>
                                        )}
                                        {message.projectData.githubUrl && (
                                          <Button
                                            size="sm"
                                            variant="outline"
                                            className="text-xs h-6"
                                            asChild
                                          >
                                            <a
                                              href={
                                                message.projectData.githubUrl
                                              }
                                              target="_blank"
                                              rel="noopener noreferrer"
                                            >
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
                                  <div
                                    className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce"
                                    style={{ animationDelay: "0.1s" }}
                                  />
                                  <div
                                    className="w-1.5 h-1.5 bg-muted-foreground rounded-full animate-bounce"
                                    style={{ animationDelay: "0.2s" }}
                                  />
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
                            "Show me your most complex project",
                            "React projects",
                            "Full-stack work",
                            "Tell me about Taskify",
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
                        <Button
                          onClick={handleSend}
                          size="icon"
                          className="shrink-0 h-9 w-9"
                        >
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
