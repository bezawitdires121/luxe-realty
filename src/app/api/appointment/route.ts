import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, residence, date, time } = body

    if (!name || !email || !residence || !date || !time) {
      return NextResponse.json(
        { error: 'All fields are required.' },
        { status: 400 }
      )
    }

    const { data, error } = await supabaseAdmin
      .from('appointments')
      .insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        residence,
        date,
        time,
        status: 'pending',
      })
      .select()
      .single()

    if (error) throw new Error(error.message)

    // Also save as enquiry for CRM
    await supabaseAdmin.from('enquiries').insert({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone?.trim() || null,
      interest: residence,
      message: `Private viewing request for ${residence} on ${date} at ${time}`,
      type: 'viewing',
      status: 'new',
      viewing_date: date,
      viewing_time: time,
      viewing_residence: residence,
    })

    // Email notification
    if (process.env.RESEND_API_KEY && process.env.CONTACT_EMAIL) {
      try {
        await fetch('https://api.resend.com/emails', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            from: 'LUXE Residences <onboarding@resend.dev>',
            to: process.env.CONTACT_EMAIL,
            subject: `Private Viewing Request — ${name}`,
            html: `
              <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;padding:40px;background:#050508;color:#F2EDE4;">
                <h2 style="color:#C9B99A;font-weight:300;letter-spacing:0.15em;">PRIVATE VIEWING REQUEST</h2>
                <table style="width:100%;border-collapse:collapse;margin-top:24px;">
                  ${[
                    ['Name', name],
                    ['Email', email],
                    ['Phone', phone || 'Not provided'],
                    ['Residence', residence],
                    ['Date', date],
                    ['Time', time],
                  ].map(([k, v]) => `
                    <tr>
                      <td style="padding:10px 0;color:rgba(201,185,154,0.6);font-family:monospace;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;width:110px;border-bottom:1px solid rgba(242,237,228,0.06);">${k}</td>
                      <td style="padding:10px 0;color:#F2EDE4;font-size:14px;border-bottom:1px solid rgba(242,237,228,0.06);">${v}</td>
                    </tr>
                  `).join('')}
                </table>
              </div>
            `,
          }),
        })
      } catch (e) {
        console.error('Email failed:', e)
      }
    }

    return NextResponse.json({ success: true, id: data.id })
  } catch (err: any) {
    console.error('Appointment error:', err)
    return NextResponse.json({ error: 'Server error.' }, { status: 500 })
  }
}