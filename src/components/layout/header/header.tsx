"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Logo } from "./logo";
import { DesktopNav } from "./desktop-nav";
import { ThemeToggle } from "./use-theme";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  const [mounted, setMounted] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Logo />
          <DesktopNav />
          <div className="flex items-center space-x-2">
            <ThemeToggle />
            <MobileMenu pathname={pathname} />
          </div>
        </div>
      </div>
    </header>
  );
}
