'use client'

import { create } from 'zustand'
import { Question } from '../../../../convex/schema'
import { Doc } from '../../../../convex/_generated/dataModel'

type CreateQuizStore = {
  quizState: {
    name: string
    description: string
    topic: string
    questions: (Question | Doc<'questions'>)[]
  }
  isSelectionModalOpen: boolean
  isGenerateModalOpen: boolean
  isCreateModalOpen: boolean
  updateQuizState: <K extends keyof CreateQuizStore['quizState']>(
    field: K,
    value: CreateQuizStore['quizState'][K]
  ) => void
  addQuestionToQuiz: (question: Question) => void
  removeQuestionFromQuiz: (question: Question) => void
  clearQuestionsFromQuiz: () => void
  resetQuizState: () => void
  addGeneratedQuestions: (questions: Question[]) => void
  toggleModal: (modal: 'selection' | 'generation' | 'creation') => void
}

const LOCAL_STORAGE_KEY = 'quizState'

const loadQuizState = () => {
  if (typeof window !== 'undefined') {
    const state = localStorage.getItem(LOCAL_STORAGE_KEY)
    return state ? JSON.parse(state) : null
  }
  return null
}

export const useCreateQuizStore = create<CreateQuizStore>((set) => ({
  quizState: loadQuizState() || {
    name: '',
    description: '',
    topic: '',
    questions: [],
  },
  isSelectionModalOpen: false,
  isGenerateModalOpen: false,
  isCreateModalOpen: false,

  updateQuizState: (field, value) => {
    set((state) => {
      const newState = {
        quizState: {
          ...state.quizState,
          [field]: value,
        },
      }
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(newState.quizState)
      )
      return newState
    })
  },

  addQuestionToQuiz: (question: Question) => {
    set((state) => {
      const newQuestions = [...state.quizState.questions, question]
      const newState = {
        quizState: {
          ...state.quizState,
          questions: newQuestions,
        },
      }
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(newState.quizState)
      )
      return newState
    })
  },

  removeQuestionFromQuiz: (questionToRemove: Question) => {
    set((state) => {
      const newQuestions = state.quizState.questions.filter(
        (question) =>
          question.question !== questionToRemove.question ||
          question.answer !== questionToRemove.answer
      )
      const newState = {
        quizState: {
          ...state.quizState,
          questions: newQuestions,
        },
      }
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(newState.quizState)
      )
      return newState
    })
  },

  clearQuestionsFromQuiz: () => {
    set((state) => {
      const newState = {
        quizState: { ...state.quizState, questions: [] },
      }
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(newState.quizState)
      )
      return newState
    })
  },

  resetQuizState: () => {
    set(() => {
      const resetState = {
        quizState: {
          name: '',
          description: '',
          topic: '',
          questions: [],
        },
      }
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(resetState.quizState)
      )
      return resetState
    })
  },

  addGeneratedQuestions: (questions: Question[]) => {
    set((state) => {
      const newQuestions = [...state.quizState.questions, ...questions]
      const newState = {
        quizState: {
          ...state.quizState,
          questions: newQuestions,
        },
      }
      localStorage.setItem(
        LOCAL_STORAGE_KEY,
        JSON.stringify(newState.quizState)
      )
      return newState
    })
  },

  toggleModal: (modal) => {
    set((state) => {
      const updates: Partial<CreateQuizStore> = { ...state }
      switch (modal) {
        case 'selection':
          updates.isSelectionModalOpen = !state.isSelectionModalOpen
          break
        case 'generation':
          updates.isGenerateModalOpen = !state.isGenerateModalOpen
          break
        case 'creation':
          updates.isCreateModalOpen = !state.isCreateModalOpen
          break
      }

      return updates
    })
  },
}))
