import { FC, ReactNode } from 'react'
import useSWR from 'swr'

import { verify, path } from '@/shared/services/auth.service'
import { Header } from '@/components/header.component'
import { useUserStore } from '@/stores/user.store'

export const BasicLayout: FC<{ children: ReactNode }> = ({ children }) => {
  const login = useUserStore((state) => state.login)
  useSWR(path.verify, async () => {
    const { data } = await verify()
    if (data) {
      login(data, window.localStorage.getItem('token') || '')
    }
    return data
  })

  return (
    <div className='flex flex-col w-full h-full bg-base-200'>
      <Header></Header>
      <main className='flex-grow overflow-auto'>{children}</main>
    </div>
  )
}
