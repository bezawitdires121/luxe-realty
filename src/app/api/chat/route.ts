import { NextRequest, NextResponse } from 'next/server'

const SYSTEM = `You are a private luxury real estate concierge for LUXE Residences — an ultra-premium development in Bole Medhanialem, Addis Ababa, Ethiopia.

You speak with the refined elegance of a five-star hotel concierge. Keep responses concise (2-3 sentences). Never say you are an AI. Always guide toward a private viewing.

LUXE Residences:
- Location: Bole Medhanialem, Addis Ababa, Ethiopia
- 12 floors, 36 residences
- Price range: ETB 10M (1BR) to ETB 85M (Sky Penthouse)
- Amenities: Private spa, cinema, sky lounge, fine dining, gym, market, parking
- Contact: +251 11 123 4567 | private@luxerealty.et`

const localFallbackReply = (messages: { role: string; content: string }[]) => {
  const last = messages[messages.length - 1]?.content?.toLowerCase() ?? ''

  if (/(contact|phone|call|number|reach)/.test(last)) {
    return 'For discrete private viewings, please call +251 11 123 4567 or email private@luxerealty.et.'
  }

  if (/(price|cost|budget|etb|million|m|penthouse|villa|residence|sky villa|unit)/.test(last)) {
    return 'Our residences range from luxury 1BR homes to sky penthouses. I can share exact pricing and arrange a private viewing when you are ready.'
  }

  if (/(viewing|tour|visit|private viewing|arrange|appointment)/.test(last)) {
    return 'I would be delighted to arrange a private viewing. Please tell me your preferred date and property type.'
  }

  if (/(hey|hello|hi|good morning|good afternoon|good evening)/.test(last)) {
    return 'Welcome. I am your private LUXE advisor. How may I assist you in finding your extraordinary residence today?'
  }

  return 'I am here to guide you through the most extraordinary residences in Addis Ababa and Dubai. Ask me about properties, pricing, or private viewings.'
}

export async function POST(req: NextRequest) {
  try {
    const { messages } = await req.json()

    const apiKey = process.env.ANTHROPIC_API_KEY
    if (!apiKey) {
      console.warn('ANTHROPIC_API_KEY not set; using fallback chat response.')
      return NextResponse.json({
        content: localFallbackReply(messages),
      })
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
      return NextResponse.json({
        content: localFallbackReply(messages),
      })
    }

    return NextResponse.json({
      content: data.content?.[0]?.text ?? localFallbackReply(messages),
    })
  } catch (err) {
    console.error('Chat route error:', err instanceof Error ? err.message : 'Unknown error')
    return NextResponse.json(
      { error: (err instanceof Error ? err.message : 'Server error') },
      { status: 500 }
    )
  }
}