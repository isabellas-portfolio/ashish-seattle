"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const TARGET_DATE = new Date("2026-08-01T00:00:00");

function getDaysLeft(): number | null {
  const now = new Date();
  const diff = TARGET_DATE.getTime() - now.getTime();
  if (diff <= 0) return 0;
  return Math.ceil(diff / (1000 * 60 * 60 * 24));
}

export default function Countdown() {
  const [days, setDays] = useState<number | null>(null);

  useEffect(() => {
    setDays(getDaysLeft());
    const id = setInterval(() => setDays(getDaysLeft()), 60_000);
    return () => clearInterval(id);
  }, []);

  if (days === null) return null;

  return (
    <motion.section
      className="mx-auto max-w-md rounded-2xl border border-coastal-soft bg-gradient-to-br from-coastal-soft/50 to-white px-6 py-8 shadow-soft"
      initial={{ opacity: 0, scale: 0.98 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
    >
      <h2 className="font-display text-xl font-semibold text-coastal-navy">
        Countdown
      </h2>
      <p className="mt-1 text-sm text-gray-600">
        Until we're in the same place again
      </p>
      <div className="mt-4 flex items-baseline gap-2">
        <span className="font-display text-4xl font-bold text-coastal-primary md:text-5xl">
          {days}
        </span>
        <span className="text-lg text-gray-600">days</span>
      </div>
      <p className="mt-2 text-xs text-gray-500">
        Target date: {TARGET_DATE.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
      </p>
    </motion.section>
  );
}
