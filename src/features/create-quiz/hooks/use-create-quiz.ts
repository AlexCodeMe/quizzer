import { useAction, useMutation } from 'convex/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { api } from '../../../../convex/_generated/api'
import { useCreateQuizStore } from '../store/create-quiz-store'
import { Question } from '../../../../convex/schema'
import { Doc } from '../../../../convex/_generated/dataModel'

export const useCreateQuiz = () => {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createQuiz = useMutation(api.quizzes.createQuiz)
  const createQuestions = useMutation(api.questions.createQuestions)
  const generate = useAction(api.ai.generate)

  const store = useCreateQuizStore()

  const handleGenerate = async (
    description: string,
    topic: string,
    type: Question['type'],
    numberOfQuestions: number
  ) => {
    setLoading(true)
    setError(null)
    try {
      return await generate({
        description,
        topic,
        type,
        numberOfQuestions,
      })
    } catch (error) {
      setError(
        error instanceof Error ? error.message : 'Failed to generate questions'
      )
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async () => {
    setLoading(true)
    setError(null)
    try {
      const quizState = store.quizState
      console.log(
        'Quiz state questions:',
        JSON.stringify(quizState.questions, null, 2)
      )

      const filteredQuestions = quizState.questions.filter(
        (q) => !('_id' in q) && !('_creationTime' in q)
      )

      const existingQuestionIds = quizState.questions
        .filter((q): q is Doc<'questions'> => '_id' in q)
        .map((q) => q._id)

      const questionIds = await createQuestions({
        questions: filteredQuestions,
      })

      const quizId = await createQuiz({
        name: quizState.name,
        description: quizState.description,
        topic: quizState.topic,
        questionIds: [...existingQuestionIds, ...questionIds],
      })

      store.resetQuizState()
      router.push(`/quiz/${quizId}`)
    } catch (error) {
      setError(error instanceof Error ? error.message : 'failed to create quiz')
    } finally {
      setLoading(false)
    }
  }

  return {
    ...store,
    loading,
    error,
    generateQuestions: handleGenerate,
    createQuiz: handleCreate,
  }
}
