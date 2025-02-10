import React from 'react'
import { Question } from '../../../../convex/schema'
import { useCreateQuiz } from '../hooks/use-create-quiz'
import { Trash2 } from 'lucide-react'

interface PreviewProps {
  quizState: {
    name: string
    description: string
    topic: string
    questions: Question[]
  }
}

const Preview = () => {
  const { quizState, removeQuestionFromQuiz } = useCreateQuiz()

  return (
    <div className='space-y-6 mt-10'>
      <div className='bg-white shadow-lg rounded-lg p-6'>
        <h1 className='text-3xl font-bold mb-4'>
          {quizState.name || 'Quiz Name'}
        </h1>
        <p className='text-zinc-600 mb-2'>
          {quizState.description || 'Description goes here...'}
        </p>
        <p className='text-sm font-medium'>
          Topic:{' '}
          <span className='text-indigo-600'>
            {quizState.topic || "Your quiz's topic"}
          </span>
        </p>
      </div>
      <div className='bg-white shadow rounded-lg p-6'>
        <h2 className='text-2xl font-bold mb-4'>Questions</h2>
        <div className='space-y-4'>
          {quizState.questions.length === 0 ? (
            <>
              {[0, 1, 2].map((idx) => (
                <div
                  key={idx}
                  className='border rounded-lg p-4 cursor-pointer hover:bg-zinc-100 flex items-center justify-between'
                >
                  <div>
                    <p className='font-medium'>Question Type</p>
                    <p className='text-sm'>
                      Question:{' '}
                      <span className='text-indigo-600'>The Question</span>
                    </p>
                  </div>
                  <button>
                    <Trash2 className='size-5 text-rose-600' />
                  </button>
                </div>
              ))}
            </>
          ) : (
            <>
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
            </>
          )}
        </div>
      </div>
    </div>
  )
}

export default Preview
