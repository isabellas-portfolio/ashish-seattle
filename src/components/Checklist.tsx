"use client";

import { useCallback, useEffect, useState } from "react";
import { motion } from "framer-motion";
import { dateIdeas } from "@/data/dateIdeas";
import type { DateIdea } from "@/types";

const STORAGE_KEY = "valentine-date-ideas-checked";

function getStoredChecked(): Set<string> {
  if (typeof window === "undefined") return new Set();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return new Set();
    const arr = JSON.parse(raw) as string[];
    return new Set(Array.isArray(arr) ? arr : []);
  } catch {
    return new Set();
  }
}

function setStoredChecked(checked: Set<string>) {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_KEY, JSON.stringify(Array.from(checked)));
}

function pickRandomIdea(lastPickedId: string | null): DateIdea {
  const others = lastPickedId
    ? dateIdeas.filter((d) => d.id !== lastPickedId)
    : dateIdeas;
  const pool = others.length > 0 ? others : dateIdeas;
  return pool[Math.floor(Math.random() * pool.length)];
}

function fireConfetti() {
  if (typeof window === "undefined") return;
  import("canvas-confetti").then(({ default: confetti }) => {
    confetti({
      particleCount: 80,
      spread: 60,
      origin: { y: 0.7 },
      colors: ["#89B6E4", "#DDE8F4", "#2A3D66", "#C48497"],
    });
  });
}

interface PickedDateCardProps {
  idea: DateIdea;
  isChecked: boolean;
  onPickAgain: () => void;
  onMarkAsDone: () => void;
}

function PickedDateCard({
  idea,
  isChecked,
  onPickAgain,
  onMarkAsDone,
}: PickedDateCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: -8 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-4 rounded-2xl border-2 border-coastal-soft bg-gradient-to-br from-coastal-soft/50 to-white p-4 shadow-soft"
    >
      <p className="font-display text-lg font-medium text-coastal-navy">
        {idea.title}
      </p>
      {isChecked ? (
        <p className="mt-2 text-sm text-coastal-navy/80">
          You&apos;ve done this one! Want a new pick?
        </p>
      ) : null}
      <div className="mt-3 flex flex-wrap items-center gap-2">
        <button
          type="button"
          onClick={onPickAgain}
          className="text-sm font-medium text-coastal-navy underline decoration-coastal-soft underline-offset-2 hover:text-coastal-primary hover:decoration-coastal-primary"
        >
          Pick again
        </button>
        {!isChecked && (
          <>
            <span className="text-coastal-soft">·</span>
            <motion.button
              type="button"
              onClick={onMarkAsDone}
              className="rounded-full bg-coastal-primary px-3 py-1.5 text-sm font-medium text-white shadow-soft hover:bg-coastal-navy"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              Mark as done
            </motion.button>
          </>
        )}
      </div>
    </motion.div>
  );
}

export default function Checklist() {
  const [checked, setChecked] = useState<Set<string>>(new Set());
  const [pickedIdea, setPickedIdea] = useState<DateIdea | null>(null);
  const [lastPickedId, setLastPickedId] = useState<string | null>(null);

  useEffect(() => {
    setChecked(getStoredChecked());
  }, []);

  const toggle = useCallback((id: string) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      setStoredChecked(next);
      return next;
    });
  }, []);

  const pickRandom = useCallback(() => {
    const idea = pickRandomIdea(lastPickedId);
    setLastPickedId(idea.id);
    setPickedIdea(idea);
  }, [lastPickedId]);

  const markPickedAsDone = useCallback(() => {
    if (!pickedIdea) return;
    setChecked((prev) => {
      const next = new Set(prev);
      next.add(pickedIdea.id);
      setStoredChecked(next);
      return next;
    });
    fireConfetti();
  }, [pickedIdea]);

  const markAllDone = useCallback(() => {
    const all = new Set(dateIdeas.map((d) => d.id));
    setChecked(all);
    setStoredChecked(all);
  }, []);

  const reset = useCallback(() => {
    setChecked(new Set());
    setStoredChecked(new Set());
  }, []);

  const completed = checked.size;
  const total = dateIdeas.length;

  return (
    <section className="mx-auto max-w-2xl">
      <div className="flex flex-wrap items-center gap-2">
        <motion.h2
          className="font-display text-2xl font-semibold text-coastal-navy md:text-3xl"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Long Distance Date Ideas
        </motion.h2>
        <motion.button
          type="button"
          onClick={pickRandom}
          className="rounded-full bg-coastal-primary px-4 py-2 text-sm font-medium text-white shadow-soft hover:bg-coastal-navy"
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Pick our date 💘
        </motion.button>
      </div>
      <motion.p
        className="mt-2 text-gray-600"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Things we can do together from afar. Check them off as we go.
      </motion.p>

      {pickedIdea ? (
        <PickedDateCard
          idea={pickedIdea}
          isChecked={checked.has(pickedIdea.id)}
          onPickAgain={pickRandom}
          onMarkAsDone={markPickedAsDone}
        />
      ) : null}

      <div className="mt-4 flex flex-wrap items-center gap-3">
        <span className="rounded-full border border-coastal-soft bg-coastal-soft px-3 py-1 text-sm font-medium text-coastal-navy">
          {completed}/{total} completed 💘
        </span>
        <div className="flex gap-2">
          <motion.button
            type="button"
            onClick={markAllDone}
            className="rounded-full bg-coastal-primary px-4 py-2 text-sm font-medium text-white shadow-soft hover:bg-coastal-navy"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Mark all done
          </motion.button>
          <motion.button
            type="button"
            onClick={reset}
            className="rounded-full border border-coastal-soft bg-white px-4 py-2 text-sm font-medium text-coastal-navy hover:bg-coastal-soft"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            Reset
          </motion.button>
        </div>
      </div>

      <ul className="mt-6 space-y-2">
        {dateIdeas.map((idea, i) => (
          <motion.li
            key={idea.id}
            initial={{ opacity: 0, x: -8 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.02 }}
            className="flex items-start gap-3 rounded-xl border border-coastal-soft bg-white p-3 shadow-soft transition-colors hover:border-coastal-primary/40"
          >
            <label className="flex flex-1 cursor-pointer items-start gap-3">
              <input
                type="checkbox"
                checked={checked.has(idea.id)}
                onChange={() => toggle(idea.id)}
                className="mt-1 h-5 w-5 rounded border-coastal-soft text-coastal-primary focus:ring-coastal-primary"
              />
              <span
                className={`text-sm leading-relaxed ${
                  checked.has(idea.id)
                    ? "text-gray-500 line-through"
                    : "text-gray-700"
                }`}
              >
                {idea.title}
              </span>
            </label>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
