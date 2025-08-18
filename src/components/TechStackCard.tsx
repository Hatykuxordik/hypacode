
import React from 'react';
import { Card, CardContent } from './ui/card';
import { LucideIcon } from 'lucide-react';

interface TechStackCardProps {
  icon: LucideIcon;
  name: string;
  description: string;
  proficiency: string;
}

const TechStackCard: React.FC<TechStackCardProps> = ({ icon: Icon, name, description, proficiency }) => {
  const getProficiencyColor = (level: string) => {
    switch (level) {
      case 'Expert':
        return 'text-green-500';
      case 'Advanced':
        return 'text-blue-500';
      case 'Intermediate':
        return 'text-yellow-500';
      default:
        return 'text-gray-500';
    }
  };

  const getProficiencyWidth = (level: string) => {
    switch (level) {
      case 'Expert':
        return 'w-full';
      case 'Advanced':
        return 'w-4/5';
      case 'Intermediate':
        return 'w-3/5';
      default:
        return 'w-2/5';
    }
  };

  return (
    <Card 
      className="group hover-lift glass-card cursor-pointer transition-all duration-300 hover:shadow-lg hover:shadow-primary/10"
    >
      <CardContent className="p-6 text-center space-y-4">
        {/* Icon */}
        <div className="flex justify-center">
          <div className="p-4 bg-primary/10 rounded-full group-hover:bg-primary/20 transition-colors duration-300 group-hover:scale-110 transform">
            {Icon ? (
              <Icon className="h-8 w-8 text-primary" />
            ) : (
              <div className="h-8 w-8 bg-primary rounded" />
            )}
          </div>
        </div>

        {/* Name */}
        <h3 className="text-lg font-semibold group-hover:text-primary transition-colors duration-300">
          {name}
        </h3>

        {/* Description */}
        <p className="text-sm text-muted-foreground leading-relaxed">
          {description}
        </p>

        {/* Proficiency */}
        {proficiency && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs font-medium text-muted-foreground">Proficiency</span>
              <span className={`text-xs font-semibold ${getProficiencyColor(proficiency)}`}>
                {proficiency}
              </span>
            </div>
            <div className="w-full bg-muted rounded-full h-2">
              <div 
                className={`h-2 bg-gradient-to-r from-primary to-secondary rounded-full transition-all duration-500 group-hover:shadow-sm ${getProficiencyWidth(proficiency)}`}
              />
            </div>
          </div>
        )}

        {/* Hover Effect Indicator */}
        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-primary to-transparent" />
        </div>
      </CardContent>
    </Card>
  );
};

export default TechStackCard;


