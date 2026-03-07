// hooks/useSlider.ts
import { useState, useEffect } from "react";

interface UseSliderProps {
  slideCount: number;
  autoPlayInterval?: number;
  swipeThreshold?: number;
}

export function useSlider({
  slideCount,
  autoPlayInterval = 5500,
  swipeThreshold = 75,
}: UseSliderProps) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);

  // Auto-play
  useEffect(() => {
    const interval = setInterval(() => {
      if (!isPaused) {
        setCurrentSlide((prev) => (prev + 1) % slideCount);
      }
    }, autoPlayInterval);

    return () => clearInterval(interval);
  }, [isPaused, slideCount, autoPlayInterval]);

  // Navigation functions
  const goToSlide = (index: number) => {
    setCurrentSlide(index);
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slideCount);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slideCount - 1 : prev - 1));
  };

  // Touch handlers
  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
    setIsPaused(true);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    const diff = touchStart - touchEnd;

    if (diff > swipeThreshold) {
      nextSlide();
    }
    if (diff < -swipeThreshold) {
      prevSlide();
    }
    setIsPaused(false);
  };

  // Mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart(e.clientX);
    setIsPaused(true);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
  };

  const handleMouseUp = (e: React.MouseEvent) => {
    if (!isDragging) return;
    setIsDragging(false);

    const dragEnd = e.clientX;
    const diff = dragStart - dragEnd;

    if (diff > swipeThreshold) {
      nextSlide();
    }
    if (diff < -swipeThreshold) {
      prevSlide();
    }
    setIsPaused(false);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      setIsDragging(false);
      setIsPaused(false);
    }
  };

  const pause = () => setIsPaused(true);
  const resume = () => setIsPaused(false);

  return {
    currentSlide,
    isPaused,
    isDragging,
    goToSlide,
    nextSlide,
    prevSlide,
    pause,
    resume,
    handlers: {
      onTouchStart: handleTouchStart,
      onTouchMove: handleTouchMove,
      onTouchEnd: handleTouchEnd,
      onMouseDown: handleMouseDown,
      onMouseMove: handleMouseMove,
      onMouseUp: handleMouseUp,
      onMouseEnter: pause,
      onMouseLeave: () => {
        resume();
        handleMouseLeave();
      },
    },
  };
}
