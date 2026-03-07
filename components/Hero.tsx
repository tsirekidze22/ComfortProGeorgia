"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const fadeInVariant = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      duration: 0.9,
      ease: "easeOut" as const,
    },
  },
};

const scaleInVariant = {
  hidden: { scale: 1.02, opacity: 0 },
  visible: {
    scale: 1,
    opacity: 1,
    transition: {
      duration: 1.2,
      ease: [0.6, 0.01, 0.05, 0.95] as const,
    },
  },
};

export default function Hero() {
  const [isVideoPlaying, setIsVideoPlaying] = useState(false);
  const [currentServiceIndex, setCurrentServiceIndex] = useState(0);

  const services = ["სრული რემონტი", "დიზაინი", "უფასო ხარჯთაღრიცხვა"];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentServiceIndex((prev) => (prev + 1) % services.length);
    }, 4000); // UPGRADE 2: Slowed from 3000ms to 4000ms for calmer premium feel

    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <section className="relative mx-auto px-0">
        <motion.div
          initial="hidden"
          animate="visible"
          className="relative h-[80vh] md:h-[96vh] overflow-hidden"
        >
          {/* Background - Desktop with subtle scale */}
          <motion.div
            variants={scaleInVariant}
            className="absolute inset-0 hidden md:block"
          >
            <div className="relative w-full h-full">
              <Image
                src="/assets/images/hero.jpg"
                alt="Luxury contemporary interior"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/50" />
          </motion.div>

          {/* Background - Mobile (static) */}
          <div className="absolute inset-0 md:hidden">
            <div className="relative w-full h-full">
              <Image
                src="/assets/images/hero.jpg"
                alt="Luxury contemporary interior"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute inset-0 bg-gradient-to-b from-black/45 via-black/35 to-black/55" />
          </div>

          {/* MOBILE CONTENT */}
          <div className="md:hidden absolute inset-0 flex flex-col items-center justify-center px-6">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center w-full"
            >
              {/* Eyebrow badge */}
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 bg-white/15 backdrop-blur-sm border border-white/30 px-4 py-2 rounded-full mb-6"
              >
                <span className="text-green-400 text-sm">✓</span>
                <span className="text-white/90 text-sm font-medium tracking-wide">
                  სრული მომსახურება
                </span>
              </motion.div>

              <h1 className="text-4xl font-bold text-white leading-[1.3] mb-4">
                დახვეწილი და თანამედროვე ინტერიერები
              </h1>

              {/* Service Rotation - Mobile */}
              <div className="h-10 mb-8 flex items-center justify-center">
                <motion.p
                  key={currentServiceIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.9, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.6 }}
                  className="text-xl text-white/90 font-light"
                >
                  {services[currentServiceIndex]}
                </motion.p>
              </div>

              {/* CTAs - Mobile */}
              <motion.div
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="flex flex-col gap-3"
              >
                <Link
                  href="#contact"
                  className="w-full py-4 bg-white inline-block text-stone-900 font-medium rounded-xl hover:bg-white/95 transition-colors duration-200"
                >
                  კონსულტაციის დაჯავშნა
                </Link>
                <Link
                  href="#projects"
                  className="w-full py-3.5 border border-white/50 text-white font-medium rounded-xl hover:bg-white/10 transition-colors duration-200 flex items-center justify-center gap-2"
                >
                  პროექტები
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17 8l4 4m0 0l-4 4m4-4H3"
                    />
                  </svg>
                </Link>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll indicator - Mobile only */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2, duration: 0.6 }}
            className="md:hidden absolute bottom-8 left-0 right-0 flex justify-center"
          >
            <Link href="#about">
              <motion.div
                animate={{ y: [0, 8, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.6,
                  ease: "easeInOut",
                }}
                className="text-white/50 hover:text-white/90 transition-colors"
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </motion.div>
            </Link>
          </motion.div>

          {/* DESKTOP CONTENT - Eyebrow + Headline + Service Rotation + CTA */}
          <motion.div
            variants={fadeInVariant}
            className="hidden md:flex absolute inset-0 items-center justify-center"
          >
            <div className="text-center px-4">
              {/* UPGRADE 1: Eyebrow Line - Desktop Only */}
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 0.7, y: 0 }}
                transition={{ duration: 0.7, delay: 0.2 }}
                className="text-sm lg:text-base uppercase tracking-[0.2em] text-white/90 font-light mb-6"
              >
                სრული სერვისი - დიზაინიდან ჩაბარებამდე
              </motion.p>

              <h1 className="text-6xl lg:text-7xl xl:text-8xl font-bold text-white leading-tight max-w-[1400px]">
                დახვეწილი და თანამედროვე ინტერიერები
              </h1>

              {/* Service Rotation */}
              <div className="h-12 mt-10 flex items-center justify-center">
                <motion.p
                  key={currentServiceIndex}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 0.9, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.6 }}
                  className="text-2xl lg:text-4xl text-white/90 font-light"
                >
                  {services[currentServiceIndex]}
                </motion.p>
              </div>

              {/* Primary CTA - Desktop with UPGRADE 3: Subtle shadow on hover */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="mt-10"
              >
                <Link
                  href="#contact"
                  className="px-11 py-5 bg-white text-[16px] inline-block text-stone-900 rounded-lg hover:bg-white/95 hover:shadow-lg transition-all duration-200"
                >
                  კონსულტაციის დაჯავშნა
                </Link>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </section>
    </>
  );
}
