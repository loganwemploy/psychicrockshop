"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import styles from "./about-us.module.css";

const DEFAULT_TESTIMONIALS = [
  {
    quote:
      "Mission 007 gave me a space to figure out what I actually want to do. My mentor didn't judge—they just listened and helped me see options I didn't know I had.",
    year: "2025",
    name: "Brian Johnson",
    age: 19,
  },
  {
    quote:
      "I came in not knowing how to talk about my goals. Now I can speak up in groups and I've got a plan for after high school. That confidence is everything.",
    year: "2025",
    name: "Maria Santos",
    age: 17,
  },
  {
    quote:
      "The community here feels real. You're not just another number. They remember your name and what you're working on. That kind of support changes how you see yourself.",
    year: "2025",
    name: "Jordan Williams",
    age: 21,
  },
];

function formatTestimonialAttribution(fullName, age) {
  const parts = fullName.trim().split(/\s+/);
  const first = parts[0] || "";
  const lastInitial =
    parts.length > 1
      ? (parts[parts.length - 1][0] || "").toUpperCase() + "."
      : "";
  return lastInitial ? `${first} ${lastInitial} ${age}` : `${first} ${age}`;
}

export default function TestimonialsCarousel({ testimonials = DEFAULT_TESTIMONIALS }) {
  const list = Array.isArray(testimonials) && testimonials.length > 0 ? testimonials : DEFAULT_TESTIMONIALS;
  return (
    <section className={styles.testimonialsSection} aria-label="Testimonials">
      <h2 className={styles.testimonialsTitle}>What People Are Saying</h2>
      <Splide
          options={{
            type: "loop",
            perPage: 1,
            perMove: 1,
            arrows: true,
            pagination: true,
            autoplay: false,
            gap: "1.5rem",
            padding: "2rem",
            focus: "center",
          }}
        className={styles.testimonialsSplide}
      >
        {list.map((t, i) => (
          <SplideSlide key={i}>
            <div className={styles.testimonialSlide}>
              <p className={styles.testimonialQuote}>{t.quote}</p>
              <div className={styles.testimonialMeta}>
                <span className={styles.testimonialAttribution}>
                  {formatTestimonialAttribution(t.name, t.age != null ? t.age : "")}
                </span>
                <span className={styles.testimonialSeparator} aria-hidden="true" />
                <span className={styles.testimonialYear}>{t.year}</span>
              </div>
            </div>
          </SplideSlide>
        ))}
      </Splide>
    </section>
  );
}
