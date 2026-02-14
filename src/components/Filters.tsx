"use client";

import { useState, useMemo, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import type { RecCategory, RecLocation, Cuisine } from "@/types";
import { REC_CATEGORIES, seattleRecs } from "@/data/recs";

const CATEGORY_LABELS: Record<RecCategory, string> = {
  food: "Food & eats",
  coffee: "Coffee",
  bar: "Bar",
  outdoors: "Outdoors",
  neighborhoods: "Neighborhoods",
  culture: "Culture",
  practical: "Practical",
};

const LOCATION_OPTIONS: { value: "All" | RecLocation; label: string; emoji: string }[] = [
  { value: "All", label: "All locations", emoji: "" },
  { value: "Seattle", label: "Seattle", emoji: "📍" },
  { value: "Bellevue", label: "Bellevue", emoji: "🏙" },
];

const CATEGORY_OPTIONS: { value: RecCategory | "all"; label: string; emoji: string }[] = [
  { value: "all", label: "All categories", emoji: "" },
  { value: "food", label: CATEGORY_LABELS.food, emoji: "🍜" },
  { value: "coffee", label: CATEGORY_LABELS.coffee, emoji: "☕" },
  { value: "bar", label: CATEGORY_LABELS.bar, emoji: "🍸" },
  { value: "outdoors", label: CATEGORY_LABELS.outdoors, emoji: "🌲" },
  { value: "neighborhoods", label: CATEGORY_LABELS.neighborhoods, emoji: "🏘" },
  { value: "culture", label: CATEGORY_LABELS.culture, emoji: "🎭" },
  { value: "practical", label: CATEGORY_LABELS.practical, emoji: "🔧" },
];

interface FiltersProps {
  activeLocation: "All" | RecLocation;
  onLocationChange: (v: "All" | RecLocation) => void;
  activeCategory: RecCategory | "all" | "wfh-friendly";
  onCategoryChange: (v: RecCategory | "all" | "wfh-friendly") => void;
  activeCuisine: Cuisine | "all";
  onCuisineChange: (v: Cuisine | "all") => void;
}

export default function Filters({
  activeLocation,
  onLocationChange,
  activeCategory,
  onCategoryChange,
  activeCuisine,
  onCuisineChange,
}: FiltersProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [locationOpen, setLocationOpen] = useState(false);
  const [categoryOpen, setCategoryOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const categoryRef = useRef<HTMLDivElement>(null);

  const isWfh = activeCategory === "wfh-friendly";
  const showCuisine = activeCategory === "food";

  const availableCuisines = useMemo(() => {
    const list = seattleRecs
      .filter((r) => r.category === "food" && r.cuisine)
      .map((r) => r.cuisine!)
      .filter((c, i, arr) => arr.indexOf(c) === i)
      .sort();
    return list as Cuisine[];
  }, []);

  const filterCount = useMemo(() => {
    let n = 0;
    if (activeLocation !== "All") n++;
    if (activeCategory !== "all") n++;
    if (showCuisine && activeCuisine !== "all") n++;
    return n;
  }, [activeLocation, activeCategory, showCuisine, activeCuisine]);

  const activePills = useMemo(() => {
    const pills: { id: string; label: string; onClear: () => void }[] = [];
    if (activeLocation !== "All") pills.push({ id: "loc", label: activeLocation, onClear: () => onLocationChange("All") });
    if (activeCategory !== "all")
      pills.push({
        id: "cat",
        label: activeCategory === "wfh-friendly" ? "WFH" : CATEGORY_LABELS[activeCategory as RecCategory],
        onClear: () => onCategoryChange("all"),
      });
    if (showCuisine && activeCuisine !== "all")
      pills.push({ id: "cuisine", label: activeCuisine, onClear: () => onCuisineChange("all") });
    return pills;
  }, [activeLocation, activeCategory, activeCuisine, showCuisine, onLocationChange, onCategoryChange, onCuisineChange]);

  const pillDisplay = activePills.slice(0, 3);
  const overflowCount = activePills.length - 3;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (locationRef.current && !locationRef.current.contains(target)) setLocationOpen(false);
      if (categoryRef.current && !categoryRef.current.contains(target)) setCategoryOpen(false);
      if (drawerRef.current && !drawerRef.current.contains(target)) setDrawerOpen(false);
    }
    if (locationOpen || categoryOpen || drawerOpen) document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, [locationOpen, categoryOpen, drawerOpen]);

  const categorySelectValue = activeCategory === "wfh-friendly" ? "all" : activeCategory;

  return (
    <div className="flex flex-col gap-2">
      {/* One row: Location ▾  Category ▾  Filters (n) */}
      <div className="flex flex-wrap items-center gap-2">
        {/* Location dropdown pill */}
        <div className="relative" ref={locationRef}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setLocationOpen((o) => !o);
              setCategoryOpen(false);
            }}
            className={`flex items-center gap-1.5 rounded-full border-2 px-4 py-2 text-sm font-medium shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-coastal-primary/20 ${
              locationOpen
                ? "border-coastal-primary bg-coastal-soft text-coastal-navy"
                : "border-coastal-soft bg-white text-coastal-navy hover:bg-coastal-soft/80"
            }`}
            aria-haspopup="listbox"
            aria-expanded={locationOpen}
          >
            <span>
              {(() => {
                const opt = LOCATION_OPTIONS.find((o) => o.value === activeLocation);
                return opt ? (opt.emoji ? `${opt.emoji} ` : "") + opt.label : "All locations";
              })()}
            </span>
            <svg className="h-4 w-4 text-coastal-navy/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <AnimatePresence>
            {locationOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                role="listbox"
                className="absolute left-0 z-20 mt-1 min-w-[10rem] rounded-xl border border-coastal-soft bg-white py-1 shadow-soft"
              >
                {LOCATION_OPTIONS.map((opt) => (
                  <li key={opt.value} role="option" aria-selected={activeLocation === opt.value}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onLocationChange(opt.value);
                        setLocationOpen(false);
                      }}
                      className={`flex w-full items-center gap-2 px-4 py-2 text-left text-sm font-medium transition-colors ${
                        activeLocation === opt.value
                          ? "bg-coastal-primary text-white"
                          : "text-coastal-navy hover:bg-coastal-soft"
                      }`}
                    >
                      {opt.emoji && <span>{opt.emoji}</span>}
                      {opt.label}
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        {/* Category dropdown pill */}
        <div className="relative" ref={categoryRef}>
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setCategoryOpen((o) => !o);
              setLocationOpen(false);
            }}
            className={`flex items-center gap-1.5 rounded-full border-2 px-4 py-2 text-sm font-medium shadow-sm transition-colors focus:outline-none focus:ring-2 focus:ring-coastal-primary/20 ${
              categoryOpen
                ? "border-coastal-primary bg-coastal-soft text-coastal-navy"
                : "border-coastal-soft bg-white text-coastal-navy hover:bg-coastal-soft/80"
            }`}
            aria-haspopup="listbox"
            aria-expanded={categoryOpen}
          >
            <span>
              {(() => {
                const opt = CATEGORY_OPTIONS.find((o) => o.value === categorySelectValue);
                return opt ? (opt.emoji ? `${opt.emoji} ` : "") + opt.label : "All categories";
              })()}
            </span>
            <svg className="h-4 w-4 text-coastal-navy/60" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </button>
          <AnimatePresence>
            {categoryOpen && (
              <motion.ul
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                role="listbox"
                className="absolute left-0 z-20 mt-1 min-w-[11rem] rounded-xl border border-coastal-soft bg-white py-1 shadow-soft"
              >
                {CATEGORY_OPTIONS.map((opt) => (
                  <li key={opt.value} role="option" aria-selected={categorySelectValue === opt.value}>
                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        onCategoryChange(opt.value);
                        setCategoryOpen(false);
                      }}
                      className={`flex w-full items-center gap-2 px-4 py-2 text-left text-sm font-medium transition-colors ${
                        categorySelectValue === opt.value
                          ? "bg-coastal-primary text-white"
                          : "text-coastal-navy hover:bg-coastal-soft"
                      }`}
                    >
                      {opt.emoji && <span>{opt.emoji}</span>}
                      {opt.label}
                    </button>
                  </li>
                ))}
              </motion.ul>
            )}
          </AnimatePresence>
        </div>

        <div className="relative ml-auto" ref={drawerRef}>
          <button
            type="button"
            onClick={() => setDrawerOpen((o) => !o)}
            className={`flex items-center gap-1.5 rounded-full border-2 px-4 py-2 text-sm font-medium shadow-sm transition-colors ${
              drawerOpen
                ? "border-coastal-primary bg-coastal-soft text-coastal-navy"
                : "border-coastal-soft bg-white text-coastal-navy hover:bg-coastal-soft"
            }`}
          >
            <span>Filters{filterCount > 0 ? ` (${filterCount})` : ""}</span>
            <svg className="h-4 w-4 text-coastal-navy/70" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
            </svg>
          </button>

          <AnimatePresence>
            {drawerOpen && (
              <motion.div
                initial={{ opacity: 0, y: -4 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -4 }}
                transition={{ duration: 0.15 }}
                className="absolute right-0 z-20 mt-1 w-64 rounded-xl border border-coastal-soft bg-white p-3 shadow-soft"
              >
                <p className="mb-3 text-xs text-coastal-navy/70">little preferences ✨</p>
                <label className="flex cursor-pointer items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isWfh}
                    onChange={(e) => onCategoryChange(e.target.checked ? "wfh-friendly" : "all")}
                    className="h-4 w-4 rounded border-coastal-soft text-coastal-primary focus:ring-coastal-primary"
                  />
                  <span className="text-sm font-medium text-coastal-navy">WFH-friendly only</span>
                </label>
                {showCuisine && (
                  <div className="mt-3 border-t border-coastal-soft pt-3">
                    <p className="mb-2 text-xs font-medium text-coastal-navy/80">Cuisine</p>
                    <div className="flex flex-wrap gap-1.5">
                      <button
                        type="button"
                        onClick={() => onCuisineChange("all")}
                        className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                          activeCuisine === "all"
                            ? "bg-coastal-primary text-white"
                            : "bg-coastal-soft/50 text-coastal-navy hover:bg-coastal-soft"
                        }`}
                      >
                        All
                      </button>
                      {availableCuisines.map((c) => (
                        <button
                          key={c}
                          type="button"
                          onClick={() => onCuisineChange(c)}
                          className={`rounded-full px-3 py-1.5 text-xs font-medium ${
                            activeCuisine === c
                              ? "bg-coastal-primary text-white"
                              : "bg-coastal-soft/50 text-coastal-navy hover:bg-coastal-soft"
                          }`}
                        >
                          {c}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Active filters pills (max 3, then +N) */}
      {activePills.length > 0 && (
        <div className="flex flex-wrap items-center gap-1.5">
          {pillDisplay.map(({ id, label, onClear }) => (
            <span
              key={id}
              className="inline-flex items-center gap-1 rounded-full border border-coastal-soft bg-coastal-soft/50 py-1 pl-2.5 pr-1 text-xs font-medium text-coastal-navy"
            >
              {label}
              <button
                type="button"
                onClick={onClear}
                className="rounded-full p-0.5 hover:bg-coastal-navy/10"
                aria-label={`Remove ${label}`}
              >
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </span>
          ))}
          {overflowCount > 0 && (
            <span className="text-xs font-medium text-coastal-navy/70">+{overflowCount}</span>
          )}
        </div>
      )}
    </div>
  );
}
