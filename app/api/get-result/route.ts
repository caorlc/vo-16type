import { NextRequest, NextResponse } from 'next/server'
export const runtime = 'edge';
import fs from 'fs/promises'
import path from 'path'

const STORAGE_FILE = path.join(process.cwd(), 'data', 'results.json')

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const ip = searchParams.get('ip')
    
    if (!ip) {
      return NextResponse.json({ error: 'IP参数缺失' }, { status: 400 })
    }
    
    // 读取数据
    try {
      const data = await fs.readFile(STORAGE_FILE, 'utf-8')
      const results = JSON.parse(data)
      
      // 查找对应IP的结果
      const result = results.find((item: any) => 
        item.ip === ip && Date.now() < item.expiresAt
      )
      
      return NextResponse.json({ result: result?.result || null })
    } catch (error) {
      // 文件不存在，返回null
      return NextResponse.json({ result: null })
    }
  } catch (error) {
    console.error('读取失败:', error)
    return NextResponse.json({ result: null })
  }
} 