"use client";

import { useState, useRef } from "react";
import { Mail, Phone, MapPin, Send, Check, Loader2 } from "lucide-react";
import { motion, useInView, Variants } from "framer-motion";
import Image from "next/image";

// ============================================================================
// ANIMATION SYSTEM
// ============================================================================

interface LuxurySectionProps {
  children: React.ReactNode;
  className?: string;
  delay?: number;
  staggerChildren?: number;
  once?: boolean;
}

function LuxurySection({
  children,
  className = "",
  delay = 0,
  staggerChildren = 0.15,
  once = true,
}: LuxurySectionProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, {
    once,
    margin: "-100px",
  });

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.6,
        delay,
        staggerChildren,
        ease: [0.25, 0.1, 0.25, 1.0],
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

// Animation variants
const fadeUpVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50,
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: [0.25, 0.1, 0.25, 1.0],
    },
  },
};

const fadeUpLargeVariants: Variants = {
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

// ============================================================================
// CONTACT COMPONENT - MOBILE OPTIMIZED
// ============================================================================

export default function Contact() {
  const [focusedField, setFocusedField] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [showWhatsApp, setShowWhatsApp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
    website: "",
  });
  const [errors, setErrors] = useState<any>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const WHATSAPP_NUMBER = "995599019288";

  const validateForm = () => {
    const newErrors: any = {};
    if (!formData.name || formData.name.length < 2) {
      newErrors.name = "სახელი უნდა იყოს მინიმუმ 2 სიმბოლო";
    }
    if (!formData.phone) {
      newErrors.phone = "ტელეფონი სავალდებულოა";
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    try {
      if (formData.website) {
        console.log("🤖 Bot detected");
        setIsSubmitted(true);
        setShowWhatsApp(true);
        setIsSubmitting(false);
        return;
      }

      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          message: formData.message,
          source: "website",
        }),
      });

      const data = await response.json();

      setIsSubmitted(true);
      setShowWhatsApp(true);

      if (data.emailFailed) {
        console.log("📧 Email delivery uncertain, showing WhatsApp option");
        setTimeout(() => {
          window.open(`https://wa.me/${WHATSAPP_NUMBER}`, "_blank");
        }, 3000);
      }

      setTimeout(() => {
        setIsSubmitted(false);
        setShowWhatsApp(false);
        setFormData({ name: "", phone: "", message: "", website: "" });
        setErrors({});
      }, 5000);
    } catch (error) {
      console.error("Submit error:", error);
      setIsSubmitted(true);
      setShowWhatsApp(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (errors[e.target.name]) {
      setErrors({ ...errors, [e.target.name]: "" });
    }
  };

  return (
    <LuxurySection
      className="py-20 lg:py-32 px-6 lg:px-20 bg-stone-50 scroll-mt-32"
      staggerChildren={0.18}
    >
      <section id="contact" className="max-w-[1600px] mx-auto scroll-mt-12">
        {/* Success Modal */}
        {isSubmitted && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1.0] }}
              className="bg-white rounded-3xl p-6 sm:p-8 lg:p-12 max-w-md w-full text-center shadow-2xl"
            >
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl sm:text-2xl text-stone-900 mb-4">
                თქვენი მოთხოვნა მიღებულია ✅
              </h3>
              <p className="text-sm sm:text-base text-stone-600 mb-6">
                ჩვენ დაგიკავშირდებით მაქსიმუმ 10 წუთში.
              </p>
              {showWhatsApp && (
                <>
                  <p className="text-xs sm:text-sm text-stone-500 mb-4">
                    თუ პასუხი არ მიგიღიათ - მოგვწერეთ WhatsApp-ზე.
                  </p>
                  <a
                    href={`https://wa.me/${WHATSAPP_NUMBER}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-green-500 text-white px-6 py-3.5 rounded-full hover:bg-green-600 transition-colors min-h-[48px]"
                  >
                    <svg
                      className="w-5 h-5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                    >
                      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                    </svg>
                    WhatsApp-ით დაკავშირება
                  </a>
                </>
              )}
            </motion.div>
          </motion.div>
        )}

        {/* Header */}
        <div className="md:text-center mb-16 lg:mb-24">
          <motion.div
            variants={fadeUpVariants}
            className="inline-block border border-stone-300 px-6 py-2 rounded-full mb-6"
          >
            <span className="text-xs uppercase tracking-[0.2em] text-stone-700">
              კონტაქტი
            </span>
          </motion.div>
          <motion.h2
            variants={fadeUpLargeVariants}
            className="text-3xl sm:text-3xl lg:text-6xl xl:text-7xl text-stone-900 tracking-tight leading-[1.3] sm:leading-[1.4] mb-6"
          >
            დავიწყოთ თქვენი
            <br />
            ოცნების პროექტი
          </motion.h2>
          <motion.p
            variants={fadeUpVariants}
            className="text-sm sm:text-base lg:text-lg text-stone-600 max-w-2xl mx-auto leading-relaxed"
          >
            გაგვიზიარეთ თქვენი ხედვა და ჩვენ მას რეალობად ვაქცევთ, რომელიც
            თქვენს მოლოდინს გადააჭარბებს.
          </motion.p>
        </div>

        {/* Main Grid - Reordered for Mobile */}
        <div className="grid lg:grid-cols-5 gap-8 lg:gap-12">
          {/* Right Side - Contact Form (First on Mobile) */}
          <motion.div
            variants={fadeUpVariants}
            className="lg:col-span-3 flex order-1 lg:order-2"
          >
            <div className="bg-white rounded-[24px] p-4 md:p-8 lg:p-12 border border-stone-200 shadow-sm w-full">
              <div className="space-y-6">
                {/* Name Input */}
                <div className="relative">
                  <label
                    htmlFor="name"
                    className={`absolute left-6 transition-all duration-300 pointer-events-none ${
                      focusedField === "name" || formData.name
                        ? "top-2 text-xs text-stone-500"
                        : "top-6 text-base text-stone-400"
                    }`}
                  >
                    თქვენი სახელი *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("name")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full pt-8 pb-4 px-6 bg-stone-50 border-2 rounded-2xl outline-none transition-all duration-300 min-h-[56px] ${
                      focusedField === "name"
                        ? "border-stone-900 bg-white"
                        : errors.name
                          ? "border-red-500"
                          : "border-transparent hover:border-stone-200"
                    }`}
                  />
                  {errors.name && (
                    <div className="text-red-500 text-sm mt-1 ml-2">
                      {errors.name}
                    </div>
                  )}
                </div>

                {/* Phone Input */}
                <div className="relative">
                  <label
                    htmlFor="phone"
                    className={`absolute left-6 transition-all duration-300 pointer-events-none ${
                      focusedField === "phone" || formData.phone
                        ? "top-2 text-xs text-stone-500"
                        : "top-6 text-base text-stone-400"
                    }`}
                  >
                    ტელეფონის ნომერი *
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    onFocus={() => setFocusedField("phone")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full pt-8 pb-4 px-6 bg-stone-50 border-2 rounded-2xl outline-none transition-all duration-300 min-h-[56px] ${
                      focusedField === "phone"
                        ? "border-stone-900 bg-white"
                        : errors.phone
                          ? "border-red-500"
                          : "border-transparent hover:border-stone-200"
                    }`}
                  />
                  {errors.phone && (
                    <div className="text-red-500 text-sm mt-1 ml-2">
                      {errors.phone}
                    </div>
                  )}
                </div>

                {/* Honeypot field (hidden) */}
                <input
                  type="text"
                  name="website"
                  value={formData.website}
                  onChange={handleChange}
                  style={{ position: "absolute", left: "-9999px" }}
                  tabIndex={-1}
                  autoComplete="off"
                />

                {/* Message Textarea */}
                <div className="relative">
                  <label
                    htmlFor="message"
                    className={`absolute left-6 transition-all duration-300 pointer-events-none ${
                      focusedField === "message" || formData.message
                        ? "top-2 text-xs text-stone-500"
                        : "top-6 text-base text-stone-400"
                    }`}
                  >
                    გვიამბეთ თქვენი პროექტის შესახებ
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    rows={5}
                    onFocus={() => setFocusedField("message")}
                    onBlur={() => setFocusedField(null)}
                    className={`w-full pt-8 pb-4 px-6 bg-stone-50 border-2 rounded-2xl outline-none transition-all duration-300 resize-none ${
                      focusedField === "message"
                        ? "border-stone-900 bg-white"
                        : "border-transparent hover:border-stone-200"
                    }`}
                  />
                </div>

                {/* Submit Button */}
                <button
                  onClick={handleSubmit}
                  disabled={isSubmitting}
                  className={`w-full py-5 px-8 rounded-2xl text-base transition-all duration-300 flex items-center justify-center gap-3 min-h-[56px] ${
                    isSubmitting
                      ? "bg-stone-700 text-white cursor-not-allowed"
                      : "bg-stone-900 text-white hover:bg-stone-800 hover:scale-[1.02] active:scale-[0.98]"
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      იგზავნება...
                    </>
                  ) : (
                    <>
                      შეტყობინების გაგზავნა
                      <Send className="w-5 h-5" />
                    </>
                  )}
                </button>

                {/* Privacy Text */}
                <p className="text-xs text-stone-500 text-center">
                  ფორმის გაგზავნით თქვენ ეთანხმებით ჩვენს კონფიდენციალურობის
                  პოლიტიკას.
                </p>
              </div>
            </div>
          </motion.div>

          {/* Left Side - Contact Info Cards (Second on Mobile) */}
          <motion.div
            variants={fadeUpVariants}
            className="lg:col-span-2 flex flex-col gap-6 order-2 lg:order-1"
          >
            {/* Contact Info Card */}
            <div className="bg-white rounded-[24px] p-6 lg:p-10 border border-stone-200 shadow-sm flex-1">
              <h3 className="text-xl sm:text-2xl text-stone-900 mb-8">
                საკონტაქტო ინფორმაცია
              </h3>

              <div className="space-y-6">
                {/* Email */}
                <a
                  href="mailto:comfortprogeorgia@gmail.com"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0 group-hover:bg-stone-900 transition-colors duration-300">
                    <Mail className="w-5 h-5 text-stone-700 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base text-stone-500 mb-1">
                      ელ-ფოსტა
                    </p>
                    <p className="font-mono text-base sm:text-lg text-stone-900 hover:text-stone-600 transition-colors font-medium break-all">
                      comfortprogeorgia@gmail.com
                    </p>
                  </div>
                </a>

                {/* Phone */}
                <a
                  href="tel:+995599019288"
                  className="flex items-start gap-4 group"
                >
                  <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0 group-hover:bg-stone-900 transition-colors duration-300">
                    <Phone className="w-5 h-5 text-stone-700 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base text-stone-500 mb-1">
                      ტელეფონი
                    </p>
                    <p className="font-mono text-base sm:text-lg text-stone-900 hover:text-stone-600 transition-colors font-medium">
                      +995 599 01 92 88
                    </p>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-start gap-4 group">
                  <div className="w-12 h-12 rounded-full bg-stone-100 flex items-center justify-center flex-shrink-0 group-hover:bg-stone-900 transition-colors duration-300">
                    <MapPin className="w-5 h-5 text-stone-700 group-hover:text-white transition-colors duration-300" />
                  </div>
                  <div>
                    <p className="text-sm sm:text-base text-stone-500 mb-1">
                      მისამართი
                    </p>
                    <p className="text-base sm:text-lg text-stone-900 font-medium">
                      თბილისი, საქართველო
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Image Card */}
            <div className="relative h-[200px] rounded-[24px] overflow-hidden">
              <Image
                src="/assets/images/bg-contact.jpeg"
                alt="Luxury office"
                fill
                className="object-cover transition-transform duration-700 hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
              <div className="absolute bottom-6 left-6 text-white">
                <p className="text-xs sm:text-sm uppercase tracking-wider mb-2">
                  სამუშაო საათები
                </p>
                <p className="text-sm sm:text-base font-medium font-mono">
                  ორშაბათი - პარასკევი: 9AM - 6PM
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
    </LuxurySection>
  );
}
