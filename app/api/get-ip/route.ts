import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    // 从请求头获取真实IP
    const forwarded = request.headers.get('x-forwarded-for')
    const realIp = request.headers.get('x-real-ip')
    const cfConnectingIp = request.headers.get('cf-connecting-ip')
    
    let ip = forwarded?.split(',')[0] || realIp || cfConnectingIp || '127.0.0.1'
    
    return NextResponse.json({ ip })
  } catch (error) {
    return NextResponse.json({ ip: '127.0.0.1' })
  }
} 