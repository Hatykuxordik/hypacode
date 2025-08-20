import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";

import { NavItem } from "./nav-item";
import { navigation } from "./data/navigation";
import { socialLinks } from "./data/social-links";

interface Props {
  pathname: string;
}

export function MobileNav({ pathname }: Props) {
  return (
    <nav className="flex-1 px-6 py-8 overflow-y-auto">
      <div className="space-y-3">
        {navigation.map((item, i) => (
          <NavItem
            key={item.name}
            item={item}
            mobile
            index={i}
            isActive={
              pathname === item.href || pathname.startsWith(item.href + "/")
            }
          />
        ))}
      </div>

      {/* Social Links */}
      <div className="mt-8 pt-6 border-t border-border/50">
        <div className="text-xs font-semibold text-muted-foreground uppercase mb-4">
          Connect
        </div>
        <div className="flex space-x-3">
          {socialLinks.map((social, i) => {
            const Icon = social.icon;
            return (
              <motion.div
                key={social.name}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: i * 0.1 + 0.5 }}
              >
                <Button
                  variant="outline"
                  size="icon"
                  asChild
                  className="hover:bg-primary hover:text-white hover:border-primary transition-all"
                >
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Icon className="h-4 w-4" />
                  </Link>
                </Button>
              </motion.div>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
