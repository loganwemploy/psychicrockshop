"use client";

import HeaderBar from "./components/HeaderBar";
import Hero from "./components/Hero";
import SubHero from "./components/SubHero";
import TextCarousel from "./components/TextCarousel";
import QuizletPaths from "./components/QuizletPaths";
import QuickLinksModal from "./components/QuickLinksModal";
import PhotoGallery from "./components/PhotoGallery";
import BlogCarousel from "./components/BlogCarousel";
import WhatWeProvideSection from "./components/WhatWeProvideSection";
import { activeBlogPosts } from "./blog/_data";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {
  const [eventInfos, setEventInfos] = useState();


  async function getEvents() {
    try {
      const url = "https://mmission007.org/wp-json/wp/v2/eventinfo";
      const res = await fetch(url);
      const data = await res.json();

      // Extract only the ACF data for each event
      // event_image now contains the actual URL
      const acfArray = data.map(event => ({
        ...event.acf,
        event_image: event.acf.event_image
      }));

      console.log(acfArray);
      setEventInfos(acfArray);
    } catch (err) {
      console.log(err.message);
    }
  }
  
  useEffect(() => {
    getEvents();
  }, []);


  return (
    <div>
      <HeaderBar />
      <QuickLinksModal />
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
      <span id="what-we-provide" className="divider" style={{ marginTop: "12em" }}>
        <span className="divider-line"></span>
        <span className="divider-text" style={{ letterSpacing: "0.092em", fontWeight: "bold" }}>
          WHAT WE PROVIDE
          {/* {photos} */}
        </span>
        <span className="divider-line reverse"></span>
      </span>
      <br />
      <WhatWeProvideSection />
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
          <div className="quiz-scroll-cta-wrap">
            <button
              type="button"
              className="quiz-scroll-cta"
              onClick={() => document.getElementById("quiz")?.scrollIntoView({ behavior: typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth" })}
              aria-label="Take our quick quiz to find your next step"
            >
              Take our quick quiz to find your next step <span className="them007-card__cta-arrow" aria-hidden>→</span>
            </button>
          </div>
          <span className="divider blog-section-divider" style={{width:'100%'}}>
            <span className="divider-line"></span>
            <span className="divider-text" style={{ letterSpacing: "0.092em", fontWeight: "bold" }}>
              OUR BLOG
            </span>
            <span className="divider-line reverse"></span>
          </span>
          <p className="blog-intro">
            Stories, updates, and insights from our work with youth. You can read every post on our blog page.
          </p>
          <div className="spacer"></div>
          <BlogCarousel posts={activeBlogPosts} />
          <div className="spacer"></div>
          <div className="blog-view-all-wrap">
            <Link href="/blog" className="blog-view-all-cta">
              View our entire blog <span className="them007-card__cta-arrow" aria-hidden>→</span>
            </Link>
          </div>
          <div className="spacer"></div>

          <div id="contact" className="hero-cta-grid" style={{ marginTop: "1.32em" }}>
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
            <span className="divider-text" style={{ letterSpacing: "0.092em", fontWeight: "bold" }}>
              SUMMARY OF SERVICES
            </span>
            <span className="divider-line reverse"></span>
          </span>
          {/*  */}
        </div>
        {/*  */}

        <ul className="youth-service-list">
          <li>
            <span className="icon">✨</span>{" "}
            <strong>Empowerment</strong>: To empower youth ages 16-25 by building their self-confidence, leadership skills, and a growth mindset, enabling them to take charge of their personal and professional development.
          </li>
          <li>
            <span className="icon">🤝</span>
            <strong>Mentorship</strong>: To connect young individuals with experienced, successful mentors who can provide guidance, advice, and support to help them navigate the path towards their goals.
          </li>
          <li>
            <span className="icon">💼</span>
            <strong>Skill Development</strong>: To equip youth with practical, in-demand skills across various domains, such as entrepreneurship, digital literacy, financial management, and effective communication, preparing them for future success.
          </li>
          <li>
            <span className="icon">🎓</span>{" "}
            <strong>Inspiration:</strong>: To inspire young people to dream big, think creatively, and pursue their passions, by exposing them to role models, success stories, and innovative ideas that ignite their imagination.
          </li>
          <li>
            <span className="icon">💡</span>{" "}
            <strong>Community Building</strong>: To foster a supportive, collaborative community where youth can connect with their peers, share experiences, and learn from one another, cultivating a sense of belonging and mutual encouragement.
          </li>
          <li>
            <span className="icon">🏠</span>{" "}
            <strong>Pathways to Success</strong>: To provide youth with access to resources, networks, and opportunities that can open doors to higher education, internships, job placements, and entrepreneurial ventures, helping them achieve their goals.
          </li>
          {/* <li>
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
          </li> */}
        </ul>

<div className="spacer"></div>
<div className="spacer"></div>
        <blockquote>By focusing on these key goals, <strong>Mission 007 NFP</strong> aims to empower and transform the lives of young individuals, enabling them to unlock their full potential and create a brighter future for themselves and their communities.</blockquote>
        <br />
<div className="spacer"></div>
<div className="spacer"></div>
<div className="spacer"></div>
        <section className="hero-section">
          <h2 style={{ fontSize: "2em" }}>{eventInfos?.event_name}</h2>
          <h6> {eventInfos?.event_description}</h6>
          <div className="hero-text">
            <div className="hero-content">
            
<div id="quiz">
<span className="divider">
  <span className="divider-line"></span>
  <span className="divider-text" style={{ letterSpacing: "0.092em", fontWeight: "bold" }}>
    TAKE A QUICK &amp; FREE QUIZ
  </span>
  <span className="divider-line reverse"></span>
</span>
<QuizletPaths />
</div>
            </div>
          </div>
{/* okkkk */}
      <br />
     <div className="spacer"></div>
     <div className="spacer" style={{height:'7.5em',width:'10px'}}></div>
    
<span className="divider" style={{width:'100%'}}>
        <span className="divider-line"></span>
        <span className="divider-text" style={{ margin:'auto', letterSpacing: "0.092em", textAlign:'center', fontWeight: "bold" }}>
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
      <div className="spacer"></div>
      <div className="spacer" style={{height:'7.5em',width:'10px'}}></div>

      <span className="divider" style={{width:'100%'}}>
        <span className="divider-line"></span>
        <span className="divider-text" style={{ margin:'auto', letterSpacing: "0.092em", textAlign:'center', fontWeight: "bold" }}>
          PHOTO GALLERY
        </span>
        <span className="divider-line reverse"></span>
      </span>
      <br />
      <div className="spacer" style={{height:'2.3em'}}></div>

      <PhotoGallery />
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
