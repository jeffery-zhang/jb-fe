import { useRouter } from 'next/router'
import { FC } from 'react'
import { Bars4Icon } from '@heroicons/react/24/outline'

import { useSettingsStore } from '@/shared/stores/settings.store'
import { Search } from './search.component'
import { Logo } from './logo.component'
import { UserMenu } from './user.component'

export const Header: FC = () => {
  const router = useRouter()
  const showDrawer = useSettingsStore((state) => state.show)

  return (
    <header className='navbar justify-between bg-base-100 shadow-2xl'>
      <Logo onClick={() => router.push('/')} />
      <div className='flex items-center flex-none gap-3'>
        <Search />
        <UserMenu className='hidden lg:block' />
        <div className='block lg:hidden w-8 md:w-10' onClick={showDrawer}>
          <Bars4Icon />
        </div>
      </div>
    </header>
  )
}
