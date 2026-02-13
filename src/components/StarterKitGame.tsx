"use client";

import React, { useEffect, useMemo, useState } from "react";

type KitItem = {
  id: string;
  label: string;
  emoji: string;
  required?: boolean;
};

const ITEMS: KitItem[] = [
  { id: "umbrella", label: "Umbrella", emoji: "☔", required: true },
  { id: "jacket", label: "Rain jacket", emoji: "🧥", required: true },
  { id: "coffee", label: "Coffee", emoji: "☕", required: false },
  { id: "boots", label: "Boots", emoji: "🥾", required: false },
  { id: "you", label: "You", emoji: "💙", required: true },
];

const STORAGE_KEY = "seattleStarterKitPacked_v1";

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export default function StarterKitGame() {
  const [draggingId, setDraggingId] = useState<string | null>(null);
  const [packedIds, setPackedIds] = useState<string[]>([]);
  const [dropActive, setDropActive] = useState(false);
  const [result, setResult] = useState<{ tone: "ok" | "warn"; text: string } | null>(null);
  const [sparkles, setSparkles] = useState<Array<{ id: string; x: number; y: number; t: number }>>([]);

  const packedSet = useMemo(() => new Set(packedIds), [packedIds]);
  const unpacked = useMemo(() => ITEMS.filter((i) => !packedSet.has(i.id)), [packedSet]);
  const packed = useMemo(() => ITEMS.filter((i) => packedSet.has(i.id)), [packedSet]);

  // load/save
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) setPackedIds(parsed.filter((x) => typeof x === "string"));
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(packedIds));
    } catch {
      // ignore
    }
  }, [packedIds]);

  const pack = (id: string) => {
    setPackedIds((prev) => (prev.includes(id) ? prev : [...prev, id]));
  };

  const unpack = (id: string) => {
    setPackedIds((prev) => prev.filter((x) => x !== id));
  };

  const onDragStart = (e: React.DragEvent, id: string) => {
    setDraggingId(id);
    setResult(null);
    e.dataTransfer.setData("text/plain", id);
    e.dataTransfer.effectAllowed = "move";
  };

  const onDragEnd = () => {
    setDraggingId(null);
    setDropActive(false);
  };

  const onDropSuitcase = (e: React.DragEvent) => {
    e.preventDefault();
    setDropActive(false);
    const id = e.dataTransfer.getData("text/plain");
    if (id) pack(id);
    setDraggingId(null);
  };

  const onDragOverSuitcase = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setDropActive(true);
  };

  const finishPacking = () => {
    const hasUmbrella = packedSet.has("umbrella");
    const hasYou = packedSet.has("you");

    if (!hasUmbrella) {
      setResult({ tone: "warn", text: "Rookie mistake. Seattle rain does not play 😭☔" });
      return;
    }
    if (!hasYou) {
      setResult({ tone: "warn", text: "Excuse me… you forgot the most important item 💙" });
      return;
    }

    // cute success
    setResult({ tone: "ok", text: "Perfect. Seattle starter kit packed ✅ Now go be iconic ✨" });

    // sparkles burst near suitcase
    const now = Date.now();
    const burst = Array.from({ length: 14 }).map((_, idx) => ({
      id: `${now}-${idx}`,
      x: 50 + (Math.random() * 26 - 13), // % relative
      y: 52 + (Math.random() * 26 - 13),
      t: now,
    }));
    setSparkles(burst);
    window.setTimeout(() => setSparkles([]), 900);
  };

  const reset = () => {
    setPackedIds([]);
    setResult(null);
  };

  return (
    <div className="relative mx-auto w-full max-w-[980px]">
      <div className="rounded-[28px] border border-[#DDE8F4] bg-[#FFFAF4] shadow-sm overflow-hidden">
        {/* header */}
        <div className="px-7 pt-6 pb-4">
          <div className="flex flex-wrap items-start justify-between gap-3">
            <div>
              <h3 className="text-2xl font-semibold text-[#2A3D66]">
                Pack your Seattle starter kit <span className="opacity-70">🧳</span>
              </h3>
              <p className="mt-1 text-sm text-[#2A3D66]/70">
                Drag items into the suitcase. (Yes, <span className="font-medium">you</span> are an item.)
              </p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={finishPacking}
                className="rounded-full border border-[#C8DBEE] bg-white/60 px-4 py-2 text-sm font-medium text-[#2A3D66]
                           shadow-sm hover:bg-white/80 transition focus:outline-none focus-visible:ring-4 focus-visible:ring-[#89B6E4]/35"
              >
                Finish packing ✨
              </button>
              <button
                onClick={reset}
                className="rounded-full border border-[#DDE8F4] bg-transparent px-4 py-2 text-sm font-medium text-[#2A3D66]/70
                           hover:bg-white/50 transition"
              >
                Reset
              </button>
            </div>
          </div>

          {/* result toast */}
          {result && (
            <div
              className={cx(
                "mt-4 rounded-2xl border px-4 py-3 text-sm shadow-sm",
                result.tone === "ok"
                  ? "border-[#C8DBEE] bg-white/65 text-[#2A3D66]"
                  : "border-[#E9C6D0] bg-white/65 text-[#2A3D66]"
              )}
            >
              <span className="font-semibold">
                {result.tone === "ok" ? "✅" : "⚠️"}
              </span>{" "}
              {result.text}
            </div>
          )}
        </div>

        {/* body */}
        <div className="grid gap-6 px-7 pb-7 md:grid-cols-[1fr_1fr]">
          {/* left: items */}
          <div className="rounded-2xl border border-[#DDE8F4] bg-white/40 p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold tracking-wide text-[#2A3D66]/70">
                ITEMS
              </p>
              <p className="text-xs text-[#2A3D66]/55">
                Drag into suitcase →
              </p>
            </div>

            <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {unpacked.map((item) => (
                <div
                  key={item.id}
                  draggable
                  onDragStart={(e) => onDragStart(e, item.id)}
                  onDragEnd={onDragEnd}
                  className={cx(
                    "group cursor-grab active:cursor-grabbing select-none",
                    "rounded-2xl border border-[#DDE8F4] bg-white/70 px-4 py-3 shadow-sm",
                    "hover:shadow-md hover:-translate-y-[1px] transition",
                    draggingId === item.id && "opacity-60"
                  )}
                  title="Drag me!"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{item.emoji}</span>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <p className="truncate text-sm font-semibold text-[#2A3D66]">
                          {item.label}
                        </p>
                        {item.required && (
                          <span className="rounded-full border border-[#C8DBEE] bg-[#E6F0FA] px-2 py-0.5 text-[11px] font-medium text-[#2A3D66]/80">
                            essential
                          </span>
                        )}
                      </div>
                      <p className="mt-0.5 text-xs text-[#2A3D66]/60">
                        drag + drop
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {unpacked.length === 0 && (
              <div className="mt-4 rounded-2xl border border-dashed border-[#C8DBEE] bg-white/40 px-4 py-4 text-sm text-[#2A3D66]/70">
                Everything is packed 👀 go hit "Finish packing" ✨
              </div>
            )}
          </div>

          {/* right: suitcase */}
          <div className="relative rounded-2xl border border-[#DDE8F4] bg-white/35 p-5">
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold tracking-wide text-[#2A3D66]/70">
                SUITCASE
              </p>
              <p className="text-xs text-[#2A3D66]/55">
                {packed.length} / {ITEMS.length} packed
              </p>
            </div>

            <div
              onDrop={onDropSuitcase}
              onDragOver={onDragOverSuitcase}
              onDragEnter={() => setDropActive(true)}
              onDragLeave={() => setDropActive(false)}
              className={cx(
                "mt-4 relative rounded-[24px] border-2 border-dashed p-5 min-h-[280px]",
                dropActive ? "border-[#89B6E4] bg-[#E6F0FA]/40" : "border-[#C8DBEE] bg-white/35"
              )}
            >
              {/* suitcase illustration */}
              <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-[0.18]">
                <div className="text-[110px]">🧳</div>
              </div>

              {/* sparkle burst */}
              {sparkles.map((s) => (
                <span
                  key={s.id}
                  className="pointer-events-none absolute text-lg sparkle-pop"
                  style={{
                    left: `${s.x}%`,
                    top: `${s.y}%`,
                  }}
                >
                  ✨
                </span>
              ))}

              {packed.length === 0 ? (
                <div className="relative z-10 mt-10 text-center">
                  <p className="text-sm font-medium text-[#2A3D66]/75">
                    Drop items here
                  </p>
                  <p className="mt-1 text-xs text-[#2A3D66]/55">
                    (Seattle weather test begins immediately.)
                  </p>
                </div>
              ) : (
                <div className="relative z-10 grid grid-cols-1 gap-3 sm:grid-cols-2">
                  {packed.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => unpack(item.id)}
                      className="group flex items-center gap-3 rounded-2xl border border-[#DDE8F4] bg-white/75 px-4 py-3 text-left shadow-sm
                                 hover:bg-white transition"
                      title="Click to remove"
                    >
                      <span className="text-2xl">{item.emoji}</span>
                      <div className="min-w-0 flex-1">
                        <p className="truncate text-sm font-semibold text-[#2A3D66]">
                          {item.label}
                        </p>
                        <p className="mt-0.5 text-xs text-[#2A3D66]/60">
                          packed • click to remove
                        </p>
                      </div>
                      <span className="text-xs text-[#2A3D66]/40 group-hover:text-[#2A3D66]/70 transition">
                        ✕
                      </span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            <p className="mt-3 text-center text-xs text-[#2A3D66]/55">
              Pro tip: umbrella is basically required. ☔
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
