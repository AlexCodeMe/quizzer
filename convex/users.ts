import { v } from 'convex/values'
import { mutation, query } from './_generated/server'

export const syncUser = mutation({
  args: {
    clerkId: v.string(),
    email: v.optional(v.string()),
    picture: v.optional(v.string()),
    nickname: v.optional(v.string()),
    givenName: v.optional(v.string()),
    familyName: v.optional(v.string()),
    emailVerified: v.boolean(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('clerkId'), args.clerkId))
      .first()

    if (existingUser) return

    return await ctx.db.insert('users', {
      ...args,
    })
  },
})

export const getUser = query({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    return await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('clerkId'), args.clerkId))
      .first()
  },
})

export const deleteUser = mutation({
  args: {
    clerkId: v.string(),
  },
  handler: async (ctx, args) => {
    const existingUser = await ctx.db
      .query('users')
      .filter((q) => q.eq(q.field('clerkId'), args.clerkId))
      .first()

    if (!existingUser) {
      throw new Error('Failed to delete user. User not found')
    }

    return await ctx.db.delete(existingUser._id)
  },
})
