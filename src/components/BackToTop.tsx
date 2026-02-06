"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SCROLL_THRESHOLD = 300;

export default function BackToTop() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          type="button"
          onClick={scrollToTop}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 12 }}
          transition={{ duration: 0.2 }}
          className="fixed bottom-6 right-6 z-40 flex items-center gap-1.5 rounded-full bg-white/90 px-4 py-2.5 text-sm font-medium text-coastal-navy shadow-soft backdrop-blur-sm border border-coastal-soft hover:bg-coastal-soft hover:shadow-soft-hover"
          aria-label="Back to top"
        >
          <span>Back to top</span>
          <span className="text-coastal-primary">↑</span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
