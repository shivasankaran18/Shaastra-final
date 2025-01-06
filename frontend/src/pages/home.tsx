import { useState } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import { Line, LineChart, XAxis, YAxis, ResponsiveContainer } from "recharts"
import { Navbar } from '@/components/Navbar'
import { Navbar2 } from '@/components/Navbar2'

// Mock data for the credit score graph
const creditScoreData = [
  { month: 'Jan', score: 650 },
  { month: 'Feb', score: 680 },
  { month: 'Mar', score: 700 },
  { month: 'Apr', score: 720 },
  { month: 'May', score: 750 },
  { month: 'Jun', score: 780 },
]

// Mock data for recommended banks
const recommendedBanks = [
  { name: 'Excellent Credit Bank', minScore: 750, color: 'bg-green-500', image: '/placeholder.svg?height=200&width=200' },
  { name: 'Good Credit Bank', minScore: 700, color: 'bg-blue-500', image: '/placeholder.svg?height=200&width=200' },
  { name: 'Fair Credit Bank', minScore: 650, color: 'bg-yellow-500', image: '/placeholder.svg?height=200&width=200' },
  { name: 'Building Credit Bank', minScore: 600, color: 'bg-red-500', image: '/placeholder.svg?height=200&width=200' },
]

export  function CreditScorePage() {
  const [currentScore, setCurrentScore] = useState<number | null>(null)

  const checkCreditScore = () => {
    // In a real application, this would make an API call to get the actual credit score
    const simulatedScore = Math.floor(Math.random() * (850 - 300 + 1)) + 300
    setCurrentScore(simulatedScore)
  }

  return (
      <div className="min-h-screen bg-black text-white p-4">
          <Navbar2 />
          <br></br>
          <br></br>
      <div className="container mx-auto max-w-4xl">
        <h1 className="text-3xl font-bold mb-6 text-center text-transparent bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text">
          Your Credit Score Overview
        </h1>

        <Card className="bg-gray-900 shadow-xl border-gray-800 mb-6">
          <CardHeader>
            <CardTitle className="text-xl text-gray-300">Credit Score Trend</CardTitle>
          </CardHeader>
          <CardContent>
            <ChartContainer
              config={{
                score: {
                  label: "Credit Score",
                  color: "hsl(var(--chart-1))",
                },
              }}
              className="h-[300px]"
            >
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={creditScoreData}>
                  <XAxis dataKey="month" stroke="#888888" />
                  <YAxis stroke="#888888" domain={[600, 850]} />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <Line type="monotone" dataKey="score" stroke="var(--color-score)" strokeWidth={2} dot={{ r: 4 }} />
                </LineChart>
              </ResponsiveContainer>
            </ChartContainer>
          </CardContent>
        </Card>

        <div className="text-center mb-6">
          <Button 
            onClick={checkCreditScore}
            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white hover:from-purple-600 hover:to-blue-600"
          >
            Check Credit Risk Score
          </Button>
          {currentScore && (
            <p className="mt-4 text-xl">
              Your current credit score: <span className="font-bold text-2xl">{currentScore}</span>
            </p>
          )}
        </div>

        <h2 className="text-2xl font-semibold mb-4 text-gray-300">Recommended Banks</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {recommendedBanks.map((bank, index) => (
            <Card key={index} className={`bg-gray-800 border-gray-700 ${currentScore && currentScore >= bank.minScore ? 'ring-2 ring-green-500' : ''}`}>
              <CardHeader>
                <CardTitle className="flex items-center justify-center">
                  <span className={`w-3 h-3 rounded-full mr-2 ${bank.color}`}></span>
                  {bank.name}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-col items-center space-y-4">
                <div className="w-full flex justify-center">
                  <image
                    // src= {bank.image}
                    // alt={`${bank.name} logo`}
                    width={200}
                    height={200}
                    className="rounded-lg"
                  />
                </div>
                <div className="text-center">
                  <p className="text-gray-400">Minimum Score: {bank.minScore}</p>
                  {currentScore && currentScore >= bank.minScore && (
                    <p className="text-green-500 mt-2">You qualify for this bank!</p>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
