"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import styles from "./QuickLinksModal.module.css";

const STORAGE_KEY = "m007-quick-links-dismissed";
const SHOW_DELAY_MS = 5000;

export default function QuickLinksModal() {
  const [isOpen, setIsOpen] = useState(false);
  const dialogRef = useRef(null);

  useEffect(() => {
    if (typeof window === "undefined") return undefined;
    const dismissed = window.localStorage.getItem(STORAGE_KEY);
    if (dismissed === "true") return undefined;

    const timer = window.setTimeout(() => {
      setIsOpen(true);
    }, SHOW_DELAY_MS);

    return () => window.clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) return undefined;
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        handleClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  const handleClose = () => {
    setIsOpen(false);
    if (typeof window !== "undefined") {
      window.localStorage.setItem(STORAGE_KEY, "true");
    }
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      handleClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className={styles.overlay} onClick={handleOverlayClick}>
      <div
        className={styles.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-links-title"
        ref={dialogRef}
      >
        <div className={styles.header}>
          <h2 id="quick-links-title">What do you need right now?</h2>
          <button
            type="button"
            className={styles.closeButton}
            onClick={handleClose}
            aria-label="Close quick links"
          >
            ×
          </button>
        </div>
        <div className={styles.rainbowDivider} aria-hidden="true"></div>
        <div className={styles.links}>
          <Link href="/learn-where-to-start" className={styles.linkButton}>
            Not sure where to start
          </Link>
          <Link href="/about-us" className={styles.linkButton}>
            Get a mentor
          </Link>
          <Link href="/learn-where-to-start" className={styles.linkButton}>
            Career &amp; job help
          </Link>
          <Link href="/how-you-can-help" className={styles.linkButton}>
            Free resources
          </Link>
          <Link href="/how-you-can-help" className={styles.linkButton}>
            Become a mentor
          </Link>
        </div>
      </div>
    </div>
  );
}
