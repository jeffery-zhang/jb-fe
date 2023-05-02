import { useRouter } from 'next/router'
import Image from 'next/image'
import { FC } from 'react'
import { shallow } from 'zustand/shallow'
import UserCircleIcon from '@heroicons/react/24/solid/UserCircleIcon'

import { useUserStore } from '@/stores/user.store'
import Doge from '../../public/doge.svg'

export const Header = () => {
  return (
    <header className='navbar bg-base-100'>
      <Logo className='flex-1' />
      <div className='flex items-center flex-none gap-3'>
        <SearchInput />
        <UserMenu />
      </div>
    </header>
  )
}
export const Logo: FC<{ className?: string }> = ({ className }) => {
  return (
    <div
      className={`font-great-vibes tracking-widest \
      ${className}`}
    >
      <span className='text-3xl md:text-4xl'>JB</span>
      <span className='text-base'>log</span>
    </div>
  )
}

export const SearchInput = () => {
  return (
    <div className='form-control'>
      <input
        type='text'
        placeholder='Search'
        className='input input-bordered input-primary input-sm md:input-md w-full'
      />
    </div>
  )
}

export const UserMenu = () => {
  const router = useRouter()
  const { user, isLogin } = useUserStore(
    (state) => ({
      user: state.user,
      isLogin: state.isLogin,
    }),
    shallow,
  )

  return (
    <div className='dropdown dropdown-end'>
      <label
        tabIndex={0}
        className='btn btn-ghost btn-circle btn-sm avatar w-8 md:w-10 h-8 md:h-10'
      >
        {isLogin ? (
          <div className='w-8 md:w-10 overflow-hidden rounded-full bg-primary'>
            <Image src={user?.avatar || Doge} alt={user?.username || ''} />
          </div>
        ) : (
          <div
            className='w-8 md:w-10 overflow-hidden text-gray-300 hover:text-white rounded-full transition-colors'
            onClick={() => router.push('/login')}
          >
            <UserCircleIcon />
          </div>
        )}
      </label>
      {isLogin ? (
        <ul
          tabIndex={0}
          className='mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52'
        >
          <li>
            <a>我的发布</a>
          </li>
          <li>
            <a>全局设置</a>
          </li>
          <li>
            <a>退出登录</a>
          </li>
        </ul>
      ) : null}
    </div>
  )
}
