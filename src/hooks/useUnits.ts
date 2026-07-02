'use client'

import { useEffect, useState } from 'react'
import type { DbUnit } from '@/lib/supabase'

export function useUnits() {
  const [units, setUnits] = useState<DbUnit[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    fetch('/api/units')
      .then(r => r.json())
      .then(data => {
        if (data.units) setUnits(data.units)
        else setError('Failed to load units')
      })
      .catch(() => setError('Network error'))
      .finally(() => setLoading(false))
  }, [])

  // Group by floor
  const byFloor = units.reduce<Record<number, DbUnit[]>>((acc, unit) => {
    if (!acc[unit.floor]) acc[unit.floor] = []
    acc[unit.floor].push(unit)
    return acc
  }, {})

  return { units, byFloor, loading, error }
}