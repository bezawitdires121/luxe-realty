'use client'

import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'

const pillars = [
  {
    number: '01',
    title: 'Architectural Vision',
    body: 'Every structure we conceive begins as a dialogue between the land, light, and the lives that will unfold within. We design not buildings ,but enduring experiences.',
  },
  {
    number: '02',
    title: 'Curated Exclusivity',
    body: 'We limit our portfolio intentionally. Fewer projects mean deeper commitment : each property receives the full weight of our creative and technical mastery.',
  },
  {
    number: '03',
    title: 'Living Innovation',
    body: 'Smart home systems, sustainable materials, and biophilic design principles converge to create residences that are as intelligent as they are beautiful.',
  },
]

function AnimatedLine({ delay = 0 }: { delay?: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true })
  return (
    <motion.div
      ref={ref}
      initial={{ scaleX: 0 }}
      animate={inView ? { scaleX: 1 } : {}}
      transition={{ duration: 1.2, delay, ease: [0.16, 1, 0.3, 1] }}
      style={{
        height: '1px',
        background: 'rgba(201, 185, 154, 0.2)',
        transformOrigin: 'left',
        marginBottom: '2rem',
      }}
    />
  )
}

export default function Vision() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <section
      id="vision"
      ref={ref}
      style={{
        minHeight: '100vh',
        padding: 'clamp(6rem, 12vw, 10rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1400px',
        margin: '0 auto',
      }}
    >
      {/* Top label */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '10px',
          letterSpacing: '0.5em',
          textTransform: 'uppercase',
          color: 'rgba(201, 185, 154, 0.7)',
          marginBottom: '3rem',
        }}
      >
        Our Philosophy
      </motion.p>

      {/* Big heading */}
      <div style={{ marginBottom: '6rem' }}>
        {['We don\'t build', 'properties.', 'We craft legacies.'].map((line, i) => (
          <div key={i} style={{ overflow: 'hidden' }}>
            <motion.h2
              initial={{ y: '100%' }}
              animate={inView ? { y: 0 } : {}}
              transition={{
                duration: 1,
                delay: 0.1 * i,
                ease: [0.16, 1, 0.3, 1],
              }}
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(2.5rem, 6vw, 6rem)',
                fontWeight: 300,
                lineHeight: 1,
                color: i === 1 ? '#C9B99A' : '#F2EDE4',
                letterSpacing: '-0.02em',
              }}
            >
              {line}
            </motion.h2>
          </div>
        ))}
      </div>

      {/* Pillars */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '3rem',
        }}
      >
        {pillars.map((pillar, i) => (
          <motion.div
            key={pillar.number}
            initial={{ opacity: 0, y: 40 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{
              duration: 0.9,
              delay: 0.3 + i * 0.15,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <AnimatedLine delay={0.4 + i * 0.15} />
            <p
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '10px',
                letterSpacing: '0.4em',
                color: 'rgba(201, 185, 154, 0.5)',
                marginBottom: '1rem',
              }}
            >
              {pillar.number}
            </p>
            <h3
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(1.4rem, 2.5vw, 2rem)',
                fontWeight: 400,
                color: '#F2EDE4',
                marginBottom: '1rem',
                letterSpacing: '-0.01em',
              }}
            >
              {pillar.title}
            </h3>
            <p
              style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.95rem',
                fontWeight: 300,
                color: 'rgba(242, 237, 228, 0.45)',
                lineHeight: 1.8,
              }}
            >
              {pillar.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}