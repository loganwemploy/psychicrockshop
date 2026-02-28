"use client";

import { useState, useEffect } from "react";
import styles from "./shop.module.css";

export default function CountdownTimer() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hrs: 0, min: 0, sec: 0 });

  useEffect(() => {
    const saleEnd = new Date();
    saleEnd.setDate(saleEnd.getDate() + 5);
    saleEnd.setHours(23, 59, 59, 999);

    const update = () => {
      const now = new Date();
      const diff = saleEnd - now;

      if (diff <= 0) {
        setTimeLeft({ days: 0, hrs: 0, min: 0, sec: 0 });
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hrs: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
        min: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
        sec: Math.floor((diff % (1000 * 60)) / 1000),
      });
    };

    update();
    const t = setInterval(update, 1000);
    return () => clearInterval(t);
  }, []);

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div className={styles.countdownSection}>
      <div className={styles.countdownHeader}>
        <span className={styles.countdownFire} aria-hidden="true">
          🔥
        </span>
        <h3>Don&apos;t Miss Out — Sale Ends Soon</h3>
        <p className={styles.countdownSub}>Act now before prices go back up</p>
      </div>
      <div className={styles.countdownGrid}>
        <div className={styles.countdownBox}>
          <span className={styles.countdownNum}>{pad(timeLeft.days)}</span>
          <span className={styles.countdownLabel}>Days</span>
        </div>
        <div className={styles.countdownBox}>
          <span className={styles.countdownNum}>{pad(timeLeft.hrs)}</span>
          <span className={styles.countdownLabel}>Hrs</span>
        </div>
        <div className={styles.countdownBox}>
          <span className={styles.countdownNum}>{pad(timeLeft.min)}</span>
          <span className={styles.countdownLabel}>Min</span>
        </div>
        <div className={styles.countdownBox}>
          <span className={styles.countdownNum}>{pad(timeLeft.sec)}</span>
          <span className={styles.countdownLabel}>Sec</span>
        </div>
      </div>
    </div>
  );
}
