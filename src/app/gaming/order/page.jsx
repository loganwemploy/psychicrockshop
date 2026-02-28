"use client";

import Link from "next/link";
import OrderModeLayout from "../../components/OrderModeLayout";
import "../gaming-design-tokens.css";
import "../gaming.css";
import "../gaming-theme.css";

export default function GamingOrderPage() {
  return (
    <div className="gaming-root">
      <header style={{
        padding: "12px 16px",
        background: "var(--bg-nav, #38312B)",
        borderBottom: "1px solid rgba(255,255,255,0.08)",
        display: "flex",
        alignItems: "center",
        gap: "16px",
      }}>
        <Link
          href="/gaming"
          style={{
            color: "#fff",
            textDecoration: "none",
            fontWeight: 600,
            display: "flex",
            alignItems: "center",
            gap: "6px",
          }}
          aria-label="Back to menu"
        >
          ← Back
        </Link>
        <h1 style={{ margin: 0, fontSize: "1.125rem", fontWeight: 700, color: "#fff" }}>
          Start your order
        </h1>
      </header>
      <OrderModeLayout />
    </div>
  );
}
