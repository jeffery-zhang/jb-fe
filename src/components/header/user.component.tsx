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

export const UserMenu: FC<{ className?: string }> = ({ className }) => {
  const router = useRouter()
  const { rounded, showDrawer } = useSettingsStore((state) => ({
    rounded: state.rounded,
    showDrawer: state.show,
  }))
  const { user, isLogin } = useUserStore(
    (state) => ({
      user: state.user,
      isLogin: state.isLogin,
    }),
    shallow,
  )
  const logout = useUserStore((state) => state.logout)

  return (
    <div className={`dropdown dropdown-end ${className || ''}`}>
      <label
        tabIndex={0}
        className='btn btn-ghost btn-circle btn-sm avatar w-8 md:w-10 h-8 md:h-10'
      >
        {isLogin ? (
          <div className='avatar w-8 md:w-10'>
            <div className='rounded-full'>
              <Img src={user?.avatar || Doge} alt={user?.username || ''} />
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
          className={`mt-3 p-2 shadow menu menu-compact dropdown-content bg-base-100 w-52 ${getRoundedClass(
            rounded,
          )}`}
        >
          {/* <li>
            <a>我的发布</a>
          </li> */}
          <li>
            <a onClick={showDrawer}>偏好设置</a>
          </li>
          <li>
            <a onClick={logout}>退出登录</a>
          </li>
        </ul>
      ) : null}
    </div>
  )
}
