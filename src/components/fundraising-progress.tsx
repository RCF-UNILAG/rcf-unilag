"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView, useSpring, useTransform } from "motion/react";

// ─── Config ──────────────────────────────────────────────────────────────────
const CURRENCY = "₦";

function formatAmount(n: number) {
  if (n >= 1_000_000) return `${CURRENCY}${(n / 1_000_000).toFixed(2)}M`;
  if (n >= 1_000) return `${CURRENCY}${(n / 1_000).toFixed(0)}k`;
  return `${CURRENCY}${Math.round(n).toLocaleString()}`;
}

// ─── YouTube-style easing counter ────────────────────────────────────────────
function useEasingCounter(target: number, inView: boolean) {
  const spring = useSpring(0, {
    stiffness: 35,
    damping: 20,
    mass: 1.2,
  });
  const rounded = useTransform(spring, (v) => Math.round(v));
  const [display, setDisplay] = useState(0);

  useEffect(() => {
    if (inView) spring.set(target);
  }, [inView, target, spring]);

  useEffect(() => {
    return rounded.on("change", (v) => setDisplay(v));
  }, [rounded]);

  return display;
}

// ─── Shared label block ───────────────────────────────────────────────────────
function CounterLabel({
  current,
  goal,
  donors,
  inView,
  className = "",
  light = false,
}: {
  current: number;
  goal: number;
  donors: number;
  inView: boolean;
  className?: string;
  light?: boolean;
}) {
  const count = useEasingCounter(current, inView);
  const donorCount = useEasingCounter(donors, inView);
  const pct = Math.round((current / goal) * 100);

  return (
    <div className={`flex flex-col items-center gap-1 ${className}`}>
      <p
        className={`text-4xl sm:text-5xl font-bold tabular-nums tracking-tight ${light ? "text-white" : "text-foreground"}`}
      >
        {formatAmount(count)}
      </p>
      <p className={`text-sm ${light ? "text-white/60" : "text-muted-foreground"}`}>
        of {formatAmount(goal)} goal · {pct}% raised
      </p>
      <p className={`text-xs mt-1 ${light ? "text-white/50" : "text-muted-foreground/70"}`}>
        <span className="font-semibold tabular-nums">{donorCount.toLocaleString()}</span> of 1,000 contributors
      </p>
    </div>
  );
}

// ─── Variant A: Radial SVG Ring ───────────────────────────────────────────────
export function RadialRingProgress({
  current = 482_000,
  donors = 482,
  goal = 1_000_000,
}: {
  current?: number;
  donors?: number;
  goal?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const pct = current / goal;

  const SIZE = 240;
  const STROKE = 14;
  const R = (SIZE - STROKE) / 2;
  const CIRC = 2 * Math.PI * R;
  const MILESTONES = [0.25, 0.5, 0.75];

  const dashOffset = useSpring(CIRC, { stiffness: 30, damping: 20, mass: 1 });

  useEffect(() => {
    if (inView) dashOffset.set(CIRC * (1 - pct));
  }, [inView, pct, dashOffset, CIRC]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-6">
      <div className="relative" style={{ width: SIZE, height: SIZE }}>
        <svg
          width={SIZE}
          height={SIZE}
          viewBox={`0 0 ${SIZE} ${SIZE}`}
          className="-rotate-90"
        >
          <defs>
            <linearGradient id="ring-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="oklch(0.57 0.21 358)" />
              <stop offset="100%" stopColor="oklch(0.53 0.18 319.29)" />
            </linearGradient>
            <filter id="ring-glow">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>
          {/* Track */}
          <circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            fill="none"
            stroke="currentColor"
            strokeWidth={STROKE}
            className="text-muted"
          />
          {/* Milestone ticks */}
          {MILESTONES.map((m) => {
            const angle = m * 2 * Math.PI - Math.PI / 2;
            const x1 = SIZE / 2 + (R - STROKE / 2 - 2) * Math.cos(angle);
            const y1 = SIZE / 2 + (R - STROKE / 2 - 2) * Math.sin(angle);
            const x2 = SIZE / 2 + (R + STROKE / 2 + 2) * Math.cos(angle);
            const y2 = SIZE / 2 + (R + STROKE / 2 + 2) * Math.sin(angle);
            return (
              <line
                key={m}
                x1={x1}
                y1={y1}
                x2={x2}
                y2={y2}
                stroke="white"
                strokeWidth={2}
                className="opacity-60"
              />
            );
          })}
          {/* Filled arc */}
          <motion.circle
            cx={SIZE / 2}
            cy={SIZE / 2}
            r={R}
            fill="none"
            stroke="url(#ring-gradient)"
            strokeWidth={STROKE}
            strokeLinecap="round"
            strokeDasharray={CIRC}
            style={{ strokeDashoffset: dashOffset }}
          />
        </svg>
        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <CounterLabel
            current={current}
            goal={goal}
            donors={donors}
            inView={inView}
            className="text-center"
          />
        </div>
      </div>
    </div>
  );
}

// ─── Variant B: Liquid Fill ───────────────────────────────────────────────────
export function LiquidFillProgress({
  current = 482_000,
  donors = 482,
  goal = 1_000_000,
}: {
  current?: number;
  donors?: number;
  goal?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const pct = current / goal;

  const fillHeight = useSpring(0, { stiffness: 25, damping: 18, mass: 1 });
  const fillHeightPct = useTransform(fillHeight, (v) => `${v}%`);

  useEffect(() => {
    if (inView) fillHeight.set(pct * 100);
  }, [inView, pct, fillHeight]);

  return (
    <div ref={ref} className="flex flex-col items-center gap-6">
      <div className="relative w-36 h-56 rounded-3xl border-2 border-border overflow-hidden bg-muted/40 shadow-inner">
        {/* Liquid fill */}
        <motion.div
          className="absolute bottom-0 left-0 right-0"
          style={{
            height: fillHeightPct,
            background:
              "linear-gradient(180deg, oklch(0.57 0.21 358 / 0.85) 0%, oklch(0.53 0.18 319.29) 100%)",
          }}
        >
          {/* Wave */}
          <motion.div
            className="absolute -top-4 left-0 w-[200%] h-8"
            animate={{ x: [0, "-50%"] }}
            transition={{ repeat: Infinity, duration: 2.5, ease: "linear" }}
          >
            <svg viewBox="0 0 400 32" className="w-full h-full" preserveAspectRatio="none">
              <path
                d="M0,16 C50,4 100,28 150,16 C200,4 250,28 300,16 C350,4 400,28 400,16 L400,32 L0,32 Z"
                fill="oklch(0.57 0.21 358 / 0.85)"
              />
            </svg>
          </motion.div>
        </motion.div>
        {/* Percentage in container */}
        <div className="absolute inset-0 flex items-center justify-center">
          <span className="text-2xl font-bold" style={{ mixBlendMode: "difference", color: "white" }}>
            {Math.round(pct * 100)}%
          </span>
        </div>
      </div>
      <CounterLabel current={current} goal={goal} donors={donors} inView={inView} />
    </div>
  );
}

// ─── Variant C: Dot Grid (1,000 dots) ────────────────────────────────────────
export function DotGridProgress({
  current = 482_000,
  donors = 482,
  goal = 1_000_000,
}: {
  current?: number;
  donors?: number;
  goal?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const filledCount = donors;
  const TOTAL = 1000;
  const COLS = 40;

  return (
    <div ref={ref} className="flex flex-col items-center gap-6 w-full">
      <div
        className="grid gap-[3px] w-full max-w-sm"
        style={{ gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))` }}
      >
        {Array.from({ length: TOTAL }).map((_, i) => {
          const filled = i < filledCount;
          return (
            <motion.div
              key={i}
              className="rounded-full aspect-square"
              style={{
                backgroundColor: filled
                  ? "oklch(0.57 0.21 358)"
                  : "oklch(0.9685 0.01 345.41)",
                minWidth: 5,
                minHeight: 5,
              }}
              initial={{ opacity: 0, scale: 0 }}
              animate={inView ? { opacity: 1, scale: 1 } : {}}
              transition={{
                delay: Math.min(i * 0.0006, 0.8),
                duration: 0.25,
                ease: "backOut",
              }}
            />
          );
        })}
      </div>
      <CounterLabel current={current} goal={goal} donors={donors} inView={inView} />
    </div>
  );
}

// ─── Variant D: Sonar / Radar Pulse ──────────────────────────────────────────
export function SonarProgress({
  current = 482_000,
  donors = 482,
  goal = 1_000_000,
}: {
  current?: number;
  donors?: number;
  goal?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const pct = current / goal;
  const RINGS = [0.25, 0.5, 0.75, 1.0];

  return (
    <div
      ref={ref}
      className="relative flex items-center justify-center rounded-2xl overflow-hidden"
      style={{ width: 280, height: 280, background: "oklch(0.12 0.03 265)" }}
    >
      {/* Static ring outlines */}
      {RINGS.map((ring) => (
        <div
          key={ring}
          className="absolute rounded-full border border-white/10"
          style={{ width: `${ring * 100}%`, height: `${ring * 100}%` }}
        />
      ))}

      {/* Radar sweep */}
      {inView && (
        <motion.div
          className="absolute inset-0 rounded-2xl overflow-hidden"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 3, ease: "linear" }}
          style={{ transformOrigin: "center" }}
        >
          <div
            style={{
              width: "100%",
              height: "100%",
              background:
                "conic-gradient(from 0deg, transparent 270deg, oklch(0.57 0.21 358 / 0.35) 360deg)",
            }}
          />
        </motion.div>
      )}

      {/* Filled milestone arcs */}
      <svg className="absolute inset-0 -rotate-90" width="280" height="280" viewBox="0 0 280 280">
        {RINGS.map((ring) => {
          const r = (ring * 260) / 2;
          const circ = 2 * Math.PI * r;
          const isReached = pct >= ring - 0.01;
          return (
            <motion.circle
              key={ring}
              cx={140}
              cy={140}
              r={r}
              fill="none"
              stroke="oklch(0.57 0.21 358)"
              strokeWidth={2}
              strokeDasharray={circ}
              initial={{ strokeDashoffset: circ }}
              animate={inView && isReached ? { strokeDashoffset: 0 } : {}}
              transition={{ duration: 1.2, delay: ring * 0.5, ease: "easeOut" }}
              strokeLinecap="round"
            />
          );
        })}
      </svg>

      {/* Pulse dots at reached milestones */}
      {RINGS.filter((r) => pct >= r - 0.01).map((ring) => (
        <motion.div
          key={ring}
          className="absolute rounded-full"
          style={{
            width: 8,
            height: 8,
            background: "oklch(0.57 0.21 358)",
            top: `calc(50% - ${(ring * 260) / 2}px - 4px)`,
            left: "calc(50% - 4px)",
          }}
          animate={{ scale: [1, 1.8, 1], opacity: [1, 0.4, 1] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        />
      ))}

      {/* Center label */}
      <div className="relative z-10 flex flex-col items-center">
        <CounterLabel
          current={current}
          goal={goal}
          donors={donors}
          inView={inView}
          light
          className="text-center"
        />
      </div>
    </div>
  );
}
