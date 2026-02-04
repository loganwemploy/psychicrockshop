'use client'
import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

import styles from "../page.module.css";
const HeaderBar = () => {
    // const [eventInfos, setEventInfos] = useState()
    // useEffect(() => {
    //  fetch('https://mmission007.org/wp-json/wp/v2/photogallerymm')
    //  .then(res => res.json())
    //  .then(data => console.log(data[0].acf.description))
    //  .catch(err=>console.log(err.message))
    // }, [])
    

    

    const pathname = usePathname()

    const isHome = pathname === '/'

    const navLinkClass = (href, extraClass = '') => {
      const isActive = !isHome && pathname === href
      return `nav-item${isActive ? ' nav-item-active' : ''}${extraClass ? ` ${extraClass}` : ''}`
    }

    return (
        <div>
            <div className={styles.page} style={{ padding: '0', margin: '0' }}>
            <div id="header" className={isHome ? 'header--home' : ''}>
      <Link href="/"
        ><img
          src="https://i0.wp.com/mmission007.org/wp-content/uploads/2025/06/IMG_5305-scaled.png?w=2560&ssl=1"
          alt="logo"
          className="logo"
      /></Link>

      <input type="checkbox" id="check" />
      <label htmlFor="check" className="icons">
        <i className="bx bx-menu" id="menu-icon"></i>
        <i className="bx bx-x" id="close-icon"></i>
      </label>

      <nav className="navbar">
        <Link
          href="/about-us"
          className={navLinkClass('/about-us')}
          aria-current={pathname !== '/' && pathname === '/about-us' ? 'page' : undefined}
        >
          About Us
        </Link>
        <Link
          href="/how-you-can-help"
          className={navLinkClass('/how-you-can-help')}
          aria-current={pathname !== '/' && pathname === '/how-you-can-help' ? 'page' : undefined}
        >
          How You Can Help
        </Link>
        <Link
          href="/learn-where-to-start"
          className={navLinkClass('/learn-where-to-start', 'nav-cta')}
          aria-current={pathname !== '/' && pathname === '/learn-where-to-start' ? 'page' : undefined}
        >
          Learn Where to Start
        </Link>
      </nav>
    </div>
    {!isHome && <div className="header-spacer" />}
            </div>
        </div>
    )
}

export default HeaderBar