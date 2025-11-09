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
  
  const [eventInfos, setEventInfos] = useState();
  
  // const [visibleTiles, setVisibleTiles] = useState(2)


  async function getEvents() {
    try {
      const url = "https://mmission007.org/wp-json/wp/v2/eventinfo";
      const res = await fetch(url);
      const data = await res.json();

      // Extract only the ACF data for each event
      // event_image now contains the actual URL
      const acfArray = data.map(event => ({
        ...event.acf,
        event_image: event.acf.event_image // this is now the URL
      }));

      console.log(acfArray);
      setEventInfos(acfArray);
    } catch (err) {
      console.log(err.message);
    }
  }
  
useEffect(() => {
getEvents()
}, [])
  
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
      const handleClickOutside = (e) => {
        // Close all active overlays if clicked outside any gallery-item
        if (!e.target.closest('.gallery-item')) {
          setActiveCards({});
        }
      };
    
      document.addEventListener('click', handleClickOutside);
      return () => {
        document.removeEventListener('click', handleClickOutside);
      };
    }, []);
    



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




// EVENTS


  return (
    <div>
      <HeaderBar />
      <Hero />
      {/* <div className="spacer" style={{width:'100vw',height:'50vw'}}></div> */}
      {/* Css for this divider lives in globals.css */}
        {/* waves */}

        <div className="space" style={{ width: "100vw", height: "4.32em",background:'#443f42' }}></div>
      {/* // <!-- Wave Divider Section --> */}
      
        <div className="wave-divider">
          <svg
            data-name="Layer 1"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 1200 120"
            preserveAspectRatio="none"
          >
            <path
              d="M0,0V46.29c47.79,22.2,103.59,32.17,158,28,70.36-5.37,136.33-33.31,206.8-37.5C438.64,32.43,512.34,53.67,583,72.05c69.27,18,138.3,24.88,209.4,13.08,36.15-6,69.85-17.84,104.45-29.34C989.49,25,1113-14.29,1200,52.47V0Z"
              opacity=".25"
              className="shape-fill"
            ></path>
            <path
              d="M0,0V15.81C13,36.92,27.64,56.86,47.69,72.05,99.41,111.27,165,111,224.58,91.58c31.15-10.15,60.09-26.07,89.67-39.8,40.92-19,84.73-46,130.83-49.67,36.26-2.85,70.9,9.42,98.6,31.56,31.77,25.39,62.32,62,103.63,73,40.44,10.79,81.35-6.69,119.13-24.28s75.16-39,116.92-43.05c59.73-5.85,113.28,22.88,168.9,38.84,30.2,8.66,59,6.17,87.09-7.5,22.43-10.89,48-26.93,60.65-49.24V0Z"
              opacity=".5"
              className="shape-fill"
            ></path>
           <path
  d="M0,0V5.63C149.93,59,314.09,71.32,475.83,42.57c43-7.64,84.23-20.12,127.61-26.46,59-8.63,112.48,12.24,165.56,35.4C827.93,77.22,886,95.24,951.2,90c86.53-7,172.46-45.71,248.8-84.81V0Z"
  fill="#443f42"
/>
          </svg>
        </div>
 
      
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
         <div className="spacer"></div>
         <div className="spacer"></div>
         <div className="spacer"></div>
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
<div className="spacer"></div>
        <section className="hero-section">
          <h2 style={{ fontSize: "2em" }}>{eventInfos?.event_name}</h2>
          <h6> {eventInfos?.event_description}</h6>
          <div className="hero-text">
            <div className="hero-content">
            
<span className="divider">
  <span className="divider-line"></span>
  <span className="divider-text" style={{ letterSpacing: "0.092em" }}>
    Take a quick &amp; free quiz
  </span>
  <span className="divider-line reverse"></span>
</span>
<QuizletPaths />
            </div>
          </div>
{/* okkkk */}
      <br />
     <div className="spacer"></div>
     <div className="spacer"></div>
     <div className="spacer"></div>
<span className="divider" style={{width:'100%'}}>
        <span className="divider-line"></span>
        <span className="divider-text" style={{ margin:'auto',letterSpacing: "0.092em", textAlign:'center' }}>
          UPCOMING EVENTS
          {/* {photos} */}
        </span>
        <span className="divider-line reverse"></span>
      </span>
      <br />
     <div className="spacer"></div>
{/* end divider */}
{eventInfos?.map((event, index) => {
    const dateObj = new Date(event.date_and_time);
    const month = dateObj.toLocaleString("en-US", { month: "short" }).toUpperCase();
    const day = dateObj.getDate();
    const startTime = dateObj.toLocaleTimeString("en-US", {
      hour: "numeric",
      minute: "2-digit",
    });

    return (
      <article key={index} className="event-card">
        
        {/* Left side */}
        <div className="event-left">
          <div className="event-date-box">
            <span className="event-month">{month}</span>
            <span className="event-day">{day}</span>
          </div>

          <div className="event-details">
            <p><strong>Time:</strong><br /> {startTime} – {event.event_end_time}</p>
            <p><strong>Location:</strong><br /> {event.event_location_name}</p>
            <p><strong>Address:</strong> <br />{event.event_address}</p>
            <p><strong>Category:</strong><br /> {event.event_category}</p>
          </div>
        </div>

        {/* Right side */}
        <div className="event-right">
          {event.event_image && (
            <div className="event-image">
              <img src='https://dl4.pushbulletusercontent2.com/kAHMs1AaqTnU3TxzyRWiVsvVBqLeJh6M/IMG_2231.JPG' alt={event.event_name} />
            </div>
          )}

          <h3 className="event-title">{event.event_name}</h3>
          <p className="event-description">{event.event_description}</p>

          <a href="#" className="event-button">Learn More</a>
        </div>
      </article>
    );
  })}



{/* {eventInfos?.map((event, i) => (
  <div key={i} className="event-card">

    <h3>{event.event_name}</h3>

    {event.event_image && (
      <img
        src={event.event_image}
        alt={event.event_name}
        style={{ width: "100%", borderRadius: "8px" }}
      />
    )}

    <p>{event.event_description}</p>

    <p><strong>Start:</strong> {event.date_and_time}</p>
    <p><strong>End:</strong> {event.event_end_time}</p>

    <p><strong>Where:</strong> {event.event_location_name}</p>
    <p>{event.event_address}</p>

    <p><strong>Category:</strong> {event.event_category}</p>

  </div>
))} */}

{/* okkk */}
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
          const isActive = !!activeCards[p.id];

          return (
            <div
              key={p.id}
              className="gallery-item"
              onClick={() => toggleCard(p.id)}
            >
              {/* Skeleton for lazy loading */}
              {!loadedImages[p.id] && <div className="skeleton"></div>}

              {/* Full-size image */}
              {p.imagemm && (
                <img
                  src={p.imagemm}
                  alt={p.title || 'photo'}
                  loading="lazy"
                  onLoad={() => handleImageLoad(p.id)}
                  onError={() => handleImageLoad(p.id)}
                  className={`gallery-img ${loadedImages[p.id] ? 'visible' : 'hidden'}`}
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') toggleCard(p.id);
                  }}
                  aria-expanded={isActive}
                  role="button"
                  style={{ width: '100%', height: 'auto', cursor: 'pointer' }}
                />
              )}

              {/* Overlay with text and duplicate dot */}
              <div
                className={`gallery-info ${isActive ? 'visible' : ''}`}
                aria-hidden={!isActive}
                onClick={(e) => e.stopPropagation()} // prevent overlay click from toggling
              >
                {rankCounts[p.rank_order] > 1 && p.rank_order !== null && (
                  <span className="duplicate-rank-dot">{p.rank_order}</span>
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
    </div>
  );
}
