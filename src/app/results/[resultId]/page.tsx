import React, { Suspense } from 'react'
import { Id } from '../../../../convex/_generated/dataModel'
import ResultDetails from '@/features/results/components/result-details'
import QuizAnswers from '@/features/results/components/quiz-answers'

interface ResultDetailsPageProps {
  params: Promise<{ resultId: Id<'results'> }>
}

const ResultDetailsPage = async ({ params }: ResultDetailsPageProps) => {
  const resultId = (await params).resultId

  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6'>Quiz Result Details</h1>
      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        <Suspense fallback={<div>Loading result details...</div>}>
          <ResultDetails resultId={resultId} />
        </Suspense>
        <Suspense fallback={<div>Loading answers...</div>}>
          <QuizAnswers resultId={resultId} />
        </Suspense>
      </div>
    </div>
  )
}

export default ResultDetailsPage
