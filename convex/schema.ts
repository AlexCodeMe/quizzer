import { defineSchema, defineTable } from 'convex/server'
import { Infer, v } from 'convex/values'

export const userFields = {
  clerkId: v.string(),
  email: v.optional(v.string()),
  picture: v.optional(v.string()),
  nickname: v.optional(v.string()),
  givenName: v.optional(v.string()),
  familyName: v.optional(v.string()),
  emailVerified: v.boolean(),
}

export const quizFields = {
  name: v.string(),
  description: v.string(),
  topic: v.string(),
  createdBy: v.id('users'),
  updatedAt: v.number(),
}

export const questionFields = {
  question: v.string(),
  answer: v.string(),
  type: v.union(
    v.literal('multiple_choice'),
    v.literal('true_false'),
    v.literal('fill_in_the_blank'),
    v.literal('short_answer')
  ),
  options: v.optional(v.array(v.string())),
  explanation: v.optional(v.string()),
}

export const resultsFields = {
  score: v.number(),
  details: v.record(v.id('questions'), v.union(v.boolean(), v.string())),
  userId: v.id('users'),
  quizId: v.id('quizzes'),
  completedAt: v.number(),
}

export const userValidator = v.object(userFields)
export type User = Infer<typeof userValidator>

export const quizValidator = v.object(quizFields)
export type Quiz = Infer<typeof quizValidator>

export const questionValidator = v.object(questionFields)
export type Question = Infer<typeof questionValidator>

export const resultValidator = v.object(resultsFields)
export type Result = Infer<typeof resultValidator>

export default defineSchema({
  users: defineTable(userFields).index('by_clerk_id', ['clerkId']),

  quizzes: defineTable(quizFields),

  questions: defineTable(questionFields),

  results: defineTable(resultsFields)
    .index('by_user', ['userId'])
    .index('by_quiz', ['quizId'])
    .index('by_user_and_quiz', ['userId', 'quizId']),

  // many to many users : quizzes
  userQuizzes: defineTable({
    userId: v.id('users'),
    quizId: v.id('quizzes'),
  })
    .index('by_user', ['userId'])
    .index('by_quiz', ['quizId']),

  // many to many quizs : questions
  quizQuestions: defineTable({
    quizId: v.id('quizzes'),
    questionId: v.id('questions'),
    order: v.number(),
  })
    .index('by_quiz', ['quizId'])
    .index('by_question', ['questionId']),
})
