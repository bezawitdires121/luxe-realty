'use client'

import Link from 'next/link'
import { useEffect, useState, useRef } from 'react'
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion'
import { useAppStore } from '@/store/useAppStore'
import { NAV_LINKS, SITE_CONFIG } from '@/config/site'
import ThemeToggle from '@/components/ui/ThemeToggle'
import LanguageToggle from '@/components/ui/LanguageToggle'


function MagneticLink({ href, label }: { href: string; label: string }) {
  const ref = useRef<HTMLAnchorElement>(null)
  const x = useMotionValue(0)
  const y = useMotionValue(0)
  const sx = useSpring(x, { stiffness: 300, damping: 25 })
  const sy = useSpring(y, { stiffness: 300, damping: 25 })
  const { setCursorVariant } = useAppStore()

  return (
    <motion.a
      ref={ref}
      href={href}
      style={{ x: sx, y: sy, display: 'inline-block', position: 'relative' }}
      onMouseMove={(e) => {
        const rect = ref.current!.getBoundingClientRect()
        const cx = rect.left + rect.width / 2
        const cy = rect.top + rect.height / 2
        x.set((e.clientX - cx) * 0.3)
        y.set((e.clientY - cy) * 0.3)
      }}
      onMouseEnter={() => setCursorVariant('hover')}
      onMouseLeave={() => {
        x.set(0)
        y.set(0)
        setCursorVariant('default')
      }}
    >
      <span style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '9px',
        letterSpacing: '0.28em',
        textTransform: 'uppercase',
        color: 'rgba(242,237,228,0.45)',
        textDecoration: 'none',
        transition: 'color 300ms ease',
        cursor: 'none',
      }}
        onMouseEnter={e => (e.currentTarget.style.color = '#F2EDE4')}
        onMouseLeave={e => (e.currentTarget.style.color = 'rgba(242,237,228,0.45)')}
      >
        {label}
      </span>
    </motion.a>
  )
}

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const { navOpen, setNavOpen, setCursorVariant } = useAppStore()

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Lock body scroll when nav open
  useEffect(() => {
    document.body.style.overflow = navOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [navOpen])

  return (
    <>
      <motion.header
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          padding: '1.5rem clamp(1.5rem, 5vw, 4rem)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          transition: 'background 500ms ease, backdrop-filter 500ms ease, border-color 500ms ease',
          background: scrolled ? 'var(--header-bg)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(180%)' : 'none',
          borderBottom: scrolled ? '1px solid var(--header-border)' : '1px solid transparent',
        }}
      >
      {/* Logo */}
<Link
  href="/"
  style={{
    textDecoration: 'none',
    cursor: 'none',
  }}
  onMouseEnter={() => setCursorVariant('hover')}
  onMouseLeave={() => setCursorVariant('default')}
>
  <div style={{ lineHeight: 1 }}>
    <p
      style={{
        fontFamily: 'Cormorant Garamond, Georgia, serif',
        fontSize: '1.25rem',
        fontWeight: 400,
        letterSpacing: '0.22em',
        color: '#F2EDE4',
        lineHeight: 1,
      }}
    >
      LUXE 
    </p>

    <p
      style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '7px',
        letterSpacing: '0.4em',
        color: 'rgba(242,237,228,0.3)',
        textTransform: 'uppercase',
        marginTop: '3px',
      }}
    >
      Residences
    </p>
  </div>
</Link>

        {/* Desktop nav */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(1.5rem, 3vw, 3rem)',
          }}
          className="nav-desktop"
        >
          {NAV_LINKS.map((link) => (
            <MagneticLink key={link.href} href={link.href} label={link.label} />
          ))}
        </nav>

        {/* Right CTAs */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
  <LanguageToggle />
  <ThemeToggle />

 

  
         
          {/* Burger */}
          <button
            onClick={() => setNavOpen(!navOpen)}
            className="nav-burger"
            onMouseEnter={() => setCursorVariant('hover')}
            onMouseLeave={() => setCursorVariant('default')}
            aria-label="Menu"
            style={{
              background: 'none',
              border: 'none',
              cursor: 'none',
              padding: '8px',
              display: 'flex',
              flexDirection: 'column',
              gap: '5px',
              alignItems: 'flex-end',
            }}
          >
            {[24, 16, 20].map((w, i) => (
              <motion.span
                key={i}
                animate={{
                  width: navOpen && i === 1 ? 0 : w,
                  rotate: navOpen && i === 0 ? 45 : navOpen && i === 2 ? -45 : 0,
                  y: navOpen && i === 0 ? 7 : navOpen && i === 2 ? -7 : 0,
                }}
                style={{
                  display: 'block',
                  height: '1px',
                  background: '#F2EDE4',
                  transformOrigin: 'center',
                }}
              />
            ))}
          </button>
        </div>
      </motion.header>

      {/* Full screen mobile / overlay nav */}
      <AnimatePresence>
        {navOpen && (
          <motion.div
            key="overlay-nav"
            initial={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            animate={{ opacity: 1, clipPath: 'inset(0 0 0% 0)' }}
            exit={{ opacity: 0, clipPath: 'inset(0 0 100% 0)' }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 99,
              background: 'var(--nav-overlay-bg)',
              backdropFilter: 'blur(24px)',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              padding: 'clamp(6rem, 10vw, 8rem) clamp(2rem, 8vw, 6rem)',
            }}
          >
            {/* Nav links */}
            <nav style={{
              display: 'flex',
              flexDirection: 'column',
              gap: '0.25rem',
              marginBottom: '4rem',
            }}>
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.07, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                  onClick={() => setNavOpen(false)}
                  style={{
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: 'clamp(2.5rem, 6vw, 5rem)',
                    fontWeight: 300,
                    color: 'rgba(242,237,228,0.85)',
                    textDecoration: 'none',
                    letterSpacing: '-0.02em',
                    lineHeight: 1.15,
                    transition: 'color 300ms ease',
                    cursor: 'none',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#C9B99A')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(242,237,228,0.85)')}
                >
                  {link.label}
                </motion.a>
              ))}
            </nav>

            {/* Bottom info */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
              style={{
                display: 'flex',
                gap: '3rem',
                flexWrap: 'wrap',
              }}
            >
              {[
                { label: 'Phone', value: SITE_CONFIG.contact.phone },
                { label: 'Email', value: SITE_CONFIG.contact.email },
                { label: 'Location', value: SITE_CONFIG.location },
              ].map((item) => (
                <div key={item.label}>
                  <p style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '8px',
                    letterSpacing: '0.4em',
                    textTransform: 'uppercase',
                    color: 'rgba(201,185,154,0.5)',
                    marginBottom: '4px',
                  }}>
                    {item.label}
                  </p>
                  <p style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '0.85rem',
                    color: 'rgba(242,237,228,0.5)',
                    fontWeight: 300,
                  }}>
                    {item.value}
                  </p>
                </div>
              ))}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (min-width: 900px) { .nav-burger { display: none !important; } }
        @media (max-width: 899px) { .nav-desktop { display: none !important; } }
      `}</style>
    </>
  )
}