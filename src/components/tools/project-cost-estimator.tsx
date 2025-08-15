"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Slider } from "@/components/ui/slider";
import { motion, AnimatePresence } from "framer-motion";
import { 
  Calculator, 
  Clock, 
  DollarSign, 
  Users, 
  Zap, 
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  Download
} from "lucide-react";
import { toast } from "sonner";

interface ProjectData {
  projectName: string;
  projectType: string;
  complexity: number;
  features: string[];
  timeline: number;
  teamSize: number;
  description: string;
}

const projectTypes = [
  { id: "landing", name: "Landing Page", basePrice: 1500, multiplier: 1 },
  { id: "website", name: "Business Website", basePrice: 3000, multiplier: 1.2 },
  { id: "ecommerce", name: "E-commerce", basePrice: 5000, multiplier: 1.5 },
  { id: "webapp", name: "Web Application", basePrice: 8000, multiplier: 2 },
  { id: "mobile", name: "Mobile App", basePrice: 12000, multiplier: 2.5 },
  { id: "custom", name: "Custom Solution", basePrice: 15000, multiplier: 3 },
];

const features = [
  { id: "responsive", name: "Responsive Design", price: 500 },
  { id: "cms", name: "Content Management", price: 1000 },
  { id: "auth", name: "User Authentication", price: 800 },
  { id: "payment", name: "Payment Integration", price: 1200 },
  { id: "api", name: "API Integration", price: 1000 },
  { id: "analytics", name: "Analytics Dashboard", price: 1500 },
  { id: "seo", name: "SEO Optimization", price: 600 },
  { id: "multilang", name: "Multi-language", price: 800 },
  { id: "realtime", name: "Real-time Features", price: 2000 },
  { id: "admin", name: "Admin Panel", price: 1800 },
];

export function ProjectCostEstimator() {
  const [currentStep, setCurrentStep] = useState(1);
  const [projectData, setProjectData] = useState<ProjectData>({
    projectName: "",
    projectType: "",
    complexity: [5],
    features: [],
    timeline: [8],
    teamSize: [2],
    description: "",
  });

  const totalSteps = 4;

  const calculateCost = () => {
    const selectedType = projectTypes.find(type => type.id === projectData.projectType);
    if (!selectedType) return 0;

    let baseCost = selectedType.basePrice;
    
    // Complexity multiplier (1-10 scale, 0.5x to 2x multiplier)
    const complexityMultiplier = 0.5 + (projectData.complexity[0] / 10) * 1.5;
    baseCost *= complexityMultiplier;

    // Features cost
    const featuresCost = projectData.features.reduce((total, featureId) => {
      const feature = features.find(f => f.id === featureId);
      return total + (feature?.price || 0);
    }, 0);

    // Timeline adjustment (rush jobs cost more)
    const timelineMultiplier = projectData.timeline[0] < 4 ? 1.5 : 
                              projectData.timeline[0] < 8 ? 1.2 : 1;

    // Team size multiplier
    const teamMultiplier = 1 + (projectData.teamSize[0] - 1) * 0.3;

    const totalCost = (baseCost + featuresCost) * timelineMultiplier * teamMultiplier;
    return Math.round(totalCost);
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const toggleFeature = (featureId: string) => {
    setProjectData(prev => ({
      ...prev,
      features: prev.features.includes(featureId)
        ? prev.features.filter(id => id !== featureId)
        : [...prev.features, featureId]
    }));
  };

  const generateQuote = () => {
    const cost = calculateCost();
    const quote = {
      projectName: projectData.projectName,
      projectType: projectTypes.find(t => t.id === projectData.projectType)?.name,
      estimatedCost: cost,
      timeline: projectData.timeline[0],
      features: projectData.features.map(id => features.find(f => f.id === id)?.name).filter(Boolean),
      date: new Date().toLocaleDateString(),
    };

    const quoteText = `
Project Quote
=============
Project: ${quote.projectName}
Type: ${quote.projectType}
Estimated Cost: $${quote.estimatedCost.toLocaleString()}
Timeline: ${quote.timeline} weeks
Features: ${quote.features.join(', ')}
Date: ${quote.date}
    `;

    const blob = new Blob([quoteText], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `${projectData.projectName.replace(/\s+/g, '_')}_quote.txt`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);

    toast.success("Quote generated and downloaded!");
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl font-semibold mb-4">Project Basics</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="projectName">Project Name</Label>
                  <Input
                    id="projectName"
                    placeholder="Enter your project name"
                    value={projectData.projectName}
                    onChange={(e) => setProjectData(prev => ({ ...prev, projectName: e.target.value }))}
                  />
                </div>
                
                <div>
                  <Label>Project Type</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                    {projectTypes.map((type) => (
                      <motion.div key={type.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Card 
                          className={`cursor-pointer transition-all ${
                            projectData.projectType === type.id 
                              ? 'ring-2 ring-primary bg-primary/5' 
                              : 'hover:shadow-md'
                          }`}
                          onClick={() => setProjectData(prev => ({ ...prev, projectType: type.id }))}
                        >
                          <CardContent className="p-4 text-center">
                            <div className="font-medium text-sm">{type.name}</div>
                            <div className="text-xs text-muted-foreground mt-1">
                              From ${type.basePrice.toLocaleString()}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>

                <div>
                  <Label htmlFor="description">Project Description</Label>
                  <Textarea
                    id="description"
                    placeholder="Describe your project requirements..."
                    value={projectData.description}
                    onChange={(e) => setProjectData(prev => ({ ...prev, description: e.target.value }))}
                  />
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 2:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl font-semibold mb-4">Project Complexity</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Complexity Level</Label>
                    <Badge variant="secondary">{projectData.complexity[0]}/10</Badge>
                  </div>
                  <Slider
                    value={projectData.complexity}
                    onValueChange={(value) => setProjectData(prev => ({ ...prev, complexity: value }))}
                    max={10}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Simple</span>
                    <span>Complex</span>
                  </div>
                </div>

                <div>
                  <Label>Required Features</Label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mt-2">
                    {features.map((feature) => (
                      <motion.div key={feature.id} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Card 
                          className={`cursor-pointer transition-all ${
                            projectData.features.includes(feature.id)
                              ? 'ring-2 ring-primary bg-primary/5' 
                              : 'hover:shadow-md'
                          }`}
                          onClick={() => toggleFeature(feature.id)}
                        >
                          <CardContent className="p-3">
                            <div className="flex items-center justify-between">
                              <div>
                                <div className="font-medium text-sm">{feature.name}</div>
                                <div className="text-xs text-muted-foreground">
                                  +${feature.price}
                                </div>
                              </div>
                              {projectData.features.includes(feature.id) && (
                                <CheckCircle className="h-4 w-4 text-primary" />
                              )}
                            </div>
                          </CardContent>
                        </Card>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 3:
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl font-semibold mb-4">Timeline & Team</h3>
              <div className="space-y-6">
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Timeline (weeks)</Label>
                    <Badge variant="secondary">{projectData.timeline[0]} weeks</Badge>
                  </div>
                  <Slider
                    value={projectData.timeline}
                    onValueChange={(value) => setProjectData(prev => ({ ...prev, timeline: value }))}
                    max={24}
                    min={2}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Rush (2 weeks)</span>
                    <span>Extended (24 weeks)</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <Label>Team Size</Label>
                    <Badge variant="secondary">{projectData.teamSize[0]} developers</Badge>
                  </div>
                  <Slider
                    value={projectData.teamSize}
                    onValueChange={(value) => setProjectData(prev => ({ ...prev, teamSize: value }))}
                    max={8}
                    min={1}
                    step={1}
                    className="w-full"
                  />
                  <div className="flex justify-between text-xs text-muted-foreground mt-1">
                    <span>Solo</span>
                    <span>Large Team</span>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );

      case 4:
        const cost = calculateCost();
        return (
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="space-y-6"
          >
            <div>
              <h3 className="text-xl font-semibold mb-4">Project Estimate</h3>
              
              <Card className="bg-gradient-to-br from-primary/5 to-secondary/5">
                <CardContent className="p-6">
                  <div className="text-center mb-6">
                    <div className="text-4xl font-bold text-primary mb-2">
                      ${cost.toLocaleString()}
                    </div>
                    <div className="text-muted-foreground">Estimated Project Cost</div>
                  </div>

                  <div className="grid md:grid-cols-3 gap-4 mb-6">
                    <div className="text-center">
                      <Clock className="h-8 w-8 mx-auto mb-2 text-blue-500" />
                      <div className="font-semibold">{projectData.timeline[0]} weeks</div>
                      <div className="text-sm text-muted-foreground">Timeline</div>
                    </div>
                    <div className="text-center">
                      <Users className="h-8 w-8 mx-auto mb-2 text-green-500" />
                      <div className="font-semibold">{projectData.teamSize[0]} developers</div>
                      <div className="text-sm text-muted-foreground">Team Size</div>
                    </div>
                    <div className="text-center">
                      <Zap className="h-8 w-8 mx-auto mb-2 text-purple-500" />
                      <div className="font-semibold">{projectData.features.length} features</div>
                      <div className="text-sm text-muted-foreground">Features</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h4 className="font-semibold">Project Summary:</h4>
                    <div className="text-sm text-muted-foreground space-y-1">
                      <div>• Project: {projectData.projectName}</div>
                      <div>• Type: {projectTypes.find(t => t.id === projectData.projectType)?.name}</div>
                      <div>• Complexity: {projectData.complexity[0]}/10</div>
                      <div>• Features: {projectData.features.length} selected</div>
                    </div>
                  </div>

                  <Button onClick={generateQuote} className="w-full mt-6">
                    <Download className="mr-2 h-4 w-4" />
                    Download Quote
                  </Button>
                </CardContent>
              </Card>
            </div>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      {/* Progress */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <Calculator className="h-5 w-5 text-primary" />
          <span className="font-medium">Step {currentStep} of {totalSteps}</span>
        </div>
        <div className="flex items-center space-x-2">
          {Array.from({ length: totalSteps }).map((_, index) => (
            <div
              key={index}
              className={`w-3 h-3 rounded-full ${
                index + 1 <= currentStep ? 'bg-primary' : 'bg-gray-300'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Step Content */}
      <Card className="min-h-[400px]">
        <CardContent className="p-6">
          <AnimatePresence mode="wait">
            {renderStep()}
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex items-center justify-between">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Previous
        </Button>

        {currentStep < totalSteps ? (
          <Button
            onClick={nextStep}
            disabled={
              (currentStep === 1 && (!projectData.projectName || !projectData.projectType)) ||
              (currentStep === 2 && projectData.features.length === 0)
            }
          >
            Next
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        ) : (
          <Button onClick={() => setCurrentStep(1)}>
            Start New Estimate
          </Button>
        )}
      </div>

      {/* Live Cost Preview */}
      {currentStep > 1 && currentStep < 4 && (
        <Card className="bg-muted/50">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Current Estimate:</span>
              <div className="flex items-center space-x-2">
                <DollarSign className="h-4 w-4 text-green-600" />
                <span className="text-lg font-bold text-green-600">
                  ${calculateCost().toLocaleString()}
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

