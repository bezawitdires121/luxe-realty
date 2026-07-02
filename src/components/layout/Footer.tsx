'use client'

import { motion } from 'framer-motion'
import { useAppStore } from '@/store/useAppStore'

const FOOTER_LINKS = {
  Properties: [
    { label: 'All Residences', href: '#residences' },
    { label: 'New Launches', href: '#residences' },
    { label: 'Penthouses', href: '#penthouses' },
    { label: 'Sky Villas', href: '#residences' },
    { label: 'Investment Units', href: '#contact' },
  ],
  Company: [
    { label: 'Our Vision', href: '#vision' },
    { label: 'Architecture', href: '#tower' },
    { label: 'Interiors', href: '#interiors' },
    { label: 'Amenities', href: '#amenities' },
    { label: 'Sustainability', href: '#vision' },
  ],
  Experience: [
    { label: 'The Tower', href: '#tower' },
    { label: 'Virtual Tour', href: '#tower' },
    { label: 'Floor Plans', href: '#tower' },
    { label: 'Availability', href: '#tower' },
    { label: 'Private Viewing', href: '#private-viewing' },
  ],
  Connect: [
    { label: 'Contact Us', href: '#contact' },
    { label: 'Private Viewing', href: '#private-viewing' },
    { label: 'WhatsApp', href: 'https://wa.me/251911234567' },
    { label: 'Instagram', href: 'https://instagram.com' },
    { label: 'LinkedIn', href: 'https://linkedin.com' },
  ],
}

export default function Footer() {
  const { setCursorVariant } = useAppStore()
  const year = new Date().getFullYear()

  return (
    <footer style={{
      background: '#03030a',
      borderTop: '1px solid rgba(242,237,228,0.05)',
    }}>
      {/* Main footer */}
      <div style={{
        padding: 'clamp(4rem, 8vw, 6rem) clamp(2rem, 6vw, 6rem)',
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: '1.5fr repeat(4, 1fr)',
        gap: '3rem',
      }}
        className="footer-grid"
      >
        {/* Brand */}
        <div>
          <p style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '2rem',
            fontWeight: 300,
            letterSpacing: '0.2em',
            color: '#F2EDE4',
            marginBottom: '4px',
            lineHeight: 1,
          }}>
            LUXE
          </p>
          <p style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '7px',
            letterSpacing: '0.45em',
            textTransform: 'uppercase',
            color: 'rgba(242,237,228,0.2)',
            marginBottom: '1.5rem',
          }}>
            Residences
          </p>
          <p style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '0.82rem',
            fontWeight: 300,
            color: 'rgba(242,237,228,0.25)',
            lineHeight: 1.8,
            maxWidth: '220px',
            marginBottom: '1.5rem',
          }}>
            Ultra-premium real estate for those who demand nothing less than extraordinary.
          </p>
          <p style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '7px',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'rgba(201,185,154,0.4)',
            marginBottom: '4px',
          }}>
            Bole Medhanialem
          </p>
          <p style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '7px',
            letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'rgba(242,237,228,0.15)',
          }}>
            Addis Ababa, Ethiopia
          </p>
        </div>

        {/* Nav columns */}
        {Object.entries(FOOTER_LINKS).map(([col, links]) => (
          <div key={col}>
            <p style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '7px',
              letterSpacing: '0.45em',
              textTransform: 'uppercase',
              color: 'rgba(201,185,154,0.45)',
              marginBottom: '1.5rem',
            }}>
              {col}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.65rem' }}>

              {links.map((link) => (
              <a
                key={link.label}
                  
                 href={link.href}
                  target={link.href.startsWith('http') ? '_blank' : undefined}
                  rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                  style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '0.82rem',
                    fontWeight: 300,
                    color: 'rgba(242,237,228,0.3)',
                    textDecoration: 'none',
                    transition: 'color 300ms ease',
                    cursor: 'none',
                  }}
                  
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* Bottom bar */}
      <div style={{
        borderTop: '1px solid rgba(242,237,228,0.04)',
        padding: '1.5rem clamp(2rem, 6vw, 6rem)',
        maxWidth: '1400px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem',
      }}>
        <p style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '7px',
          letterSpacing: '0.3em',
          textTransform: 'uppercase',
          color: 'rgba(242,237,228,0.15)',
        }}>
          © {year} LUXE Residences. All Rights Reserved.
        </p>
        <div style={{ display: 'flex', gap: '2rem' }}>
          {[
            { label: 'Privacy', href: '#' },
            { label: 'Terms', href: '#' },
            { label: 'Cookies', href: '#' },
          ].map(item => (
            <a
              key={item.label}
              
              href={item.href}
              onMouseEnter={() => setCursorVariant('hover')}
              onMouseLeave={() => setCursorVariant('default')}
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '7px',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: 'rgba(242,237,228,0.15)',
                textDecoration: 'none',
                cursor: 'none',
                transition: 'color 300ms ease',
              }}
             
            >
              {item.label}
            </a>
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .footer-grid { grid-template-columns: 1fr 1fr !important; }
        }
        @media (max-width: 500px) {
          .footer-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </footer>
  )
}