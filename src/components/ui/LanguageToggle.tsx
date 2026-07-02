'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/store/useAppStore'

const LANGUAGES = [
  { code: 'EN', label: 'English' },
  { code: 'AM', label: 'አማርኛ' },
  { code: 'AR', label: 'العربية' },
]

export default function LanguageToggle() {
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('EN')
  const { setCursorVariant } = useAppStore()

  return (
    <div style={{ position: 'relative' }}>
      <button
        onClick={() => setOpen(!open)}
        onMouseEnter={() => setCursorVariant('hover')}
        onMouseLeave={() => setCursorVariant('default')}
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '5px',
          background: 'var(--surface)',
          border: '1px solid var(--border)',
          padding: '4px 10px',
          cursor: 'none',
          transition: 'border-color 300ms ease',
        }}
       
      >
        <span style={{
          fontFamily: 'JetBrains Mono, monospace',
          fontSize: '8px',
          letterSpacing: '0.2em',
          color: 'rgba(242,237,228,0.5)',
        }}>
          {active}
        </span>
        <motion.span
          animate={{ rotate: open ? 180 : 0 }}
          style={{
            color: 'rgba(242,237,228,0.3)',
            fontSize: '8px',
            lineHeight: 1,
          }}
        >
          ▾
        </motion.span>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            style={{
              position: 'absolute',
              top: 'calc(100% + 8px)',
              right: 0,
              background: 'var(--surface)',
              border: '1px solid var(--border)',
              minWidth: '130px',
              zIndex: 200,
              boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
            }}
          >
            {LANGUAGES.map(lang => (
              <button
                key={lang.code}
                onClick={() => { setActive(lang.code); setOpen(false) }}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  width: '100%',
                  padding: '0.7rem 1rem',
                  background: active === lang.code ? 'rgba(201,185,154,0.08)' : 'transparent',
                  border: 'none',
                  cursor: 'none',
                  transition: 'background 200ms ease',
                }}
       
              >
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '8px',
                  letterSpacing: '0.2em',
                  color: active === lang.code ? '#C9B99A' : 'rgba(242,237,228,0.45)',
                }}>
                  {lang.code}
                </span>
                <span style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.8rem',
                  color: 'rgba(242,237,228,0.25)',
                  fontWeight: 300,
                }}>
                  {lang.label}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}