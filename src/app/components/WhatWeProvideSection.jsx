"use client";

import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

const IMAGES = [
  {
    src: "https://dl4.pushbulletusercontent2.com/bKZLH9qUHSbcMgL3TpoDWv6J7GdMcuHK/image.png",
    alt: "Service 2",
  },
  {
    src: "https://dl4.pushbulletusercontent2.com/kAHMs1AaqTnU3TxzyRWiVsvVBqLeJh6M/IMG_2231.JPG",
    alt: "Service 1",
    style: { filter: "brightness(1.52) saturate(1.32) contrast(1.162)" },
  },
];

export default function WhatWeProvideSection() {
  return (
    <div className="what-we-provide-section">
      <div className="what-we-provide-mobile" aria-label="What we provide">
        <Splide
          options={{
            type: "loop",
            perPage: 1,
            perMove: 1,
            arrows: true,
            pagination: true,
            autoplay: false,
            gap: 0,
          }}
          className="what-we-provide-splide"
        >
          {IMAGES.map((img, i) => (
            <SplideSlide key={i}>
              <div className="what-we-provide-slide">
                <img src={img.src} alt={img.alt} style={img.style} />
              </div>
            </SplideSlide>
          ))}
        </Splide>
      </div>
      <div className="what-we-provide-desktop">
        <div className="unique-cta-grid unique-cta-reverse">
          <div className="unique-cta-images">
            {IMAGES.map((img, i) => (
              <img
                key={i}
                src={img.src}
                alt={img.alt}
                style={img.style || undefined}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
