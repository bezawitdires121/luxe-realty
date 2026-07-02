'use client'

import { useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { useInView } from '@/hooks src/useInView'
import type { FloorUnit } from '@/types src'
import { useAppStore } from '@/store/useAppStore'
const FLOOR_UNITS: Record<number, FloorUnit[]> = {
  12: [
    {
      id: '1201',
       floor: 12,
      type: 'Sky Penthouse',
      status: 'available',
      beds: 4,
      baths: 4,
      balconies: 2,
      area: 4200,
      price: 145000000,
    },
    {
      id: '1202',
       floor: 12,
      type: 'Sky Penthouse',
      status: 'reserved',
      beds: 4,
      baths: 4,
      balconies: 2,
      area: 4100,
      price: 139000000,
    },
  ],

  11: [
    {
      id: '1101',
      floor: 11,
      type: 'Signature Residence',
      status: 'available',
      beds: 3,
      baths: 3,
      balconies: 2,
      area: 3200,
      price: 98000000,
    },
    {
      id: '1102',
       floor: 11,
      type: 'Signature Residence',
      status: 'sold',
      beds: 3,
      baths: 3,
      balconies: 2,
      area: 3100,
      price: 95000000,
    },
  ],

  10: [
    {
      id: '1001',
       floor: 10,
      type: 'Luxury Residence',
      status: 'available',
      beds: 3,
      baths: 2,
      balconies: 1,
      area: 2600,
      price: 72000000,
    },
    {
      id: '1002',
       floor: 10,
      type: 'Luxury Residence',
      status: 'reserved',
      beds: 3,
      baths: 2,
      balconies: 1,
      area: 2550,
      price: 69000000,
    },
    {
      id: '1003',
      floor: 10,
      type: 'Luxury Residence',
      status: 'sold',
      beds: 2,
      baths: 2,
      balconies: 1,
      area: 2400,
      price: 64000000,
    },
  ],

  9: [
    {
      id: '901',
       floor: 9,
      type: 'Executive Residence',
      status: 'available',
      beds: 2,
      baths: 2,
      balconies: 1,
      area: 2100,
      price: 54000000,
    },
    {
      id: '902',
       floor: 9,
      type: 'Executive Residence',
      status: 'reserved',
      beds: 2,
      baths: 2,
      balconies: 1,
      area: 2050,
      price: 52000000,
    },
    {
      id: '903',
       floor: 9,
      type: 'Executive Residence',
      status: 'sold',
      beds: 2,
      baths: 2,
      balconies: 1,
      area: 1980,
      price: 50000000,
    },
  ],
}
const FLOORS = Array.from({ length: 13 }, (_, i) => ({
  floor: 12 - i,
  label: 12 - i === 0 ? 'G' : String(12 - i),
  sublabel: 12 - i === 0 ? 'Ground' : null,
  hasUnits: !!(FLOOR_UNITS[12 - i]?.length),
}))

const STATUS_COLOR = {
  available: '#4ade80',
  reserved: '#C9B99A',
  sold: '#555',
} as const

// SVG Floorplan per floor
function Floorplan({
  units,
  activeUnit,
  onSelect,
}: {
  units: FloorUnit[]
  activeUnit: string | null
  onSelect: (id: string) => void
}) {
  const positions: Record<string, { x: number; y: number; w: number; h: number }> = {
    '501': { x: 55, y: 55, w: 185, h: 170 },
    '502': { x: 260, y: 35, w: 230, h: 210 },
    '503': { x: 510, y: 55, w: 185, h: 170 },
    '504': { x: 195, y: 275, w: 370, h: 160 },
    '1201': { x: 80, y: 80, w: 280, h: 220 },
    '1202': { x: 390, y: 80, w: 280, h: 220 },
    '1101': { x: 80, y: 80, w: 280, h: 220 },
    '1102': { x: 390, y: 80, w: 280, h: 220 },
    '1001': { x: 55, y: 55, w: 185, h: 160 },
    '1002': { x: 255, y: 55, w: 185, h: 160 },
    '1003': { x: 455, y: 55, w: 185, h: 160 },
    '901': { x: 55, y: 55, w: 185, h: 160 },
    '902': { x: 255, y: 55, w: 185, h: 160 },
    '903': { x: 455, y: 55, w: 185, h: 160 },
  }

  return (
    <svg viewBox="0 0 760 470" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}>
      <defs>
        <pattern id="fpGrid" width="24" height="24" patternUnits="userSpaceOnUse">
          <path d="M 24 0 L 0 0 0 24" fill="none"
            stroke="rgba(201,185,154,0.05)" strokeWidth="0.5" />
        </pattern>
      </defs>

      {/* Background */}
      <rect x="0" y="0" width="760" height="470" fill="#07070e" />
      <rect x="30" y="25" width="700" height="420" fill="url(#fpGrid)" />

      {/* Building perimeter */}
      <rect x="30" y="25" width="700" height="420"
        fill="none" stroke="rgba(201,185,154,0.2)" strokeWidth="1.5" />

      {/* Core / elevator */}
      <rect x="320" y="215" width="120" height="90"
        fill="rgba(5,5,8,0.9)" stroke="rgba(201,185,154,0.15)" strokeWidth="1" />
      <line x1="320" y1="215" x2="440" y2="305"
        stroke="rgba(201,185,154,0.08)" strokeWidth="1" />
      <line x1="440" y1="215" x2="320" y2="305"
        stroke="rgba(201,185,154,0.08)" strokeWidth="1" />
      <text x="380" y="264" textAnchor="middle"
        fill="rgba(201,185,154,0.25)" fontSize="8"
        fontFamily="JetBrains Mono, monospace" letterSpacing="2">
        CORE
      </text>

      {/* Units */}
      {units.map((unit) => {
        const pos = positions[unit.id]
        if (!pos) return null
        const isActive = activeUnit === unit.id
        const sc = STATUS_COLOR[unit.status]

        return (
          <g key={unit.id} onClick={() => onSelect(unit.id)}
            style={{ cursor: 'pointer' }}>
            {/* Unit fill */}
            <rect
              x={pos.x} y={pos.y} width={pos.w} height={pos.h}
              fill={isActive ? `${sc}18` : `${sc}08`}
              stroke={isActive ? sc : `${sc}50`}
              strokeWidth={isActive ? 1.5 : 0.8}
              style={{ transition: 'all 300ms ease' }}
            />

            {/* Interior lines */}
            <line
              x1={pos.x + pos.w * 0.5} y1={pos.y}
              x2={pos.x + pos.w * 0.5} y2={pos.y + pos.h * 0.55}
              stroke="rgba(255,255,255,0.03)" strokeWidth="0.8" />
            <line
              x1={pos.x} y1={pos.y + pos.h * 0.6}
              x2={pos.x + pos.w} y2={pos.y + pos.h * 0.6}
              stroke="rgba(255,255,255,0.03)" strokeWidth="0.8" />

            {/* Unit number */}
            <text
              x={pos.x + pos.w / 2} y={pos.y + pos.h / 2 - 10}
              textAnchor="middle"
              fill={isActive ? '#F2EDE4' : 'rgba(242,237,228,0.6)'}
              fontSize="20" fontFamily="Cormorant Garamond, Georgia, serif"
              fontWeight="300"
              style={{ transition: 'fill 300ms ease' }}>
              {unit.id}
            </text>

            {/* Unit spec */}
            <text
              x={pos.x + pos.w / 2} y={pos.y + pos.h / 2 + 10}
              textAnchor="middle"
              fill="rgba(242,237,228,0.3)"
              fontSize="7" fontFamily="JetBrains Mono, monospace"
              letterSpacing="1.5">
              {unit.beds}BR · {unit.area.toLocaleString()} ft²
            </text>

            {/* Status dot */}
            <circle
              cx={pos.x + pos.w - 12} cy={pos.y + 12} r="4"
              fill={sc} opacity="0.9" />
          </g>
        )
      })}

      {/* North indicator */}
      <g transform="translate(718, 42)">
        <circle cx="0" cy="0" r="14"
          fill="none" stroke="rgba(201,185,154,0.2)" strokeWidth="1" />
        <polygon points="0,-10 3,2 0,0 -3,2"
          fill="rgba(201,185,154,0.6)" />
        <text x="0" y="18" textAnchor="middle"
          fill="rgba(201,185,154,0.4)"
          fontSize="8" fontFamily="JetBrains Mono, monospace">N</text>
      </g>
    </svg>
  )
}

// 3D Building visualization
function BuildingViz({ activeFloor }: { activeFloor: number }) {
  const totalFloors = 12
  const floorH = 16
  const bldW = 120
  const perspective = 0.6

  return (
    <svg viewBox="0 0 200 260" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}>
      <defs>
        <linearGradient id="bvGlass" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="rgba(74,127,165,0.35)" />
          <stop offset="100%" stopColor="rgba(74,127,165,0.05)" />
        </linearGradient>
      </defs>

      {/* Sky */}
      <rect x="0" y="0" width="200" height="260" fill="#06080f" />
      {Array.from({ length: 20 }).map((_, i) => (
        <circle key={i}
          cx={(i * 47) % 200} cy={(i * 31) % 120}
          r="0.6" fill="white" opacity="0.35" />
      ))}

      {/* Ground */}
      <rect x="0" y="240" width="200" height="20" fill="#080a0c" />

      {/* Building floors */}
      {Array.from({ length: totalFloors }).map((_, i) => {
        const floor = totalFloors - i
        const y = 30 + i * floorH
        const isActive = floor === activeFloor
        const hasUnits = !!FLOOR_UNITS[floor]?.length
        const xOff = i * perspective

        return (
          <g key={floor}>
            {/* Floor block */}
            <rect
              x={40 + xOff} y={y}
              width={bldW - xOff * 1.8} height={floorH - 1}
              fill={isActive
                ? 'rgba(201,185,154,0.2)'
                : hasUnits
                ? 'rgba(74,127,165,0.12)'
                : 'rgba(10,12,20,0.8)'}
              stroke={isActive
                ? '#C9B99A'
                : 'rgba(74,127,165,0.15)'}
              strokeWidth={isActive ? 1.5 : 0.5}
              style={{ transition: 'all 400ms ease' }}
            />
            {/* Window row */}
            {Array.from({ length: 4 }).map((_, wi) => {
              const wx = 47 + xOff + wi * 22
              const lit = Math.sin(floor * 1.3 + wi) > 0
              return (
                <rect key={wi}
                  x={wx} y={y + 3}
                  width={14} height={floorH - 6}
                  fill={isActive
                    ? 'rgba(255,220,150,0.7)'
                    : lit
                    ? 'rgba(255,220,150,0.18)'
                    : 'rgba(74,127,165,0.08)'}
                  style={{ transition: 'fill 400ms ease' }}
                />
              )
            })}
            {/* Floor label */}
            <text
              x={35 + xOff} y={y + floorH / 2 + 3.5}
              textAnchor="end"
              fill={isActive ? '#C9B99A' : 'rgba(242,237,228,0.2)'}
              fontSize="7" fontFamily="JetBrains Mono, monospace"
              style={{ transition: 'fill 400ms ease' }}>
              {floor}
            </text>
          </g>
        )
      })}

      {/* Building top */}
      <polygon
        points={`40,30 ${40 + bldW},30 ${40 + bldW - 2},22 42,22`}
        fill="#1a2030" stroke="rgba(74,127,165,0.2)" strokeWidth="0.5" />
      <rect x="88" y="14" width="24" height="10" fill="#101520" />
      <line x1="100" y1="8" x2="100" y2="14"
        stroke="rgba(201,185,154,0.3)" strokeWidth="1" />

      {/* LUXE sign */}
      <text x="100" y="232" textAnchor="middle"
        fill="rgba(201,185,154,0.5)"
        fontSize="7" fontFamily="Cormorant Garamond, Georgia, serif"
        letterSpacing="4">LUXE</text>
    </svg>
  )
}

export default function TowerDashboard() {
  const { ref, inView } = useInView({ threshold: 0.1 })
  const [activeFloor, setActiveFloor] = useState(5)
  const [activeUnit, setActiveUnit] = useState<string | null>('502')
  const [activeTab, setActiveTab] = useState<'overview' | 'floors' | 'amenities' | 'gallery' | 'location' | 'availability'>('overview')
  const { setCursorVariant } = useAppStore()

  const units = FLOOR_UNITS[activeFloor] || []
  const unit = units.find(u => u.id === activeUnit)

  const tabs = [
    { id: 'overview', icon: '⊞', label: 'Overview' },
    { id: 'floors', icon: '≡', label: 'Floors' },
    { id: 'amenities', icon: '◈', label: 'Amenities' },
    { id: 'gallery', icon: '⊟', label: 'Gallery' },
    { id: 'location', icon: '◎', label: 'Location' },
    { id: 'availability', icon: '◐', label: 'Availability' },
  ] as const

  return (
    <section
      id="tower"
      ref={ref}
      style={{
        background: '#06060e',
        borderTop: '1px solid rgba(242,237,228,0.04)',
        borderBottom: '1px solid rgba(242,237,228,0.04)',
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* ── Header row ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '220px 1fr',
          borderBottom: '1px solid rgba(242,237,228,0.05)',
          minHeight: '340px',
        }}
          className="tower-header"
        >
          {/* Sidebar */}
          <div style={{
            borderRight: '1px solid rgba(242,237,228,0.05)',
            display: 'flex',
            flexDirection: 'column',
          }}>
            <div style={{ padding: '2rem 1.5rem 1.5rem' }}>
              <p style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '7px',
                letterSpacing: '0.45em',
                textTransform: 'uppercase',
                color: 'rgba(201,185,154,0.4)',
                marginBottom: '5px',
              }}>
                The Building
              </p>
              <p style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: '1.5rem',
                fontWeight: 300,
                color: '#F2EDE4',
                letterSpacing: '-0.01em',
              }}>
                LUXE Residences
              </p>
            </div>

            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  width: '100%',
                  padding: '0.7rem 1.5rem',
                  background: activeTab === tab.id ? 'rgba(201,185,154,0.06)' : 'transparent',
                  border: 'none',
                  borderLeft: activeTab === tab.id
                    ? '2px solid #C9B99A'
                    : '2px solid transparent',
                  cursor: 'none',
                  textAlign: 'left',
                  transition: 'all 250ms ease',
                }}
              >
                <span style={{
                  fontSize: '11px',
                  color: activeTab === tab.id ? '#C9B99A' : 'rgba(242,237,228,0.2)',
                  transition: 'color 250ms ease',
                }}>
                  {tab.icon}
                </span>
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '8px',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: activeTab === tab.id ? '#F2EDE4' : 'rgba(242,237,228,0.3)',
                  transition: 'color 250ms ease',
                }}>
                  {tab.label}
                </span>
              </button>
            ))}
          </div>

          {/* Building visualization */}
          <div style={{ position: 'relative', overflow: 'hidden' }}>
            {/* Video or 3D building */}
            <div style={{
              position: 'absolute',
              inset: 0,
              background: 'linear-gradient(135deg, #080a14 0%, #0d1020 100%)',
            }}>
              <video
                src="/interiors/tower.jpg"
                autoPlay
                muted
                loop
                playsInline
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  opacity: 0.45,
                }}
                onError={e => { (e.target as HTMLVideoElement).style.display = 'none' }}
              />
            </div>

            {/* Building SVG overlay */}
            <div style={{
              position: 'absolute',
              right: '2rem',
              top: '50%',
              transform: 'translateY(-50%)',
              width: '160px',
              height: '220px',
            }}>
              <BuildingViz activeFloor={activeFloor} />
            </div>

            {/* Info overlay */}
            <div style={{
              position: 'absolute',
              top: '2rem',
              left: '2rem',
            }}>
              <p style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '8px',
                letterSpacing: '0.45em',
                textTransform: 'uppercase',
                color: 'rgba(201,185,154,0.5)',
                marginBottom: '6px',
              }}>
                Bole Medhanialem, Addis Ababa
              </p>
              <p style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: '1.6rem',
                fontWeight: 300,
                color: '#F2EDE4',
                letterSpacing: '-0.01em',
              }}>
                LUXE Tower — 12 Floors
              </p>

              {/* Quick stats */}
              <div style={{
                display: 'flex',
                gap: '2rem',
                marginTop: '1.5rem',
              }}>
                {[
                  { v: '36', l: 'Total Units' },
                  { v: '4', l: 'Penthouses' },
                  { v: '78%', l: 'Sold' },
                ].map(item => (
                  <div key={item.l}>
                    <p style={{
                      fontFamily: 'Cormorant Garamond, Georgia, serif',
                      fontSize: '1.4rem',
                      fontWeight: 300,
                      color: '#C9B99A',
                      lineHeight: 1,
                    }}>
                      {item.v}
                    </p>
                    <p style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '7px',
                      letterSpacing: '0.35em',
                      textTransform: 'uppercase',
                      color: 'rgba(242,237,228,0.25)',
                      marginTop: '3px',
                    }}>
                      {item.l}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── Explorer grid ── */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '220px 160px 1fr 300px',
          minHeight: '380px',
          borderBottom: '1px solid rgba(242,237,228,0.05)',
        }}
          className="tower-explorer"
        >
          {/* Col 1 — sidebar filler */}
          <div style={{ borderRight: '1px solid rgba(242,237,228,0.05)' }} />

          {/* Col 2 — Floor selector */}
          <div style={{ borderRight: '1px solid rgba(242,237,228,0.05)' }}>
            <p style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '7px',
              letterSpacing: '0.45em',
              textTransform: 'uppercase',
              color: 'rgba(201,185,154,0.4)',
              padding: '1.25rem 1.25rem 0.75rem',
            }}>
              Select Floor
            </p>
            <div style={{ overflowY: 'auto', maxHeight: '320px' }}>
              {FLOORS.map((f) => (
                <button
                  key={f.floor}
                  onClick={() => {
                    setActiveFloor(f.floor)
                    setActiveUnit(null)
                  }}
                  onMouseEnter={() => setCursorVariant('hover')}
                  onMouseLeave={() => setCursorVariant('default')}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '0.55rem 1.25rem',
                    background: activeFloor === f.floor
                      ? 'rgba(201,185,154,0.07)' : 'transparent',
                    border: 'none',
                    borderLeft: activeFloor === f.floor
                      ? '2px solid #C9B99A' : '2px solid transparent',
                    cursor: 'none',
                    transition: 'all 220ms ease',
                  }}
                >
                  <span style={{
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: '1.15rem',
                    fontWeight: 300,
                    color: activeFloor === f.floor
                      ? '#F2EDE4' : 'rgba(242,237,228,0.35)',
                    transition: 'color 220ms ease',
                  }}>
                    {f.label}
                  </span>
                  {f.sublabel && (
                    <span style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '6px',
                      letterSpacing: '0.3em',
                      color: 'rgba(242,237,228,0.18)',
                      textTransform: 'uppercase',
                    }}>
                      {f.sublabel}
                    </span>
                  )}
                  {f.hasUnits && activeFloor === f.floor && (
                    <div style={{
                      width: '5px',
                      height: '5px',
                      borderRadius: '50%',
                      background: '#C9B99A',
                    }} />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Col 3 — Floorplan */}
          <div style={{
            borderRight: '1px solid rgba(242,237,228,0.05)',
            padding: '1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
            }}>
              <div>
                <p style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: '1.6rem',
                  fontWeight: 300,
                  color: '#F2EDE4',
                  letterSpacing: '-0.01em',
                  lineHeight: 1,
                }}>
                  Floor {activeFloor === 0 ? 'G' : activeFloor}
                </p>
                <p style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '8px',
                  letterSpacing: '0.3em',
                  color: 'rgba(242,237,228,0.25)',
                  textTransform: 'uppercase',
                  marginTop: '3px',
                }}>
                  {units.length} {units.length === 1 ? 'Residence' : 'Residences'}
                </p>
              </div>
              <button
                onMouseEnter={() => setCursorVariant('hover')}
                onMouseLeave={() => setCursorVariant('default')}
                style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '7px',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: '#C9B99A',
                  background: 'none',
                  border: '1px solid rgba(201,185,154,0.25)',
                  padding: '5px 12px',
                  cursor: 'none',
                  transition: 'border-color 300ms ease',
                }}
                
              >
                Floor Plan ⤢
              </button>
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', gap: '1.25rem' }}>
              {(Object.entries(STATUS_COLOR) as [string, string][]).map(([s, c]) => (
                <div key={s} style={{
                  display: 'flex', alignItems: 'center', gap: '5px',
                }}>
                  <div style={{
                    width: '7px', height: '7px',
                    borderRadius: '50%', background: c,
                  }} />
                  <span style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '7px',
                    letterSpacing: '0.3em',
                    textTransform: 'uppercase',
                    color: 'rgba(242,237,228,0.3)',
                  }}>
                    {s}
                  </span>
                </div>
              ))}
            </div>

            {/* Floorplan SVG */}
            <div style={{
              flex: 1,
              minHeight: '240px',
              border: '1px solid rgba(242,237,228,0.05)',
              overflow: 'hidden',
            }}>
              {units.length > 0 ? (
                <Floorplan
                  units={units}
                  activeUnit={activeUnit}
                  onSelect={setActiveUnit}
                />
              ) : (
                <div style={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#07070e',
                }}>
                  <p style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '8px',
                    letterSpacing: '0.4em',
                    color: 'rgba(242,237,228,0.15)',
                    textTransform: 'uppercase',
                  }}>
                    {activeFloor === 0 ? 'Lobby & Amenities' : 'No Residential Units'}
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* Col 4 — Unit details */}
          <div style={{ padding: '1.5rem' }}>
            <AnimatePresence mode="wait">
              {unit ? (
                <motion.div
                  key={unit.id}
                  initial={{ opacity: 0, x: 16 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -16 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <p style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '7px',
                    letterSpacing: '0.45em',
                    textTransform: 'uppercase',
                    color: STATUS_COLOR[unit.status],
                    marginBottom: '4px',
                  }}>
                    Residence {unit.id} · {unit.status}
                  </p>
                  <p style={{
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: '1.35rem',
                    fontWeight: 300,
                    color: '#F2EDE4',
                    letterSpacing: '-0.01em',
                    marginBottom: '1.5rem',
                    lineHeight: 1.2,
                  }}>
                    {unit.type}
                  </p>

                  {/* Price */}
                  <div style={{
                    padding: '1rem',
                    background: 'rgba(201,185,154,0.05)',
                    border: '1px solid rgba(201,185,154,0.1)',
                    marginBottom: '1.25rem',
                  }}>
                    <p style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '7px',
                      letterSpacing: '0.4em',
                      textTransform: 'uppercase',
                      color: 'rgba(201,185,154,0.4)',
                      marginBottom: '4px',
                    }}>
                      Price
                    </p>
                    <p style={{
                      fontFamily: 'Cormorant Garamond, Georgia, serif',
                      fontSize: '1.4rem',
                      fontWeight: 300,
                      color: '#C9B99A',
                    }}>
                      ETB {unit.price.toLocaleString()}
                    </p>
                  </div>

                  {/* Specs */}
                  {[
                    { icon: '⬛', label: 'Area', value: `${unit.area.toLocaleString()} sqft` },
                    { icon: '🛏', label: 'Bedrooms', value: unit.beds },
                    { icon: '🚿', label: 'Bathrooms', value: unit.baths },
                    { icon: '🌿', label: 'Balconies', value: unit.balconies },
                  ].map((spec) => (
                    <div key={spec.label} style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      padding: '0.65rem 0',
                      borderBottom: '1px solid rgba(242,237,228,0.04)',
                    }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '10px', opacity: 0.5 }}>{spec.icon}</span>
                        <span style={{
                          fontFamily: 'JetBrains Mono, monospace',
                          fontSize: '7px',
                          letterSpacing: '0.3em',
                          textTransform: 'uppercase',
                          color: 'rgba(242,237,228,0.3)',
                        }}>
                          {spec.label}
                        </span>
                      </div>
                      <span style={{
                        fontFamily: 'Cormorant Garamond, Georgia, serif',
                        fontSize: '1rem',
                        fontWeight: 300,
                        color: 'rgba(242,237,228,0.8)',
                      }}>
                        {spec.value}
                      </span>
                    </div>
                  ))}

                  {/* CTA */}
                  <button
                    onClick={() => {
                      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    onMouseEnter={() => setCursorVariant('hover')}
                    onMouseLeave={() => setCursorVariant('default')}
                    style={{
                      width: '100%',
                      marginTop: '1.5rem',
                      padding: '0.95rem',
                      background: '#C9B99A',
                      color: '#050508',
                      border: 'none',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '8px',
                      letterSpacing: '0.38em',
                      textTransform: 'uppercase',
                      cursor: 'none',
                      transition: 'background 350ms ease',
                    }}
                    
                  >
                    Enter Residence →
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '1rem',
                    padding: '2rem 0',
                  }}
                >
                  <div style={{
                    width: '40px',
                    height: '40px',
                    border: '1px solid rgba(201,185,154,0.2)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}>
                    <span style={{ color: 'rgba(201,185,154,0.4)', fontSize: '18px' }}>⊞</span>
                  </div>
                  <p style={{
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: '1rem',
                    fontWeight: 300,
                    color: 'rgba(242,237,228,0.25)',
                    textAlign: 'center',
                    lineHeight: 1.6,
                  }}>
                    Select a residence
                    <br />on the floor plan
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>

      <style>{`
        @media (max-width: 900px) {
          .tower-header { grid-template-columns: 1fr !important; }
          .tower-explorer { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}