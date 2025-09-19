import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { Header } from "@/components/layout/header/header";
import { Footer } from "@/components/layout/footer";
import { FloatingAIAssistant } from "@/components/ui/floating-ai-assistant";
import { Toaster } from "sonner";
import { 
  personStructuredData, 
  websiteStructuredData, 
  organizationStructuredData 
} from "@/lib/structured-data";
import { SkipToContent } from "@/components/accessibility/skip-to-content";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Sodiq Atiku - Frontend Developer | React, Next.js, TypeScript Expert",
    template: "%s | Sodiq Atiku - Frontend Developer"
  },
  description:
    "Hire Sodiq Atiku, an experienced frontend developer specializing in React, Next.js, and TypeScript. 3+ years building responsive, user-friendly web applications. Available for freelance projects and full-time opportunities.",
  keywords: [
    "frontend developer",
    "react developer",
    "nextjs developer", 
    "typescript developer",
    "javascript developer",
    "web developer",
    "hire frontend developer",
    "freelance developer",
    "sodiq atiku",
    "hypacode",
    "portfolio",
    "web development services",
    "responsive design",
    "modern web applications",
    "user interface developer",
    "frontend engineer"
  ],
  authors: [{ name: "Sodiq Atiku", url: "https://hypacode.com" }],
  creator: "Sodiq Atiku",
  publisher: "Hypacode",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://hypacode.com"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hypacode.com",
    title: "Sodiq Atiku - Frontend Developer | React, Next.js, TypeScript Expert",
    description:
      "Experienced frontend developer with 3+ years building modern web applications. Specializing in React, Next.js, TypeScript. Available for hire - view portfolio and contact for projects.",
    siteName: "Sodiq Atiku - Frontend Developer Portfolio",
    images: [
      {
        url: "/assets/profile1.jpg",
        width: 1200,
        height: 630,
        alt: "Sodiq Atiku - Frontend Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Sodiq Atiku - Frontend Developer | React, Next.js Expert",
    description:
      "Hire experienced frontend developer. 3+ years React, Next.js, TypeScript. View portfolio & contact for projects.",
    creator: "@hypacode",
    images: ["/assets/profile1.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      noimageindex: false,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    google: "your-google-verification-code", // Add actual verification code
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(personStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(websiteStructuredData),
          }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(organizationStructuredData),
          }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SkipToContent />
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScrollProvider>
            <div className="min-h-screen bg-background text-foreground">
              <Header />
              <main id="main-content" className="overflow-x-hidden">{children}</main>
              <Footer />
            </div>
            <FloatingAIAssistant />
            <Toaster />
          </SmoothScrollProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
