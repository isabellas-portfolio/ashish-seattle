"use client";

import { motion } from "framer-motion";
import type { RecLocation } from "@/types";

interface LocationFiltersProps {
  active: "All" | RecLocation;
  onSelect: (location: "All" | RecLocation) => void;
}

export default function LocationFilters({ active, onSelect }: LocationFiltersProps) {
  return (
    <div className="flex flex-wrap items-center justify-center gap-2">
      <motion.button
        key="all"
        onClick={() => onSelect("All")}
        className={`rounded-full px-4 py-2 text-sm font-medium transition-all border ${
          active === "All"
            ? "bg-coastal-primary text-white border-coastal-primary shadow-soft"
            : "bg-white text-coastal-navy border-coastal-soft shadow-soft hover:bg-coastal-soft"
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        All locations
      </motion.button>
      <motion.button
        key="Seattle"
        onClick={() => onSelect("Seattle")}
        className={`rounded-full px-4 py-2 text-sm font-medium transition-all border ${
          active === "Seattle"
            ? "bg-coastal-primary text-white border-coastal-primary shadow-soft"
            : "bg-white text-coastal-navy border-coastal-soft shadow-soft hover:bg-coastal-soft"
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Seattle
      </motion.button>
      <motion.button
        key="Bellevue"
        onClick={() => onSelect("Bellevue")}
        className={`rounded-full px-4 py-2 text-sm font-medium transition-all border ${
          active === "Bellevue"
            ? "bg-coastal-primary text-white border-coastal-primary shadow-soft"
            : "bg-white text-coastal-navy border-coastal-soft shadow-soft hover:bg-coastal-soft"
        }`}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        Bellevue
      </motion.button>
    </div>
  );
}
