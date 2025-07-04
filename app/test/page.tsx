"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { useRouter } from "next/navigation"

const questions = [
  {
    id: 1,
    question: "パーティーで新しい人に会うとき、あなたは：",
    optionA: "積極的に話しかけて新しい友達を作る",
    optionB: "知っている人の近くにいて、紹介されるのを待つ",
    dimension: "EI",
  },
  {
    id: 2,
    question: "問題を解決するとき、あなたは：",
    optionA: "具体的な事実とデータに基づいて判断する",
    optionB: "直感と可能性を重視して判断する",
    dimension: "SN",
  },
  {
    id: 3,
    question: "決断を下すとき、あなたは：",
    optionA: "論理的な分析を重視する",
    optionB: "人への影響や感情を重視する",
    dimension: "TF",
  },
  {
    id: 4,
    question: "計画を立てるとき、あなたは：",
    optionA: "詳細なスケジュールを作って従う",
    optionB: "柔軟性を保ち、状況に応じて調整する",
    dimension: "JP",
  },
  {
    id: 5,
    question: "週末の過ごし方として好むのは：",
    optionA: "友人たちと外出して活動的に過ごす",
    optionB: "家で静かに読書や趣味を楽しむ",
    dimension: "EI",
  },
  // Add more questions here - for demo purposes, I'll add a few more
  {
    id: 6,
    question: "新しいプロジェクトを始めるとき：",
    optionA: "まず全体の概要と可能性を考える",
    optionB: "具体的な手順と詳細から始める",
    dimension: "SN",
  },
  {
    id: 7,
    question: "チームで作業するとき：",
    optionA: "効率性と結果を最優先する",
    optionB: "チームの調和と全員の意見を重視する",
    dimension: "TF",
  },
  {
    id: 8,
    question: "旅行の計画を立てるとき：",
    optionA: "事前に詳細な行程を決めておく",
    optionB: "大まかな方向性だけ決めて現地で決める",
    dimension: "JP",
  },
]

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

  const handleSubmit = () => {
    // Calculate MBTI type based on answers
    const scores = { E: 0, I: 0, S: 0, N: 0, T: 0, F: 0, J: 0, P: 0 }

    Object.entries(answers).forEach(([questionId, answer]) => {
      const question = questions.find((q) => q.id === Number.parseInt(questionId))
      if (question) {
        const dimension = question.dimension
        if (answer === "A") {
          scores[dimension[0] as keyof typeof scores]++
        } else {
          scores[dimension[1] as keyof typeof scores]++
        }
      }
    })

    const mbtiType =
      (scores.E > scores.I ? "E" : "I") +
      (scores.S > scores.N ? "S" : "N") +
      (scores.T > scores.F ? "T" : "F") +
      (scores.J > scores.P ? "J" : "P")

    // Store result in localStorage for demo
    localStorage.setItem(
      `mbti_result_${sessionId}`,
      JSON.stringify({
        type: mbtiType,
        scores,
        timestamp: new Date().toISOString(),
      }),
    )

    router.push(`/result/${sessionId}`)
  }

  const currentQ = questions[currentQuestion]
  const isLastQuestion = currentQuestion === questions.length - 1
  const hasAnswered = answers[currentQ.id]

  return (
    <div className="min-h-screen bg-gradient-to-b from-orange-50 to-white">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-orange-500 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">M</span>
              </div>
              <span className="text-xl font-bold text-gray-900">MBTI診断</span>
            </div>
            <div className="text-sm text-gray-600">
              質問 {currentQuestion + 1} / {questions.length}
            </div>
          </div>
        </div>
      </header>

      {/* Progress Bar */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <Progress value={progress} className="w-full" />
          <p className="text-sm text-gray-600 mt-2 text-center">進捗: {Math.round(progress)}%</p>
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
              <CardTitle className="text-2xl md:text-3xl text-gray-900 leading-relaxed">{currentQ.question}</CardTitle>
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
                  <span className="text-lg leading-relaxed">{currentQ.optionA}</span>
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
                  <span className="text-lg leading-relaxed">{currentQ.optionB}</span>
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
