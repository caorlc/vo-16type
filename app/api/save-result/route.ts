import { NextRequest, NextResponse } from 'next/server'
import fs from 'fs/promises'
import path from 'path'

interface StoredResult {
  ip: string
  result: any
  timestamp: number
  expiresAt: number
}

const STORAGE_FILE = path.join(process.cwd(), 'data', 'results.json')

export async function POST(request: NextRequest) {
  try {
    const { ip, result } = await request.json()
    
    // 读取现有数据
    let results: StoredResult[] = []
    try {
      const data = await fs.readFile(STORAGE_FILE, 'utf-8')
      results = JSON.parse(data)
    } catch (error) {
      // 文件不存在，使用空数组
    }
    
    // 移除同一IP的旧数据
    results = results.filter(item => item.ip !== ip)
    
    // 添加新数据
    const storedResult: StoredResult = {
      ip,
      result,
      timestamp: Date.now(),
      expiresAt: Date.now() + 24 * 60 * 60 * 1000 // 24小时
    }
    results.push(storedResult)
    
    // 保存到文件
    await fs.mkdir(path.dirname(STORAGE_FILE), { recursive: true })
    await fs.writeFile(STORAGE_FILE, JSON.stringify(results))
    
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error('保存失败:', error)
    return NextResponse.json({ error: '保存失败' }, { status: 500 })
  }
} 