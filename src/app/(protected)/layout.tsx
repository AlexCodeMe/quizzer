import { UserButton } from '@clerk/nextjs'
import { ReactNode } from 'react'

function ProtectedLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      <UserButton />
      {children}
    </div>
  )
}

export default ProtectedLayout
