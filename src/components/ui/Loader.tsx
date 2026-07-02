'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/store/useAppStore'

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
            background: 'radial-gradient(circle at 30% 22%, rgba(74,127,165,0.18), transparent 18%), radial-gradient(circle at 84% 22%, rgba(201,185,154,0.12), transparent 16%), linear-gradient(180deg, #050508 0%, #07070e 40%, #090912 100%)',
            overflow: 'hidden',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '2rem',
            padding: '2rem',
          }}
        >
          <div style={{
            position: 'absolute',
            inset: 0,
            pointerEvents: 'none',
            background: 'radial-gradient(circle at 50% 22%, rgba(242,237,228,0.06), transparent 14%), radial-gradient(circle at 22% 80%, rgba(74,127,165,0.08), transparent 12%)',
          }} />

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'relative',
              width: '100%',
              maxWidth: '540px',
              textAlign: 'center',
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.85, ease: [0.16, 1, 0.3, 1] }}
              style={{
                margin: '0 auto 1.25rem',
                width: '88px',
                height: '88px',
                display: 'grid',
                placeItems: 'center',
                borderRadius: '50%',
                border: '1px solid rgba(242,237,228,0.12)',
                background: 'rgba(255,255,255,0.03)',
                boxShadow: '0 0 0 1px rgba(255,255,255,0.03), inset 0 0 40px rgba(74,127,165,0.06)',
              }}
            >
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 1.8, ease: 'linear', repeat: Infinity }}
                style={{
                  width: '26px',
                  height: '26px',
                  borderRadius: '50%',
                  border: '2px solid transparent',
                  borderTop: '2px solid #C9B99A',
                  borderRight: '2px solid rgba(242,237,228,0.45)',
                }}
              />
            </motion.div>

            <p style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: '2.6rem',
              fontWeight: 300,
              letterSpacing: '0.12em',
              color: '#F2EDE4',
              lineHeight: 1,
              margin: 0,
            }}>
              LUXE RESIDENCES
            </p>
            <p style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '0.78rem',
              letterSpacing: '0.35em',
              textTransform: 'uppercase',
              color: 'rgba(242,237,228,0.45)',
              marginTop: '0.75rem',
              marginBottom: 0,
            }}>
              Curating your private residence experience
            </p>
          </motion.div>

          <div style={{
            width: '100%',
            maxWidth: '420px',
            display: 'grid',
            gap: '0.9rem',
          }}>
            <div style={{
              height: '8px',
              borderRadius: '999px',
              background: 'rgba(242,237,228,0.08)',
              overflow: 'hidden',
              boxShadow: 'inset 0 0 18px rgba(0,0,0,0.22)',
            }}>
              <motion.div
                animate={{ width: `${Math.min(count, 100)}%` }}
                transition={{ duration: 0.22, ease: 'easeOut' }}
                style={{
                  height: '100%',
                  borderRadius: '999px',
                  background: 'linear-gradient(90deg, #C9B99A, #4A7FA5)',
                }}
              />
            </div>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
              <p style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '0.75rem',
                letterSpacing: '0.38em',
                textTransform: 'uppercase',
                color: 'rgba(242,237,228,0.3)',
                margin: 0,
              }}>
                Preparing the experience
              </p>
              <p style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: '1rem',
                fontWeight: 300,
                color: '#C9B99A',
                margin: 0,
              }}>
                {Math.min(count, 100)}%
              </p>
            </div>
          </div>

          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, minmax(0, 1fr))',
            gap: '1rem',
            width: '100%',
            maxWidth: '540px',
          }}>
            {[
              { title: 'Skyline Render', subtitle: 'Immersive visuals' },
              { title: 'Private Preview', subtitle: 'Tailored discovery' },
              { title: 'Executive Service', subtitle: 'Discreet support' },
            ].map((item) => (
              <div key={item.title} style={{
                background: 'rgba(242,237,228,0.04)',
                border: '1px solid rgba(242,237,228,0.08)',
                borderRadius: '18px',
                padding: '1rem',
                textAlign: 'center',
              }}>
                <p style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '0.65rem',
                  letterSpacing: '0.4em',
                  textTransform: 'uppercase',
                  color: 'rgba(242,237,228,0.35)',
                  marginBottom: '0.45rem',
                  margin: 0,
                }}>
                  {item.title}
                </p>
                <p style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: '1rem',
                  fontWeight: 300,
                  color: '#F2EDE4',
                  margin: 0,
                }}>
                  {item.subtitle}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}