"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { RecCategory, RecLocation, Cuisine } from "@/types";
import { seattleRecs } from "@/data/recs";
import Filters from "./Filters";
import LocationFilters from "./LocationFilters";
import CuisineFilters from "./CuisineFilters";
import RecCard from "./RecCard";
import BellevuePinMap from "./BellevuePinMap";

export default function RecGrid() {
  const [activeCategory, setActiveCategory] = useState<
    RecCategory | "all" | "wfh-friendly"
  >("all");
  const [activeLocation, setActiveLocation] = useState<"All" | RecLocation>(
    "All"
  );
  const [activeCuisine, setActiveCuisine] = useState<Cuisine | "all">("all");

  const filtered = useMemo(() => {
    let result = seattleRecs;

    // Filter by category or WFH-friendly
    if (activeCategory === "wfh-friendly") {
      result = result.filter((r) => r.workFriendly === true);
    } else if (activeCategory !== "all") {
      result = result.filter((r) => r.category === activeCategory);
    }

    // Filter by cuisine (only applies when food category is selected)
    if (activeCategory === "food" && activeCuisine !== "all") {
      result = result.filter((r) => r.cuisine === activeCuisine);
    }

    // Filter by location
    if (activeLocation !== "All") {
      result = result.filter((r) => r.location === activeLocation);
    }

    return result;
  }, [activeCategory, activeLocation, activeCuisine]);

  // Reset cuisine filter when category changes away from food
  const handleCategoryChange = (category: RecCategory | "all" | "wfh-friendly") => {
    setActiveCategory(category);
    if (category !== "food") {
      setActiveCuisine("all");
    }
  };

  const bellevueRecs = useMemo(
    () => filtered.filter((r) => r.location === "Bellevue"),
    [filtered]
  );
  const seattleRecsFiltered = useMemo(
    () => filtered.filter((r) => r.location === "Seattle"),
    [filtered]
  );

  return (
    <section className="mx-auto max-w-5xl">
      <motion.h2
        className="flex items-center gap-3 font-display text-2xl font-semibold text-coastal-navy md:text-3xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <span>Seattle Starter Pack</span>
        <svg
          aria-hidden="true"
          viewBox="0 0 32 40"
          className="h-8 w-6 text-coastal-navy/70"
        >
          {/* simple Space Needle doodle */}
          {/* saucer */}
          <path
            d="M10 16 C 13 13 19 13 22 16"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M9 18 C 13 21 19 21 23 18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* tower */}
          <path
            d="M16 18 V 8"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* spire */}
          <path
            d="M16 8 V 3"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          {/* legs */}
          <path
            d="M12 24 L16 18 L20 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* base hint */}
          <path
            d="M9 26 H23"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.4"
            strokeLinecap="round"
            opacity="0.7"
          />
        </svg>
      </motion.h2>
      <motion.p
        className="mt-2 text-gray-600"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        A few spots and tips to get you started. Filter by category and location,
        and add your own as you explore.
      </motion.p>

      <div className="mt-6">
        <BellevuePinMap />
      </div>

      <div className="mt-4 space-y-3">
        <LocationFilters active={activeLocation} onSelect={setActiveLocation} />
        <Filters active={activeCategory} onSelect={handleCategoryChange} />
        {activeCategory === "food" && (
          <CuisineFilters active={activeCuisine} onSelect={setActiveCuisine} />
        )}
      </div>

      {activeLocation === "All" ? (
        <div className="mt-8 space-y-10">
          {bellevueRecs.length > 0 && (
            <div>
              <motion.h3
                className="mb-4 flex items-center gap-2 font-display text-lg font-medium text-coastal-navy"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <span>📍</span>
                <span>Bellevue</span>
              </motion.h3>
              <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="wait">
                  {bellevueRecs.map((rec, i) => (
                    <li key={rec.id}>
                      <RecCard rec={rec} index={i} />
                    </li>
                  ))}
                </AnimatePresence>
              </ul>
            </div>
          )}
          {seattleRecsFiltered.length > 0 && (
            <div>
              <motion.h3
                className="mb-4 flex items-center gap-2 font-display text-lg font-medium text-coastal-navy"
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                viewport={{ once: true }}
              >
                <span>📍</span>
                <span>Seattle</span>
              </motion.h3>
              <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                <AnimatePresence mode="wait">
                  {seattleRecsFiltered.map((rec, i) => (
                    <li key={rec.id}>
                      <RecCard rec={rec} index={i} />
                    </li>
                  ))}
                </AnimatePresence>
              </ul>
            </div>
          )}
        </div>
      ) : (
        <ul className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          <AnimatePresence mode="wait">
            {filtered.map((rec, i) => (
              <li key={rec.id}>
                <RecCard rec={rec} index={i} />
              </li>
            ))}
          </AnimatePresence>
        </ul>
      )}
    </section>
  );
}
