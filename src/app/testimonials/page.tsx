"use client";

import { useState, useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { StaggeredText } from "@/components/ui/staggered-text";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion } from "framer-motion";
import { Star, Quote, Calendar, Building } from "lucide-react";

const testimonials = [
  {
    id: 1,
    quote:
      "Hypacode delivered an outstanding frontend for our platform. Their attention to detail and commitment to performance were exceptional. The final product exceeded our expectations and significantly improved our user engagement metrics.",
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
    quote:
      "Working with Hypacode was a breeze. They quickly understood our complex requirements and translated them into a beautiful, functional UI. Their communication throughout the project was excellent, and they delivered on time and within budget.",
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
    quote:
      "The animations and user experience Hypacode implemented were beyond our expectations. Our users love the new interface, and it has significantly improved engagement. The attention to micro-interactions and smooth transitions is remarkable.",
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
    quote:
      "Hypacode's code quality is top-notch. Clean, maintainable, and well-documented. They follow best practices and write code that's easy for our team to understand and extend. A valuable asset to any development team.",
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
    quote:
      "The React components Hypacode built for us are incredibly reusable and performant. They've saved us countless hours of development time and have become the foundation of our design system. Exceptional work!",
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
    quote:
      "Hypacode transformed our outdated website into a modern, responsive masterpiece. The performance improvements were dramatic - our page load times decreased by 60% and user satisfaction scores increased significantly.",
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

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1440 },
    items: 3,
    partialVisibilityGutter: 40,
  },
  desktop: {
    breakpoint: { max: 1440, min: 1024 },
    items: 3,
    partialVisibilityGutter: 30,
  },
  tablet: {
    breakpoint: { max: 1024, min: 768 },
    items: 2,
    partialVisibilityGutter: 20,
  },
  mobile: {
    breakpoint: { max: 768, min: 0 },
    items: 1,
    partialVisibilityGutter: 10,
  },
};

export default function TestimonialsPage() {
  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Star
        key={index}
        className={`w-4 h-4 ${
          index < rating
            ? "text-yellow-400 fill-current"
            : "text-muted-foreground"
        }`}
      />
    ));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-muted/10 to-background dark:from-muted/20 dark:to-background py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <StaggeredText
            text="Client Testimonials"
            className="text-4xl lg:text-6xl font-bold mb-6"
          />
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Don't just take my word for it. Here's what my clients have to say
            about working with me and the results we've achieved together.
          </p>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="grid grid-cols-1 md:grid-cols-4 gap-6 sm:gap-8 mb-16"
        >
          <div className="text-center p-6 bg-background dark:bg-muted/20 rounded-2xl shadow-lg">
            <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
              50+
            </div>
            <div className="text-muted-foreground">Happy Clients</div>
          </div>
          <div className="text-center p-6 bg-background dark:bg-muted/20 rounded-2xl shadow-lg">
            <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
              100+
            </div>
            <div className="text-muted-foreground">Projects Completed</div>
          </div>
          <div className="text-center p-6 bg-background dark:bg-muted/20 rounded-2xl shadow-lg">
            <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
              5.0
            </div>
            <div className="text-muted-foreground">Average Rating</div>
          </div>
          <div className="text-center p-6 bg-background dark:bg-muted/20 rounded-2xl shadow-lg">
            <div className="text-3xl sm:text-4xl font-bold text-primary mb-2">
              98%
            </div>
            <div className="text-muted-foreground">Client Satisfaction</div>
          </div>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="mb-16 max-w-7xl mx-auto">
          <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8">
            Client Reviews
          </h2>
          <Carousel
            responsive={responsive}
            ssr={true}
            infinite={true}
            autoPlay={true}
            autoPlaySpeed={4000}
            keyBoardControl={true}
            transitionDuration={500}
            containerClass="carousel-container !overflow-x-clip !overflow-y-visible"
            arrows={false}
            itemClass="px-2 sm:px-3"
            showDots={true}
            dotListClass="custom-dot-list-style translate-y-[30px]"
            partialVisible={false}
          >
            {testimonials.map((testimonial) => (
              <Card
                key={testimonial.id}
                className="h-full bg-background dark:bg-muted/20 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 border border-muted/10 hover:scale-105"
              >
                <CardContent className="flex flex-col h-full p-6">
                  {/* Quote Icon */}
                  <div className="mb-4">
                    <Quote className="w-6 h-6 text-primary opacity-50" />
                  </div>

                  {/* Rating */}
                  <div className="flex items-center mb-3">
                    {renderStars(testimonial.rating)}
                  </div>

                  {/* Quote */}
                  <blockquote className="text-muted-foreground mb-4 text-sm leading-relaxed flex-1">
                    "{testimonial.quote}"
                  </blockquote>

                  {/* Project Info */}
                  <div className="mb-4 p-2 bg-primary/5 dark:bg-primary/10 rounded-lg">
                    <div className="text-xs font-medium text-primary">
                      Project: {testimonial.projectName}
                    </div>
                  </div>

                  {/* Client Info */}
                  <div className="flex items-center justify-between mt-auto">
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={testimonial.avatar} />
                        <AvatarFallback className="bg-primary/10 text-primary">
                          {testimonial.clientName
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-semibold text-sm">
                          {testimonial.clientName}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {testimonial.clientTitle}
                        </div>
                        <div className="flex items-center text-xs text-muted-foreground mt-1">
                          <Building className="w-3 h-3 mr-1" />
                          {testimonial.clientCompany}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-center text-xs text-muted-foreground">
                        <Calendar className="w-3 h-3 mr-1" />
                        {new Date(testimonial.date).toLocaleDateString()}
                      </div>
                    </div>
                  </div>

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1 mt-4">
                    <Badge variant="outline" className="text-xs">
                      {testimonial.projectType}
                    </Badge>
                    <Badge variant="outline" className="text-xs">
                      {testimonial.testimonialType}
                    </Badge>
                  </div>
                </CardContent>
              </Card>
            ))}
          </Carousel>
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-30 p-12 bg-muted/50 rounded-3xl"
        >
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            Ready to Join These Happy Clients?
          </h2>
          <p className="text-xl mb-8 opacity-90 text-foreground">
            Let's work together to bring your vision to life with exceptional
            web development.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button className="px-8 py-4 bg-primary text-foreground font-semibold rounded-full hover:bg-primary/90 transition-all duration-300 transform hover:scale-105">
              Start Your Project
            </Button>
            <Button className="px-8 py-4 bg-secondary text-foreground font-semibold rounded-full hover:bg-secondary/90 transition-all duration-300 transform hover:scale-105">
              View Portfolio
            </Button>
          </div>
        </motion.div>
      </div>
      <style jsx global>{`
        .react-multi-carousel-list {
          position: relative;
        }
        .react-multi-carousel-item {
          transition: transform 0.3s ease;
        }
        .custom-dot-list-style {
          bottom: -30px;
        }
        .react-multi-carousel-dot button {
          background: var(--muted-foreground);
          border: none;
        }
        .react-multi-carousel-dot--active button {
          background: var(--primary);
        }
      `}</style>
    </div>
  );
}
