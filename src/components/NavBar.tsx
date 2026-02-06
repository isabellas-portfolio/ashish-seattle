"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const navLinks = [
  { href: "#seattle", label: "Seattle Recs" },
  { href: "#dates", label: "Date Ideas" },
  { href: "#letters", label: "Open When Letters" },
];

export default function NavBar() {
  const [activeSection, setActiveSection] = useState<string>("");

  useEffect(() => {
    const sections = ["seattle", "dates", "letters"];

    const observerOptions = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(
      observerCallback,
      observerOptions
    );

    sections.forEach((id) => {
      const element = document.getElementById(id);
      if (element) observer.observe(element);
    });

    return () => {
      sections.forEach((id) => {
        const element = document.getElementById(id);
        if (element) observer.unobserve(element);
      });
    };
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const targetId = href.replace("#", "");
    const element = document.getElementById(targetId);
    if (element) {
      const offset = 96; // Match scroll-mt-24 (96px)
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - offset;

      window.scrollTo({
        top: offsetPosition,
        behavior: "smooth",
      });
    }
  };

  return (
    <nav className="fixed top-4 left-1/2 z-50 -translate-x-1/2">
      <motion.div
        className="flex items-center gap-1 rounded-full bg-white/80 px-3 py-2 shadow-soft backdrop-blur-md border border-rose-100/50"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <span className="mr-1 text-xs text-rose-400">💕</span>
        {navLinks.map((link) => {
          const isActive = activeSection === link.href.replace("#", "");
          return (
            <a
              key={link.href}
              href={link.href}
              onClick={(e) => handleClick(e, link.href)}
              className={`rounded-full px-4 py-1.5 text-sm font-medium transition-all ${
                isActive
                  ? "bg-rose-500 text-white shadow-[0_0_12px_rgba(244,63,94,0.4)]"
                  : "text-gray-600 hover:bg-rose-50 hover:text-rose-700"
              }`}
            >
              {link.label}
            </a>
          );
        })}
      </motion.div>
    </nav>
  );
}
