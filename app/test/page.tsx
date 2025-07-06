"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"
import { questions, calcMBTI } from "@/lib/questions-ja"

export default function TestPage() {
  const [currentQuestion, setCurrentQuestion] = useState(0)
  const [answers, setAnswers] = useState<Record<number, "A" | "B">>({})
  const [sessionId] = useState(() => Math.random().toString(36).substr(2, 9))
  const router = useRouter()

  const progress = ((currentQuestion + 1) / questions.length) * 100

  const handleAnswer = (answer: "A" | "B") => {
    setAnswers((prev) => ({
      ...prev,
      [questions[currentQuestion].id]: answer,
    }))

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  const handlePrevious = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion((prev) => prev - 1)
    }
  }

  const handleNext = () => {
    if (currentQuestion < questions.length - 1 && answers[questions[currentQuestion].id]) {
      setCurrentQuestion((prev) => prev + 1)
    }
  }

  const handleSubmit = async () => {
    // 验证是否回答了所有问题
    const answeredCount = Object.keys(answers).length
    if (answeredCount < questions.length) {
      alert(`请回答所有问题后再提交。当前已回答 ${answeredCount}/${questions.length} 个问题。`)
      return
    }
    // 计算结果
    const result = calcMBTI(answers)
    // 先清除旧的结果
    const keys = Object.keys(localStorage)
    keys.forEach(key => {
      if (key.startsWith('16type_result_')) {
        localStorage.removeItem(key)
      }
    })
    // 先本地存储
    localStorage.setItem(
      `16type_result_${sessionId}`,
      JSON.stringify({
        type: result.type,
        detail: result.detail,
        timestamp: new Date().toISOString(),
      }),
    )
    // 立即跳转
    router.push(`/result/${sessionId}`)
    // 异步保存到数据库
    try {
      const ipResponse = await fetch('/api/get-ip')
      const { ip } = await ipResponse.json()
      await fetch('/api/save-result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ip, 
          sessionId,
          result: {
            type: result.type,
            detail: result.detail,
            timestamp: new Date().toISOString(),
          }
        })
      })
    } catch (error) {
      console.error('保存失败:', error)
    }
  }

  const handleSkip = async () => {
    const randomAnswers: Record<number, "A" | "B"> = {}
    for (let i = 1; i <= 70; i++) {
      randomAnswers[i] = Math.random() > 0.5 ? "A" : "B"
    }
    const result = calcMBTI(randomAnswers)
    // 先清除旧的结果
    const keys = Object.keys(localStorage)
    keys.forEach(key => {
      if (key.startsWith('16type_result_')) {
        localStorage.removeItem(key)
      }
    })
    // 先本地存储
    localStorage.setItem(
      `16type_result_${sessionId}`,
      JSON.stringify({
        type: result.type,
        detail: result.detail,
        timestamp: new Date().toISOString(),
      }),
    )
    // 立即跳转
    router.push(`/result/${sessionId}`)
    // 异步保存到数据库
    try {
      const ipResponse = await fetch('/api/get-ip')
      const { ip } = await ipResponse.json()
      await fetch('/api/save-result', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          ip, 
          sessionId,
          result: {
            type: result.type,
            detail: result.detail,
            timestamp: new Date().toISOString(),
          }
        })
      })
    } catch (error) {
      console.error('保存失败:', error)
    }
  }

  const currentQ = questions[currentQuestion]
  const isLastQuestion = currentQuestion === questions.length - 1
  const hasAnswered = answers[currentQ.id]

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Progress Bar + Question Number */}
      <div className="bg-white border-b sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <Progress value={progress} className="w-full" />
          <div className="flex justify-between items-center mt-2">
            <p className="text-sm text-gray-600">進捗: {Math.round(progress)}%</p>
            <p className="text-sm text-gray-600">質問 {currentQuestion + 1} / {questions.length}</p>
          </div>
        </div>
      </div>

      {/* Question */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-3xl mx-auto">
          <Card className="shadow-xl border-0">
            <CardHeader className="text-center pb-8">
              <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl font-bold text-orange-500">{currentQuestion + 1}</span>
              </div>
              <CardTitle className="text-2xl md:text-3xl text-gray-900 leading-relaxed break-words whitespace-normal w-full max-w-full">{currentQ.text}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Button
                variant={answers[currentQ.id] === "A" ? "default" : "outline"}
                size="lg"
                className="w-full p-6 h-auto text-left justify-start"
                onClick={() => handleAnswer("A")}
              >
                <div className="flex items-start space-x-3">
                  <span className="bg-orange-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    A
                  </span>
                  <span className="text-lg leading-relaxed break-words whitespace-normal w-full max-w-full">{currentQ.a}</span>
                </div>
              </Button>

              <Button
                variant={answers[currentQ.id] === "B" ? "default" : "outline"}
                size="lg"
                className="w-full p-6 h-auto text-left justify-start"
                onClick={() => handleAnswer("B")}
              >
                <div className="flex items-start space-x-3">
                  <span className="bg-blue-500 text-white rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold">
                    B
                  </span>
                  <span className="text-lg leading-relaxed break-words whitespace-normal w-full max-w-full">{currentQ.b}</span>
                </div>
              </Button>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="flex justify-between items-center mt-8">
            <Button
              variant="outline"
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="flex items-center bg-transparent"
            >
              <ChevronLeft className="w-4 h-4 mr-2" />
              前の質問
            </Button>

            {isLastQuestion ? (
              <Button
                onClick={handleSubmit}
                disabled={!hasAnswered}
                className="bg-orange-500 hover:bg-orange-600 text-white px-8"
              >
                結果を見る
              </Button>
            ) : (
              <Button onClick={handleNext} disabled={!hasAnswered} className="flex items-center">
                次の質問
                <ChevronRight className="w-4 h-4 ml-2" />
              </Button>
            )}
            <Button onClick={handleSkip} variant="outline" className="ml-4">
              跳过
            </Button>
          </div>
        </div>
      </div>

      {/* Side Progress Indicator */}
      <div className="fixed right-4 top-1/2 transform -translate-y-1/2 hidden lg:block">
        <div className="bg-white rounded-lg shadow-lg p-4">
          <div className="space-y-2">
            {questions.map((_, index) => (
              <div
                key={index}
                className={`w-3 h-3 rounded-full ${
                  index < currentQuestion ? "bg-green-500" : index === currentQuestion ? "bg-orange-500" : "bg-gray-200"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
