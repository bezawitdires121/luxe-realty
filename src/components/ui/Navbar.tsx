'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const links = [
  { label: 'Residences', href: '#residences' },
  { label: 'The Tower', href: '#tower' },
  { label: 'Amenities', href: '#amenities' },
  { label: 'Penthouses', href: '#penthouses' },
  { label: 'Enquire', href: '#contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)

  const [darkMode, setDarkMode] = useState(true)
  const [language, setLanguage] = useState('EN')

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 80)

    window.addEventListener('scroll', fn, { passive: true })

    return () => window.removeEventListener('scroll', fn)
  }, [])

  return (
    <motion.header
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.3, duration: 1 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        padding: '1.5rem clamp(1.5rem, 4vw, 3rem)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        transition: 'all 600ms ease',
        background: scrolled
          ? darkMode
            ? 'rgba(5,5,8,0.85)'
            : 'rgba(245,241,232,0.85)'
          : 'transparent',
        backdropFilter: scrolled ? 'blur(16px)' : 'none',
        borderBottom: scrolled
          ? darkMode
            ? '1px solid rgba(242,237,228,0.04)'
            : '1px solid rgba(5,5,8,0.06)'
          : 'none',
      }}
    >
      {/* LOGO */}
      <a
        href="/"
        style={{
          display: 'flex',
          flexDirection: 'column',
          textDecoration: 'none',
        }}
      >
        <span
          style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '1.1rem',
            fontWeight: 400,
            letterSpacing: '0.2em',
            color: darkMode ? '#F2EDE4' : '#050508',
            lineHeight: 1,
          }}
        >
          LUXE
        </span>

        <span
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '7px',
            letterSpacing: '0.35em',
            color: darkMode
              ? 'rgba(242,237,228,0.35)'
              : 'rgba(5,5,8,0.4)',
            textTransform: 'uppercase',
            marginTop: '2px',
          }}
        >
          RESIDENCES
        </span>
      </a>

      {/* DESKTOP NAV */}
      <div
        className="desktop-nav"
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '2rem',
        }}
      >
        {/* LINKS */}
        <nav
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 'clamp(1.5rem, 3vw, 3rem)',
          }}
        >
          {links.map((link) => (
            <a
              key={link.label}
              href={link.href}
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '9px',
                letterSpacing: '0.25em',
                textTransform: 'uppercase',
                color: darkMode
                  ? 'rgba(242,237,228,0.5)'
                  : 'rgba(5,5,8,0.6)',
                textDecoration: 'none',
                transition: 'color 300ms ease',
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.color = darkMode
                  ? '#F2EDE4'
                  : '#050508'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.color = darkMode
                  ? 'rgba(242,237,228,0.5)'
                  : 'rgba(5,5,8,0.6)'
              }}
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* LANGUAGE */}
        <button
          onClick={() =>
            setLanguage(language === 'EN' ? 'AR' : 'EN')
          }
          style={{
            background: 'transparent',
            border: 'none',
            color: darkMode ? '#F2EDE4' : '#050508',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '9px',
            letterSpacing: '0.3em',
            cursor: 'pointer',
          }}
        >
          {language}
        </button>

        {/* DARK MODE */}
        <button
          onClick={() => {
            setDarkMode(!darkMode)

            document.body.style.background = darkMode
              ? '#F5F1E8'
              : '#050508'

            document.body.style.color = darkMode
              ? '#050508'
              : '#F2EDE4'
          }}
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '999px',
            border: darkMode
              ? '1px solid rgba(255,255,255,0.12)'
              : '1px solid rgba(5,5,8,0.12)',
            background: 'transparent',
            color: darkMode ? '#F2EDE4' : '#050508',
            cursor: 'pointer',
            fontSize: '13px',
            transition: '300ms ease',
          }}
        >
          {darkMode ? '◐' : '◑'}
        </button>

        {/* PRIVATE VIEWING */}
        <a
          href="#contact"
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '9px',
            letterSpacing: '0.25em',
            textTransform: 'uppercase',
            color: darkMode
              ? 'rgba(242,237,228,0.7)'
              : 'rgba(5,5,8,0.8)',
            textDecoration: 'none',
            padding: '0.6rem 1.2rem',
            border: darkMode
              ? '1px solid rgba(242,237,228,0.2)'
              : '1px solid rgba(5,5,8,0.15)',
            transition: 'all 300ms ease',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
          onMouseEnter={(e) => {
            e.currentTarget.style.background = darkMode
              ? 'rgba(242,237,228,0.1)'
              : 'rgba(5,5,8,0.05)'

            e.currentTarget.style.borderColor = darkMode
              ? 'rgba(242,237,228,0.5)'
              : 'rgba(5,5,8,0.3)'
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.background = 'transparent'

            e.currentTarget.style.borderColor = darkMode
              ? 'rgba(242,237,228,0.2)'
              : 'rgba(5,5,8,0.15)'
          }}
        >
          Private Viewing
        </a>
      </div>

      {/* MOBILE BURGER */}
      <button
        onClick={() => setOpen(!open)}
        className="mobile-only"
        style={{
          background: 'none',
          border: 'none',
          cursor: 'pointer',
          padding: '8px',
          display: 'flex',
          flexDirection: 'column',
          gap: '5px',
        }}
        aria-label="Menu"
      >
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            style={{
              display: 'block',
              width: i === 1 ? '16px' : '24px',
              height: '1px',
              background: darkMode ? '#F2EDE4' : '#050508',
              transition: 'all 300ms ease',
              transform:
                open && i === 0
                  ? 'rotate(45deg) translate(4px, 4px)'
                  : open && i === 2
                  ? 'rotate(-45deg) translate(4px, -4px)'
                  : 'none',
              opacity: open && i === 1 ? 0 : 1,
            }}
          />
        ))}
      </button>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              top: '100%',
              left: 0,
              right: 0,
              background: darkMode
                ? 'rgba(5,5,8,0.97)'
                : 'rgba(245,241,232,0.97)',
              backdropFilter: 'blur(20px)',
              borderBottom: darkMode
                ? '1px solid rgba(242,237,228,0.06)'
                : '1px solid rgba(5,5,8,0.06)',
              padding: '2rem clamp(1.5rem, 4vw, 3rem)',
              display: 'flex',
              flexDirection: 'column',
              gap: '1.5rem',
            }}
          >
            {links.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setOpen(false)}
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '11px',
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  color: darkMode
                    ? 'rgba(242,237,228,0.6)'
                    : 'rgba(5,5,8,0.7)',
                  textDecoration: 'none',
                }}
              >
                {link.label}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>

      <style>{`
        @media (max-width: 768px) {
          .desktop-nav {
            display: none !important;
          }
        }

        @media (min-width: 769px) {
          .mobile-only {
            display: none !important;
          }
        }
      `}</style>
    </motion.header>
  )
}