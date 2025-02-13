import { useState, useMemo } from 'react'
import { useQuery } from 'convex/react'
import { BookOpen, Search } from 'lucide-react'
import { useCreateQuiz } from '../hooks/use-create-quiz'
import { api } from '../../../../convex/_generated/api'

function SelectionModal() {
  const { isSelectionModalOpen, addQuestionToQuiz, toggleModal } =
    useCreateQuiz()
  const [searchQuery, setSearchQuery] = useState('')

  const questionsData = useQuery(api.questions.getQuestions)

  const questions = useMemo(() => {
    return questionsData
      ? questionsData.filter(
          (question) =>
            question.question
              .toLowerCase()
              .includes(searchQuery.toLowerCase()) ||
            question.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
            question.explanation
              ?.toLowerCase()
              .includes(searchQuery.toLowerCase())
        )
      : []
  }, [questionsData, searchQuery])

  if (!isSelectionModalOpen) {
    return (
      <button
        className='px-4 py-2 text-sm bg-white border-2 border-yellow-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
        onClick={() => toggleModal('selection')}
      >
        <BookOpen className='size-4 text-indigo-600' />
      </button>
    )
  }

  if (!questionsData) {
    return (
      <div className='z-10 fixed inset-0 overflow-y-auto'>
        <div className='flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0'>
          <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
            <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
          </div>
          <span
            className='hidden sm:inline-block sm:align-middle sm:h-screen'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <div className='inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
            <div className='px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4'>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>
                Select Questions
              </h3>
              <div className='flex items-center justify-center h-[50vh]'>
                <div className='w-8 h-8 border-b-2 border-gray-900 rounded-full animate-spin'></div>
              </div>
            </div>
            <div className='px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse'>
              <button
                type='button'
                className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm'
                onClick={() => toggleModal('selection')}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (questions.length === 0) {
    return (
      <div className='z-10 fixed inset-0 overflow-y-auto'>
        <div className='flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0'>
          <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
            <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
          </div>
          <span
            className='hidden sm:inline-block sm:align-middle sm:h-screen'
            aria-hidden='true'
          >
            &#8203;
          </span>
          <div className='inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
            <div className='px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4'>
              <h3 className='text-lg font-medium leading-6 text-gray-900'>
                Select Questions
              </h3>
              <div className='flex items-center justify-center h-[50vh]'>
                <p className='text-gray-500'>No questions found</p>
              </div>
            </div>
            <div className='px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse'>
              <button
                type='button'
                className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm'
                onClick={() => toggleModal('selection')}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className='fixed inset-0 z-10 overflow-y-auto'>
      <div className='flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0'>
        <div className='fixed inset-0 transition-opacity' aria-hidden='true'>
          <div className='absolute inset-0 bg-gray-500 opacity-75'></div>
        </div>
        <span
          className='hidden sm:inline-block sm:align-middle sm:h-screen'
          aria-hidden='true'
        >
          &#8203;
        </span>
        <div className='inline-block overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full'>
          <div className='px-4 pt-5 pb-4 bg-white sm:p-6 sm:pb-4'>
            <h3 className='text-lg font-medium leading-6 text-gray-900'>
              Select Questions
            </h3>
            <div className='relative mt-4 mb-4'>
              <Search className='absolute left-2 top-2.5 h-4 w-4 text-gray-400' />
              <input
                type='text'
                placeholder='Search questions...'
                onChange={(e) => setSearchQuery(e.target.value)}
                className='w-full pl-8 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm'
              />
            </div>
            <div className='h-[50vh] overflow-auto pr-4'>
              <div className='flex flex-col gap-6'>
                {questions.map((question) => (
                  <div
                    key={question._id}
                    className='rounded-lg border bg-white p-4 shadow-sm'
                  >
                    <div className='flex flex-col gap-3'>
                      <div className='flex items-start justify-between'>
                        <div className='flex-1'>
                          <h3 className='font-medium leading-none tracking-tight'>
                            {question.question}
                          </h3>
                          <p className='mt-2 text-sm text-gray-500'>
                            Type: {question.type}
                          </p>
                        </div>
                      </div>
                      <button
                        onClick={() => {
                          console.log('Adding existing question:', question)
                          addQuestionToQuiz(question)
                        }}
                        className='self-end px-3 py-1 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'
                      >
                        Add to Quiz
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className='px-4 py-3 bg-gray-50 sm:px-6 sm:flex sm:flex-row-reverse'>
            <button
              type='button'
              className='w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:ml-3 sm:w-auto sm:text-sm'
              onClick={() => toggleModal('selection')}
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelectionModal
