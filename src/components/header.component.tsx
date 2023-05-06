import { useRouter } from 'next/router'
import Image from 'next/image'
import { FC } from 'react'
import { shallow } from 'zustand/shallow'
import { UserCircleIcon, SwatchIcon } from '@heroicons/react/24/solid'

import { useUserStore } from '@/stores/user.store'
import Doge from '../../public/doge.svg'

export const Header = () => {
  const router = useRouter()

  return (
    <header className='navbar justify-between bg-base-100 shadow-2xl'>
      <Logo onClick={() => router.push('/')} />
      <div className='flex items-center flex-none gap-3'>
        <SearchInput />
        <ThemeControl />
        <UserMenu />
      </div>
    </header>
  )
}
export const Logo: FC<{ className?: string; onClick?: () => void }> = ({
  className,
  onClick,
}) => {
  return (
    <div
      className={`font-great-vibes tracking-widest cursor-default text-primary \
      ${className}`}
      onClick={() => onClick?.()}
    >
      <span className='text-3xl md:text-4xl'>JB</span>
      <span className='text-base'>log</span>
    </div>
  )
}

export const SearchInput = () => {
  return (
    <div className='form-control w-32 md:w-60'>
      <input
        type='text'
        placeholder='Search'
        className='input input-bordered input-primary input-sm md:input-md w-full'
      />
    </div>
  )
}

export const ThemeControl = () => {
  const handleThemeChange = (key: string) => {
    if (typeof window !== 'undefined') {
      window.document.querySelector('html')?.setAttribute('data-theme', key)
      window.localStorage.setItem('theme', key)
    }
  }

  return (
    <div className='dropdown dropdown-end'>
      <label
        tabIndex={0}
        className='btn btn-ghost btn-circle btn-sm avatar w-8 md:w-10 h-8 md:h-10'
      >
        <div className='w-8 md:w-10 overflow-hidden rounded-full text-primary'>
          <SwatchIcon />
        </div>
      </label>
      <ul
        tabIndex={0}
        className='mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 rounded-box w-52'
      >
        <li>
          <a onClick={() => handleThemeChange('windter')}>Winter</a>
        </li>
        <li>
          <a onClick={() => handleThemeChange('autumn')}>Autumn</a>
        </li>
        <li>
          <a onClick={() => handleThemeChange('garden')}>Garden</a>
        </li>
      </ul>
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
          <div className='avatar w-8 md:w-10'>
            <div className='rounded-full'>
              <Image src={user?.avatar || Doge} alt={user?.username || ''} />
            </div>
          </div>
        ) : (
          <div
            className='avatar w-8 md:w-10'
            onClick={() => router.push('/login')}
          >
            <div className='rounded-full'>
              <UserCircleIcon />
            </div>
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
