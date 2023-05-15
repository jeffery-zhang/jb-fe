import { useRouter } from 'next/navigation'
import { FC, ReactNode, useRef } from 'react'
import useSWR from 'swr'
import { PlusIcon, HomeIcon } from '@heroicons/react/24/outline'

import { verify, path } from '@/shared/services/auth.service'
import {
  getUserSetting,
  path as settingPath,
} from '@/shared/services/settings.service'
import { Header } from '@/components/header/header.component'
import { useUserStore } from '@/shared/stores/user.store'
import { useSettingsStore } from '@/shared/stores/settings.store'
import { Drawer } from '@/components/drawer.component'
import { Themes } from '@/components/settings/themes.component'
import { Banners } from '@/components/settings/banners.component'
import { Rounded } from '@/components/settings/rounded.component'
import { Banner } from '@/components/layouts/banner.component'
import { BackTop } from '@/components/layouts/back-top.component'
import { User } from '@/components/settings/user.component'

interface IProps {
  children: ReactNode
  banner?: boolean
  showCreate?: boolean
  showHome?: boolean
}

export const BasicLayout: FC<IProps> = ({
  children,
  banner = false,
  showCreate = false,
  showHome = false,
}) => {
  const router = useRouter()
  const contentRef = useRef<HTMLDivElement | null>(null)
  const { visible, show, hide, setBanner, setTheme, setRounded } =
    useSettingsStore((state) => ({
      visible: state.visible,
      show: state.show,
      hide: state.hide,
      setTheme: state.setTheme,
      setBanner: state.setBanner,
      setRounded: state.setRounded,
    }))
  const isLogin = useUserStore((state) => state.isLogin)
  const login = useUserStore((state) => state.login)
  useSWR(path.verify, async () => {
    const { data, success } = await verify()
    if (success && data) {
      login(data, window.localStorage.getItem('token') || '')
    }
  })
  useSWR(isLogin ? settingPath.getOne : null, async () => {
    const { data, success } = await getUserSetting()
    if (success) {
      const { banner, theme, rounded } = data
      banner && setBanner(banner)
      theme && setTheme(theme)
      if (rounded || rounded === 0) setRounded(rounded)
    }
  })

  return (
    <div className='flex flex-col w-full h-full bg-base-200 drawer'>
      <Header></Header>
      <main className='flex-grow relative overflow-hidden'>
        {banner ? <Banner /> : null}
        <div ref={contentRef} className='w-full h-full overflow-y-auto'>
          {children}
        </div>
        <div
          className={`${isLogin && showCreate ? 'block' : 'hidden'} \
            fixed z-50 bottom-32 right-6 w-10 h-10 text-primary \
            md:right-12 md:bottom-44 md:w-12 md:h-12 shadow-lg \
            bg-base-100 rounded-full p-2 cursor-pointer \
            hover:bg-primary active:bg-primary \
            hover:text-base-100 active:text-base-100 \
            transition-colors duration-300 ease-in-out`}
          onClick={() => router.push('/post/edit/create')}
        >
          <PlusIcon />
        </div>
        <BackTop element={contentRef.current} />
        <div
          className={`${showHome ? 'block' : 'hidden'} \
            fixed z-50 right-6 bottom-6 w-10 h-10 text-primary \
            md:right-12 md:bottom-12 md:w-12 md:h-12 shadow-lg \
            bg-base-100 rounded-full p-2 cursor-pointer \
            hover:bg-primary active:bg-primary \
            hover:text-base-100 active:text-base-100 \
            transition-colors duration-300 ease-in-out`}
          onClick={() => router.push('/')}
        >
          <HomeIcon />
        </div>
      </main>
      <Drawer
        visible={visible}
        show={show}
        hide={hide}
        title='偏好设置'
        footer={<User className='block lg:hidden' />}
      >
        <Themes />
        <Banners />
        <Rounded />
      </Drawer>
    </div>
  )
}
