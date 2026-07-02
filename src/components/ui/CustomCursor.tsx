'use client'

import { useEffect, useRef } from 'react'
import { motion, useMotionValue, useSpring, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/store/useAppStore'

export default function CustomCursor() {
  const { cursorVariant, cursorLabel } = useAppStore()
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const dotX = useMotionValue(-100)
  const dotY = useMotionValue(-100)

  const springCfg = { stiffness: 180, damping: 26, mass: 0.5 }
  const x = useSpring(mouseX, springCfg)
  const y = useSpring(mouseY, springCfg)

  useEffect(() => {
    const move = (e: MouseEvent) => {
      mouseX.set(e.clientX - 20)
      mouseY.set(e.clientY - 20)
      dotX.set(e.clientX - 3)
      dotY.set(e.clientY - 3)
    }
    window.addEventListener('mousemove', move)
    return () => window.removeEventListener('mousemove', move)
  }, [mouseX, mouseY, dotX, dotY])

  const isHover = cursorVariant === 'hover'
  const isView = cursorVariant === 'view'
  const isDrag = cursorVariant === 'drag'

  return (
    <>
      {/* Outer ring */}
      <motion.div
        className="cursor-ring"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x,
          y,
          width: isHover ? '56px' : isView ? '80px' : '40px',
          height: isHover ? '56px' : isView ? '80px' : '40px',
          borderRadius: '50%',
          border: `1px solid ${isView ? '#C9B99A' : 'rgba(242,237,228,0.4)'}`,
          background: isView ? 'rgba(201,185,154,0.1)' : 'transparent',
          pointerEvents: 'none',
          zIndex: 9999,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          mixBlendMode: 'difference',
          transition: 'width 400ms cubic-bezier(0.16,1,0.3,1), height 400ms cubic-bezier(0.16,1,0.3,1)',
        }}
      >
        {isView && cursorLabel && (
          <span style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '7px',
            letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: '#C9B99A',
            pointerEvents: 'none',
            whiteSpace: 'nowrap',
          }}>
            {cursorLabel}
          </span>
        )}
      </motion.div>

      {/* Dot */}
      <motion.div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          x: dotX,
          y: dotY,
          width: '6px',
          height: '6px',
          borderRadius: '50%',
          background: isView ? '#C9B99A' : '#F2EDE4',
          pointerEvents: 'none',
          zIndex: 9999,
          transition: 'background 300ms ease',
        }}
      />
    </>
  )
}