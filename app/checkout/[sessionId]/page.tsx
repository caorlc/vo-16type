"use client"

import { useState } from "react"
import { useParams, useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Check, CreditCard, Shield, Star } from "lucide-react"

const features = [
  "詳細な性格分析レポート",
  "強みと弱みの具体的な解説",
  "キャリア開発のアドバイス",
  "人間関係改善のガイド",
  "個人成長のロードマップ",
  "相性の良いタイプとの関係構築法",
]

export default function CheckoutPage() {
  const params = useParams()
  const router = useRouter()
  const [isProcessing, setIsProcessing] = useState(false)
  const sessionId = params.sessionId as string

  const handlePayment = async () => {
    setIsProcessing(true)

    // Simulate payment processing
    setTimeout(() => {
      // Mark as paid in localStorage for demo
      localStorage.setItem(`mbti_premium_${sessionId}`, "true")
      router.push(`/result/${sessionId}?premium=true`)
    }, 2000)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">M</span>
            </div>
            <span className="text-xl font-bold text-gray-900">MBTI診断</span>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">プレミアム版を解除</h1>
            <p className="text-xl text-gray-600">あなたの性格をより深く理解し、人生をより豊かにしましょう</p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Features */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <Star className="w-6 h-6 mr-2 text-orange-500" />
                  プレミアム機能
                </CardTitle>
                <CardDescription>完全版で得られる詳細な分析とアドバイス</CardDescription>
              </CardHeader>
              <CardContent>
                <ul className="space-y-4">
                  {features.map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                <Separator className="my-6" />

                <div className="text-center">
                  <div className="flex items-center justify-center space-x-2 mb-2">
                    <span className="text-3xl font-bold text-gray-900">¥980</span>
                    <Badge variant="secondary">一回限り</Badge>
                  </div>
                  <p className="text-sm text-gray-600">月額料金なし • 永続アクセス • 30日間返金保証</p>
                </div>
              </CardContent>
            </Card>

            {/* Payment Form */}
            <Card className="border-0 shadow-xl">
              <CardHeader>
                <CardTitle className="flex items-center text-2xl">
                  <CreditCard className="w-6 h-6 mr-2 text-blue-500" />
                  お支払い情報
                </CardTitle>
                <CardDescription>安全な決済システムで保護されています</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="email">メールアドレス</Label>
                    <Input id="email" type="email" placeholder="your@email.com" className="mt-1" />
                  </div>

                  <div>
                    <Label htmlFor="card">カード番号</Label>
                    <Input id="card" placeholder="1234 5678 9012 3456" className="mt-1" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="expiry">有効期限</Label>
                      <Input id="expiry" placeholder="MM/YY" className="mt-1" />
                    </div>
                    <div>
                      <Label htmlFor="cvc">CVC</Label>
                      <Input id="cvc" placeholder="123" className="mt-1" />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="name">カード名義</Label>
                    <Input id="name" placeholder="田中 太郎" className="mt-1" />
                  </div>
                </div>

                <Separator />

                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">プレミアム版</span>
                    <span className="font-semibold">¥980</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">税込</span>
                    <span className="font-semibold">¥0</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between items-center text-lg font-bold">
                    <span>合計</span>
                    <span>¥980</span>
                  </div>
                </div>

                <Button
                  size="lg"
                  className="w-full bg-orange-500 hover:bg-orange-600 text-white py-4 text-lg"
                  onClick={handlePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? "処理中..." : "今すぐ購入する"}
                </Button>

                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4" />
                  <span>SSL暗号化により安全に保護されています</span>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Trust Indicators */}
          <div className="mt-12 text-center">
            <div className="grid md:grid-cols-3 gap-8">
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
                  <Shield className="w-8 h-8 text-green-500" />
                </div>
                <h3 className="font-semibold mb-2">安全な決済</h3>
                <p className="text-sm text-gray-600">業界標準のSSL暗号化で個人情報を保護</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <Star className="w-8 h-8 text-blue-500" />
                </div>
                <h3 className="font-semibold mb-2">満足保証</h3>
                <p className="text-sm text-gray-600">30日間の返金保証付き</p>
              </div>
              <div className="flex flex-col items-center">
                <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mb-4">
                  <Check className="w-8 h-8 text-purple-500" />
                </div>
                <h3 className="font-semibold mb-2">即座にアクセス</h3>
                <p className="text-sm text-gray-600">購入後すぐに完全版をご利用いただけます</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
