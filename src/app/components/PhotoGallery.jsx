"use client";

import { useState, useEffect, useMemo, useRef } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";

/** Defer work until after first paint and when the browser is idle, so we don't block LCP. Starts within maxWaitMs so gallery loads before the user scrolls to it. */
function runWhenIdle(callback, maxWaitMs = 2000) {
  if (typeof window === "undefined") return () => {};
  if (window.requestIdleCallback) {
    const id = requestIdleCallback(callback, { timeout: maxWaitMs });
    return () => cancelIdleCallback(id);
  }
  const id = setTimeout(callback, 100);
  return () => clearTimeout(id);
}

const BREAKPOINT_TABLET = 900;
const BREAKPOINT_DESKTOP = 1200;

function getChunkSizeForWidth(width) {
  if (width >= BREAKPOINT_DESKTOP) return 8;
  if (width >= BREAKPOINT_TABLET) return 6;
  return 4;
}

function useChunkSize() {
  const [chunkSize, setChunkSize] = useState(() =>
    typeof window !== "undefined"
      ? getChunkSizeForWidth(window.innerWidth)
      : 4
  );
  useEffect(() => {
    function update() {
      setChunkSize(getChunkSizeForWidth(window.innerWidth));
    }
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);
  return chunkSize;
}

function getCurrentYear() {
  if (typeof Temporal !== "undefined" && Temporal.Now?.plainDateISO) {
    return Temporal.Now.plainDateISO().year;
  }
  return new Date().getFullYear();
}

function getYearFilterOptions() {
  const year = getCurrentYear();
  return ["all", String(year), String(year - 1), String(year - 2)];
}

function chunkArray(arr, chunkSize) {
  const chunks = [];
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize));
  }
  return chunks;
}

export default function PhotoGallery() {
  const [photos, setPhotos] = useState([]);
  const [loadedImages, setLoadedImages] = useState({});
  const [activeCards, setActiveCards] = useState({});
  const [activeYear, setActiveYear] = useState("all");
  const chunkSize = useChunkSize();
  const mountedRef = useRef(true);

  const rankCounts = useMemo(() => {
    const counts = {};
    photos.forEach((item) => {
      if (item.rank_order !== null) {
        counts[item.rank_order] = (counts[item.rank_order] || 0) + 1;
      }
    });
    return counts;
  }, [photos]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest(".gallery-item")) {
        setActiveCards({});
      }
    };
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  useEffect(() => {
    mountedRef.current = true;
    const cancel = runWhenIdle(() => {
      async function fetchPhotos() {
        try {
          const res = await fetch(
            "https://mmission007.org/wp-json/wp/v2/photogallerymm"
          );
          const data = await res.json();
          if (!mountedRef.current) return;

          const mapped = await Promise.all(
            data.map(async (item) => {
              let imageURL = null;
              if (item._links?.["wp:attachment"]?.[0]?.href) {
                const attachmentRes = await fetch(
                  item._links["wp:attachment"][0].href
                );
                const attachmentData = await attachmentRes.json();
                if (attachmentData?.[0]?.source_url) {
                  imageURL = attachmentData[0].source_url;
                }
              }
              return {
                id: item.id,
                imagemm: imageURL,
                title: item.acf?.title,
                description: item.acf?.description,
                year_select: item.acf?.year_select,
                rank_order: item.acf?.rank_order
                  ? Number(item.acf.rank_order)
                  : null,
                date: item.date,
              };
            })
          );
          if (!mountedRef.current) return;

          const sorted = mapped.sort((a, b) => {
            if (a.rank_order !== null && b.rank_order !== null) {
              if (a.rank_order !== b.rank_order)
                return a.rank_order - b.rank_order;
              const aDate = a.date ? new Date(a.date) : 0;
              const bDate = b.date ? new Date(b.date) : 0;
              return aDate - bDate;
            }
            if (a.rank_order !== null && b.rank_order === null) return -1;
            if (a.rank_order === null && b.rank_order !== null) return 1;
            const aDate = a.date ? new Date(a.date) : 0;
            const bDate = b.date ? new Date(b.date) : 0;
            return bDate - aDate;
          });
          setPhotos(sorted);
        } catch (err) {
          if (mountedRef.current) console.log(err.message);
        }
      }
      fetchPhotos();
    }, 2000);

    return () => {
      mountedRef.current = false;
      cancel();
    };
  }, []);

  const handleImageLoad = (id) => {
    setLoadedImages((prev) => ({ ...prev, [id]: true }));
  };

  const toggleCard = (id) => {
    setActiveCards((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const sortedPhotos = [...photos].sort((a, b) => {
    const aRank = a.rank_order;
    const bRank = b.rank_order;
    if (aRank && bRank) return aRank - bRank;
    if (aRank && !bRank) return -1;
    if (!aRank && bRank) return 1;
    return new Date(b.date) - new Date(a.date);
  });

  const filteredPhotos =
    activeYear === "all"
      ? sortedPhotos
      : sortedPhotos.filter((p) => p.year_select === activeYear);
  const filteredPhotosChunks = chunkArray(filteredPhotos, chunkSize);
  const yearOptions = getYearFilterOptions();

  return (
    <div className="yg-gallery-container">
      <div className="yg-filter-bar">
        {yearOptions.map((year) => (
          <button
            key={year}
            type="button"
            className={`yg-filter-btn ${activeYear === year ? "yg-active" : ""}`}
            onClick={() => setActiveYear(year)}
          >
            {year === "all" ? "All" : year}
          </button>
        ))}
      </div>
      <h2 className="yg-gallery-year-heading">{activeYear}</h2>
      {filteredPhotosChunks.length === 0 ? (
        <div className="empty-album">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="150"
            height="150"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden
          >
            <rect x="2" y="3" width="20" height="18" rx="2" ry="2" />
            <line x1="2" y1="9" x2="22" y2="9" />
            <line x1="6" y1="21" x2="6" y2="9" />
            <line x1="10" y1="21" x2="10" y2="9" />
            <line x1="14" y1="21" x2="14" y2="9" />
            <line x1="18" y1="21" x2="18" y2="9" />
          </svg>
          <p>No photos for this year.</p>
        </div>
      ) : (
        <Splide aria-label="Photo gallery">
          {filteredPhotosChunks.map((chunk, index) => (
            <SplideSlide key={index}>
              <div className="yg-masonry-grid">
                {chunk.map((p) => {
                  const isActive = !!activeCards[p.id];
                  return (
                    <div
                      key={p.id}
                      className="gallery-item"
                      onClick={() => toggleCard(p.id)}
                      role="button"
                      tabIndex={0}
                      onKeyDown={(e) => {
                        if (e.key === "Enter" || e.key === " ")
                          toggleCard(p.id);
                      }}
                    >
                      {!loadedImages[p.id] && <div className="skeleton" />}
                      {p.imagemm && (
                        <img
                          src={p.imagemm}
                          alt={p.title || "Photo"}
                          loading="lazy"
                          onLoad={() => handleImageLoad(p.id)}
                          onError={() => handleImageLoad(p.id)}
                          className={`gallery-img ${loadedImages[p.id] ? "visible" : "hidden"}`}
                          aria-expanded={isActive}
                          style={{
                            width: "100%",
                            height: "auto",
                            cursor: "pointer",
                          }}
                        />
                      )}
                      <div
                        className={`gallery-info ${isActive ? "visible" : ""}`}
                        aria-hidden={!isActive}
                        onClick={(e) => e.stopPropagation()}
                      >
                        {rankCounts[p.rank_order] > 1 &&
                          p.rank_order !== null && (
                            <span className="duplicate-rank-dot">
                              {p.rank_order}
                            </span>
                          )}
                        <h3>{p.title}</h3>
                        <p>{p.description}</p>
                        <p className="year">{p.year_select}</p>
                      </div>
                    </div>
                  );
                })}
              </div>
            </SplideSlide>
          ))}
        </Splide>
      )}
    </div>
  );
}
