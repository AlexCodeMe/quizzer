import { defineSchema, defineTable } from 'convex/server'
import { v } from 'convex/values'

export default defineSchema({
  users: defineTable({
    clerkId: v.string(),
    email: v.optional(v.string()),
    picture: v.optional(v.string()),
    nickname: v.optional(v.string()),
    givenName: v.optional(v.string()),
    familyName: v.optional(v.string()),
    emailVerified: v.boolean(),
  }).index('by_clerk_id', ['clerkId']),

  quizzes: defineTable({
    name: v.string(),
    description: v.string(),
    topic: v.string(),
    createdBy: v.id('users'),
    updatedAt: v.number(),
  }).index('by_created_by', ['createdBy']),

  questions: defineTable({
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
  }).index('by_type', ['type']),

  results: defineTable({
    score: v.number(),
    details: v.record(v.id('questions'), v.union(v.boolean(), v.string())),
    userId: v.id('users'),
    quizId: v.id('quizzes'),
  })
    .index('by_user', ['userId'])
    .index('by_quiz', ['quizId'])
    .index('by_user_and_quiz', ['userId', 'quizId']),

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
