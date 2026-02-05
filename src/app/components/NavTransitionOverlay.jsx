"use client";

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { usePathname, useRouter } from "next/navigation";

// 4 shades from base #ae81ad (mauve), same palette structure: golden-ratio (φ) lightness steps
// #ae81ad → H≈301°, S≈22%; L steps: 0.88, 0.72, 0.58, 0.46 (each step ÷ φ)
const PHI = 1.618034;
const BASE_H = 301;
const BASE_S = 0.22;

function hslToRgb(h, s, l) {
  h = h / 360;
  let r, g, b;
  if (s === 0) {
    r = g = b = l;
  } else {
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return [Math.round(r * 255), Math.round(g * 255), Math.round(b * 255)];
}
function hue2rgb(p, q, t) {
  if (t < 0) t += 1;
  if (t > 1) t -= 1;
  if (t < 1 / 6) return p + (q - p) * 6 * t;
  if (t < 1 / 2) return q;
  if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
  return p;
}

const L1 = 0.88;
const L2 = L1 - (L1 - 0.46) / PHI;
const L3 = L2 - (L2 - 0.46) / PHI;
const L4 = 0.46;

const PALETTE = [
  `rgb(${hslToRgb(BASE_H, BASE_S, L1).join(",")})`,
  `rgb(${hslToRgb(BASE_H, BASE_S, L2).join(",")})`,
  `rgb(${hslToRgb(BASE_H, BASE_S, L3).join(",")})`,
  `rgb(${hslToRgb(BASE_H, BASE_S, L4).join(",")})`,
];

const WIPE_DURATION_MS = 400;
const BARS_COUNT = 56; // even count so bars are clearly visible; evenly spaced

// Fast–slow–fast: ease-in-out so animation progresses quickly at start/end, slowly in middle
function easeInOutQuad(t) {
  const x = Math.max(0, Math.min(1, t));
  return x < 0.5 ? 2 * x * x : 1 - Math.pow(-2 * x + 2, 2) / 2;
}

const NavTransitionContext = createContext(null);

export function useNavTransition() {
  const ctx = useContext(NavTransitionContext);
  return ctx;
}

export function NavTransitionProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const [phase, setPhase] = useState("idle");
  const [targetHref, setTargetHref] = useState(null);
  const rafId = useRef(null);
  const canvasRef = useRef(null);

  const startTransition = useCallback(
    (href) => {
      if (href === pathname) return;
      setTargetHref(href);
      setPhase("wipeIn");
    },
    [pathname]
  );

  useEffect(() => {
    if (phase !== "wipeIn" || !targetHref) return;
    const t = setTimeout(() => {
      router.push(targetHref);
      setPhase("wipeOut");
    }, WIPE_DURATION_MS);
    return () => clearTimeout(t);
  }, [phase, targetHref, router]);

  useEffect(() => {
    if (phase !== "wipeOut") return;
    const t = setTimeout(() => {
      setPhase("idle");
      setTargetHref(null);
    }, WIPE_DURATION_MS);
    return () => clearTimeout(t);
  }, [phase]);

  useEffect(() => {
    const c = canvasRef.current;
    if (!c || (phase !== "wipeIn" && phase !== "wipeOut")) return;

    const ctx = c.getContext("2d");
    let timeStart = Date.now();
    let running = true;

    const resize = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      c.width = w;
      c.height = 2 * h;
      c.style.width = `${w}px`;
      c.style.height = "200vh";
    };
    resize();
    window.addEventListener("resize", resize);

    const animate = (time) => {
      if (!running) return;
      rafId.current = requestAnimationFrame(animate);
      const elapsed = time - timeStart;
      const progress = Math.min(1, elapsed / WIPE_DURATION_MS);
      // Fast–slow–fast: eased progress so middle of wipe holds longer, each bar stays visible
      const progressEased = easeInOutQuad(progress);
      const T = progressEased * 4; // phase over 0..4 for a couple of color cycles

      ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
      ctx.fillRect(0, 0, c.width, c.height);

      // Evenly spaced bars: equal width each
      const barWidth = c.width / BARS_COUNT;
      const barHeight = c.height;

      for (let i = 0; i < BARS_COUNT; i++) {
        const phaseColor = i / BARS_COUNT + T * 0.5;
        ctx.fillStyle = PALETTE[Math.floor(phaseColor * PALETTE.length) % PALETTE.length];
        ctx.fillRect(i * barWidth, 0, barWidth, barHeight);
      }
    };

    animate(timeStart);

    return () => {
      running = false;
      if (rafId.current) cancelAnimationFrame(rafId.current);
      window.removeEventListener("resize", resize);
    };
  }, [phase]);

  const isActive = phase === "wipeIn" || phase === "wipeOut";

  return (
    <NavTransitionContext.Provider value={{ startTransition }}>
      <div className={isActive ? "nav-wipe-content nav-wipe-content--blurred" : "nav-wipe-content"}>
        {children}
      </div>
      <div
        className="nav-transition-overlay"
        aria-hidden={!isActive}
        data-phase={phase}
      >
        <canvas ref={canvasRef} id="nav-transition-canvas" />
      </div>
    </NavTransitionContext.Provider>
  );
}
