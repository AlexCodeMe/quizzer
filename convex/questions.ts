import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { questionValidator } from './schema'

export const createQuestions = mutation({
  args: { questions: v.array(questionValidator) },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error('Not authorized')
    }
    // todo: filter out questions that are already in convex

    const questionIds = await Promise.all(
      args.questions.map(async (question) => {

        return await ctx.db.insert('questions', question)
      })
    )

    return questionIds
  },
})

export const getQuestions = query({
  handler: async (ctx) => {
    return ctx.db.query('questions').collect()
  },
})

export const addQuestionsToQuiz = mutation({
  args: {
    questionIds: v.array(v.id('questions')),
    quizId: v.id('quizzes'),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error('Not authorized')
    }

    return await Promise.all(
      args.questionIds.map((questionId, idx) =>
        ctx.db.insert('quizQuestions', {
          quizId: args.quizId,
          questionId,
          order: idx,
        })
      )
    )
  },
})
