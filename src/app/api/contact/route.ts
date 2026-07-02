import { NextRequest, NextResponse } from 'next/server'
import { supabaseAdmin } from '@/lib/supabase'

export async function POST(req: NextRequest) {
  try {
    const body = await req.json()
    const { name, email, phone, interest, budget, message } = body

    // Validate
    if (!name?.trim() || !email?.trim() || !message?.trim()) {
      return NextResponse.json(
        { error: 'Name, email and message are required.' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Invalid email address.' },
        { status: 400 }
      )
    }

    // Save to Supabase
    const { data, error } = await supabaseAdmin
      .from('enquiries')
      .insert({
        name: name.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        interest: interest || 'General Enquiry',
        budget: budget || null,
        message: message.trim(),
        type: 'enquiry',
        status: 'new',
      })
      .select()
      .single()

    if (error) {
      console.error('Supabase insert error:', error)
      throw new Error('Database error')
    }

    console.log('New enquiry saved:', data.id)

    // Optional email notification
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
            subject: `New Enquiry — ${name}`,
            html: `
              <div style="font-family:Georgia,serif;max-width:560px;margin:0 auto;padding:40px;background:#050508;color:#F2EDE4;">
                <h2 style="color:#C9B99A;font-weight:300;letter-spacing:0.15em;margin-bottom:8px;">LUXE RESIDENCES</h2>
                <p style="color:rgba(242,237,228,0.4);font-family:monospace;font-size:11px;letter-spacing:0.3em;text-transform:uppercase;margin-bottom:32px;">New Enquiry Received</p>
                <table style="width:100%;border-collapse:collapse;">
                  ${[
                    ['Name', name],
                    ['Email', email],
                    ['Phone', phone || 'Not provided'],
                    ['Interest', interest || '-'],
                    ['Budget', budget || '-'],
                  ].map(([k, v]) => `
                    <tr>
                      <td style="padding:10px 0;color:rgba(201,185,154,0.6);font-family:monospace;font-size:10px;letter-spacing:0.2em;text-transform:uppercase;width:110px;border-bottom:1px solid rgba(242,237,228,0.06);">${k}</td>
                      <td style="padding:10px 0;color:#F2EDE4;font-size:14px;border-bottom:1px solid rgba(242,237,228,0.06);">${v}</td>
                    </tr>
                  `).join('')}
                </table>
                <div style="margin-top:24px;padding:20px;background:rgba(242,237,228,0.04);border:1px solid rgba(242,237,228,0.08);">
                  <p style="color:rgba(242,237,228,0.6);font-size:14px;line-height:1.8;margin:0;">${message}</p>
                </div>
                <p style="color:rgba(242,237,228,0.2);font-family:monospace;font-size:10px;margin-top:24px;">${new Date().toISOString()}</p>
              </div>
            `,
          }),
        })
      } catch (emailErr) {
        console.error('Email send failed (non-fatal):', emailErr)
      }
    }

    return NextResponse.json({ success: true, id: data.id })
  } catch (err: any) {
    console.error('Contact API error:', err)
    return NextResponse.json(
      { error: 'Server error. Please try again.' },
      { status: 500 }
    )
  }
}