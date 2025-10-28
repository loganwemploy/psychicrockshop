'use client'
import React, { useEffect, useState } from 'react'

import styles from "../page.module.css";
const HeaderBar = () => {
    const [photos, setPhotos] = useState()
    // useEffect(() => {
    //  fetch('https://mmission007.org/wp-json/wp/v2/photogallerymm')
    //  .then(res => res.json())
    //  .then(data => console.log(data[0].acf.description))
    //  .catch(err=>console.log(err.message))
    // }, [])
    
    return (
        <div>
            <div className={styles.page} style={{ padding: '0', margin: '0' }}>
                <div style={{
                    height: '10px',
                    height: 'auto',
                    display: 'flex',
                    justifyContent: 'space-evenly',
                    width: '100vw',
                    maxWidth: '100%',
                    color:'white',
                    fontSize:'2em',
                    overflow: 'hidden',
                    // border: '3px solid red'
                }} className="pre-header">
                    <div className="logo-container">
                        <div className="logo" style={{display:'flex',objectFit:'fill',height:'15vh',width:'10vw'}}><img src="https://i0.wp.com/mmission007.org/wp-content/uploads/2025/06/IMG_5305-scaled.png?w=2560&ssl=1" alt="mmission007 logo" /></div>
                    </div>

                    <div className="middle-space"></div>
                   
                    <div className="pre-cta-container">
                    <button className="button">Donate</button></div>
                </div>
            </div>
        </div>
    )
}

export default HeaderBar