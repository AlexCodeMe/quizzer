'use client'

import React from 'react'
import { Id } from '../../../../convex/_generated/dataModel'
import { useQuery } from 'convex/react'
import { api } from '../../../../convex/_generated/api'

interface ResultDetailsProps {
  resultId: Id<'results'>
}

const ResultDetails = ({ resultId }: ResultDetailsProps) => {
  const result = useQuery(api.results.getResult, {
    _id: resultId,
  })

  if (!result) {
    return <div>Loading...</div>
  }

  return (
    <div className='bg-white shadow rounded-lg p-6'>
      <h2 className='text-2xl font-semibold mb-4'>{result.quiz.name}</h2>
      <div className='space-y-4'>
        <p className='text-3xl font-bold text-green-600'>
          {result.result.score}%
        </p>
        <p>
          Correct Answers:{' '}
          {Object.values(result.result.details).filter(Boolean).length} /{' '}
          {Object.keys(result.result.details).length}
        </p>
        <p>
          Date Taken: {new Date(result.result.completedAt).toLocaleDateString()}{' '}
          at {new Date(result.result.completedAt).toLocaleTimeString()}
        </p>
      </div>
    </div>
  )
}

export default ResultDetails
