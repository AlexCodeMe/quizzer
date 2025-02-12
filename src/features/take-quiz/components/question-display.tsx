import { useState } from 'react'
import { Question } from '../../../../convex/schema'

interface QuestionDisplayProps {
  question: Question
  onAnswer: (answer: string) => void
}

const QuestionDisplay = ({ question, onAnswer }: QuestionDisplayProps) => {
  const [selectedAnswer, setSelectedAnswer] = useState<string>('')
  const [shortAnswer, setShortAnswer] = useState<string>('')

  const handleSubmit = () => {
    if (
      question.type === 'short_answer' ||
      question.type === 'fill_in_the_blank'
    ) {
      onAnswer(shortAnswer)
    } else {
      onAnswer(selectedAnswer)
    }
  }

  return (
    <div className='space-y-4'>
      <h2 className='text-xl font-semibold mb-4'>{question.question}</h2>
      {question.type === 'multiple_choice' && (
        <div className='space-y-2'>
          {question.options?.map((opt, idx) => (
            <div key={idx} className='flex items-center space-x-2'>
              <input
                type='radio'
                id={`option-${idx}`}
                name='multiple-choice'
                value={opt}
                checked={selectedAnswer === opt}
                onChange={(e) => setSelectedAnswer(e.target.value)}
                className='form-radio h-4 w-4 text-blue-600'
              />
              <label htmlFor={`option-${idx}`} className='text-sm'>
                {opt}
              </label>
            </div>
          ))}
        </div>
      )}

      {question.type === 'true_false' && (
        <div className='space-y-2'>
          <div className='flex items-center space-x-2'>
            <input
              type='radio'
              id='true'
              name='true-false'
              value='true'
              checked={selectedAnswer === 'true'}
              onChange={(e) => setSelectedAnswer(e.target.value)}
              className='form-radio h-4 w-4 text-blue-600'
            />
            <label htmlFor='true' className='text-sm'>
              True
            </label>
          </div>
          <div className='flex items-center space-x-2'>
            <input
              type='radio'
              id='false'
              name='true-false'
              value='false'
              checked={selectedAnswer === 'false'}
              onChange={(e) => setSelectedAnswer(e.target.value)}
              className='form-radio h-4 w-4 text-blue-600'
            />
            <label htmlFor='false' className='text-sm'>
              False
            </label>
          </div>
        </div>
      )}

      {(question.type === 'short_answer' ||
        question.type === 'fill_in_the_blank') && (
        <input
          type='text'
          value={shortAnswer}
          onChange={(e) => setShortAnswer(e.target.value)}
          placeholder='Type your answer here'
          className='w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500'
        />
      )}

      <button
        onClick={handleSubmit}
        disabled={!selectedAnswer && !shortAnswer}
        className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed'
      >
        Submit Answer
      </button>
    </div>
  )
}

export default QuestionDisplay
