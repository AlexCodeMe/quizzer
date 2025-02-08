import Link from 'next/link'

// TODO: Landing Page
export default function Home() {
  return (
    <main className='min-h-screen flex flex-col items-center justify-center antialiased gap-y-6'>
      <h1 className='text-4xl text-rose-300'>Welcome to Quizzer!</h1>
      <Link
        className='border-2 border-yellow-100 px-6 py-2 rounded-full'
        href='/sign-up'
      >
        Get Started
      </Link>
    </main>
  )
}
