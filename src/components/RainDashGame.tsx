"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";

const LANES = 3;
const BASE_SPEED = 2.5;
const BOOST_SPEED = 4.5;
const BOOST_DURATION_MS = 2000;
const PLAYER_SIZE = 44;
const ENTITY_SIZE = 40;
const SPAWN_INTERVAL_MS = 900;
const COLLECTIBLE_CHANCE = 0.28;
const HEART_SCORE = 10;
const RAMEN_SCORE = 15;
const EVERGREEN_SCORE = 5;

const OBSTACLE_TYPES = ["rain", "pothole"] as const;
const GOODIE_TYPES = ["coffee", "heart", "ramen", "evergreen"] as const;
type ObstacleType = (typeof OBSTACLE_TYPES)[number];
type GoodieType = (typeof GOODIE_TYPES)[number];
type EntityType = ObstacleType | GoodieType;

const ENTITY_EMOJI: Record<EntityType, string> = {
  rain: "🌧️",
  pothole: "🕳️",
  coffee: "☕",
  heart: "💙",
  ramen: "🍜",
  evergreen: "🌲",
};

const GOODIE_SCORE: Record<GoodieType, number> = {
  coffee: 0,
  heart: HEART_SCORE,
  ramen: RAMEN_SCORE,
  evergreen: EVERGREEN_SCORE,
};

function isObstacle(t: EntityType): t is ObstacleType {
  return OBSTACLE_TYPES.includes(t as ObstacleType);
}

interface Entity {
  id: number;
  lane: number;
  y: number;
  type: EntityType;
}

interface FloatParticle {
  id: number;
  x: number;
  y: number;
  t: number;
  text?: string;
}

type GameState = "start" | "playing" | "gameover";

const LOSE_MESSAGES = [
  "BROOO YOU GOT RAINED ON 😭☔",
  "SEATTLE SAID NOT TODAY 💧",
  "THE RAIN WINS THIS ROUND 🌧️",
  "RIP DRY CLOTHES",
  "PUDDLE GOT YOU 😅",
  "CLASSIC SEATTLE MOMENT",
  "WATERPROOF YOU ARE NOT 🌂",
  "SO CLOSE… THEN THE RAIN",
];

function pickLoseMessage() {
  return LOSE_MESSAGES[Math.floor(Math.random() * LOSE_MESSAGES.length)];
}

let entityId = 0;
let particleId = 0;
function nextId() {
  return ++entityId;
}
function nextParticleId() {
  return ++particleId;
}

export default function RainDashGame() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [gameState, setGameState] = useState<GameState>("start");
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [message, setMessage] = useState<string | null>(null);
  const [showMobileButtons, setShowMobileButtons] = useState(false);
  const [, setTick] = useState(0);

  const gameStateRef = useRef<GameState>(gameState);
  gameStateRef.current = gameState;

  const playerLaneRef = useRef(1);
  const entitiesRef = useRef<Entity[]>([]);
  const lastSpawnRef = useRef(0);
  const lastScoreTickRef = useRef(0);
  const coffeeBoostUntilRef = useRef(0);
  const animRef = useRef<number>(0);
  const dimsRef = useRef({ w: 320, h: 480, laneW: 0, scale: 1 });
  const scoreRef = useRef(0);
  const highScoreRef = useRef(0);
  const loseMessageRef = useRef(LOSE_MESSAGES[0]);
  const collectParticlesRef = useRef<FloatParticle[]>([]);
  const lastHudTickRef = useRef(0);
  const fontFamilyRef = useRef("Nunito Sans, sans-serif");
  scoreRef.current = score;
  highScoreRef.current = highScore;

  // Use site font from CSS variable so canvas matches rest of site
  useEffect(() => {
    if (typeof document === "undefined") return;
    const resolved = getComputedStyle(document.documentElement).getPropertyValue("--font-body").trim();
    if (resolved) fontFamilyRef.current = resolved + ", sans-serif";
  }, []);

  const getSpeed = useCallback(() => {
    return Date.now() < coffeeBoostUntilRef.current ? BOOST_SPEED : BASE_SPEED;
  }, []);

  const moveLeft = useCallback(() => {
    if (gameState !== "playing") return;
    playerLaneRef.current = Math.max(0, playerLaneRef.current - 1);
  }, [gameState]);

  const moveRight = useCallback(() => {
    if (gameState !== "playing") return;
    playerLaneRef.current = Math.min(LANES - 1, playerLaneRef.current + 1);
  }, [gameState]);

  const startGame = useCallback(() => {
    if (gameState === "playing") return;
    setGameState("playing");
    setScore(0);
    setStreak(0);
    setMessage(null);
    entitiesRef.current = [];
    collectParticlesRef.current = [];
    playerLaneRef.current = 1;
    lastSpawnRef.current = 0;
    lastScoreTickRef.current = Date.now();
    coffeeBoostUntilRef.current = 0;
  }, [gameState]);

  const tryAgain = useCallback(() => {
    setGameState("start");
    setMessage(null);
    entitiesRef.current = [];
    collectParticlesRef.current = [];
    playerLaneRef.current = 1;
    lastSpawnRef.current = 0;
    coffeeBoostUntilRef.current = 0;
  }, []);

  const spawnCollectParticles = useCallback((lane: number, laneW: number, playerY: number, points: number) => {
    const cx = lane * laneW + laneW / 2;
    const count = 6 + Math.floor(Math.random() * 5);
    const now = Date.now();
    for (let i = 0; i < count; i++) {
      collectParticlesRef.current.push({
        id: nextParticleId(),
        x: cx + (Math.random() - 0.5) * 40,
        y: playerY,
        t: now,
      });
    }
    if (points > 0) {
      collectParticlesRef.current.push({
        id: nextParticleId(),
        x: cx,
        y: playerY - 20,
        t: now,
        text: `+${points}`,
      });
    }
  }, []);

  // Keyboard
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (gameState === "start" && (e.code === "Space" || e.code === "KeyS")) {
        e.preventDefault();
        startGame();
        return;
      }
      if (gameState !== "playing") return;
      if (e.code === "ArrowLeft" || e.code === "KeyA") {
        e.preventDefault();
        moveLeft();
      } else if (e.code === "ArrowRight" || e.code === "KeyD") {
        e.preventDefault();
        moveRight();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [gameState, startGame, moveLeft, moveRight]);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    setShowMobileButtons(mq.matches);
    const fn = () => setShowMobileButtons(window.matchMedia("(max-width: 640px)").matches);
    mq.addEventListener("change", fn);
    return () => mq.removeEventListener("change", fn);
  }, []);

  useEffect(() => {
    try {
      const saved = localStorage.getItem("rainDashHighScore");
      if (saved) setHighScore(Math.max(0, parseInt(saved, 10)));
    } catch {}
  }, []);

  useEffect(() => {
    if (score > highScore) {
      setHighScore(score);
      try {
        localStorage.setItem("rainDashHighScore", String(score));
      } catch {}
    }
  }, [score, highScore]);

  // Game loop
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const maxW = Math.min(400, window.innerWidth - 32);
    const w = Math.floor(maxW / 32) * 32;
    const h = Math.floor((w * 3) / 2);
    const laneW = w / LANES;

    canvas.width = w * dpr;
    canvas.height = h * dpr;
    canvas.style.width = `${w}px`;
    canvas.style.height = `${h}px`;
    dimsRef.current = { w, h, laneW, scale: dpr };

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let lastTime = 0;

    const run = (time: number) => {
      animRef.current = requestAnimationFrame(run);
      const state = gameStateRef.current;
      if (state === "start" || state === "gameover") {
        lastTime = time;
        draw(ctx, dpr, w, h, laneW, state, time);
        return;
      }

      const dt = Math.min(50, time - lastTime);
      lastTime = time;

      const now = Date.now();
      const speed = getSpeed();

      if (now - lastScoreTickRef.current >= 1000) {
        lastScoreTickRef.current = now;
        setScore((s) => s + 1);
      }

      // Spawn: obstacles vs goodies
      if (now - lastSpawnRef.current > SPAWN_INTERVAL_MS) {
        lastSpawnRef.current = now;
        const lane = Math.floor(Math.random() * LANES);
        const isGoodie = Math.random() < COLLECTIBLE_CHANCE;
        let type: EntityType;
        if (isGoodie) {
          const r = Math.random();
          if (r < 0.08) type = "ramen";
          else if (r < 0.2) type = "evergreen";
          else if (r < 0.6) type = "heart";
          else type = "coffee";
        } else {
          type = OBSTACLE_TYPES[Math.floor(Math.random() * OBSTACLE_TYPES.length)];
        }
        entitiesRef.current.push({
          id: nextId(),
          lane,
          y: -ENTITY_SIZE - 10,
          type,
        });
      }

      const toRemove: number[] = [];
      const playerLane = playerLaneRef.current;
      const playerCenterY = h - PLAYER_SIZE - 20;
      const playerTop = playerCenterY - PLAYER_SIZE / 2;
      const playerBottom = playerCenterY + PLAYER_SIZE / 2;

      for (let i = 0; i < entitiesRef.current.length; i++) {
        const e = entitiesRef.current[i];
        e.y += speed * (dt / 16);

        if (e.y > h + ENTITY_SIZE) {
          toRemove.push(i);
          continue;
        }

        if (e.lane === playerLane) {
          const eTop = e.y - ENTITY_SIZE / 2;
          const eBottom = e.y + ENTITY_SIZE / 2;
          if (eBottom >= playerTop && eTop <= playerBottom) {
            if (isObstacle(e.type)) {
              loseMessageRef.current = pickLoseMessage();
              gameStateRef.current = "gameover";
              setGameState("gameover");
              return;
            }
            const goodie = e.type as GoodieType;
            if (goodie === "coffee") {
              coffeeBoostUntilRef.current = now + BOOST_DURATION_MS;
              setMessage("CAFFEINATED. GO GO GO.");
              setTimeout(() => setMessage(null), 1200);
              spawnCollectParticles(e.lane, laneW, playerCenterY, 0);
              toRemove.push(i);
            } else {
              const points = GOODIE_SCORE[goodie];
              setScore((s) => s + points);
              if (goodie === "heart") setStreak((s) => Math.min(3, s + 1));
              spawnCollectParticles(e.lane, laneW, playerCenterY, points);
              toRemove.push(i);
            }
          }
        }
      }

      entitiesRef.current = entitiesRef.current.filter((_, i) => !toRemove.includes(i));

      // Prune old collect particles (older than 900ms)
      const cutoff = now - 900;
      collectParticlesRef.current = collectParticlesRef.current.filter((p) => p.t > cutoff);

      draw(ctx, dpr, w, h, laneW, "playing", time, playerLaneRef.current);

      // Throttled tick so HUD (coffee bar) re-renders
      if (now - lastHudTickRef.current >= 120) {
        lastHudTickRef.current = now;
        setTick((t) => t + 1);
      }
    };

    animRef.current = requestAnimationFrame(run);
    return () => cancelAnimationFrame(animRef.current);
  }, [getSpeed, spawnCollectParticles]);

  function draw(
    ctx: CanvasRenderingContext2D,
    dpr: number,
    w: number,
    h: number,
    laneW: number,
    state: GameState,
    time: number,
    playerLane?: number
  ) {
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.scale(dpr, dpr);
    ctx.clearRect(0, 0, w, h);

    const bg = "#E6F0FA";
    const laneStroke = "#2A3D66";
    const accent = "#89B6E4";
    const navy = "#2A3D66";
    const pink = "#C48497";
    const playerY = h - PLAYER_SIZE - 20;
    const fontFamily = fontFamilyRef.current;

    // Background (light blue to match site)
    ctx.fillStyle = bg;
    ctx.fillRect(0, 0, w, h);

    // Doodled road: dashed lane lines
    ctx.strokeStyle = laneStroke;
    ctx.lineWidth = 3;
    ctx.setLineDash([8, 10]);
    for (let i = 1; i < LANES; i++) {
      ctx.beginPath();
      ctx.moveTo(i * laneW, 0);
      ctx.lineTo(i * laneW, h);
      ctx.stroke();
    }
    ctx.setLineDash([]);

    // Corner doodles (tiny hearts)
    ctx.font = `14px ${fontFamily}`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.globalAlpha = 0.4 + 0.12 * Math.sin(time * 0.003);
    ctx.fillText("💙", 22, 22);
    ctx.fillText("💙", w - 22, 22);
    ctx.fillText("💙", 22, h - 22);
    ctx.fillText("💙", w - 22, h - 22);
    ctx.globalAlpha = 1;

    if (state === "playing" && playerLane !== undefined) {
      // Entities
      for (const e of entitiesRef.current) {
        const x = e.lane * laneW + laneW / 2;
        ctx.save();
        ctx.translate(x, e.y);
        ctx.textAlign = "center";
        ctx.textBaseline = "middle";
        ctx.font = `24px ${fontFamily}`;
        ctx.fillText(ENTITY_EMOJI[e.type], 0, 0);
        ctx.restore();
      }

      // Collect particles (hearts float up + fade, +10 text)
      const now = Date.now();
      for (const p of collectParticlesRef.current) {
        const age = now - p.t;
        const progress = age / 900;
        if (progress >= 1) continue;
        const y = p.y - age * 0.35;
        const alpha = 1 - progress;
        ctx.globalAlpha = alpha;
        if (p.text) {
          ctx.font = `bold 14px ${fontFamily}`;
          ctx.fillStyle = navy;
          ctx.textAlign = "center";
          ctx.fillText(p.text, p.x, y);
        } else {
          ctx.font = `16px ${fontFamily}`;
          ctx.textAlign = "center";
          ctx.fillText("💙", p.x, y);
        }
        ctx.globalAlpha = 1;
      }

      // Player: just emoji, no box
      const px = playerLane * laneW + laneW / 2;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";
      ctx.font = `28px ${fontFamily}`;
      ctx.fillText("👦🏾", px, playerY);
    }

    if (state === "start") {
      ctx.fillStyle = "rgba(246, 247, 250, 0.88)";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = navy;
      ctx.textAlign = "center";
      ctx.font = `bold 13px ${fontFamily}`;
      ctx.fillText("SEATTLE WEATHER SIMULATOR", w / 2, h / 2 - 24);
      ctx.font = `11px ${fontFamily}`;
      ctx.globalAlpha = 0.9;
      ctx.fillText("Dodge the rain, collect the caffeine, survive Bellevue.", w / 2, h / 2 + 2);
      ctx.globalAlpha = 1;
      const bounce = Math.sin(time * 0.004) * 6;
      ctx.font = `20px ${fontFamily}`;
      ctx.fillText("💙", w / 2, h / 2 + 22 + bounce);
      ctx.font = `11px ${fontFamily}`;
      ctx.fillText("Press Space / Tap to start", w / 2, h / 2 + 44);
    }

    if (state === "gameover") {
      ctx.fillStyle = "rgba(246, 247, 250, 0.92)";
      ctx.fillRect(0, 0, w, h);
      ctx.fillStyle = pink;
      ctx.font = `bold 15px ${fontFamily}`;
      ctx.textAlign = "center";
      ctx.fillText(loseMessageRef.current, w / 2, h / 2 - 8);
      ctx.fillStyle = navy;
      ctx.font = `12px ${fontFamily}`;
      ctx.fillText(`Score: ${String(scoreRef.current).padStart(4, "0")}  •  Best: ${String(highScoreRef.current).padStart(4, "0")}`, w / 2, h / 2 + 32);
      const s = scoreRef.current;
      const tagline = s >= 200
        ? "Wow, have you lived in Seattle your whole life??"
        : s >= 100
          ? "Great job you're almost a real Seattle-r!"
          : "Seattle certified-ish.";
      ctx.fillText(tagline, w / 2, h / 2 + 50);
    }
  }

  const handleCanvasPointer = (e: React.MouseEvent<HTMLCanvasElement> | React.TouchEvent<HTMLCanvasElement>) => {
    const clientX = "touches" in e ? e.touches[0]?.clientX : e.clientX;
    if (clientX == null) return;
    if (gameState === "start") {
      startGame();
      return;
    }
    if (gameState !== "playing") return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const x = clientX - rect.left;
    if (x < rect.width / 2) moveLeft();
    else moveRight();
  };

  const handleStartTouch = (e: React.TouchEvent) => {
    if (gameState === "start") {
      e.preventDefault();
      startGame();
    }
  };

  const coffeeRemaining = gameState === "playing" ? Math.max(0, coffeeBoostUntilRef.current - Date.now()) : 0;
  const coffeeSegments = 5;
  const filledSegments = coffeeRemaining > 0 ? Math.ceil((coffeeRemaining / BOOST_DURATION_MS) * coffeeSegments) : 0;

  return (
    <div className="rain-dash-wrap relative flex flex-col items-center w-full">
      {/* Cute HUD at top - sticker bar */}
      {gameState === "playing" && (
        <div className="rain-dash-hud mb-3">
          <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 text-xs font-body">
            <span className="text-[#2A3D66]">
              Score: <strong className="text-[#1a2744]">{String(score).padStart(4, "0")}</strong>
            </span>
            <span className="text-[#2A3D66]">
              High: <strong className="text-[#1a2744]">{String(highScore).padStart(4, "0")}</strong>
            </span>
            <span className="text-[#2A3D66]">
              Streak: <span className="text-base">{["", "💙", "💙💙", "💙💙💙"][streak] || "—"}</span>
            </span>
            <span className="text-[#2A3D66] flex items-center gap-1">
              Coffee:{" "}
              <span className="inline-flex gap-0.5">
                {Array.from({ length: coffeeSegments }).map((_, i) => (
                  <span
                    key={i}
                    className={`inline-block w-2 h-2 rounded-sm ${i < filledSegments ? "bg-[#89B6E4]" : "bg-[#C8DBEE]/50"}`}
                  />
                ))}
              </span>
            </span>
          </div>
        </div>
      )}

      <div className="relative inline-block">
        <canvas
          ref={canvasRef}
          className="block rounded-lg border-2 border-[#2A3D66] cursor-pointer"
          onClick={handleCanvasPointer}
          onTouchStart={handleStartTouch}
          onTouchEnd={(e) => {
            if (gameState !== "playing") return;
            e.preventDefault();
            const t = e.changedTouches[0];
            if (!t) return;
            const canvas = canvasRef.current;
            if (!canvas) return;
            const rect = canvas.getBoundingClientRect();
            const x = t.clientX - rect.left;
            if (x < rect.width / 2) moveLeft();
            else moveRight();
          }}
          style={{ touchAction: "manipulation" }}
        />
        {message && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="rounded-full border-2 border-[#C8DBEE] bg-white/90 px-4 py-1.5 text-sm font-bold text-[#2A3D66] shadow-lg">
              {message}
            </span>
          </div>
        )}
      </div>

      {gameState === "start" && (
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={startGame}
            className="rain-dash-start-pill rounded-full border-2 border-[#89B6E4] bg-white/90 px-6 py-2.5 text-sm font-bold text-[#2A3D66] shadow-md hover:bg-[#E6F0FA] transition"
          >
            tap to start
          </button>
        </div>
      )}

      {gameState === "gameover" && (
        <div className="mt-4 flex justify-center">
          <button
            type="button"
            onClick={tryAgain}
            className="rounded-full border-2 border-[#2A3D66] bg-[#89B6E4] px-6 py-2.5 text-sm font-bold text-[#1a2744] hover:bg-[#C8DBEE] transition"
          >
            try again (i believe in u)
          </button>
        </div>
      )}

      {showMobileButtons && gameState === "playing" && (
        <div className="mt-4 flex justify-center gap-6">
          <button
            type="button"
            className="rounded-full border-2 border-[#2A3D66] bg-white/90 px-6 py-3 text-xl text-[#2A3D66] shadow-md active:bg-[#E6F0FA]"
            onTouchStart={(e) => {
              e.preventDefault();
              moveLeft();
            }}
            aria-label="Move left"
          >
            ◀
          </button>
          <button
            type="button"
            className="rounded-full border-2 border-[#2A3D66] bg-white/90 px-6 py-3 text-xl text-[#2A3D66] shadow-md active:bg-[#E6F0FA]"
            onTouchStart={(e) => {
              e.preventDefault();
              moveRight();
            }}
            aria-label="Move right"
          >
            ▶
          </button>
        </div>
      )}
    </div>
  );
}
