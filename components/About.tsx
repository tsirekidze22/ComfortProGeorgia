"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode, useEffect, useState } from "react";
import Image from "next/image";

interface LuxurySectionProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  staggerChildren?: number;
}

export function LuxurySection({
  children,
  className = "",
  delay = 0,
  staggerChildren = 0.1,
}: LuxurySectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  const luxuryEasing: [number, number, number, number] = [
    0.25, 0.46, 0.45, 0.94,
  ];

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{
        duration: 1.2,
        delay,
        ease: luxuryEasing,
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * LuxuryStagger - Wrapper for staggered child animations
 * Use this to wrap multiple elements that should animate in sequence
 */

interface LuxuryStaggerProps {
  children: ReactNode;
  className?: string;
  staggerDelay?: number;
}

export function LuxuryStagger({
  children,
  className = "",
  staggerDelay = 0.15,
}: LuxuryStaggerProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once: true,
    margin: "-100px",
  });

  const luxuryEasing: [number, number, number, number] = [
    0.25, 0.46, 0.45, 0.94,
  ];

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: { opacity: 0 },
        visible: {
          opacity: 1,
          transition: {
            staggerChildren: staggerDelay,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/**
 * LuxuryItem - Individual animated item for use within LuxuryStagger
 */

interface LuxuryItemProps {
  children: ReactNode;
  className?: string;
  yOffset?: number;
}

export function LuxuryItem({
  children,
  className = "",
  yOffset = 40,
}: LuxuryItemProps) {
  const luxuryEasing: [number, number, number, number] = [
    0.25, 0.46, 0.45, 0.94,
  ];

  return (
    <motion.div
      variants={{
        hidden: { opacity: 0, y: yOffset },
        visible: {
          opacity: 1,
          y: 0,
          transition: {
            duration: 1,
            ease: luxuryEasing,
          },
        },
      }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);

  const stats = [
    { number: 12, label: "პროექტი", suffix: "+" },
    { number: 4, label: "წლის გამოცდილება", suffix: "+" },
    { number: 20, label: "კმაყოფილი კლიენტი", suffix: "+" },
    { number: 25, label: "დასაქმებული პროფესიონალი", suffix: "+" },
  ];

  return (
    <section id="about" className="py-20 lg:py-32 px-6 lg:px-20 bg-white">
      <div className="max-w-[1600px] mx-auto">
        {/* Main Grid - Video + Right Text */}
        <LuxurySection className="grid lg:grid-cols-12 gap-6 mb-16 lg:mb-20">
          {/* Left Section - Video */}
          <LuxuryItem className="hidden md:block lg:col-span-7 relative h-[500px] lg:h-[650px] bg-stone-100 rounded-[32px] overflow-hidden">
            {!isVideoPlaying ? (
              <>
                <div className="relative w-full h-full">
                  <Image
                    src="/assets/images/about-bg.jpg"
                    alt="Interior design video"
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="absolute inset-0 bg-black/20" />
                <button
                  onClick={() => setIsVideoPlaying(true)}
                  className="absolute inset-0 flex items-center justify-center group"
                  aria-label="Play video"
                >
                  <div className="w-20 h-20 bg-white rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <svg
                      className="w-8 h-8 text-stone-900 ml-1"
                      fill="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </button>
              </>
            ) : (
              <video
                src="/assets/videos/main-video.mp4"
                className="w-full h-full object-cover"
                autoPlay
                controls
                playsInline
              />
            )}
          </LuxuryItem>

          {/* Right Section - Staggered text content */}
          <LuxuryStagger className="lg:col-span-5 flex flex-col justify-center gap-8">
            <LuxuryItem>
              <h2 className="text-3xl lg:text-7xl text-stone-900 leading-tight">
                ჩვენი გუნდის შესახებ
              </h2>
            </LuxuryItem>

            <LuxuryItem>
              <p className="text-stone-600 text-lg lg:text-xl leading-relaxed max-w-lg">
                ჩვენი გამოცდილი დიზაინერების, არქიტექტორებისა და ოსტატების გუნდი
                ყოველი პროექტის შესრულებისას ფუნქციონალურობისა და ელეგანტურობის
                იდეალურ ბალანსს ქმნის. ჩვენი გატაცებაა ისეთი სივრცეების შექმნა,
                რომლებიც გამოხატავს დახვეწილობას, კომფორტს და მარადიულ სტილს.
              </p>
            </LuxuryItem>

            <LuxuryItem>
              <p className="text-stone-500 text-base lg:text-lg leading-relaxed max-w-lg">
                მინიმალისტურ და თანამედროვე ესთეტიკაზე ფოკუსირებით, ჩვენ
                ვეხმარებით კლიენტებს იდეის ჩასახვიდან პროექტის დასრულებამდე,
                რათა ყოველი დეტალი მოლოდინს გადააჭარბოს.
              </p>
            </LuxuryItem>
          </LuxuryStagger>
        </LuxurySection>

        {/* Stats Section - Animated with stagger */}
        <LuxuryStagger
          className="grid grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12"
          staggerDelay={0.15}
        >
          {stats.map((stat, index) => (
            <LuxuryItem key={index}>
              <StatCard
                number={stat.number}
                label={stat.label}
                suffix={stat.suffix}
              />
            </LuxuryItem>
          ))}
        </LuxuryStagger>
      </div>
    </section>
  );
}

function StatCard({
  number,
  label,
  suffix,
}: {
  number: number;
  label: string;
  suffix: string;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!isInView) return;

    const duration = 2000;
    const steps = 60;
    const increment = number / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += increment;
      if (current >= number) {
        setCount(number);
        clearInterval(timer);
      } else {
        setCount(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [isInView, number]);

  return (
    <div ref={ref} className="text-center">
      <div className="font-mono text-5xl lg:text-6xl xl:text-7xl text-stone-900 mb-2 tracking-tight">
        {count}
        {suffix}
      </div>
      <div className="text-sm lg:text-base text-stone-600 uppercase tracking-wider font-medium">
        {label}
      </div>
    </div>
  );
}
