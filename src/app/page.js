"use client";

import Image from "next/image";
// import styles from "./page.module.css";
import HeaderBar from "./components/HeaderBar";
import Hero from "./components/Hero";
import SubHero from "./components/SubHero";
import TextCarousel from "./components/TextCarousel";
import QuizletPaths from "./components/QuizletPaths";
import { useState, useEffect, useRef } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";

import "@splidejs/react-splide/css";
export default function Home() {
  const [selectedYear, setSelectedYear] = useState();
  const [photos, setPhotos] = useState([])
  const [loading, setLoading] = useState(true)
  const [loadedImages, setLoadedImages] = useState({}) // track each image load

  // const [visibleTiles, setVisibleTiles] = useState(2)

  const [eventInfos, setEventInfos] = useState();

  
  // async function getEvents() {
    //   const url = "https://mmission007.org/wp-json/wp/v2/eventinfo";
    //   const res = await fetch(url);
    //   const data = await res.json();
    //   setEventInfos(data[0].acf);
    // }

    // async () => {
    //   try{
    //     const url = "https://mmission007.org/wp-json/wp/v2/photogallerymm";
    //     const res = await fetch(url);
    //     const data = await res.json();
    //     console.log(data[0].acf)
    //     setPhotos(data[0].acf);
    //   }
    //   catch(err){console.log(err.message)}
    // }

    useEffect(() => {
      async function fetchGallery() {
        try {
          const res = await fetch('https://mmission007.org/wp-json/wp/v2/photogallerymm')
          const posts = await res.json()
  
          const photosData = await Promise.all(
            posts.map(async (item) => {
              const attachmentEndpoint = item._links?.['wp:attachment']?.[0]?.href ?? null
  
              let imageUrl = null
              if (attachmentEndpoint) {
                const mediaRes = await fetch(attachmentEndpoint)
                if (mediaRes.ok) {
                  const media = await mediaRes.json()
                  imageUrl = media?.[0]?.source_url ?? null
                }
              }
  
              return {
                id: item.id,
                imagemm: imageUrl,
                title: item.acf?.title,
                description: item.acf?.description,
                year_select: item.acf?.year_select
              }
            })
          )
  
          setPhotos(photosData)
        } catch (err) {
          console.error('Failed to fetch gallery:', err)
        } finally {
          setLoading(false)
        }
      }
  
      fetchGallery()
    }, [])
  
    const handleImageLoad = (id) => {
      setLoadedImages((prev) => ({ ...prev, [id]: true }))
    }


  return (
    <div>
      <HeaderBar />
      <Hero />
      {/* <div className="spacer" style={{width:'100vw',height:'50vw'}}></div> */}
      {/* Css for this divider lives in globals.css */}
      <br />
      <br />
      <span className="divider" style={{ marginTop: "5em" }}>
        <span className="divider-line"></span>
        <span className="divider-text" style={{ letterSpacing: "0.092em" }}>
          WHAT WE PROVIDE
          {/* {photos} */}
        </span>
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
            style={{
              filter: "brightness(1.52) saturate(1.32) contrast(1.162)",
            }}
            src="https://dl4.pushbulletusercontent2.com/kAHMs1AaqTnU3TxzyRWiVsvVBqLeJh6M/IMG_2231.JPG"
            alt="Service 1"
          />
        </div>
      </div>
      <br />

      <section className="hero-cta-section">
        <div className="hero-cta-container">
          <p
            style={{
              fontSize: "1.25em",
              padding: "1rem 0 3.5rem 0",
              marginTop: "-3rem",
              display: "block",
            }}
          >
            Mission 007 Mentorship empowers young people from ages 16-25 years
            old to overcome obstacles and build thriving futures. Through
            evidence-based mentoring, social-emotional learning, and career
            readiness programs, it supports youth (including older teens and
            young adults) in identifying goals, developing life skills, and
            transitioning into meaningful education, careers, and adult-life
            opportunities.
          </p>
          <div className="hero-cta-grid" style={{ marginTop: "1.32em" }}>
            <div className="hero-cta-content">
              <div className="hero-cta-text">
                <h3 style={{ color: "white", lineHeight: "1.52" }}>
                  Email us:
                  <br />
                  007mmission@gmail.com <br />
                  Call us:
                  <br />
                  708-940-2883
                </h3>
                <div className="hero-cta-button">
                  <a href="#" className="hero-cta-btn">
                    Contact Us
                  </a>
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
          <div
            className="spacerz"
            style={{ width: "100vw", height: "3em" }}
          ></div>
          <span className="divider">
            <span className="divider-line"></span>
            <span className="divider-text" style={{ letterSpacing: "0.092em" }}>
              Summary of Services
            </span>
            <span className="divider-line reverse"></span>
          </span>
          {/*  */}
        </div>
        {/*  */}

        <ul className="youth-service-list">
          <li>
            <span className="icon">✨</span>{" "}
            <strong>One-on-one mentorship</strong> with a trained adult who
            guides goal-setting, decision-making, and personal growth.
          </li>
          <li>
            <span className="icon">🤝</span>
            <strong>Group mentoring circles</strong> focused on social-emotional
            learning (SEL), leadership, and peer support.
          </li>
          <li>
            <span className="icon">💼</span>
            <strong>Career-readiness assistance:</strong> résumé and
            job-application help, interview coaching, and networking
            opportunities.
          </li>
          <li>
            <span className="icon">🎓</span>{" "}
            <strong>Educational support:</strong> tutoring, GED/HS diploma
            transition, and college application advising.
          </li>
          <li>
            <span className="icon">💡</span>{" "}
            <strong>Life-skills workshops</strong>: budgeting, healthy
            relationships, time, and stress management.
          </li>
          <li>
            <span className="icon">🏠</span>{" "}
            <strong>Transitional support</strong>: help with housing,
            transportation, and job placement.
          </li>
          <li>
            <span className="icon">🌐</span>
            <strong>Peer and alumni networks</strong> to connect, mentor, and
            build community.
          </li>
          <li>
            <span className="icon">📚</span>
            <strong> Access to resources</strong> including internships,
            apprenticeships, and scholarship opportunities.
          </li>
          <li>
            <span className="icon">🧠</span>{" "}
            <strong>Virtual or in-person counseling</strong>for mental health,
            trauma, or wellness challenges.
          </li>
          <li>
            <span className="icon">👨‍👩‍👧</span>{" "}
            <strong>Family and community engagement</strong>workshops that build
            supportive environments.
          </li>
        </ul>
        <br />

        <section className="hero-section">
          <h2 style={{ fontSize: "2em" }}>{eventInfos?.event_name}</h2>
          <h6> {eventInfos?.event_description}</h6>
          <div className="hero-text">
            <div className="hero-content">
              <h2>Want to become a sponsor?</h2>
              {/* <p>
       Learn More About How
      </p> */}
              <div className="hero-button">
                <a href="#" style={{ fontSize: "1rem" }}>
                  Learn More About How
                </a>
              </div>
            </div>
          </div>

          {/* <div className="hero-image">
    <img src="https://dl4.pushbulletusercontent2.com/75qN098eZFz5Qnxq9NMSnW07Ur2hEshS/image.png" alt=""/>
  </div> */}
        </section>
        {/*  */}
        {/* <img
     className="unique-cta-imag"
     style={{width:'91.5vw',height:'auto',margin:'auto',padding:'1.32em'}}
       src="https://dl4.pushbulletusercontent2.com/75qN098eZFz5Qnxq9NMSnW07Ur2hEshS/image.png"
       alt="Service 2"
     /> */}
        <div className="unique-cta-grid unique-cta-reverse">
          <div className="unique-cta-images">
            {/* <img
     className="unique-cta-image"
     style={{filter:'brightness(1.12) saturate(1.12) contrast(1.12)'}}
       src="https://dl4.pushbulletusercontent2.com/HHfiklL3awHsKZxwK1hYjp6QnM8oOt43/image.png"
       alt="Service 2"
     /> */}
            {/* <img
     className="unique-cta-imag"
     style={{width:'98vw',height:'auto',margin:'auto',padding:'1.32em',border:'1.2rem inset white'}}
       src="https://dl4.pushbulletusercontent2.com/75qN098eZFz5Qnxq9NMSnW07Ur2hEshS/image.png"
       alt="Service 2"
     /> */}
            {/* <img
     className="unique-cta-image"
       src="https://dl4.pushbulletusercontent2.com/SYkqw6oZFKbHI28KnzfQalZqlkyRXbpj/IMG_0282.JPEG"
       alt="Service 2"
     /> */}
          </div>
        </div>
      </section>

      {/* <TextCarousel /> */}

      <div className="yg-gallery-container">
        <div className="yg-filter-bar">
          <button className="yg-filter-btn" data-year="all">
            All
          </button>
          <button className="yg-filter-btn yg-active" data-year="2025">
            2026
          </button>
          <button className="yg-filter-btn" data-year="2024">
            2025
          </button>
          <button className="yg-filter-btn" data-year="2023">
            2024
          </button>
        </div>

        {/* <div className="yg-masonry-grid">
    <div className="yg-masonry-item" data-year="2025"><img src="https://place-hold.it/400x500" alt="2025 sample" /></div>
    <div className="yg-masonry-item" data-year="2024"><img src="https://place-hold.it/400x450" alt="2024 sample" /></div>
    <div className="yg-masonry-item" data-year="2023"><img src="https://place-hold.it/400x550" alt="2023 sample" /></div>
    <div className="yg-masonry-item" data-year="2025"><img src="https://place-hold.it/400x400" alt="2025 sample" /></div>
    <div className="yg-masonry-item" data-year="2022"><img src="https://place-hold.it/400x600" alt="2022 sample" /></div>
    <div className="yg-masonry-item" data-year="2024"><img src="https://place-hold.it/400x520" alt="2024 sample" /></div>
  </div> */}
        <Splide aria-label="My Favorite Images">
          <SplideSlide>
            <div className="yg-masonry-grid">
              {/* grid item map */}
              {/* TODO fix this map why it not working? */}
              {photos.map((p) => (
          <div key={p.id} className="gallery-item">
            {!loadedImages[p.id] && <div className="skeleton"></div>}

            {p.imagemm && (
              <img
                src={p.imagemm}
                alt={p.title || 'photo'}
                loading="lazy"
                onLoad={() => handleImageLoad(p.id)}
                className={`gallery-img ${loadedImages[p.id] ? 'visible' : 'hidden'}`}
              />
            )}

            <div className="gallery-info">
              <h3>{p.title}</h3>
              <p>{p.description}</p>
              <p className="year">{p.year_select}</p>
            </div>
          </div>
        ))}
            </div>
          
          </SplideSlide>
          <SplideSlide>
            <div className="yg-masonry-grid">
              <div className="yg-masonry-item" data-year="2025">
                <img
                  src="https://dl4.pushbulletusercontent2.com/HHfiklL3awHsKZxwK1hYjp6QnM8oOt43/image.png"
                  alt="2025 sample"
                />
              </div>
              <div className="yg-masonry-item" data-year="2024">
                <img
                  src="https://dl4.pushbulletusercontent2.com/SYkqw6oZFKbHI28KnzfQalZqlkyRXbpj/IMG_0282.JPEG"
                  alt="2024 sample"
                />
              </div>
              <div className="yg-masonry-item" data-year="2023">
                <img
                  src="https://dl4.pushbulletusercontent2.com/HHfiklL3awHsKZxwK1hYjp6QnM8oOt43/image.png"
                  alt="2023 sample"
                />
              </div>
              <div className="yg-masonry-item" data-year="2025">
                <img
                  src="https://dl4.pushbulletusercontent2.com/SYkqw6oZFKbHI28KnzfQalZqlkyRXbpj/IMG_0282.JPEG"
                  alt="2025 sample"
                />
              </div>
            </div>
            {/* <img style={{width:'100%',borderRadius:'0.75em'}} src="https://dl4.pushbulletusercontent2.com/bKZLH9qUHSbcMgL3TpoDWv6J7GdMcuHK/image.png" alt="Image 1"/> */}
          </SplideSlide>
        </Splide>
        {/*
      this works perfecttttttttt
  <Splide aria-label="My Favorite Images">
  <SplideSlide>
    <img style={{width:'100%',borderRadius:'0.75em'}} src="https://dl4.pushbulletusercontent2.com/bKZLH9qUHSbcMgL3TpoDWv6J7GdMcuHK/image.png" alt="Image 1"/>
  </SplideSlide>
  <SplideSlide>
    <img style={{width:'100%',borderRadius:'0.75em'}} src="https://dl4.pushbulletusercontent2.com/SYkqw6oZFKbHI28KnzfQalZqlkyRXbpj/IMG_0282.JPEG" alt="Image 2"/>
  </SplideSlide>
</Splide>
    thisworrkkkss perrrrrrfectt
   */}
      </div>

      {/* <div className="anchored" style={{position:'fixed',top: '90vh',backgroundColor:'red',height:'32vh',width:'99vw'}}>

</div> */}
      {/* <h1 style={{ fontSize: '2.6ch',marginTop: '-20vh',textAlign:'left',paddingLeft:'2.5em',width:'88%',lineHeight:'1.4',filter:'contrast(1.5)',textShadow:'2px 3px solid rgba(0,0,0,0.32)' }}>Mission 007 Mentorship NonProfit Organization <span style={{fontWeight:'normal'}}>is dedicated to empowering youths aged 16-25 by providing them with access to trade classes and job training opportunities, enabling them to build sustainable careers and achieve economic independence	</span></h1> */}

      <div
        className="centered"
        style={{ display: "flex", justifyContent: "center", marginTop: "3em" }}
      >
        {/* <img style={{maxWidth:'50%'}} src='https://dl4.pushbulletusercontent2.com/7l6xfVNhKCYcii8JMbXyTvwzXpXGfHOt/image.png'/> */}
      </div>
      {/* <SubHero /> */}
      {/* <Quizlet /> */}
      <span className="divider">
        <span className="divider-line"></span>
        <span className="divider-text" style={{ letterSpacing: "0.092em" }}>
          Take a quick &amp; free quiz
        </span>
        <span className="divider-line reverse"></span>
      </span>
      <QuizletPaths />
    </div>
  );
}
