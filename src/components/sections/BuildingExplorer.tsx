'use client'

import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import type { ReactElement } from 'react'
const FLOORS = [
  { floor: 12, label: '12', units: 2 },
  { floor: 11, label: '11', units: 2 },
  { floor: 10, label: '10', units: 3 },
  { floor: 9,  label: '9',  units: 3 },
  { floor: 8,  label: '8',  units: 4 },
  { floor: 7,  label: '7',  units: 4 },
  { floor: 6,  label: '6',  units: 4 },
  { floor: 5,  label: '5',  units: 4 },
  { floor: 4,  label: '4',  units: 4 },
  { floor: 3,  label: '3',  units: 4 },
  { floor: 2,  label: '2',  units: 4 },
  { floor: 1,  label: '1',  units: 2 },
  { floor: 0,  label: 'G',  units: 0, sublabel: 'GROUND' },
]

const UNITS: Record<number, { id: string; type: string; beds: number; baths: number; area: number; living: number; balconies: number; status: 'available' | 'sold' | 'reserved' }[]> = {
  5: [
    { id: '501', type: 'Penthouse', beds: 3, baths: 3.5, area: 3200, living: 1, balconies: 2, status: 'available' },
    { id: '502', type: '4 Bedroom Penthouse', beds: 4, baths: 4.5, area: 4850, living: 2, balconies: 3, status: 'available' },
    { id: '503', type: '3 Bedroom', beds: 3, baths: 3, area: 2800, living: 1, balconies: 1, status: 'reserved' },
    { id: '504', type: '2 Bedroom', beds: 2, baths: 2, area: 1900, living: 1, balconies: 1, status: 'sold' },
  ],
}

const ROOMS = [
  { id: 'living', name: 'The Grand Living', type: 'Living Room', img: null },
  { id: 'kitchen', name: 'The Obsidian Kitchen', type: 'Kitchen', img: null },
  { id: 'suite', name: 'The Sky Suite', type: 'Master Bedroom', img: null },
  { id: 'spa', name: 'The Wellness Sanctuary', type: 'Spa & Wellness', img: null },
]

// Architectural floorplan SVG
function FloorplanSVG({ activeUnit, onSelect }: { activeUnit: string | null; onSelect: (id: string) => void }) {
  const units = UNITS[5] || []

  const unitPositions: Record<string, { x: number; y: number; w: number; h: number; labelX: number; labelY: number }> = {
    '501': { x: 60,  y: 60,  w: 180, h: 160, labelX: 150, labelY: 140 },
    '502': { x: 260, y: 40,  w: 220, h: 200, labelX: 370, labelY: 140 },
    '503': { x: 500, y: 60,  w: 180, h: 160, labelX: 590, labelY: 140 },
    '504': { x: 200, y: 270, w: 360, h: 160, labelX: 380, labelY: 350 },
  }

  return (
    <svg viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg"
      style={{ width: '100%', height: '100%' }}>
      <defs>
        <pattern id="floorGrid" width="20" height="20" patternUnits="userSpaceOnUse">
          <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(201,185,154,0.06)" strokeWidth="0.5" />
        </pattern>
      </defs>

      {/* Background */}
      <rect x="0" y="0" width="800" height="500" fill="#080808" />
      <rect x="40" y="30" width="720" height="440" fill="url(#floorGrid)" />

      {/* Outer building perimeter */}
      <rect x="40" y="30" width="720" height="440" fill="none"
        stroke="rgba(201,185,154,0.25)" strokeWidth="2" />

      {/* Core / elevator shaft */}
      <rect x="340" y="230" width="120" height="80" fill="rgba(10,10,12,0.8)"
        stroke="rgba(201,185,154,0.15)" strokeWidth="1" />
      <line x1="340" y1="230" x2="460" y2="310" stroke="rgba(201,185,154,0.1)" strokeWidth="1" />
      <line x1="460" y1="230" x2="340" y2="310" stroke="rgba(201,185,154,0.1)" strokeWidth="1" />
      <text x="400" y="274" textAnchor="middle"
        fill="rgba(201,185,154,0.3)" fontSize="8" fontFamily="JetBrains Mono, monospace"
        letterSpacing="2">CORE</text>

      {/* Corridor */}
      <rect x="40" y="240" width="300" height="40" fill="rgba(201,185,154,0.03)"
        stroke="rgba(201,185,154,0.08)" strokeWidth="1" />
      <rect x="460" y="240" width="300" height="40" fill="rgba(201,185,154,0.03)"
        stroke="rgba(201,185,154,0.08)" strokeWidth="1" />

      {/* Unit rooms */}
      {units.map((unit) => {
        const pos = unitPositions[unit.id]
        if (!pos) return null
        const isActive = activeUnit === unit.id
        const statusColor = unit.status === 'available'
          ? 'rgba(74,127,165,0.15)'
          : unit.status === 'reserved'
          ? 'rgba(201,185,154,0.1)'
          : 'rgba(100,100,100,0.1)'
        const borderColor = isActive
          ? '#C9B99A'
          : unit.status === 'available'
          ? 'rgba(74,127,165,0.4)'
          : 'rgba(100,100,100,0.3)'

        return (
          <g key={unit.id} onClick={() => onSelect(unit.id)} style={{ cursor: 'pointer' }}>
            <rect
              x={pos.x} y={pos.y} width={pos.w} height={pos.h}
              fill={isActive ? 'rgba(201,185,154,0.12)' : statusColor}
              stroke={borderColor}
              strokeWidth={isActive ? 2 : 1}
            />
            {/* Room subdivisions inside unit */}
            <line x1={pos.x + pos.w * 0.5} y1={pos.y} x2={pos.x + pos.w * 0.5} y2={pos.y + pos.h * 0.6}
              stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            <line x1={pos.x} y1={pos.y + pos.h * 0.55} x2={pos.x + pos.w} y2={pos.y + pos.h * 0.55}
              stroke="rgba(255,255,255,0.04)" strokeWidth="1" />

            {/* Unit label */}
            <text x={pos.labelX} y={pos.labelY - 10} textAnchor="middle"
              fill={isActive ? '#C9B99A' : 'rgba(242,237,228,0.7)'}
              fontSize="18" fontFamily="Cormorant Garamond, Georgia, serif"
              fontWeight="300">
              {unit.id}
            </text>
            <text x={pos.labelX} y={pos.labelY + 8} textAnchor="middle"
              fill="rgba(242,237,228,0.3)"
              fontSize="7" fontFamily="JetBrains Mono, monospace"
              letterSpacing="2">
              {unit.beds}BR · {unit.area} SQFT
            </text>

            {/* Status dot */}
            <circle
              cx={pos.x + pos.w - 12} cy={pos.y + 12} r="4"
              fill={unit.status === 'available' ? '#4A7FA5'
                : unit.status === 'reserved' ? '#C9B99A'
                : '#444'}
            />
          </g>
        )
      })}

      {/* North indicator */}
      <text x="745" y="52" textAnchor="middle" fill="rgba(201,185,154,0.4)"
        fontSize="10" fontFamily="JetBrains Mono, monospace">N</text>
      <line x1="745" y1="55" x2="745" y2="70" stroke="rgba(201,185,154,0.3)" strokeWidth="1" />
      <polygon points="741,55 749,55 745,45" fill="rgba(201,185,154,0.4)" />
    </svg>
  )
}

// Interior room scene SVG (architectural renders)
function RoomVisual({ roomId }: { roomId: string }) {
const svgs: Record<string, ReactElement> = {
    living: (
      <svg viewBox="0 0 600 380" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="lvFloor" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2a2318" /><stop offset="100%" stopColor="#1a1610" />
          </linearGradient>
          <linearGradient id="lvLight" x1="0.5" y1="0" x2="0.5" y2="1">
            <stop offset="0%" stopColor="rgba(255,220,150,0.2)" /><stop offset="100%" stopColor="transparent" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="600" height="380" fill="#0d0c0a" />
        <polygon points="0,240 600,240 600,380 0,380" fill="url(#lvFloor)" />
        {/* Window panorama */}
        <rect x="50" y="20" width="500" height="200" fill="#0d1828" />
        {/* City skyline */}
        {[60,90,110,140,160,190,220,260,290,320,360,390,430,460,490,520].map((x, i) => {
          const h = 30 + Math.sin(i * 1.2) * 50 + Math.cos(i * 0.7) * 25
          return <rect key={i} x={x} y={220 - h} width={14 + (i % 3) * 3} height={h}
            fill={`rgba(74,127,165,${0.08 + (i % 5) * 0.04})`} />
        })}
        {Array.from({length:50}).map((_,i)=>(
          <circle key={i} cx={60+Math.random()*480} cy={100+Math.random()*100} r="1"
            fill="rgba(255,220,150,0.7)" />
        ))}
        <rect x="50" y="20" width="500" height="200" fill="none"
          stroke="rgba(201,185,154,0.2)" strokeWidth="3" />
        {/* Window mullions */}
        {[200,350].map((x,i)=>(
          <line key={i} x1={x} y1="20" x2={x} y2="220" stroke="rgba(201,185,154,0.2)" strokeWidth="2" />
        ))}
        <line x1="50" y1="130" x2="550" y2="130" stroke="rgba(201,185,154,0.15)" strokeWidth="1.5" />
        {/* Light cone from window */}
        <polygon points="50,220 550,220 480,380 120,380" fill="rgba(255,220,150,0.04)" />
        {/* Sofa */}
        <polygon points="120,268 480,255 495,300 105,315" fill="#1e1a16" />
        <polygon points="120,268 135,245 465,232 480,255" fill="#2a2520" />
        <polygon points="135,245 150,232 450,219 465,232" fill="#241f1a" />
        {/* Pillows */}
        <rect x="170" y="244" width="80" height="22" rx="6" fill="#C9B99A" opacity="0.35" />
        <rect x="340" y="238" width="80" height="22" rx="6" fill="#C9B99A" opacity="0.25" />
        {/* Coffee table */}
        <ellipse cx="300" cy="345" rx="90" ry="16" fill="#1a1612" />
        <ellipse cx="300" cy="340" rx="90" ry="16" fill="#201c14"
          stroke="rgba(201,185,154,0.2)" strokeWidth="1" />
        {/* Pendant light */}
        <line x1="300" y1="0" x2="300" y2="40" stroke="rgba(201,185,154,0.3)" strokeWidth="1.5" />
        <ellipse cx="300" cy="44" rx="30" ry="8" fill="rgba(255,220,150,0.6)" />
        <polygon points="270,44 330,44 360,180 240,180" fill="url(#lvLight)" opacity="0.5" />
        {/* Floor lamp */}
        <line x1="520" y1="360" x2="515" y2="160" stroke="rgba(201,185,154,0.4)" strokeWidth="2" />
        <ellipse cx="510" cy="156" rx="18" ry="6" fill="rgba(255,220,150,0.5)" />
      </svg>
    ),
    kitchen: (
      <svg viewBox="0 0 600 380" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <rect x="0" y="0" width="600" height="380" fill="#070707" />
        <polygon points="0,280 600,280 600,380 0,380" fill="#0a0a0b" />
        {/* Upper cabinets */}
        <rect x="0" y="30" width="250" height="130" fill="#0c0c0d" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        {[0,84,168].map((x,i)=>(
          <g key={i}>
            <rect x={x+3} y="33" width="78" height="124" fill="#101011" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            <rect x={x+38} y="92" width="6" height="14" fill="rgba(201,185,154,0.6)" rx="1" />
          </g>
        ))}
        <rect x="350" y="30" width="250" height="130" fill="#0c0c0d" stroke="rgba(255,255,255,0.05)" strokeWidth="1" />
        {[350,434,518].map((x,i)=>(
          <g key={i}>
            <rect x={x+3} y="33" width="78" height="124" fill="#101011" stroke="rgba(255,255,255,0.04)" strokeWidth="1" />
            <rect x={x+38} y="92" width="6" height="14" fill="rgba(201,185,154,0.6)" rx="1" />
          </g>
        ))}
        {/* Under cabinet light */}
        <rect x="0" y="158" width="250" height="3" fill="rgba(100,160,220,0.9)" />
        <rect x="350" y="158" width="250" height="3" fill="rgba(100,160,220,0.9)" />
        {/* Counter */}
        <polygon points="100,240 500,240 520,280 80,280" fill="#111112" />
        <polygon points="80,228 520,228 530,242 70,242"
          fill="rgba(220,215,205,0.85)" stroke="rgba(200,190,180,0.3)" strokeWidth="1" />
        {/* Marble veins */}
        <path d="M 150 229 Q 250 233 300 231 Q 360 229 420 232" fill="none"
          stroke="rgba(160,145,130,0.3)" strokeWidth="1" />
        {/* Sink */}
        <rect x="260" y="212" width="80" height="18" rx="2" fill="#0a0a0a"
          stroke="rgba(201,185,154,0.3)" strokeWidth="1" />
        <line x1="300" y1="200" x2="300" y2="214" stroke="rgba(201,185,154,0.7)" strokeWidth="2.5" />
        <path d="M 300 200 Q 316 196 320 205" fill="none" stroke="rgba(201,185,154,0.7)" strokeWidth="2.5" />
        {/* Pendants */}
        {[200,300,400].map((x,i)=>(
          <g key={i}>
            <line x1={x} y1="0" x2={x} y2="168" stroke="rgba(201,185,154,0.3)" strokeWidth="1" />
            <circle cx={x} cy="172" r="10" fill="rgba(255,220,150,0.95)" />
            <ellipse cx={x} cy="185" rx="14" ry="22" fill="rgba(255,220,150,0.06)" />
          </g>
        ))}
        {/* Stools */}
        {[180,300,420].map((x,i)=>(
          <g key={i}>
            <ellipse cx={x} cy="322" rx="18" ry="6" fill="#1a1a1c" />
            <rect x={x-3} y="322" width="6" height="44" fill="#111112" />
            <ellipse cx={x} cy="366" rx="12" ry="3" fill="#0d0d0e" />
          </g>
        ))}
      </svg>
    ),
    suite: (
      <svg viewBox="0 0 600 380" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <defs>
          <linearGradient id="suFloor2" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#1c1410" /><stop offset="100%" stopColor="#140e0a" />
          </linearGradient>
        </defs>
        <rect x="0" y="0" width="600" height="380" fill="#0d0a07" />
        <polygon points="0,240 600,240 600,380 0,380" fill="url(#suFloor2)" />
        {/* Window wall */}
        <rect x="140" y="10" width="320" height="220" fill="#0d1520" />
        {/* City at night */}
        {[155,175,200,225,250,280,310,340,370,400,425,445].map((x,i)=>{
          const h=20+Math.sin(i*1.5)*40+Math.cos(i*0.9)*20
          return <rect key={i} x={x} y={230-h} width={10+(i%3)*3} height={h}
            fill={`rgba(74,127,165,${0.08+(i%4)*0.05})`} />
        })}
        {Array.from({length:35}).map((_,i)=>(
          <circle key={i} cx={145+Math.random()*310} cy={80+Math.random()*120} r="1.2"
            fill="rgba(255,220,150,0.65)" />
        ))}
        <rect x="140" y="10" width="320" height="220" fill="none"
          stroke="rgba(201,185,154,0.2)" strokeWidth="2.5" />
        <line x1="300" y1="10" x2="300" y2="230" stroke="rgba(201,185,154,0.12)" strokeWidth="1.5" />
        <line x1="140" y1="120" x2="460" y2="120" stroke="rgba(201,185,154,0.12)" strokeWidth="1.5" />
        {/* Bed */}
        <polygon points="160,238 440,238 455,310 145,310" fill="#1a1008" />
        <polygon points="160,175 440,175 440,240 160,240" fill="#140e06" />
        <polygon points="168,183 432,183 432,236 168,236" fill="#1c1610"
          stroke="rgba(201,185,154,0.08)" strokeWidth="1" />
        {/* Headboard tufting */}
        {[200,250,300,350,400].map((x,i)=>(
          <g key={i}>
            <circle cx={x} cy="208" r="3" fill="#C9B99A" opacity="0.25" />
            <circle cx={x} cy="208" r="1.5" fill="#C9B99A" opacity="0.4" />
          </g>
        ))}
        {/* Bedding */}
        <polygon points="162,220 438,220 448,280 152,280" fill="rgba(240,235,228,0.92)" />
        <polygon points="162,220 438,220 435,232 165,232" fill="rgba(255,255,255,0.12)" />
        {/* Pillows */}
        <rect x="185" y="198" width="82" height="24" rx="7" fill="white" opacity="0.9" />
        <rect x="333" y="198" width="82" height="24" rx="7" fill="white" opacity="0.9" />
        {/* Nightstands */}
        <polygon points="70,244 150,244 150,294 70,294" fill="#1a1208" />
        <polygon points="70,239 150,239 150,246 70,246" fill="#221608" />
        <line x1="110" y1="239" x2="107" y2="208" stroke="rgba(201,185,154,0.4)" strokeWidth="1.5" />
        <ellipse cx="107" cy="205" rx="15" ry="5" fill="rgba(255,220,150,0.7)" />
        <polygon points="450,244 530,244 530,294 450,294" fill="#1a1208" />
        <polygon points="450,239 530,239 530,246 450,246" fill="#221608" />
        <line x1="490" y1="239" x2="493" y2="208" stroke="rgba(201,185,154,0.4)" strokeWidth="1.5" />
        <ellipse cx="493" cy="205" rx="15" ry="5" fill="rgba(255,220,150,0.7)" />
        <ellipse cx="300" cy="308" rx="180" ry="8" fill="rgba(0,0,0,0.45)" />
      </svg>
    ),
    spa: (
      <svg viewBox="0 0 600 380" xmlns="http://www.w3.org/2000/svg" style={{ width: '100%', height: '100%' }}>
        <defs>
          <radialGradient id="spaPool" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#1a4060" /><stop offset="100%" stopColor="#0a1828" />
          </radialGradient>
          <radialGradient id="spaGl" cx="50%" cy="40%" r="60%">
            <stop offset="0%" stopColor="rgba(74,127,165,0.18)" /><stop offset="100%" stopColor="transparent" />
          </radialGradient>
        </defs>
        <rect x="0" y="0" width="600" height="380" fill="#050c10" />
        <rect x="0" y="0" width="600" height="380" fill="url(#spaGl)" />
        <polygon points="0,260 600,260 600,380 0,380" fill="#080d0e" />
        {/* Marble wall panels */}
        {[0,120,240,360,480].map((x,i)=>(
          <g key={i}>
            <rect x={x} y="0" width="118" height="260" fill="#090b0c"
              stroke="rgba(255,255,255,0.03)" strokeWidth="1" />
            <path d={`M ${x+30} 0 Q ${x+60} 80 ${x+45} 160 Q ${x+75} 220 ${x+55} 260`}
              fill="none" stroke="rgba(200,190,180,0.05)" strokeWidth="1.5" />
          </g>
        ))}
        {/* Bath / pool */}
        <ellipse cx="300" cy="308" rx="220" ry="60" fill="url(#spaPool)" />
        <ellipse cx="300" cy="308" rx="220" ry="60" fill="none"
          stroke="rgba(74,127,165,0.4)" strokeWidth="2" />
        {/* Water shimmer */}
        {[285,300,315].map((y,i)=>(
          <ellipse key={i} cx="300" cy={y} rx={190-i*18} ry={8-i*2}
            fill="none" stroke="rgba(100,180,220,0.1)" strokeWidth="1" />
        ))}
        <ellipse cx="300" cy="295" rx="120" ry="28" fill="rgba(74,127,165,0.1)" />
        <ellipse cx="300" cy="302" rx="60" ry="14" fill="rgba(100,200,255,0.12)" />
        {/* Candles */}
        {[110,220,380,490].map((x,i)=>(
          <g key={i}>
            <rect x={x-5} y="238" width="10" height="18" rx="1" fill="rgba(240,220,180,0.5)" />
            <ellipse cx={x} cy="236" rx="4" ry="5" fill="rgba(255,160,60,0.9)" />
            <ellipse cx={x} cy="233" rx="7" ry="10" fill="rgba(255,160,60,0.06)" />
          </g>
        ))}
        {/* Towels */}
        <rect x="60" y="248" width="50" height="14" rx="3" fill="rgba(240,235,228,0.85)" />
        <rect x="490" y="248" width="50" height="14" rx="3" fill="rgba(240,235,228,0.85)" />
        {/* Skylight */}
        <rect x="200" y="0" width="200" height="5" fill="rgba(74,127,165,0.5)" />
        <polygon points="200,5 400,5 375,70 225,70" fill="rgba(74,127,165,0.05)" />
        {/* Steam */}
        {[200,300,400].map((x,i)=>(
          <ellipse key={i} cx={x} cy={225-i*8} rx={28+i*8} ry="12"
            fill="rgba(255,255,255,0.025)" />
        ))}
      </svg>
    ),
  }
  return (
    <div style={{ width: '100%', height: '100%', background: '#07070a', overflow: 'hidden' }}>
      {svgs[roomId] || svgs['living']}
    </div>
  )
}

export default function BuildingExplorer() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const [selectedFloor, setSelectedFloor] = useState(5)
  const [selectedUnit, setSelectedUnit] = useState<string | null>('502')
  const [activeRoom, setActiveRoom] = useState(0)
  const [view, setView] = useState<'overview' | 'floors' | 'amenities' | 'gallery' | 'location' | 'availability'>('overview')

  const unit = selectedUnit
    ? (UNITS[selectedFloor] || []).find((u) => u.id === selectedUnit)
    : null

  return (
    <section
      ref={ref}
      style={{
        background: 'rgba(8,8,10,0.97)',
        margin: '0',
        borderTop: '1px solid rgba(201,185,154,0.08)',
        borderBottom: '1px solid rgba(201,185,154,0.08)',
      }}
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8 }}
      >
        {/* Explorer header */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '220px 1fr',
          borderBottom: '1px solid rgba(201,185,154,0.08)',
        }}>
          {/* Sidebar nav */}
          <div style={{
            borderRight: '1px solid rgba(201,185,154,0.08)',
            padding: '2rem 0',
          }}>
            <div style={{ padding: '0 1.5rem 1.5rem' }}>
              <p style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '8px',
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                color: 'rgba(201,185,154,0.5)',
                marginBottom: '0.4rem',
              }}>
                The Building
              </p>
              <p style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: '1.4rem',
                fontWeight: 300,
                color: '#F2EDE4',
                letterSpacing: '-0.01em',
              }}>
                LUXE Residences
              </p>
            </div>

            {[
              { id: 'overview', label: 'Overview', icon: '⊞' },
              { id: 'floors', label: 'Floors', icon: '≡' },
              { id: 'amenities', label: 'Amenities', icon: '◈' },
              { id: 'gallery', label: 'Gallery', icon: '⊟' },
              { id: 'location', label: 'Location', icon: '◎' },
              { id: 'availability', label: 'Availability', icon: '◐' },
            ].map((item) => (
              <button
                key={item.id}
                onClick={() => setView(item.id as any)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  width: '100%',
                  padding: '0.75rem 1.5rem',
                  background: view === item.id ? 'rgba(201,185,154,0.08)' : 'transparent',
                  border: 'none',
                  borderLeft: view === item.id ? '2px solid #C9B99A' : '2px solid transparent',
                  cursor: 'pointer',
                  textAlign: 'left',
                  transition: 'all 300ms ease',
                }}
              >
                <span style={{ color: view === item.id ? '#C9B99A' : 'rgba(242,237,228,0.25)', fontSize: '12px' }}>
                  {item.icon}
                </span>
                <span style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '9px',
                  letterSpacing: '0.3em',
                  textTransform: 'uppercase',
                  color: view === item.id ? '#F2EDE4' : 'rgba(242,237,228,0.35)',
                  transition: 'color 300ms ease',
                }}>
                  {item.label}
                </span>
              </button>
            ))}
          </div>

          {/* Building visual */}
          <div style={{
            position: 'relative',
            height: '320px',
            background: 'linear-gradient(135deg, #080a10 0%, #0d1018 100%)',
            overflow: 'hidden',
          }}>
            {/* Building illustration SVG */}
            <svg viewBox="0 0 600 320" xmlns="http://www.w3.org/2000/svg"
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }}>
              <defs>
                <linearGradient id="bldGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#1a2030" /><stop offset="100%" stopColor="#0a0e18" />
                </linearGradient>
                <linearGradient id="bldGlass" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="rgba(74,127,165,0.3)" />
                  <stop offset="100%" stopColor="rgba(74,127,165,0.05)" />
                </linearGradient>
              </defs>
              {/* Sky */}
              <rect x="0" y="0" width="600" height="320" fill="#060810" />
              {/* Stars */}
              {Array.from({length:30}).map((_,i)=>(
                <circle key={i} cx={Math.random()*600} cy={Math.random()*200} r="0.8"
                  fill="rgba(255,255,255,0.5)" />
              ))}
              {/* Ground */}
              <rect x="0" y="290" width="600" height="30" fill="#0a0c0e" />
              {/* Road */}
              <rect x="0" y="292" width="600" height="28" fill="#0c0e12" />
              {[100,200,300,400,500].map((x,i)=>(
                <rect key={i} x={x} y="304" width="60" height="3" fill="rgba(255,255,255,0.05)" />
              ))}
              {/* Main building */}
              <polygon points="180,290 420,290 410,40 190,40" fill="url(#bldGrad)" />
              {/* Glass facade */}
              <polygon points="185,288 415,288 405,45 195,45" fill="url(#bldGlass)" />
              {/* Window grid */}
              {Array.from({length:13}).map((_,row)=>(
                Array.from({length:5}).map((_,col)=>{
                  const y = 50 + row * 18
                  const xOff = 5 + row * 1.2
                  const x = 200 + xOff + col * 36
                  const lit = Math.random() > 0.3
                  return <rect key={`${row}-${col}`} x={x} y={y} width="26" height="12" rx="1"
                    fill={lit ? `rgba(255,220,150,${0.1+Math.random()*0.25})` : 'rgba(74,127,165,0.08)'} />
                })
              ))}
              {/* Building top */}
              <polygon points="190,40 410,40 400,25 200,25" fill="#1a2035" />
              <rect x="280" y="10" width="40" height="16" fill="#141822" />
              {/* LUXE sign */}
              <text x="300" y="270" textAnchor="middle"
                fill="rgba(201,185,154,0.7)" fontSize="11" fontFamily="Cormorant Garamond, Georgia, serif"
                letterSpacing="6">LUXE</text>
              {/* Side buildings */}
              <polygon points="80,290 170,290 165,120 85,120" fill="#0c0e12" />
              {Array.from({length:8}).map((_,row)=>(
                Array.from({length:3}).map((_,col)=>(
                  <rect key={`l${row}-${col}`} x={92+col*25} y={128+row*18} width="18" height="12"
                    fill={Math.random()>0.4?'rgba(255,220,150,0.08)':'rgba(0,0,0,0.2)'} />
                ))
              ))}
              <polygon points="430,290 520,290 515,150 435,150" fill="#0c0e12" />
              {Array.from({length:7}).map((_,row)=>(
                Array.from({length:3}).map((_,col)=>(
                  <rect key={`r${row}-${col}`} x={442+col*22} y={158+row*18} width="16" height="12"
                    fill={Math.random()>0.4?'rgba(255,220,150,0.08)':'rgba(0,0,0,0.2)'} />
                ))
              ))}
              {/* Ground lights */}
              {[150,200,250,350,400,450].map((x,i)=>(
                <ellipse key={i} cx={x} cy="291" rx="6" ry="2" fill="rgba(255,200,100,0.15)" />
              ))}
            </svg>

            {/* Overlay label */}
            <div style={{
              position: 'absolute',
              top: '1.5rem',
              left: '1.5rem',
            }}>
              <p style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '8px',
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                color: 'rgba(201,185,154,0.5)',
                marginBottom: '4px',
              }}>
                Bole Medhanialem, Addis Ababa
              </p>
              <p style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: '1.3rem',
                fontWeight: 300,
                color: '#F2EDE4',
              }}>
                LUXE Tower : 12 Floors
              </p>
            </div>
          </div>
        </div>

        {/* Main explorer grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '220px 180px 1fr 300px',
          minHeight: '360px',
          borderBottom: '1px solid rgba(201,185,154,0.08)',
        }}>
          {/* Col 1 — Empty (sidebar continuation) */}
          <div style={{ borderRight: '1px solid rgba(201,185,154,0.08)' }} />

          {/* Col 2 — Floor selector */}
          <div style={{
            borderRight: '1px solid rgba(201,185,154,0.08)',
            padding: '1.5rem 0',
          }}>
            <p style={{
              fontFamily: 'JetBrains Mono, monospace',
              fontSize: '8px',
              letterSpacing: '0.4em',
              textTransform: 'uppercase',
              color: 'rgba(201,185,154,0.5)',
              padding: '0 1.25rem',
              marginBottom: '1rem',
            }}>
              Select Floor
            </p>
            <div style={{ overflowY: 'auto', maxHeight: '300px' }}>
              {FLOORS.map((f) => (
                <button
                  key={f.floor}
                  onClick={() => {
                    setSelectedFloor(f.floor)
                    setSelectedUnit(null)
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    width: '100%',
                    padding: '0.55rem 1.25rem',
                    background: selectedFloor === f.floor
                      ? 'rgba(201,185,154,0.1)' : 'transparent',
                    border: 'none',
                    borderLeft: selectedFloor === f.floor
                      ? '2px solid #C9B99A' : '2px solid transparent',
                    cursor: f.floor === 0 ? 'default' : 'pointer',
                    transition: 'all 250ms ease',
                  }}
                >
                  <span style={{
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: '1.1rem',
                    fontWeight: 300,
                    color: selectedFloor === f.floor ? '#F2EDE4' : 'rgba(242,237,228,0.4)',
                    transition: 'color 250ms ease',
                  }}>
                    {f.label}
                  </span>
                  {f.sublabel && (
                    <span style={{
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '7px',
                      letterSpacing: '0.3em',
                      color: 'rgba(242,237,228,0.2)',
                    }}>
                      {f.sublabel}
                    </span>
                  )}
                  {selectedFloor === f.floor && (
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
            borderRight: '1px solid rgba(201,185,154,0.08)',
            padding: '1.5rem',
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'baseline',
              marginBottom: '1rem',
            }}>
              <div>
                <p style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: '1.5rem',
                  fontWeight: 300,
                  color: '#F2EDE4',
                  letterSpacing: '-0.01em',
                }}>
                  Floor {selectedFloor}
                </p>
                <p style={{
                  fontFamily: 'JetBrains Mono, monospace',
                  fontSize: '8px',
                  letterSpacing: '0.3em',
                  color: 'rgba(242,237,228,0.3)',
                  textTransform: 'uppercase',
                }}>
                  {(UNITS[selectedFloor] || []).length} Residences
                </p>
              </div>
              <button style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '8px',
                letterSpacing: '0.3em',
                textTransform: 'uppercase',
                color: '#C9B99A',
                background: 'none',
                border: '1px solid rgba(201,185,154,0.3)',
                padding: '6px 12px',
                cursor: 'pointer',
              }}>
                View Floor Plan ⤢
              </button>
            </div>

            {/* Legend */}
            <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem' }}>
              {[
                { color: '#4A7FA5', label: 'Available' },
                { color: '#C9B99A', label: 'Reserved' },
                { color: '#444', label: 'Sold' },
              ].map((item) => (
                <div key={item.label} style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: item.color }} />
                  <span style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '7px',
                    letterSpacing: '0.3em',
                    color: 'rgba(242,237,228,0.35)',
                    textTransform: 'uppercase',
                  }}>
                    {item.label}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ height: '240px', border: '1px solid rgba(201,185,154,0.06)' }}>
              {(UNITS[selectedFloor] || []).length > 0 ? (
                <FloorplanSVG
                  activeUnit={selectedUnit}
                  onSelect={setSelectedUnit}
                />
              ) : (
                <div style={{
                  height: '100%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: '#080808',
                }}>
                  <p style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '9px',
                    letterSpacing: '0.4em',
                    color: 'rgba(242,237,228,0.2)',
                    textTransform: 'uppercase',
                  }}>
                    {selectedFloor === 0 ? 'Lobby & Amenities' : 'Floor Plan Not Available'}
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
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.4 }}
                >
                  <p style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '8px',
                    letterSpacing: '0.4em',
                    textTransform: 'uppercase',
                    color: 'rgba(201,185,154,0.5)',
                    marginBottom: '4px',
                  }}>
                    Residence {unit.id}
                  </p>
                  <p style={{
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: '1.3rem',
                    fontWeight: 300,
                    color: '#F2EDE4',
                    letterSpacing: '-0.01em',
                    marginBottom: '1.5rem',
                    textTransform: 'uppercase',
                  }}>
                    {unit.type}
                  </p>

                  {/* Specs */}
                  {[
                    { icon: '⬛', label: 'Area', value: `${unit.area.toLocaleString()} SQ FT` },
                    { icon: '🛏', label: 'Bedrooms', value: unit.beds },
                    { icon: '🚿', label: 'Bathrooms', value: unit.baths },
                    { icon: '🛋', label: 'Living Rooms', value: unit.living },
                    { icon: '🌿', label: 'Balconies', value: unit.balconies },
                  ].map((spec) => (
                    <div key={spec.label} style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.75rem',
                      padding: '0.6rem 0',
                      borderBottom: '1px solid rgba(242,237,228,0.04)',
                    }}>
                      <span style={{ fontSize: '11px', opacity: 0.6 }}>{spec.icon}</span>
                      <span style={{
                        fontFamily: 'JetBrains Mono, monospace',
                        fontSize: '8px',
                        letterSpacing: '0.3em',
                        textTransform: 'uppercase',
                        color: 'rgba(242,237,228,0.35)',
                        flex: 1,
                      }}>
                        {spec.label}
                      </span>
                      <span style={{
                        fontFamily: 'Cormorant Garamond, Georgia, serif',
                        fontSize: '1rem',
                        color: '#F2EDE4',
                        fontWeight: 300,
                      }}>
                        {spec.value}
                      </span>
                    </div>
                  ))}

                  <button
                    onClick={() => {
                      const el = document.getElementById('contact')
                      el?.scrollIntoView({ behavior: 'smooth' })
                    }}
                    style={{
                      width: '100%',
                      marginTop: '1.5rem',
                      padding: '0.9rem',
                      background: '#C9B99A',
                      color: '#050508',
                      border: 'none',
                      fontFamily: 'JetBrains Mono, monospace',
                      fontSize: '9px',
                      letterSpacing: '0.4em',
                      textTransform: 'uppercase',
                      cursor: 'pointer',
                      transition: 'background 300ms ease',
                    }}
                    onMouseEnter={(e) => { (e.target as HTMLButtonElement).style.background = '#F2EDE4' }}
                    onMouseLeave={(e) => { (e.target as HTMLButtonElement).style.background = '#C9B99A' }}
                  >
                    Enter Residence
                  </button>
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ paddingTop: '3rem', textAlign: 'center' }}
                >
                  <p style={{
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: '1.1rem',
                    fontWeight: 300,
                    color: 'rgba(242,237,228,0.3)',
                    lineHeight: 1.8,
                  }}>
                    Select a residence
                    <br />on the floorplan
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* Interior Collection Row */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '240px repeat(4, 1fr)',
          borderBottom: '1px solid rgba(201,185,154,0.08)',
          minHeight: '260px',
        }}>
          {/* Left label */}
          <div style={{
            borderRight: '1px solid rgba(201,185,154,0.08)',
            padding: '2rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
          }}>
            <div>
              <p style={{
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '8px',
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                color: 'rgba(201,185,154,0.5)',
                marginBottom: '0.75rem',
              }}>
                Interior Collection
              </p>
              <h3 style={{
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: '1.8rem',
                fontWeight: 300,
                color: '#F2EDE4',
                lineHeight: 1.1,
                letterSpacing: '-0.01em',
                marginBottom: '0.75rem',
              }}>
                Spaces Crafted
                <br />
                <em style={{ color: '#C9B99A' }}>Beyond Compare</em>
              </h3>
              <p style={{
                fontFamily: 'DM Sans, sans-serif',
                fontSize: '0.82rem',
                fontWeight: 300,
                color: 'rgba(242,237,228,0.35)',
                lineHeight: 1.7,
              }}>
                Every space is a masterpiece of design, material, and craftsmanship.
              </p>
            </div>
            <button
              onClick={() => {
                const el = document.getElementById('interiors')
                el?.scrollIntoView({ behavior: 'smooth' })
              }}
              style={{
                padding: '0.75rem 1rem',
                border: '1px solid rgba(201,185,154,0.3)',
                background: 'transparent',
                fontFamily: 'JetBrains Mono, monospace',
                fontSize: '8px',
                letterSpacing: '0.4em',
                textTransform: 'uppercase',
                color: '#C9B99A',
                cursor: 'pointer',
                textAlign: 'center',
                transition: 'all 300ms ease',
              }}
            >
              Explore All Spaces
            </button>
          </div>

          {/* Room cards */}
          {ROOMS.map((room, i) => (
            <button
              key={room.id}
              onClick={() => setActiveRoom(i)}
              style={{
                position: 'relative',
                borderRight: i < ROOMS.length - 1 ? '1px solid rgba(201,185,154,0.08)' : 'none',
                overflow: 'hidden',
                cursor: 'pointer',
                background: 'none',
                border: activeRoom === i
                  ? '2px solid rgba(201,185,154,0.4)'
                  : '1px solid rgba(201,185,154,0.06)',
                padding: 0,
                display: 'block',
              }}
            >
              {/* Room SVG scene */}
              <div style={{ position: 'absolute', inset: 0, opacity: activeRoom === i ? 1 : 0.65, transition: 'opacity 400ms ease' }}>
                <RoomVisual roomId={room.id} />
              </div>

              {/* Number */}
              <div style={{
                position: 'absolute',
                top: '1rem',
                left: '1rem',
                fontFamily: 'Cormorant Garamond, Georgia, serif',
                fontSize: '1.1rem',
                fontWeight: 300,
                color: 'rgba(201,185,154,0.6)',
              }}>
                {String(i + 1).padStart(2, '0')}
              </div>

              {/* Arrow */}
              <div style={{
                position: 'absolute',
                top: '1rem',
                right: '1rem',
                width: '28px',
                height: '28px',
                borderRadius: '50%',
                border: '1px solid rgba(201,185,154,0.3)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#C9B99A',
                fontSize: '12px',
              }}>
                ›
              </div>

              {/* Bottom label */}
              <div style={{
                position: 'absolute',
                bottom: 0,
                left: 0,
                right: 0,
                padding: '1rem',
                background: 'linear-gradient(to top, rgba(5,5,8,0.95) 0%, transparent 100%)',
              }}>
                <p style={{
                  fontFamily: 'Cormorant Garamond, Georgia, serif',
                  fontSize: '0.95rem',
                  fontWeight: 400,
                  color: '#F2EDE4',
                  marginBottom: '2px',
                  letterSpacing: '0.02em',
                }}>
                  {room.name}
                </p>
                <p style={{
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.75rem',
                  color: 'rgba(242,237,228,0.4)',
                }}>
                  {room.type}
                </p>
              </div>
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  )
}