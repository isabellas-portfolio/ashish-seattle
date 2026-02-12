"use client";

import { motion } from "framer-motion";

export default function BellevuePinMap() {
  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      {/* scrapbook card */}
      <div className="relative overflow-visible rounded-[28px] border border-[#DDE8F4] bg-[#FFFAF4] shadow-sm">
        {/* optional tape corners */}
        <div className="pointer-events-none absolute -top-3 left-10 h-9 w-24 rotate-[-8deg] rounded-md opacity-70 shadow-sm
          bg-[repeating-linear-gradient(45deg,rgba(221,232,244,.85),rgba(221,232,244,.85)_10px,rgba(246,247,250,.85)_10px,rgba(246,247,250,.85)_20px)]" />
        <div className="pointer-events-none absolute -top-3 right-10 h-9 w-24 rotate-[8deg] rounded-md opacity-70 shadow-sm
          bg-[repeating-linear-gradient(45deg,rgba(221,232,244,.85),rgba(221,232,244,.85)_10px,rgba(246,247,250,.85)_10px,rgba(246,247,250,.85)_20px)]" />

        <div className="px-6 pt-6 pb-5">
          {/* route UI: Seattle — dotted line — Bellevue */}
          <div className="mt-4 rounded-2xl border border-[#DDE8F4]/80 bg-[#FFFAF4]/90 px-6 py-5 shadow-sm">
            <div className="flex items-center justify-between gap-4">
              {/* Left: Seattle */}
              <div className="flex flex-col items-center gap-1 shrink-0">
                <div className="h-3 w-3 rounded-full bg-[#2A3D66] border-2 border-[#DDE8F4]" aria-hidden />
                <span className="text-sm font-medium text-[#2A3D66] font-display">Seattle</span>
              </div>

              {/* Center: dotted route line + heart */}
              <div className="flex-1 flex items-center justify-center min-w-0 px-2">
                <svg viewBox="0 0 200 24" className="w-full h-6 text-[#2A3D66]" fill="none" aria-hidden="true">
                  <line
                    x1="0"
                    y1="12"
                    x2="200"
                    y2="12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeDasharray="4 8"
                    strokeLinecap="round"
                    opacity="0.45"
                  />
                  <path
                    d="M100 11c-2-2-5-2-6 0-1 2 0 5 6 9 6-4 7-7 6-9-1-2-4-2-6 0z"
                    fill="#C48497"
                    stroke="#2A3D66"
                    strokeWidth="1.5"
                    strokeLinejoin="round"
                    opacity="0.9"
                  />
                </svg>
              </div>

              {/* Right: Bellevue + pin */}
              <div className="flex flex-col items-center gap-1 shrink-0 relative">
                <motion.div
                  initial={{ y: 4 }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.4, ease: [0.34, 1.56, 0.64, 1] }}
                  className="flex flex-col items-center"
                >
                  <svg viewBox="0 0 24 36" className="h-8 w-6 text-[#2A3D66]" fill="none" aria-hidden="true">
                    <path
                      d="M12 0C6 0 2 6 2 12c0 9 10 22 10 22s10-13 10-22c0-6-4-12-10-12z"
                      fill="#C48497"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <circle cx="12" cy="12" r="4" fill="#FFFAF4" stroke="currentColor" strokeWidth="2" />
                  </svg>
                </motion.div>
                <span className="text-sm font-medium text-[#2A3D66] font-display">Bellevue</span>
                <span className="mt-1 inline-flex items-center rounded-full border border-[#DDE8F4] bg-white/80 px-2.5 py-0.5 text-xs font-medium text-[#2A3D66]/90">
                  Atlassian HQ ✨
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
