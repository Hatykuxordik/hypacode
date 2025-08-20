"use client";

import { SkillCard } from "./skill-card";
import { motion } from "framer-motion";

interface Skill {
  name: string;
  description: string;
  proficiency: string;
  icon: React.ElementType;
}

interface SkillCategoryProps {
  title: string;
  skills: Skill[];
  delay?: number;
}

export function SkillCategory({
  title,
  skills,
  delay = 0,
}: SkillCategoryProps) {
  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay }}
      className="mb-16"
    >
      <div className="text-center mb-8 sm:mb-12">
        <h2 className="text-2xl sm:text-3xl font-bold mb-4">{title}</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
        {skills.map((skill, index) => (
          <SkillCard key={skill.name} {...skill} />
        ))}
      </div>
    </motion.section>
  );
}
