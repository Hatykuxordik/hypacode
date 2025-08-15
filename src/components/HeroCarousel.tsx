'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Code, Palette, Zap } from 'lucide-react';
import Image from 'next/image';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    {
      id: 1,
      title: "Frontend Developer",
      subtitle: "Building Modern Web Experiences",
      description: "Crafting responsive, user-friendly applications with React, Next.js, and modern technologies",
      image: "/images/slide1.jpg",
      icon: <Code className="w-12 h-12" />,
    },
    {
      id: 2,
      title: "UI/UX Enthusiast",
      subtitle: "Designing Beautiful Interfaces",
      description: "Creating intuitive designs that blend aesthetics with functionality for exceptional user experiences",
      image: "/images/slide2.jpg",
      icon: <Palette className="w-12 h-12" />,
    },
    {
      id: 3,
      title: "Performance Optimizer",
      subtitle: "Lightning-Fast Applications",
      description: "Optimizing web applications for speed, accessibility, and seamless performance across all devices",
      image: "/images/slide3.jpg",
      icon: <Zap className="w-12 h-12" />,
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [slides.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  return (
    <div className="relative h-[600px] overflow-hidden rounded-2xl bg-gradient-to-br from-gray-800 to-gray-900">
      {/* Background Image Container */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-800/50 to-gray-900/50">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] as const }}
            className="absolute inset-0 flex items-center justify-center"
          >
            <Image
              src={slides[currentSlide].image}
              alt={`${slides[currentSlide].title} - Sodiq Atiku Frontend Developer Portfolio`}
              fill
              className="object-contain filter brightness-75"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              priority={currentSlide === 0}
            />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black/50" />

      {/* Content */}
      <div className="relative z-10 flex items-center justify-between h-full px-8 lg:px-16">
        {/* Left Content */}
        <div className="flex-1 text-white">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -30 }}
              transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] as const }}
              className="space-y-6"
            >
              {/* Icon */}
              <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, duration: 0.4, type: "spring", stiffness: 200 }}
                className="inline-block p-4 bg-white/20 backdrop-blur-sm rounded-2xl"
              >
                {slides[currentSlide].icon}
              </motion.div>

              {/* Title */}
              <motion.h2
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="text-4xl lg:text-6xl font-bold leading-tight"
              >
                {slides[currentSlide].title}
              </motion.h2>

              {/* Subtitle */}
              <motion.h3
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-xl lg:text-2xl font-medium text-white/90"
              >
                {slides[currentSlide].subtitle}
              </motion.h3>

              {/* Description */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-lg text-white/80 max-w-2xl leading-relaxed"
              >
                {slides[currentSlide].description}
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
                className="flex flex-wrap gap-4 pt-4"
              >
                <button className="px-8 py-3 bg-white text-gray-900 font-semibold rounded-full hover:bg-white/90 transition-all duration-300 transform hover:scale-105">
                  View My Work
                </button>
                <button className="px-8 py-3 border-2 border-white text-white font-semibold rounded-full hover:bg-white hover:text-gray-900 transition-all duration-300 transform hover:scale-105">
                  Get In Touch
                </button>
              </motion.div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Decorative Element */}
        <div className="hidden lg:block flex-1 relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentSlide}
              initial={{ opacity: 0, scale: 0.9, x: 50 }}
              animate={{ opacity: 1, scale: 1, x: 0 }}
              exit={{ opacity: 0, scale: 0.9, x: -50 }}
              transition={{ duration: 0.7, ease: [0.25, 0.1, 0.25, 1] as const }}
              className="absolute right-0 top-1/2 transform -translate-y-1/2"
            >
              <div className="w-80 h-80 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center">
                <div className="w-60 h-60 bg-white/20 rounded-full flex items-center justify-center">
                  <div className="text-8xl text-white/30">
                    {slides[currentSlide].icon}
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 group"
      >
        <ChevronLeft className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>

      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 p-3 bg-white/20 backdrop-blur-sm rounded-full text-white hover:bg-white/30 transition-all duration-300 group"
      >
        <ChevronRight className="w-6 h-6 group-hover:scale-110 transition-transform" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 z-20 flex space-x-3">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-1 bg-white/20">
        <motion.div
          key={`progress-${currentSlide}`}
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 5, ease: "linear" }}
          className="h-full bg-gradient-to-r from-white to-white/80"
        />
      </div>
    </div>
  );
};

export default HeroCarousel;

