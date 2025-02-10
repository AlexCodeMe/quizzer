import { useAction, useMutation } from 'convex/react'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { api } from '../../../../convex/_generated/api'
import { useCreateQuizStore } from '../store/create-quiz-store'
import { Question } from '../../../../convex/schema'

export const useCreateQuiz = () => {
  const router = useRouter()

  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const createQuiz = useMutation(api.quizzes.createQuiz)
  const createQuestions = useMutation(api.questions.createQuestions)
  const generate = useAction(api.ai.generate)
  const addQuestionsToQuiz = useMutation(api.questions.addQuestionsToQuiz)

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
      const questionIds = await createQuestions({
        questions: quizState.questions,
      })
      const quizId = await createQuiz({
        name: quizState.name,
        description: quizState.description,
        topic: quizState.topic,
        questionIds,
      })

      await addQuestionsToQuiz({
        questionIds,
        quizId,
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
