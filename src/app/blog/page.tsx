"use client";

import { useState, useMemo, useEffect } from "react";
import { Section } from "@/components/ui/section";
import { AnimatedSection } from "@/components/ui/animated-section";
import { StaggeredText } from "@/components/ui/staggered-text";
import { FloatingCard } from "@/components/ui/floating-card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Link from "next/link";
import {
  Search,
  Calendar,
  Tag,
  Clock,
  ArrowRight,
  Filter,
  SortAsc,
  SortDesc,
  ExternalLink,
  RefreshCw,
  Loader2,
} from "lucide-react";

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
  url?: string;
  source?: string;
  isExternal?: boolean;
}

// Static blog posts (original content)
const staticBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Optimizing Next.js Performance for Core Web Vitals",
    description:
      "A comprehensive guide to improving your Next.js application's Core Web Vitals, including image optimization, code splitting, and server-side rendering strategies.",
    content:
      "Learn advanced techniques for optimizing Next.js applications to achieve perfect Core Web Vitals scores...",
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
    description:
      "Learn how to effectively use Tailwind CSS to build beautiful and responsive user interfaces with a utility-first approach.",
    content:
      "Discover the power of Tailwind CSS and how to create stunning responsive designs...",
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
    description:
      "An introductory guide to TypeScript for JavaScript developers, covering basic types, interfaces, and advanced features to write more robust code.",
    content:
      "TypeScript has become essential for modern web development. This guide will help you transition from JavaScript...",
    date: "2025-01-10",
    tags: ["TypeScript", "JavaScript", "Programming"],
    category: "Programming",
    readTime: 10,
    slug: "demystifying-typescript",
    featured: true,
  },
];

const categories = [
  "All",
  "React",
  "Performance",
  "CSS",
  "Programming",
  "Accessibility",
  "Frontend News",
  "Browser Features",
  "Tools",
];

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
  const [apiPosts, setApiPosts] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const postsPerPage = 6;

  // Fetch articles from multiple APIs
  const fetchArticles = async () => {
    setLoading(true);
    setError(null);
    
    try {
      const articles: BlogPost[] = [];
      
      // Fetch from DEV.to API (free, no key required)
      try {
        const devResponse = await fetch(
          'https://dev.to/api/articles?tag=frontend&tag=javascript&tag=react&tag=css&per_page=20&top=7'
        );
        
        if (devResponse.ok) {
          const devArticles = await devResponse.json();
          
          devArticles.forEach((article: any, index: number) => {
            articles.push({
              id: `dev-${article.id}`,
              title: article.title,
              description: article.description || article.title,
              content: article.body_markdown || article.description || "",
              date: article.published_at.split('T')[0],
              tags: article.tag_list || [],
              category: "Frontend News",
              readTime: article.reading_time_minutes || 5,
              slug: `dev-${article.slug}`,
              featured: index < 3,
              url: article.url,
              source: "DEV.to",
              isExternal: true,
            });
          });
        }
      } catch (devError) {
        console.warn('DEV.to API error:', devError);
      }

      // Fetch from Hacker News API for tech articles
      try {
        const hnResponse = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
        if (hnResponse.ok) {
          const storyIds = await hnResponse.json();
          
          // Get first 10 stories
          const storyPromises = storyIds.slice(0, 10).map(async (id: number) => {
            const storyResponse = await fetch(`https://hacker-news.firebaseio.com/v0/item/${id}.json`);
            return storyResponse.json();
          });
          
          const stories = await Promise.all(storyPromises);
          
          stories.forEach((story: any, index: number) => {
            if (story && story.title && (
              story.title.toLowerCase().includes('frontend') ||
              story.title.toLowerCase().includes('javascript') ||
              story.title.toLowerCase().includes('react') ||
              story.title.toLowerCase().includes('css') ||
              story.title.toLowerCase().includes('web') ||
              story.title.toLowerCase().includes('browser')
            )) {
              articles.push({
                id: `hn-${story.id}`,
                title: story.title,
                description: story.title,
                content: story.text || story.title,
                date: new Date(story.time * 1000).toISOString().split('T')[0],
                tags: ["Tech News", "Frontend"],
                category: "Frontend News",
                readTime: 3,
                slug: `hn-${story.id}`,
                featured: false,
                url: story.url || `https://news.ycombinator.com/item?id=${story.id}`,
                source: "Hacker News",
                isExternal: true,
              });
            }
          });
        }
      } catch (hnError) {
        console.warn('Hacker News API error:', hnError);
      }

      // Fetch from GitHub trending repositories (frontend related)
      try {
        const githubResponse = await fetch(
          'https://api.github.com/search/repositories?q=frontend+javascript+react+vue+angular&sort=updated&order=desc&per_page=10'
        );
        
        if (githubResponse.ok) {
          const githubData = await githubResponse.json();
          
          githubData.items.forEach((repo: any, index: number) => {
            articles.push({
              id: `github-${repo.id}`,
              title: `${repo.name}: ${repo.description || 'Frontend Repository'}`,
              description: repo.description || `A trending frontend repository: ${repo.name}`,
              content: repo.description || "",
              date: repo.updated_at.split('T')[0],
              tags: ["GitHub", "Open Source", "Tools"],
              category: "Tools",
              readTime: 2,
              slug: `github-${repo.name}`,
              featured: false,
              url: repo.html_url,
              source: "GitHub",
              isExternal: true,
            });
          });
        }
      } catch (githubError) {
        console.warn('GitHub API error:', githubError);
      }

      setApiPosts(articles);
    } catch (err) {
      setError('Failed to fetch articles. Please try again later.');
      console.error('Error fetching articles:', err);
    } finally {
      setLoading(false);
    }
  };

  // Fetch articles on component mount
  useEffect(() => {
    fetchArticles();
  }, []);

  // Combine static and API posts
  const allPosts = useMemo(() => {
    return [...staticBlogPosts, ...apiPosts];
  }, [apiPosts]);

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = allPosts.filter((post) => {
      const matchesSearch =
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.tags.some((tag) =>
          tag.toLowerCase().includes(searchQuery.toLowerCase())
        );

      const matchesCategory =
        selectedCategory === "All" || post.category === selectedCategory;

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
  }, [allPosts, searchQuery, selectedCategory, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedPosts.length / postsPerPage);
  const paginatedPosts = filteredAndSortedPosts.slice(
    (currentPage - 1) * postsPerPage,
    currentPage * postsPerPage
  );

  const featuredPosts = allPosts.filter((post) => post.featured).slice(0, 3);

  return (
    <div className="min-h-screen py-12 sm:py-16 lg:py-20">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <AnimatedSection>
          <Section className="text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Hypacode <span className="text-primary">Insights</span>
            </h1>
            <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto px-4">
              Thoughts, tutorials, and the latest frontend development news from around the web.
            </p>
            
            {/* Refresh Button */}
            <div className="mt-6">
              <Button
                onClick={fetchArticles}
                disabled={loading}
                variant="outline"
                className="gap-2"
              >
                {loading ? (
                  <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                  <RefreshCw className="h-4 w-4" />
                )}
                {loading ? "Fetching Latest..." : "Refresh Articles"}
              </Button>
            </div>

            {error && (
              <div className="mt-4 p-4 bg-destructive/10 border border-destructive/20 rounded-lg">
                <p className="text-destructive text-sm">{error}</p>
              </div>
            )}
          </Section>
        </AnimatedSection>

        {/* Featured Posts */}
        <AnimatedSection delay={0.1}>
          <Section className="mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-6 sm:mb-8 text-center">
              Featured Articles
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {featuredPosts.map((post, index) => (
                <FloatingCard key={post.id} delay={index * 0.1}>
                  {post.isExternal ? (
                    <a href={post.url} target="_blank" rel="noopener noreferrer">
                      <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 border-2 border-primary/20">
                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
                            <Badge
                              variant="default"
                              className="bg-primary/10 text-primary"
                            >
                              Featured
                            </Badge>
                            <div className="flex items-center gap-2">
                              <div className="flex items-center text-sm text-muted-foreground">
                                <Clock className="h-3 w-3 mr-1" />
                                <span>{post.readTime} min</span>
                              </div>
                              <ExternalLink className="h-3 w-3 text-muted-foreground" />
                            </div>
                          </div>
                          <CardTitle className="text-lg sm:text-xl font-semibold mb-2 line-clamp-2">
                            {post.title}
                          </CardTitle>
                          <div className="flex items-center justify-between text-sm text-muted-foreground">
                            <div className="flex items-center">
                              <Calendar className="h-4 w-4 mr-1" />
                              <span>
                                {new Date(post.date).toLocaleDateString()}
                              </span>
                            </div>
                            {post.source && (
                              <Badge variant="outline" className="text-xs">
                                {post.source}
                              </Badge>
                            )}
                          </div>
                        </CardHeader>
                        <CardContent className="flex-1">
                          <p className="text-muted-foreground mb-4 line-clamp-3">
                            {post.description}
                          </p>
                          <div className="flex flex-wrap gap-1 mb-4">
                            {post.tags.slice(0, 3).map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="text-xs"
                              >
                                {tag}
                              </Badge>
                            ))}
                          </div>
                          <div className="flex items-center text-primary font-medium text-sm">
                            Read more <ArrowRight className="h-3 w-3 ml-1" />
                          </div>
                        </CardContent>
                      </Card>
                    </a>
                  ) : (
                    <Link href={`/blog/${post.slug}`}>
                      <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300 border-2 border-primary/20">
                        <CardHeader>
                          <div className="flex items-center justify-between mb-2">
                            <Badge
                              variant="default"
                              className="bg-primary/10 text-primary"
                            >
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
                            <span>
                              {new Date(post.date).toLocaleDateString()}
                            </span>
                          </div>
                        </CardHeader>
                        <CardContent className="flex-1">
                          <p className="text-muted-foreground mb-4 line-clamp-3">
                            {post.description}
                          </p>
                          <div className="flex flex-wrap gap-1 mb-4">
                            {post.tags.slice(0, 3).map((tag) => (
                              <Badge
                                key={tag}
                                variant="outline"
                                className="text-xs"
                              >
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
                  )}
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
                      variant={
                        selectedCategory === category ? "default" : "secondary"
                      }
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
                  <span className="text-sm text-muted-foreground">
                    Sort by:
                  </span>
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
                Showing {paginatedPosts.length} of{" "}
                {filteredAndSortedPosts.length} articles
                {apiPosts.length > 0 && (
                  <span className="ml-2">
                    ({apiPosts.length} from external sources)
                  </span>
                )}
              </div>
            </div>
          </Section>
        </AnimatedSection>

        {/* Blog Posts Grid */}
        <AnimatedSection delay={0.4}>
          <Section className="mb-12">
            {loading && (
              <div className="text-center py-12">
                <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
                <p className="text-muted-foreground">Loading latest articles...</p>
              </div>
            )}
            
            {paginatedPosts.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
                {paginatedPosts.map((post, index) => (
                  <FloatingCard key={post.id} delay={index * 0.1}>
                    {post.isExternal ? (
                      <a href={post.url} target="_blank" rel="noopener noreferrer">
                        <Card className="h-full flex flex-col hover:shadow-lg transition-all duration-300">
                          <CardHeader>
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant="outline" className="text-xs">
                                {post.category}
                              </Badge>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center text-sm text-muted-foreground">
                                  <Clock className="h-3 w-3 mr-1" />
                                  <span>{post.readTime} min</span>
                                </div>
                                <ExternalLink className="h-3 w-3 text-muted-foreground" />
                              </div>
                            </div>
                            <CardTitle className="text-lg sm:text-xl font-semibold mb-2 line-clamp-2">
                              {post.title}
                            </CardTitle>
                            <div className="flex items-center justify-between text-sm text-muted-foreground">
                              <div className="flex items-center">
                                <Calendar className="h-4 w-4 mr-1" />
                                <span>
                                  {new Date(post.date).toLocaleDateString()}
                                </span>
                              </div>
                              {post.source && (
                                <Badge variant="outline" className="text-xs">
                                  {post.source}
                                </Badge>
                              )}
                            </div>
                          </CardHeader>
                          <CardContent className="flex-1">
                            <p className="text-muted-foreground mb-4 line-clamp-3">
                              {post.description}
                            </p>
                            <div className="flex flex-wrap gap-1 mb-4">
                              {post.tags.slice(0, 3).map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  <Tag className="h-2 w-2 mr-1" />
                                  {tag}
                                </Badge>
                              ))}
                            </div>
                            <div className="flex items-center text-primary font-medium text-sm">
                              Read more <ArrowRight className="h-3 w-3 ml-1" />
                            </div>
                          </CardContent>
                        </Card>
                      </a>
                    ) : (
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
                              <span>
                                {new Date(post.date).toLocaleDateString()}
                              </span>
                            </div>
                          </CardHeader>
                          <CardContent className="flex-1">
                            <p className="text-muted-foreground mb-4 line-clamp-3">
                              {post.description}
                            </p>
                            <div className="flex flex-wrap gap-1 mb-4">
                              {post.tags.slice(0, 3).map((tag) => (
                                <Badge
                                  key={tag}
                                  variant="outline"
                                  className="text-xs"
                                >
                                  <Tag className="h-2 w-2 mr-1" />
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
                    )}
                  </FloatingCard>
                ))}
              </div>
            ) : !loading && (
              <div className="text-center py-12">
                <p className="text-muted-foreground text-lg">
                  No articles found matching your criteria.
                </p>
                <Button
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedCategory("All");
                    setCurrentPage(1);
                  }}
                  variant="outline"
                  className="mt-4"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </Section>
        </AnimatedSection>

        {/* Pagination */}
        {totalPages > 1 && (
          <AnimatedSection delay={0.6}>
            <Section className="flex justify-center">
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                >
                  Previous
                </Button>
                
                <div className="flex items-center gap-1">
                  {Array.from({ length: totalPages }, (_, i) => i + 1)
                    .filter(page => 
                      page === 1 || 
                      page === totalPages || 
                      Math.abs(page - currentPage) <= 1
                    )
                    .map((page, index, array) => (
                      <div key={page} className="flex items-center">
                        {index > 0 && array[index - 1] !== page - 1 && (
                          <span className="px-2 text-muted-foreground">...</span>
                        )}
                        <Button
                          variant={currentPage === page ? "default" : "outline"}
                          size="sm"
                          onClick={() => setCurrentPage(page)}
                          className="w-10"
                        >
                          {page}
                        </Button>
                      </div>
                    ))}
                </div>

                <Button
                  variant="outline"
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                >
                  Next
                </Button>
              </div>
            </Section>
          </AnimatedSection>
        )}
      </div>
    </div>
  );
}

