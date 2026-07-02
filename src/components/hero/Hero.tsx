'use client'

import { useRef, useEffect, useState } from 'react'
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/store src/useAppStore'

// Floating stat badge
function StatBadge({
  value, label, delay = 0, style,
}: {
  value: string
  label: string
  delay?: number
  style?: React.CSSProperties
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ delay, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      style={{
        position: 'absolute',
        background: 'rgba(10,10,15,0.7)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(242,237,228,0.08)',
        padding: '1rem 1.4rem',
        ...style,
      }}
    >
      <p style={{
        fontFamily: 'Cormorant Garamond, Georgia, serif',
        fontSize: '1.6rem',
        fontWeight: 300,
        color: '#C9B99A',
        lineHeight: 1,
        letterSpacing: '-0.01em',
      }}>
        {value}
      </p>
      <p style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '7px',
        letterSpacing: '0.35em',
        textTransform: 'uppercase',
        color: 'rgba(242,237,228,0.3)',
        marginTop: '4px',
      }}>
        {label}
      </p>
    </motion.div>
  )
}

// Ambient particle
function Particle({ index }: { index: number }) {
  const x = (index * 137.5) % 100
  const y = (index * 73.3) % 100
  const size = 1 + (index % 3) * 0.5
  const duration = 8 + (index % 6) * 2

  return (
    <motion.div
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width: `${size}px`,
        height: `${size}px`,
        borderRadius: '50%',
        background: index % 4 === 0 ? '#C9B99A' : 'rgba(242,237,228,0.4)',
        pointerEvents: 'none',
      }}
      animate={{
        y: [0, -30, 0],
        opacity: [0, 0.6, 0],
      }}
      transition={{
        duration,
        delay: (index * 0.3) % duration,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
    />
  )
}

export default function Hero() {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const { setCursorVariant, setCursorLabel } = useAppStore()

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  // Parallax transforms
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.15])
  const videoOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '30%'])
  const textOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0])

  // Mouse parallax
  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const smoothX = useSpring(mouseX, { stiffness: 60, damping: 20 })
  const smoothY = useSpring(mouseY, { stiffness: 60, damping: 20 })

  const bgX = useTransform(smoothX, [-1, 1], ['-1.5%', '1.5%'])
  const bgY = useTransform(smoothY, [-1, 1], ['-1.5%', '1.5%'])

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set((e.clientX / window.innerWidth) * 2 - 1)
      mouseY.set((e.clientY / window.innerHeight) * 2 - 1)
    }
    window.addEventListener('mousemove', onMove)
    return () => window.removeEventListener('mousemove', onMove)
  }, [mouseX, mouseY])

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', height: '100vh' }}
    >
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        overflow: 'hidden',
        background: '#050508',
      }}>

        {/* BG Video / fallback */}
        <motion.div
          style={{
            position: 'absolute',
            inset: '-3%',
            x: bgX,
            y: bgY,
            scale: videoScale,
            opacity: videoOpacity,
          }}
        >
          <video
            ref={videoRef}
            src="/videos/hero.mp4"
            autoPlay
            muted
            loop
            playsInline
            onCanPlay={() => setVideoLoaded(true)}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              opacity: videoLoaded ? 1 : 0,
              transition: 'opacity 1.5s ease',
            }}
          />

          {/* Fallback gradient when no video */}
          {!videoLoaded && (
            <div style={{
              position: 'absolute',
              inset: 0,
              background: `
                radial-gradient(ellipse at 60% 40%, rgba(74,127,165,0.15) 0%, transparent 60%),
                radial-gradient(ellipse at 20% 80%, rgba(201,185,154,0.08) 0%, transparent 50%),
                linear-gradient(135deg, #080812 0%, #0d1020 40%, #06080f 100%)
              `,
            }} />
          )}
        </motion.div>

        {/* Multi-layer gradient */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: `
            linear-gradient(to bottom,
              rgba(5,5,8,0.55) 0%,
              rgba(5,5,8,0.1) 30%,
              rgba(5,5,8,0.05) 50%,
              rgba(5,5,8,0.5) 80%,
              rgba(5,5,8,1) 100%
            )
          `,
          pointerEvents: 'none',
          zIndex: 2,
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to right, rgba(5,5,8,0.7) 0%, rgba(5,5,8,0.1) 60%, transparent 100%)',
          pointerEvents: 'none',
          zIndex: 2,
        }} />

        {/* Ambient particles */}
        <div style={{ position: 'absolute', inset: 0, zIndex: 3, pointerEvents: 'none', overflow: 'hidden' }}>
          {Array.from({ length: 20 }).map((_, i) => (
            <Particle key={i} index={i} />
          ))}
        </div>

        {/* MAIN CONTENT */}
        <motion.div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            padding: '0 clamp(2rem, 7vw, 7rem)',
            y: textY,
            opacity: textOpacity,
          }}
        >
          {/* Eyebrow */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              marginBottom: '1.75rem',
            }}
          >
            <div style={{
              width: '36px',
              height: '1px',
              background: 'linear-gradient(to right, #C9B99A, transparent)',
            }} />
            <p style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 'clamp(8px, 0.85vw, 10px)',
              letterSpacing: '0.48em',
              textTransform: 'uppercase',
              color: 'rgba(242,237,228,0.5)',
            }}>
              Bole Medhanialem · Addis Ababa · Ethiopia
            </p>
          </motion.div>

          {/* Main headline — split reveal */}
          <div style={{ overflow: 'hidden', marginBottom: '0.3rem' }}>
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.5, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(3.5rem, 9vw, 10rem)',
                fontWeight: 300,
                lineHeight: 0.9,
                letterSpacing: '-0.03em',
                color: '#F2EDE4',
              }}
            >
              Real Estate
            </motion.h1>
          </div>
          <div style={{ overflow: 'hidden', marginBottom: '2.5rem' }}>
            <motion.h1
              initial={{ y: '110%' }}
              animate={{ y: 0 }}
              transition={{ delay: 0.62, duration: 1.1, ease: [0.16, 1, 0.3, 1] }}
              style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(3.5rem, 9vw, 10rem)',
                fontWeight: 300,
                lineHeight: 0.9,
                letterSpacing: '-0.03em',
                color: 'transparent',
                WebkitTextStroke: '1px rgba(201,185,154,0.7)',
                fontStyle: 'italic',
              }}
            >
              Out of This World
            </motion.h1>
          </div>

          {/* Sub + CTA row */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.9, duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '2.5rem',
              flexWrap: 'wrap',
            }}
          >
            <p style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: 'clamp(8px, 0.85vw, 10px)',
              letterSpacing: '0.2em',
              color: 'rgba(242,237,228,0.35)',
            }}>
              Full-Floor · Private Elevator · Sky Concierge
            </p>

            <div style={{ display: 'flex', gap: '1rem' }}>
              {/* Primary CTA */}
              <motion.a
                href="#contact"
                whileTap={{ scale: 0.97 }}
                onMouseEnter={() => { setCursorVariant('hover'); setCursorLabel('') }}
                onMouseLeave={() => setCursorVariant('default')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.95rem 2rem',
                  background: '#C9B99A',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '9px',
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  color: '#050508',
                  textDecoration: 'none',
                  cursor: 'none',
                  transition: 'background 400ms ease',
                }}
                onMouseEnter={e => (e.currentTarget.style.background = '#F2EDE4')}
                onMouseLeave={e => (e.currentTarget.style.background = '#C9B99A')}
              >
                Request a Viewing
                <span style={{ fontSize: '14px' }}>→</span>
              </motion.a>

              {/* Secondary */}
              <motion.a
                href="#residences"
                whileTap={{ scale: 0.97 }}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.95rem 2rem',
                  border: '1px solid rgba(242,237,228,0.2)',
                  background: 'rgba(5,5,8,0.4)',
                  backdropFilter: 'blur(12px)',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '9px',
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  color: 'rgba(242,237,228,0.6)',
                  textDecoration: 'none',
                  cursor: 'none',
                  transition: 'all 400ms ease',
                }}
                onMouseEnter={e => {
                  e.currentTarget.style.borderColor = 'rgba(242,237,228,0.5)'
                  e.currentTarget.style.color = '#F2EDE4'
                }}
                onMouseLeave={e => {
                  e.currentTarget.style.borderColor = 'rgba(242,237,228,0.2)'
                  e.currentTarget.style.color = 'rgba(242,237,228,0.6)'
                }}
              >
                Explore Residences
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        

        {/* SCROLL INDICATOR */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.8, duration: 0.8 }}
          style={{
            position: 'absolute',
            bottom: '2.5rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '8px',
            zIndex: 20,
          }}
        >
          <p style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '7px',
            letterSpacing: '0.55em',
            textTransform: 'uppercase',
            color: 'rgba(242,237,228,0.22)',
          }}>
            Scroll
          </p>
          <motion.div
            animate={{ scaleY: [0, 1, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut', repeatDelay: 0.5 }}
            style={{
              width: '1px',
              height: '50px',
              background: 'linear-gradient(to bottom, #C9B99A, transparent)',
              transformOrigin: 'top',
            }}
          />
        </motion.div>

        {/* Phase indicators — right edge */}
        <div style={{
          position: 'absolute',
          right: '1.5rem',
          bottom: '2.5rem',
          display: 'flex',
          flexDirection: 'column',
          gap: '6px',
          zIndex: 20,
        }}>
          {['01', '02', '03'].map((n, i) => (
            <p
              key={n}
              style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '7px',
                letterSpacing: '0.2em',
                color: i === 0 ? 'rgba(201,185,154,0.6)' : 'rgba(242,237,228,0.15)',
                writingMode: 'vertical-rl',
              }}
            >
              {n}
            </p>
          ))}
        </div>
      </div>
    </div>
  )
}