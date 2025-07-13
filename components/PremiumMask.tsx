import { Lock } from "lucide-react"
import { Button } from "@/components/ui/button"
import React, { useEffect, useState } from "react"

interface PremiumMaskProps {
  children: React.ReactNode
  title?: string
  desc?: string
  buttonText?: string
  onUnlockClick?: () => void
  unlocked?: boolean
}

export default function PremiumMask({ children, title, desc, buttonText, onUnlockClick, unlocked }: PremiumMaskProps) {
  // 本地开发环境下的调试开关
  const [devUnlocked, setDevUnlocked] = useState(false);

  useEffect(() => {
    if (process.env.NODE_ENV !== "development") return;
    const handler = (e: KeyboardEvent) => {
      // Ctrl+P 解锁
      if (e.ctrlKey && e.key.toLowerCase() === "p") {
        setDevUnlocked(true);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  // 本地按 Ctrl+P 后强制解锁，线上环境不受影响
  if ((process.env.NODE_ENV === "development" && devUnlocked) || unlocked) {
    return <>{children}</>;
  }
  return (
    <div className="relative w-full h-full">
      {/* 模糊内容 */}
      <div className="filter blur-sm pointer-events-none select-none" aria-hidden>
        {children}
      </div>
      {/* 遮罩弹窗 - absolute 定位，只覆盖内容区 */}
      <div className="absolute inset-0 flex items-start pt-8 sm:items-center sm:pt-0 justify-center z-10">
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