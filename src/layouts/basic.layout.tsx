import { FC, ReactNode } from 'react'

import { Header } from '@/components/header.component'

export const BasicLayout: FC<{ children: ReactNode }> = ({ children }) => {
  return (
    <div className='flex flex-col w-full h-full bg-gray-100'>
      <Header></Header>
      <main className='flex-grow overflow-hidden'>{children}</main>
    </div>
  )
}
