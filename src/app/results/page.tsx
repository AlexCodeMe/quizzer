import Analytics from '@/features/results/components/analytics'
import ResultsList from '@/features/results/components/results-list'
import { Suspense } from 'react'

function ResultsPage() {
  return (
    <div className='container mx-auto p-4'>
      <h1 className='text-3xl font-bold mb-6'>Your Quiz Results</h1>
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <div className='md:col-span-2'>
          <Suspense fallback={<div>Loading results...</div>}>
            <ResultsList />
          </Suspense>
        </div>
        <div>
          <Suspense fallback={<div>Loading analytics...</div>}>
            <Analytics />
          </Suspense>
        </div>
      </div>
    </div>
  )
}

export default ResultsPage
