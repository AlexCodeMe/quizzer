import React from 'react'
import { useCreateQuiz } from '../hooks/use-create-quiz'

const BasicInfo = () => {
  const { quizState, updateQuizState } = useCreateQuiz()

  return (
    <div className='space-y-4'>
      <div>
        <label
          htmlFor='name'
          className='block text-sm font-medium text-gray-700'
        >
          Quiz Title
        </label>
        <input
          type='text'
          id='name'
          name='name'
          placeholder='Quiz Name'
          value={quizState.name}
          onChange={(e) => updateQuizState('name', e.target.value)}
          className='mt-1 px-4 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
        />
      </div>
      <div>
        <label
          htmlFor='description'
          className='block text-sm font-medium text-gray-700'
        >
          Description
        </label>
        <textarea
          id='description'
          name='description'
          rows={3}
          placeholder='Quiz Description'
          value={quizState.description}
          onChange={(e) => updateQuizState('description', e.target.value)}
          className='mt-1 px-4 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
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
          placeholder='Quiz Topic'
          id='topic'
          name='topic'
          value={quizState.topic}
          onChange={(e) => updateQuizState('topic', e.target.value)}
          className='mt-1 px-4 py-2 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50'
        />
      </div>
    </div>
  )
}

export default BasicInfo
