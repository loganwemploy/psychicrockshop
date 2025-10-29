'use client'

import Image from "next/image";
// import styles from "./page.module.css";
import HeaderBar from "./components/HeaderBar";
import Hero from "./components/Hero";
import SubHero from "./components/SubHero";
import TextCarousel from "./components/TextCarousel";
import QuizletPaths from "./components/QuizletPaths";


export default function Home() {
  return (
    <div>
<HeaderBar/>
<Hero />
{/* <div className="spacer" style={{width:'100vw',height:'50vw'}}></div> */}
   {/* Css for this divider lives in globals.css */}
<br />
<br />
   <span className="divider">
  <span className="divider-line"></span>
  <span className="divider-text" style={{letterSpacing:'0.092em'}}>WHAT WE PROVIDE</span>
  <span className="divider-line reverse"></span>
 </span>
<br />
{/*  */}
<section class="hero-cta-section">
  <div class="hero-cta-container">
          <p style={{fontSize:'1.25em',padding:'1rem 0 3.5rem 0',marginTop:'-3rem',display:'block'}}>
         Mission 007 Mentorship empowers young people from ages 16-25 years old to overcome obstacles and build thriving futures. Through evidence-based mentoring, social-emotional learning, and career readiness programs, it supports youth (including older teens and young adults) in identifying goals, developing life skills, and transitioning into meaningful education, careers, and adult-life opportunities.
          </p>
    <div class="hero-cta-grid">
      <div class="hero-cta-content">
        <div class="hero-cta-text">
          <h2>See all Our Services </h2>
          <div class="hero-cta-button">
            <a href="#" class="hero-cta-btn">Get Started Today</a>
          </div>
        </div>
      </div>
      <div class="hero-cta-images">
        <img
          src="https://dl4.pushbulletusercontent2.com/bKZLH9qUHSbcMgL3TpoDWv6J7GdMcuHK/image.png"
          alt=""
        />
        <img
          src="https://lh3.googleusercontent.com/T4QLWWfm-ogWEQXmrrAPL3ngMDxBL4ojyom10LBpYZSRXpsNDBu7_1moWo7P_GGIlkqhNFwXLFBw7URnqsLneez9_TZMdMUaLvnqXFNV=s1236"
          alt=""
        />
      </div>
    </div>
  </div>
 
          <ul className="youth-service-list">
  <li><span className="icon">✨</span> One-on-one mentorship with a trained adult who guides goal-setting, decision-making, and personal growth.</li>
  <li><span className="icon">🤝</span> Group mentoring circles focused on social-emotional learning (SEL), leadership, and peer support.</li>
  <li><span className="icon">💼</span> Career-readiness assistance: résumé and job-application help, interview coaching, and networking opportunities.</li>
  <li><span className="icon">🎓</span> Educational support: tutoring, GED/HS diploma transition, and college application advising.</li>
  <li><span className="icon">💡</span> Life-skills workshops: budgeting, healthy relationships, time, and stress management.</li>
  <li><span className="icon">🏠</span> Transitional support: help with housing, transportation, and job placement.</li>
  <li><span className="icon">🌐</span> Peer and alumni networks to connect, mentor, and build community.</li>
  <li><span className="icon">📚</span> Access to internships, apprenticeships, and scholarship opportunities.</li>
  <li><span className="icon">🧠</span> Virtual or in-person counseling for mental health, trauma, or wellness challenges.</li>
  <li><span className="icon">👨‍👩‍👧</span> Family and community engagement workshops that build supportive environments.</li>
</ul>
<br />

</section>

{/* <TextCarousel /> */}
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
<br />
<QuizletPaths />


    </div>
  );
}
