"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Section } from "@/components/ui/section";
import { AnimatedSection } from "@/components/ui/animated-section";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ArrowLeft,
  Calendar,
  Clock,
  ExternalLink,
  Tag,
  User,
  Loader2,
} from "lucide-react";
import Link from "next/link";
import { BlogInteractions } from "@/components/blog/blog-interactions";

// Function to format markdown content as HTML
function formatMarkdownContent(content: string): string {
  if (!content) return '';
  
  let html = content
    // Convert headers
    .replace(/^### (.*$)/gim, '<h3 class="text-xl font-bold mt-8 mb-4">$1</h3>')
    .replace(/^## (.*$)/gim, '<h2 class="text-2xl font-bold mt-10 mb-6">$1</h2>')
    .replace(/^# (.*$)/gim, '<h1 class="text-3xl font-bold mt-12 mb-8">$1</h1>')
    
    // Convert bold text
    .replace(/\*\*(.*?)\*\*/g, '<strong class="font-semibold">$1</strong>')
    
    // Convert italic text
    .replace(/\*(.*?)\*/g, '<em class="italic">$1</em>')
    
    // Convert code blocks
    .replace(/```(\w+)?\n([\s\S]*?)```/g, '<pre class="bg-gray-100 dark:bg-gray-800 p-4 rounded-lg overflow-x-auto my-6"><code class="text-sm">$2</code></pre>')
    
    // Convert inline code
    .replace(/`([^`]+)`/g, '<code class="bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded text-sm font-mono">$1</code>')
    
    // Convert unordered lists
    .replace(/^- (.*$)/gim, '<li class="ml-4 mb-2">• $1</li>')
    
    // Wrap consecutive list items in ul tags
    .replace(/(<li class="ml-4 mb-2">.*<\/li>\s*)+/g, '<ul class="my-4 space-y-2">$&</ul>')
    
    // Convert line breaks to paragraphs
    .split('\n\n')
    .map(paragraph => {
      paragraph = paragraph.trim();
      if (!paragraph) return '';
      
      // Don't wrap headers, code blocks, or lists in p tags
      if (paragraph.startsWith('<h') || 
          paragraph.startsWith('<pre') || 
          paragraph.startsWith('<ul') ||
          paragraph.startsWith('<li')) {
        return paragraph;
      }
      
      return `<p class="mb-4">${paragraph}</p>`;
    })
    .join('\n');
    
  return html;
}

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
  author?: string;
  fullContent?: string;
}

// Static blog posts (original content)
const staticBlogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Optimizing Next.js Performance for Core Web Vitals",
    description:
      "A comprehensive guide to improving your Next.js application's Core Web Vitals, including image optimization, code splitting, and server-side rendering strategies.",
    content: `# Optimizing Next.js Performance for Core Web Vitals

Core Web Vitals are essential metrics that Google uses to measure user experience on your website. In this comprehensive guide, we'll explore how to optimize your Next.js application to achieve perfect Core Web Vitals scores.

## Understanding Core Web Vitals

Core Web Vitals consist of three main metrics:

### 1. Largest Contentful Paint (LCP)
LCP measures loading performance. To provide a good user experience, LCP should occur within 2.5 seconds of when the page first starts loading.

**Optimization Strategies:**
- Use Next.js Image component for automatic optimization
- Implement proper image sizing and formats (WebP, AVIF)
- Optimize server response times
- Use CDN for static assets

### 2. First Input Delay (FID)
FID measures interactivity. To provide a good user experience, pages should have an FID of 100 milliseconds or less.

**Optimization Strategies:**
- Minimize JavaScript execution time
- Use code splitting and dynamic imports
- Implement proper loading strategies
- Optimize third-party scripts

### 3. Cumulative Layout Shift (CLS)
CLS measures visual stability. To provide a good user experience, pages should maintain a CLS of 0.1 or less.

**Optimization Strategies:**
- Always include size attributes on images and video elements
- Never insert content above existing content
- Use CSS aspect-ratio for responsive images
- Preload fonts to prevent FOIT/FOUT

## Next.js Specific Optimizations

### Image Optimization
\`\`\`jsx
import Image from 'next/image'

function MyComponent() {
  return (
    <Image
      src="/hero-image.jpg"
      alt="Hero"
      width={800}
      height={600}
      priority // For above-the-fold images
      placeholder="blur"
      blurDataURL="data:image/jpeg;base64,..."
    />
  )
}
\`\`\`

### Code Splitting
\`\`\`jsx
import dynamic from 'next/dynamic'

const DynamicComponent = dynamic(() => import('../components/HeavyComponent'), {
  loading: () => <p>Loading...</p>,
  ssr: false // Disable server-side rendering if needed
})
\`\`\`

### Font Optimization
\`\`\`jsx
import { Inter } from 'next/font/google'

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
})

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.className}>
      <body>{children}</body>
    </html>
  )
}
\`\`\`

## Performance Monitoring

Use tools like:
- Google PageSpeed Insights
- Lighthouse
- Web Vitals Chrome extension
- Next.js built-in analytics

## Conclusion

Optimizing Core Web Vitals in Next.js requires a holistic approach combining proper image optimization, code splitting, font loading strategies, and careful attention to layout shifts. By implementing these strategies, you can significantly improve your website's performance and user experience.

Remember to continuously monitor your metrics and make iterative improvements based on real user data.`,
    date: "2025-01-15",
    tags: ["Next.js", "Performance", "SEO", "Web Vitals"],
    category: "Performance",
    readTime: 8,
    slug: "optimizing-nextjs-performance",
    featured: true,
    author: "Hypacode Team",
  },
  {
    id: "2",
    title: "Mastering Tailwind CSS for Responsive Design",
    description:
      "Learn how to effectively use Tailwind CSS to build beautiful and responsive user interfaces with a utility-first approach.",
    content: `# Mastering Tailwind CSS for Responsive Design

Tailwind CSS has revolutionized how we approach styling in modern web development. This utility-first CSS framework provides low-level utility classes that let you build completely custom designs without ever leaving your HTML.

## Why Tailwind CSS?

### Benefits of Utility-First Approach
- **Faster Development**: No need to write custom CSS
- **Consistent Design**: Predefined spacing, colors, and typography
- **Responsive by Default**: Built-in responsive utilities
- **Smaller Bundle Size**: Only includes used utilities in production

## Core Concepts

### Utility Classes
Tailwind provides thousands of utility classes for:
- Layout (flexbox, grid, positioning)
- Spacing (margin, padding)
- Typography (font size, weight, color)
- Colors and backgrounds
- Borders and effects

### Responsive Design
\`\`\`html
<!-- Mobile first approach -->
<div class="w-full md:w-1/2 lg:w-1/3 xl:w-1/4">
  <!-- Responsive width -->
</div>

<!-- Responsive text -->
<h1 class="text-2xl md:text-4xl lg:text-6xl">
  Responsive Heading
</h1>
\`\`\`

## Building Responsive Layouts

### Flexbox Utilities
\`\`\`html
<!-- Responsive flex direction -->
<div class="flex flex-col md:flex-row">
  <div class="flex-1 p-4">Content 1</div>
  <div class="flex-1 p-4">Content 2</div>
</div>

<!-- Responsive alignment -->
<div class="flex items-center justify-center md:justify-between">
  <span>Logo</span>
  <nav class="hidden md:block">Navigation</nav>
</div>
\`\`\`

### Grid System
\`\`\`html
<!-- Responsive grid -->
<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  <div class="bg-white p-6 rounded-lg shadow">Card 1</div>
  <div class="bg-white p-6 rounded-lg shadow">Card 2</div>
  <div class="bg-white p-6 rounded-lg shadow">Card 3</div>
</div>
\`\`\`

## Advanced Techniques

### Custom Components with @apply
\`\`\`css
@layer components {
  .btn-primary {
    @apply bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded;
  }
  
  .card {
    @apply bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow;
  }
}
\`\`\`

### Dark Mode Support
\`\`\`html
<div class="bg-white dark:bg-gray-800 text-gray-900 dark:text-white">
  <h1 class="text-xl font-bold">Dark mode ready!</h1>
</div>
\`\`\`

### Custom Breakpoints
\`\`\`javascript
// tailwind.config.js
module.exports = {
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    }
  }
}
\`\`\`

## Best Practices

### 1. Mobile-First Approach
Always design for mobile first, then enhance for larger screens:
\`\`\`html
<!-- Good: Mobile first -->
<div class="text-sm md:text-base lg:text-lg">

<!-- Avoid: Desktop first -->
<div class="text-lg md:text-base sm:text-sm">
\`\`\`

### 2. Consistent Spacing
Use Tailwind's spacing scale consistently:
\`\`\`html
<div class="space-y-4 md:space-y-6 lg:space-y-8">
  <div class="p-4 md:p-6 lg:p-8">Content</div>
</div>
\`\`\`

### 3. Component Extraction
Extract repeated patterns into components:
\`\`\`jsx
// Button component
function Button({ children, variant = 'primary', size = 'md' }) {
  const baseClasses = 'font-medium rounded-lg transition-colors'
  const variants = {
    primary: 'bg-blue-500 hover:bg-blue-600 text-white',
    secondary: 'bg-gray-200 hover:bg-gray-300 text-gray-900'
  }
  const sizes = {
    sm: 'px-3 py-1.5 text-sm',
    md: 'px-4 py-2',
    lg: 'px-6 py-3 text-lg'
  }
  
  return (
    <button className={\`\${baseClasses} \${variants[variant]} \${sizes[size]}\`}>
      {children}
    </button>
  )
}
\`\`\`

## Performance Optimization

### Purging Unused CSS
Tailwind automatically removes unused styles in production:
\`\`\`javascript
// tailwind.config.js
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  // ...
}
\`\`\`

### JIT Mode
Just-In-Time compilation generates styles on-demand:
\`\`\`javascript
// tailwind.config.js
module.exports = {
  mode: 'jit',
  // ...
}
\`\`\`

## Conclusion

Tailwind CSS provides a powerful and flexible approach to responsive design. By mastering its utility classes and responsive features, you can build beautiful, maintainable user interfaces quickly and efficiently.

The key to success with Tailwind is embracing the utility-first mindset and leveraging its responsive design system to create interfaces that work seamlessly across all device sizes.`,
    date: "2025-01-12",
    tags: ["Tailwind CSS", "CSS", "Responsive Design", "UI/UX"],
    category: "CSS",
    readTime: 6,
    slug: "mastering-tailwind-css",
    featured: false,
    author: "Hypacode Team",
  },
  {
    id: "3",
    title: "Demystifying TypeScript: A Guide for JavaScript Developers",
    description:
      "An introductory guide to TypeScript for JavaScript developers, covering basic types, interfaces, and advanced features to write more robust code.",
    content: `# Demystifying TypeScript: A Guide for JavaScript Developers

TypeScript has become an essential tool in modern web development, offering static type checking and enhanced developer experience. This comprehensive guide will help JavaScript developers transition to TypeScript smoothly.

## What is TypeScript?

TypeScript is a strongly typed programming language that builds on JavaScript, giving you better tooling at any scale. It's developed and maintained by Microsoft and compiles to plain JavaScript.

### Key Benefits
- **Static Type Checking**: Catch errors at compile time
- **Enhanced IDE Support**: Better autocomplete and refactoring
- **Improved Code Documentation**: Types serve as documentation
- **Better Refactoring**: Safe and reliable code changes
- **Gradual Adoption**: Can be introduced incrementally

## Basic Types

### Primitive Types
\`\`\`typescript
// String
let name: string = "John Doe";

// Number
let age: number = 30;
let price: number = 99.99;

// Boolean
let isActive: boolean = true;

// Array
let numbers: number[] = [1, 2, 3, 4, 5];
let names: Array<string> = ["Alice", "Bob", "Charlie"];

// Tuple
let person: [string, number] = ["John", 30];

// Enum
enum Color {
  Red,
  Green,
  Blue
}
let favoriteColor: Color = Color.Blue;
\`\`\`

### Advanced Types
\`\`\`typescript
// Union Types
let id: string | number = "abc123";
id = 123; // Also valid

// Literal Types
let status: "pending" | "approved" | "rejected" = "pending";

// Any (use sparingly)
let data: any = { name: "John", age: 30 };

// Unknown (safer than any)
let userInput: unknown;
if (typeof userInput === "string") {
  console.log(userInput.toUpperCase());
}

// Void
function logMessage(message: string): void {
  console.log(message);
}

// Never
function throwError(message: string): never {
  throw new Error(message);
}
\`\`\`

## Interfaces and Type Aliases

### Interfaces
\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
  age?: number; // Optional property
  readonly createdAt: Date; // Readonly property
}

// Extending interfaces
interface AdminUser extends User {
  permissions: string[];
  isAdmin: true;
}

// Function interfaces
interface Calculator {
  (a: number, b: number): number;
}

const add: Calculator = (x, y) => x + y;
\`\`\`

### Type Aliases
\`\`\`typescript
type Status = "loading" | "success" | "error";
type UserID = string | number;

// Generic type aliases
type ApiResponse<T> = {
  data: T;
  status: Status;
  message?: string;
};

type UserResponse = ApiResponse<User>;
\`\`\`

## Functions in TypeScript

### Function Types
\`\`\`typescript
// Function declaration
function greet(name: string): string {
  return \`Hello, \${name}!\`;
}

// Arrow function
const multiply = (a: number, b: number): number => a * b;

// Optional parameters
function createUser(name: string, age?: number): User {
  return {
    id: Math.random(),
    name,
    email: \`\${name.toLowerCase()}@example.com\`,
    age,
    createdAt: new Date()
  };
}

// Default parameters
function greetUser(name: string, greeting: string = "Hello"): string {
  return \`\${greeting}, \${name}!\`;
}

// Rest parameters
function sum(...numbers: number[]): number {
  return numbers.reduce((total, num) => total + num, 0);
}
\`\`\`

### Function Overloads
\`\`\`typescript
function format(value: string): string;
function format(value: number): string;
function format(value: boolean): string;
function format(value: string | number | boolean): string {
  return String(value);
}
\`\`\`

## Generics

### Basic Generics
\`\`\`typescript
// Generic function
function identity<T>(arg: T): T {
  return arg;
}

let stringResult = identity<string>("hello");
let numberResult = identity<number>(42);

// Generic interface
interface Container<T> {
  value: T;
  getValue(): T;
}

class Box<T> implements Container<T> {
  constructor(public value: T) {}
  
  getValue(): T {
    return this.value;
  }
}
\`\`\`

### Generic Constraints
\`\`\`typescript
interface Lengthwise {
  length: number;
}

function logLength<T extends Lengthwise>(arg: T): T {
  console.log(arg.length);
  return arg;
}

logLength("hello"); // Works
logLength([1, 2, 3]); // Works
// logLength(123); // Error: number doesn't have length
\`\`\`

## Classes in TypeScript

### Basic Classes
\`\`\`typescript
class Animal {
  private name: string;
  protected species: string;
  public age: number;

  constructor(name: string, species: string, age: number) {
    this.name = name;
    this.species = species;
    this.age = age;
  }

  public makeSound(): void {
    console.log("Some generic animal sound");
  }

  protected getName(): string {
    return this.name;
  }
}

class Dog extends Animal {
  private breed: string;

  constructor(name: string, age: number, breed: string) {
    super(name, "Canine", age);
    this.breed = breed;
  }

  public makeSound(): void {
    console.log("Woof! Woof!");
  }

  public getInfo(): string {
    return \`\${this.getName()} is a \${this.breed}\`;
  }
}
\`\`\`

### Abstract Classes
\`\`\`typescript
abstract class Shape {
  abstract calculateArea(): number;
  
  displayArea(): void {
    console.log(\`Area: \${this.calculateArea()}\`);
  }
}

class Circle extends Shape {
  constructor(private radius: number) {
    super();
  }
  
  calculateArea(): number {
    return Math.PI * this.radius ** 2;
  }
}
\`\`\`

## Utility Types

TypeScript provides several utility types for common type transformations:

\`\`\`typescript
interface User {
  id: number;
  name: string;
  email: string;
  age: number;
}

// Partial - makes all properties optional
type PartialUser = Partial<User>;

// Required - makes all properties required
type RequiredUser = Required<User>;

// Pick - select specific properties
type UserSummary = Pick<User, "id" | "name">;

// Omit - exclude specific properties
type CreateUser = Omit<User, "id">;

// Record - create object type with specific keys and values
type UserRoles = Record<string, "admin" | "user" | "guest">;

// ReturnType - extract return type of function
function getUser(): User {
  return { id: 1, name: "John", email: "john@example.com", age: 30 };
}
type UserReturnType = ReturnType<typeof getUser>; // User
\`\`\`

## Best Practices

### 1. Start with Strict Mode
\`\`\`json
// tsconfig.json
{
  "compilerOptions": {
    "strict": true,
    "noImplicitAny": true,
    "strictNullChecks": true,
    "strictFunctionTypes": true
  }
}
\`\`\`

### 2. Use Type Assertions Carefully
\`\`\`typescript
// Prefer type guards
function isString(value: unknown): value is string {
  return typeof value === "string";
}

// Over type assertions
const userInput = getUserInput();
if (isString(userInput)) {
  console.log(userInput.toUpperCase()); // Safe
}
\`\`\`

### 3. Leverage Union Types
\`\`\`typescript
type LoadingState = 
  | { status: "loading" }
  | { status: "success"; data: User[] }
  | { status: "error"; error: string };

function handleState(state: LoadingState) {
  switch (state.status) {
    case "loading":
      return "Loading...";
    case "success":
      return \`Loaded \${state.data.length} users\`;
    case "error":
      return \`Error: \${state.error}\`;
  }
}
\`\`\`

## Migration Strategy

### Gradual Migration
1. **Start Small**: Begin with new files or small modules
2. **Add Types Incrementally**: Don't try to type everything at once
3. **Use \`any\` Temporarily**: It's okay to use \`any\` during migration
4. **Enable Strict Mode Gradually**: Start with basic checks, then enable stricter rules

### Common Patterns
\`\`\`typescript
// Converting JavaScript to TypeScript

// Before (JavaScript)
function processUser(user) {
  return {
    ...user,
    fullName: user.firstName + " " + user.lastName,
    isAdult: user.age >= 18
  };
}

// After (TypeScript)
interface InputUser {
  firstName: string;
  lastName: string;
  age: number;
}

interface ProcessedUser extends InputUser {
  fullName: string;
  isAdult: boolean;
}

function processUser(user: InputUser): ProcessedUser {
  return {
    ...user,
    fullName: \`\${user.firstName} \${user.lastName}\`,
    isAdult: user.age >= 18
  };
}
\`\`\`

## Conclusion

TypeScript enhances JavaScript development by providing static type checking, better tooling, and improved code maintainability. While there's a learning curve, the benefits far outweigh the initial investment.

Start small, be patient with yourself, and gradually adopt TypeScript's features. Your future self (and your team) will thank you for writing more robust, self-documenting code.

Remember: TypeScript is JavaScript with types. Everything you know about JavaScript still applies – TypeScript just makes it better!`,
    date: "2025-01-10",
    tags: ["TypeScript", "JavaScript", "Programming"],
    category: "Programming",
    readTime: 10,
    slug: "demystifying-typescript",
    featured: true,
    author: "Hypacode Team",
  },
];

export default function BlogPostClient() {
  const params = useParams();
  const router = useRouter();
  const [post, setPost] = useState<BlogPost | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);
      setError(null);

      try {
        const slug = params.slug as string;
        
        // First, check if it's a static post
        const staticPost = staticBlogPosts.find(p => p.slug === slug);
        if (staticPost) {
          setPost(staticPost);
          setLoading(false);
          return;
        }

        // If not static, try to fetch from APIs
        let foundPost: BlogPost | null = null;

        // Check if it's a DEV.to post
        if (slug.startsWith('dev-')) {
          const devId = slug.replace('dev-', '');
          try {
            const response = await fetch(`https://dev.to/api/articles/${devId}`);
            if (response.ok) {
              const article = await response.json();
              foundPost = {
                id: `dev-${article.id}`,
                title: article.title,
                description: article.description || article.title,
                content: article.body_markdown || article.description || "",
                fullContent: article.body_markdown || article.body_html || article.description || "",
                date: article.published_at.split('T')[0],
                tags: article.tag_list || [],
                category: "Frontend News",
                readTime: article.reading_time_minutes || 5,
                slug: `dev-${article.slug}`,
                featured: false,
                url: article.url,
                source: "DEV.to",
                isExternal: true,
                author: article.user?.name || "DEV.to Author",
              };
            }
          } catch (devError) {
            console.warn('Error fetching DEV.to article:', devError);
          }
        }

        // Check if it's a GitHub post
        if (slug.startsWith('github-') && !foundPost) {
          const repoName = slug.replace('github-', '');
          try {
            const response = await fetch(`https://api.github.com/repos/${repoName}`);
            if (response.ok) {
              const repo = await response.json();
              foundPost = {
                id: `github-${repo.id}`,
                title: `${repo.name}: ${repo.description || 'Frontend Repository'}`,
                description: repo.description || `A trending frontend repository: ${repo.name}`,
                content: repo.description || "",
                fullContent: `# ${repo.name}

${repo.description || 'A frontend development repository'}

## Repository Information

- **Language**: ${repo.language || 'Not specified'}
- **Stars**: ${repo.stargazers_count}
- **Forks**: ${repo.forks_count}
- **Open Issues**: ${repo.open_issues_count}
- **Created**: ${new Date(repo.created_at).toLocaleDateString()}
- **Last Updated**: ${new Date(repo.updated_at).toLocaleDateString()}

## Description

${repo.description || 'No description provided.'}

${repo.readme_url ? '## README\n\nFor detailed information, please visit the repository.' : ''}

## Topics

${repo.topics && repo.topics.length > 0 ? repo.topics.map((topic: string) => `- ${topic}`).join('\n') : 'No topics specified.'}

## License

${repo.license ? repo.license.name : 'No license specified'}

---

**Visit the repository**: [${repo.html_url}](${repo.html_url})`,
                date: repo.updated_at.split('T')[0],
                tags: ["GitHub", "Open Source", "Tools"],
                category: "Tools",
                readTime: 3,
                slug: `github-${repo.name}`,
                featured: false,
                url: repo.html_url,
                source: "GitHub",
                isExternal: true,
                author: repo.owner?.login || "GitHub User",
              };
            }
          } catch (githubError) {
            console.warn('Error fetching GitHub repository:', githubError);
          }
        }

        // Check if it's a Hacker News post
        if (slug.startsWith('hn-') && !foundPost) {
          const hnId = slug.replace('hn-', '');
          try {
            const response = await fetch(`https://hacker-news.firebaseio.com/v0/item/${hnId}.json`);
            if (response.ok) {
              const story = await response.json();
              foundPost = {
                id: `hn-${story.id}`,
                title: story.title,
                description: story.title,
                content: story.text || story.title,
                fullContent: `# ${story.title}

${story.text || 'No additional content available.'}

## Discussion

This article was originally posted on Hacker News. Join the discussion and read comments from the community.

**Posted by**: ${story.by || 'Anonymous'}  
**Score**: ${story.score || 0} points  
**Comments**: ${story.descendants || 0}  

---

**View on Hacker News**: [${story.url || `https://news.ycombinator.com/item?id=${story.id}`}](${story.url || `https://news.ycombinator.com/item?id=${story.id}`})`,
                date: new Date(story.time * 1000).toISOString().split('T')[0],
                tags: ["Tech News", "Frontend"],
                category: "Frontend News",
                readTime: 3,
                slug: `hn-${story.id}`,
                featured: false,
                url: story.url || `https://news.ycombinator.com/item?id=${story.id}`,
                source: "Hacker News",
                isExternal: true,
                author: story.by || "Hacker News User",
              };
            }
          } catch (hnError) {
            console.warn('Error fetching Hacker News story:', hnError);
          }
        }

        if (foundPost) {
          setPost(foundPost);
        } else {
          setError('Post not found');
        }
      } catch (err) {
        setError('Failed to load post');
        console.error('Error fetching post:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchPost();
  }, [params.slug]);

  if (loading) {
    return (
      <div className="min-h-screen py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="flex items-center justify-center py-20">
            <Loader2 className="h-8 w-8 animate-spin mr-3" />
            <span className="text-lg">Loading article...</span>
          </div>
        </div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen py-12 sm:py-16 lg:py-20">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold mb-4">Post Not Found</h1>
            <p className="text-muted-foreground mb-6">
              {error || "The requested blog post could not be found."}
            </p>
            <Link href="/blog">
              <Button>
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-12 sm:py-16 lg:py-20">
      <div className="max-w-4xl mx-auto px-4">
        {/* Back Button */}
        <AnimatedSection>
          <div className="mb-8">
            <Link href="/blog">
              <Button variant="outline" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </AnimatedSection>

        {/* Article Header */}
        <AnimatedSection delay={0.1}>
          <Card className="mb-8">
            <CardHeader className="pb-6">
              <div className="flex flex-wrap items-center gap-2 mb-4">
                <Badge variant="outline">{post.category}</Badge>
                {post.source && (
                  <Badge variant="secondary">{post.source}</Badge>
                )}
                {post.isExternal && (
                  <Badge variant="outline" className="gap-1">
                    <ExternalLink className="h-3 w-3" />
                    External
                  </Badge>
                )}
              </div>
              
              <CardTitle className="text-2xl sm:text-3xl lg:text-4xl font-bold leading-tight mb-4">
                {post.title}
              </CardTitle>
              
              <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  <span>{new Date(post.date).toLocaleDateString()}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="h-4 w-4" />
                  <span>{post.readTime} min read</span>
                </div>
                {post.author && (
                  <div className="flex items-center gap-1">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                )}
              </div>

              {post.description && (
                <p className="text-lg text-muted-foreground mt-4 leading-relaxed">
                  {post.description}
                </p>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-6">
                {post.tags.map((tag) => (
                  <Badge key={tag} variant="outline" className="gap-1">
                    <Tag className="h-3 w-3" />
                    {tag}
                  </Badge>
                ))}
              </div>

              {/* External Link */}
              {post.isExternal && post.url && (
                <div className="mt-6 p-4 bg-muted/50 rounded-lg">
                  <p className="text-sm text-muted-foreground mb-2">
                    This article was originally published on {post.source}
                  </p>
                  <a
                    href={post.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-primary hover:underline"
                  >
                    View Original Article
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </div>
              )}
            </CardHeader>
          </Card>
        </AnimatedSection>

        {/* Article Content */}
        <AnimatedSection delay={0.2}>
          <Card>
            <CardContent className="pt-6">
              <div className="prose prose-gray dark:prose-invert max-w-none">
                <div 
                  className="leading-relaxed"
                  style={{ 
                    lineHeight: '1.7',
                    fontSize: '1.1rem'
                  }}
                  dangerouslySetInnerHTML={{
                    __html: formatMarkdownContent(post.fullContent || post.content)
                  }}
                />
              </div>
            </CardContent>
          </Card>
        </AnimatedSection>

        {/* Blog Interactions - Likes and Comments */}
        <AnimatedSection delay={0.3}>
          <BlogInteractions postId={post.id} postTitle={post.title} />
        </AnimatedSection>

        {/* Footer */}
        <AnimatedSection delay={0.4}>
          <div className="mt-12 text-center">
            <Link href="/blog">
              <Button size="lg" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Back to All Articles
              </Button>
            </Link>
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}

