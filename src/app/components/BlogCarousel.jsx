"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
import BlogCard from "./BlogCard";

export default function BlogCarousel({ posts = [] }) {
  if (!Array.isArray(posts) || posts.length === 0) return null;

  return (
    <section className="blog-carousel-wrap" aria-label="Latest blog posts">
      <Splide
        options={{
          type: "loop",
          perPage: 3,
          perMove: 1,
          arrows: true,
          pagination: false,
          autoplay: false,
          gap: "1.5rem",
          padding: "0.5rem",
          drag: true,
          breakpoints: {
            1024: { perPage: 3 },
            768: { perPage: 2 },
            480: { perPage: 1 },
          },
        }}
        className="blog-carousel-splide"
      >
        {posts.map((post) => (
          <SplideSlide key={post.id}>
            <BlogCard post={post} />
          </SplideSlide>
        ))}
      </Splide>
    </section>
  );
}
