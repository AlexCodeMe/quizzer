'use client'

import { Search } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React, { FormEvent, useState } from 'react'

const SearchInput = () => {
  const router = useRouter()

  const [searchTerm, setSearchTerm] = useState('')

  const handleSearch = (e: FormEvent) => {
    e.preventDefault()

    router.push(`?search=${encodeURIComponent(searchTerm)}`)
  }

  return (
    <form
      onSubmit={handleSearch}
      className='flex justify-center items-center space-x-2 mb-4 relative'
    >
      <button type='submit'>
        <Search className='h-6 w-6 absolute left-4' />
      </button>
      <input
        type='text'
        placeholder='Search quizzes...'
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className='pl-10 flex-grow'
      />
    </form>
  )
}

export default SearchInput
