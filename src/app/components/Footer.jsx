"use client";

import Link from "next/link";
import { STATIC_ROUTES } from "../site-routes";
import { INPUT_MAX_LENGTHS } from "../lib/inputSecurity";
import {
  Facebook,
  Instagram,
  Linkedin,
  Twitter,
  Youtube,
  Phone,
  Send,
} from "lucide-react";

const CURRENT_YEAR = new Date().getFullYear();
const ORG_NAME = "Mission 007 NFP";
const ORG_PHONE = "708-940-2883";

/** Social links – Facebook from search; others add real URLs when available */
const SOCIAL_LINKS = [
  { name: "Facebook", href: "https://www.facebook.com/Mission007Mentorship", Icon: Facebook },
  { name: "X (Twitter)", href: "#", Icon: Twitter },
  { name: "Instagram", href: "#", Icon: Instagram },
  { name: "LinkedIn", href: "#", Icon: Linkedin },
  { name: "YouTube", href: "#", Icon: Youtube },
];

export default function Footer() {
  return (
    <div className="pg-footer">
      <footer className="pg-footer__footer" role="contentinfo">
        <svg
          className="pg-footer__wave-svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
          aria-hidden
        >
          <path
            className="pg-footer__wave-path"
            d="M851.8,100c125,0,288.3-45,348.2-64V0H0v44c3.7-1,7.3-1.9,11-2.9C80.7,22,151.7,10.8,223.5,6.3C276.7,2.9,330,4,383,9.8 c52.2,5.7,103.3,16.2,153.4,32.8C623.9,71.3,726.8,100,851.8,100z"
          />
        </svg>
        <div className="pg-footer__content">
          <div className="pg-footer__content-column">
            <div className="pg-footer__logo">
              <Link className="pg-footer__logo-link" href="/">
                <span className="pg-footer__hidden-text">Home</span>
                <img
                  src="https://dl4.pushbulletusercontent2.com/dGLvQNacaSYF4R560iIwxmyBlN0xWAat/IMG_0937.jpg"
                  alt="Mission 007 NFP"
                  width={120}
                  height={48}
                  className="pg-footer__logo-img"
                />
              </Link>
            </div>
            <nav className="pg-footer__menu" aria-label="Explore">
              <h2 className="pg-footer__menu-name">Explore</h2>
              <ul className="pg-footer__menu-list">
                {STATIC_ROUTES.map(({ path, label }) => (
                  <li key={path || "home"}>
                    <Link href={path ? `/${path}` : "/"} className="pg-footer__link">
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
          <div className="pg-footer__content-column">
            <div className="pg-footer__menu">
              <h2 className="pg-footer__menu-name">Quick Links</h2>
              <ul className="pg-footer__menu-list">
                <li>
                  <Link href="/blog" className="pg-footer__link">Blog</Link>
                </li>
                <li>
                  <Link href="/photogallery" className="pg-footer__link">Photo Gallery</Link>
                </li>
                <li>
                  <Link href="/learn-where-to-start" className="pg-footer__link">Learn Where to Start</Link>
                </li>
                <li>
                  <Link href="/about-us" className="pg-footer__link">About Us</Link>
                </li>
              </ul>
            </div>
            <div className="pg-footer__menu">
              <h2 className="pg-footer__menu-name">Legal</h2>
              <ul className="pg-footer__menu-list">
                <li>
                  <a href="#" className="pg-footer__link">Privacy Notice</a>
                </li>
                <li>
                  <a href="#" className="pg-footer__link">Terms of Use</a>
                </li>
              </ul>
            </div>
          </div>
          <div className="pg-footer__content-column">
            <div className="pg-footer__cta">
              <h2 className="pg-footer__cta-title">Get in Touch</h2>
              <p className="pg-footer__cta-description">
                Have a question or want to get involved?
              </p>
              <Link
                className="pg-footer__cta-button"
                href="/how-you-can-help"
              >
                Contact Us
              </Link>
            </div>
            <div className="pg-footer__cta">
              <h2 className="pg-footer__cta-title">Call Us</h2>
              <p className="pg-footer__cta-link-wrapper">
                <a
                  className="pg-footer__cta-link"
                  href={`tel:${ORG_PHONE.replace(/\D/g, "")}`}
                >
                  <Phone size={16} aria-hidden />
                  {ORG_PHONE}
                </a>
              </p>
            </div>
          </div>
          <div id="contact" className="pg-footer__social-track">
            <div className="pg-footer__social">
              {SOCIAL_LINKS.map(({ name, href, Icon }) => (
                <a
                  key={name}
                  className="pg-footer__social-link"
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                >
                  <Icon size={22} strokeWidth={1.8} aria-hidden />
                </a>
              ))}
            </div>
            <div className="pg-footer__message">
              <label htmlFor="pg-footer-message" className="pg-footer__message-label">
                Leave us a message.
              </label>
              <form
                className="pg-footer__message-form"
                onSubmit={(e) => e.preventDefault()}
                aria-label="Leave us a message"
              >
                <div className="pg-footer__message-row">
                  <input
                    id="pg-footer-message"
                    type="text"
                    className="pg-footer__message-input"
                    placeholder="Type a short message…"
                    aria-label="Leave us a message"
                    maxLength={INPUT_MAX_LENGTHS.shortMessage}
                    autoComplete="off"
                  />
                  <button
                    type="submit"
                    className="pg-footer__message-submit"
                    aria-label="Send message"
                    title="Send message"
                  >
                    <Send size={18} strokeWidth={2} aria-hidden />
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="pg-footer__copyright">
          <div className="pg-footer__copyright-inner">
            <p className="pg-footer__copyright-text">
              &copy; {CURRENT_YEAR} {ORG_NAME}. All rights reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
