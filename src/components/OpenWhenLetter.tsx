"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface OpenWhenLetterProps {
  id: string;
  title: string;
  message: string;
  unlocked?: boolean;
  onRequestUnlock?: () => void;
}

export default function OpenWhenLetter({
  id,
  title,
  message,
  unlocked = true,
  onRequestUnlock,
}: OpenWhenLetterProps) {
  const [open, setOpen] = useState(false);

  const handleClick = () => {
    if (!unlocked) {
      onRequestUnlock?.();
      return;
    }
    setOpen((prev) => !prev);
  };

  return (
    <div className="w-full max-w-sm mx-auto" style={{ perspective: "1200px" }}>
      <div
        className="cursor-pointer select-none"
        onClick={handleClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            if (!unlocked) onRequestUnlock?.();
            else setOpen((prev) => !prev);
          }
        }}
        aria-expanded={open}
        aria-label={open ? `Close letter: ${title}` : `Open letter: ${title}`}
      >
        <AnimatePresence mode="wait">
          {!open ? (
            <motion.div
              key="envelope"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative overflow-hidden rounded-2xl bg-[#faf6f0] shadow-[0_4px_20px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)] min-h-[200px] flex flex-col items-center justify-center p-6 pb-8 border border-amber-100/80"
            >
              {/* Envelope flap – pale blue liner */}
              <motion.div
                className="absolute inset-x-0 top-0 h-16 rounded-t-2xl bg-[#DDE8F4] border-b border-coastal-soft flex items-center justify-center origin-bottom"
                style={{ transformStyle: "preserve-3d" }}
                initial={{ rotateX: 0 }}
                animate={{ rotateX: 0 }}
                transition={{ duration: 0.35, ease: [0.33, 1, 0.68, 1] }}
              >
                <span className="text-2xl" aria-hidden>💌</span>
              </motion.div>

              {/* Hint text */}
              <p className="font-display text-lg text-[#2A3D66] mt-4 text-center z-10">
                {title}
              </p>
              <p className="text-sm text-coastal-navy/70 mt-1">Click to open</p>

              {/* Heart seal – rose accent */}
              <motion.div
                className="absolute top-5 left-1/2 -translate-x-1/2 w-11 h-11 rounded-full bg-coastal-rose flex items-center justify-center text-white shadow-[0_2px_8px_rgba(196,132,151,0.3)] border border-coastal-rose/80"
                initial={{ scale: 1 }}
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
              >
                <span className="text-xl leading-none">♥</span>
              </motion.div>
            </motion.div>
          ) : (
            <motion.div
              key="opened"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="relative"
            >
              {/* Envelope body (stays) with flap lifted */}
              <div className="relative overflow-hidden rounded-2xl bg-[#faf6f0] shadow-[0_4px_20px_rgba(0,0,0,0.06),0_1px_3px_rgba(0,0,0,0.04)] border border-amber-100/80 min-h-[200px]">
                {/* Flap (lifted) – pale blue liner */}
                <motion.div
                  className="absolute inset-x-0 top-0 h-16 rounded-t-2xl bg-[#DDE8F4] border-b border-coastal-soft origin-bottom flex items-center justify-center"
                  style={{ transformStyle: "preserve-3d", backfaceVisibility: "hidden" }}
                  initial={{ rotateX: 0 }}
                  animate={{ rotateX: -110 }}
                  transition={{ duration: 0.5, ease: [0.33, 1, 0.68, 1] }}
                >
                  <span className="text-2xl opacity-80" aria-hidden>💌</span>
                </motion.div>

                {/* Letter slides out and unfolds */}
                <motion.div
                  className="letter-paper font-handwriting relative mt-14 mx-3 mb-4 rounded-xl bg-[#fdf8f0] p-5 pb-6 border border-amber-200/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]"
                  initial={{ opacity: 0, y: 16, scaleY: 0.92 }}
                  animate={{ opacity: 1, y: 0, scaleY: 1 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.15,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                >
                  <h3 className="text-2xl font-semibold text-[#2A3D66] mb-3">
                    {title}
                  </h3>
                  <p className="text-lg leading-relaxed text-[#2A3D66] whitespace-pre-line">
                    {message}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
