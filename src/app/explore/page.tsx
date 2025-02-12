import { fetchQuery } from 'convex/nextjs'
import { api } from '../../../convex/_generated/api'
import QuizCard from '@/features/explore/components/quiz-card'
import SearchInput from '@/features/explore/components/search-input'

interface ExplorePageProps {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>

}

async function ExplorePage({ searchParams }: ExplorePageProps) {
  const searchTerm = (await searchParams).search?.toString() || ''

  const quizData = await fetchQuery(api.quizzes.getQuizzes, {
    search: searchTerm,
  })

  return (
    <div className='container mx-auto px-4 py-8'>
      <SearchInput />
      <div>
        <h1 className='text-3xl font-bold mb-6'>Your Quizzes</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
          {quizData.map((quiz) => (
            <QuizCard key={quiz._id} quiz={quiz} />
          ))}
        </div>
      </div>
      <div>
        <h1 className='text-3xl font-bold'>Your Results</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
          {quizData.map((quiz) => (
            <QuizCard key={quiz._id} quiz={quiz} />
          ))}
        </div>
      </div>
      <div>
        <h1 className='text-3xl font-bold mb-6'>All Quizzes</h1>
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-6'>
          {quizData.map((quiz) => (
            <QuizCard key={quiz._id} quiz={quiz} />
          ))}
        </div>
      </div>
    </div>
  )
}

export default ExplorePage
