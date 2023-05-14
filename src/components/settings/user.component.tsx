import { FC } from 'react'
import { useRouter } from 'next/router'
import { shallow } from 'zustand/shallow'
import { UserCircleIcon } from '@heroicons/react/24/solid'

import { Img } from '../image.component'
import { useUserStore } from '@/shared/stores/user.store'
import {
  useSettingsStore,
  getRoundedClass,
} from '@/shared/stores/settings.store'
import Doge from '../../../public/icons/doge.png'

export const User: FC<{ className?: string }> = ({ className }) => {
  const router = useRouter()
  const { user, isLogin, logout } = useUserStore(
    (state) => ({
      user: state.user,
      isLogin: state.isLogin,
      logout: state.logout,
    }),
    shallow,
  )
  const rounded = useSettingsStore((state) => state.rounded)
  const hideDrawer = useSettingsStore((state) => state.hide)

  const toLogin = () => {
    if (isLogin) return
    hideDrawer()
    router.push('/login')
  }
  const onLogout = () => {
    hideDrawer()
    logout()
  }

  return (
    <div className={`w-full h-full px-8 ${className || ''}`}>
      <div
        className={`flex items-center w-full h-12 \
        hover:bg-base-300 border-b border-base-300 \
        transition-all duration-300 ease-in-out \
        ${getRoundedClass(rounded)} \
        ${isLogin ? 'block' : 'hidden'}`}
        onClick={onLogout}
      >
        <div className='w-12'></div>
        <div className='flex-1 text-center'>退出登录</div>
      </div>
      <div
        className={`flex items-center w-full h-12 \
        hover:bg-base-300 border-b border-base-300 \
        transition-all duration-300 ease-in-out \
        ${getRoundedClass(rounded)} \
        ${isLogin ? 'block' : 'hidden'}`}
      >
        <div className='w-12'></div>
        <div className='flex-1 text-center'>我的发布</div>
      </div>
      <div
        className={`flex items-center w-full h-12 \
        hover:bg-base-300 \
        transition-all duration-300 ease-in-out \
        ${getRoundedClass(rounded)}`}
        onClick={toLogin}
      >
        <div className='avatar w-12'>
          {isLogin ? (
            <Img src={user?.avatar || Doge} alt={user?.username || ''} />
          ) : (
            <UserCircleIcon />
          )}
        </div>
        <div className='flex-1 text-center'>{user?.username || '请登录'}</div>
      </div>
    </div>
  )
}
