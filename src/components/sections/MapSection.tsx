'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const LANDMARKS = [
  { id: 1, name: 'LUXE Residences', type: 'Our Property', x: 52, y: 48, primary: true },
  { id: 2, name: 'Bole International Airport', type: 'Airport · 8 min', x: 64, y: 68 },
  { id: 3, name: 'Edna Mall', type: 'Shopping · 4 min', x: 44, y: 42 },
  { id: 4, name: 'Millennium Hall', type: 'Culture · 6 min', x: 38, y: 55 },
  { id: 5, name: 'National Museum', type: 'Museum · 12 min', x: 30, y: 40 },
  { id: 6, name: 'Friendship Park', type: 'Park · 3 min', x: 55, y: 36 },
]

export default function MapSection() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [active, setActive] = useState<number | null>(1)

  return (
    <section
      id="experience"
      ref={ref}
      style={{
        padding: 'clamp(6rem, 12vw, 10rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1400px',
        margin: '0 auto',
      }}
    >
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8 }}
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '10px',
          letterSpacing: '0.5em',
          textTransform: 'uppercase',
          color: 'rgba(201,185,154,0.7)',
          marginBottom: '1rem',
        }}
      >
        Location · Bole Medhanialem, Addis Ababa
      </motion.p>

      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: 'Cormorant Garamond, Georgia, serif',
          fontSize: 'clamp(2rem, 5vw, 4.5rem)',
          fontWeight: 300,
          color: '#F2EDE4',
          letterSpacing: '-0.02em',
          lineHeight: 1,
          marginBottom: '4rem',
        }}
      >
        At the Heart of
        <br />
        <em style={{ color: '#C9B99A' }}>Addis Ababa's Finest District</em>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 1, delay: 0.2 }}
        style={{
          position: 'relative',
          background: '#080a0e',
          border: '1px solid rgba(242,237,228,0.06)',
          overflow: 'hidden',
          aspectRatio: '16/7',
          minHeight: '320px',
        }}
      >
        {/* Addis Ababa street grid SVG */}
        <svg viewBox="0 0 1000 450" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}
          xmlns="http://www.w3.org/2000/svg">
          <rect x="0" y="0" width="1000" height="450" fill="#070a0d" />

          {/* Major roads — Bole area grid */}
          {/* Horizontal major */}
          {[80, 150, 220, 280, 340].map((y, i) => (
            <line key={i} x1="0" y1={y} x2="1000" y2={y}
              stroke="rgba(201,185,154,0.12)" strokeWidth={i === 1 ? 3 : 1.5} />
          ))}
          {/* Vertical major */}
          {[120, 220, 360, 480, 600, 720, 860].map((x, i) => (
            <line key={i} x1={x} y1="0" x2={x} y2="450"
              stroke="rgba(201,185,154,0.12)" strokeWidth={i === 3 ? 3 : 1.5} />
          ))}
          {/* Minor roads */}
          {[110, 180, 250, 310].map((y, i) => (
            <line key={i} x1="0" y1={y} x2="1000" y2={y}
              stroke="rgba(201,185,154,0.04)" strokeWidth="0.8" />
          ))}
          {[170, 290, 420, 540, 660, 790].map((x, i) => (
            <line key={i} x1={x} y1="0" x2={x} y2="450"
              stroke="rgba(201,185,154,0.04)" strokeWidth="0.8" />
          ))}

          {/* City blocks */}
          {[
            [130, 90, 80, 50], [230, 90, 120, 50], [370, 90, 100, 50],
            [130, 160, 80, 50], [230, 160, 120, 50], [370, 160, 100, 50],
            [490, 90, 100, 130], [610, 90, 100, 130],
            [130, 230, 80, 40], [370, 230, 100, 40],
            [730, 90, 120, 50], [730, 160, 120, 50],
          ].map(([x, y, w, h], i) => (
            <rect key={i} x={x} y={y} width={w} height={h}
              fill="rgba(201,185,154,0.03)" stroke="rgba(201,185,154,0.06)" strokeWidth="0.5" />
          ))}

          {/* Bole label */}
          <text x="480" y="145" textAnchor="middle" fill="rgba(201,185,154,0.25)"
            fontSize="10" fontFamily="JetBrains Mono, monospace" letterSpacing="4">
            BOLE MEDHANIALEM
          </text>

          {/* Route to airport */}
          <path d="M 520 216 Q 580 280 640 340" fill="none"
            stroke="rgba(74,127,165,0.2)" strokeWidth="2" strokeDasharray="8,4" />

          {/* Neighborhood labels */}
          {[
            { x: 175, y: 280, label: 'KAZANCHIS' },
            { x: 750, y: 200, label: 'CMC' },
          ].map((item, i) => (
            <text key={i} x={item.x} y={item.y} textAnchor="middle"
              fill="rgba(242,237,228,0.08)"
              fontSize="8" fontFamily="JetBrains Mono, monospace" letterSpacing="3">
              {item.label}
            </text>
          ))}

          {/* Grid overlay */}
          <rect x="0" y="0" width="1000" height="450"
            fill="none" stroke="rgba(74,127,165,0.05)" strokeWidth="0.5" />
        </svg>

        {/* Landmark pins */}
        {LANDMARKS.map((lm, i) => (
          <motion.button
            key={lm.id}
            initial={{ opacity: 0, scale: 0 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.5, delay: 0.4 + i * 0.1 }}
            onClick={() => setActive(active === lm.id ? null : lm.id)}
            style={{
              position: 'absolute',
              left: `${lm.x}%`,
              top: `${lm.y}%`,
              transform: 'translate(-50%, -50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              zIndex: 10,
            }}
          >
            {lm.primary ? (
              // Main property pin
              <div style={{ position: 'relative' }}>
                <div style={{
                  width: '18px',
                  height: '18px',
                  borderRadius: '50%',
                  background: '#C9B99A',
                  border: '3px solid #F2EDE4',
                  boxShadow: '0 0 20px rgba(201,185,154,0.5)',
                  position: 'relative',
                  zIndex: 2,
                }} />
                <motion.div
                  animate={{ scale: [1, 2.5], opacity: [0.5, 0] }}
                  transition={{ duration: 2, repeat: Infinity }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    background: '#C9B99A',
                    zIndex: 1,
                  }}
                />
                {/* Location label */}
                <div style={{
                  position: 'absolute',
                  top: '-32px',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: '#C9B99A',
                  color: '#050508',
                  padding: '3px 8px',
                  whiteSpace: 'nowrap',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '7px',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                }}>
                  LUXE
                </div>
              </div>
            ) : (
              <div style={{ position: 'relative' }}>
                <div style={{
                  width: '10px',
                  height: '10px',
                  borderRadius: '50%',
                  background: active === lm.id ? '#4A7FA5' : 'rgba(74,127,165,0.5)',
                  border: '1.5px solid rgba(74,127,165,0.6)',
                  transition: 'all 300ms ease',
                  position: 'relative',
                  zIndex: 2,
                }} />
                <motion.div
                  animate={{ scale: [1, 2], opacity: [0.4, 0] }}
                  transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                  style={{
                    position: 'absolute',
                    inset: 0,
                    borderRadius: '50%',
                    background: '#4A7FA5',
                    zIndex: 1,
                  }}
                />
                <p style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '7px',
                  letterSpacing: '0.2em',
                  color: active === lm.id ? '#4A7FA5' : 'rgba(242,237,228,0.4)',
                  marginTop: '5px',
                  whiteSpace: 'nowrap',
                  transition: 'color 300ms ease',
                }}>
                  {lm.name}
                </p>
              </div>
            )}
          </motion.button>
        ))}

        {/* Active landmark info */}
        {active && LANDMARKS.find(l => l.id === active) && (
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'absolute',
              bottom: '1.5rem',
              left: '1.5rem',
              background: 'rgba(5,5,8,0.92)',
              backdropFilter: 'blur(12px)',
              border: '1px solid rgba(201,185,154,0.2)',
              padding: '1rem 1.25rem',
              minWidth: '180px',
            }}
          >
            {(() => {
              const lm = LANDMARKS.find(l => l.id === active)!
              return (
                <>
                  <p style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '8px',
                    letterSpacing: '0.4em',
                    textTransform: 'uppercase',
                    color: 'rgba(201,185,154,0.6)',
                    marginBottom: '4px',
                  }}>
                    {lm.type}
                  </p>
                  <p style={{
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: '1.1rem',
                    fontWeight: 300,
                    color: '#F2EDE4',
                  }}>
                    {lm.name}
                  </p>
                </>
              )
            })()}
          </motion.div>
        )}

        {/* Coordinates */}
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem',
          textAlign: 'right',
        }}>
          <p style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '8px',
            letterSpacing: '0.3em',
            color: 'rgba(242,237,228,0.2)',
          }}>
            8°59'45"N 38°47'32"E
          </p>
          <p style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '8px',
            letterSpacing: '0.3em',
            color: 'rgba(242,237,228,0.15)',
            marginTop: '2px',
          }}>
            Bole Medhanialem
          </p>
        </div>
      </motion.div>

      {/* Landmark list */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(180px, 1fr))',
        gap: '1px',
        marginTop: '1px',
        background: 'rgba(242,237,228,0.04)',
      }}>
        {LANDMARKS.filter(l => !l.primary).map((lm) => (
          <button
            key={lm.id}
            onClick={() => setActive(active === lm.id ? null : lm.id)}
            style={{
              padding: '1.25rem',
              background: active === lm.id ? 'rgba(74,127,165,0.08)' : 'rgba(8,10,14,0.95)',
              border: 'none',
              cursor: 'pointer',
              textAlign: 'left',
              transition: 'background 300ms ease',
            }}
          >
            <p style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '8px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(74,127,165,0.7)',
              marginBottom: '4px',
            }}>
              {lm.type}
            </p>
            <p style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.85rem',
              fontWeight: 300,
              color: active === lm.id ? '#F2EDE4' : 'rgba(242,237,228,0.45)',
              transition: 'color 300ms ease',
            }}>
              {lm.name}
            </p>
          </button>
        ))}
      </div>
    </section>
  )
}