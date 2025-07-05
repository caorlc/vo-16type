import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'edge';

export async function GET(request: NextRequest) {
  const forwarded = request.headers.get('x-forwarded-for')
  const ip = forwarded ? forwarded.split(',')[0] : request.ip || 'unknown'
  
  return NextResponse.json({ ip })
} 