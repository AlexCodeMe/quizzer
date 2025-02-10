import React, { FormEvent, useState } from 'react'
import { Question } from '../../../../convex/schema'
import { useCreateQuiz } from '../hooks/use-create-quiz'
import { Sparkles } from 'lucide-react'
import { toast } from 'sonner'

type IFormState = {
  description: string
  topic: string
  type: Question['type']
  numberOfQuestions: number
}

const GenerationModal = () => {
  const {
    loading,
    error,
    isGenerateModalOpen,
    addQuestionToQuiz,
    toggleModal,
    generateQuestions,
  } = useCreateQuiz()

  const [formState, setFormState] = useState<IFormState>({
    topic: '',
    description: '',
    type: 'multiple_choice',
    numberOfQuestions: 1,
  })

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    const questions = await generateQuestions(
      formState.description,
      formState.topic,
      formState.type,
      formState.numberOfQuestions
    )

    if (!questions || questions.length === 0) {
      toast.error('Failed to generate questions')
      return
    }

    questions.forEach((q: Question) => {
      q.type = formState.type
      addQuestionToQuiz(q)
    })

    toast.success('Questions generated successfully')
    toggleModal('generation')
  }

  if (!isGenerateModalOpen) {
    return (
      <button
        className='px-4 py-2 bg-white border-2 border-indigo-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        onClick={() => toggleModal('generation')}
      >
        <Sparkles className='size-4 text-yellow-500' />
      </button>
    )
  }

  return (
    <div className='fixed inset-0 z-10 overflow-y-auto'>
      <div className='flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0'>
        <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
          <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
        </div>

        <span
          className='hidden sm:inline-block sm:align-middle sm:h-screen'
          aria-hidden='true'
        >
          &#8203;
        </span>

        <div className='inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
          <div className='px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4'>
            <h3 className='text-lg font-medium leading-6 text-gray-900'>
              Generate Questions with AI
            </h3>
            <form className='mt-4 space-y-4' onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor='description'
                  className='block text-sm font-medium text-gray-700'
                >
                  Description
                </label>
                <input
                  type='text'
                  id='description'
                  className='mt-1 px-4 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                  placeholder='Describe your Question'
                  value={formState.description}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      description: e.target.value,
                    }))
                  }
                  disabled={loading}
                />
              </div>
              <div>
                <label
                  htmlFor='topic'
                  className='block text-sm font-medium text-gray-700'
                >
                  Topic
                </label>
                <input
                  type='text'
                  id='topic'
                  className='mt-1 px-4 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                  placeholder='Enter a topic'
                  value={formState.topic}
                  onChange={(e) =>
                    setFormState((prev) => ({ ...prev, topic: e.target.value }))
                  }
                  disabled={loading}
                />
              </div>
              <div>
                <label
                  htmlFor='type'
                  className='block text-sm font-medium text-gray-700'
                >
                  Question Type
                </label>
                <select
                  id='type'
                  className='block w-full mt-1 py-2 px-4 border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
                  value={formState.type}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      type: e.target.value as Question['type'],
                    }))
                  }
                  disabled={loading}
                >
                  <option value='multiple_choice'>Multiple Choice</option>
                  <option value='true_false'>True/False</option>
                  <option value='short_answer'>Short Answer</option>
                  <option value='fill_in_the_blank'>Fill in the Blank</option>
                </select>
              </div>
              <div>
                <label
                  htmlFor='numberOfQuestions'
                  className='block text-sm font-medium text-gray-700'
                >
                  Number of Questions
                </label>
                <input
                  type='number'
                  id='numberOfQuestions'
                  className='mt-1 px-4 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
                  value={formState.numberOfQuestions}
                  onChange={(e) =>
                    setFormState((prev) => ({
                      ...prev,
                      numberOfQuestions: Number.parseInt(e.target.value),
                    }))
                  }
                  disabled={loading}
                />
              </div>
              <button
                type='submit'
                disabled={loading}
                className='inline-flex justify-center w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
              >
                Generate
              </button>
            </form>
          </div>
          <div className='px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse'>
            <button
              type='button'
              className='inline-flex justify-center w-full px-4 py-2 mt-3 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm'
              onClick={() => toggleModal('generation')}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default GenerationModal
