import { useState, useEffect } from 'react'

interface MBTIResult {
  type: string
  detail: Record<"EI"|"SN"|"TF"|"JP", { a: number, b: number }>
  timestamp: string
  mbtiType?: string
}

export function useResult() {
  const [result, setResult] = useState<MBTIResult | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const loadResult = async () => {
      try {
        // 先尝试从localStorage获取
        const keys = Object.keys(localStorage)
        const resultKeys = keys.filter(key => key.startsWith('16type_result_'))
        
        if (resultKeys.length > 0) {
          // 获取最新的结果
          const latestKey = resultKeys.sort((a, b) => {
            const aData = localStorage.getItem(a)
            const bData = localStorage.getItem(b)
            if (!aData || !bData) return 0
            
            const aTime = JSON.parse(aData).timestamp
            const bTime = JSON.parse(bData).timestamp
            return new Date(bTime).getTime() - new Date(aTime).getTime()
          })[0]
          
          const resultData = localStorage.getItem(latestKey)
          if (resultData) {
            const parsed = JSON.parse(resultData)
            if (!parsed.mbtiType && parsed.type) {
              parsed.mbtiType = parsed.type
              localStorage.setItem(latestKey, JSON.stringify(parsed))
            }
            setResult(parsed)
          }
        } else {
          // 如果localStorage没有，尝试从服务器获取
          try {
            const ipResponse = await fetch('/api/get-ip')
            const { ip } = await ipResponse.json()
            
            const resultResponse = await fetch(`/api/get-result?ip=${ip}`)
            const { result: serverResult } = await resultResponse.json()
            
            if (serverResult) {
              if (!serverResult.mbtiType && serverResult.type) {
                serverResult.mbtiType = serverResult.type
              }
              setResult(serverResult)
            }
          } catch (error) {
            console.error('服务器获取结果失败:', error)
          }
        }
      } catch (error) {
        console.error('加载结果失败:', error)
      } finally {
        setLoading(false)
      }
    }
    
    loadResult()
  }, [])

  const clearResult = () => {
    // 清除localStorage中的所有结果
    const keys = Object.keys(localStorage)
    keys.forEach(key => {
      if (key.startsWith('16type_result_')) {
        localStorage.removeItem(key)
      }
    })
    setResult(null)
  }

  return { result, loading, clearResult }
} 