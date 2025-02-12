import React from 'react'
import { Id } from '../../../../convex/_generated/dataModel'

interface QuizAnalyticsProps {
  quizId: Id<'quizzes'>
}

const QuizAnalytics = ({ quizId }: QuizAnalyticsProps) => {
  return <div>{quizId}</div>
}

export default QuizAnalytics

// "use client"

// import { useState, useEffect } from "react"
// import { Doughnut } from "react-chartjs-2"
// import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js"

// ChartJS.register(ArcElement, Tooltip, Legend)

// type QuizAnalytics = {
//   totalAttempts: number
//   averageScore: number
//   highestScore: number
//   lowestScore: number
//   scoreDistribution: { range: string; count: number }[]
// }

// export default function QuizAnalytics({ quizId }: { quizId: string }) {
//   const [analytics, setAnalytics] = useState<QuizAnalytics | null>(null)

//   useEffect(() => {
//     // Simulating API call with dummy data
//     const dummyAnalytics: QuizAnalytics = {
//       totalAttempts: 100,
//       averageScore: 75,
//       highestScore: 100,
//       lowestScore: 30,
//       scoreDistribution: [
//         { range: "0-20", count: 5 },
//         { range: "21-40", count: 10 },
//         { range: "41-60", count: 25 },
//         { range: "61-80", count: 40 },
//         { range: "81-100", count: 20 },
//       ],
//     }
//     setAnalytics(dummyAnalytics)
//   }, [])

//   if (!analytics) return <div>Loading quiz analytics...</div>

//   const chartData = {
//     labels: analytics.scoreDistribution.map((item) => item.range),
//     datasets: [
//       {
//         data: analytics.scoreDistribution.map((item) => item.count),
//         backgroundColor: [
//           "rgba(255, 99, 132, 0.6)",
//           "rgba(54, 162, 235, 0.6)",
//           "rgba(255, 206, 86, 0.6)",
//           "rgba(75, 192, 192, 0.6)",
//           "rgba(153, 102, 255, 0.6)",
//         ],
//       },
//     ],
//   }

//   return (
//     <div className="bg-white shadow rounded-lg p-6">
//       <h2 className="text-2xl font-semibold mb-4">Quiz Analytics</h2>
//       <div className="grid grid-cols-2 gap-4 mb-6">
//         <div>
//           <p className="font-medium">Total Attempts</p>
//           <p className="text-2xl">{analytics.totalAttempts}</p>
//         </div>
//         <div>
//           <p className="font-medium">Average Score</p>
//           <p className="text-2xl">{analytics.averageScore}%</p>
//         </div>
//         <div>
//           <p className="font-medium">Highest Score</p>
//           <p className="text-2xl">{analytics.highestScore}%</p>
//         </div>
//         <div>
//           <p className="font-medium">Lowest Score</p>
//           <p className="text-2xl">{analytics.lowestScore}%</p>
//         </div>
//       </div>
//       <div>
//         <h3 className="text-lg font-medium mb-2">Score Distribution</h3>
//         <Doughnut data={chartData} />
//       </div>
//     </div>
//   )
// }
