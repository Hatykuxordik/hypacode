import { Suspense } from "react";
import { Metadata } from "next";
import BlogPostClient from "./BlogPostClient";
import { generateBlogPostStructuredData } from "@/lib/structured-data";

// Static blog posts data for metadata
const staticBlogPosts = [
  {
    slug: "optimizing-nextjs-performance",
    title: "Optimizing Next.js Performance for Core Web Vitals",
    description: "A comprehensive guide to improving your Next.js application's Core Web Vitals, including image optimization, code splitting, and server-side rendering strategies.",
    date: "2025-01-15",
    author: "Hypacode Team",
    readTime: 8,
    tags: ["Next.js", "Performance", "SEO", "Web Vitals"]
  },
  {
    slug: "mastering-tailwind-css",
    title: "Mastering Tailwind CSS for Responsive Design",
    description: "Learn how to effectively use Tailwind CSS to build beautiful and responsive user interfaces with a utility-first approach.",
    date: "2025-01-12",
    author: "Hypacode Team", 
    readTime: 6,
    tags: ["Tailwind CSS", "CSS", "Responsive Design", "UI/UX"]
  },
  {
    slug: "demystifying-typescript",
    title: "Demystifying TypeScript: A Guide for JavaScript Developers",
    description: "An introductory guide to TypeScript for JavaScript developers, covering basic types, interfaces, and advanced features to write more robust code.",
    date: "2025-01-10",
    author: "Hypacode Team",
    readTime: 10,
    tags: ["TypeScript", "JavaScript", "Programming"]
  }
];

// Generate metadata for blog posts
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const post = staticBlogPosts.find(p => p.slug === params.slug);
  
  if (!post) {
    return {
      title: "Blog Post Not Found | Sodiq Atiku - Frontend Developer",
      description: "The requested blog post could not be found."
    };
  }

  const url = `https://hypacode.com/blog/${post.slug}`;
  
  return {
    title: `${post.title} | Sodiq Atiku - Frontend Developer`,
    description: post.description,
    keywords: [...post.tags, "frontend developer", "web development", "tutorial"],
    authors: [{ name: post.author }],
    openGraph: {
      title: post.title,
      description: post.description,
      url: url,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
      tags: post.tags,
      images: [
        {
          url: "/assets/profile1.jpg",
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description,
      images: ["/assets/profile1.jpg"],
    },
    alternates: {
      canonical: url,
    },
  };
}

// Generate static params for static export
export async function generateStaticParams() {
  return staticBlogPosts.map(post => ({
    slug: post.slug
  }));
}

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const post = staticBlogPosts.find(p => p.slug === params.slug);
  
  return (
    <>
      {post && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(
              generateBlogPostStructuredData({
                title: post.title,
                description: post.description,
                date: post.date,
                author: post.author,
                url: `https://hypacode.com/blog/${post.slug}`,
              })
            ),
          }}
        />
      )}
      <Suspense fallback={<div>Loading...</div>}>
        <BlogPostClient />
      </Suspense>
    </>
  );
}

