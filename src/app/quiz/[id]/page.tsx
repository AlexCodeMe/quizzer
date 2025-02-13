import { fetchQuery } from 'convex/nextjs'
import React from 'react'
import { api } from '../../../../convex/_generated/api'
import { Id } from '../../../../convex/_generated/dataModel'
import Link from 'next/link'

interface QuizDetailsPageProps {
  params: Promise<{ id: Id<'quizzes'> }>
}

const QuizDetailsPage = async ({ params }: QuizDetailsPageProps) => {
  const { id } = await params

  const quiz = await fetchQuery(api.quizzes.getQuizWithQuestionsAndCreator, {
    _id: id,
  })

  if (!quiz) {
    return <div className='text-center text-2xl mt-8'>Quiz not found</div>
  }

  console.log(quiz)

  const creator = quiz.creator?.nickname
    ? quiz.creator?.nickname
    : quiz.creator?.givenName && quiz.creator?.familyName
      ? quiz.creator?.givenName + ' ' + quiz.creator?.familyName
      : quiz.creator?.email
        ? quiz.creator?.email
        : quiz.creator?._id

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='mb-8'>
        <div className='flex items-center justify-between'>
          <div className=''>
            <h1 className='text-3xl font-bold mb-2'>{quiz.name}</h1>
            <p className='text-gray-600 mb-4'>{quiz.description}</p>
          </div>
          <div className='space-x-6'>
            <Link
              href={`/quiz/${id}/results`}
              className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50'
            >
              Your Results
            </Link>
            <Link
              href={`/quiz/${id}/take`}
              className='px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-opacity-50'
            >
              Take Quiz
            </Link>
          </div>
        </div>
        <div className='flex flex-wrap gap-4 text-sm'>
          <span className='bg-blue-100 text-blue-800 px-2 py-1 rounded'>
            Topic: {quiz.topic}
          </span>
          <span className='bg-green-100 text-green-800 px-2 py-1 rounded'>
            Created by: {creator}
          </span>
          <span className='bg-yellow-100 text-yellow-800 px-2 py-1 rounded'>
            Created on: {new Date(quiz._creationTime).toLocaleDateString()}
          </span>
        </div>
      </div>
      <div className='space-y-6'>
        {quiz.questions.map((q) => (
          <div key={q?._id} className='bg-white shadow-md rounded-lg p-6'>
            <h2 className='text-xl font-semibold mb-4'>
              {q?.question}
              {q?.question.endsWith('?') ? '' : '?'}
            </h2>
            {q?.type === 'multiple_choice' && q?.options && (
              <ul className='list-disc pl-6 mb-4'>
                {q?.options.map((option, i) => (
                  <li key={i} className='mb-2'>
                    {option}
                  </li>
                ))}
              </ul>
            )}
            <p className='ring-2 ring-emerald-500 px-4 py-2 rounded-full w-fit bg-emerald-50'>
              {q?.answer}
            </p>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuizDetailsPage
