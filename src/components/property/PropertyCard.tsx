'use client'

import { useRef, useState } from 'react'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import { useAppStore } from '@/store/useAppStore'
import type { Property } from '@/types src'

interface Props {
  property: Property
  index: number
}

export default function PropertyCard({ property, index }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const { setCursorVariant, setCursorLabel, openPreview } = useAppStore()

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [4, -4]), { stiffness: 300, damping: 30 })
  const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-4, 4]), { stiffness: 300, damping: 30 })

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = ref.current!.getBoundingClientRect()
    mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
    mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
  }

  const statusColors: Record<string, string> = {
    available: '#4ade80',
    reserved: '#C9B99A',
    sold: '#666',
  }

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.9, delay: index * 0.12, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => {
        setHovered(true)
        setCursorVariant('view')
        setCursorLabel('View')
      }}
      onMouseLeave={() => {
        setHovered(false)
        setCursorVariant('default')
        setCursorLabel('')
        mouseX.set(0)
        mouseY.set(0)
      }}
      onClick={() => openPreview(property)}
      style={{
        rotateX,
        rotateY,
        transformStyle: 'preserve-3d',
        perspective: 1000,
        cursor: 'none',
      }}
    >
      <div style={{
        position: 'relative',
        background: '#0a0a10',
        border: `1px solid ${hovered ? 'rgba(201,185,154,0.25)' : 'rgba(242,237,228,0.06)'}`,
        overflow: 'hidden',
        transition: 'border-color 400ms ease',
      }}>
        {/* Image */}
        <div style={{
          position: 'relative',
          height: '320px',
          overflow: 'hidden',
        }}>
          <motion.img
            src={property.images[0]}
            alt={property.name}
            animate={{ scale: hovered ? 1.06 : 1 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
            }}
            onError={(e) => {
              const el = e.target as HTMLImageElement
              el.style.display = 'none'
              el.parentElement!.style.background = `
                linear-gradient(135deg,
                  ${property.accentColor}15 0%,
                  rgba(10,10,20,1) 100%
                )
              `
            }}
          />

          {/* Overlay */}
          <motion.div
            animate={{ opacity: hovered ? 0.3 : 0.6 }}
            transition={{ duration: 0.5 }}
            style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to top, rgba(5,5,8,0.9) 0%, transparent 60%)',
            }}
          />

          {/* Tag */}
          {property.tag && (
            <div style={{
              position: 'absolute',
              top: '1.25rem',
              left: '1.25rem',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '7px',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: property.accentColor,
              border: `1px solid ${property.accentColor}50`,
              padding: '5px 10px',
              background: 'rgba(5,5,8,0.7)',
              backdropFilter: 'blur(8px)',
            }}>
              {property.tag}
            </div>
          )}

          {/* Status */}
          <div style={{
            position: 'absolute',
            top: '1.25rem',
            right: '1.25rem',
            display: 'flex',
            alignItems: 'center',
            gap: '6px',
          }}>
            <div style={{
              width: '5px',
              height: '5px',
              borderRadius: '50%',
              background: statusColors[property.status],
            }} />
            <p style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '7px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: statusColors[property.status],
              opacity: 0.8,
            }}>
              {property.status}
            </p>
          </div>

          {/* Property name on image */}
          <div style={{
            position: 'absolute',
            bottom: '1.5rem',
            left: '1.5rem',
            right: '1.5rem',
          }}>
            <p style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: 'clamp(1.4rem, 2.5vw, 1.9rem)',
              fontWeight: 300,
              color: '#F2EDE4',
              letterSpacing: '-0.01em',
              lineHeight: 1,
            }}>
              {property.name}
            </p>
            <p style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '8px',
              letterSpacing: '0.35em',
              color: 'rgba(242,237,228,0.4)',
              marginTop: '5px',
            }}>
              {property.location}
            </p>
          </div>
        </div>

        {/* Card body */}
        <div style={{ padding: '1.5rem' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'baseline',
            marginBottom: '1.25rem',
          }}>
            <p style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '8px',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(242,237,228,0.25)',
            }}>
              {property.type}
            </p>
            <p style={{
              fontFamily: 'Cormorant Garamond, Georgia, serif',
              fontSize: '1.25rem',
              fontWeight: 300,
              color: property.accentColor,
              letterSpacing: '-0.01em',
            }}>
              {property.priceLabel}
            </p>
          </div>

          {/* Specs */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
            paddingTop: '1rem',
            borderTop: '1px solid rgba(242,237,228,0.05)',
          }}>
            {[
              { label: 'Beds', value: property.beds },
              { label: 'Baths', value: property.baths },
              { label: 'Area', value: property.area.toLocaleString() + ' ft²' },
            ].map((spec) => (
              <div key={spec.label}>
                <p style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '7px',
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  color: 'rgba(242,237,228,0.2)',
                  marginBottom: '4px',
                }}>
                  {spec.label}
                </p>
                <p style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.9rem',
                  color: 'rgba(242,237,228,0.7)',
                  fontWeight: 300,
                }}>
                  {spec.value}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Hover reveal strip */}
        <motion.div
          animate={{ scaleX: hovered ? 1 : 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '2px',
            background: `linear-gradient(to right, transparent, ${property.accentColor}, transparent)`,
            transformOrigin: 'left',
          }}
        />
      </div>
    </motion.div>
  )
}