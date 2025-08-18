
'use client';

import React from 'react';
import { Calendar, MapPin, ExternalLink } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

const Experience = () => {
  const experiences = [
    {
      title: 'Frontend Developer',
      company: 'Freelance / Personal Projects',
      location: 'Remote',
      period: 'June 2023 – Present',
      type: 'Freelance',
      description: 'Developing responsive UIs from Figma designs, ensuring cross-browser compatibility and WCAG accessibility.',
      achievements: [
        'Built and deployed landing pages, product dashboards, and blogs using Tailwind CSS, TypeScript, and Firebase',
        'Integrated APIs (payment gateways, authentication, Google Maps) for production-ready features',
        'Refactored legacy code, optimized components, and implemented lazy loading and code-splitting',
        'Improved load times by 45% through performance optimization techniques',
        'Maintained client communication, adjusting project scope and gathering feedback',
        'Collaborated with backend teams to ensure seamless design-to-code implementation'
      ],
      technologies: ['React.js', 'Next.js', 'TypeScript', 'Tailwind CSS', 'Firebase', 'API Integration'],
      current: true
    },
    {
      title: 'Web Developer',
      company: 'Self-Employed',
      location: 'Ile-Ife, Nigeria',
      period: 'July 2024 – December 2024',
      type: 'Contract',
      description: 'Worked on multiple landing pages and marketing websites for small businesses.',
      achievements: [
        'Developed 3+ landing pages and marketing websites using HTML5, CSS3, JavaScript, and Tailwind',
        'Translated Figma designs into responsive, cross-browser compatible pages',
        'Optimized layout rendering and reduced CSS payloads, improving load performance by 30% on mobile',
        'Integrated forms with Formspree and added smooth animations with GSAP',
        'Participated in code reviews and learned version control workflows using Git and GitHub'
      ],
      technologies: ['HTML5', 'CSS3', 'JavaScript', 'Tailwind CSS', 'GSAP', 'Formspree', 'Git'],
      current: false
    },
    {
      title: 'Frontend Engineer (React + Firebase)',
      company: 'Independent Project Work',
      location: 'Remote',
      period: 'November 2023 – March 2024',
      type: 'Project',
      description: 'Designed and developed a comprehensive KYC onboarding system and dashboard interface.',
      achievements: [
        'Designed a modular KYC onboarding system with file uploads, inline validations, and dynamic state-driven form logic',
        'Created a dashboard interface supporting real-time updates, transaction filtering, and contextual sorting',
        'Integrated APIs for user authentication and real-time updates, ensuring data consistency',
        'Implemented seamless user experience with React and Firebase integration',
        'Built responsive design ensuring compatibility across all devices'
      ],
      technologies: ['React.js', 'Firebase', 'Redux', 'TypeScript', 'Tailwind CSS', 'API Integration'],
      current: false
    }
  ];

  const projects = [
    {
      title: 'KYC Onboarding System',
      description: 'A comprehensive Know Your Customer (KYC) onboarding system with multi-step forms, file uploads, and real-time validation.',
      technologies: ['React.js', 'Redux', 'Firebase', 'TypeScript', 'Tailwind CSS'],
      features: [
        'Multi-step form with progress tracking',
        'File upload with drag-and-drop functionality',
        'Real-time form validation',
        'Document verification system',
        'Responsive design for all devices'
      ],
      status: 'Completed'
    },
    {
      title: 'Financial Dashboard',
      description: 'A real-time financial dashboard with transaction management, filtering, and data visualization.',
      technologies: ['React.js', 'Supabase', 'Recharts', 'TypeScript', 'Tailwind CSS'],
      features: [
        'Real-time transaction updates',
        'Advanced filtering and sorting',
        'Interactive data visualizations',
        'Export functionality',
        'Mobile-responsive design'
      ],
      status: 'Completed'
    },
    {
      title: 'E-commerce Landing Pages',
      description: 'Multiple high-converting landing pages for e-commerce businesses with modern design and animations.',
      technologies: ['Next.js', 'GSAP', 'Tailwind CSS', 'Framer Motion'],
      features: [
        'Smooth scroll animations',
        'Product showcase sections',
        'Contact forms integration',
        'SEO optimization',
        'Performance optimization'
      ],
      status: 'Ongoing'
    }
  ];

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <section className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            My <span className="gradient-text">Experience</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            A journey through my professional experience, showcasing the projects I&apos;ve worked on 
            and the impact I&apos;ve made in frontend development.
          </p>
        </section>

        {/* Professional Experience */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Professional Experience</h2>
          <div className="space-y-8">
            {experiences.map((exp, index) => (
              <Card key={index} className="experience-card hover-lift">
                <CardHeader>
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                    <div>
                      <CardTitle className="text-xl gradient-text">{exp.title}</CardTitle>
                      <p className="text-lg font-semibold text-foreground">{exp.company}</p>
                    </div>
                    <div className="flex flex-col md:items-end gap-2">
                      <div className="flex items-center text-muted-foreground text-sm">
                        <Calendar className="h-4 w-4 mr-2" />
                        {exp.period}
                      </div>
                      <div className="flex items-center text-muted-foreground text-sm">
                        <MapPin className="h-4 w-4 mr-2" />
                        {exp.location}
                      </div>
                      {exp.current && (
                        <span className="px-2 py-1 bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200 text-xs rounded-full">
                          Current
                        </span>
                      )}
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <p className="text-muted-foreground leading-relaxed">{exp.description}</p>
                  
                  <div>
                    <h4 className="font-semibold mb-3">Key Achievements:</h4>
                    <ul className="space-y-2">
                      {exp.achievements.map((achievement, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></span>
                          <span className="text-muted-foreground text-sm">{achievement}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold mb-3">Technologies Used:</h4>
                    <div className="flex flex-wrap gap-2">
                      {exp.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured Projects */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold mb-12 text-center">Featured Projects</h2>
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Card key={index} className="hover-lift">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <CardTitle className="text-lg">{project.title}</CardTitle>
                    <span className={`px-2 py-1 text-xs rounded-full ${
                      project.status === 'Completed' 
                        ? 'bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200'
                        : 'bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200'
                    }`}>
                      {project.status}
                    </span>
                  </div>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {project.description}
                  </p>
                  
                  <div>
                    <h4 className="font-semibold text-sm mb-2">Key Features:</h4>
                    <ul className="space-y-1">
                      {project.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start">
                          <span className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 mr-2 flex-shrink-0"></span>
                          <span className="text-muted-foreground text-xs">{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="font-semibold text-sm mb-2">Technologies:</h4>
                    <div className="flex flex-wrap gap-1">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <section className="text-center">
          <Card className="bg-gradient-to-r from-primary/5 to-secondary/5 border-primary/20">
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">Let&apos;s Work Together</h3>
              <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
                I&apos;m always excited to take on new challenges and collaborate on innovative projects. 
                Let&apos;s discuss how I can help bring your ideas to life.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" asChild>
                  <a href="/contact">Get In Touch</a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href="/resume.pdf" download>
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Download Resume
                  </a>
                </Button>
              </div>
            </CardContent>
          </Card>
        </section>
      </div>
    </div>
  );
};

export default Experience;


