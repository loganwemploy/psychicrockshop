"use client";

import React from 'react'
// Styles live in globals.css
const TextCarousel = () => {
  const getScrollBehavior = () =>
    typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth';

  const scrollToWhatWeProvide = () => {
    document.getElementById('what-we-provide')?.scrollIntoView({ behavior: getScrollBehavior() });
  };
  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: getScrollBehavior() });
  };
  //  I want to remove the words  trade classes and this 

// Mission Statement for Mission 007 NFP:

// "At Mission 007 NFP, our purpose is to empower and inspire youth aged 16-25 to unlock their full potential and pursue their dreams with confidence. We provide mentorship, resources, and a supportive community to help young individuals set meaningful goals, develop essential skills, and overcome challenges. Together, we ignite passion and ambition, enabling the next generation to lead with purpose and create a positive impact in their lives and communities."

// Mission 007 NFP: Goals

// The primary goals of the Mission 007 NFP mentorship organization are:
// 1. Empowerment: To empower youth aged 16-25 by building their self-confidence, leadership skills, and a growth mindset, enabling them to take charge of their personal and professional development.
// 2. Mentorship: To connect young individuals with experienced, successful mentors who can provide guidance, advice, and support to help them navigate the path towards their goals.
// 3. Skill Development: To equip youth with practical, in-demand skills across various domains, such as entrepreneurship, digital literacy, financial management, and effective communication, preparing them for future success.
// 4. Inspiration: To inspire young people to dream big, think creatively, and pursue their passions, by exposing them to role models, success stories, and innovative ideas that ignite their imagination.
// 5. Community Building: To foster a supportive, collaborative community where youth can connect with their peers, share experiences, and learn from one another, cultivating a sense of belonging and mutual encouragement.
// 6. Pathways to Success: To provide youth with access to resources, networks, and opportunities that can open doors to higher education, internships, job placements, and entrepreneurial ventures, helping them achieve their goals.

// By focusing on these key goals, Mission 007 NFP aims to empower and transform the lives of young individuals, enabling them to unlock their full potential and create a brighter future for themselves and their communities.
  return (
    <div style={{margin:'0 0 1.32em 0'}}>
        <div className="content-slider">
  <div className="slider">
    <div className="mask">
      <ul>
        <li className="anim1">
       {/* note wrapper  */}
       <div className="customer-call">
  <div className="customer-call__header">
    <h2>Empowerment</h2>
    <button type="button" className="customer-call__source" onClick={scrollToWhatWeProvide} aria-label="Learn more, scroll to What we provide">learn more</button>
  </div>

  <div className="customer-call__card">
    <div className="customer-call__actions">
      <button
        type="button"
        className="btn-accept"
        onClick={scrollToWhatWeProvide}
        aria-label="Learn more, scroll to What we provide"
      >
        ✅ Learn More Now
      </button>
      <button
        type="button"
        className="btn-contact"
        onClick={scrollToContact}
        aria-label="Contact Us, go to contact section"
      >
        Contact Us
      </button>
    </div>

    {/* <div className="customer-call__details">
      <div className="customer-call__name">Mission </div>
      <div className="customer-call__vip">007</div>
    </div> */}
  </div>
</div>

{/* emd note wrapper end */}
        </li>
        {/*  */}
        <li className="anim2">
              {/* note wrapper  */}
              <div className="customer-call" id="customer-call-2">
  <div className="customer-call__header">
    <h2>Mentorship</h2>
    <button type="button" className="customer-call__source" onClick={scrollToWhatWeProvide} aria-label="Learn more, scroll to What we provide">Learn More</button>
  </div>

  <div className="customer-call__card">
    <div className="customer-call__actions">
      <button
        type="button"
        className="btn-accept-2"
        onClick={scrollToWhatWeProvide}
        aria-label="Learn more, scroll to What we provide"
      >
        ✅ Learn More Now
      </button>
      <button
        type="button"
        className="btn-contact"
        onClick={scrollToContact}
        aria-label="Contact Us, go to contact section"
      >
        Contact Us
      </button>
    </div>

    {/* <div className="customer-call__details">
      <div className="customer-call__name">Mission</div>
      <div className="customer-call__vip">007 </div>
    </div> */}
  </div>
</div>
{/* emd note wrapper end */}
        </li>
        <li className="anim3">
              {/* note wrapper  */}
              <div className="customer-call" id="customer-call-3">
  <div className="customer-call__header">
    <h2>Skill Development</h2>
    <button type="button" className="customer-call__source" onClick={scrollToWhatWeProvide} aria-label="Learn more, scroll to What we provide">Learn More</button>
  </div>

  <div className="customer-call__card">
    <div className="customer-call__actions">
      <button
        type="button"
        className="btn-accept-2"
        onClick={scrollToWhatWeProvide}
        aria-label="Learn more, scroll to What we provide"
      >
        ✅ Learn More Now
      </button>
      <button
        type="button"
        className="btn-contact"
        onClick={scrollToContact}
        aria-label="Contact Us, go to contact section"
      >
        Contact Us
      </button>
    </div>

    {/* <div className="customer-call__details">
      <div className="customer-call__name">Mission</div>
      <div className="customer-call__vip">007 </div>
    </div> */}
  </div>
</div>
{/* emd note wrapper end */}
        </li>
        <li className="anim4">
              {/* note wrapper  */}
              <div className="customer-call" id="customer-call-4">
  <div className="customer-call__header">
    <h2>Inspiration / Pathways to Success</h2>
    <button type="button" className="customer-call__source" onClick={scrollToWhatWeProvide} aria-label="Learn more, scroll to What we provide">Learn More</button>
  </div>

  <div className="customer-call__card">
    <div className="customer-call__actions">
      <button
        type="button"
        className="btn-accept-2"
        onClick={scrollToWhatWeProvide}
        aria-label="Learn more, scroll to What we provide"
      >
        ✅ Learn More Now
      </button>
      <button
        type="button"
        className="btn-contact"
        onClick={scrollToContact}
        aria-label="Contact Us, go to contact section"
      >
        Contact Us
      </button>
    </div>

    {/* <div className="customer-call__details">
      <div className="customer-call__name">Mission</div>
      <div className="customer-call__vip">007 </div>
    </div> */}
  </div>
</div>
{/* emd note wrapper end */}
        </li>
        <li className="anim5">
              {/* note wrapper  */}
              <div className="customer-call" id="customer-call-5">
  <div className="customer-call__header">
    <h2>Community Building</h2>
    <button type="button" className="customer-call__source" onClick={scrollToWhatWeProvide} aria-label="Learn more, scroll to What we provide">Learn More</button>
  </div>

  <div className="customer-call__card">
    <div className="customer-call__actions">
      <button
        type="button"
        className="btn-accept-2"
        onClick={scrollToWhatWeProvide}
        aria-label="Learn more, scroll to What we provide"
      >
        ✅ Learn More Now
      </button>
      <button
        type="button"
        className="btn-contact"
        onClick={scrollToContact}
        aria-label="Contact Us, go to contact section"
      >
        Contact Us
      </button>
    </div>

    {/* <div className="customer-call__details">
      <div className="customer-call__name">Mission</div>
      <div className="customer-call__vip">007 </div>
    </div> */}
  </div>
</div>


{/* emd note wrapper end */}
        </li>
        {/* <li className="anim4" style={{padding:'0'}}>
        <div className="hero__cta">
					<img style={{maxWidth:'3em'}} src="https://dl4.pushbulletusercontent2.com/dGLvQNacaSYF4R560iIwxmyBlN0xWAat/IMG_0937.jpg" alt=""/>
					<p className="cta__txt">
						From cityscapes to beaches, we guide you. We handle details so you can focus on getting lost in the moment.
					</p>

					<a href="#" className="cta__btn btn">
						<span className="btn-txt">EXPLORE TRIPS</span>
						<svg xmlns="http://www.w3.org/2000/svg" width="18" height="14" fill="none">
							<path fill="#fff" d="m17.76 6.857-5.727-5.688a.821.821 0 0 0-1.147.01.81.81 0 0 0-.01 1.139l4.33 4.3H.819a.821.821 0 0 0-.578.238.81.81 0 0 0 .578 1.388h14.389l-4.33 4.3a.813.813 0 0 0-.19.892.813.813 0 0 0 .765.505.824.824 0 0 0 .581-.248l5.727-5.688a.81.81 0 0 0 0-1.148Z" />
						</svg>
					</a>
		
			</div>
        </li> */}
      {/*  */}
      {/*  */}
        {/* <li className="anim4">
        <div className="customer-call">
  <div className="customer-call__header">
    <h2>Customer Call</h2>
    <div className="customer-call__source">School Supplies &amp; Resources</div>
  </div>

  <div className="customer-call__card">
    <div className="customer-call__actions">
      <button type="button" className="btn-accept" onClick={scrollToWhatWeProvide}>✅ Learn More Now</button>
      <button type="button" className="btn-contact" onClick={scrollToContact}>Contact Us</button>
    </div>

    <div className="customer-call__details">
      <div className="customer-call__name">Mission</div>
      <div className="customer-call__vip">007</div>
    </div>
  </div>
</div>
        </li> */}
        {/* <li className="anim5">
        <div className="quote">To Thy Own Self Be True.</div>
        <div className="source"><button className="cta-button-carousel">Get In Touch</button></div>
        </li> */}
      </ul>
    </div>
  </div>
</div>
    </div>
  )
}

export default TextCarousel