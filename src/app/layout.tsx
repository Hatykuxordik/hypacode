import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/providers/theme-provider";
import { SmoothScrollProvider } from "@/components/providers/smooth-scroll-provider";
import { Header } from "@/components/layout/header/header";
import { Footer } from "@/components/layout/footer";
import { FloatingAIAssistant } from "@/components/ui/floating-ai-assistant";
import { Toaster } from "sonner";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Hypacode - Frontend Developer Portfolio",
  description:
    "Building modern web experiences with cutting-edge technologies. Explore my portfolio of React, Next.js, and TypeScript projects.",
  keywords: [
    "frontend developer",
    "react",
    "nextjs",
    "typescript",
    "web development",
    "portfolio",
  ],
  authors: [{ name: "Hypacode" }],
  creator: "Hypacode",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://hypacode.com",
    title: "Hypacode - Frontend Developer Portfolio",
    description:
      "Solution-oriented frontend developer with over 3 years of experience in building user-friendly, responsive and visually appealing web applications using modern technologies like React.js, Next.js, and TypeScript.",
    siteName: "Hypacode",
  },
  twitter: {
    card: "summary_large_image",
    title: "Hypacode - Frontend Developer Portfolio",
    description:
      "Building modern web experiences with cutting-edge technologies.",
    creator: "@hypacode",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="dark"
          enableSystem
          disableTransitionOnChange
        >
          <SmoothScrollProvider>
            <div className="min-h-screen bg-background text-foreground">
              <Header />
              <main className="pt-16">{children}</main>
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
