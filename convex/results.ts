import { v } from 'convex/values'
import { mutation, query } from './_generated/server'
import { Id } from './_generated/dataModel'

// todo: quiz/[id]/results/page.tsx needs quiz details and the user's results
// todo: results/[resultId]/page.tsx needs the result details, quiz details included who created the quiz
// todo: results/page.tsx needs all the results for the user

export const makeResult = mutation({
  args: {
    quizId: v.id('quizzes'),
    submission: v.record(v.id('questions'), v.string()),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error('user required to generate result')
    }

    const user = await ctx.db
      .query('users')
      .withIndex('by_clerk_id', (q) => q.eq('clerkId', identity.subject))
      .first()

    if (!user) {
      throw new Error('user not found')
    }
    // details
    const details: Record<Id<'questions'>, boolean | string> = {}
    for (const [questionId, answer] of Object.entries(args.submission)) {
      const castedQuestionId = questionId as unknown as Id<'questions'>

      const question = await ctx.db.get(castedQuestionId)
      if (!question) {
        throw new Error('failed to find question')
      }

      if (
        question.type === 'multiple_choice' ||
        question.type === 'true_false' ||
        question.type === 'fill_in_the_blank'
      ) {
        details[castedQuestionId] = question.answer === answer
      } else if (question.type === 'short_answer') {
        // todo: ai check
        details[castedQuestionId] = question.answer === answer
      } else {
        throw new Error('invalid question type')
      }
    }
    // score
    const score = Object.values(details).filter(Boolean).length
    // userId
    // quizId
    const result = await ctx.db.insert('results', {
      score,
      details,
      userId: user._id,
      quizId: args.quizId,
      completedAt: Date.now(),
    })

    return ctx.db.get(result)
  },
})

export const getResult = query({
  args: { _id: v.id('results') },
  handler: async (ctx, args) => {
    const result = await ctx.db.get(args._id)
    if (!result) {
      throw new Error('result not found')
    }

    const quiz = await ctx.db.get(result.quizId)

    if (!quiz) {
      throw new Error('quiz not found')
    }

    const questions = await ctx.db
      .query('quizQuestions')
      .withIndex('by_quiz', (q) => q.eq('quizId', result.quizId))
      .collect()

    return { result, quiz, questions }
  },
})

export const getResultsByUser = query({
  handler: async (ctx) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error('user required to generate result')
    }

    const user = await ctx.db
      .query('users')
      .withIndex('by_clerk_id', (q) => q.eq('clerkId', identity.subject))
      .first()

    if (!user) {
      throw new Error('user not found')
    }

    const results = await ctx.db
      .query('results')
      .withIndex('by_user', (q) => q.eq('userId', user._id))
      .collect()

    const resultsWithQuiz = await Promise.all(
      results.map(async (result) => {
        const quiz = await ctx.db.get(result.quizId)
        return {
          ...result,
          quiz,
        }
      })
    )

    return { resultsWithQuiz, user }
  },
})

export const getResultsByQuiz = query({
  args: { quizId: v.id('quizzes') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error('user required to generate result')
    }

    const user = await ctx.db
      .query('users')
      .withIndex('by_clerk_id', (q) => q.eq('clerkId', identity.subject))
      .first()

    if (!user) {
      throw new Error('user not found')
    }

    const results = await ctx.db
      .query('results')
      .withIndex('by_quiz', (q) => q.eq('quizId', args.quizId))
      .collect()

    return results.filter((result) => result.userId === user._id)
  },
})
