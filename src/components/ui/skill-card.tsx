import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Code2 } from "lucide-react";

interface SkillCardProps {
  title: string;
  description: string;
  proficiency: "Expert" | "Advanced" | "Intermediate" | "Beginner";
  icon?: React.ReactNode;
}

const proficiencyColors = {
  Expert: "bg-green-500",
  Advanced: "bg-blue-500", 
  Intermediate: "bg-yellow-500",
  Beginner: "bg-gray-500",
};

const proficiencyValues = {
  Expert: 95,
  Advanced: 80,
  Intermediate: 65,
  Beginner: 40,
};

export function SkillCard({ title, description, proficiency, icon }: SkillCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 rounded-lg bg-primary/10">
              {icon || <Code2 className="h-5 w-5 text-primary" />}
            </div>
            <CardTitle className="text-lg">{title}</CardTitle>
          </div>
          <Badge 
            variant="secondary" 
            className={`${proficiencyColors[proficiency]} text-white`}
          >
            {proficiency}
          </Badge>
        </div>
      </CardHeader>
      <CardContent>
        <CardDescription className="mb-4">{description}</CardDescription>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span>Proficiency</span>
            <span className="font-medium">{proficiency}</span>
          </div>
          <Progress 
            value={proficiencyValues[proficiency]} 
            className="h-2"
          />
        </div>
      </CardContent>
    </Card>
  );
}

