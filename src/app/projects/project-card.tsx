"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import {
  ExternalLink,
  Github,
  Code,
  Eye,
  Star,
  GitFork,
  Calendar,
} from "lucide-react";

interface Project {
  title: string;
  status: "Completed" | string;
  category: string;
  liveUrl: string;
  githubUrl: string;
  description: string;
  tags: string[];
  stars: number;
  forks: number;
  date: string | Date;
}

interface ProjectCardProps {
  project: Project;
  onDetails: (project: Project) => void;
  featured?: boolean;
}

export default function ProjectCard({
  project,
  onDetails,
  featured = false,
}: ProjectCardProps) {
  const formattedDate = new Date(project.date).toLocaleDateString();

  return (
    <motion.div
      whileHover={{ y: -10 }}
      className={`group hover:shadow-lg transition-all duration-300 overflow-hidden rounded-lg border ${
        featured ? "border-primary" : "border-border"
      } flex flex-col`}
    >
      <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 flex items-center justify-center relative">
        {featured && (
          <Badge
            variant="secondary"
            className="absolute top-2 left-2 bg-yellow-500 text-black"
          >
            Featured
          </Badge>
        )}
        <Badge
          variant={project.status === "Completed" ? "default" : "secondary"}
          className={`absolute top-2 right-2 ${
            project.status === "Completed"
              ? "bg-green-500 text-white"
              : "bg-orange-500 text-white"
          }`}
        >
          {project.status}
        </Badge>
        <div className="text-4xl font-bold text-primary/20">
          {project.title.charAt(0)}
        </div>
      </div>

      <CardContent className="p-6 flex flex-col flex-1">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold mb-2">{project.title}</h3>
            <Badge variant="secondary" className="mb-3">
              {project.category}
            </Badge>
          </div>
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="outline" asChild>
              <Link href={project.liveUrl} target="_blank">
                <ExternalLink className="h-4 w-4" />
              </Link>
            </Button>
            <Button size="sm" variant="outline" asChild>
              <Link href={project.githubUrl} target="_blank">
                <Github className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>

        <p className="text-muted-foreground mb-4 line-clamp-3 flex-1">
          {project.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.slice(0, 3).map((tag, i) => (
            <Badge key={i} variant="outline" className="text-xs bg-primary/30">
              {tag}
            </Badge>
          ))}
          {project.tags.length > 3 && (
            <Badge variant="outline" className="text-xs bg-muted/50">
              +{project.tags.length - 3} more
            </Badge>
          )}
        </div>

        <div className="flex justify-between mb-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-1">
              <Star className="w-4 h-4" />
              <span>{project.stars}</span>
            </div>
            <div className="flex items-center space-x-1">
              <GitFork className="w-4 h-4" />
              <span>{project.forks}</span>
            </div>
          </div>
          <div className="flex items-center space-x-1">
            <Calendar className="w-4 h-4" />
            <span>{formattedDate}</span>
          </div>
        </div>

        <div className="flex space-x-3">
          <motion.a
            href={project.githubUrl}
            target="_blank"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1"
          >
            <Button variant="outline" className="w-full">
              <Code className="w-4 h-4 mr-2" />
              Code
            </Button>
          </motion.a>
          <motion.a
            href={project.liveUrl}
            target="_blank"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1"
          >
            <Button variant="default" className="w-full">
              <Eye className="w-4 h-4 mr-2" />
              Live
            </Button>
          </motion.a>
          <motion.span
            onClick={() => onDetails(project)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex-1"
          >
            <Button variant="outline" className="w-full">
              Details
            </Button>
          </motion.span>
        </div>
      </CardContent>
    </motion.div>
  );
}
