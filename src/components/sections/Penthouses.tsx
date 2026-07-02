'use client'

import { useRef, useState } from 'react'
import { motion, useInView, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/store/useAppStore'

const PENTHOUSES = [
  {
    id: 'ph-1201',
    name: 'Sky Penthouse',
    floor: '12th Floor — Full Level',
    price: 'ETB 85,000,000',
    area: '6,200 sqft',
    beds: 5,
    baths: 6,
    balconies: 4,
    tagline: 'The World\'s Highest Address in Addis Ababa',
    description: 'An entire floor. A private sky. The most coveted address in Ethiopia commands the 12th level in its entirety — four terraces, a private plunge pool, and an uninterrupted 360° panorama of the city below.',
    features: ['Full Floor Private Level', 'Private Plunge Pool', '360° Panoramic Views', 'Private Elevator', 'Smart Home System', 'Wine Cellar & Cinema'],
    image: '/interiors/terrace.jpg',
    status: 'available',
    accent: '#C9B99A',
  },
  {
    id: 'ph-1202',
    name: 'The Obsidian Crown',
    floor: '12th Floor — West Wing',
    price: 'ETB 65,000,000',
    area: '4,800 sqft',
    beds: 4,
    baths: 5,
    balconies: 3,
    tagline: 'Where Darkness Meets the Sky',
    description: 'Conceived in collaboration with an internationally renowned design studio, the Obsidian Crown is defined by its dramatic materiality — nero marquina walls, hand-forged bronze fixtures, and a master suite that opens directly onto a sky terrace facing the Entoto hills.',
    features: ['Designer Collaboration', 'Sky Master Suite', 'Nero Marquina Finishes', 'Hand-Forged Bronze', 'Entoto Hill Views', 'Private Concierge Wing'],
    image: '/interiors/suite.jpg',
    status: 'reserved',
    accent: '#4A7FA5',
  },
]

export default function Penthouses() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [active, setActive] = useState(0)
  const { setCursorVariant, setCursorLabel } = useAppStore()

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  })

  const bgY = useTransform(scrollYProgress, [0, 1], ['-8%', '8%'])
  const ph = PENTHOUSES[active]

  return (
    <section
      id="penthouses"
      ref={ref}
      style={{ background: '#03030a', position: 'relative', overflow: 'hidden' }}
    >
      {/* Cinematic full-bleed bg */}
      <motion.div
        style={{
          position: 'absolute',
          inset: '-10%',
          y: bgY,
          zIndex: 0,
        }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={ph.id}
            src={ph.image}
            alt={ph.name}
            initial={{ opacity: 0, scale: 1.08 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              filter: 'brightness(0.25)',
            }}
            onError={e => {
              (e.target as HTMLImageElement).style.display = 'none'
            }}
          />
        </AnimatePresence>
        {/* Gradient on top of image */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(to bottom, #03030a 0%, transparent 20%, transparent 70%, #03030a 100%),
            linear-gradient(to right, #03030a 0%, transparent 40%)
          `,
        }} />
      </motion.div>

      {/* Ambient glow */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: `radial-gradient(ellipse at 70% 50%, ${ph.accent}08 0%, transparent 60%)`,
        transition: 'background 1s ease',
        zIndex: 1,
        pointerEvents: 'none',
      }} />

      {/* Content */}
      <div style={{
        position: 'relative',
        zIndex: 2,
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        padding: 'clamp(6rem, 12vw, 10rem) clamp(2rem, 6vw, 6rem)',
      }}>
        {/* Section label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem',
            marginBottom: '4rem',
          }}
        >
          <div style={{
            width: '40px', height: '1px',
            background: 'linear-gradient(to right, #C9B99A, transparent)',
          }} />
          <p style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '9px',
            letterSpacing: '0.55em',
            textTransform: 'uppercase',
            color: 'rgba(201,185,154,0.6)',
          }}>
            The Pinnacle Collection
          </p>
        </motion.div>

        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '6rem',
          alignItems: 'center',
        }}
          className="ph-grid"
        >
          {/* Left — Headline + details */}
          <div>
            {/* Selector tabs */}
            <div style={{
              display: 'flex',
              gap: '0',
              marginBottom: '3rem',
              borderBottom: '1px solid rgba(242,237,228,0.06)',
            }}>
              {PENTHOUSES.map((p, i) => (
                <button
                  key={p.id}
                  onClick={() => setActive(i)}
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                  style={{
                    padding: '0.75rem 1.5rem 0.75rem 0',
                    marginRight: '1.5rem',
                    background: 'none',
                    border: 'none',
                    borderBottom: active === i
                      ? `1px solid ${p.accent}`
                      : '1px solid transparent',
                    marginBottom: '-1px',
                    cursor: 'none',
                    transition: 'all 300ms ease',
                  }}
                >
                  <p style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '8px',
                    letterSpacing: '0.35em',
                    textTransform: 'uppercase',
                    color: active === i ? p.accent : 'rgba(242,237,228,0.25)',
                    transition: 'color 300ms ease',
                  }}>
                    {p.name}
                  </p>
                </button>
              ))}
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={ph.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              >
                {/* Floor */}
                <p style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '8px',
                  letterSpacing: '0.4em',
                  textTransform: 'uppercase',
                  color: 'rgba(242,237,228,0.3)',
                  marginBottom: '1rem',
                }}>
                  {ph.floor}
                </p>

                {/* Name */}
                <h2 style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: 'clamp(2.5rem, 5vw, 5rem)',
                  fontWeight: 300,
                  color: '#F2EDE4',
                  lineHeight: 0.92,
                  letterSpacing: '-0.025em',
                  marginBottom: '1rem',
                }}>
                  {ph.name}
                </h2>

                {/* Tagline */}
                <p style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: 'clamp(1rem, 1.5vw, 1.25rem)',
                  fontWeight: 300,
                  fontStyle: 'italic',
                  color: ph.accent,
                  marginBottom: '2rem',
                }}>
                  {ph.tagline}
                </p>

                {/* Description */}
                <p style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.95rem',
                  fontWeight: 300,
                  color: 'rgba(242,237,228,0.45)',
                  lineHeight: 1.9,
                  marginBottom: '2.5rem',
                  maxWidth: '500px',
                }}>
                  {ph.description}
                </p>

                {/* Specs row */}
                <div style={{
                  display: 'flex',
                  gap: '2.5rem',
                  marginBottom: '3rem',
                  paddingBottom: '2rem',
                  borderBottom: '1px solid rgba(242,237,228,0.05)',
                }}>
                  {[
                    { label: 'Area', value: ph.area },
                    { label: 'Bedrooms', value: ph.beds },
                    { label: 'Bathrooms', value: ph.baths },
                    { label: 'Terraces', value: ph.balconies },
                  ].map(spec => (
                    <div key={spec.label}>
                      <p style={{
                        fontFamily: 'Cormorant Garamond, Georgia, serif',
                        fontSize: '1.5rem',
                        fontWeight: 300,
                        color: ph.accent,
                        lineHeight: 1,
                        marginBottom: '4px',
                      }}>
                        {spec.value}
                      </p>
                      <p style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '7px',
                        letterSpacing: '0.4em',
                        textTransform: 'uppercase',
                        color: 'rgba(242,237,228,0.2)',
                      }}>
                        {spec.label}
                      </p>
                    </div>
                  ))}
                </div>

                {/* Price + CTA */}
                <div style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '2rem',
                  flexWrap: 'wrap',
                }}>
                  <div>
                    <p style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '7px',
                      letterSpacing: '0.4em',
                      textTransform: 'uppercase',
                      color: 'rgba(242,237,228,0.2)',
                      marginBottom: '4px',
                    }}>
                      Starting From
                    </p>
                    <p style={{
                      fontFamily: 'Cormorant Garamond, Georgia, serif',
                      fontSize: '1.8rem',
                      fontWeight: 300,
                      color: ph.accent,
                      letterSpacing: '-0.01em',
                    }}>
                      {ph.price}
                    </p>
                  </div>

                  <motion.a
                
                    href="#private-viewing"
                    whileTap={{ scale: 0.97 }}
                    onMouseEnter={() => { setCursorVariant('view'); setCursorLabel('View') }}
                    onMouseLeave={() => setCursorVariant('default')}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '1rem 2rem',
                      background: ph.accent,
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '8px',
                      letterSpacing: '0.38em',
                      textTransform: 'uppercase',
                      color: '#03030a',
                      textDecoration: 'none',
                      cursor: 'none',
                      transition: 'all 400ms ease',
                    }}
                    
                  >
                    Arrange Private Tour →
                  </motion.a>

                  {ph.status === 'reserved' && (
                    <span style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '7px',
                      letterSpacing: '0.4em',
                      textTransform: 'uppercase',
                      color: '#C9B99A',
                      border: '1px solid rgba(201,185,154,0.3)',
                      padding: '5px 12px',
                    }}>
                      Reserved
                    </span>
                  )}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Right — Feature list */}
          <AnimatePresence mode="wait">
            <motion.div
              key={ph.id + '-features'}
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              <p style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '7px',
                letterSpacing: '0.45em',
                textTransform: 'uppercase',
                color: 'rgba(201,185,154,0.4)',
                marginBottom: '1.5rem',
              }}>
                Exclusive Features
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0' }}>
                {ph.features.map((f, i) => (
                  <motion.div
                    key={f}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.07, duration: 0.5 }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1.25rem',
                      padding: '1.1rem 0',
                      borderBottom: '1px solid rgba(242,237,228,0.04)',
                    }}
                  >
                    <div style={{
                      width: '4px',
                      height: '4px',
                      borderRadius: '50%',
                      background: ph.accent,
                      flexShrink: 0,
                    }} />
                    <p style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '0.9rem',
                      fontWeight: 300,
                      color: 'rgba(242,237,228,0.6)',
                    }}>
                      {f}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .ph-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  )
}