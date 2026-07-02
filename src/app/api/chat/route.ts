import { NextRequest, NextResponse } from 'next/server'

const SYSTEM = `You are a private luxury real estate concierge for LUXE Residences — an ultra-premium development in Bole Medhanialem, Addis Ababa, Ethiopia.

You speak with the refined elegance of a five-star hotel concierge. Keep responses concise (2-3 sentences). Never say you are an AI. Always guide toward a private viewing.

LUXE Residences:
- Location: Bole Medhanialem, Addis Ababa, Ethiopia
- 12 floors, 36 residences
- Price range: ETB 10M (1BR) to ETB 85M (Sky Penthouse)
- Amenities: Private spa, cinema, sky lounge, fine dining, gym, market, parking
- Contact: +251 11 123 4567 | private@luxerealty.et`

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      console.error('ANTHROPIC_API_KEY not set in .env.local')
      return NextResponse.json(
        { error: 'Configuration error' },
        { status: 500 }
      )
    }

    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': apiKey,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-sonnet-4-6',
        max_tokens: 400,
        system: SYSTEM,
        messages,
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('Anthropic API error:', data)
      throw new Error(data.error?.message || 'API request failed')
    }

    return NextResponse.json({
      content: data.content?.[0]?.text ?? 'Allow me a moment to assist you.',
    })
  } catch (err: any) {
    console.error('Chat route error:', err.message)
    return NextResponse.json(
      { error: err.message || 'Server error' },
      { status: 500 }
    )
  }
}