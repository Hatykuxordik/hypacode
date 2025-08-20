"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useTheme } from "next-themes";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import {
  Moon,
  Sun,
  Menu,
  X,
  Home,
  User,
  Code,
  FolderOpen,
  Wrench,
  MessageSquare,
  Mail,
  BookOpen,
  Github,
  Linkedin,
  Twitter,
  ExternalLink,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navigation = [
  { name: "Home", href: "/", icon: Home },
  { name: "About", href: "/about", icon: User },
  { name: "Skills", href: "/skills", icon: Code },
  { name: "Projects", href: "/projects", icon: FolderOpen },
  { name: "Tools", href: "/tools", icon: Wrench },
  { name: "Testimonials", href: "/testimonials", icon: MessageSquare },
  { name: "Contact", href: "/contact", icon: Mail },
  { name: "Blog", href: "/blog", icon: BookOpen },
];

const socialLinks = [
  { name: "GitHub", href: "#", icon: Github },
  { name: "LinkedIn", href: "#", icon: Linkedin },
  { name: "Twitter", href: "#", icon: Twitter },
];

export function Header() {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, setTheme } = useTheme();
  const pathname = usePathname();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-1 group">
            <div className="relative">
              <Image
                src="/assets/Hypacodelogo.svg"
                alt="Hypacode Logo"
                width={40}
                height={40}
                className="h-8 w-8 transition-transform group-hover:scale-110"
              />
            </div>
            <span className="text-xl font-bold bg-primary bg-clip-text text-transparent">
              Hypacode
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex items-center space-x-8">
            {navigation.map((item) => {
              const isActive =
                pathname === item.href || pathname.startsWith(item.href + "/");

              return (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-sm font-medium transition-all duration-200 hover:text-primary relative group ${
                    isActive ? "text-primary" : ""
                  }`}
                >
                  <span className="relative z-10">{item.name}</span>

                  {isActive && (
                    <motion.div
                      className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full z-20"
                      layoutId="activeTab"
                      initial={false}
                      transition={{
                        type: "spring",
                        stiffness: 500,
                        damping: 30,
                      }}
                    />
                  )}

                  <motion.div
                    className="absolute inset-0 bg-primary/10 rounded-md -z-10"
                    initial={{ scale: 0, opacity: 0 }}
                    whileHover={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </Link>
              );
            })}
          </nav>

          {/* Theme Toggle & Mobile Menu */}
          <div className="flex items-center space-x-2">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
              aria-label="Toggle theme"
              className="cursor-pointer hover:bg-accent relative overflow-hidden group"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={theme}
                  initial={{ y: -20, opacity: 0, rotate: -90 }}
                  animate={{ y: 0, opacity: 1, rotate: 0 }}
                  exit={{ y: 20, opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.3, ease: "easeInOut" }}
                >
                  {theme === "dark" ? (
                    <Sun className="h-5 w-5 text-foreground" />
                  ) : (
                    <Moon className="h-5 w-5 text-primary" />
                  )}
                </motion.div>
              </AnimatePresence>
              <motion.div
                className="absolute inset-0 bg-foreground rounded-md"
                initial={{ scale: 0 }}
                whileHover={{ scale: 1 }}
                transition={{ duration: 0.2 }}
              />
            </Button>

            {/* Enhanced Mobile Menu */}
            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button
                  variant="ghost"
                  size="icon"
                  className="lg:hidden relative overflow-hidden group"
                  onClick={() => setIsOpen(!isOpen)}
                >
                  <AnimatePresence mode="wait" initial={false}>
                    <motion.div
                      key={isOpen ? "x" : "menu"}
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {isOpen ? (
                        <X className="h-5 w-5" />
                      ) : (
                        <Menu className="h-5 w-5" />
                      )}
                    </motion.div>
                  </AnimatePresence>

                  <span className="sr-only">Toggle menu</span>

                  <motion.div
                    className={`absolute inset-0 rounded-md ${
                      isOpen ? "bg-red-500/10" : "bg-primary/10"
                    }`}
                    initial={{ scale: 0 }}
                    whileHover={{ scale: 1 }}
                    transition={{ duration: 0.2 }}
                  />
                </Button>
              </SheetTrigger>
              <SheetContent
                side="right"
                className="w-[320px] sm:w-[380px] p-0 bg-background/98 backdrop-blur-xl border-l border-border/50"
              >
                <div className="flex flex-col h-full">
                  {/* Enhanced Header */}
                  <div className="relative p-6 border-b border-border/50 bg-background">
                    <div className="flex items-center justify-between">
                      <motion.div
                        className="flex items-center space-x-3"
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.1 }}
                      >
                        <div className="relative">
                          <Image
                            src="/assets/Hypacodelogo.svg"
                            alt="Hypacode Logo"
                            width={32}
                            height={32}
                            className="h-8 w-8"
                          />
                          <div className="absolute inset-0 bg-primary/20 rounded-full blur-md -z-10" />
                        </div>
                        <div>
                          <span className="text-lg font-bold bg-primary bg-clip-text text-transparent">
                            Hypacode
                          </span>
                          <div className="text-xs text-muted-foreground">
                            Frontend Developer
                          </div>
                        </div>
                      </motion.div>
                    </div>
                  </div>

                  {/* Enhanced Navigation */}
                  <nav className="flex-1 px-6 py-8 overflow-y-auto">
                    <div className="space-y-3">
                      {navigation.map((item, index) => {
                        const Icon = item.icon;
                        const isActive = pathname === item.href;

                        return (
                          <motion.div
                            key={item.name}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.05 + 0.2 }}
                          >
                            <SheetClose asChild>
                              <Link
                                href={item.href}
                                className={`group flex items-center px-4 py-3 text-base font-medium rounded-xl transition-all duration-300 hover:bg-accent hover:text-foreground relative overflow-hidden ${
                                  isActive
                                    ? "bg-primary/10 text-primary shadow-sm"
                                    : ""
                                }`}
                              >
                                <Icon
                                  className={`h-5 w-5 mr-3 transition-colors ${
                                    isActive
                                      ? "text-primary"
                                      : "text-muted-foreground group-hover:text-primary"
                                  }`}
                                />
                                <span className="relative z-10">
                                  {item.name}
                                </span>
                                {isActive && (
                                  <motion.div
                                    className="absolute right-3 top-1/2 -translate-y-1/2"
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ delay: 0.1 }}
                                  >
                                    <Badge
                                      variant="secondary"
                                      className="text-xs"
                                    >
                                      Active
                                    </Badge>
                                  </motion.div>
                                )}
                                <motion.div
                                  className="absolute inset-0 bg-gradient-to-r from-primary/5 to-secondary/5 rounded-xl"
                                  initial={{ scale: 0, opacity: 0 }}
                                  whileHover={{ scale: 1, opacity: 1 }}
                                  transition={{ duration: 0.2 }}
                                />
                              </Link>
                            </SheetClose>
                          </motion.div>
                        );
                      })}
                    </div>

                    {/* Social Links */}
                    <div className="mt-8 pt-6 border-t border-border/50">
                      <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                        Connect
                      </div>
                      <div className="flex space-x-3">
                        {socialLinks.map((social, index) => {
                          const Icon = social.icon;
                          return (
                            <motion.div
                              key={social.name}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.1 + 0.5 }}
                            >
                              <Button
                                variant="outline"
                                size="icon"
                                className="hover:bg-primary hover:text-primary-foreground hover:border-primary transition-all duration-300 relative overflow-hidden group"
                                asChild
                              >
                                <a
                                  href={social.href}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <Icon className="h-4 w-4" />
                                  <ExternalLink className="h-3 w-3 absolute top-1 right-1 opacity-0 group-hover:opacity-100 transition-opacity" />
                                </a>
                              </Button>
                            </motion.div>
                          );
                        })}
                      </div>
                    </div>
                  </nav>

                  {/* Enhanced Footer */}
                  <motion.div
                    className="p-6 border-t border-border/50 bg-muted/30"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.6 }}
                  >
                    <div className="text-center space-y-2">
                      <div className="text-sm font-medium">
                        Ready to work together?
                      </div>
                      <Button
                        className="w-full bg-primary hover:primary/80 text-white shadow-lg hover:shadow-xl transition-all duration-300"
                        asChild
                      >
                        <Link href="/contact">
                          Get In Touch
                          <ExternalLink className="h-4 w-4 ml-2" />
                        </Link>
                      </Button>
                      <div className="text-xs text-muted-foreground">
                        &copy; {new Date().getFullYear()} Hypacode. All rights
                        reserved.
                      </div>
                    </div>
                  </motion.div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </header>
  );
}
