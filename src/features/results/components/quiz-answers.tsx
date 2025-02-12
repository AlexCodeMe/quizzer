'use client'

import { api } from '../../../../convex/_generated/api'
import { useQuery } from 'convex/react'
import { Id } from '../../../../convex/_generated/dataModel'

interface QuizAnswersProps {
  resultId: Id<'results'>
}

const QuizAnswers = ({ resultId }: QuizAnswersProps) => {
  const data = useQuery(api.results.getResult, {
    _id: resultId,
  })

  if (!data) {
    return <div>Quiz not found</div>
  }

  //   const { quiz, result } = data

  return (
    <div className='bg-white shadow rounded-lg p-6'>
      <h2 className='text-2xl font-semibold mb-4'>Your Answers</h2>
      <ul className='space-y-4'>
        {/* {quiz?.questions.map((question) => (
          <li key={question._id}>
            <div className='flex justify-between items-center mb-2'></div>
          </li> 
        ))} */}
      </ul>
    </div>
  )
}

export default QuizAnswers
