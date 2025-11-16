'use client'
import React, {useState} from 'react'
import TextCarousel from './TextCarousel'

const Hero = () => {
    const [ isFoundersMessageActive, setIsFoundersMessageActive ] = useState(false)
    // quote for founders message
    const foundersMessage = "As a dedicated mentor with Mission 007 Mentorship, I am passionate about empowering young individuals to unlock their full potential and achieve their goals. With a certification in mentoring and counseling, I also bring 20 years of experience in tutoring, coaching, or mentoring for students or young adults, helping them with academic subjects, extracurricular activities, or personal development. and a commitment to making a positive impact in the lives of youth. My approach to mentorship is rooted in empathy, active listening, and personalized guidance. I believe in creating a safe and supportive environment where mentees feel empowered to explore their interests, overcome challenges, and pursue their dreams. Whether it’s offering academic support, career advice, or personal development guidance, I am committed to providing mentees with the tools and resources they need to succeed. I am excited to be Founder of Mission 007 Mentorship because I believe in the power of mentorship to transform lives and communities. By sharing my knowledge, skills, and experiences, I hope to inspire the next generation of leaders, innovators, and changemakers. Outside of mentoring, I enjoy watching movies and decorating for party and am actively involved in church. I Have pursued personal development and self-improvement activities that have equipped me with valuable insights and skills for mentoring others. For example, attending workshops, reading books, and participating in online courses related to communication, leadership, or personal growth. I look forward to connecting with mentees and making a meaningful difference in their lives through Mission 007 Mentorship. Feel free to reach out to me if you have any questions or would like to learn more about how I can support you on your journey."

// shortened founders message
const shortFoundersMessage = "As a dedicated mentor with Mission 007 Mentorship, I am passionate about empowering young individuals to unlock their full potential and achieve their goals. With a certification in mentoring and counseling, I also bring 20 years of experience in tutoring, coaching, or mentoring for students or young adults, helping them with academic subjects, extracurricular activities, or personal development. and a commitment to making a positive impact in the lives of youth. My approach to mentorship is rooted in empathy, active listening, and personalized guidance."

    return (
<div>
        <div className='hero' style={
            { 
            width: '100vw',
            
            height: 'auto',
            minHeight:'50vh',
            overflow: 'hidden',
            display:'flex',
            flexDirection:'column',
            margin:'3.2ch 0 0 0'
            // background: '#f1e4d4'
         }
            }>
              {/*  */}
              <br/>
               <span className="divider" style={{marginTop:'5rem',padding:'0 0 1em 0'}}>
  <span className="divider-line"></span>
  <span className="divider-text" style={{letterSpacing:'0.092em',textAlign:'center'}}>WELCOME TO <br/><strong style={{fontSize:'1.12rem'}}>MISSION 007 MENTORSHIP</strong></span>
  <span className="divider-line reverse"></span>
 </span>
 {/*end divider  */}
 {/* start */}

 {/* end */}
        <TextCarousel />
        {/* Css for this divider lives in globals.css */}
        <span className="divider" style={{marginTop:'0.52em'}}>
  <span className="divider-line"></span>
  <span className="divider-text" style={{letterSpacing:'0.092em'}}>WHO ARE WE?</span>
  <span className="divider-line reverse"></span>
 </span>
<br />
{/*  */}
       <div className="anchored" style={{backgroundColor:'rgba(0,0,0,0)',height:'auto',width:'100vw'}}>
       <h1 style={{ fontSize: '1.92ch',textAlign:'left',paddingLeft:'2.5em',width:'88%',lineHeight:'1.4',filter:'contrast(1.5)',textShadow:'2px 3px solid rgba(0,0,0,0.32)' }}>At Mission 007 NFP <span style={{fontWeight:'normal'}}>our purpose is to empower and inspire youth ages 16-25 to unlock their full potential and pursue their dreams with confidence. We provide mentorship, resources, and a supportive community to help young individuals set meaningful goals, develop essential skills, and overcome challenges.	</span></h1>
       <button className="button" style={{left:'50%'}}>Contact Us Now</button>
       
       <blockquote style={{marginTop:'1.88em'}}> Together, we ignite passion and ambition, enabling the next generation to lead with purpose and create a positive impact in their lives and communities.</blockquote>
{/* testimonial tailwnd-esque */}
       <div className="testimonial-wrapper">
  <div className="testimonial-card">
    <div className="testimonial-avatar-wrapper">
      <div className="testimonial-avatar">
        <img style={{maxWidth:'100%'}} src="https://i0.wp.com/mmission007.org/wp-content/uploads/2024/05/01000a85-2e5d-41d5-bb6a-7fee43cb3b61-e1715865192308.jpeg?w=472&ssl=1" alt="Shauntia V." />
      </div>
    </div>

    <div className="testimonial-content">
    <div className="testimonial-footer">
      <p className="testimonial-name">Shauntia V.</p>
      <p className="testimonial-handle">@mMission007</p>
      <br />
    </div>
      {/* <div className="tquote quote-open">“</div> */}
      <p className="testimonial-text">
   { isFoundersMessageActive ? `${foundersMessage} ...` : `${shortFoundersMessage}` }
{/* TODO TOGGLE THE FULL QUOTE VS SHORTENED QUOTE */}
<br />
    <button className="button" style={{background:'none',padding:'0.2em',color:'#1839cb'}}
    onClick={()=>{setIsFoundersMessageActive(!isFoundersMessageActive)}}>see { isFoundersMessageActive ? 'shortened' : 'full'} founders message</button>
      {/* quote put to variable so can be toggled programatically */}
      </p>
      {/* <div className="quote quote-close">”</div> */}
    </div>

  </div>
</div>{/* end testimonial tailwnd-esque */}
       </div>  {/* end anchored' class */}

{/* newnewnew */}

{/* end new */}
        </div>
        {/* end hero */}
    </div>

    )
}

export default Hero