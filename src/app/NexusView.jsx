"use client";

import { useRef, useEffect, useState } from "react";
import gsap from "gsap";
import "./nexus-view.css";
import {
  crystalImages,
  initCursor,
  initSparkParticles,
  initIntroGrid,
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

function scrollTo(id) {
  const el = document.getElementById(id);
  if (el) el.scrollIntoView({ behavior: "smooth" });
}

export default function NexusView() {
  const containerRef = useRef(null);
  const [modal, setModal] = useState({
    open: false,
    title: "",
    icon: "",
    contentHtml: "",
  });

  const openModal = (title, contentId, icon) => {
    if (typeof contentId === "string") {
      const el = document.getElementById(contentId);
      setModal({
        open: true,
        title: title || "",
        icon: icon || "",
        contentHtml: el ? el.innerHTML : "",
      });
    } else {
      setModal({ open: true, title: title || "", icon: icon || "", contentHtml: String(contentId || "") });
    }
  };

  const closeModal = () => setModal((m) => ({ ...m, open: false }));

  const triggerConfetti = () => {
    const root = containerRef.current;
    if (!root) return;
    const canvas = root.querySelector("#k7-canvas-cf");
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
    cleanups.push(initCursor(containerRef) || (() => {}));
    cleanups.push(initSparkParticles(containerRef) || (() => {}));
    initIntroGrid(containerRef, crystalImages, gsap);
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

  useEffect(() => {
    if (typeof window === "undefined") return;
    try {
      const hasSeen = window.sessionStorage.getItem("nxReopenSeen");
      if (hasSeen) return;
      const timer = window.setTimeout(() => {
        const fn = window.nxOpenModal || openModal;
        fn("Grand Reopening ✨", "content-grand-reopening", "✨");
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

  return (
    <div className="k7-scope" ref={containerRef}>
      <canvas id="k7-canvas-bg" aria-hidden="true" />
      <canvas id="k7-canvas-cf" aria-hidden="true" />
      <div className="k7-ptr" id="k7-ptr" aria-hidden="true" />
      <div className="k7-ring" id="k7-ring" aria-hidden="true" />

      <header className="k7-bar">
        <div className="k7-mark-wrap k7-hover k7-pull">
          <img
            src={LOGO}
            alt="psychic &amp; rock shop logo"
            title="Crystal & Psychic Healing"
            className="k7-mark"
          />
        </div>
        <nav className="k7-rail" role="navigation" aria-label="Main navigation">
          <a href="#k7-hero" className="k7-hover k7-pull">
            Home
          </a>
          <a href="#k7-block-a" className="k7-hover k7-pull">
            Energy Crystals
          </a>
          <a href="#k7-block-d" className="k7-hover k7-pull">
            Energy Cleansing
          </a>
          <a href="#k7-block-e" className="k7-hover k7-pull">
            Health
          </a>
          <a href="#k7-block-f" className="k7-hover k7-pull">
            About
          </a>
        </nav>
        <button
          type="button"
          className="k7-cta-prime k7-hover k7-pull"
          onClick={() =>
            openModal("Grand Reopening ✨", "k7-ct-0", "✨")
          }
        >
          Grand Reopening
        </button>
        <div id="k7-links">
          <nav>
            <ul>
              <li>
                <a
                  href="https://www.instagram.com/psychic_crystal_bookshop?igsh=MXBibml0NWhhaHI0cQ%3D%3D&utm_source=qr"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="k7-link k7-hover k7-pull"
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
                  className="k7-link k7-hover k7-pull"
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
                  className="k7-link k7-hover k7-pull"
                  aria-label="Google listing"
                >
                  <i className="fa-brands fa-google" aria-hidden="true" />
                  <span>Google</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@psychiccrystalbookshop.com"
                  className="k7-link k7-hover k7-pull"
                  aria-label="Email"
                >
                  <i className="fa-solid fa-envelope" aria-hidden="true" />
                  <span>Email</span>
                </a>
              </li>
              <li>
                <a
                  href="tel:+18472620158"
                  className="k7-link k7-hover k7-pull"
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
        id="k7-dialog-root"
        className={`k7-overlay ${modal.open ? "active" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-labelledby="m_title"
        aria-describedby="m_desc"
      >
        <div className="k7-dialog">
          <button
            type="button"
            className="k7-dialog-close k7-hover k7-pull"
            onClick={closeModal}
            aria-label="Close"
          >
            ×
          </button>
          <span id="k7-dialog-icon" role="img" aria-hidden="true">
            {modal.icon}
          </span>
          <h1 className="k7-dialog-title" id="k7-dialog-title">
            {modal.title}
          </h1>
          <div
            id="k7-dialog-body"
            className="k7-dialog-body"
            dangerouslySetInnerHTML={{ __html: modal.contentHtml }}
          />
        </div>
      </div>

      <main className="k7-stack" id="k7-main">
          <section
          className="k7-pane"
          id="k7-hero"
          data-ui-color="rgb(63, 22, 119)"
          data-ui-text-color="rgb(255, 255, 255)"
          onClick={() => {
            triggerConfetti();
            scrollTo("k7-welcome");
          }}
          onKeyDown={(e) => e.key === "Enter" && (triggerConfetti(), scrollTo("k7-welcome"))}
          role="button"
          tabIndex={0}
          aria-label="Go to welcome"
        >
          <div className="k7-veil">
            <img
              src={LOGO}
              className="k7-hero-mark"
              alt="psychic &amp; rock shop logo"
              title="Click to start"
            />
          </div>
          <div className="k7-mesh" id="k7-mesh-inner" aria-hidden="true" />
          <div className="k7-hint" aria-label="Scroll to explore">
            Scroll to Explore
          </div>
        </section>

        <section
          id="welcome"
          className="k7-pane"
          data-ui-color="rgb(192, 95, 231)"
          data-ui-text-color="rgb(255, 255, 255)"
        >
          <div className="k7-wrap">
            <div className="k7-txt">
              <span className="k7-tag">Welcome</span>
              <div className="k7-head-wrap">
                <span className="k7-float k7-tilt" role="img" aria-label="Crystal">
                  🔮
                </span>
                <h1>
                  Welcome to <strong>psychic &amp; rock shop</strong>!
                </h1>
              </div>
              <h2 className="k7-lead">
                Pain relief, energy alignment, and spiritual services.
              </h2>
              <p>
                We believe physical discomfort often begins as energetic imbalance.
                Restore harmony through crystal therapy, psychic insight, and frequency-based care—
                for you and your best friends.
              </p>
              <button
                type="button"
                className="k7-btn k7-hover k7-pull"
                onClick={() => {
                  triggerConfetti();
                  scrollTo("k7-block-a");
                }}
                aria-label="Explore more"
              >
                Explore More! ✨
              </button>
            </div>
            <div className="k7-img">
              <video
                src={WELCOME_VIDEO_URL}
                autoPlay
                muted
                loop
                playsInline
                role="img"
                aria-label="Welcome to psychic &amp; rock shop"
              />
            </div>
          </div>
        </section>

        <section
          className="k7-pane k7-strip"
          id="k7-block-a"
          data-ui-color="rgb(255, 31, 26)"
          data-ui-text-color="rgb(255, 255, 255)"
        >
          <div className="k7-strip-inner">
            <div
              className="k7-pane k7-cell"
              id="k7-a1"
              data-ui-color="rgb(166, 194, 217)"
              data-ui-text-color="rgb(255, 255, 255)"
            >
              <div className="k7-wrap">
                <div className="k7-txt">
                  <span className="k7-tag">Intuitive Readings</span>
                  <div className="k7-head-wrap">
                    <span className="k7-float k7-tilt" role="img" aria-label="Sparkles">✨</span>
                    <h1>Tarot Card Reading Session</h1>
                  </div>
                  <h2 className="k7-lead">Personalized card spreads for clarity, guidance, and insight into life questions and decisions.</h2>
                  <p>Tarot Card Reading Session. Gain clarity and guidance through a one-on-one tarot reading tailored to your questions.</p>
                  <button
                    type="button"
                    className="k7-btn k7-hover k7-pull"
                    onClick={() => { triggerConfetti(); scrollTo("k7-a2"); }}
                  >
                    Learn More Now! 🔮
                  </button>
                </div>
                <div className="k7-img">
                  <video src={TAROT_VIDEO_URL} autoPlay muted loop playsInline role="img" aria-label="Tarot card reading session" />
                </div>
              </div>
            </div>
            <div
              className="k7-pane k7-cell"
              id="k7-a2"
              data-ui-color="rgb(240, 15, 33)"
              data-ui-text-color="rgb(255,255,255)"
            >
              <div className="k7-wrap">
                <div className="k7-txt">
                  <span className="k7-tag">Energy Crystals</span>
                  <div className="k7-head-wrap">
                    <span className="k7-float k7-tilt" role="img" aria-label="Heart">❤️</span>
                    <h1>Crimson Vitality Grid</h1>
                  </div>
                  <h2 className="k7-lead">
                    Red jasper + garnet sets to stimulate blood flow and ease joint stiffness.
                  </h2>
                  <p>
                    Crimson Vitality Grid. A hearty blend of grounding red stones
                    to support circulation and comfort in joints and muscles.
                  </p>
                  <button
                    type="button"
                    className="k7-btn k7-hover k7-pull"
                    onClick={() => {
                      triggerConfetti();
                      scrollTo("k7-a3");
                    }}
                  >
                    Rose Aura! 🌸
                  </button>
                </div>
                <div className="k7-img">
                  <img
                    src={IMG("products/crimson_surge.webp")}
                    alt="Crimson Surge beef"
                  />
                </div>
              </div>
            </div>
            <div
              className="k7-pane k7-cell"
              id="k7-a3"
              data-ui-color="rgb(216, 135, 154)"
              data-ui-text-color="rgb(255,255,255)"
            >
              <div className="k7-wrap">
                <div className="k7-txt">
                  <span className="k7-tag">Energy Crystals</span>
                  <div className="k7-head-wrap">
                    <span className="k7-float k7-tilt" role="img" aria-label="Flower">🌸</span>
                    <h1>Rose Aura Harmony</h1>
                  </div>
                  <h2 className="k7-lead">Rose quartz for emotional tension release and stress-induced shoulder tightness.</h2>
                  <p>
                    Rose Aura Harmony. A gentle fusion of rose quartz energy
                    to soften tension and support emotional release in shoulders and heart space.
                  </p>
                  <button
                    type="button"
                    className="k7-btn k7-hover k7-pull"
                    onClick={() => {
                      triggerConfetti();
                      scrollTo("k7-a4");
                    }}
                  >
                    Ember Protection! ⭐
                  </button>
                </div>
                <div className="k7-img">
                  <img
                    src={IMG("products/rose_drift.webp")}
                    alt="Rose Drift"
                  />
                </div>
              </div>
            </div>
            <div
              className="k7-pane k7-cell"
              id="k7-a4"
              data-ui-color="rgb(230, 180, 81)"
              data-ui-text-color="rgb(255,255,255)"
            >
              <div className="k7-wrap">
                <div className="k7-txt">
                  <span className="k7-tag">Energy Crystals</span>
                  <div className="k7-head-wrap">
                    <span className="k7-float k7-tilt" role="img" aria-label="Star">⭐</span>
                    <h1>Ember Protection Flame</h1>
                  </div>
                  <h2 className="k7-lead">Carnelian + smoky quartz for inflammation support and energetic shielding.</h2>
                  <p>
                    Ember Protection Flame. Golden carnelian and smoky quartz
                    for warmth, inflammation support, and a protective energetic field.
                  </p>
                  <button
                    type="button"
                    className="k7-btn k7-hover k7-pull"
                    onClick={() => {
                      triggerConfetti();
                      scrollTo("k7-block-b");
                    }}
                  >
                    Pocket Sets! ✨
                  </button>
                </div>
                <div className="k7-img">
                  <img
                    src={IMG("products/ember_glow.webp")}
                    alt="Ember Glow"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Food Snacks */}
        <section
          className="k7-pane k7-strip"
          id="k7-block-b"
          data-ui-color="rgb(15, 80, 155)"
          data-ui-text-color="rgb(255, 255, 255)"
        >
          <div className="k7-strip-inner">
            <div
              className="k7-pane k7-cell"
              id="k7-b1"
              data-ui-color="rgb(15, 80, 155)"
              data-ui-text-color="rgb(255, 255, 255)"
            >
              <div className="k7-wrap">
                <div className="k7-txt">
                  <span className="k7-tag">Pocket & Travel Sets</span>
                  <div className="k7-head-wrap">
                    <span className="k7-float k7-tilt" role="img" aria-label="Crystal">💎</span>
                    <h1>Pocket Protection Pack</h1>
                  </div>
                  <h2 className="k7-lead">Small crystal bundles for daily stress reduction and numbness support.</h2>
                  <p>Pocket Protection Pack. Irresistible on-the-go support for stress and tingling!</p>
                  <button
                    type="button"
                    className="k7-btn k7-hover k7-pull"
                    onClick={() => { triggerConfetti(); scrollTo("k7-b2"); }}
                  >
                    Azure Calm! 🌊
                  </button>
                </div>
                <div className="k7-img">
                  <video src={POCKET_PROTECTION_VIDEO_URL} autoPlay muted loop playsInline role="img" aria-label="Pocket Protection Pack" />
                </div>
              </div>
            </div>
            <div
              className="k7-pane k7-cell"
              id="k7-b2"
              data-ui-color="rgb(142, 199, 218)"
              data-ui-text-color="rgb(255, 255, 255)"
            >
              <div className="k7-wrap">
                <div className="k7-txt">
                  <span className="k7-tag">Pocket & Travel Sets</span>
                  <div className="k7-head-wrap">
                    <span className="k7-float k7-tilt" role="img" aria-label="Wave">🌊</span>
                    <h1>Azure Calm Kit</h1>
                  </div>
                  <h2 className="k7-lead">Blue lace agate + sodalite for migraines, headaches, neck tension.</h2>
                  <p>Azure Calm Kit. Your go-to for head and neck relief—cool, calming frequencies.</p>
                  <button
                    type="button"
                    className="k7-btn k7-hover k7-pull"
                    onClick={() => { triggerConfetti(); scrollTo("k7-b3"); }}
                  >
                    Mystic Sleep! 🌙
                  </button>
                </div>
                <div className="k7-img">
                  <img src={IMG("products/azure_crunch.webp")} alt="Azure Crunch" />
                </div>
              </div>
            </div>
            <div
              className="k7-pane k7-cell"
              id="k7-b3"
              data-ui-color="rgb(186, 173, 217)"
              data-ui-text-color="rgb(255, 255, 255)"
            >
              <div className="k7-wrap">
                <div className="k7-txt">
                  <span className="k7-tag">Pocket & Travel Sets</span>
                  <div className="k7-head-wrap">
                    <span className="k7-float k7-tilt" role="img" aria-label="Crystal">🔮</span>
                    <h1>Mystic Sleep Blend</h1>
                  </div>
                  <h2 className="k7-lead">Amethyst + moonstone for headache relief and nervous system reset.</h2>
                  <p>Mystic Sleep Blend. An enchanting blend for rest and headache relief.</p>
                  <button
                    type="button"
                    className="k7-btn k7-hover k7-pull"
                    onClick={() => { triggerConfetti(); scrollTo("k7-block-c"); }}
                  >
                    Deep Healing! 🌿
                  </button>
                </div>
                <div className="k7-img">
                  <img src={IMG("products/crispy_munchies.webp")} alt="Mystic Dream" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Food Wet */}
        <section
          className="k7-pane k7-strip"
          id="k7-block-c"
          data-ui-color="rgb(255, 31, 26)"
          data-ui-text-color="rgb(255, 255, 255)"
        >
          <div className="k7-strip-inner">
            <div
              className="k7-pane k7-cell"
              id="k7-c1"
              data-ui-color="rgb(255, 31, 26)"
              data-ui-text-color="rgb(255, 255, 255)"
            >
              <div className="k7-wrap">
                <div className="k7-txt">
                  <span className="k7-tag">Cleansing Love Life</span>
                  <div className="k7-head-wrap">
                    <span className="k7-float k7-tilt" role="img" aria-label="Ritual">✨</span>
                    <h1>Cleansing Love Life Ritual</h1>
                  </div>
                  <h2 className="k7-lead">Clear heavy, stuck, or painful patterns in your love life so new, healthy connection can flow in.</h2>
                  <p>
                    Celine&apos;s gift is tuning into where old hurt, betrayal, or disappointment is still sitting in your energy field
                    and gently lifting it away. During this ritual she combines crystals, focused intention, and spoken prayer over your
                    situation to cleanse negative cords, soften heartbreak, and invite in loving, reciprocal energy—something her clients
                    repeatedly report feeling within days of the session.
                  </p>
                  <button
                    type="button"
                    className="k7-btn k7-hover k7-pull"
                    onClick={() => { triggerConfetti(); scrollTo("regal-morsels"); }}
                  >
                    Cleanse My Love Life 💗
                  </button>
                </div>
                <div className="k7-img">
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
              className="k7-pane k7-cell"
              id="k7-c2"
              data-ui-color="rgb(216, 135, 154)"
              data-ui-text-color="rgb(255,255,255)"
            >
              <div className="k7-wrap">
                <div className="k7-txt">
                  <span className="k7-tag">Cleansing Love Life</span>
                  <div className="k7-head-wrap">
                    <span className="k7-float k7-tilt" role="img" aria-label="Crown">👑</span>
                    <h1>Reconnecting With a Loved One</h1>
                  </div>
                  <h2 className="k7-lead">A focused ritual to help reopen the path to a past lover or missed connection that is still meant to be in your life.</h2>
                  <p>
                    In this work, Celine reads the true energetic story between you and the other person—where communication broke,
                    where pride, fear, or interference tangled the bond—and then begins clearing those blocks on a soul level.
                    Clients have seen former partners, long-distance loves, and almost-relationships reach back out after Celine has
                    worked on their case, because she is able to soften resistance, heal old misunderstandings, and energetically
                    nudge both hearts back into alignment when the connection is still divinely guided.
                  </p>
                  <button
                    type="button"
                    className="k7-btn k7-hover k7-pull"
                    onClick={() => { triggerConfetti(); scrollTo("k7-block-d"); }}
                  >
                    Help Me Reconnect 🤍
                  </button>
                </div>
                <div className="k7-img">
                  <img src={IMG("products/regal_morsels.webp")} alt="Regal Morsels" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Groom */}
        <section
          className="k7-pane k7-strip"
          id="k7-block-d"
          data-ui-color="rgb(221, 213, 204)"
          data-ui-text-color="rgb(37, 35, 36)"
        >
          <div className="k7-strip-inner">
            <div
              className="k7-pane k7-cell"
              id="k7-d1"
              data-ui-color="rgb(221, 213, 204)"
              data-ui-text-color="rgb(37, 35, 36)"
            >
              <div className="k7-wrap">
                <div className="k7-txt">
                  <span className="k7-tag">Readings</span>
                  <div className="k7-head-wrap">
                    <span className="k7-float k7-tilt" role="img" aria-label="Intuition">🔮</span>
                    <h1>Readings With Celine</h1>
                  </div>
                  <h2 className="k7-lead">Palm readings, astrology chart readings, and psychic readings to illuminate your path and relationships.</h2>
                  <p>
                    Celine uses her clairvoyant gift to read the lines of your palm, the placements in your birth chart, and the images she
                    receives psychically to reveal what is really happening beneath the surface. These readings can bring clarity around love,
                    timing, career direction, and hidden blocks—often confirming what you&apos;ve secretly felt and pointing to concrete next
                    steps. Many clients leave with renewed confidence, emotional relief, and practical insight they can immediately apply in
                    their love life and personal journey.
                  </p>
                  <button
                    type="button"
                    className="k7-btn k7-hover k7-pull"
                    onClick={() => {
                      triggerConfetti();
                      scrollTo("k7-a2");
                    }}
                  >
                    Book a Reading ✨
                  </button>
                </div>
                <div className="k7-img">
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
              className="k7-pane k7-cell"
              id="k7-d2"
              data-ui-color="rgb(166, 194, 213)"
              data-ui-text-color="rgb(255, 255, 255)"
            >
              <div className="k7-wrap">
                <div className="k7-txt">
                  <span className="k7-tag">Energy Cleansing Services</span>
                  <div className="k7-head-wrap">
                    <span className="k7-float k7-tilt" role="img" aria-label="Mist">❄️</span>
                    <h1>Crystal Water Infusion Therapy</h1>
                  </div>
                  <h2 className="k7-lead">Vibrational mist therapy for migraines, headaches, sinus pressure.</h2>
                  <p>Crystal Water Infusion Therapy. Refreshing crystal-infused mists for head and sinus relief.</p>
                  <button
                    type="button"
                    className="k7-btn k7-hover k7-pull"
                    onClick={() => { triggerConfetti(); scrollTo("k7-d3"); }}
                  >
                    Shadow Release! 💜
                  </button>
                </div>
                <div className="k7-img">
                  <img src={IMG("products/aqua_mists.webp")} alt="Aqua Mists" />
                </div>
              </div>
            </div>
            <div
              className="k7-pane k7-cell"
              id="k7-d3"
              data-ui-color="rgb(191, 84, 235)"
              data-ui-text-color="rgb(255, 255, 255)"
            >
              <div className="k7-wrap">
                <div className="k7-txt">
                  <span className="k7-tag">Energy Cleansing Services</span>
                  <div className="k7-head-wrap">
                    <span className="k7-float k7-tilt" role="img" aria-label="Galaxy">🌌</span>
                    <h1>Shadow Release Clearing</h1>
                  </div>
                  <h2 className="k7-lead">Trauma-based tension release (shoulders, neck, joints).</h2>
                  <p>Shadow Release Clearing. A dreamy blend for deep tension and trauma release.</p>
                  <button
                    type="button"
                    className="k7-btn k7-hover k7-pull"
                    onClick={() => { triggerConfetti(); scrollTo("k7-d4"); }}
                  >
                    Solar Vitality! ☀️
                  </button>
                </div>
                <div className="k7-img">
                  <img src={IMG("products/eclipse_haze.webp")} alt="Eclipse Haze" />
                </div>
              </div>
            </div>
            <div
              className="k7-pane k7-cell"
              id="k7-d4"
              data-ui-color="rgb(248, 200, 12)"
              data-ui-text-color="rgb(255, 255, 255)"
            >
              <div className="k7-wrap">
                <div className="k7-txt">
                  <span className="k7-tag">Energy Cleansing Services</span>
                  <div className="k7-head-wrap">
                    <span className="k7-float k7-tilt" role="img" aria-label="Sun">☀️</span>
                    <h1>Solar Vitality Activation</h1>
                  </div>
                  <h2 className="k7-lead">Energy boost for circulation, stiffness, chronic fatigue.</h2>
                  <p>Solar Vitality Activation. Bursting with revitalizing energy for circulation and vitality.</p>
                  <button
                    type="button"
                    className="k7-btn k7-hover k7-pull"
                    onClick={() => { triggerConfetti(); scrollTo("k7-block-e"); }}
                  >
                    Vital Energy! 💪
                  </button>
                </div>
                <div className="k7-img">
                  <img src={IMG("products/solar_flare.webp")} alt="Solar Flare" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Health */}
        <section
          className="k7-pane k7-strip"
          id="k7-block-e"
          data-ui-color="rgb(255, 231, 134)"
          data-ui-text-color="rgb(0, 0, 0)"
        >
          <div className="k7-strip-inner">
            <div
              className="k7-pane k7-cell"
              id="k7-e1"
              data-ui-color="rgb(255, 231, 134)"
              data-ui-text-color="rgb(0, 0, 0)"
            >
              <div className="k7-wrap">
                <div className="k7-txt">
                  <span className="k7-tag">Health</span>
                  <div className="k7-head-wrap">
                    <span className="k7-float k7-tilt" role="img" aria-label="Energy">💪</span>
                    <h1>Vital Energy Infusions</h1>
                  </div>
                  <h2 className="k7-lead">Crystal-guided sessions targeting:</h2>
                  <p>Shoulder & joint pain · Elbow inflammation · Numbness & tingling · Migraines & tension headaches · Stress-related muscle locking.</p>
                  <button
                    type="button"
                    className="k7-btn k7-hover k7-pull"
                    onClick={() => { triggerConfetti(); scrollTo("k7-e2"); }}
                  >
                    Sunbeam Radiance! 🌟
                  </button>
                </div>
                <div className="k7-img">
                  <video src={CRYSTAL_VIDEO_URL} autoPlay muted loop playsInline role="img" aria-label="Crystals" />
                </div>
              </div>
            </div>
            <div
              className="k7-pane k7-cell"
              id="k7-e2"
              data-ui-color="rgb(255, 231, 134)"
              data-ui-text-color="rgb(0,0,0)"
            >
              <div className="k7-wrap">
                <div className="k7-txt">
                  <span className="k7-tag">Health</span>
                  <div className="k7-head-wrap">
                    <span className="k7-float k7-tilt" role="img" aria-label="Sun">🌞</span>
                    <h1>Sunbeam Radiance Healing</h1>
                  </div>
                  <h2 className="k7-lead">Full-body psychic energy alignment session.</h2>
                  <p>Sunbeam Radiance Healing. A full-body session that supports circulation, vitality, and energetic balance.</p>
                  <button
                    type="button"
                    className="k7-btn k7-hover k7-pull"
                    onClick={() => { triggerConfetti(); scrollTo("k7-block-f"); }}
                  >
                    Who Are We? 🔮
                  </button>
                </div>
                <div className="k7-img">
                  <img src={IMG("products/sunbeam_radiance.webp")} alt="Sunbeam Radiance" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section
          className="k7-pane"
          id="k7-block-f"
          data-ui-color="rgb(137, 191, 222)"
          data-ui-text-color="rgb(255, 255, 255)"
        >
          <div className="k7-wrap">
            <div className="k7-txt">
              <span className="k7-tag">What We Do</span>
              <h1>Our Offerings</h1>
              <h2 className="k7-lead">Crystal therapy, energy cleansing, and psychic healing.</h2>
              <p>From crystal sets to aura sessions, we&apos;ve got everything to support your pain relief and spiritual wellness!</p>
              <div className="k7-pills">
                <button
                  type="button"
                  className="k7-pill k7-hover k7-pull"
                  onClick={() => openModal("Crystal Therapy", "k7-ct-1", "🔮")}
                  aria-label="Crystal Therapy"
                >
                  Crystal Therapy 🔮
                </button>
                <button
                  type="button"
                  className="k7-pill k7-hover k7-pull"
                  onClick={() => openModal("Energy Cleansing", "k7-ct-2", "🌊")}
                  aria-label="Energy Cleansing"
                >
                  Energy Cleansing 🌊
                </button>
                <button
                  type="button"
                  className="k7-pill k7-hover k7-pull"
                  onClick={() => openModal("Psychic Healing", "content-psychic-healing", "✨")}
                  aria-label="Psychic Healing"
                >
                  Psychic Healing ✨
                </button>
              </div>
              <br />
              <button
                type="button"
                className="k7-btn k7-hover k7-pull"
                onClick={() => { triggerConfetti(); scrollTo("k7-block-g"); }}
              >
                Grab a Bargain! 🏷️
              </button>
            </div>
            <div className="k7-img">
              <video src={CRYSTAL_VIDEO_URL} autoPlay muted loop playsInline role="img" aria-label="Crystals" />
            </div>
          </div>
        </section>

        {/* Promos */}
        <section
          className="k7-pane"
          id="k7-block-g"
          data-ui-color="rgb(213, 135, 155)"
          data-ui-text-color="rgb(255, 255, 255)"
        >
          <div className="k7-wrap">
            <div className="k7-txt">
              <span className="k7-tag">Promos</span>
              <div className="k7-head-wrap">
                <span className="k7-float k7-tilt" role="img" aria-label="Gift">🎁</span>
                <h1>Special Offers!</h1>
              </div>
              <h2 className="k7-lead">Heal Without Breaking the Bank!</h2>
              <p>First Session Discount · Free Mini Aura Scan · Buy 2 Crystal Sets, Get 1 Aura Spray Free · Migraine Relief Bundle Special. Confetti on booking confirmation, bundle purchase, and email signup!</p>
              <button
                type="button"
                className="k7-btn k7-hover k7-pull"
                onClick={() => { triggerConfetti(); scrollTo("k7-block-h"); }}
              >
                Shop Deals 🛍️
              </button>
            </div>
            <div className="k7-img">
              <video src={CRYSTAL_VIDEO_URL} autoPlay muted loop playsInline role="img" aria-label="Crystals" />
            </div>
          </div>
        </section>

        {/* Mission */}
        <section
          className="k7-pane"
          id="k7-block-h"
          data-ui-color="rgb(23, 155, 17)"
          data-ui-text-color="rgb(255, 255, 255)"
        >
          <div className="k7-wrap">
            <div className="k7-txt">
              <span className="k7-tag">Our Goal</span>
              <h1>Mission</h1>
              <h2 className="k7-lead">Authentic healing, people-first energy.</h2>
              <p>We believe physical discomfort often begins as energetic imbalance. Our mission is to restore harmony through crystal therapy, psychic insight, and frequency-based care.</p>
              <div className="k7-pills">
                <button
                  type="button"
                  className="k7-pill k7-hover k7-pull"
                  onClick={() => openModal("Authentic Healing", "k7-ct-7", "🌟")}
                  aria-label="Authentic Healing"
                >
                  Authentic Healing 🌟
                </button>
                <button
                  type="button"
                  className="k7-pill k7-hover k7-pull"
                  onClick={() => openModal("People First Energy", "k7-ct-8", "💜")}
                  aria-label="People First Energy"
                >
                  People First Energy 💜
                </button>
              </div>
              <br />
              <button
                type="button"
                className="k7-btn k7-hover k7-pull"
                onClick={() => { triggerConfetti(); scrollTo("k7-block-j"); }}
              >
                About Project 🔮
              </button>
            </div>
            <div className="k7-img">
              <video src={CRYSTAL_VIDEO_URL} autoPlay muted loop playsInline role="img" aria-label="Crystals" />
            </div>
          </div>
        </section>

        {/* About Project */}
        <section
          className="k7-pane"
          id="k7-block-j"
          data-ui-color="rgb(255, 39, 104)"
          data-ui-text-color="rgb(255, 255, 255)"
        >
          <div className="k7-wrap">
            <div className="k7-txt">
              <span className="k7-tag">Project Insights</span>
              <h1>About Project</h1>
              <h2 className="k7-lead">Energy flows where attention goes. Tension stores in shoulders, joints, and nerves.</h2>
              <p>Holistic support, not medical replacement. Discover the theory and intention behind this crystal &amp; psychic healing experience.</p>
              <div className="k7-pills">
                <button
                  type="button"
                  className="k7-pill k7-hover k7-pull"
                  onClick={() => openModal("Intro", "k7-ct-10", "🚀")}
                  aria-label="Intro"
                >
                  Intro 🚀
                </button>
                <button
                  type="button"
                  className="k7-pill k7-hover k7-pull"
                  onClick={() => openModal("Theory", "content-theory", "🧠")}
                  aria-label="Theory"
                >
                  Theory 🧠
                </button>
                <button
                  type="button"
                  className="k7-pill k7-hover k7-pull"
                  onClick={() => openModal("About", "k7-about", "👋")}
                  aria-label="About"
                >
                  About 👋
                </button>
              </div>
              <br />
              <button
                type="button"
                className="k7-btn k7-hover k7-pull"
                onClick={() => { triggerConfetti(); scrollTo("k7-block-k"); }}
              >
                Get in Touch! 📞
              </button>
            </div>
            <div className="k7-img">
              <video src={CRYSTAL_VIDEO_URL} autoPlay muted loop playsInline role="img" aria-label="Crystals" />
            </div>
          </div>
        </section>

        {/* Contact */}
        <section
          className="k7-pane"
          id="k7-block-k"
          data-ui-color="rgb(22, 203, 166)"
          data-ui-text-color="rgb(0,0,0)"
        >
          <div className="k7-wrap">
            <div className="k7-txt">
              <span className="k7-tag">Say Hello</span>
              <h1>Contact Us</h1>
              <h2 className="k7-lead">We&apos;d Love to Hear From You!</h2>
              <p>Reach out to book a session or request a custom grid.</p>
              <div>
                <div className="k7-hover k7-pull" tabIndex={0} role="link">
                  🔮 Book Energy Reading
                </div>
                <div className="k7-hover k7-pull" tabIndex={0} role="link">
                  ✨ Schedule Pain Relief Session
                </div>
                <div className="k7-hover k7-pull" tabIndex={0} role="link">
                  📐 Request Custom Crystal Grid
                </div>
              </div>
              <button
                type="button"
                className="k7-btn k7-hover k7-pull"
                onClick={() => { triggerConfetti(); scrollTo("k7-hero"); }}
                aria-label="Back to top"
              >
                Back to Top 🏁
              </button>
            </div>
            <div className="k7-img">
              <video src={CRYSTAL_VIDEO_URL} autoPlay muted loop playsInline role="img" aria-label="Crystals" />
            </div>
          </div>
        </section>
      </main>

      <div id="k7-modal-store" style={{ display: "none" }} aria-hidden="true">
        <div id="k7-ct-0">
          <div className="grand-reopening-content">
            <div className="grand-reopening-main">
              <h2>Grand Reopening Under Celine</h2>
              <p>
                psychic &amp; rock shop is reopening under Celine&apos;s care as a{" "}
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
        <div id="k7-ct-1">
          <h2>Crystal Therapy</h2>
          <p>
            How crystal frequency may support: joint inflammation, shoulder stiffness,
            migraine frequency, nerve numbness. We work with grounding stones, rose quartz,
            carnelian, smoky quartz, and more to support your body&apos;s natural balance.
          </p>
          <p className="k7-legal">
            <strong>Disclaimer:</strong> These services are spiritual and holistic in nature.
            They are not medical treatments and are not intended to diagnose or cure medical conditions.
            Please consult a licensed healthcare provider for medical concerns.
          </p>
        </div>
        <div id="k7-ct-2">
          <h2>Energy Cleansing</h2>
          <p>
            Aura clearing, trauma tension release, stress detox. Our sessions include
            full aura reading and clearing, crystal water infusion therapy, shadow release
            work, and solar vitality activation to refresh your energy field.
          </p>
          <p className="k7-legal">
            <strong>Disclaimer:</strong> These services are spiritual and holistic in nature.
            They are not medical treatments and are not intended to diagnose or cure medical conditions.
            Please consult a licensed healthcare provider for medical concerns.
          </p>
        </div>
        <div id="k7-ct-3">
          <h2>Psychic Healing</h2>
          <p>
            Intuitive body scan, emotional root identification, guided release work.
            Full-body psychic energy alignment to support shoulder &amp; joint pain, migraines,
            numbness, and stress-related muscle locking.
          </p>
          <p className="k7-legal">
            <strong>Disclaimer:</strong> These services are spiritual and holistic in nature.
            They are not medical treatments and are not intended to diagnose or cure medical conditions.
            Please consult a licensed healthcare provider for medical concerns.
          </p>
        </div>
        <div id="k7-ct-4">
          <h2>Shoulder &amp; Tension Relief</h2>
          <p>
            Crystal layouts and energy work focused on shoulder pain, stress-induced tightness,
            and upper body tension. Rose quartz, blue lace agate, and clearing techniques.
          </p>
          <p className="k7-legal">
            <strong>Disclaimer:</strong> These services are spiritual and holistic in nature.
            They are not medical treatments and are not intended to diagnose or cure medical conditions.
            Please consult a licensed healthcare provider for medical concerns.
          </p>
        </div>
        <div id="k7-ct-5">
          <h2>Migraine &amp; Headache Support</h2>
          <p>
            Azure Calm Kit, Mystic Sleep Blend, and crystal water infusion therapy
            to support headache relief, migraines, and nervous system reset.
          </p>
          <p className="k7-legal">
            <strong>Disclaimer:</strong> These services are spiritual and holistic in nature.
            They are not medical treatments and are not intended to diagnose or cure medical conditions.
            Please consult a licensed healthcare provider for medical concerns.
          </p>
        </div>
        <div id="k7-ct-6">
          <h2>Joint &amp; Circulation Support</h2>
          <p>
            Root alignment stones, crimson vitality grid, and chakra balancing for
            joint discomfort, circulation blocks, elbow pain, and nerve numbness.
          </p>
          <p className="k7-legal">
            <strong>Disclaimer:</strong> These services are spiritual and holistic in nature.
            They are not medical treatments and are not intended to diagnose or cure medical conditions.
            Please consult a licensed healthcare provider for medical concerns.
          </p>
        </div>
        <div id="k7-ct-7">
          <h2>Authentic Healing</h2>
          <p>Safe, ethical, and effective care for your energy and your environment. We use quality crystals and respectful practices.</p>
        </div>
        <div id="k7-ct-8">
          <h2>People First Energy</h2>
          <p>You and your wellbeing come first. Our approach is human-centered and focused on restoring harmony.</p>
        </div>
        <div id="k7-ct-9">
          <h2>Theory</h2>
          <p>
            Energy flows where attention goes. Tension stores in shoulders, joints, and nerves.
            This experience is built on the idea that holistic support can complement your wellness journey.
          </p>
        </div>
        <div id="k7-ct-10">
          <h2>About This Experience</h2>
          <p>
            Holistic support, not medical replacement. We offer crystal therapy, energy cleansing,
            and psychic healing as complementary practices. Always consult a licensed healthcare provider for medical concerns.
          </p>
        </div>
        <div id="k7-about">
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
