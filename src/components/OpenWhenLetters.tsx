"use client";

import { useState, useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import type { OpenWhenLetterNote } from "@/types";
import OpenWhenLetter from "./OpenWhenLetter";
import PasscodeModal from "./PasscodeModal";

const STORAGE_UNLOCKED = "lettersUnlocked";
const STORAGE_UNLOCKED_AT = "lettersUnlockedAt";

function getStoredUnlocked(): boolean {
  if (typeof window === "undefined") return false;
  return localStorage.getItem(STORAGE_UNLOCKED) === "true";
}

function getStoredUnlockedAt(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem(STORAGE_UNLOCKED_AT);
}

function formatOpenedDate(iso: string): string {
  try {
    const d = new Date(iso);
    return d.toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  } catch {
    return "";
  }
}

interface OpenWhenLettersProps {
  notes: OpenWhenLetterNote[];
}

export default function OpenWhenLetters({ notes }: OpenWhenLettersProps) {
  const [unlocked, setUnlocked] = useState(false);
  const [unlockedAt, setUnlockedAt] = useState<string | null>(null);
  const [showPasscodeModal, setShowPasscodeModal] = useState(false);

  useEffect(() => {
    setUnlocked(getStoredUnlocked());
    setUnlockedAt(getStoredUnlockedAt());
  }, []);

  const handleUnlockSuccess = useCallback(() => {
    const at = new Date().toISOString();
    setUnlocked(true);
    setUnlockedAt(at);
    localStorage.setItem(STORAGE_UNLOCKED, "true");
    localStorage.setItem(STORAGE_UNLOCKED_AT, at);
    setShowPasscodeModal(false);
  }, []);

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
        {unlocked ? (
          <>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-coastal-soft bg-coastal-soft/50 px-3 py-1 text-sm font-medium text-coastal-navy">
              <span aria-hidden>💕</span>
              Unlocked
            </span>
            {unlockedAt && (
              <span className="text-xs text-coastal-navy/70">
                Opened on {formatOpenedDate(unlockedAt)}
              </span>
            )}
          </>
        ) : (
          <span className="inline-flex items-center gap-1.5 rounded-full border border-coastal-soft bg-white px-3 py-1 text-sm font-medium text-coastal-navy">
            <span aria-hidden>🔒</span>
            Sealed 💌
          </span>
        )}
      </div>

      <motion.p
        className="mt-2 text-gray-600"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        {unlocked
          ? "Little love notes for when you need them. Click to open."
          : "Little love notes for when you need them. Enter the passcode to open."}
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
              unlocked={unlocked}
              onRequestUnlock={() => setShowPasscodeModal(true)}
            />
          </motion.li>
        ))}
      </ul>

      <PasscodeModal
        isOpen={showPasscodeModal}
        onClose={() => setShowPasscodeModal(false)}
        onSuccess={handleUnlockSuccess}
      />
    </section>
  );
}
