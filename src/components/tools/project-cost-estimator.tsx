"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Calculator,
  Clock,
  DollarSign,
  CheckCircle,
  ArrowRight,
  Users,
  Smartphone,
  Globe,
  Database,
  Mail,
  Download,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

interface ProjectData {
  projectName: string;
  projectType: string;
  description: string;
  features: string[];
  complexity: string;
  timeline: string;
  budget: string;
  maintenance: boolean;
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  company: string;
}

const projectTypes = [
  {
    id: "landing",
    name: "Landing Page",
    description: "Single page website with modern design",
    basePrice: 350,
    timeline: "1-2 weeks",
    icon: <Globe className="w-6 h-6" />,
  },
  {
    id: "business",
    name: "Business Website",
    description: "Multi-page corporate website",
    basePrice: 1500,
    timeline: "2-3 weeks",
    icon: <Users className="w-6 h-6" />,
  },
  {
    id: "ecommerce",
    name: "E-commerce",
    description: "Online store with payment integration",
    basePrice: 3000,
    timeline: "3-6 weeks",
    icon: <DollarSign className="w-6 h-6" />,
  },
  {
    id: "webapp",
    name: "Web Application",
    description: "Custom web application with database",
    basePrice: 4000,
    timeline: "6-10 weeks",
    icon: <Database className="w-6 h-6" />,
  },
  {
    id: "mobile",
    name: "Mobile App",
    description: "Native or hybrid mobile application",
    basePrice: 6000,
    timeline: "10-14 weeks",
    icon: <Smartphone className="w-6 h-6" />,
  },
  {
    id: "custom",
    name: "Custom Solution",
    description: "Tailored solution for specific needs",
    basePrice: 7000,
    timeline: "Varies",
    icon: <Calculator className="w-6 h-6" />,
  },
];

const features = [
  { id: "responsive", name: "Responsive Design", price: 150, included: true },
  { id: "cms", name: "Content Management System", price: 350 },
  { id: "seo", name: "SEO Optimization", price: 100 },
  { id: "analytics", name: "Analytics Integration", price: 80 },
  { id: "social", name: "Social Media Integration", price: 90 },
  { id: "payment", name: "Payment Gateway", price: 300 },
  { id: "api", name: "Third-party API Integration", price: 250 },
  { id: "multilingual", name: "Multi-language Support", price: 300 },
  { id: "auth", name: "User Authentication", price: 250 },
  { id: "chat", name: "Live Chat Support", price: 180 },
  { id: "admin", name: "Admin Panel", price: 1500 },
];

const complexityLevels = [
  {
    id: "simple",
    name: "Simple",
    multiplier: 1,
    description: "Basic functionality, standard design",
  },
  {
    id: "moderate",
    name: "Moderate",
    multiplier: 1.5,
    description: "Custom features, advanced design",
  },
  {
    id: "complex",
    name: "Complex",
    multiplier: 2,
    description: "Highly customized, advanced functionality",
  },
  {
    id: "enterprise",
    name: "Enterprise",
    multiplier: 3,
    description: "Large-scale, mission-critical application",
  },
];

const timelines = [
  {
    id: "rush",
    name: "Rush (3-14 days)",
    multiplier: 1.5,
    description: "Expedited delivery",
  },
  {
    id: "standard",
    name: "Standard (1-3 weeks)",
    multiplier: 1,
    description: "Normal timeline",
  },
  {
    id: "extended",
    name: "Extended (2-3 months)",
    multiplier: 0.9,
    description: "Flexible timeline",
  },
  {
    id: "longterm",
    name: "Long-term (3+ months)",
    multiplier: 0.8,
    description: "Phased development",
  },
];

export function ProjectCostEstimator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [projectData, setProjectData] = useState<ProjectData>({
    projectName: "",
    projectType: "",
    description: "",
    features: [],
    complexity: "",
    timeline: "",
    budget: "",
    maintenance: false,
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    company: "",
  });
  const [estimate, setEstimate] = useState(null);
  const [showResults, setShowResults] = useState(false);

  useEffect(() => {
    if (
      projectData.projectType &&
      projectData.complexity &&
      projectData.timeline
    ) {
      calculateEstimate();
    }
  }, [projectData]);

  const calculateEstimate = () => {
    const baseType = projectTypes.find((t) => t.id === projectData.projectType);
    if (!baseType) return;

    const basePrice = baseType.basePrice;
    const featuresPrice = projectData.features.reduce((total, featureId) => {
      const feature = features.find((f) => f.id === featureId);
      return total + (feature?.price || 0);
    }, 0);

    const complexity = complexityLevels.find(
      (c) => c.id === projectData.complexity
    );
    const timeline = timelines.find((t) => t.id === projectData.timeline);

    const complexityMultiplier = complexity?.multiplier || 1;
    const timelineMultiplier = timeline?.multiplier || 1;

    const subtotal =
      (basePrice + featuresPrice) * complexityMultiplier * timelineMultiplier;
    const maintenanceCost = projectData.maintenance ? subtotal * 0.15 : 0;
    const total = subtotal + maintenanceCost;

    const baseWeeks = parseInt(baseType.timeline.split("-")[0]) || 0;
    const adjustedWeeks = Math.ceil(
      (baseWeeks * complexityMultiplier) / timelineMultiplier
    );

    setEstimate({
      basePrice,
      featuresPrice,
      subtotal,
      maintenanceCost,
      total,
      timeline: adjustedWeeks,
      breakdown: {
        projectType: baseType.name,
        complexity: complexity?.name,
        timelineType: timeline?.name,
        features: projectData.features
          .map((id) => features.find((f) => f.id === id)?.name)
          .filter(Boolean),
      },
    });
  };

  const handleProjectTypeSelect = (typeId) => {
    setProjectData((prev) => ({ ...prev, projectType: typeId }));
    setCurrentStep(2);
  };

  const handleFeatureToggle = (featureId) => {
    setProjectData((prev) => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter((id) => id !== featureId)
        : [...prev.features, featureId],
    }));
  };

  const handleComplexitySelect = (value) => {
    setProjectData((prev) => ({ ...prev, complexity: value }));
  };

  const handleTimelineSelect = (value) => {
    setProjectData((prev) => ({ ...prev, timeline: value }));
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    calculateEstimate();
    setShowResults(true);
    toast.success("Project estimate generated!");

    // Optional: Simulate email sending (commented as per liked code)
    /*
    try {
      const response = await fetch('/api/send-estimate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ estimate, projectData })
      });
      if (response.ok) {
        toast.success('Estimate sent to your email!');
      }
    } catch (error) {
      toast.error('Failed to send estimate');
    }
    */
  };

  const generateQuote = () => {
    const quote = {
      ...projectData,
      estimate,
      generatedAt: new Date().toISOString(),
      quoteId: Math.random().toString(36).substr(2, 9).toUpperCase(),
    };

    const blob = new Blob([JSON.stringify(quote, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `project-quote-${quote.quoteId}.json`;
    a.click();
  };

  const steps = [
    { number: 1, title: "Project Type", completed: !!projectData.projectType },
    { number: 2, title: "Features", completed: currentStep > 2 },
    { number: 3, title: "Complexity", completed: !!projectData.complexity },
    { number: 4, title: "Timeline", completed: !!projectData.timeline },
    { number: 5, title: "Contact Info", completed: showResults },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-900 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 overflow-hidden"
    >
      {/* Header */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-500 p-6 text-white">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-xl font-bold mb-2">Project Cost Estimator</h3>
            <p className="text-green-100">
              Get an instant estimate for your project. Perfect for planning
              your budget!
            </p>
          </div>
          <Calculator className="w-12 h-12 text-white/80" />
        </div>
      </div>

      {/* Progress Steps */}
      <div className="px-6 py-4 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <div className="flex  items-center overflow-x-auto flex-nowrap justify-between">
          {steps.map((step, index) => (
            <div key={step.number} className="flex items-center">
              <div
                className={`
                w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium
                ${
                  step.completed
                    ? "bg-green-500 text-white"
                    : currentStep === step.number
                    ? "bg-blue-500 text-white"
                    : "bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-400"
                }
              `}
              >
                {step.completed ? (
                  <CheckCircle className="w-4 h-4" />
                ) : (
                  step.number
                )}
              </div>
              <span
                className={`ml-2 text-sm font-medium ${
                  step.completed || currentStep === step.number
                    ? "text-gray-900 dark:text-white"
                    : "text-gray-500 dark:text-gray-400"
                }`}
              >
                {step.title}
              </span>
              {index < steps.length - 1 && (
                <ArrowRight className="w-4 h-4 mx-4 text-gray-400" />
              )}
            </div>
          ))}
        </div>
      </div>

      <div className="p-6">
        <AnimatePresence mode="wait">
          {/* Step 1: Project Type */}
          {currentStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                What type of project do you need?
              </h4>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="projectName" className="mb-2">
                    Project Name
                  </Label>
                  <Input
                    id="projectName"
                    placeholder="Enter your project name"
                    value={projectData.projectName}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        projectName: e.target.value,
                      })
                    }
                  />
                </div>
                <div>
                  <Label htmlFor="description" className="mb-2">
                    Project Description
                  </Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your project requirements..."
                    value={projectData.description}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        description: e.target.value,
                      })
                    }
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {projectTypes.map((type) => (
                  <motion.button
                    key={type.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    onClick={() => handleProjectTypeSelect(type.id)}
                    className="p-4 border-2 border-gray-200 dark:border-gray-700 rounded-lg hover:border-blue-500 dark:hover:border-blue-400 transition-colors text-left"
                  >
                    <div className="flex items-center space-x-3 mb-3">
                      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg text-blue-600 dark:text-blue-400">
                        {type.icon}
                      </div>
                      <div>
                        <h5 className="font-semibold text-gray-900 dark:text-white">
                          {type.name}
                        </h5>
                        <p className="text-sm text-gray-600 dark:text-gray-400">
                          {type.timeline}
                        </p>
                      </div>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">
                      {type.description}
                    </p>
                    <p className="text-lg font-bold text-green-600 dark:text-green-400">
                      Starting at ${type.basePrice.toLocaleString()}
                    </p>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 2: Features */}
          {currentStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Select additional features
                </h4>
                <Button
                  onClick={() => setCurrentStep(3)}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Continue
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {features.map((feature) => (
                  <motion.div
                    key={feature.id}
                    whileHover={{ scale: 1.01 }}
                    className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer transition-colors ${
                      feature.included
                        ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                        : projectData.features.includes(feature.id)
                        ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                    onClick={() =>
                      !feature.included && handleFeatureToggle(feature.id)
                    }
                  >
                    <Checkbox
                      id={feature.id}
                      checked={
                        feature.included ||
                        projectData.features.includes(feature.id)
                      }
                      onCheckedChange={() =>
                        !feature.included && handleFeatureToggle(feature.id)
                      }
                      disabled={feature.included}
                    />
                    <div className="flex-1">
                      <Label htmlFor={feature.id} className="font-medium">
                        {feature.name}
                      </Label>
                      <p className="text-sm text-primary">
                        {feature.included
                          ? "Included"
                          : `+$${feature.price.toLocaleString()}`}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Step 3: Complexity */}
          {currentStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  What's the complexity level?
                </h4>
                <Button
                  onClick={() => setCurrentStep(4)}
                  disabled={!projectData.complexity}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </Button>
              </div>
              <RadioGroup
                value={projectData.complexity}
                onValueChange={handleComplexitySelect}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                {complexityLevels.map((level) => (
                  <motion.div
                    key={level.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer transition-colors ${
                      projectData.complexity === level.id
                        ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                    onClick={() => handleComplexitySelect(level.id)}
                  >
                    <RadioGroupItem value={level.id} id={level.id} />
                    <div className="flex-1">
                      <Label htmlFor={level.id} className="font-medium">
                        {level.name}
                      </Label>
                      <p className="text-sm text-muted-foreground">
                        {level.description}
                      </p>
                      <p className="text-sm text-primary">
                        {level.multiplier}x multiplier
                      </p>
                    </div>
                  </motion.div>
                ))}
              </RadioGroup>
            </motion.div>
          )}

          {/* Step 4: Timeline */}
          {currentStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <div className="flex items-center justify-between">
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  What's your preferred timeline?
                </h4>
                <Button
                  onClick={() => setCurrentStep(5)}
                  disabled={!projectData.timeline}
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Continue
                </Button>
              </div>
              <RadioGroup
                value={projectData.timeline}
                onValueChange={handleTimelineSelect}
                className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              >
                {timelines.map((timelineOpt) => (
                  <motion.div
                    key={timelineOpt.id}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`flex items-center space-x-3 border rounded-lg p-4 cursor-pointer transition-colors ${
                      projectData.timeline === timelineOpt.id
                        ? "border-orange-500 bg-orange-50 dark:bg-orange-900/20"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                    onClick={() => handleTimelineSelect(timelineOpt.id)}
                  >
                    <RadioGroupItem
                      value={timelineOpt.id}
                      id={timelineOpt.id}
                    />
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <Clock className="w-5 h-5 text-orange-500" />
                        <Label htmlFor={timelineOpt.id} className="font-medium">
                          {timelineOpt.name}
                        </Label>
                      </div>
                      <p className="text-sm text-muted-foreground">
                        {timelineOpt.description}
                      </p>
                      <p className="text-sm text-primary">
                        {timelineOpt.multiplier}x multiplier
                      </p>
                    </div>
                  </motion.div>
                ))}
              </RadioGroup>

              <div className="mt-6">
                <Label className="flex items-center space-x-3">
                  <Checkbox
                    checked={projectData.maintenance}
                    onCheckedChange={(checked) =>
                      setProjectData((prev) => ({
                        ...prev,
                        maintenance: !!checked,
                      }))
                    }
                  />
                  <span className="text-muted-foreground">
                    Include 6-month maintenance package (+15%)
                  </span>
                </Label>
              </div>
            </motion.div>
          )}

          {/* Step 5: Contact Info & Results */}
          {currentStep === 5 && !showResults && (
            <motion.div
              key="step5"
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-6"
            >
              <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                Contact Information
              </h4>
              <form
                onSubmit={handleSubmit}
                className="grid grid-cols-1 sm:grid-cols-2 gap-4"
              >
                <div>
                  <Label htmlFor="contactName">Full Name *</Label>
                  <Input
                    id="contactName"
                    placeholder="Your full name"
                    value={projectData.contactName}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        contactName: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="company">Company (Optional)</Label>
                  <Input
                    id="company"
                    placeholder="Your company name"
                    value={projectData.company}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        company: e.target.value,
                      })
                    }
                  />
                </div>

                <div>
                  <Label htmlFor="contactEmail">Email *</Label>
                  <Input
                    id="contactEmail"
                    type="email"
                    placeholder="your@email.com"
                    value={projectData.contactEmail}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        contactEmail: e.target.value,
                      })
                    }
                    required
                  />
                </div>

                <div>
                  <Label htmlFor="contactPhone">Phone (Optional)</Label>
                  <Input
                    id="contactPhone"
                    placeholder="Your phone number"
                    value={projectData.contactPhone}
                    onChange={(e) =>
                      setProjectData({
                        ...projectData,
                        contactPhone: e.target.value,
                      })
                    }
                  />
                </div>
                <div className="md:col-span-2">
                  <Button
                    type="submit"
                    className="w-full flex items-center justify-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                  >
                    <Calculator className="w-5 h-5" />
                    <span>Get My Estimate</span>
                  </Button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Results */}
          {showResults && estimate && (
            <motion.div
              key="results"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-6"
            >
              <div className="text-center">
                <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                  Your Project Estimate
                </h4>
                <p className="text-gray-600 dark:text-gray-400">
                  Based on your requirements, here's your custom quote
                </p>
              </div>

              <Card className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/20 dark:to-emerald-900/20">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <p className="text-3xl font-bold text-green-600 dark:text-green-400">
                      ${estimate.total.toLocaleString()}
                    </p>
                    <p className="text-gray-600 dark:text-gray-400">
                      Estimated delivery: {estimate.timeline} weeks
                    </p>
                  </div>

                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Base Price ({estimate.breakdown.projectType})
                      </span>
                      <span className="font-medium">
                        ${estimate.basePrice.toLocaleString()}
                      </span>
                    </div>
                    {estimate.featuresPrice > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          Additional Features
                        </span>
                        <span className="font-medium">
                          ${estimate.featuresPrice.toLocaleString()}
                        </span>
                      </div>
                    )}
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Complexity ({estimate.breakdown.complexity})
                      </span>
                      <span className="font-medium">Applied</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">
                        Timeline ({estimate.breakdown.timelineType})
                      </span>
                      <span className="font-medium">Applied</span>
                    </div>
                    {estimate.maintenanceCost > 0 && (
                      <div className="flex justify-between">
                        <span className="text-gray-600 dark:text-gray-400">
                          6-Month Maintenance
                        </span>
                        <span className="font-medium">
                          ${estimate.maintenanceCost.toLocaleString()}
                        </span>
                      </div>
                    )}
                    <hr className="border-gray-300 dark:border-gray-600" />
                    <div className="flex justify-between text-lg font-bold">
                      <span>Total</span>
                      <span className="text-green-600 dark:text-green-400">
                        ${estimate.total.toLocaleString()}
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
                <Button
                  onClick={generateQuote}
                  className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  <Download className="w-5 h-5" />
                  <span>Download Quote</span>
                </Button>
                <Button
                  onClick={() =>
                    (window.location.href = `mailto:hatykuxordik@gmail.com?subject=Project Quote - ${
                      estimate.breakdown.projectType
                    }&body=Hi, I'm interested in discussing the ${
                      estimate.breakdown.projectType
                    } project estimated at $${estimate.total.toLocaleString()}.`)
                  }
                  className="flex-1 flex items-center justify-center space-x-2 px-6 py-3 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors"
                >
                  <Mail className="w-5 h-5" />
                  <span>Contact Me</span>
                </Button>
              </div>

              <div className="text-center">
                <Button
                  variant="link"
                  onClick={() => {
                    setCurrentStep(1);
                    setProjectData({
                      projectName: "",
                      projectType: "",
                      description: "",
                      features: [],
                      complexity: "",
                      timeline: "",
                      budget: "",
                      maintenance: false,
                      contactName: "",
                      contactEmail: "",
                      contactPhone: "",
                      company: "",
                    });
                    setShowResults(false);
                    setEstimate(null);
                  }}
                  className="text-blue-500 hover:text-blue-600 transition-colors"
                >
                  Start New Estimate
                </Button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
