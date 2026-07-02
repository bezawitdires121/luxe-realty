import { NextRequest, NextResponse } from 'next/server'
import { supabase, supabaseAdmin } from '@/lib/supabase'

// GET — fetch all units
export async function GET() {
  const { data, error } = await supabase
    .from('units')
    .select('*')
    .order('floor', { ascending: false })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  return NextResponse.json({ units: data })
}

// PATCH — update unit status (admin only)
export async function PATCH(req: NextRequest) {
  try {
    const { id, status } = await req.json()

    if (!id || !status) {
      return NextResponse.json({ error: 'ID and status required' }, { status: 400 })
    }

    const validStatuses = ['available', 'reserved', 'sold']
    if (!validStatuses.includes(status)) {
      return NextResponse.json({ error: 'Invalid status' }, { status: 400 })
    }

    const { data, error } = await supabaseAdmin
      .from('units')
      .update({ status })
      .eq('id', id)
      .select()
      .single()

    if (error) throw new Error(error.message)

    return NextResponse.json({ success: true, unit: data })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}