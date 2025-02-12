'use client'

import { useRef, useState } from 'react'
import QuestionDisplay from './question-display'
import { useRouter } from 'next/navigation'
import { Doc } from '../../../../convex/_generated/dataModel'
import { toast } from 'sonner'
import { api } from '../../../../convex/_generated/api'
import { useMutation } from 'convex/react'

interface TakeQuizProps {
  quiz: Doc<'quizzes'> & { questions: Doc<'questions'>[] }
}

const TakeQuiz = ({ quiz }: TakeQuizProps) => {
  const router = useRouter()

  const submit = useMutation(api.results.makeResult)

  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState<string[]>([])
  const [loading, setLoading] = useState(false)

  const submission = useRef<{ [key: string]: string }>({})

  const handleAnswer = async (answer: string) => {
    setAnswers([...answers, answer])

    submission.current[quiz.questions[currentIndex]._id] = answer

    if (currentIndex < quiz.questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      setLoading(true)
      try {
        const result = await submit({
          quizId: quiz._id,
          submission: submission.current,
        })

        if (!result) {
          throw new Error('failed to submit quiz')
        }

        toast.success('Quiz submitted successfully')
        router.push(`/results/${result._id}`)
      } catch (error) {
        console.error(error)
        toast.error('failed to submit quiz')
      } finally {
        setLoading(false)
      }
    }
  }

  const currentQuestion = quiz.questions[currentIndex]
  console.log('take-quiz.tsx: currentQuestion', currentQuestion)
  if (!currentQuestion) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='text-2xl'>No question found</div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className='flex justify-center items-center h-screen'>
        <div className='animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-gray-900'></div>
      </div>
    )
  }

  return (
    <div className='bg-white shadow-md rounded-lg p-6'>
      <div className='mb-4'>
        Question {currentIndex + 1} of {quiz.questions.length}
      </div>
      <QuestionDisplay question={currentQuestion} onAnswer={handleAnswer} />
    </div>
  )
}

export default TakeQuiz
