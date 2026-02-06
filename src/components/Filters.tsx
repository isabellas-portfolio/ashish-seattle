"use client";

import { motion } from "framer-motion";
import type { RecCategory } from "@/types";
import { REC_CATEGORIES } from "@/data/recs";

const LABELS: Record<RecCategory, string> = {
  food: "Food & eats",
  coffee: "Coffee",
  outdoors: "Outdoors",
  neighborhoods: "Neighborhoods",
  culture: "Culture",
  practical: "Practical",
};

interface FiltersProps {
  active: RecCategory | "all" | "wfh-friendly";
  onSelect: (category: RecCategory | "all" | "wfh-friendly") => void;
}

export default function Filters({ active, onSelect }: FiltersProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <motion.button
        key="all"
        onClick={() => onSelect("all")}
        className={`rounded-full px-4 py-2 text-sm font-medium transition-all border ${
          active === "all"
            ? "bg-coastal-primary text-white border-coastal-primary shadow-soft"
            : "bg-white text-coastal-navy border-coastal-soft shadow-soft hover:bg-coastal-soft"
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        All
      </motion.button>
      {REC_CATEGORIES.map((cat) => (
        <motion.button
          key={cat}
          onClick={() => onSelect(cat)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-all border ${
            active === cat
              ? "bg-coastal-primary text-white border-coastal-primary shadow-soft"
              : "bg-white text-coastal-navy border-coastal-soft shadow-soft hover:bg-coastal-soft"
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {LABELS[cat]}
        </motion.button>
      ))}
      <motion.button
        key="wfh-friendly"
        onClick={() => onSelect("wfh-friendly")}
        className={`rounded-full px-4 py-2 text-sm font-medium transition-all border ${
          active === "wfh-friendly"
            ? "bg-coastal-primary text-white border-coastal-primary shadow-soft"
            : "bg-white text-coastal-navy border-coastal-soft shadow-soft hover:bg-coastal-soft"
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        WFH-friendly
      </motion.button>
    </div>
  );
}
