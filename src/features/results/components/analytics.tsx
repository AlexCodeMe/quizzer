import React from 'react'

const Analytics = () => {
  return (
    <div>Analytics</div>
  )
}

export default Analytics

// "use client"

// import { useState, useEffect } from "react"
// import { Bar } from "react-chartjs-2"
// import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from "chart.js"

// ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend)

// type AnalyticsData = {
//   totalQuizzes: number
//   averageScore: number
//   topPerformingQuiz: string
//   scoreDistribution: { score: string; count: number }[]
// }

// export default function AnalyticsSummary() {
//   const [analytics, setAnalytics] = useState<AnalyticsData | null>(null)

//   useEffect(() => {
//     // Simulating API call with dummy data
//     const dummyAnalytics: AnalyticsData = {
//       totalQuizzes: 15,
//       averageScore: 82,
//       topPerformingQuiz: "React Fundamentals",
//       scoreDistribution: [
//         { score: "0-20", count: 1 },
//         { score: "21-40", count: 2 },
//         { score: "41-60", count: 3 },
//         { score: "61-80", count: 5 },
//         { score: "81-100", count: 4 },
//       ],
//     }
//     setAnalytics(dummyAnalytics)
//   }, [])

//   if (!analytics) return <div>Loading analytics...</div>

//   const chartData = {
//     labels: analytics.scoreDistribution.map((item) => item.score),
//     datasets: [
//       {
//         label: "Score Distribution",
//         data: analytics.scoreDistribution.map((item) => item.count),
//         backgroundColor: "rgba(75, 192, 192, 0.6)",
//       },
//     ],
//   }

//   const chartOptions = {
//     responsive: true,
//     plugins: {
//       legend: {
//         position: "top" as const,
//       },
//       title: {
//         display: true,
//         text: "Score Distribution",
//       },
//     },
//   }

//   return (
//     <div className="bg-white shadow rounded-lg p-4">
//       <h2 className="text-2xl font-semibold mb-4">Your Analytics</h2>
//       <div className="space-y-4">
//         <p>Total Quizzes Taken: {analytics.totalQuizzes}</p>
//         <p>Average Score: {analytics.averageScore}%</p>
//         <p>Top Performing Quiz: {analytics.topPerformingQuiz}</p>
//         <div>
//           <Bar data={chartData} options={chartOptions} />
//         </div>
//       </div>
//     </div>
//   )
// }

