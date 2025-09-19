"use client";

import Image from "next/image";
import { useState } from "react";

interface ImageWithFallbackProps {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  fill?: boolean;
  sizes?: string;
  fallbackSrc?: string;
}

export function ImageWithFallback({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  fill = false,
  sizes,
  fallbackSrc = "/assets/placeholder.jpg",
  ...props
}: ImageWithFallbackProps) {
  const [imgSrc, setImgSrc] = useState(src);
  const [isLoading, setIsLoading] = useState(true);

  const handleError = () => {
    setImgSrc(fallbackSrc);
  };

  const handleLoad = () => {
    setIsLoading(false);
  };

  return (
    <div className={`relative ${className}`}>
      {isLoading && (
        <div className="absolute inset-0 bg-muted animate-pulse rounded-lg" />
      )}
      <Image
        src={imgSrc}
        alt={alt}
        width={fill ? undefined : width}
        height={fill ? undefined : height}
        fill={fill}
        sizes={sizes}
        priority={priority}
        className={`transition-opacity duration-300 ${
          isLoading ? "opacity-0" : "opacity-100"
        } ${className}`}
        onError={handleError}
        onLoad={handleLoad}
        loading={priority ? "eager" : "lazy"}
        {...props}
      />
    </div>
  );
}

