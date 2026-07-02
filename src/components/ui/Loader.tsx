'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/store src/useAppStore'

export default function Loader() {
  const [visible, setVisible] = useState(true)
  const [count, setCount] = useState(0)
  const setSiteLoaded = useAppStore((s) => s.setSiteLoaded)

  useEffect(() => {
    // Count up fast
    const interval = setInterval(() => {
      setCount((c) => {
        if (c >= 100) {
          clearInterval(interval)
          return 100
        }
        return c + Math.floor(Math.random() * 18 + 8)
      })
    }, 80)

    const hide = setTimeout(() => {
      setVisible(false)
      setTimeout(() => setSiteLoaded(true), 900)
    }, 1600)

    return () => {
      clearInterval(interval)
      clearTimeout(hide)
    }
  }, [setSiteLoaded])

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          exit={{ opacity: 0, scale: 1.02 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 1000,
            background: '#050508',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '3rem',
          }}
        >
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{ textAlign: 'center' }}
          >
            <p style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: '2.5rem',
              fontWeight: 300,
              letterSpacing: '0.3em',
              color: '#F2EDE4',
              lineHeight: 1,
            }}>
              LUXE RESIDENCES...
            </p>
            <p style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '8px',
              letterSpacing: '0.5em',
              color: 'rgba(242,237,228,0.3)',
              marginTop: '6px',
              textTransform: 'uppercase',
            }}>
             
            </p>
          </motion.div>

          {/* Progress track */}
          <div style={{ width: '120px' }}>
            <div style={{
              height: '1px',
              background: 'rgba(242,237,228,0.08)',
              position: 'relative',
              overflow: 'hidden',
            }}>
              <motion.div
                animate={{ width: `${Math.min(count, 100)}%` }}
                transition={{ duration: 0.3, ease: 'easeOut' }}
                style={{
                  position: 'absolute',
                  inset: '0 auto 0 0',
                  background: 'linear-gradient(to right, #C9B99A, #F2EDE4)',
                }}
              />
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginTop: '8px',
            }}>
              <p style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '8px',
                letterSpacing: '0.3em',
                color: 'rgba(242,237,228,0.2)',
              }}>
                Loading
              </p>
              <p style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '8px',
                letterSpacing: '0.1em',
                color: 'rgba(201,185,154,0.6)',
              }}>
                {Math.min(count, 100)}
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}