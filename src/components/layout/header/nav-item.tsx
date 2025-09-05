import Link from "next/link";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface NavItemProps {
  item: { name: string; href: string; icon?: any };
  isActive: boolean;
  mobile?: boolean;
  index?: number;
  setIsOpen?: (isOpen: boolean) => void;
}

export function NavItem({
  item,
  isActive,
  mobile = false,
  index = 0,
}: NavItemProps) {
  const Icon = item.icon;

  if (mobile) {
    return (
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: index * 0.05 + 0.2 }}
      >
        <Link
          href={item.href}
          aria-current={isActive ? "page" : undefined}
          onClick={() => setIsOpen && setIsOpen(false)}
          className={`group flex items-center px-4 py-3 text-base font-medium rounded-xl transition-all duration-300 relative ${
            isActive
              ? "bg-primary/10 text-primary shadow-sm"
              : "hover:bg-accent hover:text-foreground"
          }`}
        >
          {Icon && (
            <Icon
              className={`h-5 w-5 mr-3 ${
                isActive
                  ? "text-primary"
                  : "text-muted-foreground group-hover:text-primary"
              }`}
            />
          )}
          <span>{item.name}</span>
          {isActive && (
            <motion.div
              className="absolute right-3 top-1/2 -translate-y-1/2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
            >
              <Badge variant="secondary" className="text-xs">
                Active
              </Badge>
            </motion.div>
          )}
        </Link>
      </motion.div>
    );
  }

  return (
    <Link
      href={item.href}
      aria-current={isActive ? "page" : undefined}
      className={`text-sm font-medium transition-all duration-200 relative group ${
        isActive ? "text-primary" : "hover:text-primary"
      }`}
    >
      <span>{item.name}</span>
      {isActive && (
        <motion.div
          className="absolute -bottom-1 left-0 right-0 h-0.5 bg-primary rounded-full"
          layoutId="activeTab"
          transition={{ type: "spring", stiffness: 500, damping: 30 }}
        />
      )}
    </Link>
  );
}
