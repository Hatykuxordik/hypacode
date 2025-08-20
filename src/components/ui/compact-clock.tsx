"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export function CompactClock() {
  const [time, setTime] = useState<Date | null>(null);
  const [timezone, setTimezone] = useState("");
  const [location, setLocation] = useState("");
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    // Initialize immediately on client
    const update = () => setTime(new Date());
    update();

    // Tick every second
    const timer = setInterval(update, 1000);

    // Detect timezone + city
    const userTimezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimezone(userTimezone);
    const city = userTimezone.split("/").pop()?.replace(/_/g, " ") || "Local";
    setLocation(city);

    return () => clearInterval(timer);
  }, []);

  const formatTime = (date: Date) =>
    date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    });

  const formatDate = (date: Date) =>
    date.toLocaleDateString([], {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });

  return (
    <div className="invisible md:visible fixed top-20 right-4 z-40">
      <motion.div
        onHoverStart={() => setIsExpanded(true)}
        onHoverEnd={() => setIsExpanded(false)}
        onClick={() => setIsExpanded(!isExpanded)}
        className="cursor-pointer"
      >
        <Card className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border shadow-lg">
          <CardContent className="p-3">
            <AnimatePresence mode="wait">
              {!isExpanded ? (
                <motion.div
                  key="compact"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="flex items-center space-x-2"
                >
                  <Clock className="h-4 w-4 text-primary" />
                  <div className="text-sm font-mono">
                    {time ? formatTime(time) : "--:--:--"}
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="expanded"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  className="space-y-2 min-w-[200px]"
                >
                  <div className="flex items-center space-x-2">
                    <Clock className="h-4 w-4 text-primary" />
                    <div className="text-lg font-mono font-semibold">
                      {time ? formatTime(time) : "--:--:--"}
                    </div>
                  </div>

                  {time && (
                    <div className="text-sm text-muted-foreground">
                      {formatDate(time)}
                    </div>
                  )}

                  <div className="flex items-center space-x-2 text-xs text-muted-foreground">
                    <MapPin className="h-3 w-3" />
                    <span>{location}</span>
                  </div>

                  <div className="text-xs text-muted-foreground font-mono">
                    {timezone}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
