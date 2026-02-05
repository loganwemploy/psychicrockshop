"use client";

import { useEffect, useRef } from "react";
import { Landmark, Wallet, Mail } from "lucide-react";
import styles from "./DonateModal.module.css";

const DONATION_API_URL =
  "https://mmission007.org/wp-json/wp/v2/donationinfo";

const FALLBACK_DONATION = {
  zelle: {
    title: "Donate with Zelle",
    email: "mm007@gmail.com",
    org: "mission 007 NFP",
    description:
      "Make a secure contribution through Zelle to support mentorship, programming, and community outreach.",
  },
  cashapp: {
    title: "Donate with Cash App",
    cashtag: "$Mission007NFP",
    org: "mission 007 NFP",
    description:
      "Send a direct gift through Cash App to help fuel youth development opportunities.",
  },
  check: {
    title: "Donate by check",
    payee: "Mission 007 Mentorship",
    address: {
      name: "Mission 007 Mentorship",
      line1: "316 Forest Blvd.",
      city: "Park Forest",
      state: "IL",
      zip: "60466",
    },
    instructions:
      "Make checks payable to Mission 007 Mentorship and mail to the address below.",
    contactEmail: "007mmission@gmail.com",
  },
};

function normalizeDonationFromApi(data) {
  if (!data || !Array.isArray(data) || data.length === 0) return null;
  const acf = data[0]?.acf || {};
  return {
    zelle: {
      title: acf.zelle_title || FALLBACK_DONATION.zelle.title,
      email: acf.zelle_email || FALLBACK_DONATION.zelle.email,
      org: acf.zelle_org || FALLBACK_DONATION.zelle.org,
      description:
        acf.zelle_description || FALLBACK_DONATION.zelle.description,
    },
    cashapp: {
      title: acf.cashapp_title || FALLBACK_DONATION.cashapp.title,
      cashtag: acf.cashapp_cashtag || acf.cashapp_id || FALLBACK_DONATION.cashapp.cashtag,
      org: acf.cashapp_org || FALLBACK_DONATION.cashapp.org,
      description:
        acf.cashapp_description || FALLBACK_DONATION.cashapp.description,
    },
    check: {
      title: acf.check_title || FALLBACK_DONATION.check.title,
      payee: acf.check_payee || FALLBACK_DONATION.check.payee,
      address: acf.check_address
        ? {
            name: acf.check_address.name ?? FALLBACK_DONATION.check.address.name,
            line1: acf.check_address.line1 ?? FALLBACK_DONATION.check.address.line1,
            city: acf.check_address.city ?? FALLBACK_DONATION.check.address.city,
            state: acf.check_address.state ?? FALLBACK_DONATION.check.address.state,
            zip: acf.check_address.zip ?? FALLBACK_DONATION.check.address.zip,
          }
        : FALLBACK_DONATION.check.address,
      instructions:
        acf.check_instructions || FALLBACK_DONATION.check.instructions,
      contactEmail:
        acf.check_contact_email || FALLBACK_DONATION.check.contactEmail,
    },
  };
}

export async function fetchDonationInfo() {
  try {
    const res = await fetch(DONATION_API_URL);
    if (!res.ok) return null;
    const data = await res.json();
    return normalizeDonationFromApi(data);
  } catch {
    return null;
  }
}

const TYPE_CONFIG = {
  zelle: { Icon: Landmark, label: "Zelle" },
  cashapp: { Icon: Wallet, label: "Cash App" },
  check: { Icon: Mail, label: "Check" },
};

export default function DonateModal({ isOpen, onClose, type, donationInfo }) {
  const dialogRef = useRef(null);

  const resolved =
    donationInfo?.[type] ? { ...FALLBACK_DONATION[type], ...donationInfo[type] } : FALLBACK_DONATION[type];
  const config = TYPE_CONFIG[type] || TYPE_CONFIG.zelle;
  const { Icon, label } = config;

  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className={styles.overlay}
      onClick={handleOverlayClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby="donate-modal-title"
    >
      <div className={styles.modal} ref={dialogRef}>
        <div className={styles.header}>
          <div className={styles.titleRow}>
            <Icon className={styles.icon} aria-hidden="true" />
            <h2 id="donate-modal-title">{resolved.title}</h2>
          </div>
          <button
            type="button"
            className={styles.closeButton}
            onClick={onClose}
            aria-label="Close"
          >
            ×
          </button>
        </div>
        <div className={styles.body}>
          {type === "zelle" && (
            <>
              <p className={styles.description}>{resolved.description}</p>
              <div className={styles.detailBlock}>
                <p>
                  <span className={styles.label}>Zelle:</span> {resolved.email}
                </p>
                <p>
                  <span className={styles.label}>ORG :</span> {resolved.org}
                </p>
              </div>
            </>
          )}
          {type === "cashapp" && (
            <>
              <p className={styles.description}>{resolved.description}</p>
              <div className={styles.detailBlock}>
                <p>
                  <span className={styles.label}>Cash App:</span>{" "}
                  {resolved.cashtag}
                </p>
                <p>
                  <span className={styles.label}>ORG :</span> {resolved.org}
                </p>
              </div>
            </>
          )}
          {type === "check" && (
            <>
              <p className={styles.description}>{resolved.instructions}</p>
              <div className={styles.detailBlock}>
                <p>
                  <span className={styles.label}>Payable to:</span>{" "}
                  <strong>{resolved.payee}</strong>
                </p>
                {resolved.address && (
                  <address className={styles.address}>
                    {resolved.address.name}
                    <br />
                    {resolved.address.line1}
                    <br />
                    {resolved.address.city}, {resolved.address.state} {resolved.address.zip}
                  </address>
                )}
                <a
                  href={`mailto:${resolved.contactEmail}`}
                  className={styles.mailLink}
                >
                  Questions? Email us
                </a>
              </div>
            </>
          )}
          <p className={styles.thankYou}>
            Thank you for considering us—your support means the world to our youth and our mission.
          </p>
        </div>
      </div>
    </div>
  );
}

export { FALLBACK_DONATION };
