import React from 'react'
// css is in globals.css
const TextCarousel = () => {
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
    <h2>Career Coaching</h2>
    <div className="customer-call__source">learn more</div>
  </div>

  <div className="customer-call__card">
    <div className="customer-call__actions">
      <button className="btn-accept">✅ Register Now</button>
      <button className="btn-decline">✖️</button>
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
    <h2>Life-Skills Workshops</h2>
    <div className="customer-call__source">Learn More</div>
  </div>

  <div className="customer-call__card">
    <div className="customer-call__actions">
      <button className="btn-accept-2">✅ Register Now</button>
      <button className="btn-decline-2">✖️</button>
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
    <h2>Life-Skills Workshops</h2>
    <div className="customer-call__source">Learn More</div>
  </div>

  <div className="customer-call__card">
    <div className="customer-call__actions">
      <button className="btn-accept-2">✅ Register Now</button>
      <button className="btn-decline-2">✖️</button>
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
					<img style={{maxWidth:'3em'}} src="https://i0.wp.com/mmission007.org/wp-content/uploads/2025/06/IMG_5305-scaled.png?w=2560&ssl=1" alt=""/>
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
        <li className="anim4">
        <div className="customer-call">
  <div className="customer-call__header">
    <h2>Customer Call</h2>
    <div className="customer-call__source">School Supplies &amp; Resources</div>
  </div>

  <div className="customer-call__card">
    <div className="customer-call__actions">
      <button className="btn-accept">✅ Register Now</button>
      <button className="btn-decline">✖️</button>
    </div>

    <div className="customer-call__details">
      <div className="customer-call__name">Mission</div>
      <div className="customer-call__vip">007</div>
    </div>
  </div>
</div>
        </li>
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