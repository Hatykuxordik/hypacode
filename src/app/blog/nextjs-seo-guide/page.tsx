'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowLeft, Share2, Tag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

export default function NextjsSeoGuidePost() {
  const publishedAt = '2024-01-10';
  const readTime = '12 min read';
  const category = 'Next.js';
  const tags = ['Next.js', 'SEO', 'Web Development', 'Performance'];

  return (
    <article className="min-h-screen py-20">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to Blog */}
        <div className="mb-8">
          <Link href="/blog">
            <Button variant="ghost" className="mb-4">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Blog
            </Button>
          </Link>
        </div>

        {/* Article Header */}
        <header className="mb-12">
          <div className="max-w-4xl mx-auto text-center">
            <div className="mb-6">
              <span className="px-3 py-1 bg-primary text-primary-foreground text-sm font-medium rounded-full">
                {category}
              </span>
            </div>
            <h1 className="text-4xl sm:text-5xl font-bold mb-6 leading-tight">
              Complete Next.js SEO Guide: From Basics to Advanced Strategies
            </h1>
            <div className="flex items-center justify-center text-muted-foreground mb-8">
              <Calendar className="w-4 h-4 mr-2" />
              <span className="mr-4">{new Date(publishedAt).toLocaleDateString('en-US', { 
                year: 'numeric', 
                month: 'long', 
                day: 'numeric' 
              })}</span>
              <Clock className="w-4 h-4 mr-2" />
              <span>{readTime}</span>
            </div>
            <div className="relative h-64 sm:h-96 rounded-2xl overflow-hidden mb-8">
              <Image
                src="/images/nextjs-seo.jpg"
                alt="Next.js SEO Guide"
                fill
                className="object-cover"
                priority
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
              />
            </div>
          </div>
        </header>

        {/* Article Content */}
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Search Engine Optimization (SEO) is crucial for any web application's success, and 
              Next.js provides powerful built-in features that make implementing SEO best practices 
              straightforward and effective. This comprehensive guide covers everything from basic 
              metadata configuration to advanced SEO strategies that will help your Next.js 
              applications rank higher in search results and attract more organic traffic.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6">Understanding Next.js SEO Advantages</h2>
            <p className="mb-6">
              Next.js offers significant SEO advantages over traditional client-side React applications. 
              The framework's server-side rendering (SSR) and static site generation (SSG) capabilities 
              ensure that search engines can easily crawl and index your content. Unlike single-page 
              applications that rely on JavaScript to render content, Next.js delivers fully-formed 
              HTML pages that search engines can immediately understand and process.
            </p>

            <p className="mb-6">
              The App Router introduced in Next.js 13 brings even more powerful SEO features, including 
              the new Metadata API, improved loading states, and better performance optimizations. 
              These features work together to create web applications that not only perform well for 
              users but also meet the technical requirements that search engines expect from modern 
              web applications.
            </p>

            <h2 className="text-3xl font-bold mt-12 mb-6">The New Metadata API: Modern SEO Configuration</h2>
            <p className="mb-6">
              The Metadata API in Next.js 13+ App Router revolutionizes how we handle SEO metadata. 
              Instead of manually managing head elements, you can now export metadata objects directly 
              from your page and layout components. This approach provides better type safety, easier 
              maintenance, and more powerful dynamic metadata generation capabilities.
            </p>

            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-6">
              <pre className="text-sm overflow-x-auto">
                <code>{`// app/layout.tsx - Root layout metadata
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: {
    default: 'My App - Best Web Solutions',
    template: '%s | My App'
  },
  description: 'Professional web development services specializing in React, Next.js, and modern web technologies.',
  keywords: ['web development', 'react', 'nextjs', 'typescript'],
  authors: [{ name: 'Your Name', url: 'https://yoursite.com' }],
  creator: 'Your Name',
  publisher: 'Your Company',
  metadataBase: new URL('https://yoursite.com'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: 'My App - Best Web Solutions',
    description: 'Professional web development services',
    url: 'https://yoursite.com',
    siteName: 'My App',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'My App Open Graph Image',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'My App - Best Web Solutions',
    description: 'Professional web development services',
    images: ['/twitter-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};`}</code>
              </pre>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">Dynamic Metadata Generation</h2>
            <p className="mb-6">
              For pages with dynamic content, Next.js allows you to generate metadata programmatically 
              using the generateMetadata function. This is particularly useful for blog posts, product 
              pages, or any content that changes based on URL parameters or database queries.
            </p>

            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-6">
              <pre className="text-sm overflow-x-auto">
                <code>{`// app/blog/[slug]/page.tsx - Dynamic blog post metadata
import type { Metadata } from 'next';

interface Props {
  params: { slug: string };
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  // Fetch post data
  const post = await getPostBySlug(params.slug);
  
  if (!post) {
    return {
      title: 'Post Not Found',
      description: 'The requested blog post could not be found.',
    };
  }

  return {
    title: post.title,
    description: post.excerpt,
    keywords: post.tags,
    authors: [{ name: post.author.name }],
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      url: \`/blog/\${params.slug}\`,
      type: 'article',
      publishedTime: post.publishedAt,
      modifiedTime: post.updatedAt,
      authors: [post.author.name],
      images: [
        {
          url: post.featuredImage,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.excerpt,
      images: [post.featuredImage],
    },
  };
}

export default async function BlogPost({ params }: Props) {
  const post = await getPostBySlug(params.slug);
  
  return (
    <article>
      <h1>{post.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
    </article>
  );
}`}</code>
              </pre>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">Structured Data and JSON-LD</h2>
            <p className="mb-6">
              Structured data helps search engines understand your content better and can lead to 
              rich snippets in search results. JSON-LD is the recommended format for structured data, 
              and Next.js makes it easy to implement through server components or the head section.
            </p>

            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-6">
              <pre className="text-sm overflow-x-auto">
                <code>{`// Structured data for a blog post
const blogPostJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'BlogPosting',
  headline: post.title,
  description: post.excerpt,
  image: post.featuredImage,
  author: {
    '@type': 'Person',
    name: post.author.name,
    url: post.author.url,
  },
  publisher: {
    '@type': 'Organization',
    name: 'Your Site Name',
    logo: {
      '@type': 'ImageObject',
      url: 'https://yoursite.com/logo.png',
    },
  },
  datePublished: post.publishedAt,
  dateModified: post.updatedAt,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': \`https://yoursite.com/blog/\${post.slug}\`,
  },
};

// Organization structured data for homepage
const organizationJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'Organization',
  name: 'Your Company Name',
  url: 'https://yoursite.com',
  logo: 'https://yoursite.com/logo.png',
  description: 'Professional web development services',
  address: {
    '@type': 'PostalAddress',
    streetAddress: '123 Main St',
    addressLocality: 'City',
    addressRegion: 'State',
    postalCode: '12345',
    addressCountry: 'US',
  },
  contactPoint: {
    '@type': 'ContactPoint',
    telephone: '+1-555-123-4567',
    contactType: 'customer service',
  },
  sameAs: [
    'https://twitter.com/yourcompany',
    'https://linkedin.com/company/yourcompany',
    'https://github.com/yourcompany',
  ],
};

// Add to your component
export default function BlogPost({ post }) {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogPostJsonLd) }}
      />
      <article>
        {/* Your content */}
      </article>
    </>
  );
}`}</code>
              </pre>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">Sitemap and Robots.txt Generation</h2>
            <p className="mb-6">
              Next.js 13+ provides built-in support for generating sitemaps and robots.txt files. 
              You can create these files programmatically, ensuring they're always up-to-date with 
              your current content and routing structure.
            </p>

            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-6">
              <pre className="text-sm overflow-x-auto">
                <code>{`// app/sitemap.ts - Generate sitemap dynamically
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://yoursite.com';
  
  // Static pages
  const staticPages = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 1,
    },
    {
      url: \`\${baseUrl}/about\`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: \`\${baseUrl}/services\`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ];

  // Dynamic blog posts
  const posts = await getAllPosts();
  const blogPages = posts.map((post) => ({
    url: \`\${baseUrl}/blog/\${post.slug}\`,
    lastModified: new Date(post.updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }));

  return [...staticPages, ...blogPages];
}

// app/robots.ts - Generate robots.txt
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/private/', '/admin/'],
    },
    sitemap: 'https://yoursite.com/sitemap.xml',
  };
}`}</code>
              </pre>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">Image Optimization for SEO</h2>
            <p className="mb-6">
              Images play a crucial role in SEO, affecting both page load times and search visibility. 
              Next.js Image component provides automatic optimization, but proper implementation 
              requires attention to alt text, sizing, and loading strategies.
            </p>

            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-6">
              <pre className="text-sm overflow-x-auto">
                <code>{`import Image from 'next/image';

// Optimized hero image
<Image
  src="/hero-image.jpg"
  alt="Professional web development services - custom React and Next.js applications"
  width={1200}
  height={630}
  priority // Load immediately for above-the-fold content
  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 1200px"
  className="rounded-lg shadow-lg"
/>

// Blog post featured image
<Image
  src={post.featuredImage}
  alt={\`\${post.title} - \${post.excerpt.substring(0, 100)}\`}
  width={800}
  height={400}
  sizes="(max-width: 768px) 100vw, 800px"
  className="w-full h-auto"
/>

// Product gallery with lazy loading
{products.map((product, index) => (
  <Image
    key={product.id}
    src={product.image}
    alt={\`\${product.name} - \${product.description}\`}
    width={300}
    height={300}
    loading={index < 4 ? 'eager' : 'lazy'} // Load first 4 immediately
    sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 300px"
  />
))}`}</code>
              </pre>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">Performance Optimization for SEO</h2>
            <p className="mb-6">
              Page speed is a critical ranking factor for search engines. Next.js provides several 
              built-in optimizations, but additional strategies can further improve your Core Web 
              Vitals scores and overall SEO performance.
            </p>

            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-6">
              <pre className="text-sm overflow-x-auto">
                <code>{`// next.config.js - Performance optimizations
/** @type {import('next').NextConfig} */
const nextConfig = {
  // Enable experimental features for better performance
  experimental: {
    optimizeCss: true,
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
  
  // Image optimization
  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  
  // Compression
  compress: true,
  
  // Headers for caching
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'X-XSS-Protection',
            value: '1; mode=block',
          },
        ],
      },
    ];
  },
};

module.exports = nextConfig;

// Font optimization
import { Inter, Roboto_Mono } from 'next/font/google';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto-mono',
});

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={\`\${inter.variable} \${robotoMono.variable}\`}>
      <body className="font-sans">
        {children}
      </body>
    </html>
  );
}`}</code>
              </pre>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">Internal Linking Strategy</h2>
            <p className="mb-6">
              Strategic internal linking helps search engines understand your site structure and 
              distributes page authority throughout your site. Next.js Link component provides 
              optimized navigation while maintaining SEO benefits.
            </p>

            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-6">
              <pre className="text-sm overflow-x-auto">
                <code>{`import Link from 'next/link';

// SEO-optimized navigation
const Navigation = () => {
  return (
    <nav aria-label="Main navigation">
      <ul>
        <li>
          <Link 
            href="/services/web-development"
            title="Professional Web Development Services"
          >
            Web Development
          </Link>
        </li>
        <li>
          <Link 
            href="/services/react-consulting"
            title="Expert React.js Consulting and Development"
          >
            React Consulting
          </Link>
        </li>
        <li>
          <Link 
            href="/portfolio"
            title="View Our Web Development Portfolio"
          >
            Portfolio
          </Link>
        </li>
      </ul>
    </nav>
  );
};

// Related posts with keyword-rich anchor text
const RelatedPosts = ({ currentPost, relatedPosts }) => {
  return (
    <section aria-labelledby="related-posts">
      <h2 id="related-posts">Related Articles</h2>
      <ul>
        {relatedPosts.map((post) => (
          <li key={post.id}>
            <Link 
              href={\`/blog/\${post.slug}\`}
              title={\`Learn more about \${post.title}\`}
            >
              <h3>{post.title}</h3>
              <p>{post.excerpt}</p>
            </Link>
          </li>
        ))}
      </ul>
    </section>
  );
};

// Breadcrumb navigation for better site structure
const Breadcrumbs = ({ items }) => {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="breadcrumb">
        {items.map((item, index) => (
          <li key={index} className="breadcrumb-item">
            {index < items.length - 1 ? (
              <Link href={item.href}>{item.label}</Link>
            ) : (
              <span aria-current="page">{item.label}</span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};`}</code>
              </pre>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">Monitoring and Analytics</h2>
            <p className="mb-6">
              Effective SEO requires ongoing monitoring and optimization. Implementing proper 
              analytics and monitoring tools helps you track your SEO performance and identify 
              areas for improvement.
            </p>

            <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-lg mb-6">
              <pre className="text-sm overflow-x-auto">
                <code>{`// Google Analytics 4 implementation
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <Script
          src={\`https://www.googletagmanager.com/gtag/js?id=\${process.env.NEXT_PUBLIC_GA_ID}\`}
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {\`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '\${process.env.NEXT_PUBLIC_GA_ID}');
          \`}
        </Script>
      </head>
      <body>{children}</body>
    </html>
  );
}

// Custom SEO monitoring hook
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export const usePageTracking = () => {
  const pathname = usePathname();
  
  useEffect(() => {
    // Track page views
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', process.env.NEXT_PUBLIC_GA_ID, {
        page_path: pathname,
      });
    }
    
    // Track Core Web Vitals
    if ('web-vital' in window) {
      window['web-vital'].getCLS(console.log);
      window['web-vital'].getFID(console.log);
      window['web-vital'].getLCP(console.log);
    }
  }, [pathname]);
};`}</code>
              </pre>
            </div>

            <h2 className="text-3xl font-bold mt-12 mb-6">Advanced SEO Strategies</h2>
            <p className="mb-6">
              Beyond the basics, advanced SEO strategies can give your Next.js application a 
              competitive edge. These include implementing hreflang for international SEO, 
              optimizing for featured snippets, and leveraging schema markup for rich results.
            </p>

            <ul className="list-disc pl-6 mb-6 space-y-2">
              <li>Implement proper URL structure with meaningful slugs and hierarchy</li>
              <li>Use canonical URLs to prevent duplicate content issues</li>
              <li>Optimize for featured snippets with structured content</li>
              <li>Implement hreflang tags for international content</li>
              <li>Create topic clusters and pillar pages for content authority</li>
              <li>Optimize for voice search with natural language content</li>
              <li>Implement progressive web app features for better user experience</li>
            </ul>

            <h2 className="text-3xl font-bold mt-12 mb-6">SEO Testing and Validation</h2>
            <p className="mb-6">
              Regular testing and validation ensure your SEO implementation is working correctly. 
              Use tools like Google Search Console, Lighthouse, and various SEO testing tools to 
              monitor your site's performance and identify issues before they impact your rankings.
            </p>

            <p className="mb-8">
              Remember that SEO is an ongoing process, not a one-time setup. Search engine algorithms 
              constantly evolve, and your content and technical implementation should evolve with them. 
              By following the strategies outlined in this guide and staying current with SEO best 
              practices, your Next.js applications will be well-positioned to achieve and maintain 
              high search engine rankings.
            </p>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mb-8">
            {tags.map((tag) => (
              <span key={tag} className="px-3 py-1 bg-secondary text-secondary-foreground text-sm rounded-full">
                <Tag className="w-3 h-3 mr-1 inline" />
                {tag}
              </span>
            ))}
          </div>

          {/* Share */}
          <div className="border-t pt-8 mb-8">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold">Share this article</h3>
              <Button variant="outline">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {/* Related Articles */}
          <Card>
            <CardContent className="p-6">
              <h3 className="text-xl font-bold mb-4">Related Articles</h3>
              <div className="space-y-4">
                <Link href="/blog/react-performance-optimization" className="block hover:text-primary transition-colors">
                  <h4 className="font-semibold">React Performance Optimization: Advanced Techniques for Faster Apps</h4>
                  <p className="text-sm text-muted-foreground">Discover advanced React performance optimization techniques for lightning-fast applications.</p>
                </Link>
                <Link href="/blog/typescript-best-practices" className="block hover:text-primary transition-colors">
                  <h4 className="font-semibold">TypeScript Best Practices for React Developers in 2024</h4>
                  <p className="text-sm text-muted-foreground">Essential TypeScript patterns and best practices for React development.</p>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </article>
  );
}

