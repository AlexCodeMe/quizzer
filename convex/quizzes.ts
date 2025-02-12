import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const getQuiz = query({
  args: { _id: v.id('quizzes') },
  handler: async (ctx, args) => {
    return ctx.db.get(args._id)
  },
})

export const getQuizzes = query({
  args: {
    search: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    let queryBuilder = ctx.db.query('quizzes')

    if (args.search) {
      queryBuilder = queryBuilder.filter((q) =>
        q.eq(q.field('name'), args.search)
      )
    }

    return await queryBuilder.collect()
  },
})

export const getQuizWithQuestionsAndCreator = query({
  args: { _id: v.id('quizzes') },
  handler: async (ctx, args) => {
    const quiz = await ctx.db.get(args._id)

    if (!quiz) {
      throw new Error('quiz with id ' + args._id + ' not found')
    }

    // Get the user who created the quiz
    const creator = await ctx.db.get(quiz.createdBy)

    const quizQuestions = await ctx.db
      .query('quizQuestions')
      .withIndex('by_quiz', (q) => q.eq('quizId', args._id))
      .collect()
    console.log('quizQuestions:', quizQuestions)
    quizQuestions.sort((a, b) => a.order - b.order)

    const questions = await Promise.all(
      quizQuestions.map((qq) => ctx.db.get(qq.questionId))
    )

    return { ...quiz, creator, questions }
  },
})

export const getQuizWithQuestions = query({
  args: { _id: v.id('quizzes') },
  handler: async (ctx, args) => {
    const quiz = await ctx.db.get(args._id)
    if (!quiz) {
      throw new Error('quiz with id ' + args._id + ' not found')
    }

    const quizQuestions = await ctx.db
      .query('quizQuestions')
      .withIndex('by_quiz', (q) => q.eq('quizId', args._id))
      .collect()

    quizQuestions.sort((a, b) => a.order - b.order)

    const questionsPromises = quizQuestions.map((qq) =>
      ctx.db.get(qq.questionId)
    )

    const questionResults = await Promise.all(questionsPromises)

    const questions = questionResults.filter(
      (q): q is NonNullable<typeof q> => q !== null
    )

    return { ...quiz, questions }
  },
})

export const createQuiz = mutation({
  args: {
    name: v.string(),
    description: v.string(),
    topic: v.string(),
    questionIds: v.array(v.id('questions')),
  },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error('Not authorized')
    }

    const user = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('clerkId'), identity.subject))
      .first()

    if (!user) {
      throw new Error('User not found')
    }

    const quiz = await ctx.db.insert('quizzes', {
      name: args.name,
      description: args.description,
      topic: args.topic,
      updatedAt: Date.now(),
      createdBy: user._id,
    })

    await Promise.all(
      args.questionIds.map(async (questionId, idx) => {
        ctx.db.insert('quizQuestions', {
          quizId: quiz,
          questionId,
          order: idx,
        })
      })
    )

    // update userQuizzes table
    await ctx.db.insert('userQuizzes', {
      userId: user._id,
      quizId: quiz,
    })

    return quiz
  },
})

export const deleteQuiz = mutation({
  args: { _id: v.id('quizzes') },
  handler: async (ctx, args) => {
    const identity = await ctx.auth.getUserIdentity()
    if (!identity) {
      throw new Error('Not authorized')
    }

    await ctx.db.delete(args._id)
  },
})
