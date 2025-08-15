"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import { Button, buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { VariantProps } from "class-variance-authority";

interface MagneticButtonProps extends VariantProps<typeof buttonVariants> {
  children: React.ReactNode;
  className?: string;
  strength?: number;
  range?: number;
  asChild?: boolean;
  [key: string]: any;
}

export function MagneticButton({
  children,
  className,
  strength = 0.3,
  range = 100,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: MagneticButtonProps) {
  const ref = useRef<HTMLButtonElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { stiffness: 300, damping: 30 });
  const springY = useSpring(y, { stiffness: 300, damping: 30 });

  const rotateX = useTransform(springY, [-range, range], [5, -5]);
  const rotateY = useTransform(springX, [-range, range], [-5, 5]);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;

    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const distanceX = e.clientX - centerX;
    const distanceY = e.clientY - centerY;

    x.set(distanceX * strength);
    y.set(distanceY * strength);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    x.set(0);
    y.set(0);
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
        rotateX,
        rotateY,
        transformPerspective: 1000
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onMouseEnter={handleMouseEnter}
      className="inline-block"
    >
      <Button
        ref={ref}
        variant={variant}
        size={size}
        asChild={asChild}
        className={cn(
          "relative overflow-hidden transition-all duration-300",
          isHovered && "shadow-lg",
          className
        )}
        {...props}
      >
        {children}
      </Button>
    </motion.div>
  );
}

