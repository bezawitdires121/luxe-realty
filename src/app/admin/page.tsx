'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

const PASSWORD = 'luxe2024admin'

const STATUS_COLORS: Record<string, string> = {
  available: '#4ade80',
  reserved: '#C9B99A',
  sold: '#555',
  new: '#4A7FA5',
  contacted: '#C9B99A',
  qualified: '#4ade80',
  closed: '#555',
  pending: '#4A7FA5',
  confirmed: '#4ade80',
  cancelled: '#e05a5a',
  completed: '#888',
}

interface Unit {
  id: string
  floor: number
  type: string
  beds: number
  baths: number
  area: number
  balconies: number
  status: string
  price: number
}

interface Enquiry {
  id: string
  name: string
  email: string
  phone?: string
  interest?: string
  budget?: string
  message: string
  type: string
  status: string
  created_at: string
}

interface Appointment {
  id: string
  name: string
  email: string
  phone?: string
  residence: string
  date: string
  time: string
  status: string
  created_at: string
}

type Tab = 'overview' | 'units' | 'enquiries' | 'appointments'

function StatCard({
  label, value, sub, color = '#C9B99A',
}: {
  label: string
  value: string | number
  sub?: string
  color?: string
}) {
  return (
    <div style={{
      padding: '1.5rem',
      background: 'rgba(242,237,228,0.03)',
      border: '1px solid rgba(242,237,228,0.07)',
    }}>
      <p style={{
        fontFamily: 'JetBrains Mono, monospace',
        fontSize: '7px', letterSpacing: '0.4em',
        textTransform: 'uppercase',
        color: 'rgba(242,237,228,0.3)',
        marginBottom: '8px',
      }}>
        {label}
      </p>
      <p style={{
        fontFamily: 'Cormorant Garamond, Georgia, serif',
        fontSize: '2.2rem', fontWeight: 300,
        color, lineHeight: 1,
        marginBottom: sub ? '4px' : 0,
      }}>
        {value}
      </p>
      {sub && (
        <p style={{
          fontFamily: 'DM Sans, sans-serif',
          fontSize: '0.75rem',
          color: 'rgba(242,237,228,0.25)',
          fontWeight: 300,
        }}>
          {sub}
        </p>
      )}
    </div>
  )
}

export default function AdminPage() {
  const [authed, setAuthed] = useState(false)
  const [pwd, setPwd] = useState('')
  const [pwdError, setPwdError] = useState('')
  const [tab, setTab] = useState<Tab>('overview')
  const [units, setUnits] = useState<Unit[]>([])
  const [enquiries, setEnquiries] = useState<Enquiry[]>([])
  const [appointments, setAppointments] = useState<Appointment[]>([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (!authed) return
    setLoading(true)
    Promise.all([
      fetch('/api/units').then(r => r.json()).catch(() => ({ units: [] })),
      fetch('/api/admin/enquiries').then(r => r.json()).catch(() => ({ enquiries: [] })),
      fetch('/api/admin/appointments').then(r => r.json()).catch(() => ({ appointments: [] })),
    ]).then(([u, e, a]) => {
      setUnits(u.units || [])
      setEnquiries(e.enquiries || [])
      setAppointments(a.appointments || [])
    }).finally(() => setLoading(false))
  }, [authed])

  const login = () => {
    if (pwd === PASSWORD) {
      setAuthed(true)
      setPwdError('')
    } else {
      setPwdError('Incorrect password.')
    }
  }

  const thStyle: React.CSSProperties = {
    fontFamily: 'JetBrains Mono, monospace',
    fontSize: '7px', letterSpacing: '0.4em',
    textTransform: 'uppercase',
    color: 'rgba(242,237,228,0.3)',
    padding: '0.75rem 1rem',
    textAlign: 'left',
    borderBottom: '1px solid rgba(242,237,228,0.06)',
    fontWeight: 400,
    whiteSpace: 'nowrap',
  }

  const tdStyle: React.CSSProperties = {
    fontFamily: 'DM Sans, sans-serif',
    fontSize: '0.85rem', fontWeight: 300,
    color: 'rgba(242,237,228,0.65)',
    padding: '0.9rem 1rem',
    borderBottom: '1px solid rgba(242,237,228,0.04)',
  }

  // Stats
  const available = units.filter(u => u.status === 'available').length
  const reserved  = units.filter(u => u.status === 'reserved').length
  const sold      = units.filter(u => u.status === 'sold').length
  const totalVal  = units.reduce((s, u) => s + u.price, 0)
  const soldVal   = units.filter(u => u.status === 'sold').reduce((s, u) => s + u.price, 0)
  const newEnq    = enquiries.filter(e => e.status === 'new').length

  // ── Login screen ──────────────────────────────────────
  if (!authed) {
    return (
      <div style={{
        minHeight: '100vh',
        background: '#050508',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: 'DM Sans, sans-serif',
      }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          style={{
            width: '380px',
            padding: '3rem',
            border: '1px solid rgba(242,237,228,0.08)',
            background: 'rgba(242,237,228,0.02)',
          }}
        >
          <p style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '1.8rem', fontWeight: 300,
            color: '#F2EDE4', marginBottom: '4px',
            letterSpacing: '-0.01em',
          }}>
            LUXE Admin
          </p>
          <p style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '7px', letterSpacing: '0.4em',
            textTransform: 'uppercase',
            color: 'rgba(242,237,228,0.2)',
            marginBottom: '2.5rem',
          }}>
            Restricted Access
          </p>

          <input
            type="password"
            placeholder="Enter password"
            value={pwd}
            onChange={e => setPwd(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && login()}
            style={{
              width: '100%',
              background: 'rgba(242,237,228,0.04)',
              border: '1px solid rgba(242,237,228,0.1)',
              padding: '0.9rem 1rem',
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.9rem',
              color: '#F2EDE4',
              outline: 'none',
              marginBottom: '1rem',
              boxSizing: 'border-box',
            }}
          />

          {pwdError && (
            <p style={{
              fontFamily: 'DM Sans, sans-serif',
              fontSize: '0.8rem',
              color: '#e05a5a',
              marginBottom: '1rem',
            }}>
              {pwdError}
            </p>
          )}

          <button
            onClick={login}
            style={{
              width: '100%',
              padding: '0.9rem',
              background: '#C9B99A',
              border: 'none',
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '8px', letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: '#050508',
              cursor: 'pointer',
              transition: 'background 300ms ease',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = '#F2EDE4')}
            onMouseLeave={e => (e.currentTarget.style.background = '#C9B99A')}
          >
            Enter Dashboard →
          </button>
        </motion.div>
      </div>
    )
  }

  // ── Dashboard ────────────────────────────────────────
  return (
    <div style={{
      minHeight: '100vh',
      background: '#050508',
      color: '#F2EDE4',
      fontFamily: 'DM Sans, sans-serif',
    }}>

      {/* Header */}
      <div style={{
        borderBottom: '1px solid rgba(242,237,228,0.06)',
        padding: '1.25rem 2rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        background: 'rgba(5,5,8,0.95)',
        backdropFilter: 'blur(16px)',
        position: 'sticky',
        top: 0,
        zIndex: 50,
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <p style={{
            fontFamily: 'Cormorant Garamond, Georgia, serif',
            fontSize: '1.2rem', fontWeight: 300,
            color: '#F2EDE4', letterSpacing: '0.1em',
          }}>
            LUXE
          </p>
          <span style={{ color: 'rgba(242,237,228,0.15)' }}>|</span>
          <p style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '8px', letterSpacing: '0.35em',
            textTransform: 'uppercase',
            color: 'rgba(242,237,228,0.3)',
          }}>
            Admin Dashboard
          </p>
          {newEnq > 0 && (
            <span style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '7px', letterSpacing: '0.2em',
              color: '#050508',
              background: '#4A7FA5',
              padding: '2px 8px',
            }}>
              {newEnq} NEW
            </span>
          )}
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <div style={{
              width: '6px', height: '6px',
              borderRadius: '50%', background: '#4ade80',
            }} />
            <span style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '7px', letterSpacing: '0.3em',
              color: 'rgba(242,237,228,0.3)',
            }}>
              Live
            </span>
          </div>
          <a href="/" style={{
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '8px', letterSpacing: '0.3em',
            textTransform: 'uppercase',
            color: 'rgba(242,237,228,0.3)',
            textDecoration: 'none',
            transition: 'color 300ms ease',
          }}
            onMouseEnter={e => (e.currentTarget.style.color = '#F2EDE4')}
            onMouseLeave={e => (e.currentTarget.style.color = 'rgba(242,237,228,0.3)')}
          >
          ← View Site
          </a>
          <button
            onClick={() => setAuthed(false)}
            style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '8px', letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(242,237,228,0.3)',
              background: 'none',
              border: '1px solid rgba(242,237,228,0.1)',
              padding: '5px 12px',
              cursor: 'pointer',
              transition: 'all 300ms ease',
            }}
            onMouseEnter={e => {
              e.currentTarget.style.color = '#F2EDE4'
              e.currentTarget.style.borderColor = 'rgba(242,237,228,0.3)'
            }}
            onMouseLeave={e => {
              e.currentTarget.style.color = 'rgba(242,237,228,0.3)'
              e.currentTarget.style.borderColor = 'rgba(242,237,228,0.1)'
            }}
          >
            Logout
          </button>
        </div>
      </div>

      <div style={{ padding: '2rem', maxWidth: '1400px', margin: '0 auto' }}>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          borderBottom: '1px solid rgba(242,237,228,0.06)',
          marginBottom: '2rem',
        }}>
          {(['overview', 'units', 'enquiries', 'appointments'] as Tab[]).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              style={{
                padding: '0.75rem 1.5rem',
                background: 'none',
                border: 'none',
                borderBottom: tab === t ? '1px solid #C9B99A' : '1px solid transparent',
                marginBottom: '-1px',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '8px', letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: tab === t ? '#F2EDE4' : 'rgba(242,237,228,0.25)',
                cursor: 'pointer',
                transition: 'all 250ms ease',
              }}
            >
              {t}
              {t === 'enquiries' && newEnq > 0 && (
                <span style={{
                  marginLeft: '6px',
                  background: '#4A7FA5',
                  color: '#F2EDE4',
                  fontSize: '6px',
                  padding: '1px 5px',
                  borderRadius: '2px',
                }}>
                  {newEnq}
                </span>
              )}
            </button>
          ))}
        </div>

        {loading && (
          <div style={{
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            marginBottom: '2rem',
            color: 'rgba(242,237,228,0.3)',
            fontFamily: 'JetBrains Mono, monospace',
            fontSize: '8px', letterSpacing: '0.3em',
          }}>
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              style={{
                width: '14px', height: '14px',
                border: '1.5px solid rgba(242,237,228,0.1)',
                borderTopColor: '#C9B99A',
                borderRadius: '50%',
              }}
            />
            Loading live data...
          </div>
        )}

        <AnimatePresence mode="wait">

          {/* ── OVERVIEW ── */}
          {tab === 'overview' && (
            <motion.div
              key="overview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Stats grid */}
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(170px, 1fr))',
                gap: '1rem',
                marginBottom: '2.5rem',
              }}>
                <StatCard label="Total Units" value={units.length} />
                <StatCard
                  label="Available" value={available} color="#4ade80"
                  sub={units.length ? `${Math.round(available / units.length * 100)}% of portfolio` : ''}
                />
                <StatCard label="Reserved" value={reserved} color="#C9B99A" />
                <StatCard label="Sold" value={sold} color="#666" />
                <StatCard
                  label="Portfolio Value"
                  value={`ETB ${(totalVal / 1e9).toFixed(1)}B`}
                />
                <StatCard
                  label="Revenue (Sold)"
                  value={`ETB ${(soldVal / 1e6).toFixed(0)}M`}
                  color="#4ade80"
                />
                <StatCard label="Total Enquiries" value={enquiries.length} color="#4A7FA5" />
                <StatCard label="New Enquiries" value={newEnq} color="#4ade80"
                  sub="Awaiting response" />
              </div>

              {/* Availability bar */}
              <div style={{
                padding: '1.5rem',
                border: '1px solid rgba(242,237,228,0.07)',
                marginBottom: '2rem',
              }}>
                <p style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '7px', letterSpacing: '0.4em',
                  textTransform: 'uppercase',
                  color: 'rgba(242,237,228,0.3)',
                  marginBottom: '1rem',
                }}>
                  Portfolio Availability
                </p>
                <div style={{
                  display: 'flex',
                  height: '8px',
                  overflow: 'hidden',
                  gap: '1px',
                }}>
                  {[
                    { count: available, color: '#4ade80' },
                    { count: reserved,  color: '#C9B99A' },
                    { count: sold,      color: '#333' },
                  ].map((seg, i) => (
                    <div key={i} style={{
                      flex: seg.count || 0,
                      background: seg.color,
                      minWidth: seg.count ? '2px' : 0,
                      transition: 'flex 1s ease',
                    }} />
                  ))}
                </div>
                <div style={{ display: 'flex', gap: '2rem', marginTop: '0.75rem' }}>
                  {[
                    { label: 'Available', color: '#4ade80', count: available },
                    { label: 'Reserved',  color: '#C9B99A', count: reserved },
                    { label: 'Sold',      color: '#555',    count: sold },
                  ].map(item => (
                    <div key={item.label} style={{
                      display: 'flex', alignItems: 'center', gap: '6px',
                    }}>
                      <div style={{
                        width: '8px', height: '8px',
                        borderRadius: '50%', background: item.color,
                      }} />
                      <span style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '7px', letterSpacing: '0.3em',
                        textTransform: 'uppercase',
                        color: 'rgba(242,237,228,0.4)',
                      }}>
                        {item.label} ({item.count})
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recent enquiries preview */}
              {enquiries.length > 0 && (
                <div>
                  <p style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '7px', letterSpacing: '0.4em',
                    textTransform: 'uppercase',
                    color: 'rgba(242,237,228,0.3)',
                    marginBottom: '1rem',
                  }}>
                    Recent Enquiries
                  </p>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {enquiries.slice(0, 5).map(e => (
                      <div key={e.id} style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        padding: '0.9rem 1.25rem',
                        border: '1px solid rgba(242,237,228,0.05)',
                        background: e.status === 'new' ? 'rgba(74,127,165,0.05)' : 'transparent',
                        flexWrap: 'wrap',
                        gap: '0.5rem',
                      }}>
                        <div>
                          <p style={{
                            fontFamily: 'DM Sans, sans-serif',
                            fontSize: '0.9rem',
                            color: '#F2EDE4',
                            marginBottom: '2px',
                          }}>
                            {e.name}
                          </p>
                          <p style={{
                            fontFamily: 'JetBrains Mono, monospace',
                            fontSize: '7px', letterSpacing: '0.2em',
                            color: 'rgba(242,237,228,0.3)',
                          }}>
                            {e.email} · {e.interest || 'General'}
                          </p>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                          <span style={{
                            fontFamily: 'JetBrains Mono, monospace',
                            fontSize: '7px', letterSpacing: '0.3em',
                            textTransform: 'uppercase',
                            color: STATUS_COLORS[e.status] || '#888',
                            border: `1px solid ${STATUS_COLORS[e.status] || '#888'}40`,
                            padding: '2px 8px',
                          }}>
                            {e.status}
                          </span>
                          <span style={{
                            fontFamily: 'JetBrains Mono, monospace',
                            fontSize: '7px',
                            color: 'rgba(242,237,228,0.2)',
                          }}>
                            {new Date(e.created_at).toLocaleDateString()}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  {enquiries.length > 5 && (
                    <button
                      onClick={() => setTab('enquiries')}
                      style={{
                        marginTop: '1rem',
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '7px', letterSpacing: '0.3em',
                        textTransform: 'uppercase',
                        color: '#C9B99A',
                        background: 'none', border: 'none',
                        cursor: 'pointer',
                        textDecoration: 'underline',
                        textUnderlineOffset: '3px',
                      }}
                    >
                      View All {enquiries.length} Enquiries →
                    </button>
                  )}
                </div>
              )}
            </motion.div>
          )}

          {/* ── UNITS ── */}
          {tab === 'units' && (
            <motion.div
              key="units"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              <div style={{ overflowX: 'auto' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '700px' }}>
                  <thead>
                    <tr>
                      {['Unit', 'Floor', 'Type', 'Beds', 'Baths', 'Area (ft²)', 'Price (ETB)', 'Status'].map(h => (
                        <th key={h} style={thStyle}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {[...units]
                      .sort((a, b) => b.floor - a.floor || a.id.localeCompare(b.id))
                      .map(unit => (
                        <tr
                          key={unit.id}
                          style={{ transition: 'background 200ms ease' }}
                          onMouseEnter={e => (e.currentTarget.style.background = 'rgba(242,237,228,0.02)')}
                          onMouseLeave={e => (e.currentTarget.style.background = 'transparent')}
                        >
                          <td style={{
                            ...tdStyle,
                            fontFamily: 'JetBrains Mono, monospace',
                            color: '#C9B99A',
                          }}>
                            {unit.id}
                          </td>
                          <td style={tdStyle}>{unit.floor === 0 ? 'G' : unit.floor}</td>
                          <td style={tdStyle}>{unit.type}</td>
                          <td style={tdStyle}>{unit.beds}</td>
                          <td style={tdStyle}>{unit.baths}</td>
                          <td style={tdStyle}>{unit.area.toLocaleString()}</td>
                          <td style={{
                            ...tdStyle,
                            fontFamily: 'Cormorant Garamond, Georgia, serif',
                            fontSize: '1rem',
                          }}>
                            {unit.price.toLocaleString()}
                          </td>
                          <td style={tdStyle}>
                            <span style={{
                              fontFamily: 'JetBrains Mono, monospace',
                              fontSize: '7px', letterSpacing: '0.3em',
                              textTransform: 'uppercase',
                              color: STATUS_COLORS[unit.status] || '#888',
                              border: `1px solid ${STATUS_COLORS[unit.status] || '#888'}30`,
                              padding: '3px 8px',
                            }}>
                              {unit.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            </motion.div>
          )}

          {/* ── ENQUIRIES ── */}
          {tab === 'enquiries' && (
            <motion.div
              key="enquiries"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {enquiries.length === 0 ? (
                <div style={{
                  textAlign: 'center', padding: '5rem 2rem',
                  color: 'rgba(242,237,228,0.2)',
                }}>
                  <p style={{
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: '1.5rem', fontWeight: 300,
                  }}>
                    No enquiries yet
                  </p>
                  <p style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '8px', letterSpacing: '0.3em',
                    textTransform: 'uppercase', marginTop: '0.5rem',
                  }}>
                    They will appear here once submitted
                  </p>
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                    <thead>
                      <tr>
                        {['Name', 'Email', 'Phone', 'Interest', 'Type', 'Status', 'Date'].map(h => (
                          <th key={h} style={thStyle}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {enquiries.map(e => (
                        <tr
                          key={e.id}
                          style={{ transition: 'background 200ms ease' }}
                          onMouseEnter={ev => (ev.currentTarget.style.background = 'rgba(242,237,228,0.02)')}
                          onMouseLeave={ev => (ev.currentTarget.style.background = 'transparent')}
                        >
                          <td style={tdStyle}>{e.name}</td>
                          <td style={{ ...tdStyle, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem' }}>
                            {e.email}
                          </td>
                          <td style={tdStyle}>{e.phone || '—'}</td>
                          <td style={tdStyle}>{e.interest || '—'}</td>
                          <td style={tdStyle}>
                            <span style={{
                              fontFamily: 'JetBrains Mono, monospace',
                              fontSize: '7px', letterSpacing: '0.2em',
                              textTransform: 'uppercase',
                              color: e.type === 'viewing' ? '#C9B99A' : '#4A7FA5',
                            }}>
                              {e.type}
                            </span>
                          </td>
                          <td style={tdStyle}>
                            <span style={{
                              fontFamily: 'JetBrains Mono, monospace',
                              fontSize: '7px', letterSpacing: '0.2em',
                              textTransform: 'uppercase',
                              color: STATUS_COLORS[e.status] || '#888',
                              border: `1px solid ${STATUS_COLORS[e.status] || '#888'}30`,
                              padding: '2px 7px',
                            }}>
                              {e.status}
                            </span>
                          </td>
                          <td style={{ ...tdStyle, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.75rem' }}>
                            {new Date(e.created_at).toLocaleDateString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}

          {/* ── APPOINTMENTS ── */}
          {tab === 'appointments' && (
            <motion.div
              key="appointments"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
            >
              {appointments.length === 0 ? (
                <div style={{
                  textAlign: 'center', padding: '5rem 2rem',
                  color: 'rgba(242,237,228,0.2)',
                }}>
                  <p style={{
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: '1.5rem', fontWeight: 300,
                  }}>
                    No appointments booked yet
                  </p>
                  <p style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '8px', letterSpacing: '0.3em',
                    textTransform: 'uppercase', marginTop: '0.5rem',
                  }}>
                    Private viewings appear here
                  </p>
                </div>
              ) : (
                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', minWidth: '800px' }}>
                    <thead>
                      <tr>
                        {['Name', 'Email', 'Phone', 'Residence', 'Date', 'Time', 'Status'].map(h => (
                          <th key={h} style={thStyle}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {appointments.map(a => (
                        <tr
                          key={a.id}
                          style={{ transition: 'background 200ms ease' }}
                          onMouseEnter={ev => (ev.currentTarget.style.background = 'rgba(242,237,228,0.02)')}
                          onMouseLeave={ev => (ev.currentTarget.style.background = 'transparent')}
                        >
                          <td style={tdStyle}>{a.name}</td>
                          <td style={{ ...tdStyle, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem' }}>
                            {a.email}
                          </td>
                          <td style={tdStyle}>{a.phone || '—'}</td>
                          <td style={tdStyle}>{a.residence}</td>
                          <td style={{ ...tdStyle, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem' }}>
                            {a.date}
                          </td>
                          <td style={{ ...tdStyle, fontFamily: 'JetBrains Mono, monospace', fontSize: '0.78rem' }}>
                            {a.time}
                          </td>
                          <td style={tdStyle}>
                            <span style={{
                              fontFamily: 'JetBrains Mono, monospace',
                              fontSize: '7px', letterSpacing: '0.2em',
                              textTransform: 'uppercase',
                              color: STATUS_COLORS[a.status] || '#888',
                              border: `1px solid ${STATUS_COLORS[a.status] || '#888'}30`,
                              padding: '2px 7px',
                            }}>
                              {a.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  )
}