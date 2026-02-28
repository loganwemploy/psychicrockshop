"use client";

import { useState, useEffect, useCallback } from "react";
import { ChevronUp } from "lucide-react";

const SCROLL_THRESHOLD_PX = 400;

export default function ScrollToTop() {
  const [visible, setVisible] = useState(false);

  const scrollToTop = useCallback(() => {
    const prefersReducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: prefersReducedMotion ? "auto" : "smooth",
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > SCROLL_THRESHOLD_PX);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!visible) return null;

  return (
    <button
      type="button"
      onClick={scrollToTop}
      className="scroll-to-top"
      aria-label="Scroll to top of page"
      title="Scroll to top"
    >
      <ChevronUp size={22} strokeWidth={2.5} aria-hidden />
    </button>
  );
}
