import { ReactNode } from 'react'

// todo: background image(s)
function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className='min-h-screen grid grid-cols-1 lg:grid-cols-2 items-center'>
      <div className='flex-1' />
      {children}
    </div>
  )
}

export default AuthLayout
