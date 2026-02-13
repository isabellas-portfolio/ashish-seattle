"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Boost = { id: string; text: string };

const DEFAULT_BOOSTS: Boost[] = [
  { id: "proud", text: "so proud of you. like, insanely proud. 🩵" },
  { id: "breathe", text: "don't forget to breathe! i'm on your team. 🫶" },
  { id: "textme", text: "text me when you see this :) (hi i love you)" },
  { id: "oneflight", text: "i'm one flight away. always. ✈️" },
  { id: "coffee", text: "go get a little treat + think of me. ☕️" },
  { id: "win", text: "celebrate your wins today! 🥳" },
  { id: "us", text: "us > distance. always. 💌" },
  { id: "frog", text: "you're a frog. 🐸" },
  { id: "cow", text: "look ashish a cow: 🐮" },
  {id: "god", text: "look at God. 🤍"}

];

function pickRandom<T>(arr: T[], exclude?: T) {
  if (arr.length === 0) return undefined;
  if (arr.length === 1) return arr[0];
  let next = arr[Math.floor(Math.random() * arr.length)];
  if (exclude !== undefined) {
    let tries = 0;
    while (next === exclude && tries < 6) {
      next = arr[Math.floor(Math.random() * arr.length)];
      tries++;
    }
  }
  return next;
}

function uid() {
  return Math.random().toString(16).slice(2) + Date.now().toString(16);
}

type Particle = {
  id: string;
  x: number;
  y: number;
  dx: number;
  dy: number;
  rot: number;
  emoji: string;
};

export default function LoveBoost({
  boosts = DEFAULT_BOOSTS,
}: {
  boosts?: Boost[];
}) {
  const [open, setOpen] = useState(false);
  const [current, setCurrent] = useState<Boost | null>(null);
  const [pulsing, setPulsing] = useState(false);
  const [particles, setParticles] = useState<Particle[]>([]);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  const emojis = useMemo(() => ["💙", "✨", "💌", "🫶", "✈️"], []);

  // Auto-close toast
  useEffect(() => {
    if (!open) return;
    const t = window.setTimeout(() => setOpen(false), 10000);
    return () => window.clearTimeout(t);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const burst = () => {
    const el = buttonRef.current;
    if (!el) return;

    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;

    const count = 10;
    const next: Particle[] = Array.from({ length: count }).map((_, i) => {
      const angle = (Math.PI * 2 * i) / count + (Math.random() * 0.6 - 0.3);
      const speed = 1.8 + Math.random() * 2.2;
      return {
        id: uid(),
        x: cx,
        y: cy,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed - (1.2 + Math.random() * 1.2),
        rot: Math.random() * 120 - 60,
        emoji: emojis[Math.floor(Math.random() * emojis.length)],
      };
    });

    setParticles((prev) => [...prev, ...next]);

    window.setTimeout(() => {
      const ids = new Set(next.map((p) => p.id));
      setParticles((prev2) => prev2.filter((p) => !ids.has(p.id)));
    }, 900);
  };

  const onClick = () => {
    const next = pickRandom(boosts, current ?? undefined) ?? null;
    setCurrent(next);
    setOpen(true);

    setPulsing(true);
    window.setTimeout(() => setPulsing(false), 350);

    burst();
  };

  return (
    <>
      {/* Floating Techy-Cool Button */}
      <button
        ref={buttonRef}
        type="button"
        onClick={onClick}
        className={[
          "fixed bottom-6 right-6 z-50",
          "group rounded-full px-4 py-3",
          "border border-[#C8DBEE] bg-white/55 backdrop-blur-md",
          "shadow-[0_12px_30px_rgba(42,61,102,0.18)]",
          "hover:bg-white/70 hover:shadow-[0_14px_36px_rgba(42,61,102,0.22)]",
          "transition",
          "focus:outline-none focus-visible:ring-4 focus-visible:ring-[#89B6E4]/35",
          pulsing ? "scale-[1.03]" : "",
        ].join(" ")}
        aria-label="Tap for a love boost"
      >
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-[#2A3D66]">
            Love boost
          </span>

          <span className="text-sm text-[#2A3D66]/70">💙</span>
        </div>
      </button>

      {/* Toast */}
      <div
        className={[
          "fixed bottom-24 right-6 z-50 w-[min(360px,calc(100vw-3rem))]",
          "transition duration-200",
          open ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2 pointer-events-none",
        ].join(" ")}
        role="status"
        aria-live="polite"
      >
        <div className="relative overflow-hidden rounded-2xl border border-[#DDE8F4] bg-white/70 backdrop-blur-md shadow-[0_18px_50px_rgba(42,61,102,0.18)]">
          <div className="absolute inset-x-0 top-0 h-10 bg-gradient-to-b from-[#E6F0FA]/70 to-transparent" />
          <div className="relative p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold tracking-wide text-[#2A3D66]/70">
                  LOVE BOOST UNLOCKED ✨
                </p>
                <p className="mt-1 text-sm leading-relaxed text-[#2A3D66]">
                  {current?.text ?? "💙"}
                </p>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="rounded-full px-2 py-1 text-xs text-[#2A3D66]/60 hover:text-[#2A3D66] hover:bg-[#E6F0FA] transition"
                aria-label="Close"
              >
                ✕
              </button>
            </div>

            <div className="mt-3 h-[2px] w-full bg-gradient-to-r from-transparent via-[#89B6E4]/70 to-transparent opacity-70" />
          </div>
        </div>
      </div>

      {/* Particle burst layer */}
      <div className="pointer-events-none fixed inset-0 z-50">
        {particles.map((p) => (
          <span
            key={p.id}
            className="absolute select-none love-burst-particle"
            style={{
              left: p.x,
              top: p.y,
              transform: `translate(-50%,-50%) rotate(${p.rot}deg)`,
              ["--dx" as string]: `${p.dx * 42}px`,
              ["--dy" as string]: `${p.dy * 42}px`,
            }}
          >
            {p.emoji}
          </span>
        ))}
      </div>
    </>
  );
}
