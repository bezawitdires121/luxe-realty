'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

const testimonials = [
   {
    id: 2,
    quote: 'In thirty years of acquiring prime real estate across three continents, I have never encountered a team that combines architectural vision with genuine personal care the way LUXE does.',
    name: 'Soliyana Bekalu',
    title: 'Private Equity Partner',
    location: 'Addis Ababa, Ethiopia',
    initial: 'S',
  },
 
  {
    id: 1,
    quote: 'LUXE did not sell us a property. They handed us a new way of living. Every detail, from the marble sourcing to the smart home calibration, was executed with obsessive precision.',
    name: 'Khalid Al Mansouri',
    title: 'CEO, Al Mansouri Holdings',
    location: 'Dubai, UAE',
    initial: 'K',
  },
 
]

export default function Testimonials() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [active, setActive] = useState(0)

  const t = testimonials[active]

  return (
    <section
      ref={ref}
      style={{
        padding: 'clamp(6rem, 12vw, 10rem) clamp(1.5rem, 5vw, 4rem)',
        background: 'linear-gradient(180deg, transparent 0%, rgba(10,10,15,0.8) 20%, rgba(10,10,15,0.8) 80%, transparent 100%)',
      }}
    >
      <div style={{ maxWidth: '900px', margin: '0 auto', textAlign: 'center' }}>
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
            marginBottom: '4rem',
          }}
        >
          Client Voices
        </motion.p>

        {/* Quote */}
        <AnimatePresence mode="wait">
          <motion.blockquote
            key={t.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(1.4rem, 3vw, 2.2rem)',
              fontWeight: 300,
              color: '#F2EDE4',
              lineHeight: 1.5,
              letterSpacing: '-0.01em',
              marginBottom: '3rem',
              fontStyle: 'italic',
            }}
          >
            &ldquo;{t.quote}&rdquo;
          </motion.blockquote>
        </AnimatePresence>

        {/* Attribution */}
        <AnimatePresence mode="wait">
          <motion.div
            key={`attr-${t.id}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            style={{ marginBottom: '3rem' }}
          >
            {/* Avatar */}
            <div
              style={{
                width: '48px',
                height: '48px',
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #C9B99A, #4A7FA5)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                margin: '0 auto 1rem',
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: '1.2rem',
                color: '#050508',
                fontWeight: 500,
              }}
            >
              {t.initial}
            </div>
            <p style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.9rem',
              color: '#F2EDE4',
              marginBottom: '4px',
              fontWeight: 400,
            }}>
              {t.name}
            </p>
            <p style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '9px',
              letterSpacing: '0.3em',
              color: 'rgba(242,237,228,0.35)',
              textTransform: 'uppercase',
            }}>
              {t.title} — {t.location}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Dots */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px' }}>
          {testimonials.map((_, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              style={{
                width: active === i ? '28px' : '8px',
                height: '2px',
                background: active === i ? '#C9B99A' : 'rgba(242,237,228,0.2)',
                border: 'none',
                cursor: 'pointer',
                transition: 'all 400ms ease',
                padding: 0,
              }}
            />
          ))}
        </div>
      </div>
    </section>
  )
}