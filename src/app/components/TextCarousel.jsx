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
        <img style={{width:'100vw',height:'auto'}} src="https://dl4.pushbulletusercontent2.com/hltRXVS11mozZbgkYDpICW2EfDeNqMtf/image.png" alt="" />
          <div className="quote">maybe a caption</div>
          <div className="source">- Another person</div>
        </li>
        <li className="anim3">
          <div className="quote">Hello, this is a quote from an animal.</div>
          <div className="source">- Animal</div>
        </li>
        <li className="anim4">
          <div className="quote">Hello, this is a quote from a plant.</div>
          <div className="source">- Plant</div>
        </li>
        <li className="anim5">
          <div className="quote">How do ya like that.</div>
          <div className="source">- Cassidy</div>
        </li>
      </ul>
    </div>
  </div>
</div>
    </div>
  )
}

export default TextCarousel