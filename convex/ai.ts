// todo: real time short_answer grades

import OpenAI from 'openai'
import { v } from 'convex/values'
import { action } from './_generated/server'
import { Question } from './schema'

export const generate = action({
  args: {
    description: v.string(),
    topic: v.string(),
    type: v.union(
      v.literal('multiple_choice'),
      v.literal('true_false'),
      v.literal('fill_in_the_blank'),
      v.literal('short_answer')
    ),
    numberOfQuestions: v.number(),
  },
  handler: async (ctx, args): Promise<Question[]> => {
    console.log('Sending request to OpenAI:', { args })
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      throw new Error('openapi api key not configured')
    }

    const openai = new OpenAI({
      apiKey: apiKey,
    })

    try {
      const completion = await openai.chat.completions.create({
        model: 'gpt-4o-mini',
        messages: [
          {
            role: 'system',
            content: `
                You are a helpful assistant that generates quiz questions based on the topic {topic}
                    and description ${args.description}. The quiz should be composed of ${args.numberOfQuestions}
                    questions with the type ${args.type} questions on the topic ${args.topic}.
                    Please include the following for each question:
                    1. the Question
                    2. the Answer
                    3. the Explanation
                    4. if the question type is MULTIPLE_CHOICE, include the Options.
                    if the question type is FILL_IN_THE_BLANK, include the blank to fill in.
                    For SHORT_ANSWER, provide a generic sample answer.
                    Multiple choice questions should have between 3 to 8 options.

                    Example Output:
                    {
                        "questions": [
                            {
                                "question": "Which bird migrates the longest distance?",
                                "options": ["A) Arctic Tern", "B) Swallow", "C) Osprey", "D) Albatross"],
                                "answer": "A) Arctic Tern",
                                "explanation": "The Arctic Tern migrates the longest distance, traveling from pole to pole."
                            },
                            ...
                        ]
                    }

                    You must return the output in the exact JSON format specified above.
                   `,
          },
          {
            role: 'user',
            content: `Generate ${args.numberOfQuestions} questions of type ${args.type} based on the topic "${args.topic}".`,
          },
        ],
        store: true,
        response_format: { type: 'json_object' },
      })

      const response = completion.choices[0].message.content
      if (!response) {
        throw new Error('no response from openai')
      }

      const parsedResponse =
        typeof response === 'string' ? JSON.parse(response) : response

      const questionsArray = parsedResponse.questions || parsedResponse

      if (!Array.isArray(questionsArray)) {
        throw new Error('Unexpected response format')
      }

      return questionsArray
    } catch (error) {
      console.error('openai api error', error)
      throw new Error('failed to generate questions')
    }
  },
})
