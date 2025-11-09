'use client'
import React, { useEffect, useState } from 'react'

import styles from "../page.module.css";
const HeaderBar = () => {
    // const [eventInfos, setEventInfos] = useState()
    // useEffect(() => {
    //  fetch('https://mmission007.org/wp-json/wp/v2/photogallerymm')
    //  .then(res => res.json())
    //  .then(data => console.log(data[0].acf.description))
    //  .catch(err=>console.log(err.message))
    // }, [])
    

    

    return (
        <div>
            <div className={styles.page} style={{ padding: '0', margin: '0' }}>
            <div id="header">
      <a href="#"
        ><img
          src="https://i0.wp.com/mmission007.org/wp-content/uploads/2025/06/IMG_5305-scaled.png?w=2560&ssl=1"
          alt="logo"
          className="logo"
      /></a>

      <input type="checkbox" id="check" />
      <label htmlFor="check" className="icons">
        <i className="bx bx-menu" id="menu-icon"></i>
        <i className="bx bx-x" id="close-icon"></i>
      </label>

      <nav className="navbar">
        <a href="#" className="nav-item" >Page 1</a>
        <a href="#" className="nav-item" >Page 2 </a>
        <a href="#" className="nav-item" >Page 3</a>
      </nav>
    </div>
            </div>
        </div>
    )
}

export default HeaderBar