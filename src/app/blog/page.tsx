"use client";

import { useState, useMemo } from "react";
import { Section } from "@/components/ui/section";
import { AnimatedSection } from "@/components/ui/animated-section";
import { StaggeredText } from "@/components/ui/staggered-text";
import { FloatingCard } from "@/components/ui/floating-card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from "next/link";
import { Search, Calendar, Tag, Clock, ArrowRight, Filter, SortAsc, SortDesc } from "lucide-react";

interface BlogPost {
  id: string;
  title: string;
  description: string;
  content: string;
  date: string;
  tags: string[];
  category: string;
  readTime: number;
  slug: string;
  featured: boolean;
}

const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Optimizing Next.js Performance for Core Web Vitals",
    description: "A comprehensive guide to improving your Next.js application's Core Web Vitals, including image optimization, code splitting, and server-side rendering strategies.",
    content: "Learn advanced techniques for optimizing Next.js applications to achieve perfect Core Web Vitals scores...",
    date: "2025-01-15",
    tags: ["Next.js", "Performance", "SEO", "Web Vitals"],
    category: "Performance",
    readTime: 8,
    slug: "optimizing-nextjs-performance",
    featured: true,
  },
  {
    id: "2",
    title: "Mastering Tailwind CSS for Responsive Design",
    description: "Learn how to effectively use Tailwind CSS to build beautiful and responsive user interfaces with a utility-first approach.",
    content: "Discover the power of Tailwind CSS and how to create stunning responsive designs...",
    date: "2025-01-12",
    tags: ["Tailwind CSS", "CSS", "Responsive Design", "UI/UX"],
    category: "CSS",
    readTime: 6,
    slug: "mastering-tailwind-css",
    featured: false,
  },
  {
    id: "3",
    title: "Demystifying TypeScript: A Guide for JavaScript Developers",
    description: "An introductory guide to TypeScript for JavaScript developers, covering basic types, interfaces, and advanced features to write more robust code.",
    content: "TypeScript has become essential for modern web development. This guide will help you transition from JavaScript...",
    date: "2025-01-10",
    tags: ["TypeScript", "JavaScript", "Programming"],
    category: "Programming",
    readTime: 10,
    slug: "demystifying-typescript",
    featured: true,
  },
  {
    id: "4",
    title: "Building Interactive UIs with Framer Motion",
    description: "Explore the power of Framer Motion to create stunning and performant animations and gestures in your React applications.",
    content: "Animation brings life to user interfaces. Learn how to use Framer Motion effectively...",
    date: "2025-01-08",
    tags: ["Framer Motion", "React", "Animations", "UI/UX"],
    category: "React",
    readTime: 7,
    slug: "building-interactive-uis-with-framer-motion",
    featured: false,
  },
  {
    id: "5",
    title: "Advanced React Patterns: Compound Components",
    description: "Deep dive into compound components pattern in React, exploring how to build flexible and reusable component APIs.",
    content: "Compound components are a powerful pattern for building flexible React components...",
    date: "2025-01-05",
    tags: ["React", "Design Patterns", "Components", "Advanced"],
    category: "React",
    readTime: 12,
    slug: "advanced-react-patterns-compound-components",
    featured: true,
  },
  {
    id: "6",
    title: "State Management in Modern React Applications",
    description: "Compare different state management solutions for React applications, from useState to Zustand and Redux Toolkit.",
    content: "State management is crucial for complex React applications. Let's explore the options...",
    date: "2025-01-03",
    tags: ["React", "State Management", "Redux", "Zustand"],
    category: "React",
    readTime: 9,
    slug: "state-management-modern-react",
    featured: false,
  },
  {
    id: "7",
    title: "CSS Grid vs Flexbox: When to Use Which",
    description: "A practical guide to choosing between CSS Grid and Flexbox for different layout scenarios in modern web development.",
    content: "Understanding when to use CSS Grid vs Flexbox is essential for modern web developers...",
    date: "2025-01-01",
    tags: ["CSS", "Grid", "Flexbox", "Layout"],
    category: "CSS",
    readTime: 5,
    slug: "css-grid-vs-flexbox",
    featured: false,
  },
  {
    id: "8",
    title: "Building Accessible Web Applications",
    description: "Essential techniques and best practices for creating web applications that are accessible to all users.",
    content: "Accessibility should be a priority in every web project. Here's how to build inclusive applications...",
    date: "2024-12-28",
    tags: ["Accessibility", "A11y", "Web Standards", "UX"],
    category: "Accessibility",
    readTime: 11,
    slug: "building-accessible-web-applications",
    featured: true,
  },
];

const categories = ["All", "React", "Performance", "CSS", "Programming", "Accessibility"];
const sortOptions = [
  { value: "date-desc", label: "Newest First" },
  { value: "date-asc", label: "Oldest First" },
  { value: "title-asc", label: "Title A-Z" },
  { value: "title-desc", label: "Title Z-A" },
  { value: "read-time-asc", label: "Quick Reads" },
  { value: "read-time-desc", label: "Long Reads" },
];

export default function BlogPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("date-desc");
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 6;

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = blogPosts.filter((post) => {
      const matchesSearch = 
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
      
      const matchesCategory = selectedCategory === "All" || post.category === selectedCategory;
      
      return matchesSearch && matchesCategory;
    });

    // Sort posts
    filtered.sort((a, b) => {
      switch (sortBy) {
        case "date-desc":
          return new Date(b.date).getTime() - new Date(a.date).getTime();
        case "date-asc":
          return new Date(a.date).getTime() - new Date(b.date).getTime();
        case "title-asc":
          return a.title.localeCompare(b.title);
        case "title-desc":
          return b.title.localeCompare(a.title);
        case "read-time-asc":
          return a.readTime - b.readTime;
        case "read-time-desc":
          return b.readTime - a.readTime;
        default:
          return 0;
      }
    });

    return filtered;
  }, [searchQuery, selectedCategory, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedPosts.length / postsPerPage);
  const paginatedPosts = filteredAndSortedPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const featuredPosts = blogPosts.filter(post => post.featured).slice(0, 3);

  return (
    <div className="min-h-screen py-12 sm:py-16 lg:py-20">
      {/* Header */}
      <AnimatedSection>
        <Section className="text-center mb-12 sm:mb-16">
          <StaggeredText
            text="Hypacode Insights"
            className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6"
          />
          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
            Thoughts, tutorials, and deep dives into frontend development and beyond.
          </p>
        </Section>
      </AnimatedSection>

      {/* Featured Posts */}
      <AnimatedSection delay={0.1}>
        <Section className="mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">Featured Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {featuredPosts.map((post, index) => (
              <FloatingCard key={post.id} delay={index * 0.1}>
                <Link href={`/blog/${post.slug}`}>
                  <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 border-2 border-primary/20">
                    <CardHeader>
                      <div className="flex items-center justify-between mb-2">
                        <Badge variant="default" className="bg-primary/10 text-primary">
                          Featured
                        </Badge>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Clock className="h-3 w-3 mr-1" />
                          <span>{post.readTime} min</span>
                        </div>
                      </div>
                      <CardTitle className="text-lg sm:text-xl font-semibold mb-2 line-clamp-2">
                        {post.title}
                      </CardTitle>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-1" />
                        <span>{new Date(post.date).toLocaleDateString()}</span>
                      </div>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <p className="text-muted-foreground mb-4 line-clamp-3">{post.description}</p>
                      <div className="flex flex-wrap gap-1 mb-4">
                        {post.tags.slice(0, 3).map((tag) => (
                          <Badge key={tag} variant="outline" className="text-xs">
                            {tag}
                          </Badge>
                        ))}
                      </div>
                      <div className="flex items-center text-primary font-medium text-sm">
                        Read more <ArrowRight className="h-3 w-3 ml-1" />
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              </FloatingCard>
            ))}
          </div>
        </Section>
      </AnimatedSection>

      {/* Search and Filter */}
      <AnimatedSection delay={0.2}>
        <Section className="bg-muted/30 py-8 sm:py-12 mb-12 sm:mb-16">
          <div className="max-w-4xl mx-auto space-y-6">
            {/* Search */}
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="text"
                placeholder="Search articles by title, content, or tags..."
                value={searchQuery}
                onChange={(e) => {
                  setSearchQuery(e.target.value);
                  setCurrentPage(1);
                }}
                className="w-full pl-10 pr-4 py-3 text-base"
              />
            </div>
            
            {/* Filters and Sort */}
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
              {/* Category Filter */}
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Badge
                    key={category}
                    variant={selectedCategory === category ? "default" : "secondary"}
                    className="cursor-pointer hover:bg-primary/20 transition-colors px-3 py-1"
                    onClick={() => {
                      setSelectedCategory(category);
                      setCurrentPage(1);
                    }}
                  >
                    <Filter className="h-3 w-3 mr-1" />
                    {category}
                  </Badge>
                ))}
              </div>
              
              {/* Sort */}
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Sort by:</span>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Results count */}
            <div className="text-sm text-muted-foreground">
              Showing {paginatedPosts.length} of {filteredAndSortedPosts.length} articles
            </div>
          </div>
        </Section>
      </AnimatedSection>

      {/* Blog Posts Grid */}
      <AnimatedSection delay={0.4}>
        <Section className="mb-12">
          {paginatedPosts.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {paginatedPosts.map((post, index) => (
                <FloatingCard key={post.id} delay={index * 0.1}>
                  <Link href={`/blog/${post.slug}`}>
                    <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300">
                      <CardHeader>
                        <div className="flex items-center justify-between mb-2">
                          <Badge variant="outline" className="text-xs">
                            {post.category}
                          </Badge>
                          <div className="flex items-center text-sm text-muted-foreground">
                            <Clock className="h-3 w-3 mr-1" />
                            <span>{post.readTime} min</span>
                          </div>
                        </div>
                        <CardTitle className="text-lg sm:text-xl font-semibold mb-2 line-clamp-2">
                          {post.title}
                        </CardTitle>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-1" />
                          <span>{new Date(post.date).toLocaleDateString()}</span>
                        </div>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <p className="text-muted-foreground mb-4 line-clamp-3">{post.description}</p>
                        <div className="flex flex-wrap gap-1 mb-4">
                          {post.tags.slice(0, 3).map((tag) => (
                            <Badge key={tag} variant="outline" className="text-xs">
                              <Tag className="h-2 w-2 mr-1" />
                              {tag}
                            </Badge>
                          ))}
                          {post.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">
                              +{post.tags.length - 3}
                            </Badge>
                          )}
                        </div>
                        <div className="flex items-center text-primary font-medium text-sm">
                          Read more <ArrowRight className="h-3 w-3 ml-1" />
                        </div>
                      </CardContent>
                    </Card>
                  </Link>
                </FloatingCard>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">No articles found matching your criteria.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory("All");
                  setCurrentPage(1);
                }}
              >
                Clear filters
              </Button>
            </div>
          )}
        </Section>
      </AnimatedSection>

      {/* Pagination */}
      {totalPages > 1 && (
        <AnimatedSection delay={0.6}>
          <Section className="text-center">
            <div className="flex justify-center items-center gap-2 flex-wrap">
              <Button
                variant="outline"
                onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
              >
                Previous
              </Button>
              
              {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                <Button
                  key={page}
                  variant={currentPage === page ? "default" : "outline"}
                  onClick={() => setCurrentPage(page)}
                  className="w-10 h-10"
                >
                  {page}
                </Button>
              ))}
              
              <Button
                variant="outline"
                onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
              >
                Next
              </Button>
            </div>
            
            <p className="text-sm text-muted-foreground mt-4">
              Page {currentPage} of {totalPages}
            </p>
          </Section>
        </AnimatedSection>
      )}
    </div>
  );
}

