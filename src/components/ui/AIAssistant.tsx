'use client'

import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Message {
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const SYSTEM_PROMPT = `You are a private luxury real estate advisor for LUXE REALTY, an ultra-premium real estate company with properties in Addis Ababa and Dubai. You speak with elegance, discretion, and expertise. You help clients discover extraordinary properties, understand investment potential, and arrange private viewings. Keep responses concise (2-4 sentences), sophisticated, and always subtly guide toward booking a private consultation. Our featured properties include: Obsidian Tower penthouse in Dubai (AED 28M, 5 beds, 8,400 sqft), Marble Residences villa in Addis Ababa(€42M, 7 beds, 12,200 sqft), and Skyline Apex sky villa ($35M, 4 beds, 6,800 sqft). Never mention you are an AI — you are a private advisor.`

export default function AIAssistant() {
  const [open, setOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Greetings. I am your private LUXE advisor. How may I assist you in finding your extraordinary residence today?',
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

const send = async (text?: string) => {
  const content = (text || input).trim()
  if (!content || loading) return

  const userMsg: Message = { role: 'user', content, timestamp: new Date() }
  setMessages(p => [...p, userMsg])
  setInput('')
  setLoading(true)

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        messages: [...messages, userMsg].map(m => ({
          role: m.role,
          content: m.content,
        })),
      }),
    })
    const data = await res.json()
    if (!res.ok) throw new Error(data.error)
    setMessages(p => [...p, {
      role: 'assistant',
      content: data.content,
      timestamp: new Date(),
    }])
  } catch (err: any) {
    setMessages(p => [...p, {
      role: 'assistant',
      content: 'My apologies — please call us directly at +251 11 123 4567.',
      timestamp: new Date(),
    }])
  } finally {
    setLoading(false)
  }
}

  return (
    <>
      {/* Floating trigger button */}
      <motion.button
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay: 2, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        onClick={() => setOpen(true)}
        style={{
          position: 'fixed',
          bottom: '2rem',
          right: '2rem',
          zIndex: 90,
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'linear-gradient(135deg, #C9B99A, #4A7FA5)',
          border: 'none',
          cursor: 'pointer',
          display: open ? 'none' : 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(74,127,165,0.3)',
        }}
        aria-label="Open AI assistant"
      >
        {/* Chat icon */}
        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
          <path
            d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"
            stroke="#050508"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>

        {/* Pulse ring */}
        <motion.div
          animate={{ scale: [1, 1.6], opacity: [0.4, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          style={{
            position: 'absolute',
            inset: 0,
            borderRadius: '50%',
            border: '1px solid #C9B99A',
            pointerEvents: 'none',
          }}
        />
      </motion.button>

      {/* Chat panel */}
      <AnimatePresence>
        {open && (
          <motion.div
            key="chat"
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 30, scale: 0.95 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            style={{
              position: 'fixed',
              bottom: '2rem',
              right: '2rem',
              zIndex: 90,
              width: 'min(420px, calc(100vw - 2rem))',
              height: '560px',
              background: 'rgba(10,10,15,0.97)',
              backdropFilter: 'blur(20px)',
              border: '1px solid rgba(242,237,228,0.08)',
              borderRadius: '2px',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden',
              boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
            }}
          >
            {/* Header */}
            <div style={{
              padding: '1.25rem 1.5rem',
              borderBottom: '1px solid rgba(242,237,228,0.06)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                {/* Status dot */}
                <div style={{ position: 'relative' }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    borderRadius: '50%',
                    background: '#4ade80',
                  }} />
                  <motion.div
                    animate={{ scale: [1, 2], opacity: [0.5, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    style={{
                      position: 'absolute',
                      inset: 0,
                      borderRadius: '50%',
                      background: '#4ade80',
                    }}
                  />
                </div>
                <div>
                  <p style={{
                    fontFamily: 'Cormorant Garamond, Georgia, serif',
                    fontSize: '1rem',
                    fontWeight: 400,
                    color: '#F2EDE4',
                    lineHeight: 1,
                  }}>
                    Private Advisor
                  </p>
                  <p style={{
                    fontFamily: 'JetBrains Mono, monospace',
                    fontSize: '8px',
                    letterSpacing: '0.3em',
                    color: 'rgba(242,237,228,0.3)',
                    marginTop: '2px',
                  }}>
                    LUXE REALTY · AVAILABLE NOW
                  </p>
                </div>
              </div>

              <button
                onClick={() => setOpen(false)}
                style={{
                  background: 'none',
                  border: 'none',
                  cursor: 'pointer',
                  color: 'rgba(242,237,228,0.4)',
                  fontSize: '1.2rem',
                  lineHeight: 1,
                  padding: '4px',
                }}
              >
                ✕
              </button>
            </div>

            {/* Messages */}
            <div style={{
              flex: 1,
              overflowY: 'auto',
              padding: '1.5rem',
              display: 'flex',
              flexDirection: 'column',
              gap: '1rem',
            }}>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4 }}
                  style={{
                    display: 'flex',
                    justifyContent: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  }}
                >
                  <div style={{
                    maxWidth: '82%',
                    padding: '0.85rem 1.1rem',
                    background: msg.role === 'user'
                      ? 'linear-gradient(135deg, #C9B99A20, #4A7FA520)'
                      : 'rgba(242,237,228,0.04)',
                    border: `1px solid ${msg.role === 'user'
                      ? 'rgba(201,185,154,0.2)'
                      : 'rgba(242,237,228,0.06)'}`,
                    borderRadius: '1px',
                  }}>
                    <p style={{
                      fontFamily: 'DM Sans, sans-serif',
                      fontSize: '0.875rem',
                      fontWeight: 300,
                      color: msg.role === 'user'
                        ? 'rgba(242,237,228,0.8)'
                        : 'rgba(242,237,228,0.65)',
                      lineHeight: 1.7,
                    }}>
                      {msg.content}
                    </p>
                  </div>
                </motion.div>
              ))}

              {/* Typing indicator */}
              {loading && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  style={{ display: 'flex', gap: '4px', padding: '0.5rem 0' }}
                >
                  {[0, 1, 2].map((i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -4, 0] }}
                      transition={{
                        duration: 0.8,
                        repeat: Infinity,
                        delay: i * 0.15,
                      }}
                      style={{
                        width: '5px',
                        height: '5px',
                        borderRadius: '50%',
                        background: '#C9B99A',
                        opacity: 0.6,
                      }}
                    />
                  ))}
                </motion.div>
              )}
              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div style={{
              padding: '1rem 1.5rem',
              borderTop: '1px solid rgba(242,237,228,0.06)',
              display: 'flex',
              gap: '0.75rem',
              alignItems: 'center',
            }}>
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && send()}
                placeholder="Ask about a property..."
                style={{
                  flex: 1,
                  background: 'rgba(242,237,228,0.04)',
                  border: '1px solid rgba(242,237,228,0.08)',
                  padding: '0.75rem 1rem',
                  fontFamily: 'DM Sans, sans-serif',
                  fontSize: '0.875rem',
                  color: '#F2EDE4',
                  outline: 'none',
                  borderRadius: '1px',
                }}
              />
              <button
               onClick={() => send()}
                disabled={loading || !input.trim()}
                style={{
                  width: '40px',
                  height: '40px',
                  background: input.trim() ? '#C9B99A' : 'rgba(242,237,228,0.06)',
                  border: 'none',
                  cursor: input.trim() ? 'pointer' : 'default',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'background 300ms ease',
                  flexShrink: 0,
                  borderRadius: '1px',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22 2L11 13M22 2L15 22L11 13M22 2L2 9L11 13"
                    stroke={input.trim() ? '#050508' : 'rgba(242,237,228,0.3)'}
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}