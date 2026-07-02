'use client'

import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { supabaseAdmin } from '@/lib/supabase'
import type { DbEnquiry, DbUnit, DbAppointment } from '@/lib/supabase'

// Inside the authed component:
const [units, setUnits] = useState<DbUnit[]>([])
const [enquiries, setEnquiries] = useState<DbEnquiry[]>([])
const [appointments, setAppointments] = useState<DbAppointment[]>([])
const [loadingData, setLoadingData] = useState(true)

useEffect(() => {
  if (!authed) return
  Promise.all([
    fetch('/api/units').then(r => r.json()),
    fetch('/api/admin/enquiries').then(r => r.json()),
    fetch('/api/admin/appointments').then(r => r.json()),
  ]).then(([u, e, a]) => {
    setUnits(u.units || [])
    setEnquiries(e.enquiries || [])
    setAppointments(a.appointments || [])
    setLoadingData(false)
  })
}, [authed])