"use client";

import { useState, useEffect } from "react";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { motion, useInView, Variants } from "framer-motion";
import { useRef } from "react";

// ============================================================================
// LUXURY SECTION WRAPPER - Reusable Component for Premium Scroll Animations
// ============================================================================

interface LuxurySectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number; // Custom delay for this section
  staggerChildren?: number; // Time between child animations
  once?: boolean; // Trigger animation only once
}

/**
 * LuxurySection - Premium scroll animation wrapper
 *
 * Features:
 * - Fade-up animation with subtle slide (40-60px)
 * - Soft cubic-bezier easing for luxurious feel
 * - Viewport-triggered animations
 * - Stagger support for child elements
 *
 * Usage:
 * <LuxurySection>
 *   <motion.h2 variants={fadeUpVariants}>Title</motion.h2>
 *   <motion.p variants={fadeUpVariants}>Description</motion.p>
 * </LuxurySection>
 */
export function LuxurySection({
  children,
  className = "",
  delay = 0,
  staggerChildren = 0.15,
  once = true,
}: LuxurySectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once, // Animation triggers only once when scrolling into view
    margin: "-100px", // Trigger slightly before element enters viewport
  });

  // Container animation variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        delay,
        // Stagger children for cinematic effect
        staggerChildren,
        // Soft luxury easing curve
        ease: [0.25, 0.1, 0.25, 1.0], // cubic-bezier
      },
    },
  };

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={containerVariants}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ============================================================================
// ANIMATION VARIANTS - Reusable for consistency across all sections
// ============================================================================

/**
 * fadeUpVariants - Standard fade-up animation for text and content
 * Translation: 50px (medium luxury motion)
 */
export const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50, // Subtle upward motion
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1.0], // Soft cubic-bezier
    },
  },
};

/**
 * fadeUpLargeVariants - Larger motion for hero sections
 * Translation: 60px (maximum luxury motion)
 */
export const fadeUpLargeVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 60,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.0,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
};

/**
 * scaleUpVariants - Subtle scale animation for images
 * Creates premium "reveal" effect
 */
export const scaleUpVariants: Variants = {
  hidden: {
    opacity: 0,
    scale: 0.95, // Start slightly smaller
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 1.0,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
};

/**
 * imageRevealVariants - Combines fade, slide, and scale for images
 * Maximum luxury effect for visual content
 */
export const imageRevealVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.96,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 1.2,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
};

// ============================================================================
// PROJECTS SECTION - Enhanced with Luxury Animations
// ============================================================================

interface Project {
  id: number;
  title: string;
  location: string;
  coverImage: string;
  images: string[];
}

export default function Projects() {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const projects: Project[] = [
    {
      id: 1,
      title: "თანამედროვე მისაღები",
      location: "ვაკე, თბილისი",
      coverImage: "/assets/images/living-1.jpg",
      images: [
        "/assets/images/living-1.jpg",
        "/assets/images/living-2.jpg",
        "/assets/images/living-3.jpg",
      ],
    },
    {
      id: 2,
      title: "ლუქს სამზარეულო",
      location: "საბურთალო, თბილისი",
      coverImage: "/assets/images/kitchen-1.jpg",
      images: [
        "/assets/images/kitchen-1.jpg",
        "/assets/images/kitchen-new-2.jpg",
        "/assets/images/kitchen-new-3.jpg",
      ],
    },
    {
      id: 3,
      title: "მინიმალისტური საძინებელი",
      location: "დიღომი, თბილისი",
      coverImage: "/assets/images/bedroom-1.jpg",
      images: [
        "/assets/images/bedroom-1.jpg",
        "/assets/images/bedroom-1.jpg",
        "/assets/images/bedroom-1.jpg",
      ],
    },
    {
      id: 4,
      title: "თანამედროვე სალონი",
      location: "ვერა, თბილისი",
      coverImage: "/assets/images/salon-1.jpg",
      images: [
        "/assets/images/salon-1.jpg",
        "/assets/images/office-1.jpeg",
        "/assets/images/office-2.jpeg",
      ],
    },
    {
      id: 5,
      title: "სასადილო სივრცე",
      location: "მთაწმინდა, თბილისი",
      coverImage: "/assets/images/dining-1.jpg",
      images: [
        "/assets/images/dining-1.jpg",
        "/assets/images/dinning-1.jpg",
        "/assets/images/dinning-1.jpg",
      ],
    },
    {
      id: 6,
      title: "ელეგანტური აბაზანა",
      location: "ვაკე, თბილისი",
      coverImage: "/assets/images/bathroom-1.jpg",
      images: [
        "/assets/images/bathroom-1.jpg",
        "/assets/images/bathroom-1.jpg",
        "/assets/images/bathroom-1.jpg",
      ],
    },
  ];

  const openModal = (project: Project) => {
    setSelectedProject(project);
    setCurrentImageIndex(0);
    document.body.style.overflow = "hidden";
  };

  const closeModal = () => {
    setSelectedProject(null);
    setCurrentImageIndex(0);
    document.body.style.overflow = "unset";
  };

  const nextImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === selectedProject.images.length - 1 ? 0 : prev + 1
      );
    }
  };

  const prevImage = () => {
    if (selectedProject) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? selectedProject.images.length - 1 : prev - 1
      );
    }
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedProject) return;
      if (e.key === "Escape") closeModal();
      if (e.key === "ArrowLeft") prevImage();
      if (e.key === "ArrowRight") nextImage();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [selectedProject, currentImageIndex]);

  return (
    <>
      <LuxurySection
        className="py-20 lg:py-32 px-6 lg:px-20 bg-white"
        staggerChildren={0.2}
      >
        <section id="projects" className="max-w-[1600px] mx-auto scroll-mt-40">
          {/* Header - Title Left, Description Right */}
          <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 mb-16 lg:mb-24">
            <motion.div variants={fadeUpLargeVariants}>
              <h2 className="text-3xl lg:text-6xl xl:text-7xl  text-stone-900 tracking-tight leading-[1.1]">
                ჩვენი პროექტები
              </h2>
            </motion.div>
            <motion.div variants={fadeUpVariants} className="flex items-center">
              <p className="text-base lg:text-lg text-stone-600 leading-relaxed">
                გაეცანით ჩვენი დახვეწილი ინტერიერის დიზაინის პორტფოლიოს.
                თითოეული პროექტი ასახავს ჩვენს ერთგულებას შევქმნათ მარადიული
                დიზაინი, სადაც ფუნქციონალურობა და ესთეტიკა ერთიანდება.
              </p>
            </motion.div>
          </div>

          {/* Masonry Grid - Column-based Layout with Staggered Animations */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Column 1 */}
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-col gap-6"
            >
              <ProjectCard
                project={projects[0]}
                isTall={false}
                onClick={() => openModal(projects[0])}
              />
              <ProjectCard
                project={projects[3]}
                isTall={true}
                onClick={() => openModal(projects[3])}
              />
            </motion.div>

            {/* Column 2 */}
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-col gap-6"
            >
              <ProjectCard
                project={projects[1]}
                isTall={true}
                onClick={() => openModal(projects[1])}
              />
              <ProjectCard
                project={projects[4]}
                isTall={false}
                onClick={() => openModal(projects[4])}
              />
            </motion.div>

            {/* Column 3 */}
            <motion.div
              variants={fadeUpVariants}
              className="flex flex-col gap-6"
            >
              <ProjectCard
                project={projects[2]}
                isTall={false}
                onClick={() => openModal(projects[2])}
              />
              <ProjectCard
                project={projects[5]}
                isTall={true}
                onClick={() => openModal(projects[5])}
              />
            </motion.div>
          </div>
        </section>
      </LuxurySection>

      {/* Project Modal */}
      {selectedProject && (
        <ProjectModal
          project={selectedProject}
          currentImageIndex={currentImageIndex}
          onClose={closeModal}
          onNext={nextImage}
          onPrev={prevImage}
          onSelectImage={setCurrentImageIndex}
        />
      )}
    </>
  );
}

function ProjectCard({
  project,
  isTall,
  onClick,
}: {
  project: Project;
  isTall: boolean;
  onClick: () => void;
}) {
  return (
    <div
      onClick={onClick}
      className={`group cursor-pointer relative overflow-hidden rounded-3xl w-full ${
        isTall
          ? "aspect-square sm:aspect-[3/5]"
          : "aspect-square sm:aspect-square"
      }`}
    >
      {/* Background Image with scale animation on hover */}
      <div className="relative w-full h-full">
        <img
          src={project.coverImage}
          alt={project.title}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
        />
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80 group-hover:opacity-90 transition-opacity duration-500" />

      {/* Text Content */}
      <div className="absolute bottom-0 left-0 p-6 lg:p-8 text-white">
        <h3 className="text-xl lg:text-2xl  mb-2 tracking-tight">
          {project.title}
        </h3>
        <p className="text-sm text-white/90">{project.location}</p>
      </div>
    </div>
  );
}

function ProjectModal({
  project,
  currentImageIndex,
  onClose,
  onNext,
  onPrev,
  onSelectImage,
}: {
  project: Project;
  currentImageIndex: number;
  onClose: () => void;
  onNext: () => void;
  onPrev: () => void;
  onSelectImage: (index: number) => void;
}) {
  const [touchStart, setTouchStart] = useState(0);
  const [touchEnd, setTouchEnd] = useState(0);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStart(e.targetTouches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const handleTouchEnd = () => {
    if (touchStart - touchEnd > 75) onNext();
    if (touchStart - touchEnd < -75) onPrev();
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-50 bg-black/96 backdrop-blur-sm"
      onClick={onClose}
    >
      {/* Close Button */}
      <div className="absolute top-0 left-0 right-0 z-20 bg-gradient-to-b from-black/60 to-transparent p-6 md:p-8 pointer-events-none">
        <div className="max-w-7xl mx-auto flex justify-end items-start">
          <button
            onClick={(e) => {
              e.stopPropagation();
              onClose();
            }}
            className="pointer-events-auto text-white/60 hover:text-white transition-colors p-2 hover:bg-white/10 rounded-full"
            aria-label="Close gallery"
          >
            <X className="w-7 h-7 md:w-8 md:h-8" strokeWidth={1.5} />
          </button>
        </div>
      </div>

      {/* Main Image Slider */}
      <div
        className="absolute inset-0 flex items-center justify-center px-4 md:px-16"
        onClick={(e) => e.stopPropagation()}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        <div className="relative w-full max-w-6xl h-[100vh]">
          {/* Images */}
          <div className="relative w-full h-full">
            {project.images.map((image, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{
                  opacity: index === currentImageIndex ? 1 : 0,
                  scale: index === currentImageIndex ? 1 : 0.95,
                  x: `${(index - currentImageIndex) * 100}%`,
                }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.1, 0.25, 1.0],
                }}
                className="absolute inset-0"
              >
                <img
                  src={image}
                  className="w-full h-full object-cover"
                  alt={`${project.title} - ${index + 1}`}
                />
              </motion.div>
            ))}
          </div>

          {/* Navigation Arrows */}
          {project.images.length > 1 && (
            <>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onPrev();
                }}
                className="absolute left-0 md:-left-16 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-all duration-300 p-3 hover:bg-white/5 rounded-full"
                aria-label="Previous image"
              >
                <ChevronLeft
                  className="w-8 h-8 md:w-10 md:h-10"
                  strokeWidth={1}
                />
              </button>

              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onNext();
                }}
                className="absolute right-0 md:-right-16 top-1/2 -translate-y-1/2 text-white/50 hover:text-white transition-all duration-300 p-3 hover:bg-white/5 rounded-full"
                aria-label="Next image"
              >
                <ChevronRight
                  className="w-8 h-8 md:w-10 md:h-10"
                  strokeWidth={1}
                />
              </button>
            </>
          )}
        </div>
      </div>

      {/* Footer - Counter & Thumbnails */}
      <div
        className="absolute bottom-0 left-0 right-0 z-20 bg-gradient-to-t from-black/60 to-transparent p-6 md:p-8 pointer-events-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="max-w-7xl mx-auto">
          {/* Image Counter */}
          <div className="text-center text-white/70 text-sm md:text-base mb-4">
            {currentImageIndex + 1} / {project.images.length}
          </div>

          {/* Thumbnail Navigation */}
          {project.images.length > 1 && (
            <div className="flex justify-center gap-2 md:gap-3 overflow-x-auto pb-2 pt-3 pointer-events-auto">
              {project.images.map((image, index) => (
                <button
                  key={index}
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectImage(index);
                  }}
                  className={`relative flex-shrink-0 w-16 h-16 md:w-20 md:h-20 overflow-hidden rounded-lg transition-all duration-300 ${
                    index === currentImageIndex
                      ? "ring-2 ring-white/80 scale-105 opacity-100"
                      : "opacity-40 hover:opacity-70"
                  }`}
                >
                  <img
                    src={image}
                    className="w-full h-full object-cover"
                    alt={`Thumbnail ${index + 1}`}
                  />
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
}
