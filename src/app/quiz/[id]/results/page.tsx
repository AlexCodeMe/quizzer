import React, { Suspense } from 'react'
import { Id } from '../../../../../convex/_generated/dataModel'
import UserResults from '@/features/results/components/user-results'
import QuizAnalytics from '@/features/results/components/quiz-analytics'

interface QuizResultsPageProps {
  params: Promise<{ id: Id<'quizzes'> }>
}

const QuizResultsPage = async ({ params }: QuizResultsPageProps) => {
  const { id } = await params

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6'>Quiz Results and Analytics</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <Suspense fallback={<div>Loading quiz analytics...</div>}>
          <QuizAnalytics quizId={id} />
        </Suspense>
        <Suspense fallback={<div>Loading user results...</div>}>
          <UserResults quizId={id} />
        </Suspense>
      </div>
    </div>
  )
}

export default QuizResultsPage
