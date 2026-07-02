'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { PROPERTIES, AMENITIES_DATA, FLOOR_UNITS } from '@/lib src/data'
import PropertyCard from '@/components/property/PropertyCard'
import { useAppStore } from '@/store src/useAppStore'

export default function Properties() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const { setCursorVariant } = useAppStore()

  return (
    <section
      id="residences"
      ref={ref}
      style={{
        padding: 'clamp(6rem, 12vw, 10rem) clamp(1.5rem, 5vw, 5rem)',
        background: '#050508',
      }}
    >
      {/* Header */}
      <div style={{
        display: 'flex',
        alignItems: 'flex-end',
        justifyContent: 'space-between',
        marginBottom: 'clamp(3rem, 6vw, 5rem)',
        flexWrap: 'wrap',
        gap: '2rem',
      }}>
        <div>
          <motion.p
            initial={{ opacity: 0, y: 14 }}
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
            Featured Collection
          </motion.p>

          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              initial={{ y: '100%' }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.08, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(2.5rem, 6vw, 6rem)',
                fontWeight: 300,
                color: '#F2EDE4',
                lineHeight: 0.92,
                letterSpacing: '-0.025em',
              }}
            >
              Extraordinary
            </motion.h2>
          </div>
          <div style={{ overflow: 'hidden' }}>
            <motion.h2
              initial={{ y: '100%' }}
              animate={inView ? { y: 0 } : {}}
              transition={{ duration: 0.9, delay: 0.14, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(2.5rem, 6vw, 6rem)',
                fontWeight: 300,
                color: 'transparent',
                WebkitTextStroke: '1px rgba(201,185,154,0.6)',
                lineHeight: 0.92,
                letterSpacing: '-0.025em',
                fontStyle: 'italic',
              }}
            >
              Residences
            </motion.h2>
          </div>
        </div>

        <motion.a
          href="#"
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.7, delay: 0.3 }}
          onMouseEnter={() => setCursorVariant('hover')}
          onMouseLeave={() => setCursorVariant('default')}
          style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '9px',
            letterSpacing: '0.38em',
            textTransform: 'uppercase',
            color: 'rgba(201,185,154,0.6)',
            textDecoration: 'none',
            borderBottom: '1px solid rgba(201,185,154,0.25)',
            paddingBottom: '3px',
            cursor: 'none',
            transition: 'color 300ms ease, border-color 300ms ease',
          }}
          onMouseEnter={e => {
            e.currentTarget.style.color = '#C9B99A'
            e.currentTarget.style.borderColor = '#C9B99A'
          }}
          onMouseLeave={e => {
            e.currentTarget.style.color = 'rgba(201,185,154,0.6)'
            e.currentTarget.style.borderColor = 'rgba(201,185,154,0.25)'
          }}
        >
          View All Collection →
        </motion.a>
      </div>

      {/* Cards grid */}
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
        gap: '1.5rem',
      }}>
        {PROPERTIES.map((property, i) => (
          <PropertyCard key={property.id} property={property} index={i} />
        ))}
      </div>
    </section>
  )
}