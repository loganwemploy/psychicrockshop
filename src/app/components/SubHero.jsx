import React from 'react'

const SubHero = () => {
  return (
    <div style={{display:'flex',width:'100vw',justifyContent:'space-between',padding:'0 1em',
    // background:'#f1e4d4'
    }}>
        <div className="left-flex"><span>words test words</span>
        <h2 style={{fontSize:'4rem'}}>Intax <br />FujiFilm</h2>
        <p style={{maxWidth: '25ch'}}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Vitae sapiente dolores quaerat libero corporis, corrupti commodi nostrum porro distinctio omnis obcaecati neque cupiditate.</p>
        <button className='cta-button'> call to action</button>
        </div>
        {/*  */}
        <div className="right-flex">
            <div className="video-container">
                <div className="vid-box">play</div>
                <div className="vid-box">play</div>
                <div className="vid-box">play</div>
            </div>
        </div>
    </div>
  )
}

export default SubHero