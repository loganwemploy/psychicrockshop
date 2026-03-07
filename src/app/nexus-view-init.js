export const crystalImages = [
  "/hero-grid/hero-01.jpg",
  "/hero-grid/hero-02.jpg",
  "/hero-grid/hero-03.jpg",
  "/hero-grid/hero-04.jpg",
  "/hero-grid/hero-05.jpg",
  "/hero-grid/hero-06.jpg",
  "/hero-grid/hero-07.jpg",
  "/hero-grid/hero-08.jpg",
  "/hero-grid/hero-09.jpg",
  "/hero-grid/hero-10.jpg",
  "/hero-grid/hero-11.jpg",
  "/hero-grid/hero-12.jpg",
  "/hero-grid/hero-13.jpg",
  "/hero-grid/hero-14.jpg",
  "/hero-grid/hero-15.jpg",
  "/hero-grid/hero-16.jpg",
  "/hero-grid/hero-17.jpg",
  "/hero-grid/hero-18.jpg",
  "/hero-grid/hero-19.jpg",
  "/hero-grid/hero-20.jpg",
  "/hero-grid/hero-21.jpg",
  "/hero-grid/hero-22.jpg",
];

export function applyTheme(color, textColor) {
  const root = document.querySelector(".shopcrystal-scope");
  if (!root) return;
  root.style.setProperty("--ui-theme", color);
  root.style.setProperty("--ui-text", textColor);
}

export function initCursor(containerRef) {
  const root = containerRef?.current;
  if (!root) return;
  const cursorDot = root.querySelector("#shopcrystal-ptr");
  const cursorOutline = root.querySelector("#shopcrystal-ring");
  if (!cursorDot || !cursorOutline) return;

  const onMove = (e) => {
    const posX = e.clientX;
    const posY = e.clientY;
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    cursorOutline.animate({ left: `${posX}px`, top: `${posY}px` }, { duration: 500, fill: "forwards" });
  };

  window.addEventListener("mousemove", onMove);
  root.querySelectorAll("a, button, .shopcrystal-hover").forEach((el) => {
    el.addEventListener("mouseenter", () => root.classList.add("shopcrystal-hover-on"));
    el.addEventListener("mouseleave", () => root.classList.remove("shopcrystal-hover-on"));
  });
  return () => window.removeEventListener("mousemove", onMove);
}

/**
 * @param {React.RefObject} containerRef
 * @param {React.RefObject<boolean>} [stopRef] - when .current is true, particles stop for the rest of the session
 */
export function initSparkParticles(containerRef, stopRef) {
  const root = containerRef?.current;
  if (!root) return;
  const canvas = root.querySelector("#shopcrystal-canvas-bg");
  if (!canvas) return;
  const ctx = canvas.getContext("2d");
  let w = 0, h = 0;
  const particles = [];
  const mouse = { x: -1000, y: -1000 };

  const sparklePath = new Path2D(
    "M24 0 L31 17 L48 24 L31 31 L24 48 L17 31 L0 24 L17 17 Z"
  );

  class P {
    constructor() { this.reset(); }
    reset() {
      this.x = Math.random() * w;
      this.y = Math.random() * h;
      this.vx = (Math.random() - 0.5) * 1.5;
      this.vy = (Math.random() - 0.5) * 1.5;
      this.size = 0.8 + Math.random() * 1.0;
      this.opacity = 0.08 + Math.random() * 0.1;
    }
    update() {
      const dx = this.x - mouse.x;
      const dy = this.y - mouse.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      if (dist < 200) {
        const f = (200 - dist) / 200;
        const a = Math.atan2(dy, dx);
        this.vx += Math.cos(a) * f * 1.2;
        this.vy += Math.sin(a) * f * 1.2;
      }
      this.x += this.vx;
      this.y += this.vy;
      this.vx *= 0.99;
      this.vy *= 0.99;
      if (this.x < 0 || this.x > w) this.vx *= -1;
      if (this.y < 0 || this.y > h) this.vy *= -1;
    }
    draw() {
      ctx.save();
      ctx.translate(this.x, this.y);
      ctx.scale(this.size, this.size);
      ctx.globalAlpha = this.opacity;
      ctx.fillStyle = getComputedStyle(root).color;
      ctx.translate(-24, -24);
      ctx.fill(sparklePath);
      ctx.restore();
    }
  }

  function isMobileOrTablet() {
    if (typeof window === "undefined") return false;
    return window.matchMedia("(max-width: 1024px)").matches;
  }

  function particleCount() {
    return isMobileOrTablet() ? 4 : 15;
  }

  function resize() {
    w = root.offsetWidth;
    h = root.offsetHeight;
    canvas.width = w;
    canvas.height = h;
  }

  resize();
  const count = particleCount();
  for (let i = 0; i < count; i++) particles.push(new P());

  const onResize = () => resize();
  const onMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };

  window.addEventListener("resize", onResize);
  root.addEventListener("mousemove", onMouseMove);

  let raf;
  let stopped = false;
  function doCleanup() {
    if (stopped) return;
    stopped = true;
    ctx.clearRect(0, 0, w, h);
    window.removeEventListener("resize", onResize);
    root.removeEventListener("mousemove", onMouseMove);
    if (raf) cancelAnimationFrame(raf);
    raf = null;
  }

  function loop() {
    if (stopRef?.current) {
      doCleanup();
      return;
    }
    ctx.clearRect(0, 0, w, h);
    particles.forEach((p) => { p.update(); p.draw(); });
    raf = requestAnimationFrame(loop);
  }
  loop();

  return () => { doCleanup(); };
}

export function initIntroGrid(containerRef, heroImagesList, gsap) {
  const root = containerRef?.current;
  if (!root || !gsap) return;
  const container = root.querySelector("#shopcrystal-mesh-inner");
  if (!container) return;
  container.innerHTML = "";
  const rows = 6;
  const cols = 120;
  for (let r = 0; r < rows; r++) {
    const line = document.createElement("div");
    line.className = "shopcrystal-mesh-line";
    let lastRandIndex = -1;
    for (let c = 0; c < cols; c++) {
      const item = document.createElement("div");
      item.className = "shopcrystal-mesh-tile";
      const img = document.createElement("img");
      let currentRandIndex = Math.floor(Math.random() * heroImagesList.length);
      while (currentRandIndex === lastRandIndex) {
        currentRandIndex = Math.floor(Math.random() * heroImagesList.length);
      }
      lastRandIndex = currentRandIndex;
      img.src = heroImagesList[currentRandIndex];
      item.appendChild(img);
      line.appendChild(item);
    }
    container.appendChild(line);
  }
  const lines = container.querySelectorAll(".shopcrystal-mesh-line");
  lines.forEach((line, i) => {
    const dir = i % 2 === 0 ? 1 : -1;
    gsap.set(line, { x: 0 });
    gsap.to(line, {
      x: () => dir * (line.scrollWidth / 3),
      duration: 145 + Math.random() * 150,
      ease: "none",
      repeat: -1,
    });
  });
}

export function initMagneticButtons(containerRef, gsap) {
  const root = containerRef?.current;
  if (!root || !gsap) return;
  root.querySelectorAll(".shopcrystal-pull").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const posX = e.clientX - rect.left - rect.width / 2;
      const posY = e.clientY - rect.top - rect.height / 2;
      gsap.to(el, { x: posX * 0.4, y: posY * 0.4, duration: 0.3, ease: "power2.out" });
    });
    el.addEventListener("mouseleave", () => {
      gsap.to(el, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.4)" });
    });
  });
}

export function initTiltEffect(containerRef) {
  const root = containerRef?.current;
  if (!root) return;
  root.querySelectorAll(".shopcrystal-tilt").forEach((el) => {
    el.addEventListener("mousemove", (e) => {
      const rect = el.getBoundingClientRect();
      const posX = e.clientX - rect.left;
      const posY = e.clientY - rect.top;
      const centerX = rect.width / 2;
      const centerY = rect.height / 2;
      const rotateX = ((posY - centerY) / centerY) * -25;
      const rotateY = ((posX - centerX) / centerX) * 25;
      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.15)`;
    });
    el.addEventListener("mouseleave", () => {
      el.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale(1)";
    });
  });
}

/**
 * Scroll mainScroll so the section is at the top. Uses offsetTop so the target
 * is exact in scroll coordinates (no overshoot on strips like Readings).
 */
function scrollSectionIntoView(mainScroll, section) {
  const targetTop = section.offsetTop;
  mainScroll.scrollTo({ top: Math.max(0, targetTop), behavior: "smooth" });
}

/**
 * One section per wheel. On desktop we skip the IntersectionObserver and derive
 * current section from scroll position (offsetTop). On smaller screens we use
 * the observer so state stays in sync.
 */
export function initScrollSnap(containerRef) {
  const root = containerRef?.current;
  if (!root) return () => {};
  const mainScroll = root.querySelector("#shopcrystal-main");
  if (!mainScroll) return () => {};
  const sections = Array.from(mainScroll.querySelectorAll(":scope > section"));
  const sectionCount = sections.length;
  if (sectionCount === 0) return () => {};

  const isDesktop = () => typeof window !== "undefined" && window.matchMedia("(min-width: 769px)").matches;
  let currentSectionIndex = 0;
  let scrollLockUntil = 0;
  const LOCK_MS = 1100;

  function getCurrentIndexFromScroll() {
    const scrollTop = mainScroll.scrollTop;
    const vh = mainScroll.clientHeight;
    for (let i = sectionCount - 1; i >= 0; i--) {
      if (scrollTop >= sections[i].offsetTop - 2) return i;
    }
    return 0;
  }

  let observer = null;
  if (!isDesktop()) {
    const ratioBySection = new Map();
    observer = new IntersectionObserver(
      (entries) => {
        if (Date.now() < scrollLockUntil) return;
        entries.forEach((e) => ratioBySection.set(e.target, e.intersectionRatio));
        let bestRatio = 0;
        let bestIndex = 0;
        sections.forEach((s, i) => {
          const r = ratioBySection.get(s) ?? 0;
          if (r > bestRatio) {
            bestRatio = r;
            bestIndex = i;
          }
        });
        currentSectionIndex = bestIndex;
      },
      {
        root: mainScroll,
        rootMargin: "0px",
        threshold: [0, 0.05, 0.1, 0.15, 0.2, 0.25, 0.3, 0.35, 0.4, 0.45, 0.5, 0.55, 0.6, 0.65, 0.7, 0.75, 0.8, 0.85, 0.9, 0.95, 1],
      }
    );
    sections.forEach((s) => observer.observe(s));
  }

  function scrollToSection(index) {
    const i = Math.max(0, Math.min(index, sectionCount - 1));
    currentSectionIndex = i;
    scrollSectionIntoView(mainScroll, sections[i]);
  }

  function onWheel(e) {
    if (Date.now() < scrollLockUntil) {
      e.preventDefault();
      return;
    }
    if (!isDesktop()) {
      currentSectionIndex = getCurrentIndexFromScroll();
    }
    const vh = mainScroll.clientHeight;
    const atBottom = mainScroll.scrollTop >= mainScroll.scrollHeight - vh - 2;

    if (e.deltaY > 0) {
      if (atBottom) return;
      e.preventDefault();
      scrollLockUntil = Date.now() + LOCK_MS;
      scrollToSection(currentSectionIndex + 1);
    } else if (e.deltaY < 0) {
      if (currentSectionIndex <= 0) return;
      e.preventDefault();
      scrollLockUntil = Date.now() + LOCK_MS;
      scrollToSection(currentSectionIndex - 1);
    }
  }

  let scrollSyncTimer;
  function onScrollSync() {
    if (Date.now() < scrollLockUntil) return;
    currentSectionIndex = getCurrentIndexFromScroll();
  }
  function onScroll() {
    clearTimeout(scrollSyncTimer);
    scrollSyncTimer = setTimeout(onScrollSync, 180);
  }

  mainScroll.addEventListener("wheel", onWheel, { passive: false });
  mainScroll.addEventListener("scroll", onScroll, { passive: true });

  return () => {
    mainScroll.removeEventListener("wheel", onWheel);
    mainScroll.removeEventListener("scroll", onScroll);
    clearTimeout(scrollSyncTimer);
    if (observer) sections.forEach((s) => observer.unobserve(s));
  };
}

export function initNavigation(containerRef, gsap) {
  const root = containerRef?.current;
  if (!root || !gsap) return () => {};
  const mainScroll = root.querySelector("#shopcrystal-main");
  if (!mainScroll) return () => {};
  const verticalSlides = Array.from(mainScroll.querySelectorAll(":scope > section"));
  const sectionCount = verticalSlides.length;
  if (sectionCount === 0) return () => {};

  const vNav = document.createElement("div");
  vNav.className = "shopcrystal-rail-v";
  root.appendChild(vNav);

  function scrollToSection(section) {
    scrollSectionIntoView(mainScroll, section);
  }

  verticalSlides.forEach((s, i) => {
    const dot = document.createElement("button");
    dot.className = "shopcrystal-dot shopcrystal-hover shopcrystal-pull";
    dot.setAttribute("aria-label", `Scroll to section ${i + 1}`);
    dot.onclick = () => scrollToSection(s);
    vNav.appendChild(dot);
  });

  const cleanups = [];
  const ratioBySection = new Map();
  let lastActiveIndex = -1;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => ratioBySection.set(e.target, e.intersectionRatio));
      let bestRatio = 0;
      let bestIndex = 0;
      verticalSlides.forEach((s, i) => {
        const r = ratioBySection.get(s) ?? 0;
        if (r > bestRatio) {
          bestRatio = r;
          bestIndex = i;
        }
      });
      const activeIndex = bestIndex;
      if (activeIndex === lastActiveIndex) return;
      lastActiveIndex = activeIndex;

      const target = verticalSlides[activeIndex];
      let color, text;
      if (target.classList.contains("shopcrystal-strip")) {
        const container = target.querySelector(".shopcrystal-strip-inner");
        const idx = container ? Math.round(container.scrollLeft / window.innerWidth) : 0;
        const slides = target.querySelectorAll(".shopcrystal-cell");
        color = slides[idx]?.dataset?.uiColor || target.dataset?.uiColor;
        text = slides[idx]?.dataset?.uiTextColor || target.dataset?.uiTextColor;
      } else {
        color = target.dataset?.uiColor;
        text = target.dataset?.uiTextColor;
      }
      if (color && text) applyTheme(color, text);
      vNav.querySelectorAll(".shopcrystal-dot").forEach((d, i) => d.classList.toggle("active", i === activeIndex));
      const animTargets = target.querySelectorAll("h1, p, .shopcrystal-tag, .shopcrystal-lead, img, video, .shopcrystal-pills");
      if (animTargets.length) gsap.to(animTargets, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 });
    },
    {
      root: mainScroll,
      rootMargin: "0px",
      threshold: [0, 0.05, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
    }
  );
  verticalSlides.forEach((s) => observer.observe(s));
  cleanups.push(() => verticalSlides.forEach((s) => observer.unobserve(s)));

  root.querySelectorAll(".shopcrystal-strip").forEach((wrapper) => {
    const slides = wrapper.querySelectorAll(".shopcrystal-cell");
    const container = wrapper.querySelector(".shopcrystal-strip-inner");
    if (!container) return;

    const hNav = document.createElement("nav");
    hNav.className = "shopcrystal-rail-h";

    const prevBtn = document.createElement("button");
    prevBtn.className = "shopcrystal-arrow prev shopcrystal-hover";
    prevBtn.innerHTML = "&#10094;";
    prevBtn.title = "Previous slide";
    prevBtn.setAttribute("aria-label", "Go to previous slide");
    prevBtn.onclick = () => container.scrollBy({ left: -window.innerWidth, behavior: "smooth" });
    hNav.appendChild(prevBtn);

    slides.forEach((s, i) => {
      const dot = document.createElement("button");
      dot.className = "shopcrystal-dot shopcrystal-hover";
      dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
      dot.onclick = () => container.scrollTo({ left: i * window.innerWidth, behavior: "smooth" });
      hNav.appendChild(dot);
    });

    const nextBtn = document.createElement("button");
    nextBtn.className = "shopcrystal-arrow next shopcrystal-hover";
    nextBtn.innerHTML = "&#10095;";
    nextBtn.title = "Next slide";
    nextBtn.setAttribute("aria-label", "Go to next slide");
    nextBtn.onclick = () => container.scrollBy({ left: window.innerWidth, behavior: "smooth" });
    hNav.appendChild(nextBtn);

    wrapper.appendChild(hNav);

    const checkArrowVisibility = () => {
      const tolerance = 5;
      const currentScroll = container.scrollLeft;
      const maxScroll = container.scrollWidth - container.clientWidth;
      prevBtn.style.opacity = currentScroll <= tolerance ? "0" : "1";
      prevBtn.style.pointerEvents = currentScroll <= tolerance ? "none" : "all";
      nextBtn.style.opacity = currentScroll >= maxScroll - tolerance ? "0" : "1";
      nextBtn.style.pointerEvents = currentScroll >= maxScroll - tolerance ? "none" : "all";
    };

    const onScroll = () => {
      checkArrowVisibility();
      const idx = Math.round(container.scrollLeft / window.innerWidth);
      const currentSlide = slides[idx];
      if (currentSlide?.dataset?.uiColor && currentSlide?.dataset?.uiTextColor) {
        applyTheme(currentSlide.dataset.uiColor, currentSlide.dataset.uiTextColor);
      }
      hNav.querySelectorAll(".shopcrystal-dot").forEach((d, i) => d.classList.toggle("active", i === idx));
    };

    container.addEventListener("scroll", onScroll);
    checkArrowVisibility();
    cleanups.push(() => container.removeEventListener("scroll", onScroll));
  });

  return () => {
    vNav.remove();
    cleanups.forEach((c) => c());
  };
}
