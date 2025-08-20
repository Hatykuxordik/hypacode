"use client";

import { ChevronDown, ChevronUp } from "lucide-react";
import { useState, useEffect, ReactNode } from "react";

interface TextExpanderProps {
  children: ReactNode;
  breakpoint?: number; // defaults to Tailwind md = 768px
}

const TextExpander: React.FC<TextExpanderProps> = ({
  children,
  breakpoint = 768,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkScreen = () => setIsMobile(window.innerWidth < breakpoint);
    checkScreen();
    window.addEventListener("resize", checkScreen);
    return () => window.removeEventListener("resize", checkScreen);
  }, [breakpoint]);

  const childArray = Array.isArray(children) ? children : [children];
  const firstParagraph = childArray[0];
  const restParagraphs = childArray.slice(1);

  // Desktop → show everything, no button
  if (!isMobile) {
    return (
      <div className="space-y-4 text-muted-foreground leading-relaxed">
        {children}
      </div>
    );
  }

  // Mobile → first paragraph only, with toggle
  return (
    <div className="space-y-4 text-muted-foreground leading-relaxed">
      {isExpanded ? children : firstParagraph}

      {restParagraphs.length > 0 && (
        <button
          className="text-primary border-b border-primary leading-3 pb-1"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <span className="flex">
              Show less
              <ChevronUp className="ml-2 h-4 w-4 text-primary" />
            </span>
          ) : (
            <span className="flex">
              Show more
              <ChevronDown className="ml-2 h-4 w-4 text-primary" />
            </span>
          )}
        </button>
      )}
    </div>
  );
};

export default TextExpander;
