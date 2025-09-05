import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import Image from "next/image";

import { MobileNav } from "./mobile-nav";
import { MobileFooter } from "./mobile-footer";

interface Props {
  pathname: string;
}

export function MobileMenu({ pathname }: Props) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="md:hidden">
      <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            aria-label="Toggle menu"
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
          </Button>
        </SheetTrigger>

        <SheetContent
          side="right"
          className="w-[320px] sm:w-[380px] p-0 bg-background/98 backdrop-blur-xl border-l border-border/50"
        >
          <div className="flex flex-col h-full">
            {/* Mobile Header */}
            <div className="p-6 border-b border-border/50 flex items-center space-x-3">
              <Image
                src="/assets/Hypacodelogo.svg"
                alt="Hypacode Logo"
                width={32}
                height={32}
                className="h-8 w-8"
              />
              <div>
                <span className="text-lg font-bold bg-primary bg-clip-text text-transparent">
                  Hypacode
                </span>
                <div className="text-xs text-muted-foreground">
                  Frontend Developer
                </div>
              </div>
            </div>

            <MobileNav pathname={pathname} setIsOpen={setIsOpen} />
            <MobileFooter />
          </div>
        </SheetContent>
      </Sheet>
    </div>
  );
}
