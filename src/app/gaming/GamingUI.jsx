"use client";

import { useEffect, useRef, useState } from "react";
import clsx from "clsx";
import { Search, ChevronDown, ArrowLeft, Ellipsis, Gift, MessageCircle, X, Heart, Plus, Menu, ShoppingCart, Wine, Salad, Sandwich, Flame, Fish, UtensilsCrossed } from "lucide-react";
import "swiper/css";
import gsap from "gsap";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  menuItems1,
  menuItems2,
  menuItems3,
  mainSliderItems,
  HERO_SLIDE_IMAGES,
  HERO_SLIDE_CONTENT,
  ASSETS,
  supportAgent,
  supportThread,
  supportQuickReplies,
} from "./data";
import { menuCategories, menuItems, priceFilterOptions } from "./brickstone-menu";

function IconInfo({ className }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M32 8a24 24 0 1 1 0 48 24 24 0 0 1 0-48zm0 8a4 4 0 0 0-4 4v20a4 4 0 0 0 8 0V20a4 4 0 0 0-4-4zm0 28a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" fill="url(#infoGrad)" />
      <defs>
        <linearGradient id="infoGrad" x1="32" y1="0" x2="32" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E4A704" />
          <stop offset="1" stopColor="#FD7B00" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function IconChat({ className }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M19.416 7.143C12.974 7.143 7.734 12.698 7.734 19.528C7.734 26.358 12.974 31.914 19.416 31.914C25.857 31.914 31.098 26.358 31.098 19.528C31.098 12.698 25.857 7.143 19.416 7.143Z" fill="url(#chatGrad1)" />
      <path d="M46.468 32.17H45.498C40.98 32.17 36.858 33.887 33.745 36.702C34.524 37.3 35.265 37.951 35.968 38.654C38.04 40.726 39.668 43.141 40.805 45.831C41.83 48.254 42.415 50.806 42.551 53.435H64V49.701C64 40.035 56.135 32.17 46.468 32.17Z" fill="url(#chatGrad2)" />
      <defs>
        <linearGradient id="chatGrad1" x1="19.416" y1="7.143" x2="19.416" y2="31.914" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E5A705" />
          <stop offset="1" stopColor="#FD7C00" />
        </linearGradient>
        <linearGradient id="chatGrad2" x1="48.872" y1="32.17" x2="48.872" y2="53.435" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E5A705" />
          <stop offset="1" stopColor="#FD7C00" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function IconDollar({ className }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M40.9 29.07C38.39 27.68 35.72 26.63 33.08 25.53C31.54 24.9 30.08 24.16 28.78 23.12C26.23 21.09 26.72 17.78 29.71 16.48C30.55 16.11 31.44 15.99 32.34 15.93C35.8 15.75 39.09 16.38 42.22 17.89C43.78 18.64 44.3 18.41 44.83 16.78C45.38 15.06 45.84 13.32 46.36 11.59C46.7 10.42 46.28 9.66 45.18 9.17C43.17 8.28 41.11 7.65 38.94 7.3C36.12 6.87 36.12 6.85 36.1 4.01C36.09 0.006 36.09 0.006 32.07 0.006C31.49 0.006 30.91 -0.007 30.33 0.006C28.45 0.06 28.13 0.39 28.08 2.28C28.05 3.13 28.08 3.97 28.07 4.83C28.05 7.34 28.04 7.3 25.63 8.17C19.82 10.29 16.22 14.26 15.84 20.6C15.5 26.22 18.43 30.01 23.04 32.77C25.89 34.48 29.03 35.48 32.04 36.82C33.22 37.33 34.34 37.93 35.32 38.75C38.22 41.14 37.69 45.12 34.25 46.63C32.41 47.43 30.47 47.63 28.48 47.38C25.4 47 22.45 46.19 19.67 44.75C18.05 43.9 17.57 44.13 17.02 45.89C16.54 47.41 16.12 48.94 15.69 50.47C15.13 52.53 15.34 53.02 17.31 53.99C19.82 55.2 22.5 55.83 25.24 56.26C27.38 56.61 27.44 56.7 27.47 58.92C27.48 59.92 27.48 60.94 27.5 61.95C27.51 63.21 28.12 63.96 29.43 63.98C30.91 64.01 32.4 64.01 33.88 63.97C35.1 63.94 35.72 63.28 35.72 62.05C35.72 60.68 35.79 59.29 35.73 57.91C35.67 56.51 36.27 55.8 37.62 55.43C40.73 54.58 43.37 52.92 45.41 50.43C51.07 43.56 48.91 33.5 40.9 29.07Z" fill="url(#dollarGrad)" />
      <defs>
        <linearGradient id="dollarGrad" x1="32" y1="0" x2="32" y2="64" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E5A804" />
          <stop offset="1" stopColor="#FE7B01" />
        </linearGradient>
      </defs>
    </svg>
  );
}

function IconPlus({ className }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M58.375 26.375H37.625V5.625C37.625 2.518 35.107 0 32 0C28.893 0 26.375 2.518 26.375 5.625V26.375H5.625C2.518 26.375 0 28.893 0 32C0 35.107 2.518 37.625 5.625 37.625H26.375V58.375C26.375 61.482 28.893 64 32 64C35.107 64 37.625 61.482 37.625 58.375V37.625H58.375C61.482 37.625 64 35.107 64 32C64 28.893 61.482 26.375 58.375 26.375Z" fill="currentColor" />
    </svg>
  );
}

function IconLogout({ className }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4M16 17l5-5-5-5M21 12H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function IconBell({ className }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M57.05 45.1C53.02 41.69 50.71 36.71 50.71 31.43V24C50.71 14.62 43.74 6.85 34.71 5.55V2.67C34.71 1.19 33.51 0 32.04 0C30.57 0 29.38 1.19 29.38 2.67V5.55C20.34 6.85 13.38 14.62 13.38 24V31.43C13.38 36.71 11.06 41.69 7.01 45.12C5.97 46.01 5.38 47.3 5.38 48.67C5.38 51.24 7.47 53.33 10.04 53.33H54.04C56.62 53.33 58.71 51.24 58.71 48.67C58.71 47.3 58.11 46.01 57.05 45.1Z" fill="currentColor" />
      <path d="M32.04 64C36.87 64 40.91 60.56 41.84 56H22.24C23.17 60.56 27.21 64 32.04 64Z" fill="currentColor" />
    </svg>
  );
}

function IconSend({ className }) {
  return (
    <svg className={className} viewBox="0 0 128 128" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M118.656 13.575C104.815 44.78 87.818 95.719 76.881 118.099C75.425 121.079 71.482 120.398 70.77 117.155L60.472 70.226C60.159 68.802 59.064 67.685 57.655 67.353L14.906 57.294C11.352 56.458 10.945 51.519 14.312 50.102L113.628 8.303C116.84 6.951 120.078 10.37 118.656 13.575Z" fill="url(#sendGrad)" />
      <defs>
        <linearGradient id="sendGrad" x1="65.5" y1="8" x2="65.5" y2="120" gradientUnits="userSpaceOnUse">
          <stop stopColor="#E4A604" />
          <stop offset="1" stopColor="#FE7A00" />
        </linearGradient>
      </defs>
    </svg>
  );
}

const SIDEBAR_NAV_ICONS = [Menu, ShoppingCart, Wine];
const SIDEBAR_CATEGORY_ICONS = [Salad, Sandwich, Flame, Fish, UtensilsCrossed];

function GamingNav() {
  return (
    <header className="gaming-nav">
      <div className="gaming-nav-inner">
        <div className="gaming-nav-left">
          <Link href="/" className="gaming-nav-logo" aria-label="Brickstone Brewery home">
            <span className="gaming-nav-logo-text">Brickstone</span>
          </Link>
          <div className="gaming-nav-rewards">
            <div className="gaming-nav-rewards-icon">
              <Gift />
            </div>
            <div className="gaming-nav-rewards-text">
              <strong>Rewards</strong>
              <span>Weekly Bonus awaits!</span>
            </div>
          </div>
          <div className="gaming-nav-lang-back">
            <div className="gaming-nav-lang">
              <span className="gaming-nav-lang-label">EN</span>
              <ChevronDown />
            </div>
            <button type="button" className="gaming-nav-back" aria-label="Back">
              <ArrowLeft />
            </button>
          </div>
        </div>
        <div className="gaming-nav-center">
          <div className="gaming-nav-search-wrap">
            <Search />
            <input type="text" placeholder="Search..." className="gaming-nav-search" aria-label="Search" />
          </div>
          <div className="gaming-nav-bell">
            <IconBell />
            <span className="gaming-nav-bell-dot" aria-hidden />
          </div>
        </div>
        <div className="gaming-nav-right">
          <div className="gaming-nav-wallet">
            <span>$ 7 220,00</span>
            <Link href="/gaming/order" className="gaming-nav-wallet-plus" aria-label="Start an order">
              <IconPlus />
            </Link>
          </div>
          <div className="gaming-nav-profile">
            <div className="gaming-nav-profile-text">
              <div className="gaming-nav-profile-name">Daniel Jhonson</div>
              <div className="gaming-nav-profile-balance">$ 7 430,00</div>
            </div>
            <div className="gaming-nav-profile-avatar">
              <div className="gaming-nav-profile-avatar-inner">
                <img src={`${ASSETS}citzybgj.png`} alt="" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

function SidebarLeft() {
  return (
    <aside className="gaming-sidebar-left">
      <div className="gaming-sidebar-left-top" style={{ backgroundImage: `url(${ASSETS}vjpjftqr.png)` }}>
        <div className="gaming-sidebar-left-top-inner">
          <div className="gaming-sidebar-circ">
            <div className="gaming-sidebar-circ-badge">
              <ChevronDown />
            </div>
            <div className="gaming-sidebar-circ-flag" style={{ backgroundImage: `url(${ASSETS}vxxuslca.png)` }} />
          </div>
          <div className="gaming-sidebar-logout">
            <IconLogout />
          </div>
        </div>
      </div>
      <nav className="gaming-sidebar-nav">
        <div className="gaming-menu-list">
          {menuItems1.map(({ title }, idx) => {
            const Icon = SIDEBAR_NAV_ICONS[idx] || Menu;
            const isActive = idx === 0;
            const isOrderNow = title === "Order Now";
            const Wrapper = isOrderNow ? Link : "div";
            const wrapperProps = isOrderNow ? { href: "/gaming/order" } : {};
            return (
              <Wrapper
                className={clsx("gaming-menu-item", isActive && !isOrderNow && "gaming-menu-item--active")}
                key={idx}
                {...wrapperProps}
              >
                <div className="gaming-menu-item-icon">
                  <Icon className="gaming-menu-item-icon-svg" />
                </div>
                <span className="gaming-menu-item-label">{title}</span>
                <span className="gaming-menu-item-chevron">
                  <ChevronDown />
                </span>
              </Wrapper>
            );
          })}
        </div>
        <div className={clsx("gaming-menu-list", "gaming-menu-list--compact")}>
          {menuItems2.map(({ title }, idx) => {
            const Icon = SIDEBAR_CATEGORY_ICONS[idx] || UtensilsCrossed;
            return (
              <div className="gaming-menu-item" key={idx}>
                <div className="gaming-menu-item-icon">
                  <Icon className="gaming-menu-item-icon-svg" />
                </div>
                <span className="gaming-menu-item-label">{title}</span>
              </div>
            );
          })}
        </div>
        <div className="gaming-other-info">
          <IconInfo />
          <span className="gaming-other-info-title">More</span>
        </div>
        <div className="gaming-other-links">
          {menuItems3.map(({ title }, idx) => (
            <button type="button" key={idx}>{title}</button>
          ))}
        </div>
        <div className="gaming-sidebar-copyright">
          © {new Date().getFullYear()} BrickStone Brewery. All rights reserved.
        </div>
      </nav>
    </aside>
  );
}

function SidebarRight({ isOpen, onClose }) {
  const [messages, setMessages] = useState(supportThread);
  const [inputValue, setInputValue] = useState("");
  const listRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (listRef.current) listRef.current.scrollTop = listRef.current.scrollHeight;
  }, [messages]);

  const sendMessage = (text) => {
    const t = (text || inputValue).trim();
    if (!t) return;
    setMessages((prev) => [...prev, { role: "user", text: t, time: "Just now" }]);
    setInputValue("");
    inputRef.current?.focus();
  };

  const onQuickReply = (label) => {
    sendMessage(label);
  };

  return (
    <aside className={clsx("gaming-chat", isOpen && "gaming-chat--open")} aria-hidden={!isOpen}>
      <div className="gaming-chat-inner">
        <div className="gaming-chat-header">
          <div className="gaming-chat-agent-avatar" style={{ backgroundImage: `url(${ASSETS}${supportAgent.avatar})` }} />
          <div className="gaming-chat-header-left">
            <div className="gaming-chat-title-row">
              <IconChat />
              <span className="gaming-chat-title">Support</span>
            </div>
            <div className="gaming-chat-status">{supportAgent.status}</div>
          </div>
          <button
            type="button"
            className="gaming-chat-close"
            onClick={onClose}
            aria-label="Close chat"
          >
            <X size={20} />
          </button>
        </div>
        <div className="gaming-chat-list" ref={listRef}>
          {messages.map((msg, idx) => (
            <div key={idx} className={clsx("gaming-support-msg", msg.role === "user" && "gaming-support-msg--user")}>
              {msg.role === "agent" && (
                <div className="gaming-support-msg-avatar" style={{ backgroundImage: `url(${ASSETS}${supportAgent.avatar})` }} />
              )}
              <div className="gaming-support-msg-bubble">
                {msg.role === "agent" && <div className="gaming-support-msg-name">{supportAgent.name}</div>}
                <div className="gaming-support-msg-text">{msg.text}</div>
                <div className="gaming-support-msg-time">{msg.time}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="gaming-chat-quick-replies">
          {supportQuickReplies.map((label) => (
            <button
              key={label}
              type="button"
              className="gaming-chat-quick-reply"
              onClick={() => onQuickReply(label)}
            >
              {label}
            </button>
          ))}
        </div>
        <div className="gaming-chat-input-row">
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
            placeholder="Type your message..."
            className="gaming-chat-input"
            aria-label="Type your message"
          />
          <button type="button" className="gaming-chat-send" onClick={() => sendMessage()} aria-label="Send">
            <IconSend />
          </button>
        </div>
      </div>
    </aside>
  );
}

function MainSlider() {
  const router = useRouter();
  const heroRef = useRef(null);
  const sliderParentRef = useRef(null);
  const indexRef = useRef(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    const parent = sliderParentRef.current;
    if (!parent) return;
    const handleClick = (e) => {
      const btn = e.target.closest(".gaming-hero-btn-code, .gaming-hero-btn-sign");
      if (!btn) return;
      const text = (btn.textContent || "").trim();
      if (text === "Order now" || text === "Start order") {
        e.preventDefault();
        router.push("/gaming/order");
      }
    };
    parent.addEventListener("click", handleClick);
    return () => parent.removeEventListener("click", handleClick);
  }, [router]);

  useEffect(() => {
    if (!heroRef.current || !sliderParentRef.current) return;
    const getSlideContent = (slideIdx) => {
      const s = HERO_SLIDE_CONTENT[slideIdx] ?? HERO_SLIDE_CONTENT[0];
      return `
      <div class="gaming-hero-slide-content">
        <div class="gaming-hero-headline">${s.headline}</div>
        <div class="gaming-hero-sub">${s.sub}</div>
        <div class="gaming-hero-btns">
          <div class="gaming-hero-btn-code">
            <div class="gaming-hero-btn-code-inner">
              <span>${s.leftCta}</span>
            </div>
          </div>
          <div class="gaming-hero-btn-sign">
            <span>${s.rightCta}</span>
          </div>
        </div>
      </div>
    `;
    };
    const advance = () => {
      const idx = indexRef.current;
      const nextIdx = (idx + 1) % mainSliderItems.length;
      const currentEl = sliderParentRef.current?.querySelector(`#sl${idx}`);
      if (!currentEl) return;
      const newDiv = document.createElement("div");
      newDiv.className = `gaming-hero-slide newSlide sl${nextIdx}`;
      newDiv.id = `sl${nextIdx}`;
      const imgUrl = HERO_SLIDE_IMAGES[nextIdx];
      const img = document.createElement("img");
      img.src = imgUrl;
      img.alt = "";
      img.className = "gaming-hero-slide-img";
      newDiv.appendChild(img);
      if (nextIdx === 1) {
        const overlay = document.createElement("div");
        overlay.className = "gaming-hero-slide-overlay";
        newDiv.appendChild(overlay);
      }
      newDiv.insertAdjacentHTML("beforeend", getSlideContent(nextIdx));
      sliderParentRef.current?.appendChild(newDiv);
      gsap.to(currentEl, { x: "-102%", opacity: 0, duration: 0.4, onComplete: () => currentEl.remove() });
      gsap.to(newDiv, { x: "0%", opacity: 1, duration: 0.4 });
      const bullets = heroRef.current?.querySelectorAll("[id^='bullet-']");
      bullets?.forEach((b, i) => {
        b.style.transform = i === nextIdx ? "scale(1.3)" : "scale(1)";
        b.style.background = i === nextIdx ? "#ca8a04" : "#27272a";
      });
      const indicator = heroRef.current?.querySelector("#menu-indicator");
      const menuItem = heroRef.current?.querySelector(`#menu_item${nextIdx}`);
      if (indicator && menuItem) {
        const { x } = menuItem.getBoundingClientRect();
        const parentRect = heroRef.current.getBoundingClientRect();
        gsap.to(indicator, { x: x - parentRect.x, width: menuItem.offsetWidth, duration: 0.4 });
      }
      indexRef.current = nextIdx;
    };
    intervalRef.current = setInterval(advance, 3500);
    return () => clearInterval(intervalRef.current);
  }, []);

  return (
    <div className="gaming-hero-wrap">
      <div className="gaming-hero" id="hero" ref={heroRef}>
        <div className="gaming-hero-slider" id="slider-parent" ref={sliderParentRef}>
          <div className="gaming-hero-slide sl0" id="sl0">
            <img
              src={HERO_SLIDE_IMAGES[0]}
              alt=""
              className="gaming-hero-slide-img"
            />
            <div className="gaming-hero-slide-content">
              <div className="gaming-hero-headline">{HERO_SLIDE_CONTENT[0].headline}</div>
              <div className="gaming-hero-sub" dangerouslySetInnerHTML={{ __html: HERO_SLIDE_CONTENT[0].sub }} />
              <div className="gaming-hero-btns">
                <Link href="/gaming/order" className="gaming-hero-btn-code" style={{ textDecoration: "none" }}>
                  <div className="gaming-hero-btn-code-inner">
                    <span>{HERO_SLIDE_CONTENT[0].leftCta}</span>
                  </div>
                </Link>
                <Link href="/gaming/order" className="gaming-hero-btn-sign" style={{ textDecoration: "none" }}>
                  <span>{HERO_SLIDE_CONTENT[0].rightCta}</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
        <svg className="gaming-hero-svg" viewBox="0 0 704 256" fill="none" preserveAspectRatio="xMidYMid slice" aria-hidden>
          <path d="M704 242C704 249.732 697.732 256 690 256H14C6.26802 256 0 249.732 0 242V156C0 170.359 11.6406 182 26 182H678C692.359 182 704 170.359 704 156V242Z" fill="#191821" fillOpacity="0.84" />
        </svg>
        <div className="gaming-hero-bottom">
          <div className="gaming-hero-menu">
            {mainSliderItems.map(({ title }, idx) => (
              <div className="gaming-hero-menu-item" id={`menu_item${idx}`} key={idx}>
                <div className={clsx("gaming-hero-menu-icon", idx === 0 ? "yellow-gradient-1" : "gray-gradient")} id={`menu_icon${idx}`} />
                <span className="gaming-hero-menu-label">{title}</span>
              </div>
            ))}
          </div>
          <div className="gaming-hero-dots">
            {[0, 1, 2, 3].map((idx) => (
              <div
                key={idx}
                className={clsx("gaming-hero-dot", idx === 0 && "gaming-hero-dot--active")}
                id={`bullet-${idx}`}
              />
            ))}
          </div>
        </div>
        <div className="gaming-hero-indicator" id="menu-indicator" aria-hidden />
      </div>
    </div>
  );
}

function StoreSection() {
  const [fav, setFav] = useState(false);
  return (
    <section className="gaming-store-section" aria-label="Store">
      <div className="gaming-store-card">
        <button
          type="button"
          className="gaming-store-fav"
          onClick={() => setFav((p) => !p)}
          aria-label={fav ? "Remove from favorites" : "Add to favorites"}
        >
          <Heart size={20} fill={fav ? "currentColor" : "none"} />
        </button>
        <div className="gaming-store-circle">
          <span style={{ fontSize: "28px", fontWeight: 700, color: "#2F1B1C" }}>B</span>
        </div>
        <h2 className="gaming-store-name">BrickStone Restaurant</h2>
        <p className="gaming-store-meta">Restaurant • Pickup & delivery</p>
      </div>
    </section>
  );
}

function CategoryTabs() {
  const [active, setActive] = useState(0);
  return (
    <div className="gaming-tabs" role="tablist" aria-label="Categories">
      {mainSliderItems.map(({ title }, idx) => (
        <button
          type="button"
          key={idx}
          role="tab"
          aria-selected={idx === active}
          onClick={() => setActive(idx)}
          className={clsx(idx === active && "is-active")}
        >
          {title}
        </button>
      ))}
    </div>
  );
}

function filterByPrice(items, priceValue) {
  if (!priceValue) return items;
  switch (priceValue) {
    case "under15":
      return items.filter((i) => i.basePrice < 15);
    case "15-20":
      return items.filter((i) => i.basePrice >= 15 && i.basePrice <= 20);
    case "20-30":
      return items.filter((i) => i.basePrice >= 20 && i.basePrice <= 30);
    case "30plus":
      return items.filter((i) => i.basePrice > 30);
    default:
      return items;
  }
}

const SEARCH_DEBOUNCE_MS = 350;

/** Levenshtein distance for "did you mean" similarity */
function levenshtein(a, b) {
  const an = a.length;
  const bn = b.length;
  const dp = Array(an + 1)
    .fill(null)
    .map(() => Array(bn + 1).fill(0));
  for (let i = 0; i <= an; i++) dp[i][0] = i;
  for (let j = 0; j <= bn; j++) dp[0][j] = j;
  for (let i = 1; i <= an; i++) {
    for (let j = 1; j <= bn; j++) {
      const cost = a[i - 1].toLowerCase() === b[j - 1].toLowerCase() ? 0 : 1;
      dp[i][j] = Math.min(dp[i - 1][j] + 1, dp[i][j - 1] + 1, dp[i - 1][j - 1] + cost);
    }
  }
  return dp[an][bn];
}

/** Best "did you mean" suggestion from candidates (item names + category names) */
function getDidYouMeanSuggestion(query, candidates) {
  const q = query.trim().toLowerCase();
  if (q.length < 2) return null;
  const seen = new Set();
  let best = null;
  let bestScore = -1;
  for (const original of candidates) {
    const candidate = original.toLowerCase();
    if (candidate === q || seen.has(candidate)) continue;
    seen.add(candidate);
    const dist = levenshtein(q, candidate);
    const len = Math.max(q.length, candidate.length);
    const similarity = 1 - dist / len;
    const startsWith = candidate.startsWith(q) ? 1.5 : 1;
    const contains = candidate.includes(q) ? 1.2 : 1;
    const score = similarity * startsWith * contains;
    if (score > bestScore && similarity >= 0.3) {
      bestScore = score;
      best = original;
    }
  }
  return best;
}

const categoryNameById = Object.fromEntries(menuCategories.map((c) => [c.id, c.name]));

function MenuSection() {
  const [categoryId, setCategoryId] = useState(null);
  const [priceFilter, setPriceFilter] = useState("");
  const [searchInput, setSearchInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const searchInputRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setSearchQuery(searchInput), SEARCH_DEBOUNCE_MS);
    return () => clearTimeout(t);
  }, [searchInput]);

  const filteredByCategory = menuItems.filter((item) => !categoryId || item.categoryId === categoryId);
  const byPrice = filterByPrice(filteredByCategory, priceFilter);
  const searchLower = searchQuery.trim().toLowerCase();
  const filteredBySearch =
    !searchLower.length
      ? byPrice
      : byPrice.filter((item) => {
          const catName = categoryNameById[item.categoryId] || "";
          const name = (item.name || "").toLowerCase();
          const desc = (item.description || "").toLowerCase();
          return name.includes(searchLower) || desc.includes(searchLower) || catName.toLowerCase().includes(searchLower);
        });

  const searchCandidates = [
    ...menuItems.map((i) => i.name),
    ...menuCategories.map((c) => c.name),
  ];
  const didYouMean =
    searchLower.length >= 2 &&
    filteredBySearch.length === 0 &&
    getDidYouMeanSuggestion(searchQuery.trim(), searchCandidates);

  const applyDidYouMean = () => {
    if (didYouMean) {
      setSearchInput(didYouMean);
      setSearchQuery(didYouMean);
    }
  };

  return (
    <section className="gaming-menu-section">
      <div className="gaming-menu-section-header">
        <h2 className="gaming-menu-section-title">BrickStone Menu</h2>
        <div className="gaming-menu-filters">
          <div className="gaming-menu-search-wrap">
            <Search className="gaming-menu-search-icon" size={18} aria-hidden />
            <input
              ref={searchInputRef}
              type="search"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && didYouMean && applyDidYouMean()}
              placeholder="Search menu..."
              className="gaming-menu-search-input"
              aria-label="Search menu"
              autoComplete="off"
            />
            <button
              type="button"
              className="gaming-menu-search-btn"
              onClick={() => searchInputRef.current?.focus()}
              aria-label="Search"
            >
              <Search size={18} aria-hidden />
            </button>
          </div>
          <div className="gaming-menu-category-filters">
            <button
              type="button"
              className={"gaming-menu-cat-btn" + (categoryId === null ? " is-active" : "")}
              onClick={() => setCategoryId(null)}
            >
              All
            </button>
            {menuCategories.map((cat) => (
              <button
                type="button"
                key={cat.id}
                className={"gaming-menu-cat-btn" + (categoryId === cat.id ? " is-active" : "")}
                onClick={() => setCategoryId(cat.id)}
              >
                {cat.name}
              </button>
            ))}
          </div>
          <div className="gaming-menu-price-filter">
            <label htmlFor="gaming-price-select" className="gaming-menu-price-label">
              Price
            </label>
            <select
              id="gaming-price-select"
              value={priceFilter}
              onChange={(e) => setPriceFilter(e.target.value)}
              className="gaming-menu-price-select"
            >
              {priceFilterOptions.map((opt) => (
                <option key={opt.value || "all"} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
          </div>
        </div>
        {didYouMean && (
          <p className="gaming-menu-did-you-mean">
            Did you mean:{" "}
            <button type="button" className="gaming-menu-did-you-mean-link" onClick={applyDidYouMean}>
              {didYouMean}
            </button>
            ?
          </p>
        )}
      </div>
      <div className="gaming-menu-grid">
        {filteredBySearch.map((item) => (
          <article key={item.id} className="gaming-menu-card">
            <div
              className="gaming-menu-card-thumb"
              style={{
                background: "var(--bg-page)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "var(--color-meta)",
                fontSize: "24px",
              }}
              aria-hidden
            >
              <span style={{ opacity: 0.4 }}>🍽</span>
            </div>
            <div className="gaming-menu-card-body">
              <div className="gaming-menu-card-header">
                <h3 className="gaming-menu-card-title">{item.name}</h3>
                <span className="gaming-menu-card-price">
                  {item.basePrice === 0 ? "Included" : `$${item.basePrice.toFixed(2)}`}
                </span>
              </div>
              {item.description && (
                <p className="gaming-menu-card-description">{item.description}</p>
              )}
              {item.labels && item.labels.length > 0 && (
                <div className="gaming-menu-card-labels">
                  {item.labels.map((label) => (
                    <span key={label} className="gaming-menu-card-label">
                      {label}
                    </span>
                  ))}
                </div>
              )}
            </div>
            <button type="button" className="gaming-menu-card-add" aria-label={`Add ${item.name} to order`}>
              <Plus size={20} strokeWidth={2.5} />
            </button>
          </article>
        ))}
      </div>
      {filteredBySearch.length === 0 && (
        <p className="gaming-menu-empty">No items match the selected filters.</p>
      )}
    </section>
  );
}

export function GamingUI() {
  const [chatOpen, setChatOpen] = useState(false);

  return (
    <>
      <GamingNav />
      <SidebarLeft />
      <SidebarRight isOpen={chatOpen} onClose={() => setChatOpen(false)} />
      <button
        type="button"
        className="gaming-chat-bubble"
        onClick={() => setChatOpen((prev) => !prev)}
        aria-label={chatOpen ? "Close chat" : "Open chat"}
        aria-expanded={chatOpen}
      >
        <MessageCircle size={24} />
      </button>
      <main className="gaming-main">
        <div className="gaming-main-inner">
          <MainSlider />
          {/* <StoreSection /> */}
          <CategoryTabs />
          <MenuSection />
        </div>
      </main>
    </>
  );
}
