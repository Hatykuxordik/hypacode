"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, MapPin } from "lucide-react";
import { motion } from "framer-motion";

export function RealTimeClock() {
  const [time, setTime] = useState<Date>(new Date());
  const [timezone, setTimezone] = useState<string>("");
  const [location, setLocation] = useState<string>("");

  useEffect(() => {
    // Get user's timezone
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimezone(userTimezone);
    
    // Extract location from timezone (e.g., "America/New_York" -> "New York")
    const locationName = userTimezone.split('/').pop()?.replace(/_/g, ' ') || 'Unknown';
    setLocation(locationName);

    // Update time every second
    const timer = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour12: true,
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  const getGreeting = () => {
    const hour = time.getHours();
    if (hour < 12) return "Good Morning";
    if (hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="bg-gradient-to-br from-primary/5 to-secondary/5 border-primary/20">
        <CardContent className="p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center space-x-2">
              <Clock className="h-5 w-5 text-primary" />
              <span className="font-medium text-primary">Live Time</span>
            </div>
            <Badge variant="secondary" className="flex items-center space-x-1">
              <MapPin className="h-3 w-3" />
              <span>{location}</span>
            </Badge>
          </div>
          
          <div className="text-center space-y-2">
            <div className="text-sm text-muted-foreground">
              {getGreeting()}! It's currently
            </div>
            
            <motion.div 
              className="text-3xl font-bold font-mono text-primary"
              key={time.getSeconds()} // Re-animate every second
              initial={{ scale: 1 }}
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 0.2 }}
            >
              {formatTime(time)}
            </motion.div>
            
            <div className="text-sm text-muted-foreground">
              {formatDate(time)}
            </div>
            
            <div className="text-xs text-muted-foreground mt-2">
              {timezone}
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

