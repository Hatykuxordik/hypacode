"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { Progress } from "@/components/ui/progress";
import { Calculator, ArrowLeft, ArrowRight, CheckCircle } from "lucide-react";
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
  contactName: string;
  contactEmail: string;
  contactPhone: string;
  company: string;
}

const projectTypes = [
  { id: "landing", name: "Landing Page", price: "From $1,500", description: "Single page website with modern design" },
  { id: "business", name: "Business Website", price: "From $3,000", description: "Multi-page corporate website" },
  { id: "ecommerce", name: "E-commerce", price: "From $5,000", description: "Online store with payment integration" },
  { id: "webapp", name: "Web Application", price: "From $8,000", description: "Custom web application with database" },
  { id: "mobile", name: "Mobile App", price: "From $12,000", description: "Native or hybrid mobile application" },
  { id: "custom", name: "Custom Solution", price: "From $15,000", description: "Tailored solution for specific needs" },
];

const features = [
  { id: "responsive", name: "Responsive Design", price: 500 },
  { id: "cms", name: "Content Management System", price: 1500 },
  { id: "seo", name: "SEO Optimization", price: 800 },
  { id: "analytics", name: "Analytics Integration", price: 300 },
  { id: "social", name: "Social Media Integration", price: 400 },
  { id: "payment", name: "Payment Gateway", price: 1200 },
  { id: "api", name: "Third-party API Integration", price: 1000 },
  { id: "multilingual", name: "Multi-language Support", price: 1500 },
];

const complexityLevels = [
  { id: "simple", name: "Simple", multiplier: 1, description: "Basic functionality, standard design" },
  { id: "moderate", name: "Moderate", multiplier: 1.5, description: "Custom features, advanced design" },
  { id: "complex", name: "Complex", multiplier: 2, description: "Highly customized, advanced functionality" },
  { id: "enterprise", name: "Enterprise", multiplier: 3, description: "Large-scale, mission-critical application" },
];

const timelines = [
  { id: "rush", name: "Rush (1-2 weeks)", multiplier: 1.5, description: "Expedited delivery" },
  { id: "standard", name: "Standard (3-6 weeks)", multiplier: 1, description: "Normal timeline" },
  { id: "extended", name: "Extended (2-3 months)", multiplier: 0.9, description: "Flexible timeline" },
  { id: "longterm", name: "Long-term (3+ months)", multiplier: 0.8, description: "Phased development" },
];

export function ProjectCostEstimatorNew() {
  const [currentStep, setCurrentStep] = useState(1);
  const [projectData, setProjectData] = useState<ProjectData>({
    projectName: "",
    projectType: "",
    description: "",
    features: [],
    complexity: "",
    timeline: "",
    budget: "",
    contactName: "",
    contactEmail: "",
    contactPhone: "",
    company: "",
  });

  const totalSteps = 5;
  const progress = (currentStep / totalSteps) * 100;

  const calculateEstimate = () => {
    const baseType = projectTypes.find(t => t.id === projectData.projectType);
    if (!baseType) return 0;
    
    const basePrice = parseInt(baseType.price.replace(/[^0-9]/g, ""));
    const featuresPrice = projectData.features.reduce((total, featureId) => {
      const feature = features.find(f => f.id === featureId);
      return total + (feature?.price || 0);
    }, 0);
    
    const complexity = complexityLevels.find(c => c.id === projectData.complexity);
    const timeline = timelines.find(t => t.id === projectData.timeline);
    
    const complexityMultiplier = complexity?.multiplier || 1;
    const timelineMultiplier = timeline?.multiplier || 1;
    
    return Math.round((basePrice + featuresPrice) * complexityMultiplier * timelineMultiplier);
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

  const handleSubmit = () => {
    toast.success("Project estimate submitted! We'll get back to you soon.");
    // Reset form
    setCurrentStep(1);
    setProjectData({
      projectName: "",
      projectType: "",
      description: "",
      features: [],
      complexity: "",
      timeline: "",
      budget: "",
      contactName: "",
      contactEmail: "",
      contactPhone: "",
      company: "",
    });
  };

  const renderStep = () => {
    switch (currentStep) {
      case 1:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Project Basics</h3>
              <p className="text-muted-foreground">Tell us about your project</p>
            </div>
            
            <div className="space-y-4">
              <div>
                <Label htmlFor="projectName">Project Name</Label>
                <Input
                  id="projectName"
                  placeholder="Enter your project name"
                  value={projectData.projectName}
                  onChange={(e) => setProjectData({...projectData, projectName: e.target.value})}
                />
              </div>
              
              <div>
                <Label>Project Type</Label>
                <RadioGroup
                  value={projectData.projectType}
                  onValueChange={(value) => setProjectData({...projectData, projectType: value})}
                  className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-2"
                >
                  {projectTypes.map((type) => (
                    <div key={type.id} className="flex items-center space-x-2 border rounded-lg p-4">
                      <RadioGroupItem value={type.id} id={type.id} />
                      <div className="flex-1">
                        <Label htmlFor={type.id} className="font-medium">{type.name}</Label>
                        <p className="text-sm text-muted-foreground">{type.description}</p>
                        <p className="text-sm font-medium text-primary">{type.price}</p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </div>
              
              <div>
                <Label htmlFor="description">Project Description</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your project requirements..."
                  value={projectData.description}
                  onChange={(e) => setProjectData({...projectData, description: e.target.value})}
                />
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Features</h3>
              <p className="text-muted-foreground">Select the features you need</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {features.map((feature) => (
                <div key={feature.id} className="flex items-center space-x-3 border rounded-lg p-4">
                  <Checkbox
                    id={feature.id}
                    checked={projectData.features.includes(feature.id)}
                    onCheckedChange={(checked) => {
                      if (checked) {
                        setProjectData({
                          ...projectData,
                          features: [...projectData.features, feature.id]
                        });
                      } else {
                        setProjectData({
                          ...projectData,
                          features: projectData.features.filter(f => f !== feature.id)
                        });
                      }
                    }}
                  />
                  <div className="flex-1">
                    <Label htmlFor={feature.id} className="font-medium">{feature.name}</Label>
                    <p className="text-sm text-primary">+${feature.price}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Complexity</h3>
              <p className="text-muted-foreground">How complex is your project?</p>
            </div>
            
            <RadioGroup
              value={projectData.complexity}
              onValueChange={(value) => setProjectData({...projectData, complexity: value})}
              className="space-y-4"
            >
              {complexityLevels.map((level) => (
                <div key={level.id} className="flex items-center space-x-3 border rounded-lg p-4">
                  <RadioGroupItem value={level.id} id={level.id} />
                  <div className="flex-1">
                    <Label htmlFor={level.id} className="font-medium">{level.name}</Label>
                    <p className="text-sm text-muted-foreground">{level.description}</p>
                    <p className="text-sm text-primary">{level.multiplier}x multiplier</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Timeline</h3>
              <p className="text-muted-foreground">When do you need this completed?</p>
            </div>
            
            <RadioGroup
              value={projectData.timeline}
              onValueChange={(value) => setProjectData({...projectData, timeline: value})}
              className="space-y-4"
            >
              {timelines.map((timeline) => (
                <div key={timeline.id} className="flex items-center space-x-3 border rounded-lg p-4">
                  <RadioGroupItem value={timeline.id} id={timeline.id} />
                  <div className="flex-1">
                    <Label htmlFor={timeline.id} className="font-medium">{timeline.name}</Label>
                    <p className="text-sm text-muted-foreground">{timeline.description}</p>
                    <p className="text-sm text-primary">{timeline.multiplier}x multiplier</p>
                  </div>
                </div>
              ))}
            </RadioGroup>
          </div>
        );

      case 5:
        return (
          <div className="space-y-6">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold mb-2">Contact Info</h3>
              <p className="text-muted-foreground">How can we reach you?</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="contactName">Full Name</Label>
                <Input
                  id="contactName"
                  placeholder="Your full name"
                  value={projectData.contactName}
                  onChange={(e) => setProjectData({...projectData, contactName: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  placeholder="Your company name"
                  value={projectData.company}
                  onChange={(e) => setProjectData({...projectData, company: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="contactEmail">Email</Label>
                <Input
                  id="contactEmail"
                  type="email"
                  placeholder="your@email.com"
                  value={projectData.contactEmail}
                  onChange={(e) => setProjectData({...projectData, contactEmail: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="contactPhone">Phone</Label>
                <Input
                  id="contactPhone"
                  placeholder="Your phone number"
                  value={projectData.contactPhone}
                  onChange={(e) => setProjectData({...projectData, contactPhone: e.target.value})}
                />
              </div>
            </div>
            
            <div className="bg-primary/10 rounded-lg p-6 text-center">
              <h4 className="text-xl font-bold mb-2">Estimated Project Cost</h4>
              <p className="text-3xl font-bold text-primary">${calculateEstimate().toLocaleString()}</p>
              <p className="text-sm text-muted-foreground mt-2">
                This is a rough estimate. Final pricing may vary based on detailed requirements.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <div className="flex items-center justify-center mb-4">
          <Calculator className="h-8 w-8 text-primary mr-2" />
          <h2 className="text-3xl font-bold">Project Cost Estimator</h2>
        </div>
        <p className="text-muted-foreground">
          Get an instant estimate for your project. Perfect for planning your budget!
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium">Step {currentStep} of {totalSteps}</span>
          <span className="text-sm text-muted-foreground">{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
        
        <div className="flex justify-between mt-4">
          {[1, 2, 3, 4, 5].map((step) => (
            <div key={step} className="flex flex-col items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                step <= currentStep 
                  ? "bg-primary text-primary-foreground" 
                  : "bg-muted text-muted-foreground"
              }`}>
                {step < currentStep ? <CheckCircle className="h-4 w-4" /> : step}
              </div>
              <span className="text-xs mt-1 text-center">
                {step === 1 && "Project Type"}
                {step === 2 && "Features"}
                {step === 3 && "Complexity"}
                {step === 4 && "Timeline"}
                {step === 5 && "Contact Info"}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <Card>
        <CardContent className="p-6 md:p-8">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentStep}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              {renderStep()}
            </motion.div>
          </AnimatePresence>
        </CardContent>
      </Card>

      {/* Navigation */}
      <div className="flex justify-between mt-8">
        <Button
          variant="outline"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="flex items-center"
        >
          <ArrowLeft className="h-4 w-4 mr-2" />
          Previous
        </Button>
        
        {currentStep === totalSteps ? (
          <Button onClick={handleSubmit} className="flex items-center">
            Submit Estimate
            <CheckCircle className="h-4 w-4 ml-2" />
          </Button>
        ) : (
          <Button onClick={nextStep} className="flex items-center">
            Next
            <ArrowRight className="h-4 w-4 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
}

