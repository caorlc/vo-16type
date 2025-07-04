import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import React from "react"

interface PremiumMaskProps {
  children: React.ReactNode
  title?: string
  desc?: string
  buttonText?: string
  onUnlockClick?: () => void
}

export default function PremiumMask({ children, title, desc, buttonText, onUnlockClick }: PremiumMaskProps) {
  return (
    <div className="relative w-full h-full">
      {/* 模糊内容 */}
      <div className="filter blur-sm pointer-events-none select-none" aria-hidden>
        {children}
      </div>
      {/* 遮罩弹窗 - absolute 定位，只覆盖内容区 */}
      <div className="absolute inset-0 flex items-center justify-center z-10">
        <div className="bg-white rounded-xl shadow-xl p-8 flex flex-col items-center max-w-md w-full border">
          <Lock className="w-10 h-10 text-orange-500 mb-2" />
          <div className="font-bold text-lg mb-2">{title || "今すぐロックを解除"}</div>
          <div className="text-gray-600 text-center mb-4">
            {desc || "この内容はプレミアム限定です。"}
          </div>
          <Button className="w-full bg-orange-500 hover:bg-orange-600 border-orange-500" style={{color: '#fff'}} onClick={onUnlockClick}>
            {buttonText || "すべての結果のロックを解除"}
          </Button>
        </div>
      </div>
    </div>
  )
} 