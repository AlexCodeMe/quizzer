import Link from 'next/link'
import { Doc } from '../../../../convex/_generated/dataModel'

export default function QuizCard({ quiz }: { quiz: Doc<'quizzes'> }) {
  return (
    <div className='bg-white shadow-md rounded-lg overflow-hidden'>
      <div className='p-4'>
        <h2 className='text-xl font-semibold mb-2'>{quiz.name}</h2>
        <p className='text-gray-600 mb-2'>{quiz.description}</p>
        <p className='text-sm text-gray-500 mb-4'>Topic: {quiz.topic}</p>
        <Link
          href={`/quiz/${quiz._id}`}
          className='inline-block bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition-colors'
        >
          Take Quiz
        </Link>
      </div>
    </div>
  )
}
