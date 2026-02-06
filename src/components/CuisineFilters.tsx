"use client";

import { motion } from "framer-motion";
import type { Cuisine } from "@/types";
import { useMemo } from "react";
import { seattleRecs } from "@/data/recs";

interface CuisineFiltersProps {
  active: Cuisine | "all";
  onSelect: (cuisine: Cuisine | "all") => void;
}

export default function CuisineFilters({
  active,
  onSelect,
}: CuisineFiltersProps) {
  // Get unique cuisines from food items
  const availableCuisines = useMemo(() => {
    const cuisines = seattleRecs
      .filter((r) => r.category === "food" && r.cuisine)
      .map((r) => r.cuisine!)
      .filter((c, i, arr) => arr.indexOf(c) === i)
      .sort();
    return cuisines as Cuisine[];
  }, []);

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
        All cuisines
      </motion.button>
      {availableCuisines.map((cuisine) => (
        <motion.button
          key={cuisine}
          onClick={() => onSelect(cuisine)}
          className={`rounded-full px-4 py-2 text-sm font-medium transition-all border ${
            active === cuisine
              ? "bg-coastal-primary text-white border-coastal-primary shadow-soft"
              : "bg-white text-coastal-navy border-coastal-soft shadow-soft hover:bg-coastal-soft"
          }`}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          {cuisine}
        </motion.button>
      ))}
    </div>
  );
}
