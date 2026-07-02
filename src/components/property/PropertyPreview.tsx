'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/store/useAppStore'

export default function PropertyPreview() {
  const { previewOpen, activeProperty, closePreview, setCursorVariant } = useAppStore()
  const [activeImage, setActiveImage] = useState(0)

  useEffect(() => {
    if (!previewOpen) setActiveImage(0)
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closePreview()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [previewOpen, closePreview])

  useEffect(() => {
    document.body.style.overflow = previewOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [previewOpen])

  if (!activeProperty) return null

  return (
    <AnimatePresence>
      {previewOpen && (
        <motion.div
          key="preview"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.4 }}
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 200,
            background: 'rgba(3,3,6,0.96)',
            backdropFilter: 'blur(24px)',
            display: 'grid',
            gridTemplateColumns: '1fr 420px',
            overflow: 'hidden',
          }}
          className="preview-grid"
        >
          {/* Left — Image gallery */}
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            <AnimatePresence mode="wait">
              <motion.img
                key={activeImage}
                src={activeProperty.images[activeImage]}
                alt={activeProperty.name}
                initial={{ opacity: 0, scale: 1.05 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  display: 'block',
                }}
                onError={e => {
                  const el = e.target as HTMLImageElement
                  el.style.display = 'none'
                }}
              />
            </AnimatePresence>

            {/* Gradient over image */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(to right, transparent 60%, rgba(3,3,6,0.8) 100%)',
            }} />

            {/* Image thumbnails */}
            {activeProperty.images.length > 1 && (
              <div style={{
                position: 'absolute',
                bottom: '2rem',
                left: '2rem',
                display: 'flex',
                gap: '8px',
              }}>
                {activeProperty.images.map((img, i) => (
                  <button
                    key={i}
                    onClick={() => setActiveImage(i)}
                    style={{
                      width: '50px',
                      height: '36px',
                      overflow: 'hidden',
                      border: `1px solid ${activeImage === i ? '#C9B99A' : 'rgba(242,237,228,0.15)'}`,
                      background: 'none',
                      padding: 0,
                      cursor: 'none',
                      transition: 'border-color 300ms ease',
                    }}
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                  >
                    <img
                      src={img}
                      alt=""
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right — Details panel */}
          <motion.div
            initial={{ x: 40, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            style={{
              background: '#070710',
              borderLeft: '1px solid rgba(242,237,228,0.05)',
              padding: '3rem 2.5rem',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column',
              gap: '2rem',
            }}
          >
            {/* Close */}
            <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
              <button
  onClick={closePreview}
  onMouseEnter={(e) => {
    setCursorVariant('hover')
    e.currentTarget.style.borderColor = 'rgba(242,237,228,0.4)'
  }}
  onMouseLeave={(e) => {
    setCursorVariant('default')
    e.currentTarget.style.borderColor = 'rgba(242,237,228,0.12)'
  }}
  style={{
    background: 'none',
    border: '1px solid rgba(242,237,228,0.12)',
    padding: '8px 16px',
    cursor: 'none',
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    transition: 'border-color 300ms ease',
  }}
>
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '8px',
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  color: 'rgba(242,237,228,0.4)',
                }}>
                  Close
                </span>
                <span style={{ color: 'rgba(242,237,228,0.4)', fontSize: '14px' }}>✕</span>
              </button>
            </div>

            {/* Property info */}
            <div>
              {activeProperty.tag && (
                <p style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '7px',
                  letterSpacing: '0.5em',
                  textTransform: 'uppercase',
                  color: activeProperty.accentColor,
                  marginBottom: '0.75rem',
                }}>
                  {activeProperty.tag}
                </p>
              )}
              <h2 style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(2rem, 3vw, 2.8rem)',
                fontWeight: 300,
                color: '#F2EDE4',
                letterSpacing: '-0.02em',
                lineHeight: 1,
                marginBottom: '0.5rem',
              }}>
                {activeProperty.name}
              </h2>
              <p style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: '1.1rem',
                fontWeight: 300,
                color: 'rgba(242,237,228,0.4)',
                fontStyle: 'italic',
                marginBottom: '1.5rem',
              }}>
                {activeProperty.tagline}
              </p>
              <p style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.9rem',
                fontWeight: 300,
                color: 'rgba(242,237,228,0.45)',
                lineHeight: 1.85,
              }}>
                {activeProperty.description}
              </p>
            </div>

            {/* Price */}
            <div style={{
              padding: '1.5rem',
              background: 'rgba(201,185,154,0.05)',
              border: '1px solid rgba(201,185,154,0.12)',
            }}>
              <p style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '7px',
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                color: 'rgba(201,185,154,0.5)',
                marginBottom: '6px',
              }}>
                Starting From
              </p>
              <p style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: '1.8rem',
                fontWeight: 300,
                color: activeProperty.accentColor,
                letterSpacing: '-0.01em',
              }}>
                {activeProperty.priceLabel}
              </p>
            </div>

            {/* Specs grid */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 1fr',
              gap: '1px',
              background: 'rgba(242,237,228,0.05)',
            }}>
              {[
                { label: 'Type', value: activeProperty.type },
                { label: 'Status', value: activeProperty.status },
                { label: 'Bedrooms', value: activeProperty.beds },
                { label: 'Bathrooms', value: activeProperty.baths },
                { label: 'Area', value: activeProperty.area.toLocaleString() + ' sqft' },
                { label: 'Location', value: activeProperty.city },
              ].map((spec) => (
                <div
                  key={spec.label}
                  style={{
                    padding: '1rem',
                    background: '#070710',
                  }}
                >
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
                    fontSize: '0.85rem',
                    color: 'rgba(242,237,228,0.7)',
                    fontWeight: 300,
                    textTransform: spec.label === 'Status' ? 'capitalize' : 'none',
                  }}>
                    {spec.value}
                  </p>
                </div>
              ))}
            </div>

            {/* Features */}
            <div>
              <p style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '7px',
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                color: 'rgba(242,237,228,0.2)',
                marginBottom: '0.75rem',
              }}>
                Amenities & Features
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '6px' }}>
                {activeProperty.features.map((f) => (
                  <span key={f} style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '0.8rem',
                    fontWeight: 300,
                    color: 'rgba(242,237,228,0.5)',
                    padding: '4px 10px',
                    border: '1px solid rgba(242,237,228,0.07)',
                    letterSpacing: '0.02em',
                  }}>
                    {f}
                  </span>
                ))}
              </div>
            </div>

           {/* CTAs */}
<div
  style={{
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
    marginTop: 'auto',
  }}
>
  <a
    href="#contact"
    onClick={closePreview}
    onMouseEnter={() => setCursorVariant('hover')}
    onMouseLeave={() => setCursorVariant('default')}
    style={{
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: '0.75rem',
      padding: '1.1rem',
      background: '#C9B99A',
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: '9px',
      letterSpacing: '0.38em',
      textTransform: 'uppercase',
      color: '#050508',
      textDecoration: 'none',
      cursor: 'none',
      transition: 'background 400ms ease',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.background = '#F2EDE4'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.background = '#C9B99A'
    }}
  >
    Request Private Viewing →
  </a>

  <button
    onClick={closePreview}
    onMouseEnter={() => setCursorVariant('hover')}
    onMouseLeave={() => setCursorVariant('default')}
    style={{
      padding: '1rem',
      border: '1px solid rgba(242,237,228,0.1)',
      background: 'transparent',
      fontFamily: 'JetBrains Mono, monospace',
      fontSize: '9px',
      letterSpacing: '0.38em',
      textTransform: 'uppercase',
      color: 'rgba(242,237,228,0.35)',
      cursor: 'none',
      transition: 'all 300ms ease',
    }}
    onMouseEnter={(e) => {
      e.currentTarget.style.borderColor = 'rgba(242,237,228,0.3)'
      e.currentTarget.style.color = 'rgba(242,237,228,0.7)'
    }}
    onMouseLeave={(e) => {
      e.currentTarget.style.borderColor = 'rgba(242,237,228,0.1)'
      e.currentTarget.style.color = 'rgba(242,237,228,0.35)'
    }}
  >
    Back to Collection
  </button>
</div>
          </motion.div>

          <style>{`
            @media (max-width: 768px) {
              .preview-grid {
                grid-template-columns: 1fr !important;
                grid-template-rows: 50vh 1fr;
              }
            }
          `}</style>
        </motion.div>
      )}
    </AnimatePresence>
  )
}