"use client";

import { motion } from "framer-motion";
import type { SeattleRec } from "@/types";

interface RecCardProps {
  rec: SeattleRec;
  index: number;
}

export default function RecCard({ rec, index }: RecCardProps) {
  return (
    <motion.article
      className="group flex flex-col rounded-2xl border border-coastal-soft bg-white p-5 shadow-soft transition-all hover:border-coastal-primary/50 hover:shadow-soft-hover md:p-6"
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.04, duration: 0.35 }}
      whileHover={{ y: -2 }}
    >
      <div className="flex flex-1 flex-col">
        <h3 className="font-display text-lg font-semibold text-coastal-navy group-hover:text-coastal-primary">
          {rec.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-gray-600">
          {rec.description}
        </p>
        {rec.workFriendly && (
          <span className="mt-2 inline-flex w-fit rounded-full border border-coastal-soft bg-coastal-soft px-2 py-1 text-xs font-medium text-coastal-navy">
            Work from here friendly
          </span>
        )}
        <p className="mt-3 text-xs font-medium text-coastal-navy/90">
          {rec.whyPicked}
        </p>
      </div>
      {rec.link && (
        <a
          href={rec.link}
          target="_blank"
          rel="noopener noreferrer"
          className="mt-4 inline-flex items-center text-sm font-medium text-coastal-navy underline-offset-2 hover:text-coastal-primary hover:underline"
        >
          Learn more →
        </a>
      )}
    </motion.article>
  );
}
