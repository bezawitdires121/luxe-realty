 import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!

// Client-side (public)
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Server-side (admin access - use only in API routes)
export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey)

// Types
export interface DbUnit {
  id: string
  floor: number
  type: string
  beds: number
  baths: number
  area: number
  balconies: number
  status: 'available' | 'reserved' | 'sold'
  price: number
  updated_at: string
}

export interface DbEnquiry {
  id: string
  name: string
  email: string
  phone?: string
  interest?: string
  budget?: string
  message: string
  type: 'enquiry' | 'viewing'
  status: 'new' | 'contacted' | 'qualified' | 'closed'
  viewing_date?: string
  viewing_time?: string
  viewing_residence?: string
  created_at: string
  updated_at: string
}

export interface DbAppointment {
  id: string
  name: string
  email: string
  phone?: string
  residence: string
  date: string
  time: string
  status: 'pending' | 'confirmed' | 'cancelled' | 'completed'
  notes?: string
  created_at: string
}