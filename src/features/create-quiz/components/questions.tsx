import React, { useState } from 'react'
import { Question } from '../../../../convex/schema'
import { useCreateQuiz } from '../hooks/use-create-quiz'
import GenerationModal from './generation-modal'
import SelectionModal from './selection-modal'

const Questions = () => {
  const [questionState, setQuestionState] = useState<Question>({
    question: '',
    answer: '',
    type: 'multiple_choice',
    options: ['', '', '', ''],
    explanation: '',
  })

  const { addQuestionToQuiz } = useCreateQuiz()

  const handleOptionChange = (index: number, value: string) => {
    setQuestionState((prev) => {
      const options = [...prev.options!]
      options[index] = value
      return { ...prev, options }
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    addQuestionToQuiz(questionState)
    setQuestionState({
      question: '',
      answer: '',
      type: 'multiple_choice',
      options: ['', '', '', ''],
      explanation: '',
    })
  }

  return (
    <div className='space-y-4'>
      <div className='flex items-center justify-between gap-x-6'>
        <h2 className='text-xl font-semibold'>Create a Question</h2>
        <div className='space-x-4'>
          <GenerationModal />
          <SelectionModal />
        </div>
      </div>
      <form onSubmit={handleSubmit} className='space-y-4'>
        <div className='flex flex-col space-y-2'>
          <label
            className='block text-sm font-medium text-gray-700'
            htmlFor='question'
          >
            Question
          </label>
          <input
            type='text'
            id='question'
            name='question'
            placeholder='Your question...'
            value={questionState.question}
            onChange={(e) =>
              setQuestionState((prev) => ({
                ...prev,
                question: e.target.value,
              }))
            }
            className='mt-1 px-4 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
          />
        </div>
        <div className='flex items-center justify-between'>
          <label
            className='block text-sm font-medium text-gray-700'
            htmlFor='question-type'
          >
            Question Type:
          </label>
          <select
            name='type'
            id='question-type'
            onChange={(e) =>
              setQuestionState((prev) => ({
                ...prev,
                type: e.target.value as Question['type'],
                options:
                  e.target.value === 'multiple_choice' ? ['', '', '', ''] : [],
              }))
            }
          >
            <option value='' disabled>
              ---Please choose a selection type---
            </option>
            <option value='multiple_choice'>Multiple Choice</option>
            <option value='true_false'>True/False</option>
            <option value='short_answer'>Short Answer</option>
            <option value='fill_in_the_blank'>Fill in the Blank</option>
          </select>
        </div>
        {questionState.type === 'multiple_choice' && (
          <div className=''>
            <label className='block text-sm font-medium text-gray-700'>
              Options
            </label>
            <div className='grid grid-cols-2 gap-4'>
              {questionState.options?.map((option, index) => (
                <div key={index}>
                  <input
                    type='text'
                    placeholder={`Option ${index + 1}`}
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    className='w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                  />
                </div>
              ))}
            </div>
          </div>
        )}
        {questionState.type === 'true_false' ? (
          <div className='space-y-2'>
            <label className='block text-sm font-medium text-gray-700'>
              Select Answer
            </label>
            <div className='space-y-2'>
              <div className='flex items-center'>
                <input
                  type='radio'
                  id='true'
                  name='true-false'
                  value='true'
                  checked={questionState.answer === 'true'}
                  onChange={(e) =>
                    setQuestionState((prev) => ({
                      ...prev,
                      answer: e.target.value,
                    }))
                  }
                  className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300'
                />
                <label
                  htmlFor='true'
                  className='ml-2 block text-sm text-gray-700'
                >
                  True
                </label>
              </div>
              <div className='flex items-center'>
                <input
                  type='radio'
                  id='false'
                  name='true-false'
                  value='false'
                  checked={questionState.answer === 'false'}
                  onChange={(e) =>
                    setQuestionState((prev) => ({
                      ...prev,
                      answer: e.target.value,
                    }))
                  }
                  className='h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300'
                />
                <label
                  htmlFor='false'
                  className='ml-2 block text-sm text-gray-700'
                >
                  False
                </label>
              </div>
            </div>
          </div>
        ) : (
          <div className='flex flex-col space-y-2'>
            <label
              className='block text-sm font-medium text-gray-700'
              htmlFor='answer'
            >
              {questionState.type !== 'short_answer'
                ? 'Answer'
                : 'Example Response'}
            </label>
            <input
              type='text'
              id='answer'
              name='answer'
              placeholder={
                questionState.type !== 'short_answer'
                  ? 'Answer'
                  : 'Example Response'
              }
              value={questionState.answer}
              onChange={(e) =>
                setQuestionState((prev) => ({
                  ...prev,
                  answer: e.target.value,
                }))
              }
              className='mt-1 px-4 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
            />
          </div>
        )}

        <div className='flex flex-col space-y-2'>
          <label
            htmlFor='explanation'
            className='block text-sm font-medium text-gray-700'
          >
            Explanation (Optional)
          </label>
          <textarea
            name='explanation'
            id='explanation'
            placeholder='question explanation...'
            value={questionState.explanation}
            onChange={(e) =>
              setQuestionState((prev) => ({
                ...prev,
                explanation: e.target.value,
              }))
            }
            className='mt-1 px-4 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
          ></textarea>
        </div>
        <div className='flex justify-end'>
          <button
            type='submit'
            className='inline-flex justify-center rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 transition-colors'
          >
            Add Question
          </button>
        </div>
      </form>
    </div>
  )
}

export default Questions
