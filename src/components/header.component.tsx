import { useRouter } from 'next/router'
import Image from 'next/image'

import Logo from '../../public/vercel.svg'
import { Avatar } from './avatar.component'
import { Search } from './search.component'

export const Header = () => {
  const router = useRouter()

  return (
    <header className='flex flex-none justify-between items-center h-12 md:h-16 bg-white px-6'>
      <Image
        className='w-16 md:w-auto h-8 md:h-10 cursor-pointer'
        src={Logo}
        alt='JB'
        onClick={() => router.push('/')}
      />
      <div className='flex items-center'>
        <Search />
        <Avatar />
      </div>
    </header>
  )
}
