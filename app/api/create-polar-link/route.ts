import { NextRequest, NextResponse } from 'next/server'
import { api } from '@/lib/polar'

export async function POST(req: NextRequest) {
  const { sessionId } = await req.json()
  if (!sessionId) {
    return NextResponse.json({ error: 'Missing sessionId' }, { status: 400 })
  }

  try {
    // 这里 productId 需要替换成你的实际 product id
    const productId = '3eab1b34-0687-4af9-a601-e283d4e5a550';
    const successUrl = 'https://vo-16type-lzsw.vercel.app/result/{{METADATA.sessionId}}?pay=1';
    const checkout = await api.checkouts.create({
      products: [productId],
      successUrl: successUrl,
      metadata: { sessionId },
    })
    return NextResponse.json({ url: checkout.url })
  } catch (e: any) {
    return NextResponse.json({ error: e.message || 'Polar create checkout failed' }, { status: 500 })
  }
} 