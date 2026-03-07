"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function Services() {
  const services = [
    {
      title: "სრული რემონტი",
      description:
        "სრული სარემონტო-სამშენებლო მომსახურება, შესრულებული მაღალი ხარისხის სტანდარტების დაცვით.",
      icon: "/assets/icons/layout.png",
    },
    {
      title: "დიზაინი",
      description:
        "ინდივიდუალური კონცეფციის შემუშავება, სტილისტური გადაწყვეტილებები და მასალების შერჩევა.",
      icon: "/assets/icons/concept.png",
    },
    {
      title: "უფასო ხარჯთაღრიცხვა",
      description:
        "პროექტის ღირებულების ზუსტი და გამჭვირვალე შეფასება — სრულიად უფასოდ.",
      icon: "/assets/icons/supervision.png",
    },
  ];

  const titleRef = useRef(null);
  const gridRef = useRef(null);

  const titleInView = useInView(titleRef, { once: true, margin: "-100px" });
  const gridInView = useInView(gridRef, { once: true, margin: "-100px" });

  const luxuryEasing: [number, number, number, number] = [
    0.25, 0.46, 0.45, 0.94,
  ];

  return (
    <section id="services" className="py-24 bg-stone-50 scroll-mt-32">
      <div className="max-w-[1600px] mx-auto px-6 md:px-12 lg:px-16">
        <motion.div
          ref={titleRef}
          initial="hidden"
          animate={titleInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
          className="md:text-center mb-10 md:mb-20"
        >
          <motion.h2
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 1, ease: luxuryEasing },
              },
            }}
            className="text-3xl md:text-5xl lg:text-7xl text-stone-900 leading-tight mb-4"
          >
            მომსახურებები
          </motion.h2>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 40 },
              visible: {
                opacity: 1,
                y: 0,
                transition: { duration: 1, ease: luxuryEasing },
              },
            }}
            className="text-stone-600 text-lg md:text-xl max-w-2xl mx-auto"
          >
            სრული რემონტი, ინტერიერის დიზაინი და უფასო ხარჯთაღრიცხვა —
            ერთიანი ხარისხის კონტროლით
          </motion.p>
        </motion.div>

        <motion.div
          ref={gridRef}
          initial="hidden"
          animate={gridInView ? "visible" : "hidden"}
          variants={{
            hidden: { opacity: 0 },
            visible: {
              opacity: 1,
              transition: {
                staggerChildren: 0.12,
              },
            },
          }}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10"
        >
          {services.map((service, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 50 },
                visible: {
                  opacity: 1,
                  y: 0,
                  transition: { duration: 1, ease: luxuryEasing },
                },
              }}
              className="relative bg-white/10 backdrop-blur-md border border-white/20 rounded-xl md:rounded-3xl md:p-10 flex flex-col items-start gap-6 transition-all duration-500 md:hover:scale-[1.03] md:hover:shadow-2xl group overflow-hidden"
            >
              <div className="w-16 h-16 flex items-center justify-center bg-white/20 rounded-full relative">
                <div className="absolute inset-0 bg-black/10 rounded-full opacity-0 group-hover:opacity-20 transition-opacity duration-500" />
                <Image
                  src={service.icon}
                  alt={service.title}
                  width={34}
                  height={34}
                  className="relative z-10 object-contain"
                />
              </div>

              <h3 className="text-2xl text-stone-900 group-hover:text-stone-800 transition-colors duration-500 leading-snug">
                {service.title}
              </h3>

              <p className="text-stone-500 text-base leading-relaxed">
                {service.description}
              </p>

              <div className="hidden md:block mt-auto w-12 h-1 bg-stone-900 rounded-full opacity-20 group-hover:opacity-50 transition-opacity duration-500" />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
