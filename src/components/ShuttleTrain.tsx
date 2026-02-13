"use client";

import React, { useEffect, useMemo, useState } from "react";

type Props = {
  durationMs?: number; // time for one direction
  insetPx?: number; // padding so it doesn't hit labels
  sizePx?: number;
  faceDirection?: boolean; // if true, it flips cleanly at ends
};

export default function ShuttleTrain({
  durationMs = 2600,
  insetPx = 56,
  sizePx = 22,
  faceDirection = true,
}: Props) {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    if (!mq) return;
    const update = () => setReduced(!!mq.matches);
    update();
    mq.addEventListener?.("change", update);
    return () => mq.removeEventListener?.("change", update);
  }, []);

  const styleVars = useMemo(
    () =>
      ({
        ["--train-duration" as string]: `${durationMs}ms`,
        ["--train-inset" as string]: `${insetPx}px`,
        ["--train-size" as string]: `${sizePx}px`,
      }) as React.CSSProperties,
    [durationMs, insetPx, sizePx]
  );

  if (reduced) {
    return (
      <div className="absolute inset-0 pointer-events-none flex items-center justify-center" aria-hidden>
        <div className="text-lg">🚆</div>
      </div>
    );
  }

  return (
    <div className="absolute inset-0 pointer-events-none" style={styleVars} aria-hidden>
      <div
        className="shuttle-train"
        data-face={faceDirection ? "1" : "0"}
      >
        <span
          className="shuttle-train-icon"
          style={{ fontSize: "var(--train-size)", lineHeight: 1 }}
        >
          🚆
        </span>
      </div>
    </div>
  );
}
