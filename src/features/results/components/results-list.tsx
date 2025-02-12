'use client'

import React from 'react'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'
import Link from 'next/link'
import { Clipboard, Clock } from 'lucide-react'

const ResultsList = () => {
  const userResults = useQuery(api.results.getResultsByUser)

  if (!userResults) {
    return <div>Loading...</div>
  }

  if (userResults.resultsWithQuiz.length === 0) {
    return <div>No results found</div>
  }

  return (
    <div className='space-y-6'>
      <h2 className='text-2xl font-semibold mb-4'>Your Results</h2>
      {userResults.resultsWithQuiz.map((result) => (
        <Link
          href={`/results/${result._id}`}
          key={result._id}
          className='block bg-white shadow-lg rounded-xl p-6 hover:shadow-xl transition-shadow duration-300'
        >
          <div className='flex justify-between items-start mb-4'>
            <h3 className='text-xl font-semibold text-gray-800'>
              {result.quiz?.name}
            </h3>
            <span className='inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800'>
              {new Date(result._creationTime).toLocaleDateString()}
            </span>
          </div>
          <div className='mb-4'>
            <div className='flex justify-between items-center mb-1'>
              <span className='text-sm font-medium text-gray-700'>Score</span>
              <span className='text-sm font-semibold text-gray-900'>
                {result.score}%
              </span>
            </div>
            <div className='w-full bg-gray-200 rounded-full h-2.5'>
              <div
                className='bg-blue-600 h-2.5 rounded-full'
                style={{ width: `${result.score}%` }}
              ></div>
            </div>
          </div>
          <div className='flex justify-between items-center text-sm text-gray-500'>
            <span className='flex items-center'>
              <Clock className='w-4 h-4 mr-1' />
              {/* {result.duration} mins */}
            </span>
            <span className='flex items-center'>
              <Clipboard className='w-4 h-4 mr-1' />
              {/* {result.quiz?.} questions */}
            </span>
          </div>
        </Link>
      ))}
    </div>
  )
}

export default ResultsList
