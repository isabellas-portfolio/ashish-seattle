"use client";

import { useMemo, useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { RecCategory, RecLocation, Cuisine } from "@/types";
import type { SeattleRec } from "@/types";
import { seattleRecs } from "@/data/recs";
import Filters from "./Filters";
import RecCard from "./RecCard";
import BellevuePinMap from "./BellevuePinMap";

function searchMatches(rec: SeattleRec, query: string): boolean {
  if (!query.trim()) return true;
  const q = query.trim().toLowerCase();
  const text = [
    rec.title,
    rec.description,
    rec.whyPicked,
    rec.category,
    rec.location,
    rec.cuisine ?? "",
  ]
    .join(" ")
    .toLowerCase();
  return text.includes(q);
}

export default function RecGrid() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState<
    RecCategory | "all" | "wfh-friendly"
  >("all");
  const [activeLocation, setActiveLocation] = useState<"All" | RecLocation>(
    "All"
  );
  const [activeCuisine, setActiveCuisine] = useState<Cuisine | "all">("all");
  const [visibleCount, setVisibleCount] = useState(12);

  const filtered = useMemo(() => {
    let result = seattleRecs;

    // 1) Search (case-insensitive on title, description, whyPicked, category, location, cuisine)
    result = result.filter((r) => searchMatches(r, searchQuery));

    // 2) Location
    if (activeLocation !== "All") {
      result = result.filter((r) => r.location === activeLocation);
    }

    // 3) Category or WFH-friendly
    if (activeCategory === "wfh-friendly") {
      result = result.filter((r) => r.workFriendly === true);
    } else if (activeCategory !== "all") {
      result = result.filter((r) => r.category === activeCategory);
    }

    // 4) Cuisine (only when category is Food & eats)
    if (activeCategory === "food" && activeCuisine !== "all") {
      result = result.filter((r) => r.cuisine === activeCuisine);
    }

    return result;
  }, [searchQuery, activeCategory, activeLocation, activeCuisine]);

  // Reset cuisine filter when category changes away from food
  const handleCategoryChange = (category: RecCategory | "all" | "wfh-friendly") => {
    setActiveCategory(category);
    if (category !== "food") {
      setActiveCuisine("all");
    }
  };

  const topPicks = useMemo(
    () => filtered.filter((r) => r.isTopPick).slice(0, 8),
    [filtered]
  );

  const allSpots = filtered;

  const visibleSpots = useMemo(
    () => allSpots.slice(0, visibleCount),
    [allSpots, visibleCount]
  );

  const hasMore = visibleCount < allSpots.length;

  // Reset pagination when filters/search change
  useEffect(() => {
    setVisibleCount(12);
  }, [searchQuery, activeCategory, activeLocation, activeCuisine]);

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

      {/* Search */}
      <div className="mt-4">
        <label htmlFor="rec-search" className="sr-only">
          Search spots
        </label>
        <div className="relative">
          <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-coastal-navy/50" aria-hidden>
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </span>
          <input
            id="rec-search"
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search spots (ramen, espresso, hikes…)"
            className="w-full rounded-full border-2 border-coastal-soft bg-white py-2.5 pl-11 pr-10 text-coastal-navy placeholder:text-coastal-navy/50 focus:border-coastal-primary focus:outline-none focus:ring-2 focus:ring-coastal-primary/20"
          />
          {searchQuery.length > 0 && (
            <button
              type="button"
              onClick={() => setSearchQuery("")}
              className="absolute right-3 top-1/2 -translate-y-1/2 rounded-full p-1 text-coastal-navy/60 hover:bg-coastal-soft hover:text-coastal-navy"
              aria-label="Clear search"
            >
              <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          )}
        </div>
      </div>

      <div className="mt-3">
        <Filters
          activeLocation={activeLocation}
          onLocationChange={setActiveLocation}
          activeCategory={activeCategory}
          onCategoryChange={handleCategoryChange}
          activeCuisine={activeCuisine}
          onCuisineChange={setActiveCuisine}
        />
      </div>

      {/* Top picks (filtered) */}
      {topPicks.length > 0 && (
        <div className="mt-8">
          <motion.h3
            className="mb-4 flex items-center gap-2 font-display text-lg font-medium text-coastal-navy"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
          >
            <span>⭐</span>
            <span>Top picks</span>
          </motion.h3>
          <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <AnimatePresence mode="wait">
              {topPicks.map((rec, i) => (
                <li key={rec.id}>
                  <RecCard rec={rec} index={i} />
                </li>
              ))}
            </AnimatePresence>
          </ul>
        </div>
      )}

      {/* All spots (filtered, incremental) */}
      <div className="mt-10">
        <motion.h3
          className="mb-4 flex items-center gap-2 font-display text-lg font-medium text-coastal-navy"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          <span>📍</span>
          <span>All spots</span>
        </motion.h3>

        {visibleSpots.length === 0 ? (
          <p className="text-sm text-gray-600">
            No spots match your search and filters yet.
          </p>
        ) : (
          <>
            <ul className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <AnimatePresence mode="wait">
                {visibleSpots.map((rec, i) => (
                  <li key={rec.id}>
                    <RecCard rec={rec} index={i} />
                  </li>
                ))}
              </AnimatePresence>
            </ul>

            <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-xs text-coastal-navy/70">
              <span>
                Showing {visibleSpots.length} of {allSpots.length} spots
              </span>
              <div className="flex gap-2">
                {visibleCount > 12 && (
                  <button
                    type="button"
                    onClick={() => setVisibleCount(12)}
                    className="rounded-full border border-coastal-soft bg-white px-3 py-1 font-medium text-coastal-navy hover:bg-coastal-soft"
                  >
                    Collapse all spots
                  </button>
                )}
                {hasMore && (
                  <button
                    type="button"
                    onClick={() => setVisibleCount((n) => n + 12)}
                    className="rounded-full border border-coastal-soft bg-white px-3 py-1 font-medium text-coastal-navy hover:bg-coastal-soft"
                  >
                    Load more
                  </button>
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </section>
  );
}
