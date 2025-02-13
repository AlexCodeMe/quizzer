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

  const { quiz, details } = data

  return (
    <div className='bg-white shadow rounded-lg p-6'>
      <h2 className='text-2xl font-semibold mb-4'>
        Your Answers to {quiz.name}
      </h2>
      <ul className='space-y-4'>
        {details.map(({ question, detail }, index) => (
          <div key={question?._id}>
            <p>
              Question {index + 1}: {question?.question}
            </p>
            <p>Correct answer: {question?.answer}</p>
            <p>You answered: {detail ? 'Correctly' : 'Incorrectly'}</p>
            <p>{question?.explanation}</p>
          </div>
        ))}
      </ul>
    </div>
  )
}

export default QuizAnswers
