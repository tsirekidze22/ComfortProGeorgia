"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Mail,
  Phone,
  Facebook,
  Instagram,
  Linkedin,
  LucideIcon,
} from "lucide-react";

// Footer data configuration
const COMPANY_LINKS = [
  { href: "#about", label: "ჩვენს შესახებ" },
  { href: "#projects", label: "პროექტები" },
  { href: "#services", label: "სერვისები" },
  { href: "#contact", label: "კონტაქტი" },
] as const;

const SERVICE_LINKS = [
  { label: "სრული რემონტი" },
  { label: "დიზაინი" },
  { label: "უფასო ხარჯთაღრიცხვა" },
] as const;

const CONTACT_INFO = [
  {
    href: "mailto:comfortprogeorgia@gmail.com",
    icon: Mail,
    label: "comfortprogeorgia@gmail.com",
  },
  {
    href: "tel:+995599019288",
    icon: Phone,
    label: "+995 599 01 92 88",
  },
] as const;

const SOCIAL_LINKS: Array<{
  href: string;
  label: string;
  icon?: LucideIcon;
  customIcon?: React.ReactNode;
}> = [
  { href: "https://facebook.com", icon: Facebook, label: "Facebook" },
  { href: "https://instagram.com", icon: Instagram, label: "Instagram" },
  { href: "https://linkedin.com", icon: Linkedin, label: "LinkedIn" },
  {
    href: "https://wa.me/995599019288",
    label: "WhatsApp",
    customIcon: (
      <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
      </svg>
    ),
  },
];

const FooterSection = ({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) => (
  <div>
    <h3 className="text-sm uppercase tracking-[0.2em]  mb-6 text-white/50">
      {title}
    </h3>
    {children}
  </div>
);

const FooterLink = ({
  href,
  children,
}: {
  href: string;
  children: React.ReactNode;
}) => (
  <Link
    href={href}
    className="text-white/80 hover:text-white transition-colors duration-300 text-base"
  >
    {children}
  </Link>
);

const ContactLink = ({
  href,
  icon: Icon,
  label,
}: {
  href: string;
  icon: LucideIcon;
  label: string;
}) => (
  <a
    href={href}
    className="text-white/80 hover:text-white transition-colors duration-300 text-base flex items-center gap-3 group"
  >
    <Icon className="w-4 h-4 text-white/60 group-hover:text-white transition-colors" />
    {label}
  </a>
);

const SocialLink = ({
  href,
  label,
  icon: Icon,
  customIcon,
}: {
  href: string;
  label: string;
  icon?: LucideIcon;
  customIcon?: React.ReactNode;
}) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="w-12 h-12 rounded-full border border-white/20 flex items-center justify-center text-white/60 hover:text-white hover:border-white/40 hover:bg-white/5 transition-all duration-300"
    aria-label={label}
  >
    {customIcon || (Icon && <Icon className="w-5 h-5" />)}
  </a>
);

export default function Footer() {
  return (
    <footer className="bg-black text-white py-20 lg:py-32 px-6 lg:px-20">
      <div className="max-w-[1600px] mx-auto">
        {/* Top Section - Text Left, Image Right */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-20 mb-16 lg:mb-24 items-center">
          {/* Left - Text Content */}
          <div className="flex flex-col justify-center">
            <h2 className="text-3xl lg:text-6xl xl:text-[72px] mb-8 tracking-tight leading-[1.3]">
              აქციეთ თქვენი ხედვა რეალობად
            </h2>
            <p className="text-base lg:text-lg text-white/70 leading-relaxed max-w-[500px]">
              ჩვენი პროფესიონალი დიზაინერების გუნდი მზად არის გააცოცხლოს თქვენი
              ხედვა დახვეწილი ელეგანტურობითა და უმაღლესი ოსტატობით.
            </p>
          </div>

          {/* Right - Rounded Image */}
          <div className="flex items-center justify-center lg:justify-end">
            <div className="relative w-full max-w-[600px] max-h-[200px] md:max-h-[350px] aspect-square rounded-[32px] overflow-hidden">
              <Image
                src="/assets/images/footer-bg.jpeg"
                alt="ComfortProGeorgia"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-white/10 mb-12 lg:mb-16" />

        {/* Bottom Section - Links & Contact */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12 mb-12 lg:mb-16">
          {/* Company */}
          <FooterSection title="კომპანია">
            <ul className="space-y-4">
              {COMPANY_LINKS.map((link) => (
                <li key={link.label}>
                  <FooterLink href={link.href}>{link.label}</FooterLink>
                </li>
              ))}
            </ul>
          </FooterSection>

          {/* Services */}
          <FooterSection title="სერვისები">
            <ul className="space-y-4">
              {SERVICE_LINKS.map((service) => (
                <li key={service.label}>
                  <FooterLink href="#services">{service.label}</FooterLink>
                </li>
              ))}
            </ul>
          </FooterSection>

          {/* Contact */}
          <FooterSection title="კონტაქტი">
            <ul className="space-y-4">
              {CONTACT_INFO.map((contact) => (
                <li key={contact.label} className="font-mono">
                  <ContactLink
                    href={contact.href}
                    icon={contact.icon}
                    label={contact.label}
                  />
                </li>
              ))}
            </ul>
          </FooterSection>

          {/* Social Media */}
          <FooterSection title="გამოგვყევით">
            <div className="flex gap-4">
              {SOCIAL_LINKS.map((social) => (
                <SocialLink
                  key={social.label}
                  href={social.href}
                  label={social.label}
                  icon={social.icon}
                  customIcon={social.customIcon}
                />
              ))}
            </div>
          </FooterSection>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-white/50 text-sm font-mono">
              © 2026 ComfortProGeorgia. ყველა უფლება დაცულია.
            </p>
            <p className="text-white/50 text-sm italic">
              ეს ვებგვერდი წარმოადგენს დემო პროექტს და არ არის რეალური კომპანია.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
