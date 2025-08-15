import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
  value: string;
  label: string;
  className?: string;
  valueClassName?: string;
  labelClassName?: string;
}

export function StatsCard({
  value,
  label,
  className,
  valueClassName,
  labelClassName,
}: StatsCardProps) {
  return (
    <Card className={cn("text-center", className)}>
      <CardContent className="p-6">
        <div className={cn("text-3xl font-bold text-primary mb-2", valueClassName)}>
          {value}
        </div>
        <div className={cn("text-sm text-muted-foreground", labelClassName)}>
          {label}
        </div>
      </CardContent>
    </Card>
  );
}

