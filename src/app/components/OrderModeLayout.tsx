"use client";

import React, { useState } from "react";
import styles from "./OrderModeLayout.module.css";

type OrderMode = "pickup" | "drivethru" | "delivery";

function SearchIcon() {
  return (
    <svg className={styles.inputIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <circle cx="11" cy="11" r="8" />
      <path d="m21 21-4.35-4.35" />
    </svg>
  );
}

function PinIcon() {
  return (
    <svg className={styles.inputIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function BuildingIcon() {
  return (
    <svg className={styles.inputIcon} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
      <rect x="4" y="2" width="16" height="20" rx="2" ry="2" />
      <path d="M9 22v-4h6v4M8 6h.01M16 6h.01M12 6h.01M12 10h.01M12 14h.01M16 10h.01M8 10h.01M8 14h.01M16 14h.01" />
    </svg>
  );
}

function SegmentedTabs({
  options,
  value,
  onChange,
}: {
  options: { id: OrderMode; label: string }[];
  value: OrderMode;
  onChange: (id: OrderMode) => void;
}) {
  return (
    <div className={styles.tabs} role="tablist" aria-label="Order mode">
      {options.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          role="tab"
          aria-selected={value === id}
          className={value === id ? `${styles.tab} ${styles.tabActive}` : styles.tab}
          onClick={() => onChange(id)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function ToggleButtons({
  options,
  value,
  onChange,
}: {
  options: { id: string; label: string }[];
  value: string;
  onChange: (id: string) => void;
}) {
  return (
    <div className={styles.toggleRow}>
      {options.map(({ id, label }) => (
        <button
          key={id}
          type="button"
          className={value === id ? `${styles.toggleBtn} ${styles.toggleActive}` : styles.toggleBtn}
          onClick={() => onChange(id)}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

function InputField({
  placeholder,
  value,
  onChange,
  icon: Icon,
  id,
  label,
}: {
  placeholder: string;
  value: string;
  onChange: (v: string) => void;
  icon?: React.ComponentType<{ className?: string }>;
  id?: string;
  label?: string;
}) {
  return (
    <div className={styles.inputWrap}>
      {label && (
        <label htmlFor={id} className={styles.srOnly}>
          {label}
        </label>
      )}
      <input
        id={id}
        type="text"
        className={styles.input}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-label={label || placeholder}
      />
      {Icon && <Icon />}
    </div>
  );
}

export default function OrderModeLayout() {
  const [mode, setMode] = useState<OrderMode>("pickup");
  const [asapLater, setAsapLater] = useState<"asap" | "later">("asap");
  const [address, setAddress] = useState("");
  const [deliveryAddress, setDeliveryAddress] = useState("");
  const [aptUnit, setAptUnit] = useState("");

  const modeTabs = [
    { id: "pickup" as OrderMode, label: "Pickup" },
    { id: "drivethru" as OrderMode, label: "Drive-thru" },
    { id: "delivery" as OrderMode, label: "Delivery" },
  ];

  const asapLaterOptions = [
    { id: "asap", label: "ASAP" },
    { id: "later", label: "Later" },
  ];

  return (
    <div className={styles.container}>
      <div className={styles.mapPlaceholder} aria-hidden />
      <div className={styles.panelWrap}>
        <div className={styles.panel}>
          <SegmentedTabs options={modeTabs} value={mode} onChange={setMode} />
          <ToggleButtons options={asapLaterOptions} value={asapLater} onChange={(id) => setAsapLater(id as "asap" | "later")} />

          {(mode === "pickup" || mode === "drivethru") && (
            <div className={styles.form}>
              <InputField
                placeholder="Address, City and State, or Postal Code"
                value={address}
                onChange={setAddress}
                icon={SearchIcon}
                id="order-address"
                label="Address, City and State, or Postal Code"
              />
            </div>
          )}

          {mode === "delivery" && (
            <div className={styles.form}>
              <InputField
                placeholder="Delivery Address"
                value={deliveryAddress}
                onChange={setDeliveryAddress}
                icon={PinIcon}
                id="delivery-address"
                label="Delivery Address"
              />
              <InputField
                placeholder="Apt/Unit (Opt)"
                value={aptUnit}
                onChange={setAptUnit}
                icon={BuildingIcon}
                id="apt-unit"
                label="Apt/Unit (Optional)"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
