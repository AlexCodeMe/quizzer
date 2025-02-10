'use client'

import { useAuth, UserButton } from '@clerk/nextjs'
import { BookOpen, Menu, Plus, UserIcon, X } from 'lucide-react'
import Link from 'next/link'
import { useState } from 'react'

function Navbar() {
  const { isSignedIn } = useAuth()

  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className='relative'>
      <nav className='sticky p-4 pr-8 flex justify-between items-center bg-white top-0 w-full h-16 z-50 border-b'>
        <Link href='/' className='flex items-center gap-2'>
          <h1 className='text-xl tracking-widest'>
            Qui<span className='text-blue-600 font-bold'>zz</span>er
          </h1>
        </Link>
        {/**Mobile Menu Btn */}
        <div className='md:hidden'>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)}>
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {isMenuOpen && (
          <div className='absolute top-16 right-4 w-48 bg-white rounded-lg shadow-lg border py-2 z-50'>
            <div className='flex flex-col'>
              {isSignedIn && (
                <>
                  <Link
                    href='/create'
                    className='flex items-center gap-2 px-4 py-2 hover:bg-gray-100'
                  >
                    <span className='text-blue-600'>
                      <Plus />
                    </span>
                    <span className='text-sm hover:underline'>Create</span>
                  </Link>
                  <Link
                    href='/results'
                    className='flex items-center gap-2 px-4 py-2 hover:bg-gray-100'
                  >
                    <span className='text-blue-600'>
                      <UserIcon />
                    </span>
                    <span className='text-sm hover:underline'>Results</span>
                  </Link>
                </>
              )}
              <Link
                href='/explore'
                className='flex items-center gap-2 px-4 py-2 hover:bg-gray-100'
              >
                <span className='text-blue-600'>
                  <BookOpen />
                </span>
                <span className='text-sm hover:underline'>Explore</span>
              </Link>
              <div className='flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100'>
                {isSignedIn ? (
                  <UserButton />
                ) : (
                  <Link href='/sign-in'>Sign in</Link>
                )}
              </div>
            </div>
          </div>
        )}

        <div className='hidden md:flex items-center gap-4'>
          {isSignedIn && (
            <>
              <Link
                href='/create'
                className='flex items-center gap-2 px-4 py-2 hover:bg-gray-100'
              >
                <span className='text-blue-600'>
                  <Plus />
                </span>
                <span className='text-sm hover:underline'>Create</span>
              </Link>
              <Link
                href='/results'
                className='flex items-center gap-2 px-4 py-2 hover:bg-gray-100'
              >
                <span className='text-blue-600'>
                  <UserIcon />
                </span>
                <span className='text-sm hover:underline'>Results</span>
              </Link>
            </>
          )}
          <Link
            href='/explore'
            className='flex items-center gap-2 px-4 py-2 hover:bg-gray-100'
          >
            <span className='text-blue-600'>
              <BookOpen />
            </span>
            <span className='text-sm hover:underline'>Explore</span>
          </Link>
          <div className='flex items-center gap-2 px-4 py-2 w-full text-left hover:bg-gray-100'>
            {isSignedIn ? <UserButton /> : <Link href='/sign-in'>Sign in</Link>}
          </div>
        </div>
      </nav>
    </div>
  )
}

export default Navbar
