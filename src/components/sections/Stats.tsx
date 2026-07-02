'use client'

import { useRef, useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import { useInView } from '@/hooks src/useInView'

interface StatItem {
  value: number
  suffix: string
  prefix?: string
  label: string
  decimals?: number
}

const STATS: StatItem[] = [
  { value: 240, suffix: '+', label: 'Properties Delivered', decimals: 0 },
  { value: 18, suffix: '', label: 'Countries of Presence', decimals: 0 },
  { value: 4.2, suffix: 'B', prefix: '$', label: 'Portfolio Value (USD)', decimals: 1 },
  { value: 97, suffix: '%', label: 'Client Satisfaction', decimals: 0 },
]

function AnimatedNumber({ value, suffix, prefix = '', decimals = 0, run }: StatItem & { run: boolean }) {
  const [display, setDisplay] = useState(0)
  const rafRef = useRef<number>()
  const startRef = useRef<number>()

  useEffect(() => {
    if (!run) return
    const duration = 2200
    const ease = (t: number) => 1 - Math.pow(1 - t, 3)

    const animate = (timestamp: number) => {
      if (!startRef.current) startRef.current = timestamp
      const elapsed = timestamp - startRef.current
      const progress = Math.min(elapsed / duration, 1)
      setDisplay(parseFloat((ease(progress) * value).toFixed(decimals)))
      if (progress < 1) rafRef.current = requestAnimationFrame(animate)
      else setDisplay(value)
    }

    rafRef.current = requestAnimationFrame(animate)
    return () => { if (rafRef.current) cancelAnimationFrame(rafRef.current) }
  }, [run, value, decimals])

  return (
    <span>
      {prefix}{decimals > 0 ? display.toFixed(decimals) : Math.round(display)}{suffix}
    </span>
  )
}

export default function Stats() {
  const { ref, inView } = useInView({ threshold: 0.3 })

  return (
    <section
      ref={ref}
      style={{
        padding: 'clamp(5rem, 10vw, 8rem) clamp(1.5rem, 5vw, 5rem)',
        background: 'linear-gradient(180deg, #050508 0%, #080812 50%, #050508 100%)',
        borderTop: '1px solid rgba(242,237,228,0.04)',
        borderBottom: '1px solid rgba(242,237,228,0.04)',
      }}
    >
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
        gap: '2rem',
        textAlign: 'center',
      }}>
        {STATS.map((stat, i) => (
          <motion.div
            key={stat.label}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            <p style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(3rem, 6vw, 5.5rem)',
              fontWeight: 300,
              color: '#C9B99A',
              lineHeight: 1,
              letterSpacing: '-0.02em',
              marginBottom: '0.6rem',
            }}>
              <AnimatedNumber {...stat} run={inView} />
            </p>
            <p style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '8px',
              letterSpacing: '0.45em',
              textTransform: 'uppercase',
              color: 'rgba(242,237,228,0.3)',
            }}>
              {stat.label}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  )
}