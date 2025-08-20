import { Button } from "@/components/ui/button";
import Link from "next/link";
import { motion } from "framer-motion";
import { ExternalLink } from "lucide-react";

export function MobileFooter() {
  return (
    <motion.div
      className="p-6 border-t border-border/50 bg-muted/30"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6 }}
    >
      <div className="text-center space-y-2">
        <div className="text-sm font-medium">Ready to work together?</div>
        <Button className="w-full bg-primary text-white shadow-lg" asChild>
          <Link href="/contact">
            Get In Touch
            <ExternalLink className="h-4 w-4 ml-2" />
          </Link>
        </Button>
        <div className="text-xs text-muted-foreground">
          &copy; {new Date().getFullYear()} Hypacode. All rights reserved.
        </div>
      </div>
    </motion.div>
  );
}
