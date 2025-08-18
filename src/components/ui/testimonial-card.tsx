import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

interface TestimonialCardProps {
  quote: string;
  clientName: string;
  clientTitle: string;
  clientCompany: string;
  projectName: string;
  rating: number;
  date: string;
  avatar?: string;
}

export function TestimonialCard({
  quote,
  clientName,
  clientTitle,
  clientCompany,
  projectName,
  rating,
  date,
  avatar,
}: TestimonialCardProps) {
  return (
    <Card className="h-full">
      <CardContent className="p-6">
        {/* Quote Icon */}
        <div className="mb-4">
          <Quote className="h-8 w-8 text-primary/20" />
        </div>

        {/* Rating */}
        <div className="flex items-center mb-4">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < rating
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Quote */}
        <blockquote className="text-muted-foreground mb-6 leading-relaxed">
          "{quote}"
        </blockquote>

        {/* Project */}
        <div className="mb-4">
          <Badge variant="outline" className="text-xs">
            Project: {projectName}
          </Badge>
        </div>

        {/* Client Info */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={avatar} alt={clientName} />
              <AvatarFallback>
                {clientName.split(" ").map(n => n[0]).join("")}
              </AvatarFallback>
            </Avatar>
            <div>
              <div className="font-semibold text-sm">{clientName}</div>
              <div className="text-xs text-muted-foreground">
                {clientTitle}
              </div>
              <div className="text-xs text-muted-foreground">
                {clientCompany}
              </div>
            </div>
          </div>
          <div className="text-xs text-muted-foreground">
            {date}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

