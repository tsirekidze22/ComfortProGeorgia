// components/reusable/Slider.tsx
"use client";

import { ReactNode } from "react";
import { useSlider } from "@/hooks/useSlider";

interface SliderProps {
  slides: ReactNode[];
  autoPlayInterval?: number;
  swipeThreshold?: number;
  showDots?: boolean;
  showArrows?: boolean;
  className?: string;
  slideClassName?: string;
  dotsClassName?: string;
}

export default function Slider({
  slides,
  autoPlayInterval = 6500,
  swipeThreshold = 75,
  showDots = true,
  showArrows = false,
  className = "",
  slideClassName = "",
  dotsClassName = "",
}: SliderProps) {
  const {
    currentSlide,
    isDragging,
    goToSlide,
    nextSlide,
    prevSlide,
    handlers,
  } = useSlider({
    slideCount: slides.length,
    autoPlayInterval,
    swipeThreshold,
  });

  return (
    <div
      className={`relative w-full h-full overflow-hidden select-none ${className}`}
      {...handlers}
    >
      {/* Slides Container */}
      <div className="relative h-full w-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-transform duration-[1200ms] ease-in-out ${slideClassName}`}
            style={{
              transform: `translateX(${(index - currentSlide) * 100}%)`,
            }}
          >
            {slide}
          </div>
        ))}
      </div>

      {/* Elegant Navigation Dots - Small, minimal, calm */}
      {showDots && (
        <div
          className={`absolute bottom-12 left-1/2 -translate-x-1/2 flex gap-3 z-20 pointer-events-auto ${dotsClassName}`}
        >
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={(e) => {
                e.stopPropagation();
                goToSlide(index);
              }}
              className="transition-all duration-500 rounded-full"
              style={{
                width: currentSlide === index ? "32px" : "7px",
                height: "7px",
                backgroundColor:
                  currentSlide === index
                    ? "rgba(255, 255, 255, 0.9)"
                    : "rgba(255, 255, 255, 0.35)",
              }}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>
      )}

      {/* Subtle Arrows (for portfolio/gallery, not hero) */}
      {showArrows && (
        <>
          <button
            onClick={(e) => {
              e.stopPropagation();
              prevSlide();
            }}
            className="absolute left-4 md:left-8 top-1/2 -translate-y-1/2 z-20 text-white/60 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 pointer-events-auto"
            aria-label="Previous slide"
          >
            <svg
              className="w-8 h-8 md:w-10 md:h-10"
              fill="none"
              stroke="currentColor"
              strokeWidth={1}
              viewBox="0 0 24 24"
            >
              <path d="M15 19l-7-7 7-7" />
            </svg>
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              nextSlide();
            }}
            className="absolute right-4 md:right-8 top-1/2 -translate-y-1/2 z-20 text-white/60 hover:text-white transition-all duration-300 opacity-0 group-hover:opacity-100 pointer-events-auto"
            aria-label="Next slide"
          >
            <svg
              className="w-8 h-8 md:w-10 md:h-10"
              fill="none"
              stroke="currentColor"
              strokeWidth={1}
              viewBox="0 0 24 24"
            >
              <path d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </>
      )}
    </div>
  );
}
