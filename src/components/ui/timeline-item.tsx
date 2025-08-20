import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin } from "lucide-react";

interface TimelineItemProps {
  title: string;
  company: string;
  period: string;
  location: string;
  description: string;
  achievements?: string[];
  technologies?: string[];
  status?: "Current" | "Completed" | "In Progress";
  isLast?: boolean;
}

export function TimelineItem({
  title,
  company,
  period,
  location,
  description,
  achievements,
  technologies,
  status,
  isLast = false,
}: TimelineItemProps) {
  return (
    <div className="relative">
      {/* Timeline line */}
      {!isLast && (
        <div className="absolute left-6 top-12 w-0.5 h-full bg-border" />
      )}

      {/* Timeline dot */}
      <div className="absolute left-4 top-6 w-4 h-4 bg-primary rounded-full border-4 border-background" />

      {/* Content */}
      <div className="ml-12">
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-start justify-between">
              <div>
                <CardTitle className="text-xl text-primary">{title}</CardTitle>
                <CardDescription className="text-lg font-medium text-foreground mt-1">
                  {company}
                </CardDescription>
              </div>
              {status && (
                <Badge
                  variant={status === "Current" ? "default" : "secondary"}
                  className="ml-4"
                >
                  {status}
                </Badge>
              )}
            </div>

            <div className="flex items-center space-x-4 text-sm text-muted-foreground mt-2">
              <div className="flex items-center space-x-1">
                <Calendar className="h-4 w-4" />
                <span>{period}</span>
              </div>
              <div className="flex items-center space-x-1">
                <MapPin className="h-4 w-4" />
                <span>{location}</span>
              </div>
            </div>
          </CardHeader>

          <CardContent>
            <p className="text-muted-foreground mb-4">{description}</p>

            {achievements && achievements.length > 0 && (
              <div className="mb-4">
                <h4 className="font-semibold mb-2">Key Achievements:</h4>
                <ul className="list-disc list-inside space-y-1 text-sm text-muted-foreground">
                  {achievements.map((achievement, index) => (
                    <li key={index}>{achievement}</li>
                  ))}
                </ul>
              </div>
            )}

            {technologies && technologies.length > 0 && (
              <div>
                <h4 className="font-semibold mb-2">Technologies Used:</h4>
                <div className="flex flex-wrap gap-2">
                  {technologies.map((tech) => (
                    <Badge key={tech} variant="outline">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
