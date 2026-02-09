'use client'
import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useNavTransition } from './NavTransitionOverlay'

import styles from "../page.module.css";
const HeaderBar = () => {
    const [menuOpen, setMenuOpen] = useState(false)
    const { startTransition } = useNavTransition()

    const pathname = usePathname()

    const isHome = pathname === '/'

    const navLinkClass = (href, extraClass = '', isActiveWhen) => {
      const isActive = isActiveWhen ? isActiveWhen() : (!isHome && pathname === href)
      return `nav-item${isActive ? ' nav-item-active' : ''}${extraClass ? ` ${extraClass}` : ''}`
    }
    const isBlogActive = () => pathname === '/blog' || (pathname?.startsWith && pathname.startsWith('/blog/'))

    const closeMenu = () => setMenuOpen(false)

    const handleNavClick = (e, href) => {
      if (href === pathname) return
      e.preventDefault()
      closeMenu()
      startTransition(href)
    }

    return (
        <div>
            <div className={styles.page} style={{ padding: '0', margin: '0' }}>
            <div id="header" className={isHome ? 'header--home' : 'header--with-home'}>
      <Link href="/" onClick={(e) => { if (pathname !== '/') { e.preventDefault(); closeMenu(); startTransition('/'); } else closeMenu(); }}
        ><img
          src="https://i0.wp.com/mmission007.org/wp-content/uploads/2025/06/IMG_5305-scaled.png?w=2560&ssl=1"
          alt="logo"
          className="logo"
      /></Link>

      <input
        type="checkbox"
        id="check"
        checked={menuOpen}
        onChange={(e) => setMenuOpen(e.target.checked)}
        aria-expanded={menuOpen}
      />
      <label htmlFor="check" className="icons">
        <i className="bx bx-menu" id="menu-icon"></i>
        <i className="bx bx-x" id="close-icon"></i>
      </label>

      <nav className="navbar">
        {!isHome && (
          <Link
            href="/"
            className={navLinkClass('/', '', () => false)}
            onClick={(e) => handleNavClick(e, '/')}
          >
            Home
          </Link>
        )}
        <Link
          href="/about-us"
          className={navLinkClass('/about-us')}
          aria-current={pathname !== '/' && pathname === '/about-us' ? 'page' : undefined}
          onClick={(e) => handleNavClick(e, '/about-us')}
        >
          About Us
        </Link>
        <Link
          href="/how-you-can-help"
          className={navLinkClass('/how-you-can-help')}
          aria-current={pathname !== '/' && pathname === '/how-you-can-help' ? 'page' : undefined}
          onClick={(e) => handleNavClick(e, '/how-you-can-help')}
        >
          How You Can Help
        </Link>
        <Link
          href="/photogallery"
          className={navLinkClass('/photogallery')}
          aria-current={pathname !== '/' && pathname === '/photogallery' ? 'page' : undefined}
          onClick={(e) => handleNavClick(e, '/photogallery')}
        >
          Photo Gallery
        </Link>
        <Link
          href="/blog"
          className={navLinkClass('/blog', '', isBlogActive)}
          aria-current={pathname === '/blog' || pathname?.startsWith?.('/blog/') ? 'page' : undefined}
          onClick={(e) => handleNavClick(e, '/blog')}
        >
          Blog
        </Link>
        <Link
          href="/shop"
          className={navLinkClass('/shop')}
          aria-current={pathname !== '/' && pathname === '/shop' ? 'page' : undefined}
          onClick={(e) => handleNavClick(e, '/shop')}
        >
          Shop
        </Link>
        <Link
          href="/learn-where-to-start"
          className={navLinkClass('/learn-where-to-start', 'nav-cta')}
          aria-current={pathname !== '/' && pathname === '/learn-where-to-start' ? 'page' : undefined}
          onClick={(e) => handleNavClick(e, '/learn-where-to-start')}
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