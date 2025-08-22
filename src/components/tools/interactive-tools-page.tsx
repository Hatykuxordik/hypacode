"use client";

import { useState } from "react";
import { Section } from "@/components/ui/section";
import { Card, CardContent } from "@/components/ui/card";
import { ColorPaletteGenerator } from "@/components/tools/color-palette-generator";
import { ResponsiveDesignTester } from "@/components/tools/responsive-design-tester";
import { DragDropBuilder } from "@/components/tools/drag-drop-builder";
import { CollaborationWhiteboard } from "@/components/tools/collaboration-whiteboard";
import { ProjectCostEstimator } from "./project-cost-estimator";
import {
  Palette,
  Smartphone,
  Layout,
  Users,
  Calculator,
  Eye,
  Code,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const tools = [
  {
    id: "color-palette",
    name: "Color Palette Generator",
    description: "Generate beautiful color palettes for your projects",
    icon: <Palette className="w-6 h-6" />,
    color: "from-pink-500 to-rose-500",
    component: ColorPaletteGenerator,
  },
  {
    id: "responsive-tester",
    name: "Responsive Design Tester",
    description: "Test how websites look on different devices",
    icon: <Smartphone className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-500",
    component: ResponsiveDesignTester,
  },
  {
    id: "drag-drop",
    name: "Drag & Drop Builder",
    description: "Build layouts with drag and drop components",
    icon: <Layout className="w-6 h-6" />,
    color: "from-indigo-500 to-purple-500",
    component: DragDropBuilder,
  },
  {
    id: "whiteboard",
    name: "Real-Time Collaboration Whiteboard",
    description: "Multi-user drawing with live collaboration features",
    icon: <Users className="w-6 h-6" />,
    color: "from-orange-500 to-yellow-500",
    component: CollaborationWhiteboard,
  },
  {
    id: "cost-estimator",
    name: "Project Cost Estimator",
    description: "Calculate project costs and timelines instantly",
    icon: <Calculator className="w-6 h-6" />,
    color: "from-green-500 to-emerald-500",
    component: ProjectCostEstimator,
  },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
      ease: "easeOut",
    },
  },
};

export function InteractiveToolsPage() {
  const [activeTool, setActiveTool] = useState("color-palette");

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8"
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div variants={itemVariants} className="text-center mb-16">
          <h1 className="text-4xl lg:text-6xl font-bold text-gray-900 dark:text-white mb-6">
            Interactive <span className="text-primary">Tools</span>
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Explore these interactive web tools that showcase modern frontend
            development capabilities
          </p>
        </motion.div>

        {/* Tool Tabs */}
        <motion.div variants={itemVariants} className="mb-12">
          <div className="flex flex-wrap justify-center gap-4">
            {tools.map((tool) => (
              <motion.button
                key={tool.id}
                onClick={() => setActiveTool(tool.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center space-x-3 px-6 py-4 rounded-2xl font-semibold transition-all duration-300 ${
                  activeTool === tool.id
                    ? `bg-gradient-to-r ${tool.color} text-white shadow-lg`
                    : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-gray-700 hover:shadow-lg"
                }`}
              >
                {tool.icon}
                <div className="text-left">
                  <div className="font-bold">{tool.name}</div>
                  <div className="text-sm opacity-80">{tool.description}</div>
                </div>
              </motion.button>
            ))}
          </div>
        </motion.div>

        {/* Tool Content */}
        <motion.div
          variants={itemVariants}
          className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl p-8 border border-gray-200 dark:border-gray-700"
        >
          <AnimatePresence mode="wait">
            {activeTool === "color-palette" && (
              <motion.div
                key="color-palette"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ColorPaletteGenerator />
              </motion.div>
            )}
            {activeTool === "responsive-tester" && (
              <motion.div
                key="responsive-tester"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ResponsiveDesignTester />
              </motion.div>
            )}
            {activeTool === "drag-drop" && (
              <motion.div
                key="drag-drop"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <DragDropBuilder />
              </motion.div>
            )}
            {activeTool === "whiteboard" && (
              <motion.div
                key="whiteboard"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <CollaborationWhiteboard />
              </motion.div>
            )}
            {activeTool === "cost-estimator" && (
              <motion.div
                key="cost-estimator"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <ProjectCostEstimator />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Why These Tools Matter */}
        <motion.section variants={itemVariants} className="mt-20">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900 dark:text-white">
            Why These Tools Matter
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-pink-500 to-rose-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Eye className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Visual Design Skills
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Demonstrates understanding of color theory, visual hierarchy,
                and design principles
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                Technical Proficiency
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Shows mastery of React, JavaScript, CSS, and modern web
                development techniques
              </p>
            </motion.div>

            <motion.div
              variants={itemVariants}
              whileHover={{ y: -5 }}
              className="text-center p-6 bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700"
            >
              <div className="w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900 dark:text-white">
                User Experience Focus
              </h3>
              <p className="text-gray-600 dark:text-gray-300">
                Emphasizes intuitive interactions, accessibility, and
                user-centered design thinking
              </p>
            </motion.div>
          </div>
        </motion.section>
      </div>
    </motion.div>
  );
}
