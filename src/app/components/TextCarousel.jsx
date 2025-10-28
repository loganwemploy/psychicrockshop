import React from 'react'
// css is in globals.css
const TextCarousel = () => {
  return (
    <div style={{margin:'32vh 0 2.32em 0'}}>
        <div className="content-slider">
  <div className="slider">
    <div className="mask">
      <ul>
        <li className="anim1">
          <div className="quote">To Thy Own Self Be True.</div>
          <div className="source"><button className="cta-button-carousel">Get In Touch</button></div>
        </li>
        <li className="anim2" style={{padding:'0'}}>
        <img style={{width:'100%',height:'100px'}} src="https://dl4.pushbulletusercontent2.com/HI4BmzcyvWUg84BPTirlwHAVRLk2RRZF/image.png" alt="" />
          {/* <div className="quote">Impact</div> */}
          <div className="source">- M007</div>
        </li>
        <li className="anim3">
        <div className="quote">Lets equip, uplift, and empower our youth .</div>
        <div className="source"><button className="cta-button-carousel">Together</button></div>
        </li>
        <li className="anim4" style={{padding:'0'}}>
        <img style={{width:'100%',height:'100px'}} src="https://dl4.pushbulletusercontent2.com/yGWnOrg684CoYVuNixnYv5KJkhMnu09f/image.png" alt="" />
          {/* <div className="quote">Impact</div> */}
          <div className="source">- M007</div>
        </li>
        {/* <li className="anim4">
        <div className="quote">To Thy Own Self Be True.</div>
        <div className="source"><button className="cta-button-carousel">Get In Touch</button></div>
        </li> */}
        <li className="anim5">
        <div className="quote">To Thy Own Self Be True.</div>
        <div className="source"><button className="cta-button-carousel">Get In Touch</button></div>
        </li>
      </ul>
    </div>
  </div>
</div>
    </div>
  )
}

export default TextCarousel