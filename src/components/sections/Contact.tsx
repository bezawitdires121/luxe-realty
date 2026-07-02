'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const [sent, setSent] = useState(false)
  const [form, setForm] = useState({
    name: '', email: '', interest: 'Purchase', message: ''
  })

  const inputStyle = {
    width: '100%',
    background: 'rgba(242,237,228,0.04)',
    border: '1px solid rgba(242,237,228,0.1)',
    padding: '1rem 1.2rem',
    fontFamily: 'DM Sans, sans-serif',
    fontSize: '0.9rem',
    color: '#F2EDE4',
    outline: 'none',
    transition: 'border-color 300ms ease',
    borderRadius: '1px',
  }

  const labelStyle = {
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: '9px',
    letterSpacing: '0.4em',
    textTransform: 'uppercase' as const,
    color: 'rgba(242,237,228,0.35)',
    display: 'block',
    marginBottom: '8px',
  }

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        padding: 'clamp(6rem, 12vw, 10rem) clamp(1.5rem, 5vw, 4rem)',
        maxWidth: '1400px',
        margin: '0 auto',
      }}
    >
      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '5rem',
        alignItems: 'start',
      }}>
        {/* Left */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
        >
          <p style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '10px',
            letterSpacing: '0.5em',
            textTransform: 'uppercase',
            color: 'rgba(201,185,154,0.7)',
            marginBottom: '1.5rem',
          }}>
            Begin Your Journey
          </p>

          <h2 style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: 'clamp(2rem, 5vw, 4rem)',
            fontWeight: 300,
            color: '#F2EDE4',
            lineHeight: 1,
            letterSpacing: '-0.02em',
            marginBottom: '2rem',
          }}>
            Let's Create
            <br />
            <em style={{ color: '#C9B99A' }}>Something Rare</em>
          </h2>

          <p style={{
            fontFamily: 'DM Sans, sans-serif',
            fontSize: '0.95rem',
            fontWeight: 300,
            color: 'rgba(242,237,228,0.4)',
            lineHeight: 1.9,
            marginBottom: '3rem',
          }}>
            Our private client advisors are available by appointment.
            Every enquiry is handled with complete discretion and a
            commitment to finding the extraordinary.
          </p>

          {/* Contact details */}
          {[
  { label: 'Private Line', value: '+251 11 123 4567' },
  { label: 'WhatsApp', value: '+251 91 123 4567' },
  { label: 'Email', value: 'private@luxerealty.et' },
  { label: 'Address', value: 'Bole Medhanialem, Addis Ababa, Ethiopia' },
  { label: 'International Offices', value: 'Addis Ababa · Dubai · London' },
].map((item) => (
            <div key={item.label} style={{ marginBottom: '1.5rem' }}>
              <p style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '9px',
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                color: 'rgba(201,185,154,0.5)',
                marginBottom: '4px',
              }}>
                {item.label}
              </p>
              <p style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.9rem',
                color: 'rgba(242,237,228,0.6)',
              }}>
                {item.value}
              </p>
            </div>
          ))}
        </motion.div>

        {/* Right — form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                border: '1px solid rgba(201,185,154,0.2)',
              }}
            >
              <p style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: '2rem',
                fontWeight: 300,
                color: '#C9B99A',
                marginBottom: '1rem',
              }}>
                Thank you.
              </p>
              <p style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.9rem',
                color: 'rgba(242,237,228,0.4)',
                lineHeight: 1.8,
              }}>
                Your enquiry has been received. A private advisor
                will be in touch within 24 hours.
              </p>
            </motion.div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
              {/* Name + Email row */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: '1fr 1fr',
                gap: '1rem',
              }}>
                <div>
                  <label style={labelStyle}>Full Name</label>
                  <input
                    style={inputStyle}
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(201,185,154,0.4)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(242,237,228,0.1)'
                    }}
                  />
                </div>
                <div>
                  <label style={labelStyle}>Email</label>
                  <input
                    style={inputStyle}
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    onFocus={(e) => {
                      e.target.style.borderColor = 'rgba(201,185,154,0.4)'
                    }}
                    onBlur={(e) => {
                      e.target.style.borderColor = 'rgba(242,237,228,0.1)'
                    }}
                  />
                </div>
              </div>

              {/* Interest */}
              <div>
                <label style={labelStyle}>I am interested in</label>
                <select
                  style={{ ...inputStyle, cursor: 'pointer' }}
                  value={form.interest}
                  onChange={(e) => setForm({ ...form, interest: e.target.value })}
                >
                  {['Purchase', 'Investment Portfolio', 'Private Viewing', 'Interior Design', 'General Enquiry'].map((o) => (
                    <option key={o} value={o} style={{ background: '#0A0A0F' }}>{o}</option>
                  ))}
                </select>
              </div>

              {/* Message */}
              <div>
                <label style={labelStyle}>Message</label>
                <textarea
                  style={{ ...inputStyle, height: '140px', resize: 'none' }}
                  placeholder="Tell us about your vision..."
                  value={form.message}
                  onChange={(e) => setForm({ ...form, message: e.target.value })}
                  onFocus={(e) => {
                    e.target.style.borderColor = 'rgba(201,185,154,0.4)'
                  }}
                  onBlur={(e) => {
                    e.target.style.borderColor = 'rgba(242,237,228,0.1)'
                  }}
                />
              </div>

              {/* Submit */}
              <button
                onClick={() => {
                  if (form.name && form.email) setSent(true)
                }}
                style={{
                  padding: '1.1rem 2rem',
                  background: '#C9B99A',
                  color: '#050508',
                  border: 'none',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '10px',
                  letterSpacing: '0.4em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'background 400ms ease',
                  width: '100%',
                }}
                onMouseEnter={(e) => {
                  (e.target as HTMLButtonElement).style.background = '#F2EDE4'
                }}
                onMouseLeave={(e) => {
                  (e.target as HTMLButtonElement).style.background = '#C9B99A'
                }}
              >
                Submit Private Enquiry
              </button>

              <p style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '8px',
                letterSpacing: '0.3em',
                color: 'rgba(242,237,228,0.2)',
                textAlign: 'center',
              }}>
                All enquiries handled with complete discretion
              </p>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  )
}