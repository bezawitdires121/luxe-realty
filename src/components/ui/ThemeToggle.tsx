'use client'

import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/store/useAppStore'

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const { setCursorVariant } = useAppStore()

  useEffect(() => setMounted(true), [])
  if (!mounted) return null

  const isDark = theme === 'dark'

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      onMouseEnter={() => setCursorVariant('hover')}
      onMouseLeave={() => setCursorVariant('default')}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      style={{
        width: '40px',
        height: '22px',
        borderRadius: '11px',
        border: '1px solid var(--border)',
        background: 'var(--surface)',
        cursor: 'none',
        position: 'relative',
        transition: 'all 400ms ease',
        flexShrink: 0,
      }}
    >
      <motion.div
        animate={{ x: isDark ? 2 : 20 }}
        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        style={{
          position: 'absolute',
          top: '3px',
          width: '14px',
          height: '14px',
          borderRadius: '50%',
          background: isDark ? 'var(--travertine)' : 'var(--text-primary)',
        }}
      />
    </button>
  )
}