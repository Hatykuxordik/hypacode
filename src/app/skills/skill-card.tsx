"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { getProficiencyColor, getProficiencyWidth } from "./utils";

interface SkillCardProps {
  name: string;
  description: string;
  proficiency: string;
  icon: React.ElementType;
}

export function SkillCard({
  name,
  description,
  proficiency,
  icon: Icon,
}: SkillCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="h-full hover:shadow-lg transition-all duration-300 group hover-lift">
        <CardContent className="p-6 text-center flex flex-col h-full">
          {/* Icon */}
          <div className="w-16 h-16 mx-auto mb-4 bg-muted rounded-full flex items-center justify-center group-hover:bg-primary/10 transition-colors">
            <Icon className="h-8 w-8 text-muted-foreground group-hover:text-primary transition-colors" />
          </div>
          <div className="flex flex-col flex-grow">
            {/* Skill Name */}
            <h3 className="text-lg font-semibold mb-2 group-hover:text-primary">
              {name}
            </h3>
            {/* Description */}
            <p className="text-sm text-muted-foreground mb-4 leading-relaxed">
              {description}
            </p>
            {/* Skill Progress*/}
            {proficiency && (
              <div className="space-y-2 mt-auto">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-muted-foreground">
                    Proficiency
                  </span>
                  <span
                    className={`text-xs font-semibold ${getProficiencyColor(
                      proficiency
                    )}`}
                  >
                    {proficiency}
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500 group-hover:shadow-sm ${getProficiencyWidth(
                      proficiency
                    )}`}
                  />
                </div>
              </div>
            )}
          </div>
          {/* Hover Effect Indicator */}
          <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="mt-2 w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
