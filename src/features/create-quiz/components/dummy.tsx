import { Trash2 } from 'lucide-react'
import { Question } from '../../../../convex/schema'
import { useCreateQuiz } from '../hooks/use-create-quiz'

interface QuestionsListProps {
  quizState: {
    name: string
    description: string
    topic: string
    questions: Question[]
  }
}

function QuestionsList({ quizState }: QuestionsListProps) {
  const { addQuestionToQuiz, removeQuestionFromQuiz } = useCreateQuiz()

  return (
    <div className='space-y-6 mt-10'>
      <div className='bg-white shadow rounded-lg p-6'>
        <h1 className='text-3xl font-bold mb-4'>{quizState.name}</h1>
        <p className='text-gray-600 mb-2'>{quizState.description}</p>
        <p className='text-sm text-indigo-600 font-medium'>
          Topic: {quizState.topic}
        </p>
      </div>

      <div className='bg-white shadow rounded-lg p-6'>
        <h2 className='text-2xl font-bold mb-4'>Questions</h2>
        <div className='space-y-4'>
        {quizState.questions.map((q, idx) => (
            <div
              key={idx}
              onClick={() => {}} // TODO: Edit Question?
              className='border rounded-lg p-4 cursor-pointer hover:bg-zinc-100 flex items-center justify-between'
            >
              <div>
                <p className='font-medium'>{q.type}</p>
                <p className='text-sm'>
                  Question:{' '}
                  <span className='text-indigo-600'>{q.question}</span>
                </p>
              </div>
              <button
                onClick={(e) => {
                  e.stopPropagation()
                  removeQuestionFromQuiz(q)
                }}
              >
                <Trash2 className='size-5 text-rose-600' />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default QuestionsList
