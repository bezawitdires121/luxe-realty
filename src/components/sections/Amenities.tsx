'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '@/hooks src/useInView'
import { useAppStore } from '@/store/useAppStore'

export default function Amenities() {
  const { ref, inView } = useInView({ threshold: 0.1 })
  const [active, setActive] = useState(0)
  const [hovered, setHovered] = useState<number | null>(null)
  const { setCursorVariant } = useAppStore()

 
  
const AMENITIES = [
  {
    id: '1',
    name: 'LUXE Private Spa',
    tagline: 'A Sanctuary of Wellness',
    type: 'Spa',
    tag: 'Wellness',
    image: '/interiors/spa.jpg',
    accentColor: '#D6C2A3',
    description:
      'A private wellness sanctuary featuring therapeutic spa facilities, calming interiors, luxury steam spaces, and premium relaxation lounges.',
    features: [
      'Steam Room',
      'Massage Suite',
      'Sauna',
      'Relaxation Lounge',
    ],
  },

  {
    id: '2',
    name: 'Elite Wellness Gym',
    tagline: 'Performance Elevated',
    type: 'Fitness',
    tag: 'Training',
    image: '/interiors/gym.jpg',
    accentColor: '#C9B99A',
    description:
      'A luxury fitness environment featuring panoramic skyline views, premium training equipment, recovery spaces, and contemporary wellness interiors.',
    features: [
      'Private Training',
      'Recovery Spa',
      'Skyline Views',
      'Premium Equipment',
    ],
  },

  {
    id: '3',
    name: 'LUXE Market Hall',
    tagline: 'Curated Everyday Luxury',
    type: 'Market',
    tag: 'Lifestyle',
    image: '/interiors/market.jpg',
    accentColor: '#D4C1A1',
    description:
      'A premium lifestyle market featuring curated retail experiences, artisan cafés, luxury interiors, and contemporary social spaces.',
    features: [
      'Luxury Retail',
      'Café Lounge',
      'Designer Interiors',
      'Lifestyle Shopping',
    ],
  },

  {
    id: '4',
    name: 'Obsidian Sky Restaurant',
    tagline: 'Dining Beyond Expectation',
    type: 'Restaurant',
    tag: 'Fine Dining',
    image: '/interiors/restaurant.jpg',
    accentColor: '#C9B99A',
    description:
      'A luxury rooftop restaurant combining panoramic city views, curated interiors, and a world-class fine dining atmosphere.',
    features: [
      'Rooftop Dining',
      'Private Chef',
      'Luxury Lounge',
      'City Skyline Views',
    ],
  },

  {
    id: '5',
    name: 'Obsidian Sky Lounge',
    tagline: 'Nightlife Above the City',
    type: 'Lounge',
    tag: 'Private Club',
    image: '/interiors/grocery.jpg',
    accentColor: '#B89E74',
    description:
      'An ultra-luxury rooftop lounge featuring signature drinks, ambient lighting, skyline views, and refined nightlife experiences.',
    features: [
      'Signature Drinks',
      'Skyline Terrace',
      'VIP Lounge',
      'Live DJ Experience',
    ],
  },

  {
    id: '6',
    name: 'Skyline Private Parking',
    tagline: 'Secure Luxury Arrival',
    type: 'Parking',
    tag: 'Private Access',
    image: '/interiors/parking.jpg',
    accentColor: '#D4C1A1',
    description:
      'An ultra-modern luxury parking facility with private access control, ambient lighting, EV charging stations, and concierge vehicle services.',
    features: [
      'Private Access',
      'EV Charging',
      'Security System',
      'Vehicle Concierge',
    ],
  },

  {
    id: '7',
    name: 'Skyline Cinema',
    tagline: 'Private Entertainment Elevated',
    type: 'Cinema',
    tag: 'Entertainment',
    image: '/interiors/cinema.jpg',
    accentColor: '#D6C2A3',
    description:
      'An immersive private cinema experience featuring luxury seating, acoustic interiors, ambient lighting, and panoramic skyline views.',
    features: [
      'Private Cinema',
      'Luxury Seating',
      'Dolby Surround',
      'Skyline Lounge',
    ],
  },
]



  const amenity = AMENITIES[active]

  return (
    <section
      id="amenities"
      ref={ref}
      style={{
        background: '#050508',
        padding: 'clamp(6rem, 12vw, 10rem) 0',
        overflow: 'hidden',
      }}
    >
      {/* HEADER */}
      <div
        style={{
          padding: '0 clamp(1.5rem, 5vw, 5rem)',
          marginBottom: '4rem',
          maxWidth: '1400px',
          marginInline: 'auto',
        }}
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '9px',
            letterSpacing: '0.5em',
            textTransform: 'uppercase',
            color: 'rgba(201,185,154,0.6)',
            marginBottom: '1rem',
          }}
        >
          Life Beyond the Residence
        </motion.p>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          style={{
            fontFamily: 'Cormorant Garamond, serif',
            fontSize: 'clamp(3rem, 7vw, 6rem)',
            fontWeight: 300,
            color: '#F2EDE4',
            lineHeight: 0.9,
            letterSpacing: '-0.04em',
          }}
        >
          Premium Amenities
        </motion.h2>
      </div>

      {/* MAIN GRID */}
      <div
        className="amenities-grid"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '4rem',
          maxWidth: '1400px',
          margin: '0 auto',
          padding: '0 clamp(1.5rem, 5vw, 5rem)',
        }}
      >
        {/* LEFT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1 }}
        >
          {AMENITIES.map((a, i) => (
            <div
              key={a.id}
              onClick={() => setActive(i)}
              onMouseEnter={() => {
                setHovered(i)
                setCursorVariant('hover')
              }}
              onMouseLeave={() => {
                setHovered(null)
                setCursorVariant('default')
              }}
              style={{
                display: 'flex',
                alignItems: 'center',
                gap: '1.25rem',
                padding: '1.5rem 0',
                borderBottom: '1px solid rgba(255,255,255,0.06)',
                cursor: 'pointer',
              }}
            >
              <div
                style={{
                  width: active === i ? '36px' : hovered === i ? '22px' : '10px',
                  height: '1px',
                  background:
                    active === i
                      ? a.accentColor
                      : 'rgba(255,255,255,0.2)',
                  transition: 'all 400ms ease',
                  flexShrink: 0,
                }}
              />

              <div style={{ flex: 1 }}>
                <p
                  style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '8px',
                    letterSpacing: '0.4em',
                    textTransform: 'uppercase',
                    color: a.accentColor,
                    marginBottom: '6px',
                  }}
                >
                  {a.type} · {a.tag}
                </p>

                <p
                  style={{
                    fontFamily: 'Cormorant Garamond, serif',
                    fontSize: '1.6rem',
                    fontWeight: 300,
                    color:
                      active === i
                        ? '#F2EDE4'
                        : 'rgba(242,237,228,0.45)',
                    transition: '300ms ease',
                  }}
                >
                  {a.name}
                </p>
              </div>
            </div>
          ))}
        </motion.div>

        {/* RIGHT SIDE */}
        <motion.div
          initial={{ opacity: 0, x: 40 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1 }}
          style={{
            position: 'sticky',
            top: '6rem',
          }}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={amenity.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {/* IMAGE */}
              <div
                style={{
                  position: 'relative',
                  height: '420px',
                  overflow: 'hidden',
                  marginBottom: '2rem',
                  border: '1px solid rgba(255,255,255,0.08)',
                }}
              >
                <img
                  src={amenity.image}
                  alt={amenity.name}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />

                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    background:
                      'linear-gradient(to top, rgba(5,5,8,0.95), transparent)',
                  }}
                />

                <div
                  style={{
                    position: 'absolute',
                    bottom: '1.5rem',
                    left: '1.5rem',
                  }}
                >
                  <p
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '8px',
                      letterSpacing: '0.4em',
                      textTransform: 'uppercase',
                      color: amenity.accentColor,
                      marginBottom: '8px',
                    }}
                  >
                    {amenity.tagline}
                  </p>

                  <h3
                    style={{
                      fontFamily: 'Cormorant Garamond, serif',
                      fontSize: '2.2rem',
                      fontWeight: 300,
                      color: '#F2EDE4',
                    }}
                  >
                    {amenity.name}
                  </h3>
                </div>
              </div>

              {/* DESCRIPTION */}
              <p
                style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.95rem',
                  lineHeight: 1.9,
                  color: 'rgba(242,237,228,0.55)',
                  marginBottom: '1.5rem',
                }}
              >
                {amenity.description}
              </p>

              {/* FEATURES */}
              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: '10px',
                  marginBottom: '2rem',
                }}
              >
                {amenity.features.map((feature) => (
                  <span
                    key={feature}
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '7px',
                      letterSpacing: '0.3em',
                      textTransform: 'uppercase',
                      color: 'rgba(242,237,228,0.5)',
                      padding: '7px 12px',
                      border: '1px solid rgba(255,255,255,0.08)',
                    }}
                  >
                    {feature}
                  </span>
                ))}
              </div>

              {/* BUTTON */}
              <button
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
                style={{
                  padding: '14px 26px',
                  background: 'transparent',
                  border: `1px solid ${amenity.accentColor}50`,
                  color: amenity.accentColor,
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '8px',
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: '300ms ease',
                }}
              >
                Arrange Private Access
              </button>
            </motion.div>
          </AnimatePresence>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .amenities-grid {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  )
}