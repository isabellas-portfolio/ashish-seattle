"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface OpenWhenLetterProps {
  id: string;
  title: string;
  message: string;
  unlocked?: boolean;
  onRequestUnlock?: () => void;
  initialOpen?: boolean;
}

const ENVELOPE_WIDTH = 280;
const FLAP_HEIGHT = 72;
const SEAL_SIZE = 44;

export default function OpenWhenLetter({
  id,
  title,
  message,
  unlocked = true,
  onRequestUnlock,
  initialOpen = false,
}: OpenWhenLetterProps) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (unlocked && initialOpen) setOpen(true);
  }, [unlocked, initialOpen]);

  const handleClick = () => {
    if (!unlocked) {
      onRequestUnlock?.();
      return;
    }
    setOpen((prev) => !prev);
  };

  return (
    <div
      className="w-full max-w-[280px] mx-auto"
      style={{ perspective: "1200px" }}
    >
      <motion.div
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
        initial={false}
        whileHover={{
          y: -6,
          transition: { duration: 0.2 },
        }}
        transition={{ type: "spring", stiffness: 400, damping: 25 }}
      >
        <AnimatePresence mode="wait">
          {!open ? (
            <motion.div
              key="envelope"
              initial={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="relative rounded-b-xl overflow-visible"
              style={{
                width: ENVELOPE_WIDTH,
                minHeight: 200,
                boxShadow:
                  "0 6px 24px rgba(42, 61, 102, 0.08), 0 2px 8px rgba(0,0,0,0.04)",
              }}
            >
              {/* Envelope body (paper) */}
              <div
                className="envelope-body relative rounded-b-xl border border-amber-200/60 border-t-0 pt-0 overflow-hidden"
                style={{
                  minHeight: 200,
                  boxShadow: "inset 0 1px 0 rgba(255,255,255,0.5)",
                }}
              >
                {/* Inner liner – pale blue, visible under flap */}
                <div
                  className="envelope-liner absolute left-0 right-0 top-0 border-b border-coastal-soft/80"
                  style={{ height: FLAP_HEIGHT + 20 }}
                />

                {/* Triangular flap */}
                <motion.div
                  className="envelope-flap absolute left-0 right-0 top-0 z-10 envelope-body border border-amber-200/60 border-b-0"
                  style={{
                    height: FLAP_HEIGHT,
                    width: ENVELOPE_WIDTH,
                    transformOrigin: "50% 100%",
                    boxShadow: "0 2px 6px rgba(0,0,0,0.06)",
                  }}
                  whileHover={{
                    rotate: [0, -0.8, 0.8, 0],
                    transition: { duration: 0.4 },
                  }}
                />

                {/* Wax seal on flap (at fold line) */}
                <motion.div
                  className={
                    unlocked
                      ? "envelope-seal-unlocked absolute left-1/2 z-20 flex items-center justify-center rounded-full border-2 text-white"
                      : "envelope-seal-locked absolute left-1/2 z-20 flex items-center justify-center rounded-full border-2 text-white"
                  }
                  style={{
                    width: SEAL_SIZE,
                    height: SEAL_SIZE,
                    marginLeft: -SEAL_SIZE / 2,
                    top: FLAP_HEIGHT - SEAL_SIZE / 2,
                    backgroundColor: unlocked ? "#C48497" : "#2A3D66",
                    borderColor: unlocked
                      ? "rgba(196, 132, 151, 0.6)"
                      : "rgba(42, 61, 102, 0.5)",
                  }}
                >
                  {unlocked ? (
                    <span className="text-xl leading-none" aria-hidden>
                      ♥
                    </span>
                  ) : (
                    <svg
                      className="w-5 h-5 text-white"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden
                    >
                      <path
                        fillRule="evenodd"
                        d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  )}
                </motion.div>

                {/* Title – lower half of envelope, below flap */}
                <div
                  className="relative z-30 px-4 pb-6 text-center"
                  style={{
                    paddingTop: FLAP_HEIGHT + 20,
                  }}
                >
                  <p
                    className="font-handwriting text-coastal-navy text-lg"
                    style={{ textShadow: "0 1px 0 rgba(255,255,255,0.8)" }}
                  >
                    {title}
                  </p>
                  <p className="text-xs text-coastal-navy/60 mt-2">
                    {unlocked ? "Click to open" : "Click to unlock"}
                  </p>
                </div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="opened"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.2 }}
              className="relative"
              style={{ width: ENVELOPE_WIDTH, perspective: "800px" }}
            >
              <div
                className="envelope-body relative rounded-xl border border-amber-200/60 overflow-hidden min-h-[200px]"
                style={{ transformStyle: "preserve-3d" }}
              >
                {/* Flap lifted (triangle flipped up) */}
                <motion.div
                  className="envelope-flap envelope-body absolute left-0 right-0 border border-amber-200/60"
                  style={{
                    height: FLAP_HEIGHT,
                    width: ENVELOPE_WIDTH,
                    top: 0,
                    transformOrigin: "50% 100%",
                    boxShadow: "0 -2px 8px rgba(0,0,0,0.06)",
                    backfaceVisibility: "hidden",
                  }}
                  initial={{ rotateX: 0 }}
                  animate={{ rotateX: -100 }}
                  transition={{
                    duration: 0.45,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                />

                {/* Letter paper */}
                <motion.div
                  className="letter-paper relative mt-12 mx-3 mb-4 rounded-lg p-5 pb-6 border border-amber-200/50 shadow-[inset_0_1px_0_rgba(255,255,255,0.6)]"
                  initial={{ opacity: 0, y: 12, scaleY: 0.96 }}
                  animate={{ opacity: 1, y: 0, scaleY: 1 }}
                  transition={{
                    duration: 0.4,
                    delay: 0.12,
                    ease: [0.33, 1, 0.68, 1],
                  }}
                >
                  <h3 className="text-xl font-semibold text-coastal-navy mb-3 font-display">
                    {title}
                  </h3>
                  <p className="font-handwriting text-base leading-relaxed text-coastal-navy whitespace-pre-line">
                    {message}
                  </p>
                </motion.div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
