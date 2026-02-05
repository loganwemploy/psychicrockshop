"use client";

import { useState, useEffect } from "react";
import { Landmark, Wallet, Mail } from "lucide-react";
import DonateModal, { fetchDonationInfo, FALLBACK_DONATION } from "../components/DonateModal";
import styles from "./how-you-can-help.module.css";

export default function DonateSection() {
  const [donationInfo, setDonationInfo] = useState(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState("zelle");

  useEffect(() => {
    let cancelled = false;
    (async () => {
      const data = await fetchDonationInfo();
      if (!cancelled && data) setDonationInfo(data);
    })();
    return () => { cancelled = true; };
  }, []);

  const zelle = donationInfo?.zelle
    ? { ...FALLBACK_DONATION.zelle, ...donationInfo.zelle }
    : FALLBACK_DONATION.zelle;
  const cashapp = donationInfo?.cashapp
    ? { ...FALLBACK_DONATION.cashapp, ...donationInfo.cashapp }
    : FALLBACK_DONATION.cashapp;
  const check = donationInfo?.check
    ? { ...FALLBACK_DONATION.check, ...donationInfo.check }
    : FALLBACK_DONATION.check;

  const openModal = (type) => {
    setModalType(type);
    setModalOpen(true);
  };

  return (
    <>
      <section className={styles.section}>
        <h2>Ways to securely donate</h2>
        <p>
          Choose how you would like to securely donate. If you have questions
          or would like to discuss other ways to support our work, reach out
          to us directly.
        </p>
        <div className={styles.donationGrid}>
          <article className={styles.card}>
            <Landmark className={styles.cardIcon} aria-hidden="true" />
            <h3>Securely donate via Zelle</h3>
            <p>
              Make a secure contribution through Zelle to support mentorship,
              programming, and community outreach.
            </p>
            <div className={styles.zelleDetails}>
              <span className={styles.zelleLabel}>Zelle:</span> {zelle.email}
              <br />
              <span className={styles.zelleLabel}>ORG :</span> {zelle.org}
            </div>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={() => openModal("zelle")}
              aria-label="Securely donate via Zelle"
            >
              Securely donate with Zelle
            </button>
          </article>
          <article className={styles.card}>
            <Wallet className={styles.cardIcon} aria-hidden="true" />
            <h3>Securely donate via Cash App</h3>
            <p>
              Send a direct gift through Cash App to help fuel youth
              development opportunities.
            </p>
            <div className={styles.zelleDetails}>
              <span className={styles.zelleLabel}>Cash App:</span> {cashapp.cashtag}
              <br />
              <span className={styles.zelleLabel}>ORG :</span> {cashapp.org}
            </div>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={() => openModal("cashapp")}
              aria-label="Securely donate via Cash App"
            >
              Securely donate with Cash App
            </button>
          </article>
          <article className={styles.card}>
            <Mail className={styles.cardIcon} aria-hidden="true" />
            <h3>Securely donate by check</h3>
            <p>
              Prefer to give by check? Make checks payable to Mission 007
              Mentorship and mail to the address below.
            </p>
            <div className={styles.zelleDetails}>
              <span className={styles.zelleLabel}>Payable to:</span> {check.payee}
              <br />
              {check.address && (
                <>
                  <span className={styles.zelleLabel}>Address:</span>
                  <br />
                  {check.address.name}
                  <br />
                  {check.address.line1}
                  <br />
                  {check.address.city}, {check.address.state} {check.address.zip}
                </>
              )}
            </div>
            <button
              type="button"
              className={styles.primaryButton}
              onClick={() => openModal("check")}
              aria-label="Securely donate by check"
            >
              See how to donate by check
            </button>
          </article>
        </div>
      </section>

      <DonateModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        type={modalType}
        donationInfo={donationInfo}
      />
    </>
  );
}
