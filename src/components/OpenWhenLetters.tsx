"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import type { OpenWhenLetterNote } from "@/types";
import OpenWhenLetter from "./OpenWhenLetter";
import PasscodeModal from "./PasscodeModal";

const STORAGE_OPENED_IDS = "openedLetterIds";

function getStoredOpenedIds(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = localStorage.getItem(STORAGE_OPENED_IDS);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown;
    return Array.isArray(parsed) ? parsed.filter((x): x is string => typeof x === "string") : [];
  } catch {
    return [];
  }
}

function persistOpenedIds(ids: string[]): void {
  if (typeof window === "undefined") return;
  localStorage.setItem(STORAGE_OPENED_IDS, JSON.stringify(ids));
}

interface OpenWhenLettersProps {
  notes: OpenWhenLetterNote[];
}

export default function OpenWhenLetters({ notes }: OpenWhenLettersProps) {
  const [openedIds, setOpenedIds] = useState<Set<string>>(new Set());
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);
  const [activeLetterId, setActiveLetterId] = useState<string | null>(null);
  const [pendingOpenId, setPendingOpenId] = useState<string | null>(null);

  useEffect(() => {
    setOpenedIds(new Set(getStoredOpenedIds()));
  }, []);

  const handleUnlockSuccess = useCallback(() => {
    if (!activeLetterId) return;
    const next = new Set(openedIds);
    next.add(activeLetterId);
    setOpenedIds(next);
    persistOpenedIds([...next]);
    setPendingOpenId(activeLetterId);
    setActiveLetterId(null);
    setShowPasscodeModal(false);
    setTimeout(() => setPendingOpenId(null), 300);
  }, [activeLetterId, openedIds]);

  const openCount = openedIds.size;
  const totalCount = notes.length;

  return (
    <section className="mx-auto max-w-4xl">
      <motion.h2
        className="font-display text-2xl font-semibold text-coastal-navy md:text-3xl"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        Open when… letters
      </motion.h2>

      <div className="mt-2 flex flex-wrap items-center gap-2">
        {openCount === 0 ? (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-coastal-soft bg-white px-3 py-1 text-sm font-medium text-coastal-navy">
            <span aria-hidden>🔒</span>
            Sealed 💌
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-coastal-soft bg-coastal-soft/50 px-3 py-1 text-sm font-medium text-coastal-navy">
            <span aria-hidden>💕</span>
            {openCount}/{totalCount} opened
          </span>
        )}
      </div>

      <motion.p
        className="mt-2 text-gray-600"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {openCount === 0
          ? "Little love notes for when you need them. Enter the passcode to open each one."
          : "Little love notes for when you need them. Click to open."}
      </motion.p>

      <ul className="mt-8 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
        {notes.map((note, i) => (
          <motion.li
            key={note.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.06, duration: 0.35 }}
          >
            <OpenWhenLetter
              id={note.id}
              title={note.title}
              message={note.message}
              unlocked={openedIds.has(note.id)}
              onRequestUnlock={() => {
                setActiveLetterId(note.id);
                setShowPasscodeModal(true);
              }}
              initialOpen={pendingOpenId === note.id}
            />
          </motion.li>
        ))}
      </ul>

      <PasscodeModal
        isOpen={showPasscodeModal}
        onClose={() => {
          setShowPasscodeModal(false);
          setActiveLetterId(null);
        }}
        onSuccess={handleUnlockSuccess}
      />
    </section>
  );
}
