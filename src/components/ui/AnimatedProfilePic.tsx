"use client";
import { useState, useEffect, useRef } from "react";
import Image from "next/image";

interface AnimatedProfilePicProps {
  images?: string[];
  interval?: number;
}

const AnimatedProfilePic: React.FC<AnimatedProfilePicProps> = ({
  images = ["/assets/profile.jpg"],
  interval = 4000,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [nextImageIndex, setNextImageIndex] = useState<number>(1);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  const [isTransitioning, setIsTransitioning] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // Detect mobile device
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  // Auto-cycle through images with transition state
  useEffect(() => {
    if (images.length <= 1) return;

    const timer = setInterval(() => {
      setIsTransitioning(true);

      setTimeout(
        () => {
          setCurrentImageIndex((prevIndex) => {
            const newIndex = (prevIndex + 1) % images.length;
            setNextImageIndex((newIndex + 1) % images.length);
            return newIndex;
          });
          setIsTransitioning(false);
        },
        isMobile ? 250 : 500
      );
    }, interval);

    return () => clearInterval(timer);
  }, [images.length, interval, isMobile]);

  // Initialize next image index
  useEffect(() => {
    if (images.length > 1) {
      setNextImageIndex((currentImageIndex + 1) % images.length);
    }
  }, [currentImageIndex, images.length]);

  const glowColors = [
    "rgba(59, 130, 246, 0.4)",
    "rgba(139, 92, 246, 0.4)",
    "rgba(236, 72, 153, 0.4)",
  ];

  return (
    <>
      <div className="relative " ref={containerRef}>
        <div
          className={`relative w-80 h-80 lg:w-96 lg:h-96 rounded-full overflow-hidden border-4 mx-auto ${
            isMobile ? "is-mobile" : "is-desktop"
          }`}
        >
          {/* Main image container */}
          <div className="relative w-full h-full">
            {images.map((imageSrc, index) => (
              <div
                key={`${imageSrc}-${index}`}
                className={`absolute inset-0 transition-all ${
                  isMobile
                    ? "duration-500 ease-in-out"
                    : "duration-1000 ease-in-out"
                } ${
                  index === currentImageIndex
                    ? "opacity-100 z-10 image-current"
                    : "opacity-0 z-0 image-hidden"
                } ${
                  index === nextImageIndex && isTransitioning
                    ? "image-transitioning"
                    : ""
                }`}
              >
                <Image
                  src={imageSrc}
                  alt={`Profile image ${index + 1}`}
                  className="cursor-pointer object-cover rounded-full brightness-[90%] dark:brightness-75"
                  fill
                  priority={index === 0}
                />
              </div>
            ))}
          </div>

          {/* Desktop-only advanced animations */}
          {!isMobile && (
            <>
              {/* Dynamic rotating border with color shifts */}
              <div className="absolute inset-0 rounded-full opacity-60 rotating-border" />

              {/* Pulsing inner glow */}
              <div
                className={`absolute inset-2 rounded-full opacity-40 pulsing-glow ${
                  isTransitioning ? "transitioning" : ""
                }`}
              />

              {/* Morphing shape overlay */}
              <div
                className={`absolute inset-4 rounded-full opacity-20 morphing-overlay ${
                  isTransitioning ? "transitioning" : ""
                }`}
              />

              {/* Floating particles with dynamic positioning */}
              <div className="absolute inset-0 rounded-full overflow-hidden">
                {[...Array(8)].map((_, i) => (
                  <div
                    key={i}
                    className={`particle particle-${i} ${
                      isTransitioning ? "transitioning" : ""
                    }`}
                  />
                ))}
              </div>

              {/* Ripple effect during transitions */}
              {isTransitioning && <div className="ripple-effect" />}
            </>
          )}
        </div>
      </div>

      {/* Dynamic styles without inline style attributes */}
      <style jsx>{`
        .rotating-border {
          background: conic-gradient(
            from ${currentImageIndex * 60}deg,
            #3b82f6,
            #8b5cf6,
            #ec4899,
            #f59e0b,
            #10b981,
            #3b82f6
          );
          transform: rotate(${currentImageIndex * 45}deg);
        }

        .pulsing-glow {
          background: radial-gradient(
            circle,
            ${glowColors[currentImageIndex % 3]} 0%,
            transparent 60%
          );
        }

        .pulsing-glow.transitioning {
          transform: scale(1.1);
        }

        .morphing-overlay {
          transform: rotate(${currentImageIndex * 120}deg) scale(1);
        }

        .morphing-overlay.transitioning {
          transform: rotate(${currentImageIndex * 120}deg) scale(1.2);
        }

        ${[...Array(8)]
          .map(
            (_, i) => `
          .particle-${i} {
            left: ${15 + i * 12 + Math.sin(currentImageIndex + i) * 10}%;
            top: ${20 + i * 8 + Math.cos(currentImageIndex + i) * 15}%;
          }
        `
          )
          .join("")}
      `}</style>
    </>
  );
};

export default AnimatedProfilePic;
