'use client'

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { useAppStore } from '@/store/useAppStore'

const OFFICES = [
  {
    city: 'Addis Ababa',
    address: 'LUXE Tower, Bole Medhanialem',
    phone: '+251 11 123 4567',
    email: 'addis@luxerealty.et',
    primary: true,
  },
  {
    city: 'Dubai',
    address: 'DIFC, Gate District',
    phone: '+971 4 123 4567',
    email: 'dubai@luxerealty.et',
    primary: false,
  },
  {
    city: 'London',
    address: 'Mayfair, London W1',
    phone: '+44 20 7123 4567',
    email: 'london@luxerealty.et',
    primary: false,
  },
]

const INTERESTS = [
  'Purchase a Residence',
  'Investment Enquiry',
  'Interior Design Package',
  'Off-Plan Investment',
  'Press & Media',
  'Partnership',
  'General Enquiry',
]

const BUDGETS = [
  'Under ETB 20M',
  'ETB 20M – 50M',
  'ETB 50M – 100M',
  'ETB 100M – 200M',
  'Above ETB 200M',
  'Prefer not to say',
]

export default function AboutContact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })
  const { setCursorVariant } = useAppStore()

  const [form, setForm] = useState({
    name: '', email: '', phone: '',
    interest: INTERESTS[0], budget: BUDGETS[2], message: '',
  })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errMsg, setErrMsg] = useState('')

  const update = (k: keyof typeof form, v: string) =>
    setForm(p => ({ ...p, [k]: v }))

  const submit = async () => {
    if (!form.name || !form.email || !form.message) {
      setErrMsg('Please complete all required fields.')
      return
    }
    setErrMsg('')
    setStatus('loading')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error()
      setStatus('success')
    } catch {
      setStatus('error')
      setErrMsg('Something went wrong. Please call us directly.')
    }
  }

  const label: React.CSSProperties = {
    display: 'block',
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: '8px',
    letterSpacing: '0.4em',
    textTransform: 'uppercase',
    color: 'rgba(242,237,228,0.3)',
    marginBottom: '8px',
  }

  const inputStyle: React.CSSProperties = {
    width: '100%',
    background: 'rgba(242,237,228,0.03)',
    border: '1px solid rgba(242,237,228,0.08)',
    padding: '0.9rem 1.1rem',
    fontFamily: 'DM Sans, sans-serif',
    fontSize: '0.9rem',
    color: '#F2EDE4',
    outline: 'none',
    transition: 'border-color 300ms ease',
  }

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        background: '#050508',
        borderTop: '1px solid rgba(242,237,228,0.04)',
      }}
    >
      {/* About / Philosophy strip */}
      <div style={{
        borderBottom: '1px solid rgba(242,237,228,0.05)',
        padding: 'clamp(5rem, 10vw, 8rem) clamp(2rem, 6vw, 6rem)',
        background: 'linear-gradient(180deg, rgba(10,10,20,0.8) 0%, transparent 100%)',
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: '1fr 2fr',
            gap: '6rem',
            alignItems: 'start',
          }}
            className="about-grid"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8 }}
            >
              <p style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: '4rem',
                fontWeight: 300,
                letterSpacing: '0.15em',
                color: '#F2EDE4',
                lineHeight: 1,
                marginBottom: '0.5rem',
              }}>
                LUXE
              </p>
              <p style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '8px',
                letterSpacing: '0.5em',
                textTransform: 'uppercase',
                color: 'rgba(201,185,154,0.4)',
                marginBottom: '2rem',
              }}>
                Residences · Est. 2024
              </p>
              <div style={{
                width: '40px',
                height: '1px',
                background: 'rgba(201,185,154,0.4)',
              }} />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.15 }}
            >
              <p style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: 'clamp(1.3rem, 2.5vw, 2rem)',
                fontWeight: 300,
                color: 'rgba(242,237,228,0.8)',
                lineHeight: 1.5,
                letterSpacing: '-0.01em',
                marginBottom: '2rem',
                fontStyle: 'italic',
              }}>
                "We do not simply build residences. We architect the conditions for a life lived at its fullest ,  where every material, every proportion, every view has been considered with the weight it deserves."
              </p>
              <p style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.95rem',
                fontWeight: 300,
                color: 'rgba(242,237,228,0.35)',
                lineHeight: 1.9,
                maxWidth: '580px',
              }}>
                Founded in Addis Ababa with a vision to bring world-class architectural luxury to East Africa, LUXE Residences is the flagship development of a new standard , one that refuses to compromise between cultural identity and global excellence.
              </p>
            </motion.div>
          </div>
        </div>
      </div>

      {/* Offices */}
      <div style={{
        borderBottom: '1px solid rgba(242,237,228,0.05)',
        padding: '0 clamp(2rem, 6vw, 6rem)',
      }}>
        <div style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(3, 1fr)',
          gap: '1px',
          background: 'rgba(242,237,228,0.04)',
        }}
          className="offices-grid"
        >
          {OFFICES.map((office, i) => (
            <motion.div
              key={office.city}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: 0.1 + i * 0.1 }}
              style={{
                padding: '2.5rem 2rem',
                background: '#050508',
                position: 'relative',
              }}
            >
              {office.primary && (
                <div style={{
                  position: 'absolute',
                  top: '1.5rem',
                  right: '1.5rem',
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '6px',
                  letterSpacing: '0.4em',
                  textTransform: 'uppercase',
                  color: '#C9B99A',
                  border: '1px solid rgba(201,185,154,0.3)',
                  padding: '3px 8px',
                }}>
                  HQ
                </div>
              )}
              <p style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: '1.5rem',
                fontWeight: 300,
                color: '#F2EDE4',
                marginBottom: '0.75rem',
                letterSpacing: '-0.01em',
              }}>
                {office.city}
              </p>
              <p style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.85rem',
                fontWeight: 300,
                color: 'rgba(242,237,228,0.35)',
                marginBottom: '1.25rem',
                lineHeight: 1.6,
              }}>
                {office.address}
              </p>
              <a href={`tel:${office.phone}`} style={{
                display: 'block',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '8px',
                letterSpacing: '0.2em',
                color: 'rgba(242,237,228,0.5)',
                textDecoration: 'none',
                marginBottom: '4px',
                transition: 'color 300ms ease',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = '#F2EDE4')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(242,237,228,0.5)')}
              >
                {office.phone}
              </a>
              <a href={`mailto:${office.email}`} style={{
                display: 'block',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '8px',
                letterSpacing: '0.2em',
                color: 'rgba(201,185,154,0.5)',
                textDecoration: 'none',
                transition: 'color 300ms ease',
              }}
                onMouseEnter={e => (e.currentTarget.style.color = '#C9B99A')}
                onMouseLeave={e => (e.currentTarget.style.color = 'rgba(201,185,154,0.5)')}
              >
                {office.email}
              </a>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Enquiry form */}
      <div style={{
        padding: 'clamp(5rem, 10vw, 8rem) clamp(2rem, 6vw, 6rem)',
        maxWidth: '1200px',
        margin: '0 auto',
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.4fr',
          gap: '6rem',
          alignItems: 'start',
        }}
          className="enquire-grid"
        >
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          >
            <p style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '9px',
              letterSpacing: '0.5em',
              textTransform: 'uppercase',
              color: 'rgba(201,185,154,0.6)',
              marginBottom: '1.5rem',
            }}>
              General Enquiry
            </p>
            {['Let\'s Create', 'Something', 'Rare'].map((line, i) => (
              <div key={line} style={{ overflow: 'hidden' }}>
                <motion.h2
                  initial={{ y: '100%' }}
                  animate={inView ? { y: 0 } : {}}
                  transition={{ duration: 0.9, delay: 0.05 + i * 0.08, ease: [0.16, 1, 0.3, 1] }}
                  style={{
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: 'clamp(2rem, 4.5vw, 4.5rem)',
                    fontWeight: 300,
                    color: i === 1 ? 'transparent' : '#F2EDE4',
                    WebkitTextStroke: i === 1 ? '1px rgba(201,185,154,0.5)' : 'none',
                    lineHeight: 0.9,
                    letterSpacing: '-0.025em',
                    fontStyle: i === 2 ? 'italic' : 'normal',
                  }}
                >
                  {line}
                </motion.h2>
              </div>
            ))}

            <p style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.9rem',
              fontWeight: 300,
              color: 'rgba(242,237,228,0.35)',
              lineHeight: 1.9,
              marginTop: '2rem',
              marginBottom: '2.5rem',
            }}>
              Our private advisors respond within 24 hours. Every enquiry is handled with complete discretion.
            </p>

            <div style={{ display: 'flex', gap: '1.5rem' }}>
              {['Instagram', 'LinkedIn', 'WhatsApp'].map(s => (
                <a key={s} href="#" style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '7px',
                  letterSpacing: '0.35em',
                  textTransform: 'uppercase',
                  color: 'rgba(242,237,228,0.22)',
                  textDecoration: 'none',
                  transition: 'color 300ms ease',
                }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#C9B99A')}
                  onMouseLeave={e => (e.currentTarget.style.color = 'rgba(242,237,228,0.22)')}
                >
                  {s}
                </a>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            {status === 'success' ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.96 }}
                animate={{ opacity: 1, scale: 1 }}
                style={{
                  textAlign: 'center',
                  padding: '5rem 2rem',
                  border: '1px solid rgba(201,185,154,0.15)',
                }}
              >
                <div style={{
                  width: '56px', height: '56px',
                  borderRadius: '50%',
                  border: '1px solid rgba(201,185,154,0.4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 2rem',
                  color: '#C9B99A',
                  fontSize: '1.2rem',
                }}>
                  ✓
                </div>
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
                  color: 'rgba(242,237,228,0.35)',
                  lineHeight: 1.8,
                }}>
                  Your enquiry has been received.
                  <br />
                  A private advisor will be in touch within 24 hours.
                </p>
              </motion.div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={label}>Full Name *</label>
                    <input style={inputStyle} placeholder="Your name"
                      value={form.name} onChange={e => update('name', e.target.value)}
                      onFocus={e => (e.target.style.borderColor = 'rgba(201,185,154,0.4)')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(242,237,228,0.08)')} />
                  </div>
                  <div>
                    <label style={label}>Email *</label>
                    <input style={inputStyle} type="email" placeholder="your@email.com"
                      value={form.email} onChange={e => update('email', e.target.value)}
                      onFocus={e => (e.target.style.borderColor = 'rgba(201,185,154,0.4)')}
                      onBlur={e => (e.target.style.borderColor = 'rgba(242,237,228,0.08)')} />
                  </div>
                </div>

                <div>
                  <label style={label}>Phone</label>
                  <input style={inputStyle} type="tel" placeholder="+251 9XX XXX XXX"
                    value={form.phone} onChange={e => update('phone', e.target.value)}
                    onFocus={e => (e.target.style.borderColor = 'rgba(201,185,154,0.4)')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(242,237,228,0.08)')} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                  <div>
                    <label style={label}>Interest</label>
                    <select style={{ ...inputStyle, cursor: 'pointer' }}
                      value={form.interest} onChange={e => update('interest', e.target.value)}>
                      {INTERESTS.map(o => (
                        <option key={o} value={o} style={{ background: '#050508' }}>{o}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label style={label}>Budget</label>
                    <select style={{ ...inputStyle, cursor: 'pointer' }}
                      value={form.budget} onChange={e => update('budget', e.target.value)}>
                      {BUDGETS.map(o => (
                        <option key={o} value={o} style={{ background: '#050508' }}>{o}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div>
                  <label style={label}>Message *</label>
                  <textarea style={{ ...inputStyle, height: '120px', resize: 'none' }}
                    placeholder="Tell us about your vision..."
                    value={form.message} onChange={e => update('message', e.target.value)}
                    onFocus={e => (e.target.style.borderColor = 'rgba(201,185,154,0.4)')}
                    onBlur={e => (e.target.style.borderColor = 'rgba(242,237,228,0.08)')} />
                </div>

                {errMsg && (
                  <p style={{
                    fontFamily: 'DM Sans, sans-serif',
                    fontSize: '0.85rem',
                    color: '#e05a5a',
                    padding: '0.75rem 1rem',
                    border: '1px solid rgba(224,90,90,0.2)',
                    background: 'rgba(224,90,90,0.04)',
                  }}>
                    {errMsg}
                  </p>
                )}

                <button
                  onClick={submit}
                  disabled={status === 'loading'}
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                  style={{
                    padding: '1.1rem',
                    background: status === 'loading' ? 'rgba(201,185,154,0.5)' : '#C9B99A',
                    border: 'none',
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '9px',
                    letterSpacing: '0.4em',
                    textTransform: 'uppercase',
                    color: '#050508',
                    cursor: status === 'loading' ? 'default' : 'none',
                    transition: 'background 400ms ease',
                    width: '100%',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.75rem',
                  }}
                  
                >
                  {status === 'loading' ? (
                    <>
                      <motion.div animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                        style={{
                          width: '12px', height: '12px',
                          border: '1.5px solid rgba(5,5,8,0.3)',
                          borderTopColor: '#050508',
                          borderRadius: '50%',
                        }} />
                      Sending...
                    </>
                  ) : 'Submit Private Enquiry →'}
                </button>

                <p style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '7px',
                  letterSpacing: '0.3em',
                  color: 'rgba(242,237,228,0.15)',
                  textAlign: 'center',
                }}>
                  All enquiries handled with complete discretion
                </p>
              </div>
            )}
          </motion.div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .about-grid { grid-template-columns: 1fr !important; gap: 2rem !important; }
          .offices-grid { grid-template-columns: 1fr !important; }
          .enquire-grid { grid-template-columns: 1fr !important; gap: 3rem !important; }
        }
      `}</style>
    </section>
  )
}