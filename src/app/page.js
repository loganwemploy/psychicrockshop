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
  const [activeCards, setActiveCards] = useState({})
  const [activeYear, setActiveYear] = useState('all')
  const [rankCounts, setRankCounts] = useState({});
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
      async function fetchPhotos() {
        try {
          const res = await fetch(
            'https://mmission007.org/wp-json/wp/v2/photogallerymm'
          )
          const data = await res.json()
  
          const mapped = await Promise.all(
            data.map(async (item) => {
              let imageURL = null
  
              if (item._links?.['wp:attachment']?.[0]?.href) {
                const attachmentRes = await fetch(
                  item._links['wp:attachment'][0].href
                )
                const attachmentData = await attachmentRes.json()
                if (attachmentData?.[0]?.source_url) {
                  imageURL = attachmentData[0].source_url
                }
              }
  
              return {
                id: item.id,
                imagemm: imageURL,
                title: item.acf?.title,
                description: item.acf?.description,
                year_select: item.acf?.year_select,
                rank_order: item.acf?.rank_order ? Number(item.acf.rank_order) : null,
                date: item.date
              }
            })
          )

          // const rankCounts = {}
mapped.forEach(item => {
  if (item.rank_order !== null) {
    rankCounts[item.rank_order] = (rankCounts[item.rank_order] || 0) + 1
  }
})

          const sorted = mapped.sort((a, b) => {
            if (a.rank_order !== null && b.rank_order !== null) {
              if (a.rank_order !== b.rank_order) return a.rank_order - b.rank_order
              const aDate = a.date ? new Date(a.date) : 0
              const bDate = b.date ? new Date(b.date) : 0
              return aDate - bDate
            }
          
            if (a.rank_order !== null && b.rank_order === null) return -1
            if (a.rank_order === null && b.rank_order !== null) return 1
          
            const aDate = a.date ? new Date(a.date) : 0
            const bDate = b.date ? new Date(b.date) : 0
            return bDate - aDate
          })
          setPhotos(sorted)
        } catch (err) {
          console.log(err.message)
        }
      }
  
      fetchPhotos()
    }, [])
  
    const handleImageLoad = (id) => {
      setLoadedImages((prev) => ({ ...prev, [id]: true }))
    }
  
    const toggleCard = (id) => {
      setActiveCards((prev) => ({ ...prev, [id]: !prev[id] }))
    }
  
    const handleYearFilter = (year) => {
      setActiveYear(year)
    }


    const sortedPhotos = photos.sort((a, b) => {
      const aRank = a.rank_order
      const bRank = b.rank_order
    
      // ✅ Case 1: Both have rank → sort by rank_order ascending
      if (aRank && bRank) {
        return aRank - bRank
      }
    
      // ✅ Case 2: Only A has rank → A comes first
      if (aRank && !bRank) return -1
    
      // ✅ Case 3: Only B has rank → B comes first
      if (!aRank && bRank) return 1
    
      // ✅ Case 4: Neither has rank → newest first by date
      return new Date(b.date) - new Date(a.date)
    })
    

    // utility to split array into chunks
function chunkArray(arr, chunkSize) {
  const chunks = []
  for (let i = 0; i < arr.length; i += chunkSize) {
    chunks.push(arr.slice(i, i + chunkSize))
  }
  return chunks
}




  
    // filter photos based on selected year
    const filteredPhotos =
      activeYear === 'all'
        ? photos
        : photos.filter((p) => p.year_select === activeYear)


        const filteredPhotosChunks = chunkArray(filteredPhotos, 4)

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
        {['all', '2025', '2024', '2023'].map((year) => (
          <button
            key={year}
            className={`yg-filter-btn ${activeYear === year ? 'yg-active' : ''}`}
            onClick={() => handleYearFilter(year)}
          >
            {year === 'all' ? 'All' : year}
          </button>
        ))}
      </div>
      </div>
      <h2 style={{padding:'0 0 0 0.75em',textTransform:'uppercase',textDecoration:'underline'}}>{activeYear}</h2>
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
    >
      <rect x="2" y="3" width="20" height="18" rx="2" ry="2"></rect>
      <line x1="2" y1="9" x2="22" y2="9"></line>
      <line x1="6" y1="21" x2="6" y2="9"></line>
      <line x1="10" y1="21" x2="10" y2="9"></line>
      <line x1="14" y1="21" x2="14" y2="9"></line>
      <line x1="18" y1="21" x2="18" y2="9"></line>
    </svg>
    <p>No photos for this year.</p>
  </div>
) : (
  <Splide aria-label="Gallery">
    {filteredPhotosChunks.map((chunk, index) => (
      <SplideSlide key={index}>
        <div className="yg-masonry-grid">
          {chunk.map((p) => {
            const isActive = !!activeCards[p.id]
            return (
              <div key={p.id} className={`gallery-item ${isActive ? 'active' : ''}`}>
                {!loadedImages[p.id] && <div className="skeleton"></div>}

                {p.imagemm && (
                  <img
                    src={p.imagemm}
                    alt={p.title || 'photo'}
                    loading="lazy"
                    onLoad={() => handleImageLoad(p.id)}
                    onError={() => handleImageLoad(p.id)}
                    className={`gallery-img ${
                      loadedImages[p.id] ? 'visible' : 'hidden'
                    }`}
                    onClick={() => toggleCard(p.id)}
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter' || e.key === ' ') toggleCard(p.id)
                    }}
                    aria-expanded={isActive}
                    role="button"
                  />
                )}

                <div
                  className={`gallery-info ${isActive ? 'visible' : ''}`}
                  aria-hidden={!isActive}
                >

                {rankCounts[p.rank_order] > 1 && p.rank_order !== null && (
<span className="duplicate-rank-dot">{p.rank_order}</span>
)}
              </div>
                  <h3>{p.title}</h3>
                  <p>{p.description}</p>
                  <p className="year">{p.year_select}</p>
                </div>
            )
          })}
        </div>
      </SplideSlide>
    ))}
  </Splide>
)}
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
