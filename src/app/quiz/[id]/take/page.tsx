import React from 'react'
import { Doc, Id } from '../../../../../convex/_generated/dataModel'
import { fetchQuery } from 'convex/nextjs'
import { api } from '../../../../../convex/_generated/api'
import TakeQuiz from '@/features/take-quiz/components/take-quiz'

interface TakeQuizPageProps {
  params: Promise<{ id: Id<'quizzes'> }>
}

const TakeQuizPage = async ({ params }: TakeQuizPageProps) => {
  const { id } = await params

  const quiz: Doc<'quizzes'> & { questions: Doc<'questions'>[] } =
    await fetchQuery(api.quizzes.getQuizWithQuestions, {
      _id: id,
    })

  return (
    <div className='container mx-auto px-4 py-8'>
      <h1 className='text-3xl font-bold mb-4'>{quiz.name}</h1>
      <p className='text-gray-600 mb-6'>{quiz.description}</p>
      <TakeQuiz quiz={quiz} />
    </div>
  )
}

export default TakeQuizPage
