"use client";

import Image from "next/image";
import { motion } from "framer-motion";

const tapeGradient =
  "repeating-linear-gradient(45deg,rgba(221,232,244,.9),rgba(221,232,244,.9) 10px,rgba(246,247,250,.9) 10px,rgba(246,247,250,.9) 20px)";

export default function Hero() {
  return (
    <motion.section
      className="relative mx-auto max-w-3xl"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Outer wrapper: relative, no overflow so tape isn't clipped */}
      <div className="relative rounded-[32px]">
        {/* Corner tape – sits above card, not clipped */}
        <div
          className="pointer-events-none absolute -top-3 -left-3 z-20 h-10 w-24 rotate-[-10deg] rounded-md opacity-75 shadow-sm md:h-12 md:w-28"
          style={{ background: tapeGradient }}
        />
        <div
          className="pointer-events-none absolute -top-3 -right-3 z-20 h-10 w-24 rotate-[10deg] rounded-md opacity-75 shadow-sm md:h-12 md:w-28"
          style={{ background: tapeGradient }}
        />
        <div
          className="pointer-events-none absolute -bottom-3 -left-3 z-20 h-10 w-24 rotate-[8deg] rounded-md opacity-75 shadow-sm md:h-12 md:w-28"
          style={{ background: tapeGradient }}
        />
        <div
          className="pointer-events-none absolute -bottom-3 -right-3 z-20 h-10 w-24 rotate-[-8deg] rounded-md opacity-75 shadow-sm md:h-12 md:w-28"
          style={{ background: tapeGradient }}
        />

        {/* Inner card: overflow-hidden so content respects rounded corners */}
        <div className="relative overflow-hidden rounded-[32px] border border-coastal-soft bg-white/80 shadow-soft">
          {/* Paper grain overlay (subtle) */}
          <div
            className="pointer-events-none absolute inset-0 opacity-[0.03] rounded-[32px]"
            style={{
              backgroundImage: `repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(42,61,102,0.03) 2px, rgba(42,61,102,0.03) 4px)`,
            }}
          />

          <div className="hero-compact-card relative px-6 py-10 text-center md:px-10 md:py-14">
            <motion.h1
              className="hero-compact-title font-display text-4xl font-semibold tracking-tight text-coastal-navy md:text-5xl"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              Ashish&apos;s Guide to Navigating Seattle:
              <br />
              With Love, Bella 💌
            </motion.h1>
            <motion.p
              className="mt-4 text-lg leading-relaxed text-gray-600 md:text-xl"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.4 }}
            >
              Happy Valentine&apos;s Day!! I wanted to put together a little guide for you so Seattle doesn&apos;t feel quite as overwhelming. So excited for your new chapter, and for our next adventures :) Love you lots
            </motion.p>

            {/* Polaroid-style photo frame – smaller on small screens */}
            <motion.div
              className="hero-compact-gap mx-auto mt-5 w-fit rotate-[-2deg] transition-transform duration-200 hover:rotate-[-1deg] md:mt-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.35 }}
            >
              <div className="hero-compact-photo relative w-[240px] rounded-2xl border border-coastal-soft bg-[#FFFAF4] p-3 shadow-soft sm:w-[260px] md:w-[300px] md:p-4">
                {/* Tiny tape on photo frame – left */}
                <div
                  className="pointer-events-none absolute -top-2 left-6 h-6 w-14 rotate-[-10deg] rounded-md border border-white/50 opacity-70 shadow-sm"
                  style={{
                    background: "repeating-linear-gradient(45deg, rgba(221,232,244,.7), rgba(221,232,244,.7) 6px, rgba(246,247,250,.8) 6px, rgba(246,247,250,.8) 12px)",
                  }}
                />
                {/* Tiny tape – right */}
                <div
                  className="pointer-events-none absolute -top-2 right-6 h-6 w-14 rotate-[9deg] rounded-md border border-white/50 opacity-70 shadow-sm"
                  style={{
                    background: "repeating-linear-gradient(45deg, rgba(221,232,244,.7), rgba(221,232,244,.7) 6px, rgba(246,247,250,.8) 6px, rgba(246,247,250,.8) 12px)",
                  }}
                />

                {/* Photo with inner border (printed photo paper look) */}
                <div className="relative aspect-square w-full overflow-hidden rounded-xl border border-coastal-soft bg-white">
                  <Image
                    src="/hero-photo.png"
                    alt="Bella and Ashish"
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 240px, (max-width: 768px) 260px, 300px"
                    priority
                  />
                </div>

                {/* Scrapbook caption */}
                <p className="mt-2 text-center text-sm font-medium text-coastal-navy/80 md:mt-3">
                  us 🫶
                </p>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </motion.section>
  );
}
