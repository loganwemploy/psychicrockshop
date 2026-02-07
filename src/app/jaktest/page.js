"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import "./jaktest.css";

const PRODUCT_IMAGE_URL = "https://dl4.pushbulletusercontent2.com/upbLM9EhMZyKvT0UcVq0C8TCN9PSkLYX/UR9NRD5Hmtb8po9EuG6REi-1200-80-1160591810-removebg-preview.png";

const initialItems = [
  {
    id: 0,
    batImage: PRODUCT_IMAGE_URL,
    name: ["Classic Comfort"],
    title: ["organic cotton.", "soft everyday grip."],
    description: `Our best-selling grippy socks made from 100% organic cotton. Soft, breathable, and gentle on sensitive skin. Non-slip rubber treads on the sole provide reliable traction on tile, hardwood, and hospital floors. Perfect for everyday wear at home or light mobility support.`,
    video: PRODUCT_IMAGE_URL,
  },
  {
    id: 1,
    batImage: PRODUCT_IMAGE_URL,
    name: ["Hospital Grade"],
    title: ["fall prevention.", "trusted in care."],
    description: `Designed for psychiatric and mental health settings. A 2023 clinical study found zero falls among hospitalized patients wearing non-slip socks. Thick terry cloth with silicone treads, non-binding cuffs for circulation, and durable construction. Trusted by hospitals and care facilities nationwide.`,
    video: PRODUCT_IMAGE_URL,
  },
  {
    id: 2,
    batImage: PRODUCT_IMAGE_URL,
    name: ["Cozy Fuzzy"],
    title: ["chenille warmth.", "extra cushion."],
    description: `Premium chenille and polyester fleece blend for maximum warmth and comfort. Ideal for cold hospital environments or cozy nights at home. The plush interior keeps feet toasty while rubber grips ensure safe footing. Available in a range of colors to suit every preference.`,
    video: PRODUCT_IMAGE_URL,
  },
];

export default function JaktestPage() {
  const [clsArray, setClsArray] = useState(["a", "b"]);
  const [bucket, setBucket] = useState(initialItems);
  const [items, setItems] = useState({
    a: initialItems[initialItems.length - 2],
    b: initialItems[initialItems.length - 1],
  });
  const tickRef = useRef(null);
  const mountedRef = useRef(false);
  const stateRef = useRef({ clsArray, bucket, items });
  stateRef.current = { clsArray, bucket, items };

  const tick = () => {
    const { clsArray: arr } = stateRef.current;
    const [a, b] = arr;
    const tl = gsap.timeline({
      onComplete: () => {
        const { bucket: prevBucket } = stateRef.current;
        const [first, ...rest] = prevBucket;
        setItems((items) => ({ ...items, [a]: first }));
        setBucket([...rest, first]);
        setClsArray([b, a]);
        tickRef.current = setTimeout(tick, 1500);
      },
    });

    tl.to(`.bottle-name-${a}`, { x: "-100vw", duration: 2.5 });
    tl.to(`.bottle-name-${a}`, { x: "100vw", duration: 0 });
    tl.to(`.bottle-name-${b}`, { x: "0vw", duration: 2.5 }, 0);

    tl.to(`.description-container-${a}`, { x: "-10vw", duration: 1.25, opacity: 0 }, 0);
    tl.to(`.description-container-${a}`, { x: "10vw", duration: 0 });
    tl.to(`.description-container-${b}`, { x: "0vw", duration: 1.25, opacity: 1 }, 1);

    tl.to(`.back-text-actual-${a}`, { y: "200vh", duration: 2.5 }, 0);
    tl.to(`.back-text-actual-${a}`, { y: "-200vh", duration: 0 });
    tl.to(`.back-text-actual-${b}`, { y: "0vh", duration: 2.5 }, 0);

    tl.to(`.bottle-${a}`, { rotation: "-=180", duration: 2.5, transformOrigin: "50% bottom" }, 0);
    tl.to(`.bottle-${b}`, { rotation: "-=180", duration: 2.5, transformOrigin: "50% bottom" }, 0);
    tl.set({}, {}, "+=1");
  };

  useEffect(() => {
    if (!mountedRef.current) {
      mountedRef.current = true;
      gsap.set(".bottle-name-b", { x: "100vw" });
      gsap.set(".description-container-b", { x: "10vw", opacity: 0 });
      gsap.set(".back-text-actual-b", { y: "-200vh" });
      gsap.set(".bottle-b", { rotation: 195, transformOrigin: "50% bottom" });
      gsap.set(".bottle-a", { rotation: 15, transformOrigin: "50% bottom" });
      tickRef.current = setTimeout(tick, 1500);
    }
    return () => {
      if (tickRef.current) clearTimeout(tickRef.current);
    };
  }, []);

  const clsStatic = ["a", "b"];

  return (
    <div className="jaktest-page">
      <link
        href="https://fonts.googleapis.com/css2?family=Libre+Baskerville:ital,wght@0,400;0,700;1,400&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900&display=swap"
        rel="stylesheet"
      />
      <div className="jaktest-header">
        <div className="jaktest-header-left">
          <div>Our Socks</div>
          <div>Process</div>
          <div>Our Story</div>
        </div>
        <div className="jaktest-logo-text">Gripjoy</div>
        <div className="jaktest-header-right">
          <div>Hospital</div>
          <div>Everyday</div>
          <div>Custom</div>
        </div>
      </div>

      <div className="jaktest-app">
        <div className="back-text">
          <div className="back-text-inner">
            {clsStatic.map((cls) => (
              <div
                key={cls}
                className={`back-text-actual back-text-actual-${cls}`}
                dangerouslySetInnerHTML={{
                  __html: items[cls]?.name.join(" ") || "",
                }}
              />
            ))}
          </div>
        </div>

        <div className="bottle-name-container">
          <div className="bottle-name-inner">
            {clsStatic.map((cls) => (
              <div
                key={cls}
                className={`bottle-name bottle-name-${cls}`}
                dangerouslySetInnerHTML={{
                  __html: items[cls]?.name.join("<br>") || "",
                }}
              />
            ))}
          </div>
        </div>

        {clsStatic.map((cls) => (
          <div key={cls} className={`bottle bottle-${cls}`}>
            <img className="bottle-img" src={items[cls]?.batImage} alt={items[cls]?.name?.[0]} />
          </div>
        ))}

        {clsStatic.map((cls) => (
          <div key={cls} className={`description-container description-container-${cls}`}>
            <div className="description-title">{items[cls]?.title?.[0]}</div>
            <div className="description-title">{items[cls]?.title?.[1]}</div>
            <div className="description">{items[cls]?.description}</div>
            <button type="button" className="btn-read-more">
              Read more
            </button>
            <div className="video-container">
              <img className="video-img" src={items[cls]?.video} alt="" />
            </div>
          </div>
        ))}

        <div className="nav-container">
          <button type="button" className="arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M15 18l-6-6 6-6" />
            </svg>
          </button>
          {bucket.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`pg-container ${index === 0 ? "pg-container-active" : ""}`}
            >
              <div className="page" />
            </button>
          ))}
          <button type="button" className="arrow">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M9 18l6-6-6-6" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
