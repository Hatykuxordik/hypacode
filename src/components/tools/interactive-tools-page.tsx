"use client";

import { useState } from "react";
import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { ColorPaletteGenerator } from "@/components/tools/color-palette-generator";
import { ResponsiveDesignTester } from "@/components/tools/responsive-design-tester";
import { DragDropBuilder } from "@/components/tools/drag-drop-builder";
import { CollaborationWhiteboard } from "@/components/tools/collaboration-whiteboard";
import { ProjectCostEstimatorNew } from "@/components/tools/project-cost-estimator-new";
import { Palette, Smartphone, Layout, Users, Calculator, Eye, Code, Zap } from "lucide-react";
import { motion } from "framer-motion";

const tools = [
  {
    id: "color-palette",
    name: "Color Palette Generator",
    description: "Generate beautiful color palettes for your projects",
    icon: Palette,
    color: "from-pink-500 to-rose-500",
    component: ColorPaletteGenerator,
  },
  {
    id: "responsive-tester",
    name: "Responsive Design Tester", 
    description: "Test how websites look on different devices",
    icon: Smartphone,
    color: "from-blue-500 to-cyan-500",
    component: ResponsiveDesignTester,
  },
  {
    id: "drag-drop",
    name: "Drag & Drop Builder",
    description: "Build layouts with drag and drop components", 
    icon: Layout,
    color: "from-indigo-500 to-purple-500",
    component: DragDropBuilder,
  },
  {
    id: "whiteboard",
    name: "Real-Time Collaboration Whiteboard",
    description: "Multi-user drawing with live collaboration features",
    icon: Users,
    color: "from-orange-500 to-yellow-500",
    component: CollaborationWhiteboard,
  },
  {
    id: "cost-estimator",
    name: "Project Cost Estimator",
    description: "Calculate project costs and timelines instantly",
    icon: Calculator,
    color: "from-green-500 to-emerald-500",
    component: ProjectCostEstimatorNew,
  },
];

export function InteractiveToolsPage() {
  const [activeTool, setActiveTool] = useState("color-palette");
  const ActiveComponent = tools.find(tool => tool.id === activeTool)?.component || ColorPaletteGenerator;

  return (
    <div className="min-h-screen py-20">
      {/* Header */}
      <Section className="text-center mb-16">
        <h1 className="text-4xl md:text-5xl font-bold mb-6">
          Interactive <span className="text-primary">Tools</span>
        </h1>
        <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
          Explore these interactive web tools that showcase modern frontend development capabilities
        </p>
      </Section>

      {/* Tools Grid */}
      <Section className="mb-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {tools.slice(0, 4).map((tool, index) => {
            const Icon = tool.icon;
            const isActive = activeTool === tool.id;
            
            return (
              <motion.div
                key={tool.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <Card 
                  className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                    isActive 
                      ? `ring-2 ring-primary shadow-lg bg-gradient-to-br ${tool.color} text-white` 
                      : "hover:shadow-md"
                  }`}
                  onClick={() => setActiveTool(tool.id)}
                >
                  <CardContent className="p-6">
                    <div className="flex items-start space-x-4">
                      <div className={`p-3 rounded-lg ${
                        isActive 
                          ? "bg-white/20" 
                          : "bg-primary/10"
                      }`}>
                        <Icon className={`h-6 w-6 ${
                          isActive ? "text-white" : "text-primary"
                        }`} />
                      </div>
                      <div className="flex-1">
                        <h3 className={`font-semibold mb-2 ${
                          isActive ? "text-white" : "text-foreground"
                        }`}>
                          {tool.name}
                        </h3>
                        <p className={`text-sm ${
                          isActive ? "text-white/80" : "text-muted-foreground"
                        }`}>
                          {tool.description}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        {/* Project Cost Estimator - Full Width */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="flex justify-center"
        >
          <Card 
            className={`cursor-pointer transition-all duration-300 hover:shadow-lg max-w-md ${
              activeTool === "cost-estimator"
                ? `ring-2 ring-primary shadow-lg bg-gradient-to-br ${tools[4].color} text-white`
                : "hover:shadow-md"
            }`}
            onClick={() => setActiveTool("cost-estimator")}
          >
            <CardContent className="p-6">
              <div className="flex items-start space-x-4">
                <div className={`p-3 rounded-lg ${
                  activeTool === "cost-estimator"
                    ? "bg-white/20" 
                    : "bg-primary/10"
                }`}>
                  <Calculator className={`h-6 w-6 ${
                    activeTool === "cost-estimator" ? "text-white" : "text-primary"
                  }`} />
                </div>
                <div className="flex-1">
                  <h3 className={`font-semibold mb-2 ${
                    activeTool === "cost-estimator" ? "text-white" : "text-foreground"
                  }`}>
                    {tools[4].name}
                  </h3>
                  <p className={`text-sm ${
                    activeTool === "cost-estimator" ? "text-white/80" : "text-muted-foreground"
                  }`}>
                    {tools[4].description}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </Section>

      {/* Active Tool Display */}
      <Section>
        <motion.div
          key={activeTool}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="bg-card rounded-lg border p-6 md:p-8"
        >
          <ActiveComponent />
        </motion.div>
      </Section>

      {/* Why These Tools Matter */}
      <Section className="bg-muted/50 mt-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Why These Tools Matter</h2>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          <Card className="text-center">
            <CardContent className="p-6">
              <div className="p-3 rounded-full bg-primary/10 w-fit mx-auto mb-4">
                <Eye className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Visual Design Skills</h3>
              <p className="text-muted-foreground">
                Demonstrates understanding of color theory, visual hierarchy, and design principles
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="p-3 rounded-full bg-primary/10 w-fit mx-auto mb-4">
                <Code className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">Technical Proficiency</h3>
              <p className="text-muted-foreground">
                Shows mastery of React, JavaScript, CSS, and modern web development techniques
              </p>
            </CardContent>
          </Card>

          <Card className="text-center">
            <CardContent className="p-6">
              <div className="p-3 rounded-full bg-primary/10 w-fit mx-auto mb-4">
                <Zap className="h-8 w-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-2">User Experience Focus</h3>
              <p className="text-muted-foreground">
                Emphasizes intuitive interactions, accessibility, and user-centered design thinking
              </p>
            </CardContent>
          </Card>
        </div>
      </Section>
    </div>
  );
}

