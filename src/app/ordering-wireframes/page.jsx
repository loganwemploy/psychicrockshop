"use client";

/**
 * Abstracted wireframes for the online ordering app.
 * Content layout only — no device/iPhone border.
 * Reference: docs/ORDERING_WIREFRAMES.md
 */

import Link from "next/link";
import styles from "./ordering-wireframes.module.css";

function WireframeBlock({ label, children, variant }) {
  return (
    <div className={`${styles.block} ${variant ? styles[variant] : ""}`}>
      <span className={styles.blockLabel}>{label}</span>
      {children}
    </div>
  );
}

function ScreenWire({ title, children }) {
  return (
    <section className={styles.screen}>
      <h2 className={styles.screenTitle}>{title}</h2>
      <div className={styles.screenInner}>{children}</div>
    </section>
  );
}

export default function OrderingWireframesPage() {
  return (
    <div className={styles.page}>
      <header className={styles.header}>
        <Link href="/gaming" className={styles.back}>
          ← Back to ordering
        </Link>
        <h1 className={styles.title}>Ordering app — content layout (no device frame)</h1>
        <p className={styles.desc}>
          Abstracted structure of each screen. Use for build/plan alignment. See{" "}
          <code>docs/ORDERING_WIREFRAMES.md</code>.
        </p>
      </header>

      <div className={styles.grid}>
        {/* 1. Home / Menu entry */}
        <ScreenWire title="1. Home / Menu entry">
          <WireframeBlock label="Header">Logo · Nav · Cart</WireframeBlock>
          <WireframeBlock label="Hero" variant="blockHero">
            Restaurant name · Tagline · Start order CTA
          </WireframeBlock>
          <WireframeBlock label="Category strip" variant="blockStrip">
            Salads · Burgers · Sandwiches · Pasta · Entrees · Steaks · Seafood · Sides
          </WireframeBlock>
          <WireframeBlock label="Featured / promos" variant="blockSmall">
            Daily special or delivery notice
          </WireframeBlock>
        </ScreenWire>

        {/* 2. Menu list */}
        <ScreenWire title="2. Menu list (category)">
          <WireframeBlock label="Header">Back · Burgers · Cart</WireframeBlock>
          <WireframeBlock label="Search + filters" variant="blockSmall">
            Search input · Category · Price
          </WireframeBlock>
          <WireframeBlock label="Item list" variant="blockList">
            [Item card] Image · Name · Description · Price · Labels
            {"\n"}[Item card] …
            {"\n"}[Item card] …
          </WireframeBlock>
        </ScreenWire>

        {/* 3. Item detail */}
        <ScreenWire title="3. Item detail">
          <WireframeBlock label="Header">Back · Cart</WireframeBlock>
          <WireframeBlock label="Media" variant="blockMedia">
            Item image
          </WireframeBlock>
          <WireframeBlock label="Title · Price · Labels" variant="blockSmall" />
          <WireframeBlock label="Description" variant="blockSmall" />
          <WireframeBlock label="Modifiers" variant="blockList">
            Choose a side (radio) · Add-ons (check) · price deltas
          </WireframeBlock>
          <WireframeBlock label="Sticky footer" variant="blockFooter">
            Add to cart [primary]
          </WireframeBlock>
        </ScreenWire>

        {/* 4. Cart */}
        <ScreenWire title="4. Cart">
          <WireframeBlock label="Header">Your order · Close</WireframeBlock>
          <WireframeBlock label="Line items" variant="blockList">
            Item + modifiers · Qty · Price · Edit/remove
            {"\n"}… more lines
          </WireframeBlock>
          <WireframeBlock label="Totals" variant="blockSmall">
            Subtotal · Tax · Total
          </WireframeBlock>
          <WireframeBlock label="Footer" variant="blockFooter">
            Checkout [primary]
          </WireframeBlock>
        </ScreenWire>

        {/* 5. Checkout */}
        <ScreenWire title="5. Checkout">
          <WireframeBlock label="Header">Back · Checkout</WireframeBlock>
          <WireframeBlock label="Delivery / pickup" variant="blockList">
            Address or Pickup · Time slot
          </WireframeBlock>
          <WireframeBlock label="Order summary" variant="blockSmall">
            Item count · Total · Expand
          </WireframeBlock>
          <WireframeBlock label="Payment" variant="blockSmall">
            Card / Pay at pickup
          </WireframeBlock>
          <WireframeBlock label="Footer" variant="blockFooter">
            Place order [primary]
          </WireframeBlock>
        </ScreenWire>

        {/* 6. Confirmation */}
        <ScreenWire title="6. Order confirmation">
          <WireframeBlock label="Status" variant="blockHero">
            Success · Order # · Estimated time
          </WireframeBlock>
          <WireframeBlock label="Summary" variant="blockSmall">
            Items · Total · Pickup/delivery
          </WireframeBlock>
          <WireframeBlock label="Actions" variant="blockStrip">
            View order · New order
          </WireframeBlock>
        </ScreenWire>

        {/* 7. Support drawer */}
        <ScreenWire title="7. Support (drawer)">
          <WireframeBlock label="Header">Support · Status · Close</WireframeBlock>
          <WireframeBlock label="Message thread" variant="blockList">
            Agent · User · Agent …
          </WireframeBlock>
          <WireframeBlock label="Quick replies" variant="blockStrip">
            Order status · Menu · Reservation · Feedback
          </WireframeBlock>
          <WireframeBlock label="Input" variant="blockFooter">
            Type message · Send
          </WireframeBlock>
        </ScreenWire>
      </div>
    </div>
  );
}
