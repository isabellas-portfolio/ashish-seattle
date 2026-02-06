"use client";

import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

function normalize(input: string): string {
  return input.trim().toLowerCase().replaceAll(" ", "");
}

interface PasscodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function PasscodeModal({
  isOpen,
  onClose,
  onSuccess,
}: PasscodeModalProps) {
  const [value, setValue] = useState("");
  const [error, setError] = useState(false);

  const expected = typeof process.env.NEXT_PUBLIC_OPENWHEN_PASSCODE === "string"
    ? normalize(process.env.NEXT_PUBLIC_OPENWHEN_PASSCODE)
    : "";

  const handleSubmit = useCallback(
    (e: React.FormEvent) => {
      e.preventDefault();
      setError(false);
      if (normalize(value) === expected) {
        onSuccess();
        onClose();
        setValue("");
      } else {
        setError(true);
      }
    },
    [value, expected, onSuccess, onClose]
  );

  const handleClose = useCallback(() => {
    setValue("");
    setError(false);
    onClose();
  }, [onClose]);

  return (
    <AnimatePresence mode="wait">
      {isOpen && (
      <motion.div
        key="passcode-modal"
        className="fixed inset-0 z-50 flex items-center justify-center p-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      >
        <motion.div
          className="absolute inset-0 bg-coastal-navy/30 backdrop-blur-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={handleClose}
          aria-hidden
        />
        <motion.div
          role="dialog"
          aria-modal="true"
          aria-labelledby="passcode-title"
          className="relative w-full max-w-sm rounded-2xl border-2 border-coastal-soft bg-[#FFFAF4] p-6 shadow-soft"
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.96 }}
          transition={{ duration: 0.2 }}
          onClick={(e) => e.stopPropagation()}
        >
          <p
            id="passcode-title"
            className="font-display text-center text-lg font-medium text-coastal-navy"
          >
            Enter the passcode to break the seal 💌
          </p>
          <form onSubmit={handleSubmit} className="mt-4">
            <input
              type="password"
              value={value}
              onChange={(e) => {
                setValue(e.target.value);
                setError(false);
              }}
              placeholder="type the passcode…"
              className="w-full rounded-xl border-2 border-coastal-soft bg-white px-4 py-3 text-coastal-navy placeholder:text-coastal-navy/50 focus:border-coastal-primary focus:outline-none focus:ring-2 focus:ring-coastal-primary/20"
              autoFocus
              autoComplete="off"
            />
            {error && (
              <p className="mt-2 text-center text-sm text-red-600">
                Not quite—try again!
              </p>
            )}
            <p className="mt-2 text-center text-xs text-coastal-navy/70">
              Hint: it&apos;s something we both know :)
            </p>
            <div className="mt-4 flex gap-2">
              <button
                type="button"
                onClick={handleClose}
                className="flex-1 rounded-xl border-2 border-coastal-soft bg-white py-2 text-sm font-medium text-coastal-navy hover:bg-coastal-soft"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="flex-1 rounded-xl bg-coastal-primary py-2 text-sm font-medium text-white shadow-soft hover:bg-coastal-navy"
              >
                Unlock
              </button>
            </div>
          </form>
        </motion.div>
      </motion.div>
      )}
    </AnimatePresence>
  );
}
