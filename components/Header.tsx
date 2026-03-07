"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// Navigation configuration
const NAV_LINKS = [
  { href: "#about", label: "ჩვენ შესახებ", id: "about" },
  { href: "#projects", label: "პროექტები", id: "projects" },
  { href: "#services", label: "სერვისები", id: "services" },
  { href: "#contact", label: "კონტაქტი", id: "contact" },
] as const;

export default function HeaderWithBadge() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState<string | null>(null);
  const [showTooltip, setShowTooltip] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLinkClick = () => {
    setIsMobileMenuOpen(false);
  };

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    let visibleSection: string | null = null;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            visibleSection = entry.target.id;
          }
        });

        if (!entries.some((e) => e.isIntersecting)) {
          setActiveSection(null);
        } else if (visibleSection) {
          setActiveSection(visibleSection);
        }
      },
      {
        threshold: 0.4,
      }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      {/* Floating Demo Badge - Bottom Right */}
      <div className="fixed bottom-6 right-6 z-50">
        <div
          className="relative"
          onMouseEnter={() => setShowTooltip(true)}
          onMouseLeave={() => setShowTooltip(false)}
          onClick={() => setShowTooltip(!showTooltip)}
        >
          {/* Badge */}
          <div className="bg-stone-900 text-white px-4 py-2 rounded-full text-xs font-medium tracking-wide cursor-pointer hover:bg-stone-800 transition-colors duration-300 shadow-lg">
            დემო ვერსია
          </div>

          {/* Tooltip */}
          <div
            className={`absolute bottom-full right-0 mb-3 w-64 bg-white text-stone-900 px-4 py-3 rounded-lg shadow-xl border border-stone-200 text-sm transition-all duration-300 ${
              showTooltip
                ? "opacity-100 visible translate-y-0"
                : "opacity-0 invisible translate-y-2"
            }`}
          >
            <p className="leading-relaxed">
              ეს ვებ-გვერდი არის მაგალითი და სრულად მორგებადია თქვენს ბიზნესზე
            </p>
            {/* Tooltip Arrow */}
            <div className="absolute -bottom-1 right-6 w-2 h-2 bg-white border-r border-b border-stone-200 transform rotate-45"></div>
          </div>
        </div>
      </div>

      {/* Header */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-in-out px-4 md:px-0 ${
          isScrolled ? "bg-white/90 backdrop-blur-lg" : "bg-transparent"
        }`}
      >
        <div className="mx-auto px-6 md:px-12">
          <div className="flex items-center justify-between h-20 lg:h-24">
            {/* Logo */}
            <Link href="/" className="flex items-center">
              <Image
                src="/assets/images/logo.jpg"
                alt="ComfortProGeorgia"
                width={200}
                height={200}
                className="object-cover h-14 w-14 rounded-full"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-12">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`relative text-sm tracking-wider uppercase transition-colors duration-300
                    after:content-[''] after:absolute after:left-0 after:-bottom-2
                    after:h-[1px] after:w-full after:origin-left
                    after:transition-transform after:duration-500 after:ease-out
                    ${
                      isScrolled
                        ? `after:bg-stone-900 ${
                            activeSection === link.id
                              ? "text-stone-900 after:scale-x-100"
                              : "text-stone-600 after:scale-x-0 hover:text-stone-900 hover:after:scale-x-100"
                          }`
                        : `after:bg-white ${
                            activeSection === link.id
                              ? "text-white after:scale-x-100"
                              : "text-white/80 after:scale-x-0 hover:text-white hover:after:scale-x-100"
                          }`
                    }`}
                >
                  {link.label}
                </Link>
              ))}

              {/* Consultation Button */}
              <Link
                href="#contact"
                className={`ml-4 px-6 py-2.5 text-sm tracking-wider uppercase border transition-all duration-300 ${
                  isScrolled
                    ? "border-stone-300 text-stone-900 hover:bg-stone-900 hover:text-white hover:border-stone-900"
                    : "border-white text-white hover:bg-white hover:text-stone-900"
                }`}
              >
                კონსულტაცია
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden flex flex-col gap-1.5 w-7 h-7 justify-center z-50 transition-colors duration-300"
              aria-label="Toggle menu"
            >
              {[0, 1, 2].map((index) => (
                <span
                  key={index}
                  className={`block h-[1.5px] w-full transition-all duration-300 ${
                    isMobileMenuOpen
                      ? "bg-stone-900"
                      : isScrolled
                      ? "bg-stone-900"
                      : "bg-white"
                  } ${
                    isMobileMenuOpen
                      ? index === 0
                        ? "rotate-45 translate-y-[7px]"
                        : index === 1
                        ? "opacity-0"
                        : "-rotate-45 -translate-y-[7px]"
                      : ""
                  }`}
                />
              ))}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 bg-white z-40 transition-all duration-500 lg:hidden ${
          isMobileMenuOpen
            ? "opacity-100 visible"
            : "opacity-0 invisible pointer-events-none"
        }`}
      >
        <div className="flex flex-col items-center justify-center h-full space-y-10 px-6">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              onClick={handleLinkClick}
              className="text-3xl font-light tracking-wider uppercase text-stone-900 hover:text-stone-600 transition-colors duration-300"
            >
              {link.label}
            </Link>
          ))}

          {/* Mobile CTA */}
          <Link
            href="#contact"
            onClick={handleLinkClick}
            className="mt-8 px-10 py-4 text-base tracking-wider uppercase border-2 border-stone-900 text-stone-900 hover:bg-stone-900 hover:text-white transition-all duration-300"
          >
            კონსულტაცია
          </Link>
        </div>
      </div>
    </>
  );
}
