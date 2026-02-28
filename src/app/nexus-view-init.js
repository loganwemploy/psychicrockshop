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
  const root = document.querySelector(".k7-scope");
  if (!root) return;
  root.style.setProperty("--ui-theme", color);
  root.style.setProperty("--ui-text", textColor);
}

export function initCursor(containerRef) {
  const root = containerRef?.current;
  if (!root) return;
  const cursorDot = root.querySelector("#k7-ptr");
  const cursorOutline = root.querySelector("#k7-ring");
  if (!cursorDot || !cursorOutline) return;

  const onMove = (e) => {
    const posX = e.clientX;
    const posY = e.clientY;
    cursorDot.style.left = `${posX}px`;
    cursorDot.style.top = `${posY}px`;
    cursorOutline.animate({ left: `${posX}px`, top: `${posY}px` }, { duration: 500, fill: "forwards" });
  };

  window.addEventListener("mousemove", onMove);
  root.querySelectorAll("a, button, .k7-hover").forEach((el) => {
    el.addEventListener("mouseenter", () => root.classList.add("k7-hover-on"));
    el.addEventListener("mouseleave", () => root.classList.remove("k7-hover-on"));
  });
  return () => window.removeEventListener("mousemove", onMove);
}

export function initSparkParticles(containerRef) {
  const root = containerRef?.current;
  if (!root) return;
  const canvas = root.querySelector("#k7-canvas-bg");
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

  function resize() {
    w = root.offsetWidth;
    h = root.offsetHeight;
    canvas.width = w;
    canvas.height = h;
  }

  resize();
  for (let i = 0; i < 15; i++) particles.push(new P());

  const onResize = () => resize();
  const onMouseMove = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };

  window.addEventListener("resize", onResize);
  root.addEventListener("mousemove", onMouseMove);

  let raf;
  function loop() {
    ctx.clearRect(0, 0, w, h);
    particles.forEach((p) => { p.update(); p.draw(); });
    raf = requestAnimationFrame(loop);
  }
  loop();

  return () => {
    window.removeEventListener("resize", onResize);
    root.removeEventListener("mousemove", onMouseMove);
    if (raf) cancelAnimationFrame(raf);
  };
}

export function initIntroGrid(containerRef, heroImagesList, gsap) {
  const root = containerRef?.current;
  if (!root || !gsap) return;
  const container = root.querySelector("#k7-mesh-inner");
  if (!container) return;
  container.innerHTML = "";
  const rows = 6;
  const cols = 120;
  for (let r = 0; r < rows; r++) {
    const line = document.createElement("div");
    line.className = "k7-mesh-line";
    let lastRandIndex = -1;
    for (let c = 0; c < cols; c++) {
      const item = document.createElement("div");
      item.className = "k7-mesh-tile";
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
  const lines = container.querySelectorAll(".k7-mesh-line");
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
  root.querySelectorAll(".k7-pull").forEach((el) => {
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
  root.querySelectorAll(".k7-tilt").forEach((el) => {
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

export function initNavigation(containerRef, gsap) {
  const root = containerRef?.current;
  if (!root || !gsap) return () => {};
  const mainScroll = root.querySelector("#k7-main");
  if (!mainScroll) return () => {};
  const verticalSlides = mainScroll.querySelectorAll(":scope > section");

  const vNav = document.createElement("div");
  vNav.className = "k7-rail-v";
  root.appendChild(vNav);

  verticalSlides.forEach((s, i) => {
    const dot = document.createElement("button");
    dot.className = "k7-dot k7-hover k7-pull";
    dot.setAttribute("aria-label", `Scroll to section ${i + 1}`);
    dot.onclick = () => s.scrollIntoView({ behavior: "smooth" });
    vNav.appendChild(dot);
  });

  const cleanups = [];

  root.querySelectorAll(".k7-strip").forEach((wrapper) => {
    const slides = wrapper.querySelectorAll(".k7-cell");
    const container = wrapper.querySelector(".k7-strip-inner");
    if (!container) return;

    const hNav = document.createElement("nav");
    hNav.className = "k7-rail-h";

    const prevBtn = document.createElement("button");
    prevBtn.className = "k7-arrow prev k7-hover";
    prevBtn.innerHTML = "&#10094;";
    prevBtn.title = "Previous slide";
    prevBtn.setAttribute("aria-label", "Go to previous slide");
    prevBtn.onclick = () => container.scrollBy({ left: -window.innerWidth, behavior: "smooth" });
    hNav.appendChild(prevBtn);

    slides.forEach((s, i) => {
      const dot = document.createElement("button");
      dot.className = "k7-dot k7-hover";
      dot.setAttribute("aria-label", `Go to slide ${i + 1}`);
      dot.onclick = () => container.scrollTo({ left: i * window.innerWidth, behavior: "smooth" });
      hNav.appendChild(dot);
    });

    const nextBtn = document.createElement("button");
    nextBtn.className = "k7-arrow next k7-hover";
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
      hNav.querySelectorAll(".k7-dot").forEach((d, i) => d.classList.toggle("active", i === idx));
    };

    container.addEventListener("scroll", onScroll);
    checkArrowVisibility();
    cleanups.push(() => container.removeEventListener("scroll", onScroll));
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        const target = e.target;
        let color, text;
        if (target.classList.contains("k7-strip")) {
          const container = target.querySelector(".k7-strip-inner");
          const idx = container ? Math.round(container.scrollLeft / window.innerWidth) : 0;
          const slides = target.querySelectorAll(".k7-cell");
          color = slides[idx]?.dataset?.uiColor || target.dataset?.uiColor;
          text = slides[idx]?.dataset?.uiTextColor || target.dataset?.uiTextColor;
        } else {
          color = target.dataset?.uiColor;
          text = target.dataset?.uiTextColor;
        }
        if (color && text) applyTheme(color, text);
        const idx = Array.from(verticalSlides).indexOf(target);
        if (idx !== -1) {
          vNav.querySelectorAll(".k7-dot").forEach((d, i) => d.classList.toggle("active", i === idx));
        }
        const animTargets = target.querySelectorAll("h1, p, .k7-tag, .k7-lead, img, video, .k7-pills");
        if (animTargets.length) {
          gsap.to(animTargets, { opacity: 1, y: 0, duration: 0.8, stagger: 0.1 });
        }
      });
    },
    { threshold: 0.5 }
  );
  verticalSlides.forEach((s) => observer.observe(s));
  cleanups.push(() => verticalSlides.forEach((s) => observer.unobserve(s)));

  return () => {
    vNav.remove();
    cleanups.forEach((c) => c());
  };
}
