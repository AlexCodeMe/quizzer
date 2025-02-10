import Link from 'next/link'

// TODO: Landing Page
export default function Home() {
  return (
    <main className='min-h-screen flex flex-col items-center justify-center antialiased gap-y-6'>
      <h1 className='text-5xl font-bold tracking-widest text-zinc-800'>
        Welcome to Qui<span className='text-blue-600'>zz</span>er!
      </h1>
      <Link
        className='border-4 border-rose-500 bg-zinc-200 hover:bg-rose-200 text-zinc-800 px-6 py-2 rounded-full'
        href='/sign-up'
      >
        Get Started
      </Link>
    </main>
  )
}
