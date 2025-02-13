'use client'

import { useQuery } from 'convex/react'
import { Doc } from '../../../../convex/_generated/dataModel'
import { api } from '../../../../convex/_generated/api'
import Link from 'next/link'

interface ResultCardProps {
  result: Doc<'results'> & { quiz: Doc<'quizzes'> | null }
}

const ResultCard = ({ result }: ResultCardProps) => {
  if (!result.quiz) {
    return <div>No quiz found</div>
  }

  return (
    <div className='bg-white shadow-md rounded-lg overflow-hidden'>
      <div className='p-4'>
        <h2 className='text-xl font-semibold mb-2'>{result.quiz.name}</h2>
        <p className='text-gray-600 mb-2'>{result.quiz.description}</p>
        <p className='text-sm text-gray-500 mb-4'>Topic: {result.quiz.topic}</p>
        <div className='flex items-center justify-between'>
          <Link
            href={`/quiz/${result.quiz._id}/take`}
            className='inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors'
          >
            Re-Take Quiz
          </Link>
          <Link
            href={`/results/${result._id}`}
            className='inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors'
          >
            View Result
          </Link>
        </div>
      </div>
    </div>
  )
}

const ResultsGrid = () => {
  const resultsData = useQuery(api.results.getResultsByUser)

  if (!resultsData) {
    return <div>Loading...</div>
  }

  const { resultsWithQuiz } = resultsData

  if (resultsWithQuiz.length === 0) {
    return <div>No results found</div>
  }

  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
      {resultsWithQuiz.map((result) => (
        <ResultCard key={result._id} result={result} />
      ))}
    </div>
  )
}

export default ResultsGrid
