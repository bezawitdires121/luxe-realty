'use client'

import { useEffect } from 'react'

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Native smooth scroll — no library needed
    // Lenis was causing scroll lag with video scrubbing
    document.documentElement.style.scrollBehavior = 'auto'
  }, [])

  return <>{children}</>
}