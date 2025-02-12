import React from 'react'
import { Id } from '../../../../convex/_generated/dataModel'

interface UserResultsProps {
  quizId: Id<'quizzes'>
}

const UserResults = ({ quizId }: UserResultsProps) => {
  return (
    <div className='bg-white shadow rounded-lg p-6'>
      <h2 className='text-2xl font-semibold mb-4'>User Results</h2>
      <p>{quizId}</p>
      <ul className='space-y-4'>
        {/* {results.map((result) => (
      <li key={result.userId} className="border-b pb-2">
        <Link href={`/results/${result.userId}`} className="block hover:bg-gray-50">
          <p className="font-medium">{result.username}</p>
          <p>Score: {result.score}%</p>
          <p className="text-sm text-gray-500">Date: {result.date}</p>
        </Link>
      </li>
    ))} */}
      </ul>
    </div>
  )
}

export default UserResults
