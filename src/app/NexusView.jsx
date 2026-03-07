"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import { MapPin } from "lucide-react";
import "./nexus-view.css";
import {
  crystalImages,
  initSparkParticles,
  initIntroGrid,
  initScrollSnap,
  initNavigation,
  initMagneticButtons,
  initTiltEffect,
} from "./nexus-view-init";

const LOGO =
  "https://dl4.pushbulletusercontent2.com/dGLvQNacaSYF4R560iIwxmyBlN0xWAat/IMG_0937.jpg";
// Welcome section hero video
const WELCOME_VIDEO_URL =
  "https://dl4.pushbulletusercontent2.com/Z1JJIArA0tREKTERJ7sHsVxhx1908JPR/hf_20260224_173632_076ec91b-8b0b-460c-a9f5-7efccb323b92.mp4";
// Love-life cleansing ritual video
const LOVE_LIFE_CLEANSING_VIDEO_URL =
  "https://dl4.pushbulletusercontent2.com/YyqBMBzyRqNZEnqX41isvabiUY1lGTu0/hf_20260227_030120_c5746452-fa11-4a6c-85df-6917fc71de80.mp4";
// Use same working video for all crystal slots (your tarot/crystal video)
const CRYSTAL_VIDEO_URL =
  "https://lh3.googleusercontent.com/ggs/AF1QipMRzPJKYyWXf1cCfbPPcUXBvvN8_TgZljataBgx=m18";

const POCKET_PROTECTION_VIDEO_URL =
  "https://dl4.pushbulletusercontent2.com/4epVpioBwCjut3ilhwWMaPoyOPn0SvEo/hf_20260227_023401_d1d2833e-7abf-4305-93e4-c549a3a628ff.mp4";
const TAROT_VIDEO_URL =
  "https://dl4.pushbulletusercontent2.com/MnJzTGvR8Xh7MQFgBoUNij44Mn0hj9KY/hf_20260224_143732_1de03067-dbf8-4b63-ab33-2eadab944fd2.mp4";
// Readings video for Celine's services
const READINGS_VIDEO_URL =
  "https://dl4.pushbulletusercontent2.com/4MuhmzSLVbxsMq1ASqoao7f1vCqRwqlg/hf_20260227_031636_07e84eaf-936e-4d6e-9ab3-854370f9224e.mp4";
// Reliable placeholder images (Lorem Picsum) - replace with your own crystal image URLs if desired
const PICSUM = (seed, w = 800, h = 600) =>
  `https://picsum.photos/seed/${seed}/${w}/${h}`;
const CRYSTAL_IMAGES = {
  "products/crimson_surge.webp": PICSUM("crimson"),
  "products/rose_drift.webp": PICSUM("rose"),
  "products/ember_glow.webp": PICSUM("ember"),
  "products/azure_crunch.webp": PICSUM("azure"),
  "products/crispy_munchies.webp": PICSUM("mystic"),
  "products/regal_morsels.webp": PICSUM("regal"),
  "products/luminous_meadow.webp": PICSUM("meadow"),
  "products/aqua_mists.webp": PICSUM("aqua"),
  "products/eclipse_haze.webp": PICSUM("eclipse"),
  "products/solar_flare.webp": PICSUM("solar"),
  "products/ocean_breeze.webp": PICSUM("ocean"),
  "products/citrus_zest.webp": PICSUM("citrus"),
  "products/aqua_auras.webp": PICSUM("auras"),
  "products/sunbeam_radiance.webp": PICSUM("sunbeam"),
};
const IMG = (path) => CRYSTAL_IMAGES[path] || PICSUM("crystal");
// Two hands holding (reconnecting / loved one section) — Pexels
const RECONNECTING_IMAGE_URL = "https://images.pexels.com/photos/1378723/pexels-photo-1378723.jpeg";

const REVIEWS_AGGREGATE = { rating: 4.9, googleCount: 39, yahooCount: 12, yelpCount: 8 };
const FOOTER_ADDRESS = "6 Golf Center, Hoffman Estates, IL";
const FOOTER_DIRECTIONS_URL = "https://www.google.com/maps/search/?api=1&query=6+golf+center+hoffman+estates";
const CELINE_PHONE = "847-262-0158";
const INTAKE_SERVICES = [
  "Psychic readings",
  "Palm readings",
  "Tarot card readings",
  "Astrology chart readings",
  "Chakra balancing",
  "Karma cleansing",
  "I'm not sure yet",
];
const REVIEWS_LIST = [
  { source: "Google", name: "Alena R.", date: "a month ago", stars: 5, text: "Celine's reading was incredibly accurate. The crystal selection is beautiful and she helped me find exactly what I needed for my energy. Will definitely be back!", logoColor: "#4285F4" },
  { source: "Yelp", name: "Maria S.", date: "2 weeks ago", stars: 5, text: "Absolutely fantastic! The space is unique and the energy is just right. Crystals, books, and the reading was spot-on. Everything came with care. I'll definitely return.", logoColor: "#d32323" },
  { source: "Yahoo", name: "James T.", date: "3 weeks ago", stars: 5, text: "Best psychic and crystal shop in the area. Celine really knows her stuff—the tarot reading clarified so much for me. The shop has a peaceful, welcoming vibe.", logoColor: "#6001d2" },
  { source: "Google", name: "Kimberly L.", date: "1 month ago", stars: 5, text: "Shop all the best crystals and spiritual tools here. Celine's palm reading was insightful and the crystal grids are stunning. Highly recommend!", logoColor: "#4285F4" },
  { source: "Yelp", name: "David M.", date: "a week ago", stars: 5, text: "Five stars! The readings are genuine and the crystal therapy session left me feeling balanced. This place is a gem in every sense.", logoColor: "#d32323" },
  { source: "Yahoo", name: "Sarah K.", date: "2 months ago", stars: 5, text: "Psychic & Crystal Bookshop is my go-to for clarity and healing. Celine is the real deal—compassionate, accurate, and the space feels like a sanctuary.", logoColor: "#6001d2" },
];

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function NexusView() {
  const containerRef = useRef(null);
  const stopSparkRef = useRef(false);
  const modalCloseRef = useRef(null);
  const [modal, setModal] = useState({
    open: false,
    title: "",
    icon: "",
    contentHtml: "",
    contentId: null,
  });
  const [intakeForm, setIntakeForm] = useState({
    name: "",
    email: "",
    address: "",
    city: "",
    phone: "",
    service: "",
    message: "",
  });
  const [toast, setToast] = useState({ show: false, type: "success", message: "" });
  const [intakeSubmitting, setIntakeSubmitting] = useState(false);

  const openModal = (title, contentId, icon) => {
    if (typeof contentId === "string") {
      const el = document.getElementById(contentId);
      setModal({
        open: true,
        title: title || "",
        icon: icon || "",
        contentHtml: el ? el.innerHTML : "",
        contentId,
      });
    } else {
      setModal({ open: true, title: title || "", icon: icon || "", contentHtml: String(contentId || ""), contentId: null });
    }
  };

  const closeModal = () => setModal((m) => ({ ...m, open: false }));

  const showToast = (type, message) => {
    setToast({ show: true, type, message });
    const t = setTimeout(() => setToast((prev) => ({ ...prev, show: false })), 4000);
    return () => clearTimeout(t);
  };

  const handleIntakeChange = (e) => {
    const { name, value } = e.target;
    setIntakeForm((prev) => ({ ...prev, [name]: value }));
  };

  const getDeviceType = () => {
    if (typeof navigator === "undefined") return "unknown";
    const ua = navigator.userAgent.toLowerCase();
    if (/mobile|android|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(ua)) return "mobile";
    if (/tablet|ipad/i.test(ua)) return "mobile";
    return "desktop";
  };

  const handleIntakeSubmit = async (e) => {
    e.preventDefault();
    setIntakeSubmitting(true);
    const now = new Date();
    const payload = {
      ...intakeForm,
      time_submitted: now.toLocaleTimeString("en-US", { hour12: true, hour: "numeric", minute: "2-digit", second: "2-digit" }),
      date_submitted: now.toLocaleDateString("en-US", { year: "numeric", month: "short", day: "numeric" }),
      device_type: getDeviceType(),
      submitted_from: typeof window !== "undefined" ? window.location.origin + window.location.pathname : "",
    };
    try {
      const res = await fetch("/api/intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        showToast("error", data.message || "Something went wrong. Please try again.");
        return;
      }
      showToast("success", "Thank you! We'll be in touch soon.");
      setIntakeForm({ name: "", email: "", address: "", city: "", phone: "", service: "", message: "" });
    } catch {
      showToast("error", "Could not send. Please call Celine at " + CELINE_PHONE + ".");
    } finally {
      setIntakeSubmitting(false);
    }
  };

  const triggerConfetti = () => {
    const root = containerRef.current;
    if (!root) return;
    const canvas = root.querySelector("#shopcrystal-canvas-cf");
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = root.offsetWidth;
    canvas.height = root.offsetHeight;
    const parts = [];
    const emojis = ["🔮", "✨", "💎", "🌙", "🌸", "💜", "⭐"];
    for (let i = 0; i < 45; i++)
      parts.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 25,
        vy: (Math.random() - 0.5) * 25,
        e: emojis[Math.floor(Math.random() * emojis.length)],
        l: 120,
      });
    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      parts.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.45;
        p.l--;
        ctx.font = "32px Arial";
        ctx.fillText(p.e, p.x, p.y);
      });
      if (parts.some((p) => p.l > 0)) requestAnimationFrame(animate);
    }
    animate();
  };

  const shareTwitter = () => {
    const shareUrl = typeof window !== "undefined" ? window.location.href : "";
    const text = "Check out our crystal & psychic healing experience!";
    const hashtags = "CrystalHealing,EnergyHealing,PsychicReading";
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(shareUrl)}&hashtags=${encodeURIComponent(hashtags)}`;
    window.open(twitterUrl, "_blank");
  };

  useEffect(() => {
    const root = containerRef.current;
    if (!root) return;
    window.nxTriggerConfetti = triggerConfetti;
    window.nxOpenModal = openModal;
    window.nxCloseModal = closeModal;
    window.nxShareTwitter = shareTwitter;
    const cleanups = [];
    cleanups.push(initSparkParticles(containerRef, stopSparkRef) || (() => {}));
    initIntroGrid(containerRef, crystalImages, gsap);
    cleanups.push(initScrollSnap(containerRef) || (() => {}));
    cleanups.push(initNavigation(containerRef, gsap) || (() => {}));
    initMagneticButtons(containerRef, gsap);
    initTiltEffect(containerRef);
    return () => {
      cleanups.forEach((c) => c());
      delete window.nxTriggerConfetti;
      delete window.nxOpenModal;
      delete window.nxCloseModal;
      delete window.nxShareTwitter;
    };
  }, []);

  // Stop star particles for the rest of the session once user scrolls to Readings With Celine
  useEffect(() => {
    const el = document.getElementById("shopcrystal-block-d");
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0]?.isIntersecting) {
          stopSparkRef.current = true;
          observer.disconnect();
        }
      },
      { threshold: 0.1, root: null }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const hasSeen = window.sessionStorage.getItem("nxReopenSeen");
      if (hasSeen) return;
      const timer = window.setTimeout(() => {
        const fn = window.nxOpenModal || openModal;
        fn("Grand Reopening ✨", "shopcrystal-ct-0", "✨");
        try {
          window.sessionStorage.setItem("nxReopenSeen", "1");
        } catch {
          // ignore storage errors
        }
      }, 5000);
      return () => window.clearTimeout(timer);
    } catch {
      // fail silently if sessionStorage is unavailable
    }
  }, []);

  useEffect(() => {
    if (!modal.open) return;
    const prevActive = document.activeElement;
    modalCloseRef.current?.focus();
    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        closeModal();
        return;
      }
      if (e.key !== "Tab") return;
      const root = document.getElementById("shopcrystal-dialog-root");
      if (!root) return;
      const focusables = root.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey) {
        if (document.activeElement === first) {
          e.preventDefault();
          last?.focus();
        }
      } else {
        if (document.activeElement === last) {
          e.preventDefault();
          first?.focus();
        }
      }
    };
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("keydown", onKeyDown);
      if (prevActive && typeof prevActive.focus === "function") prevActive.focus();
    };
  }, [modal.open]);

  return (
    <div className="shopcrystal-scope" ref={containerRef}>
      <a
        href="#shopcrystal-main"
        className="shopcrystal-skip-link"
      >
        Skip to main content
      </a>
      <canvas id="shopcrystal-canvas-bg" aria-hidden="true" />
      <canvas id="shopcrystal-canvas-cf" aria-hidden="true" />

      <header className="shopcrystal-bar">
        <div className="shopcrystal-mark-wrap shopcrystal-hover shopcrystal-pull">
          <img
            src={LOGO}
            alt="Psychic & Crystal Bookshop logo"
            title="Crystal & Psychic Healing"
            className="shopcrystal-mark"
          />
        </div>
        <nav className="shopcrystal-rail" role="navigation" aria-label="Main navigation">
          <a href="#shopcrystal-hero" className="shopcrystal-hover shopcrystal-pull">
            Home
          </a>
          <a href="#shopcrystal-block-a" className="shopcrystal-hover shopcrystal-pull">
            Energy Crystals
          </a>
          <a href="#shopcrystal-block-d" className="shopcrystal-hover shopcrystal-pull">
            Readings
          </a>
          <a href="#shopcrystal-cartogolf" className="shopcrystal-hover shopcrystal-pull">
            Visit
          </a>
          <a href="#shopcrystal-reviews" className="shopcrystal-hover shopcrystal-pull">
            Reviews
          </a>
          <a href="#shopcrystal-contact" className="shopcrystal-hover shopcrystal-pull">
            Contact
          </a>
        </nav>
        <button
          type="button"
          className="shopcrystal-cta-prime shopcrystal-hover shopcrystal-pull"
          onClick={() =>
            openModal("Grand Reopening ✨", "shopcrystal-ct-0", "✨")
          }
        >
          Grand Reopening
        </button>
        <div id="shopcrystal-links">
          <nav>
            <ul>
              <li>
                <a
                  href="https://www.instagram.com/psychic_crystal_bookshop?igsh=MXBibml0NWhhaHI0cQ%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shopcrystal-link shopcrystal-hover shopcrystal-pull"
                  aria-label="Instagram"
                >
                  <i className="fa-brands fa-instagram" aria-hidden="true" />
                  <span>Instagram</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.tiktok.com/@psychic_crystal_bookshop?_r=1&_t=ZP-94CJty8jLf5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shopcrystal-link shopcrystal-hover shopcrystal-pull"
                  aria-label="TikTok"
                >
                  <i className="fa-brands fa-tiktok" aria-hidden="true" />
                  <span>TikTok</span>
                </a>
              </li>
              <li>
                <a
                  href="https://share.google/fBV5ikbimElfe42Mu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shopcrystal-link shopcrystal-hover shopcrystal-pull"
                  aria-label="Google listing"
                >
                  <i className="fa-brands fa-google" aria-hidden="true" />
                  <span>Google</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@psychiccrystalbookshop.com"
                  className="shopcrystal-link shopcrystal-hover shopcrystal-pull"
                  aria-label="Email"
                >
                  <i className="fa-solid fa-envelope" aria-hidden="true" />
                  <span>Email</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+18472620158"
                  className="shopcrystal-link shopcrystal-hover shopcrystal-pull"
                  aria-label="Call"
                >
                  <i className="fa-solid fa-phone" aria-hidden="true" />
                  <span>Call</span>
                </a>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      <div
        id="shopcrystal-dialog-root"
        className={`shopcrystal-overlay ${modal.open ? "active" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="shopcrystal-dialog-title"
        aria-describedby="shopcrystal-dialog-body"
        aria-label="Modal dialog"
      >
        <div className="shopcrystal-dialog">
          <button
            ref={modalCloseRef}
            type="button"
            className="shopcrystal-dialog-close shopcrystal-hover shopcrystal-pull"
            onClick={closeModal}
            aria-label="Close dialog"
          >
            ×
          </button>
          <span id="shopcrystal-dialog-icon" role="img" aria-hidden="true">
            {modal.icon}
          </span>
          <h1 className="shopcrystal-dialog-title" id="shopcrystal-dialog-title">
            {modal.title}
          </h1>
          <div id="shopcrystal-dialog-body" className="shopcrystal-dialog-body">
            {modal.contentId === "shopcrystal-ct-0" ? (
              <>
                <div className="grand-reopening-hero">
                  <img
                    src="/psychicflyerfinL.png"
                    alt="Grand Reopening"
                    className="grand-reopening-hero-img"
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = "https://picsum.photos/seed/grandopening/600/400";
                    }}
                  />
                </div>
                <div className="grand-reopening-content">
                  <div className="grand-reopening-main">
                    <h2>Grand Reopening Under Celine</h2>
                    <p>
                      Psychic & Crystal Bookshop is reopening under Celine&apos;s care as a{" "}
                      <strong>NEW and IMPROVED Psychic &amp; Crystal Bookshop</strong>,
                      blending intuitive readings, crystal healing, and a handpicked
                      library of spiritual titles.
                    </p>
                    <p>
                      Step inside, explore the crystals and books, and let Celine
                      help you find what your energy is asking for right now.
                    </p>
                  </div>
                  <aside className="grand-reopening-aside">
                    <h3>Visit the Shop</h3>
                    <p>
                      Come by soon to experience the refreshed space, new offerings,
                      and welcoming vibe in person.
                    </p>
                  </aside>
                </div>
              </>
            ) : (
              <div dangerouslySetInnerHTML={{ __html: modal.contentHtml }} />
            )}
          </div>
        </div>
      </div>

      <main className="shopcrystal-stack" id="shopcrystal-main" role="main">
          <section
          className="shopcrystal-pane"
          id="shopcrystal-hero"
          data-ui-color="rgb(63, 22, 119)"
          data-ui-text-color="rgb(255, 255, 255)"
          onClick={() => {
            triggerConfetti();
            scrollTo("shopcrystal-welcome");
          }}
          onKeyDown={(e) => e.key === "Enter" && (triggerConfetti(), scrollTo("shopcrystal-welcome"))}
          role="button"
          tabIndex={0}
          aria-label="Go to welcome"
        >
          <div className="shopcrystal-veil">
            <img
              src={LOGO}
              className="shopcrystal-hero-mark"
              alt="Psychic & Crystal Bookshop logo"
              title="Click to start"
            />
          </div>
          <div className="shopcrystal-mesh" id="shopcrystal-mesh-inner" aria-hidden="true" />
          <div className="shopcrystal-hint" aria-label="Scroll to explore">
            Scroll to Explore
          </div>
        </section>

        <section
          id="shopcrystal-welcome"
          className="shopcrystal-pane"
          data-ui-color="rgb(192, 95, 231)"
          data-ui-text-color="rgb(255, 255, 255)"
        >
          <div className="shopcrystal-wrap">
            <div className="shopcrystal-txt">
              <span className="shopcrystal-tag">Welcome</span>
              <div className="shopcrystal-head-wrap">
                <span className="shopcrystal-float shopcrystal-tilt" role="img" aria-label="Crystal">
                  🔮
                </span>
                <h1>
                  Welcome to <strong>Psychic & Crystal Bookshop</strong>!
                </h1>
              </div>
              <h2 className="shopcrystal-lead">
                Pain relief, energy alignment, and spiritual services.
              </h2>
              <p>
                We believe physical discomfort often begins as energetic imbalance.
                Restore harmony through crystal therapy, psychic insight, and frequency-based care—
                for you and your best friends.
              </p>
              <button
                type="button"
                className="shopcrystal-btn shopcrystal-hover shopcrystal-pull"
                onClick={() => {
                  triggerConfetti();
                  scrollTo("shopcrystal-block-a");
                }}
                aria-label="Explore more"
              >
                Explore More! ✨
              </button>
            </div>
            <div className="shopcrystal-img">
              <video
                src={WELCOME_VIDEO_URL}
                autoPlay
                muted
                loop
                playsInline
                role="img"
                aria-label="Welcome to psychic & crystal bookshop"
              />
            </div>
          </div>
        </section>

        <section
          className="shopcrystal-pane shopcrystal-strip"
          id="shopcrystal-block-a"
          data-ui-color="rgb(255, 31, 26)"
          data-ui-text-color="rgb(255, 255, 255)"
        >
          <div className="shopcrystal-strip-inner">
            <div
              className="shopcrystal-pane shopcrystal-cell"
              id="shopcrystal-a1"
              data-ui-color="rgb(166, 194, 217)"
              data-ui-text-color="rgb(255, 255, 255)"
            >
              <div className="shopcrystal-wrap">
                <div className="shopcrystal-txt">
                  <span className="shopcrystal-tag">Intuitive Readings</span>
                  <div className="shopcrystal-head-wrap">
                    <span className="shopcrystal-float shopcrystal-tilt" role="img" aria-label="Sparkles">✨</span>
                    <h1>Tarot Card Reading Session</h1>
                  </div>
                  <h2 className="shopcrystal-lead">Personalized card spreads for clarity, guidance, and insight into life questions and decisions.</h2>
                  <p>Tarot Card Reading Session. Gain clarity and guidance through a one-on-one tarot reading tailored to your questions.</p>
                  <button
                    type="button"
                    className="shopcrystal-btn shopcrystal-hover shopcrystal-pull"
                    onClick={() => { triggerConfetti(); scrollTo("shopcrystal-block-b"); }}
                  >
                    Learn More
                  </button>
                </div>
                <div className="shopcrystal-img">
                  <video src={TAROT_VIDEO_URL} autoPlay muted loop playsInline role="img" aria-label="Tarot card reading session" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Food Snacks */}
        <section
          className="shopcrystal-pane shopcrystal-strip"
          id="shopcrystal-block-b"
          data-ui-color="rgb(15, 80, 155)"
          data-ui-text-color="rgb(255, 255, 255)"
        >
          <div className="shopcrystal-strip-inner">
            <div
              className="shopcrystal-pane shopcrystal-cell"
              id="shopcrystal-b1"
              data-ui-color="rgb(15, 80, 155)"
              data-ui-text-color="rgb(255, 255, 255)"
            >
              <div className="shopcrystal-wrap">
                <div className="shopcrystal-txt">
                  <span className="shopcrystal-tag">Pocket & Travel Sets</span>
                  <div className="shopcrystal-head-wrap">
                    <span className="shopcrystal-float shopcrystal-tilt" role="img" aria-label="Crystal">💎</span>
                    <h1>Crystals and more</h1>
                  </div>
                  <h2 className="shopcrystal-lead">Small crystal bundles for daily stress reduction and numbness support.</h2>
                  <p>Crystals and more. Irresistible on-the-go support for stress and tingling!</p>
                  <button
                    type="button"
                    className="shopcrystal-btn shopcrystal-hover shopcrystal-pull"
                    onClick={() => { triggerConfetti(); scrollTo("shopcrystal-block-c"); }}
                  >
                    Learn More
                  </button>
                </div>
                <div className="shopcrystal-img">
                  <video src={POCKET_PROTECTION_VIDEO_URL} autoPlay muted loop playsInline role="img" aria-label="Crystals and more" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Food Wet */}
        <section
          className="shopcrystal-pane shopcrystal-strip"
          id="shopcrystal-block-c"
          data-ui-color="rgb(255, 31, 26)"
          data-ui-text-color="rgb(255, 255, 255)"
        >
          <div className="shopcrystal-strip-inner">
            <div
              className="shopcrystal-pane shopcrystal-cell"
              id="shopcrystal-c1"
              data-ui-color="rgb(255, 31, 26)"
              data-ui-text-color="rgb(255, 255, 255)"
            >
              <div className="shopcrystal-wrap">
                <div className="shopcrystal-txt">
                  <span className="shopcrystal-tag">Cleansing Love Life</span>
                  <div className="shopcrystal-head-wrap">
                    <span className="shopcrystal-float shopcrystal-tilt" role="img" aria-label="Ritual">✨</span>
                    <h1>Cleansing Your Love Life </h1>
                  </div>
                  <h2 className="shopcrystal-lead">Clear heavy, stuck, or painful patterns in your love life so new, healthy connection can flow in.</h2>
                  <p>
                    Celine&apos;s gift is tuning into where old hurt, betrayal, or disappointment is still sitting in your energy field
                    and gently lifting it away. During this ritual she combines crystals, focused intention, and spoken prayer over your
                    situation to cleanse negative cords, soften heartbreak, and invite in loving, reciprocal energy.
                  </p>
                  <button
                    type="button"
                    className="shopcrystal-btn shopcrystal-hover shopcrystal-pull"
                    onClick={() => { triggerConfetti(); scrollTo("regal-morsels"); }}
                  >
                    Cleanse My Love Life 💗
                  </button>
                </div>
                <div className="shopcrystal-img">
                  <video
                    src={LOVE_LIFE_CLEANSING_VIDEO_URL}
                    autoPlay
                    muted
                    loop
                    playsInline
                    role="img"
                    aria-label="Celine cleansing negative love-life energy"
                  />
                </div>
              </div>
            </div>
            <div
              className="shopcrystal-pane shopcrystal-cell"
              id="shopcrystal-c2"
              data-ui-color="rgb(216, 135, 154)"
              data-ui-text-color="rgb(255,255,255)"
            >
              <div className="shopcrystal-wrap">
                <div className="shopcrystal-txt">
                  <span className="shopcrystal-tag">Cleansing Love Life</span>
                  <div className="shopcrystal-head-wrap">
                    <span className="shopcrystal-float shopcrystal-tilt" role="img" aria-label="Crown">👑</span>
                    <h1>Reconnecting With a Loved One</h1>
                  </div>
                  <h2 className="shopcrystal-lead">A focused ritual to help reopen the path to a past lover or missed connection that is still meant to be in your life.</h2>
                  <p>
                    In this work, Celine reads the true energetic story between you and the other person—where communication broke,
                    where pride, fear, or interference tangled the bond—and then begins clearing those blocks on a soul level.
                    Clients have seen former partners, long-distance loves, and almost-relationships reach back out after Celine has
                    worked on their case, because she is able to soften resistance, heal old misunderstandings, and energetically
                    nudge both hearts back into alignment when the connection is still divinely guided.
                  </p>
                  <button
                    type="button"
                    className="shopcrystal-btn shopcrystal-hover shopcrystal-pull"
                    onClick={() => { triggerConfetti(); scrollTo("shopcrystal-block-d"); }}
                  >
                    Help Me Reconnect 🤍
                  </button>
                </div>
                <div className="shopcrystal-img">
                  <img src={RECONNECTING_IMAGE_URL} alt="Two hands holding — reconnecting with a loved one" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Readings & energy cleansing */}
        <section
          className="shopcrystal-pane shopcrystal-strip"
          id="shopcrystal-block-d"
          data-ui-color="rgb(221, 213, 204)"
          data-ui-text-color="rgb(37, 35, 36)"
        >
          <div className="shopcrystal-strip-inner">
            <div
              className="shopcrystal-pane shopcrystal-cell"
              id="shopcrystal-d1"
              data-ui-color="rgb(221, 213, 204)"
              data-ui-text-color="rgb(37, 35, 36)"
            >
              <div className="shopcrystal-wrap">
                <div className="shopcrystal-txt">
                  <span className="shopcrystal-tag">Readings</span>
                  <div className="shopcrystal-head-wrap">
                    <span className="shopcrystal-float shopcrystal-tilt" role="img" aria-label="Intuition">🔮</span>
                    <h1>Readings With Celine</h1>
                  </div>
                  <h2 className="shopcrystal-lead">Palm readings, astrology chart readings, and psychic readings to illuminate your path and relationships.</h2>
                  <p>
                    Celine uses her clairvoyant gift to read the lines of your palm, the placements in your birth chart, and the images she
                    receives psychically to reveal what is really happening beneath the surface. 
                  </p>
                  <button
                    type="button"
                    className="shopcrystal-btn shopcrystal-hover shopcrystal-pull"
                    onClick={() => {
                      triggerConfetti();
                      scrollTo("shopcrystal-block-b");
                    }}
                  >
                    Book a Reading ✨
                  </button>
                </div>
                <div className="shopcrystal-img">
                  <video
                    src={READINGS_VIDEO_URL}
                    autoPlay
                    muted
                    loop
                    playsInline
                    role="img"
                    aria-label="Crystals"
                  />
                </div>
              </div>
            </div>
            <div
              className="shopcrystal-pane shopcrystal-cell"
              id="shopcrystal-d3"
              data-ui-color="rgb(191, 84, 235)"
              data-ui-text-color="rgb(255, 255, 255)"
            >
              <div className="shopcrystal-wrap">
                <div className="shopcrystal-txt">
                  <span className="shopcrystal-tag">Energy Cleansing Services</span>
                  <div className="shopcrystal-head-wrap">
                    <span className="shopcrystal-float shopcrystal-tilt" role="img" aria-label="Galaxy">🌌</span>
                    <h1>Shadow Release Clearing</h1>
                  </div>
                  <h2 className="shopcrystal-lead">Trauma-based tension release (shoulders, neck, joints).</h2>
                  <p>Shadow Release Clearing. A dreamy blend for deep tension and trauma release.</p>
                  <button
                    type="button"
                    className="shopcrystal-btn shopcrystal-hover shopcrystal-pull"
                    onClick={() => { triggerConfetti(); scrollTo("shopcrystal-cartogolf"); }}
                  >
                    Book a Session
                  </button>
                </div>
                <div className="shopcrystal-img">
                  <img src={IMG("products/eclipse_haze.webp")} alt="Eclipse Haze" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Come See Us — Cartogolf photo + socials */}
        <section
          id="shopcrystal-cartogolf"
          className="shopcrystal-pane shopcrystal-cartogolf"
          data-ui-color="rgb(255, 255, 255)"
          data-ui-text-color="rgb(0, 0, 0)"
        >
          <div className="shopcrystal-wrap shopcrystal-cartogolf-wrap">
            <div className="shopcrystal-txt shopcrystal-cartogolf-txt">
              <span className="shopcrystal-tag">Come see us</span>
              <h1 className="shopcrystal-cartogolf-head">Welcome IN</h1>
              <h2 className="shopcrystal-lead">Hours are listed on Google.</h2>
              <div className="shopcrystal-cartogolf-socials" aria-label="Connect with us">
                <a
                  href="https://www.instagram.com/psychic_crystal_bookshop?igsh=MXBibml0NWhhaHI0cQ%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shopcrystal-cartogolf-link shopcrystal-hover shopcrystal-pull"
                  aria-label="Instagram"
                >
                  <i className="fa-brands fa-instagram" aria-hidden="true" />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://www.tiktok.com/@psychic_crystal_bookshop?_r=1&_t=ZP-94CJty8jLf5"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shopcrystal-cartogolf-link shopcrystal-hover shopcrystal-pull"
                  aria-label="TikTok"
                >
                  <i className="fa-brands fa-tiktok" aria-hidden="true" />
                  <span>TikTok</span>
                </a>
                <a
                  href="https://share.google/fBV5ikbimElfe42Mu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="shopcrystal-cartogolf-link shopcrystal-hover shopcrystal-pull"
                  aria-label="Google listing"
                >
                  <i className="fa-brands fa-google" aria-hidden="true" />
                  <span>Google</span>
                </a>
                <a
                  href="mailto:info@psychiccrystalbookshop.com"
                  className="shopcrystal-cartogolf-link shopcrystal-hover shopcrystal-pull"
                  aria-label="Email"
                >
                  <i className="fa-solid fa-envelope" aria-hidden="true" />
                  <span>Email</span>
                </a>
                <a
                  href="tel:+18472620158"
                  className="shopcrystal-cartogolf-link shopcrystal-hover shopcrystal-pull"
                  aria-label="Call"
                >
                  <i className="fa-solid fa-phone" aria-hidden="true" />
                  <span>Call</span>
                </a>
              </div>
            </div>
            <div className="shopcrystal-img shopcrystal-cartogolf-img">
              <img src="/CARTOgolf.jpg" alt="Psychic & Crystal Bookshop — come see us" />
            </div>
          </div>
        </section>

        {/* 5-Star Reviews Marquee */}
        <section
          className="shopcrystal-pane shopcrystal-reviews-marquee"
          id="shopcrystal-reviews"
          data-ui-color="rgb(245, 245, 245)"
          data-ui-text-color="rgb(33, 33, 33)"
        >
          <div className="shopcrystal-reviews-inner">
            <h2 className="shopcrystal-reviews-heading">What Our Customers Say</h2>
            <div className="shopcrystal-reviews-track-wrap" aria-hidden="true">
              <div className="shopcrystal-reviews-track">
                {/* Aggregate card */}
                <div className="shopcrystal-review-card shopcrystal-review-aggregate">
                  <h3 className="shopcrystal-review-business">Psychic &amp; Crystal Bookshop</h3>
                  <div className="shopcrystal-review-rating-big">4.9</div>
                  <div className="shopcrystal-review-stars" aria-label="4.9 out of 5 stars">
                    <span className="shopcrystal-star full" />
                    <span className="shopcrystal-star full" />
                    <span className="shopcrystal-star full" />
                    <span className="shopcrystal-star full" />
                    <span className="shopcrystal-star partial" style={{ "--fill": "90%" }} />
                  </div>
                  <p className="shopcrystal-review-meta">
                    <span className="shopcrystal-review-sources">
                      <span className="shopcrystal-review-logo google" aria-label="Google">G</span>
                      <span className="shopcrystal-review-logo yahoo" aria-label="Yahoo">Y!</span>
                      <span className="shopcrystal-review-logo yelp" aria-label="Yelp">Yelp</span>
                    </span>
                    average rating of {REVIEWS_AGGREGATE.googleCount} reviews on Google, {REVIEWS_AGGREGATE.yahooCount} on Yahoo, {REVIEWS_AGGREGATE.yelpCount} on Yelp
                  </p>
                  <div className="shopcrystal-review-actions">
                    <a href="https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4" target="_blank" rel="noopener noreferrer" className="shopcrystal-review-btn primary">Leave a review</a>
                    <button type="button" className="shopcrystal-review-btn secondary" onClick={() => scrollTo("shopcrystal-reviews")}>See more</button>
                  </div>
                  <p className="shopcrystal-review-verified">Last review received a month ago</p>
                </div>
                {/* Individual review cards */}
                {REVIEWS_LIST.map((r, i) => (
                  <div key={i} className="shopcrystal-review-card">
                    <div className="shopcrystal-review-card-header">
                      <div className="shopcrystal-review-avatar" aria-hidden="true">{r.name.charAt(0)}</div>
                      <div>
                        <strong>{r.name}</strong>
                        <span className="shopcrystal-review-date">{r.date}</span>
                      </div>
                      <span className="shopcrystal-review-source" style={{ color: r.logoColor }} title={r.source}>{r.source}</span>
                    </div>
                    <div className="shopcrystal-review-stars small" aria-label="5 stars">
                      {[1, 2, 3, 4, 5].map((s) => <span key={s} className="shopcrystal-star full" />)}
                    </div>
                    <p className="shopcrystal-review-text">{r.text}</p>
                    <button type="button" className="shopcrystal-review-readmore">Read more</button>
                  </div>
                ))}
                {/* Duplicate for seamless loop */}
                <div className="shopcrystal-review-card shopcrystal-review-aggregate">
                  <h3 className="shopcrystal-review-business">Psychic &amp; Crystal Bookshop</h3>
                  <div className="shopcrystal-review-rating-big">4.9</div>
                  <div className="shopcrystal-review-stars" aria-label="4.9 out of 5 stars">
                    <span className="shopcrystal-star full" />
                    <span className="shopcrystal-star full" />
                    <span className="shopcrystal-star full" />
                    <span className="shopcrystal-star full" />
                    <span className="shopcrystal-star partial" style={{ "--fill": "90%" }} />
                  </div>
                  <p className="shopcrystal-review-meta">average rating on Google, Yahoo, Yelp</p>
                  <div className="shopcrystal-review-actions">
                    <a href="https://search.google.com/local/writereview?placeid=ChIJN1t_tDeuEmsRUsoyG83frY4" target="_blank" rel="noopener noreferrer" className="shopcrystal-review-btn primary">Leave a review</a>
                    <button type="button" className="shopcrystal-review-btn secondary">See more</button>
                  </div>
                </div>
                {REVIEWS_LIST.map((r, i) => (
                  <div key={`dup-${i}`} className="shopcrystal-review-card">
                    <div className="shopcrystal-review-card-header">
                      <div className="shopcrystal-review-avatar" aria-hidden="true">{r.name.charAt(0)}</div>
                      <div>
                        <strong>{r.name}</strong>
                        <span className="shopcrystal-review-date">{r.date}</span>
                      </div>
                      <span className="shopcrystal-review-source" style={{ color: r.logoColor }} title={r.source}>{r.source}</span>
                    </div>
                    <div className="shopcrystal-review-stars small" aria-label="5 stars">
                      {[1, 2, 3, 4, 5].map((s) => <span key={s} className="shopcrystal-star full" />)}
                    </div>
                    <p className="shopcrystal-review-text">{r.text}</p>
                    <button type="button" className="shopcrystal-review-readmore">Read more</button>
                  </div>
                ))}
              </div>
            </div>
            <div className="shopcrystal-reviews-dots" aria-hidden="true">
              <span className="active" />
              <span />
              <span />
            </div>
          </div>
        </section>

        {/* Contact section: one full-screen slide; address + form scroll inside */}
        <section id="shopcrystal-contact" className="shopcrystal-pane shopcrystal-contact" data-ui-color="rgb(250, 250, 250)" data-ui-text-color="rgb(33, 33, 33)">
          <div className="shopcrystal-contact-scroll">
          <div className="shopcrystal-contact-inner">
            <div className="shopcrystal-contact-address-block">
              <a
                href={FOOTER_DIRECTIONS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="shopcrystal-contact-address-link"
                aria-label="Get directions to Psychic & Crystal Bookshop"
              >
                <MapPin size={28} strokeWidth={2} aria-hidden="true" />
                <span className="shopcrystal-contact-address-text">{FOOTER_ADDRESS}</span>
              </a>
            </div>
            <div className="shopcrystal-contact-form-wrap">
              <h2 className="shopcrystal-contact-form-title">Get in Touch</h2>
              <form className="shopcrystal-intake-form" onSubmit={handleIntakeSubmit} noValidate>
                <div className="shopcrystal-intake-field">
                  <label htmlFor="intake-name">Name</label>
                  <input
                    id="intake-name"
                    type="text"
                    name="name"
                    value={intakeForm.name}
                    onChange={handleIntakeChange}
                    placeholder="Your name"
                    required
                    autoComplete="name"
                  />
                </div>
                <div className="shopcrystal-intake-field shopcrystal-intake-field-inline">
                  <label htmlFor="intake-address">Address</label>
                  <input
                    id="intake-address"
                    type="text"
                    name="address"
                    value={intakeForm.address}
                    onChange={handleIntakeChange}
                    placeholder="Street, state, zip"
                    autoComplete="street-address"
                  />
                </div>
                <div className="shopcrystal-intake-field shopcrystal-intake-field-inline">
                  <label htmlFor="intake-email">Email</label>
                  <input
                    id="intake-email"
                    type="email"
                    name="email"
                    value={intakeForm.email}
                    onChange={handleIntakeChange}
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                  />
                </div>
                <div className="shopcrystal-intake-field">
                  <label htmlFor="intake-city">City</label>
                  <input
                    id="intake-city"
                    type="text"
                    name="city"
                    value={intakeForm.city}
                    onChange={handleIntakeChange}
                    placeholder="City"
                    autoComplete="address-level2"
                  />
                </div>
                <div className="shopcrystal-intake-field">
                  <label htmlFor="intake-phone">Phone number</label>
                  <input
                    id="intake-phone"
                    type="tel"
                    name="phone"
                    value={intakeForm.phone}
                    onChange={handleIntakeChange}
                    placeholder="(847) 262-0158"
                    autoComplete="tel"
                  />
                </div>
                <div className="shopcrystal-intake-field">
                  <label htmlFor="intake-service">Service</label>
                  <select
                    id="intake-service"
                    name="service"
                    value={intakeForm.service}
                    onChange={handleIntakeChange}
                    required
                    aria-describedby="intake-service-desc"
                  >
                    <option value="">Select a service</option>
                    {INTAKE_SERVICES.map((s) => (
                      <option key={s} value={s}>{s}</option>
                    ))}
                  </select>
                  <span id="intake-service-desc" className="shopcrystal-intake-hint">Choose the service you&apos;re interested in</span>
                </div>
                <div className="shopcrystal-intake-field shopcrystal-intake-field-full">
                  <label htmlFor="intake-message">Message</label>
                  <textarea
                    id="intake-message"
                    name="message"
                    value={intakeForm.message}
                    onChange={handleIntakeChange}
                    placeholder="Tell us what you're looking for..."
                    rows={4}
                  />
                </div>
                <button type="submit" className="shopcrystal-intake-submit" disabled={intakeSubmitting}>
                  {intakeSubmitting ? "Sending…" : "Submit"}
                </button>
              </form>
              <p className="shopcrystal-contact-call">
                Call Celine at <a href={`tel:${CELINE_PHONE.replace(/-/g, "")}`}>{CELINE_PHONE}</a>
              </p>
            </div>
          </div>
          </div>
        </section>

        {/* Footer: copyright only — must be snap target so it's reachable */}
        <footer className="shopcrystal-pane shopcrystal-footer" id="shopcrystal-footer" data-ui-color="rgb(250, 250, 250)" data-ui-text-color="rgb(33, 33, 33)">
          <p className="shopcrystal-footer-copy">© 2026</p>
          {toast.show && (
            <div className={`shopcrystal-toast shopcrystal-toast-${toast.type}`} role="status" aria-live="polite">
              {toast.message}
            </div>
          )}
        </footer>
      </main>

      <div id="shopcrystal-modal-store" style={{ display: "none" }} aria-hidden="true">
        <div id="shopcrystal-ct-0">
          <div className="grand-reopening-hero">
            <img
              src="/psychicflyerfinL.png"
              alt="Grand Reopening"
              className="grand-reopening-hero-img"
            />
          </div>
          <div className="grand-reopening-content">
            <div className="grand-reopening-main">
              <h2>Grand Reopening Under Celine</h2>
              <p>
                Psychic & Crystal Bookshop is reopening under Celine&apos;s care as a{" "}
                <strong>NEW and IMPROVED Psychic &amp; Crystal Bookshop</strong>,
                blending intuitive readings, crystal healing, and a handpicked
                library of spiritual titles.
              </p>
              <p>
                Step inside, explore the crystals and books, and let Celine
                help you find what your energy is asking for right now.
              </p>
            </div>
            <aside className="grand-reopening-aside">
              <h3>Visit the Shop</h3>
              <p>
                Come by soon to experience the refreshed space, new offerings,
                and welcoming vibe in person.
              </p>
            </aside>
          </div>
        </div>
        <div id="shopcrystal-ct-1">
          <h2>Crystal Therapy</h2>
          <p>
            How crystal frequency may support: joint inflammation, shoulder stiffness,
            migraine frequency, nerve numbness. We work with grounding stones, rose quartz,
            carnelian, smoky quartz, and more to support your body&apos;s natural balance.
          </p>
          <p className="shopcrystal-legal">
            <strong>Disclaimer:</strong> These services are spiritual and holistic in nature.
            They are not medical treatments and are not intended to diagnose or cure medical conditions.
            Please consult a licensed healthcare provider for medical concerns.
          </p>
        </div>
        <div id="shopcrystal-ct-2">
          <h2>Energy Cleansing</h2>
          <p>
            Aura clearing, trauma tension release, stress detox. Our sessions include
            full aura reading and clearing, shadow release work, and energy alignment
            to refresh your energy field.
          </p>
          <p className="shopcrystal-legal">
            <strong>Disclaimer:</strong> These services are spiritual and holistic in nature.
            They are not medical treatments and are not intended to diagnose or cure medical conditions.
            Please consult a licensed healthcare provider for medical concerns.
          </p>
        </div>
        <div id="shopcrystal-ct-3">
          <h2>Psychic Healing</h2>
          <p>
            Intuitive body scan, emotional root identification, guided release work.
            Full-body psychic energy alignment to support shoulder &amp; joint pain, migraines,
            numbness, and stress-related muscle locking.
          </p>
          <p className="shopcrystal-legal">
            <strong>Disclaimer:</strong> These services are spiritual and holistic in nature.
            They are not medical treatments and are not intended to diagnose or cure medical conditions.
            Please consult a licensed healthcare provider for medical concerns.
          </p>
        </div>
        <div id="shopcrystal-ct-4">
          <h2>Shoulder &amp; Tension Relief</h2>
          <p>
            Crystal layouts and energy work focused on shoulder pain, stress-induced tightness,
            and upper body tension. Rose quartz, blue lace agate, and clearing techniques.
          </p>
          <p className="shopcrystal-legal">
            <strong>Disclaimer:</strong> These services are spiritual and holistic in nature.
            They are not medical treatments and are not intended to diagnose or cure medical conditions.
            Please consult a licensed healthcare provider for medical concerns.
          </p>
        </div>
        <div id="shopcrystal-ct-5">
          <h2>Migraine &amp; Headache Support</h2>
          <p>
            Crystals and more to support headache relief, migraines, and nervous system reset.
          </p>
          <p className="shopcrystal-legal">
            <strong>Disclaimer:</strong> These services are spiritual and holistic in nature.
            They are not medical treatments and are not intended to diagnose or cure medical conditions.
            Please consult a licensed healthcare provider for medical concerns.
          </p>
        </div>
        <div id="shopcrystal-ct-6">
          <h2>Joint &amp; Circulation Support</h2>
          <p>
            Root alignment stones and chakra balancing for
            joint discomfort, circulation blocks, elbow pain, and nerve numbness.
          </p>
          <p className="shopcrystal-legal">
            <strong>Disclaimer:</strong> These services are spiritual and holistic in nature.
            They are not medical treatments and are not intended to diagnose or cure medical conditions.
            Please consult a licensed healthcare provider for medical concerns.
          </p>
        </div>
        <div id="shopcrystal-ct-7">
          <h2>Authentic Healing</h2>
          <p>Safe, ethical, and effective care for your energy and your environment. We use quality crystals and respectful practices.</p>
        </div>
        <div id="shopcrystal-ct-8">
          <h2>People First Energy</h2>
          <p>You and your wellbeing come first. Our approach is human-centered and focused on restoring harmony.</p>
        </div>
        <div id="shopcrystal-ct-9">
          <h2>Theory</h2>
          <p>
            Energy flows where attention goes. Tension stores in shoulders, joints, and nerves.
            This experience is built on the idea that holistic support can complement your wellness journey.
          </p>
        </div>
        <div id="shopcrystal-ct-10">
          <h2>About This Experience</h2>
          <p>
            Holistic support, not medical replacement. We offer crystal therapy, energy cleansing,
            and psychic healing as complementary practices. Always consult a licensed healthcare provider for medical concerns.
          </p>
        </div>
        <div id="shopcrystal-about">
          <h2>Stay Connected</h2>
          <p>
            Find <a href="https://julibe.com/" target="_blank" rel="noopener noreferrer">@Julibe</a> and
            share the love for creative coding. Always open to new ideas and
            collaborations. Copyright © 2026 Julibe.com. All rights reserved.
          </p>
        </div>
      </div>
    </div>
  );
}
