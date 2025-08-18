"use client";

import { useState, useEffect, useRef } from "react";
import { Section } from "@/components/ui/section";
import { AnimatedSection } from "@/components/ui/animated-section";
import { StaggeredText } from "@/components/ui/staggered-text";
import { FloatingCard } from "@/components/ui/floating-card";
import { TestimonialCard } from "@/components/ui/testimonial-card";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Star, Quote, Play, Pause, Calendar, Building } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote: "Hypacode delivered an outstanding frontend for our platform. Their attention to detail and commitment to performance were exceptional. The final product exceeded our expectations and significantly improved our user engagement metrics.",
    clientName: "Jane Doe",
    clientTitle: "CEO",
    clientCompany: "StartupX",
    projectName: "E-commerce Platform",
    rating: 5,
    date: "2024-12-15",
    avatar: "/assets/avatar-jane.jpg",
    projectType: "E-commerce",
    testimonialType: "Performance",
  },
  {
    id: 2,
    quote: "Working with Hypacode was a breeze. They quickly understood our complex requirements and translated them into a beautiful, functional UI. Their communication throughout the project was excellent, and they delivered on time and within budget.",
    clientName: "John Smith",
    clientTitle: "CTO",
    clientCompany: "Enterprise Solutions",
    projectName: "Dashboard Redesign",
    rating: 5,
    date: "2024-11-20",
    avatar: "/assets/avatar-john.jpg",
    projectType: "Dashboard",
    testimonialType: "Communication",
  },
  {
    id: 3,
    quote: "The animations and user experience Hypacode implemented were beyond our expectations. Our users love the new interface, and it has significantly improved engagement. The attention to micro-interactions and smooth transitions is remarkable.",
    clientName: "Emily White",
    clientTitle: "Product Manager",
    clientCompany: "Innovate Corp",
    projectName: "Mobile App UI",
    rating: 5,
    date: "2024-10-10",
    avatar: "/assets/avatar-emily.jpg",
    projectType: "Mobile App",
    testimonialType: "UX Design",
  },
  {
    id: 4,
    quote: "Hypacode's code quality is top-notch. Clean, maintainable, and well-documented. They follow best practices and write code that's easy for our team to understand and extend. A valuable asset to any development team.",
    clientName: "Michael Brown",
    clientTitle: "Lead Developer",
    clientCompany: "WebGenius",
    projectName: "Component Library",
    rating: 5,
    date: "2024-09-05",
    avatar: "/assets/avatar-michael.jpg",
    projectType: "Component Library",
    testimonialType: "Code Quality",
  },
  {
    id: 5,
    quote: "The React components Hypacode built for us are incredibly reusable and performant. They've saved us countless hours of development time and have become the foundation of our design system. Exceptional work!",
    clientName: "Sarah Johnson",
    clientTitle: "Design System Lead",
    clientCompany: "TechFlow",
    projectName: "Design System",
    rating: 5,
    date: "2024-08-18",
    avatar: "/assets/avatar-sarah.jpg",
    projectType: "Design System",
    testimonialType: "Reusability",
  },
  {
    id: 6,
    quote: "Hypacode transformed our outdated website into a modern, responsive masterpiece. The performance improvements were dramatic - our page load times decreased by 60% and user satisfaction scores increased significantly.",
    clientName: "David Wilson",
    clientTitle: "Marketing Director",
    clientCompany: "GrowthCorp",
    projectName: "Website Redesign",
    rating: 5,
    date: "2024-07-22",
    avatar: "/assets/avatar-david.jpg",
    projectType: "Website",
    testimonialType: "Performance",
  },
];

export default function TestimonialsPage() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlaying, setIsAutoPlaying] = useState(true);
  const [itemsPerView, setItemsPerView] = useState(1);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Responsive items per view
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth >= 1024) {
        setItemsPerView(3);
      } else if (window.innerWidth >= 768) {
        setItemsPerView(2);
      } else {
        setItemsPerView(1);
      }
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  // Auto-play functionality
  useEffect(() => {
    if (isAutoPlaying) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prev) => {
          const maxIndex = Math.max(0, testimonials.length - itemsPerView);
          return prev >= maxIndex ? 0 : prev + 1;
        });
      }, 4000);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isAutoPlaying, itemsPerView]);

  const nextSlide = () => {
    const maxIndex = Math.max(0, testimonials.length - itemsPerView);
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    const maxIndex = Math.max(0, testimonials.length - itemsPerView);
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const toggleAutoPlay = () => {
    setIsAutoPlaying(!isAutoPlaying);
  };

  const maxIndex = Math.max(0, testimonials.length - itemsPerView);

  return (
    <div className="min-h-screen py-12 sm:py-16 lg:py-20">
      {/* Header */}
      <AnimatedSection>
        <Section className="text-center mb-12 sm:mb-16">
          <StaggeredText
            text="What Clients Say"
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6"
          />
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Hear directly from those I've had the pleasure of working with.
          </p>
        </Section>
      </AnimatedSection>

      {/* Featured Testimonial */}
      <AnimatedSection delay={0.1}>
        <Section className="mb-12 sm:mb-16">
          <div className="max-w-4xl mx-auto">
            <Card className="border-2 border-primary/20 bg-gradient-to-br from-primary/5 to-primary/10">
              <CardContent className="p-6 sm:p-8 lg:p-12 text-center">
                <Quote className="h-12 w-12 text-primary mx-auto mb-6" />
                <blockquote className="text-xl sm:text-2xl lg:text-3xl font-medium mb-6 leading-relaxed">
                  "{testimonials[0].quote}"
                </blockquote>
                <div className="flex items-center justify-center gap-4">
                  <Avatar className="h-12 w-12">
                    <AvatarFallback className="bg-primary text-primary-foreground">
                      {testimonials[0].clientName.split(' ').map(n => n[0]).join('')}
                    </AvatarFallback>
                  </Avatar>
                  <div className="text-left">
                    <p className="font-semibold text-lg">{testimonials[0].clientName}</p>
                    <p className="text-muted-foreground">{testimonials[0].clientTitle} at {testimonials[0].clientCompany}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </Section>
      </AnimatedSection>

      {/* Testimonials Carousel */}
      <AnimatedSection delay={0.2}>
        <Section className="bg-muted/30 py-12 sm:py-16">
          <div className="max-w-7xl mx-auto">
            {/* Carousel Controls */}
            <div className="flex items-center justify-between mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold">Client Reviews</h2>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="icon"
                  onClick={toggleAutoPlay}
                  className="h-10 w-10"
                >
                  {isAutoPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={prevSlide}
                  disabled={currentIndex === 0}
                  className="h-10 w-10"
                >
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  onClick={nextSlide}
                  disabled={currentIndex >= maxIndex}
                  className="h-10 w-10"
                >
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* Carousel Container */}
            <div className="relative overflow-hidden">
              <motion.div
                className="flex gap-6"
                animate={{
                  x: `${-currentIndex * (100 / itemsPerView)}%`,
                }}
                transition={{
                  type: "spring",
                  stiffness: 300,
                  damping: 30,
                }}
                style={{
                  width: `${(testimonials.length / itemsPerView) * 100}%`,
                }}
              >
                {testimonials.map((testimonial, index) => (
                  <motion.div
                    key={testimonial.id}
                    className="flex-shrink-0"
                    style={{ width: `${100 / testimonials.length}%` }}
                    whileHover={{ y: -5 }}
                    transition={{ duration: 0.2 }}
                  >
                    <Card className="h-full">
                      <CardContent className="p-6">
                        {/* Rating */}
                        <div className="flex items-center gap-1 mb-4">
                          {Array.from({ length: testimonial.rating }).map((_, i) => (
                            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>

                        {/* Quote */}
                        <blockquote className="text-muted-foreground mb-6 line-clamp-4">
                          "{testimonial.quote}"
                        </blockquote>

                        {/* Client Info */}
                        <div className="space-y-4">
                          <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                              <AvatarFallback className="bg-primary/10 text-primary">
                                {testimonial.clientName.split(' ').map(n => n[0]).join('')}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <p className="font-semibold">{testimonial.clientName}</p>
                              <p className="text-sm text-muted-foreground">
                                {testimonial.clientTitle}
                              </p>
                            </div>
                          </div>

                          {/* Project Info */}
                          <div className="space-y-2">
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Building className="h-3 w-3" />
                              <span>{testimonial.clientCompany}</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                              <Calendar className="h-3 w-3" />
                              <span>{new Date(testimonial.date).toLocaleDateString()}</span>
                            </div>
                          </div>

                          {/* Tags */}
                          <div className="flex flex-wrap gap-1">
                            <Badge variant="outline" className="text-xs">
                              {testimonial.projectType}
                            </Badge>
                            <Badge variant="outline" className="text-xs">
                              {testimonial.testimonialType}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </motion.div>
                ))}
              </motion.div>
            </div>

            {/* Pagination Dots */}
            <div className="flex justify-center gap-2 mt-8">
              {Array.from({ length: maxIndex + 1 }).map((_, index) => (
                <button
                  key={index}
                  onClick={() => goToSlide(index)}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    index === currentIndex
                      ? "bg-primary scale-125"
                      : "bg-muted-foreground/30 hover:bg-muted-foreground/50"
                  }`}
                />
              ))}
            </div>
          </div>
        </Section>
      </AnimatedSection>

      {/* Stats Section */}
      <AnimatedSection delay={0.4}>
        <Section className="py-12 sm:py-16">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8">
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">50+</div>
              <div className="text-muted-foreground">Happy Clients</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">100+</div>
              <div className="text-muted-foreground">Projects Completed</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">5.0</div>
              <div className="text-muted-foreground">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">98%</div>
              <div className="text-muted-foreground">Client Satisfaction</div>
            </div>
          </div>
        </Section>
      </AnimatedSection>
    </div>
  );
}

