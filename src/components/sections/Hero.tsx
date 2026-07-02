'use client'

import { motion } from 'framer-motion'

export default function Hero() {
  return (
    <div style={{ height: '500vh', position: 'relative' }}>
      <div style={{
        position: 'sticky',
        top: 0,
        height: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 10,
      }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={{ textAlign: 'center', padding: '0 2rem' }}
        >
          <p style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '10px',
            letterSpacing: '0.6em',
            textTransform: 'uppercase',
            color: 'rgba(201,185,154,0.6)',
            marginBottom: '1.5rem',
          }}>
            Ultra-Premium Real Estate
          </p>

          <h1 style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: 'clamp(3rem, 8vw, 8rem)',
            fontWeight: 300,
            lineHeight: 0.92,
            letterSpacing: '-0.02em',
            color: '#F2EDE4',
            marginBottom: '2rem',
          }}>
            Where Architecture
            <br />
            <em style={{ color: '#C9B99A', fontStyle: 'normal' }}>Meets Legacy</em>
          </h1>

          <p style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '1rem',
            fontWeight: 300,
            color: 'rgba(242,237,228,0.4)',
            maxWidth: '400px',
            margin: '0 auto 2.5rem',
            lineHeight: 1.8,
          }}>
            Extraordinary properties crafted for those who demand nothing less than perfection.
          </p>

          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
            style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px' }}
          >
            <p style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '9px',
              letterSpacing: '0.5em',
              textTransform: 'uppercase',
              color: 'rgba(242,237,228,0.2)',
            }}>
              Scroll to journey
            </p>
            <div style={{
              width: '1px',
              height: '40px',
              background: 'linear-gradient(to bottom, rgba(201,185,154,0.5), transparent)',
            }} />
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}