'use client'

import Image from "next/image";
// import styles from "./page.module.css";
import HeaderBar from "./components/HeaderBar";
import Hero from "./components/Hero";
import SubHero from "./components/SubHero";
import TextCarousel from "./components/TextCarousel";
import QuizletPaths from "./components/QuizletPaths";
import { useState,useEffect } from "react";


export default function Home() {
  const [selectedYear, setSelectedYear] = useState()
  const [tileWidth, setTileWidth] = useState(370)
  const [visibleTiles, setVisibleTiles] = useState(2)
useEffect(() => {
    const setup = () => {
      const track = document.querySelector(".yg-carousel-track");
      const tiles = document.querySelectorAll(".yg-masonry-tile");
      const leftBtn = document.querySelector(".yg-left");
      const rightBtn = document.querySelector(".yg-right");
      if (!track || !tiles.length || !leftBtn || !rightBtn) return;

      let index = 0;
      const tileWidth = 370;
      const visibleTiles = 2;
      let startX = 0;
      let scrollLeft = 0;
      let isDragging = false;

      const moveCarousel = () => {
        const offset = index * (tileWidth + 16);
        track.style.transition = "transform 0.4s cubic-bezier(.25,1.25,.5,1)";
        track.style.transform = `translateX(-${offset}px)`;
        tiles.forEach((tile, i) => {
          tile.style.transitionDelay = `${i * 0.05}s`;
          tile.style.transform = "scale(0.98)";
          setTimeout(() => (tile.style.transform = "scale(1)"), 400);
        });
      };

      const handleLeft = () => {
        index = Math.max(0, index - visibleTiles);
        moveCarousel();
      };
      const handleRight = () => {
        index = Math.min(tiles.length - visibleTiles, index + visibleTiles);
        moveCarousel();
      };

      leftBtn.addEventListener("click", handleLeft);
      rightBtn.addEventListener("click", handleRight);

      const startDrag = (pageX) => {
        isDragging = true;
        startX = pageX - track.offsetLeft;
        scrollLeft = index * (tileWidth + 16);
        track.style.transition = "none";
      };
      const stopDrag = () => {
        if (!isDragging) return;
        isDragging = false;
        const matrix = new DOMMatrix(track.style.transform);
        const moveDistance = matrix.m41 * -1;
        const newIndex = Math.round(moveDistance / (tileWidth + 16));
        index = Math.max(0, Math.min(newIndex, tiles.length - visibleTiles));
        moveCarousel();
      };
      const duringDrag = (pageX) => {
        if (!isDragging) return;
        const x = pageX - track.offsetLeft;
        const walk = (x - startX) * 1.2;
        const offset = scrollLeft - walk;
        track.style.transform = `translateX(-${offset}px)`;
      };

      track.addEventListener("mousedown", (e) => startDrag(e.pageX));
      track.addEventListener("mouseleave", stopDrag);
      track.addEventListener("mouseup", stopDrag);
      track.addEventListener("mousemove", (e) => duringDrag(e.pageX));
      track.addEventListener("touchstart", (e) => startDrag(e.touches[0].pageX));
      track.addEventListener("touchend", stopDrag);
      track.addEventListener("touchmove", (e) => duringDrag(e.touches[0].pageX));

      tiles.forEach((tile) => {
        tile.addEventListener("click", () => {
          tiles.forEach((t) => t.classList.remove("yg-focused"));
          tile.classList.add("yg-focused");
          tile.scrollIntoView({ behavior: "smooth", inline: "center", block: "nearest" });
        });
      });
    };

    if (typeof window !== "undefined") {
      requestAnimationFrame(setup);
    }
  }, []);

  return (
    <div>
<HeaderBar/>
<Hero />
{/* <div className="spacer" style={{width:'100vw',height:'50vw'}}></div> */}
   {/* Css for this divider lives in globals.css */}
<br />
<br />
   <span className="divider" style={{marginTop:'5em'}}>
  <span className="divider-line"></span>
  <span className="divider-text" style={{letterSpacing:'0.092em'}}>WHAT WE PROVIDE</span>
  <span className="divider-line reverse"></span>
 </span>
<br />
{/*  */}
<div className="unique-cta-grid unique-cta-reverse">
  <div className="unique-cta-images">
    <img
      src="https://dl4.pushbulletusercontent2.com/bKZLH9qUHSbcMgL3TpoDWv6J7GdMcuHK/image.png"
      alt="Service 2"
    />
    <img
    style={{filter:'brightness(1.52) saturate(1.32) contrast(1.162)'}}
      src="https://dl4.pushbulletusercontent2.com/kAHMs1AaqTnU3TxzyRWiVsvVBqLeJh6M/IMG_2231.JPG"
      alt="Service 1"
    />
  </div>
  
</div>
<br />


<section className="hero-cta-section">
  <div className="hero-cta-container">
         <p style={{fontSize:'1.25em',padding:'1rem 0 3.5rem 0',marginTop:'-3rem',display:'block'}}>
         Mission 007 Mentorship empowers young people from ages 16-25 years old to overcome obstacles and build thriving futures. Through evidence-based mentoring, social-emotional learning, and career readiness programs,
         it supports youth (including older teens and young adults) in identifying goals, developing life skills, and transitioning into meaningful education, careers, and adult-life opportunities.
          </p>
    <div className="hero-cta-grid" style={{marginTop:'1.32em'}}>
      <div className="hero-cta-content">
        <div className="hero-cta-text">
          <h3 style={{color:'white',lineHeight:'1.52'}}>
            Email us:<br/>
          007mmission@gmail.com <br />
          Call us:<br/>
          708-940-2883
          </h3>
          <div className="hero-cta-button">
            <a href="#" className="hero-cta-btn">Contact Us</a>
          </div>
        </div>
      </div>
      <div className="hero-cta-images">
        <img
          src="https://dl4.pushbulletusercontent2.com/KgmEpT9ln02FxYFPysM3hFcHxyHIpHzv/image.png"
          alt=""
        />
        <img
          src="https://lh3.googleusercontent.com/T4QLWWfm-ogWEQXmrrAPL3ngMDxBL4ojyom10LBpYZSRXpsNDBu7_1moWo7P_GGIlkqhNFwXLFBw7URnqsLneez9_TZMdMUaLvnqXFNV=s1236"
          alt=""
        />
      </div>
    </div>
    <div className="spacerz" style={{width:'100vw',height:'3em'}}></div>
    <span className="divider">
  <span className="divider-line"></span>
  <span className="divider-text" style={{letterSpacing:'0.092em'}}>Summary of Services</span>
  <span className="divider-line reverse"></span>
 </span>
   {/*  */}
  </div>{/*  */}
          <ul className="youth-service-list">
  <li><span className="icon">✨</span> <strong>One-on-one mentorship</strong> with a trained adult who guides goal-setting, decision-making, and personal growth.</li>
  <li><span className="icon">🤝</span><strong>Group mentoring circles</strong> focused on social-emotional learning (SEL), leadership, and peer support.</li>
  <li><span className="icon">💼</span><strong>Career-readiness assistance:</strong> résumé and job-application help, interview coaching, and networking opportunities.</li>
  <li><span className="icon">🎓</span> <strong>Educational support:</strong> tutoring, GED/HS diploma transition, and college application advising.</li>
  <li><span className="icon">💡</span> <strong>Life-skills workshops</strong>: budgeting, healthy relationships, time, and stress management.</li>
  <li><span className="icon">🏠</span> <strong>Transitional support</strong>: help with housing, transportation, and job placement.</li>
  <li><span className="icon">🌐</span><strong>Peer and alumni networks</strong> to connect, mentor, and build community.</li>
  <li><span className="icon">📚</span><strong> Access to resources</strong> including internships, apprenticeships, and scholarship opportunities.</li>
  <li><span className="icon">🧠</span> <strong>Virtual or in-person counseling</strong>for mental health, trauma, or wellness challenges.</li>
  <li><span className="icon">👨‍👩‍👧</span> <strong>Family and community engagement</strong>workshops that build supportive environments.</li>
</ul>
<br />
<div className="unique-cta-grid unique-cta-reverse">
  <div className="unique-cta-images">
<img
     className="unique-cta-image"
     style={{filter:'brightness(1.12) saturate(1.12) contrast(1.12)'}}
       src="https://dl4.pushbulletusercontent2.com/HHfiklL3awHsKZxwK1hYjp6QnM8oOt43/image.png"
       alt="Service 2"
     />
<img
     className="unique-cta-image"
       src="https://dl4.pushbulletusercontent2.com/SYkqw6oZFKbHI28KnzfQalZqlkyRXbpj/IMG_0282.JPEG"
       alt="Service 2"
     />
   </div>
</div>
</section>

{/* <TextCarousel /> */}
{/* <div className="gallery-filter">
  {['2026','2025', '2024', '2023', '2022'].map((year,index) => (
    <button 
      key={`year+${index}`} 
      className={`year-timeline-btn ${selectedYear} === year && 'active'`}
      onClick={() => setSelectedYear(year)}
    >
      {year}
    </button>
  ))}
</div> */}

<div class="yg-gallery-container">
  <div class="yg-filter-bar">
    <button class="yg-filter-btn" data-year="all">All</button>
    <button class="yg-filter-btn yg-active" data-year="2025">2026</button>
    <button class="yg-filter-btn" data-year="2024">2025</button>
    <button class="yg-filter-btn" data-year="2023">2024</button>
  </div>

  {/* <div class="yg-masonry-grid">
    <div class="yg-masonry-item" data-year="2025"><img src="https://place-hold.it/400x500" alt="2025 sample" /></div>
    <div class="yg-masonry-item" data-year="2024"><img src="https://place-hold.it/400x450" alt="2024 sample" /></div>
    <div class="yg-masonry-item" data-year="2023"><img src="https://place-hold.it/400x550" alt="2023 sample" /></div>
    <div class="yg-masonry-item" data-year="2025"><img src="https://place-hold.it/400x400" alt="2025 sample" /></div>
    <div class="yg-masonry-item" data-year="2022"><img src="https://place-hold.it/400x600" alt="2022 sample" /></div>
    <div class="yg-masonry-item" data-year="2024"><img src="https://place-hold.it/400x520" alt="2024 sample" /></div>
  </div> */}

{/* <div className="yg-gallery-carousel">
  <button onClick={() => {
  index = Math.max(0, index - visibleTiles);
  moveCarousel()}} className="yg-carousel-btn yg-left" aria-label="Scroll left">‹</button>

  <div className="yg-carousel-track" tabIndex="0">
    <div className="yg-masonry-tile" tabIndex="0">
      <img src="https://place-hold.it/400x500" alt="Gallery item" />
    </div>
    <div className="yg-masonry-tile" tabIndex="0">
      <img src="https://place-hold.it/400x450" alt="Gallery item" />
    </div>
    <div className="yg-masonry-tile" tabIndex="0">
      <img src="https://place-hold.it/400x600" alt="Gallery item" />
    </div>
    <div className="yg-masonry-tile" tabIndex="0">
      <img src="https://place-hold.it/400x420" alt="Gallery item" />
    </div>
    <div className="yg-masonry-tile" tabIndex="0">
      <img src="https://place-hold.it/400x560" alt="Gallery item" />
    </div>
  </div>

  <button onClick={() => {
  index = Math.min(tiles.length - visibleTiles, index + visibleTiles);
  moveCarousel();}} className="yg-carousel-btn yg-right" aria-label="Scroll right">›</button>
</div> */}

<div className="yg-gallery-carousel">
      <button className="yg-carousel-btn yg-left" aria-label="Scroll left">‹</button>
      <div className="yg-carousel-track">
        <div className="yg-masonry-tile"><img src="https://place-hold.it/400x500" alt="" /></div>
        <div className="yg-masonry-tile"><img src="https://place-hold.it/400x450" alt="" /></div>
        <div className="yg-masonry-tile"><img src="https://place-hold.it/400x600" alt="" /></div>
        <div className="yg-masonry-tile"><img src="https://place-hold.it/400x420" alt="" /></div>
        <div className="yg-masonry-tile"><img src="https://place-hold.it/400x560" alt="" /></div>
      </div>
      <button className="yg-carousel-btn yg-right" aria-label="Scroll right">›</button>
    </div>

</div>


{/* <div className="anchored" style={{position:'fixed',top: '90vh',backgroundColor:'red',height:'32vh',width:'99vw'}}>

</div> */}
{/* <h1 style={{ fontSize: '2.6ch',marginTop: '-20vh',textAlign:'left',paddingLeft:'2.5em',width:'88%',lineHeight:'1.4',filter:'contrast(1.5)',textShadow:'2px 3px solid rgba(0,0,0,0.32)' }}>Mission 007 Mentorship NonProfit Organization <span style={{fontWeight:'normal'}}>is dedicated to empowering youths aged 16-25 by providing them with access to trade classes and job training opportunities, enabling them to build sustainable careers and achieve economic independence	</span></h1> */}

   <div className="centered" style={{display:'flex',justifyContent:'center',marginTop:'3em'}}>

{/* <img style={{maxWidth:'50%'}} src='https://dl4.pushbulletusercontent2.com/7l6xfVNhKCYcii8JMbXyTvwzXpXGfHOt/image.png'/> */}
    </div>    
{/* <SubHero /> */}
{/* <Quizlet /> */}
<span className="divider">
  <span className="divider-line"></span>
  <span className="divider-text" style={{letterSpacing:'0.092em'}}>Take a quick &amp; free quiz</span>
  <span className="divider-line reverse"></span>
 </span>
<QuizletPaths />


    </div>
  );
}
