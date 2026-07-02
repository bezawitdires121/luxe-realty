'use client'

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useAppStore } from '@/store src/useAppStore'

type Step = 'select' | 'details' | 'confirm'

const SLOTS = [
  { day: 'Monday', date: 'Jul 7', times: ['10:00 AM', '2:00 PM', '4:30 PM'] },
  { day: 'Wednesday', date: 'Jul 9', times: ['11:00 AM', '3:00 PM', '5:00 PM'] },
  { day: 'Saturday', date: 'Jul 12', times: ['10:00 AM', '12:00 PM', '2:30 PM'] },
]

const INTERESTS = [
  'Sky Penthouse — Floor 12',
  'Obsidian Crown — Floor 12',
  'Sky Villa — Floor 11',
  'Penthouse Suite — Floor 5',
  'Custom Consultation',
]

export default function PrivateViewing() {
  const ref = useRef<HTMLElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const { setCursorVariant } = useAppStore()

  const [step, setStep] = useState<Step>('select')
  const [selectedDay, setSelectedDay] = useState<number | null>(null)
  const [selectedTime, setSelectedTime] = useState<string | null>(null)
  const [interest, setInterest] = useState(INTERESTS[0])
  const [form, setForm] = useState({ name: '', email: '', phone: '' })
  const [loading, setLoading] = useState(false)
  const [done, setDone] = useState(false)
  const [error, setError] = useState('')

  const canProceed = selectedDay !== null && selectedTime !== null

  const handleSubmit = async () => {
    if (!form.name || !form.email) return
    setLoading(true)
    setError('')

    try {
      const res = await fetch('/api/appointment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          residence: interest,
          date: selectedDay !== null
            ? `${SLOTS[selectedDay].day}, ${SLOTS[selectedDay].date}`
            : '',
          time: selectedTime || '',
        }),
      })

      const data = await res.json()
      if (!res.ok) throw new Error(data.error || 'Request failed')
      setDone(true)
    } catch (err: any) {
      console.error('Appointment error:', err)
      setError(err.message || 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const labelStyle: React.CSSProperties = {
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: '8px',
    letterSpacing: '0.4em',
    textTransform: 'uppercase',
    color: 'rgba(242,237,228,0.3)',
    display: 'block',
    marginBottom: '8px',
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(242,237,228,0.04)',
    border: '1px solid rgba(242,237,228,0.1)',
    padding: '0.9rem 1.1rem',
    fontFamily: 'DM Sans, sans-serif',
    fontSize: '0.9rem',
    color: '#F2EDE4',
    outline: 'none',
    transition: 'border-color 300ms ease',
    boxSizing: 'border-box',
  }

  const btnBase: React.CSSProperties = {
    fontFamily: 'JetBrains Mono, monospace',
    letterSpacing: '0.38em',
    textTransform: 'uppercase',
    border: 'none',
    cursor: 'none',
    transition: 'all 400ms ease',
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '0.5rem',
  }

  return (
    <section
      id="private-viewing"
      ref={ref}
      style={{
        background: '#06060c',
        borderTop: '1px solid rgba(242,237,228,0.04)',
        padding: 'clamp(6rem, 12vw, 10rem) clamp(2rem, 6vw, 6rem)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient gradient */}
      <div style={{
        position: 'absolute',
        inset: 0,
        background: 'radial-gradient(ellipse at 80% 20%, rgba(201,185,154,0.04) 0%, transparent 60%)',
        pointerEvents: 'none',
      }} />

      <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>

        {/* ── Header ── */}
        <div
          className="pv-header"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: '6rem',
            alignItems: 'start',
            marginBottom: '5rem',
          }}
        >
          {/* Left — headline */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1.5rem' }}>
              <div style={{ width: '32px', height: '1px', background: 'linear-gradient(to right, #C9B99A, transparent)' }} />
              <p style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '9px',
                letterSpacing: '0.5em',
                textTransform: 'uppercase',
                color: 'rgba(201,185,154,0.6)',
              }}>
                By Appointment Only
              </p>
            </div>

            {['Private', 'Viewing'].map((line, i) => (
              <div key={line} style={{ overflow: 'hidden' }}>
                <motion.h2
                  initial={{ y: '100%' }}
                  animate={inView ? { y: 0 } : {}}
                  transition={{ duration: 1, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: 'clamp(3rem, 7vw, 7rem)',
                    fontWeight: 300,
                    color: i === 0 ? '#F2EDE4' : 'transparent',
                    WebkitTextStroke: i === 1 ? '1px rgba(201,185,154,0.5)' : 'none',
                    lineHeight: 0.9,
                    letterSpacing: '-0.03em',
                    fontStyle: i === 1 ? 'italic' : 'normal',
                    margin: 0,
                  }}
                >
                  {line}
                </motion.h2>
              </div>
            ))}
          </motion.div>

          {/* Right — description */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          >
            <p style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '1rem',
              fontWeight: 300,
              color: 'rgba(242,237,228,0.4)',
              lineHeight: 1.9,
              marginBottom: '2rem',
            }}>
              A private viewing at LUXE is not a showing — it is a curated experience.
              Your personal advisor will guide you through the residence, the tower,
              and the life that awaits.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                'Champagne welcome on arrival',
                'Private architectural walkthrough',
                'Customised interior consultation',
                'Investment & financing overview',
              ].map((item) => (
                <div key={item} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{
                    width: '4px', height: '4px',
                    borderRadius: '50%',
                    background: '#C9B99A',
                    flexShrink: 0,
                  }} />
                  <p style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '0.88rem',
                    fontWeight: 300,
                    color: 'rgba(242,237,228,0.5)',
                    margin: 0,
                  }}>
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>

        {/* ── Booking flow ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.9, delay: 0.3 }}
        >
          {/* Step indicators */}
          {!done && (
            <div style={{ display: 'flex', alignItems: 'center', marginBottom: '3rem' }}>
              {[
                { id: 'select', label: 'Select Date' },
                { id: 'details', label: 'Your Details' },
                { id: 'confirm', label: 'Confirm' },
              ].map((s, i, arr) => {
                const isActive = step === s.id
                const isPast =
                  (s.id === 'select' && (step === 'details' || step === 'confirm')) ||
                  (s.id === 'details' && step === 'confirm')

                return (
                  <div key={s.id} style={{ display: 'flex', alignItems: 'center' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <div style={{
                        width: '28px',
                        height: '28px',
                        borderRadius: '50%',
                        border: `1px solid ${isActive || isPast ? '#C9B99A' : 'rgba(242,237,228,0.1)'}`,
                        background: isActive ? '#C9B99A' : isPast ? 'rgba(201,185,154,0.2)' : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        transition: 'all 400ms ease',
                        flexShrink: 0,
                      }}>
                        <span style={{
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: '9px',
                          color: isActive ? '#050508' : isPast ? '#C9B99A' : 'rgba(242,237,228,0.3)',
                        }}>
                          {isPast ? '✓' : i + 1}
                        </span>
                      </div>
                      <span style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '8px',
                        letterSpacing: '0.3em',
                        textTransform: 'uppercase',
                        color: isActive ? '#F2EDE4' : 'rgba(242,237,228,0.2)',
                        transition: 'color 400ms ease',
                      }}>
                        {s.label}
                      </span>
                    </div>
                    {i < arr.length - 1 && (
                      <div style={{
                        width: '60px',
                        height: '1px',
                        background: 'rgba(242,237,228,0.08)',
                        margin: '0 1rem',
                      }} />
                    )}
                  </div>
                )
              })}
            </div>
          )}

          <AnimatePresence mode="wait">

            {/* ── Done state ── */}
            {done && (
              <motion.div
                key="done"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5 }}
                style={{
                  textAlign: 'center',
                  padding: '5rem 2rem',
                  border: '1px solid rgba(201,185,154,0.15)',
                  maxWidth: '600px',
                  margin: '0 auto',
                }}
              >
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.2, type: 'spring', stiffness: 200 }}
                  style={{
                    width: '60px',
                    height: '60px',
                    borderRadius: '50%',
                    border: '1px solid rgba(201,185,154,0.4)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 2rem',
                    fontSize: '1.2rem',
                    color: '#C9B99A',
                  }}
                >
                  ✓
                </motion.div>
                <p style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: '2rem',
                  fontWeight: 300,
                  color: '#C9B99A',
                  marginBottom: '1rem',
                }}>
                  Your viewing is confirmed.
                </p>
                <p style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.9rem',
                  color: 'rgba(242,237,228,0.4)',
                  lineHeight: 1.8,
                }}>
                  Your private advisor will contact you within 2 hours to confirm
                  your appointment and share arrival details.
                  <br /><br />
                  We look forward to welcoming you.
                </p>
              </motion.div>
            )}

            {/* ── Step 1: Select date ── */}
            {!done && step === 'select' && (
              <motion.div
                key="select"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
              >
                {/* Residence selector */}
                <div style={{ marginBottom: '2rem' }}>
                  <label style={labelStyle}>Residence of Interest</label>
                  <select
                    value={interest}
                    onChange={(e) => setInterest(e.target.value)}
                    style={{ ...inputStyle, cursor: 'pointer' }}
                    onFocus={(e) => (e.target.style.borderColor = 'rgba(201,185,154,0.4)')}
                    onBlur={(e) => (e.target.style.borderColor = 'rgba(242,237,228,0.1)')}
                  >
                    {INTERESTS.map((o) => (
                      <option key={o} value={o} style={{ background: '#06060c' }}>
                        {o}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Date/time slots */}
                <label style={{ ...labelStyle, marginBottom: '1.25rem' }}>
                  Select Preferred Date &amp; Time
                </label>
                <div style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '1rem',
                  marginBottom: '2.5rem',
                }}>
                  {SLOTS.map((slot, di) => (
                    <div
                      key={slot.day}
                      style={{
                        border: `1px solid ${selectedDay === di ? 'rgba(201,185,154,0.4)' : 'rgba(242,237,228,0.07)'}`,
                        padding: '1.25rem',
                        background: selectedDay === di ? 'rgba(201,185,154,0.06)' : 'rgba(242,237,228,0.02)',
                        transition: 'all 300ms ease',
                      }}
                    >
                      <p style={{
                        fontFamily: 'Cormorant Garamond, Georgia, serif',
                        fontSize: '1.1rem',
                        fontWeight: 300,
                        color: '#F2EDE4',
                        marginBottom: '2px',
                      }}>
                        {slot.day}
                      </p>
                      <p style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '8px',
                        letterSpacing: '0.3em',
                        color: 'rgba(242,237,228,0.3)',
                        marginBottom: '1rem',
                      }}>
                        {slot.date}
                      </p>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                        {slot.times.map((time) => {
                          const isSelected = selectedDay === di && selectedTime === time
                          return (
                            <button
                              key={time}
                              type="button"
                              onClick={() => { setSelectedDay(di); setSelectedTime(time) }}
                              onMouseEnter={() => setCursorVariant('hover')}
                              onMouseLeave={() => setCursorVariant('default')}
                              style={{
                                ...btnBase,
                                padding: '0.5rem 0.75rem',
                                fontSize: '8px',
                                justifyContent: 'flex-start',
                                background: isSelected ? '#C9B99A' : 'rgba(242,237,228,0.04)',
                                border: `1px solid ${isSelected ? '#C9B99A' : 'rgba(242,237,228,0.08)'}`,
                                color: isSelected ? '#050508' : 'rgba(242,237,228,0.5)',
                              }}
                            >
                              {time}
                            </button>
                          )
                        })}
                      </div>
                    </div>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => { if (canProceed) setStep('details') }}
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                  disabled={!canProceed}
                  style={{
                    ...btnBase,
                    padding: '1rem 2.5rem',
                    fontSize: '9px',
                    background: canProceed ? '#C9B99A' : 'rgba(242,237,228,0.06)',
                    color: canProceed ? '#050508' : 'rgba(242,237,228,0.2)',
                    opacity: canProceed ? 1 : 0.7,
                  }}
                 
                >
                  Continue →
                </button>
              </motion.div>
            )}

            {/* ── Step 2: Details ── */}
            {!done && step === 'details' && (
              <motion.div
                key="details"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                style={{ maxWidth: '600px' }}
              >
                {/* Booking summary */}
                <div style={{
                  padding: '1.25rem 1.5rem',
                  background: 'rgba(201,185,154,0.06)',
                  border: '1px solid rgba(201,185,154,0.15)',
                  marginBottom: '2rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  flexWrap: 'wrap',
                  gap: '0.5rem',
                }}>
                  <div>
                    <p style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '7px',
                      letterSpacing: '0.4em',
                      textTransform: 'uppercase',
                      color: 'rgba(201,185,154,0.5)',
                      marginBottom: '3px',
                    }}>
                      Your Appointment
                    </p>
                    <p style={{
                      fontFamily: 'Cormorant Garamond, Georgia, serif',
                      fontSize: '1.1rem',
                      fontWeight: 300,
                      color: '#F2EDE4',
                    }}>
                      {selectedDay !== null ? SLOTS[selectedDay].day : ''},{' '}
                      {selectedTime} — {interest}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStep('select')}
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                    style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '7px',
                      letterSpacing: '0.3em',
                      textTransform: 'uppercase',
                      color: 'rgba(201,185,154,0.6)',
                      background: 'none',
                      border: 'none',
                      cursor: 'none',
                      transition: 'color 300ms ease',
                    }}
                    
                  >
                    Change
                  </button>
                </div>

                {/* Form fields */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                    <div>
                      <label style={labelStyle}>Full Name *</label>
                      <input
                        type="text"
                        style={inputStyle}
                        placeholder="Your name"
                        value={form.name}
                        onChange={(e) => setForm((p) => ({ ...p, name: e.target.value }))}
                        onFocus={(e) => (e.target.style.borderColor = 'rgba(201,185,154,0.4)')}
                        onBlur={(e) => (e.target.style.borderColor = 'rgba(242,237,228,0.1)')}
                      />
                    </div>
                    <div>
                      <label style={labelStyle}>Email *</label>
                      <input
                        type="email"
                        style={inputStyle}
                        placeholder="your@email.com"
                        value={form.email}
                        onChange={(e) => setForm((p) => ({ ...p, email: e.target.value }))}
                        onFocus={(e) => (e.target.style.borderColor = 'rgba(201,185,154,0.4)')}
                        onBlur={(e) => (e.target.style.borderColor = 'rgba(242,237,228,0.1)')}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={labelStyle}>Phone (WhatsApp preferred)</label>
                    <input
                      type="tel"
                      style={inputStyle}
                      placeholder="+251 9XX XXX XXX"
                      value={form.phone}
                      onChange={(e) => setForm((p) => ({ ...p, phone: e.target.value }))}
                      onFocus={(e) => (e.target.style.borderColor = 'rgba(201,185,154,0.4)')}
                      onBlur={(e) => (e.target.style.borderColor = 'rgba(242,237,228,0.1)')}
                    />
                  </div>
                </div>

                <div style={{ display: 'flex', gap: '1rem', marginTop: '2rem', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => setStep('select')}
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                    style={{
                      ...btnBase,
                      padding: '1rem 1.5rem',
                      fontSize: '8px',
                      background: 'transparent',
                      border: '1px solid rgba(242,237,228,0.1)',
                      color: 'rgba(242,237,228,0.3)',
                    }}
                    
                  >
                    ← Back
                  </button>

                  <button
                    type="button"
                    onClick={() => { if (form.name && form.email) setStep('confirm') }}
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                    disabled={!form.name || !form.email}
                    style={{
                      ...btnBase,
                      padding: '1rem 2.5rem',
                      fontSize: '8px',
                      background: form.name && form.email ? '#C9B99A' : 'rgba(242,237,228,0.06)',
                      color: form.name && form.email ? '#050508' : 'rgba(242,237,228,0.2)',
                    }}
                   
                  >
                    Review →
                  </button>
                </div>
              </motion.div>
            )}

            {/* ── Step 3: Confirm ── */}
            {!done && step === 'confirm' && (
              <motion.div
                key="confirm"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.4 }}
                style={{ maxWidth: '600px' }}
              >
                <p style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '8px',
                  letterSpacing: '0.45em',
                  textTransform: 'uppercase',
                  color: 'rgba(201,185,154,0.5)',
                  marginBottom: '1.5rem',
                }}>
                  Confirm Your Appointment
                </p>

                {/* Summary table */}
                <div style={{
                  border: '1px solid rgba(242,237,228,0.07)',
                  marginBottom: '2rem',
                }}>
                  {[
                    { label: 'Name', value: form.name },
                    { label: 'Email', value: form.email },
                    { label: 'Phone', value: form.phone || 'Not provided' },
                    { label: 'Residence', value: interest },
                    {
                      label: 'Date',
                      value: selectedDay !== null
                        ? `${SLOTS[selectedDay].day}, ${SLOTS[selectedDay].date}`
                        : '',
                    },
                    { label: 'Time', value: selectedTime || '' },
                  ].map((row, i, arr) => (
                    <div
                      key={row.label}
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.9rem 1.25rem',
                        borderBottom: i < arr.length - 1 ? '1px solid rgba(242,237,228,0.04)' : 'none',
                        gap: '1rem',
                      }}
                    >
                      <span style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '7px',
                        letterSpacing: '0.35em',
                        textTransform: 'uppercase',
                        color: 'rgba(242,237,228,0.2)',
                        flexShrink: 0,
                      }}>
                        {row.label}
                      </span>
                      <span style={{
                        fontFamily: 'DM Sans, sans-serif',
                        fontSize: '0.875rem',
                        color: 'rgba(242,237,228,0.7)',
                        fontWeight: 300,
                        textAlign: 'right',
                      }}>
                        {row.value}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Error */}
                {error && (
                  <p style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '0.85rem',
                    color: '#e05a5a',
                    padding: '0.75rem 1rem',
                    border: '1px solid rgba(224,90,90,0.2)',
                    background: 'rgba(224,90,90,0.05)',
                    marginBottom: '1.5rem',
                  }}>
                    {error}
                  </p>
                )}

                <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <button
                    type="button"
                    onClick={() => setStep('details')}
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                    style={{
                      ...btnBase,
                      padding: '1rem 1.5rem',
                      fontSize: '8px',
                      background: 'transparent',
                      border: '1px solid rgba(242,237,228,0.1)',
                      color: 'rgba(242,237,228,0.3)',
                    }}
                  >
                    ← Edit
                  </button>

                  <button
                    type="button"
                    onClick={handleSubmit}
                    disabled={loading}
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                    style={{
                      ...btnBase,
                      padding: '1rem 2.5rem',
                      fontSize: '9px',
                      background: loading ? 'rgba(201,185,154,0.5)' : '#C9B99A',
                      color: '#050508',
                      opacity: loading ? 0.7 : 1,
                      cursor: loading ? 'default' : 'none',
                    }}
                    
                  >
                    {loading ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          style={{
                            width: '12px',
                            height: '12px',
                            border: '1.5px solid rgba(5,5,8,0.3)',
                            borderTopColor: '#050508',
                            borderRadius: '50%',
                          }}
                        />
                        Confirming...
                      </>
                    ) : (
                      'Confirm Appointment →'
                    )}
                  </button>
                </div>
              </motion.div>
            )}

          </AnimatePresence>
        </motion.div>
      </div>

      <style>{`
        @media (max-width: 768px) {
          .pv-header {
            grid-template-columns: 1fr !important;
            gap: 2rem !important;
          }
        }
      `}</style>
    </section>
  )
}