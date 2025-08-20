"use client";

import { Section } from "@/components/ui/section";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface AdditionalTechnologiesProps {
  items: string[];
}

export function AdditionalTechnologies({ items }: AdditionalTechnologiesProps) {
  return (
    <Section className="bg-muted/30 py-12 sm:py-16">
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">
          Additional Technologies & Tools
        </h2>
      </div>

      <div className="flex flex-wrap justify-center gap-3 sm:gap-4">
        {items.map((tech, index) => (
          <motion.div
            key={tech}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
          >
            <Badge
              variant="outline"
              className="text-sm py-2 px-4 hover:bg-primary hover:text-primary-foreground transition-colors cursor-default"
            >
              {tech}
            </Badge>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
