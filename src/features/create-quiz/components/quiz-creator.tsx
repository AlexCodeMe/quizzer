'use client'

import { useState } from 'react'
import BasicInfo from './basic-info'
import Questions from './questions'
import Review from './review'
import Preview from './preview'
import { useCreateQuiz } from '../hooks/use-create-quiz'

const steps = [
  { title: 'Basic Info', component: BasicInfo },
  { title: 'Questions', component: Questions },
  { title: 'Review', component: Review },
]

const QuizCreator = () => {
  const [currentStep, setCurrentStep] = useState(0)
  const CurrentStep = steps[currentStep].component

  const { createQuiz } = useCreateQuiz()

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handlePrevious = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1)
    }
  }

  return (
    <div className='w-full grid grid-cols-1 md:grid-cols-2 mx-auto bg-white shadow-md rounded-lg overflow-hidden'>
      <div className='p-6'>
        <h1 className='text-3xl font-bold mb-6 text-center text-gray-800'>
          Create Quiz
        </h1>
        <div className='mb-8'>
          <div className='flex justify-between mb-2'>
            {steps.map((step, index) => (
              <div
                key={index}
                className={`text-sm font-medium ${index <= currentStep ? 'text-blue-600' : 'text-gray-400'}`}
              >
                {step.title}
              </div>
            ))}
          </div>
          <div className='h-2 bg-gray-200 rounded-full'>
            <div
              className='h-full bg-blue-600 rounded-full transition-all duration-300 ease-in-out'
              style={{
                width: `${((currentStep + 1) / steps.length) * 100}%`,
              }}
            />
          </div>
        </div>
        <CurrentStep />
        <div className='mt-8 flex justify-between'>
          <button
            onClick={handlePrevious}
            disabled={currentStep <= 0}
            className='px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50'
          >
            Previous
          </button>

          {currentStep === steps.length - 1 ? (
            <button
              onClick={createQuiz}
              className='px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50'
            >
              Submit Quiz
            </button>
          ) : (
            <button
              onClick={handleNext}
              disabled={currentStep >= steps.length - 1}
              className='px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50'
            >
              Next
            </button>
          )}
        </div>
      </div>
      {/** review */}
      <div className='p-6'>
        <Preview />
      </div>
    </div>
  )
}

export default QuizCreator
