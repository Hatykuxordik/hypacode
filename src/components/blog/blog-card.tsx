"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, ArrowRight, Eye } from "lucide-react";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";

interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  date: string;
  readTime: string;
  author: string;
  image?: string;
  views?: number;
}

interface BlogCardProps {
  post: BlogPost;
  index: number;
}

export function BlogCard({ post, index }: BlogCardProps) {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group"
    >
      <Card className="h-full overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-card/50 backdrop-blur supports-[backdrop-filter]:bg-card/50">
        {/* Featured Image */}
        {post.image && (
          <div className="relative h-48 overflow-hidden">
            <Image
              src={post.image}
              alt={post.title}
              fill
              className="object-cover transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            <Badge 
              variant="secondary" 
              className="absolute top-3 left-3 bg-background/90 backdrop-blur"
            >
              {post.category}
            </Badge>
          </div>
        )}

        <CardHeader className="space-y-3">
          {!post.image && (
            <Badge variant="secondary" className="w-fit">
              {post.category}
            </Badge>
          )}
          
          <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors duration-200">
            {post.title}
          </h3>
          
          <p className="text-muted-foreground line-clamp-3">
            {post.excerpt}
          </p>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* Tags */}
          <div className="flex flex-wrap gap-1">
            {post.tags.slice(0, 3).map((tag) => (
              <Badge 
                key={tag} 
                variant="outline" 
                className="text-xs hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
              >
                {tag}
              </Badge>
            ))}
            {post.tags.length > 3 && (
              <Badge variant="outline" className="text-xs">
                +{post.tags.length - 3} more
              </Badge>
            )}
          </div>

          {/* Meta Information */}
          <div className="flex items-center justify-between text-sm text-muted-foreground">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-1">
                <Calendar className="h-3 w-3" />
                <span>{formatDate(post.date)}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{post.readTime}</span>
              </div>
            </div>
            
            {post.views && (
              <div className="flex items-center space-x-1">
                <Eye className="h-3 w-3" />
                <span>{post.views.toLocaleString()}</span>
              </div>
            )}
          </div>

          {/* Author */}
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm font-medium">{post.author}</span>
          </div>

          {/* Read More Button */}
          <Button 
            asChild 
            variant="ghost" 
            className="w-full group/btn justify-between hover:bg-primary hover:text-primary-foreground transition-all duration-200"
          >
            <Link href={`/blog/${post.id}`}>
              Read Article
              <ArrowRight className="h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
            </Link>
          </Button>
        </CardContent>
      </Card>
    </motion.div>
  );
}

