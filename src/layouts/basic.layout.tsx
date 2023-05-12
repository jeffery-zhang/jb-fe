import { useRouter } from 'next/navigation'
import { FC, ReactNode, useEffect, useRef, useState } from 'react'
import useSWR from 'swr'
import {
  ChevronDoubleUpIcon,
  PlusIcon,
  HomeIcon,
} from '@heroicons/react/24/outline'

import { verify, path } from '@/shared/services/auth.service'
import { Header } from '@/components/header.component'
import { useUserStore } from '@/shared/stores/user.store'
import { Img } from '@/components/image.component'
import Banner from '../../public/imgs/banner.jpg'

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
  const mainRef = useRef<HTMLDivElement | null>(null)
  const [showTop, setShowTop] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)
  const isLogin = useUserStore((state) => state.isLogin)
  const login = useUserStore((state) => state.login)
  useSWR(path.verify, async () => {
    const { data } = await verify()
    if (data) {
      login(data, window.localStorage.getItem('token') || '')
    }
    return data
  })

  const handleScroll = () => {
    if (mainRef.current) {
      const { scrollTop } = mainRef.current
      if (scrollTop >= 500) {
        setShowTop(true)
      } else {
        setShowTop(false)
      }
    }
  }
  const handleClick = () => {
    if (!mainRef.current || isScrolling || typeof window === 'undefined') return
    setIsScrolling(true)
    const main = mainRef.current
    const duration = 500 // 滚动动画的时长，单位为毫秒
    const startTime = performance.now()
    const startY = main.scrollTop

    function animate(currentTime: number) {
      const timeElapsed = currentTime - startTime
      const fraction = timeElapsed / duration

      if (fraction < 1) {
        const newY = startY * (1 - fraction * fraction)
        main.scrollTop = newY
        window.requestAnimationFrame(animate)
      } else {
        main.scrollTop = 0
        setIsScrolling(false)
      }
    }

    window.requestAnimationFrame(animate)
  }

  useEffect(() => {
    if (mainRef.current) {
      mainRef.current.addEventListener('scroll', handleScroll)
    }

    return () => {
      mainRef.current?.removeEventListener('scroll', handleScroll)
    }
  }, [mainRef.current])

  return (
    <div className='flex flex-col w-full h-full bg-base-200'>
      <Header></Header>
      <main ref={mainRef} className='flex-grow relative overflow-auto'>
        {banner ? (
          <div className='w-full absolute'>
            <Img src={Banner} alt='banner' />
            <div className='absolute -bottom-1 w-full h-full bg-gradient-to-b from-transparent to-base-200'></div>
          </div>
        ) : null}
        {children}
        <div
          className={`${isLogin && showCreate ? 'block' : 'hidden'} \
            fixed z-50 bottom-32 right-6 w-10 h-10 text-primary \
            md:right-12 md:bottom-44 md:w-12 md:h-12 shadow-lg \
            bg-base-100 rounded-full p-2 cursor-pointer \
            hover:bg-primary active:bg-primary \
            hover:text-base-100 active:text-base-100 \
            transition-colors duration-300 ease-in-out`}
          onClick={() => router.push('/post/edit')}
        >
          <PlusIcon />
        </div>
        <div
          className={`${showTop ? 'block' : 'hidden'} \
            fixed z-50 right-6 bottom-20 w-10 h-10 text-primary \
            md:right-12 md:bottom-28 md:w-12 md:h-12 shadow-lg \
            bg-base-100 rounded-full p-2 cursor-pointer \
            hover:bg-primary active:bg-primary \
            hover:text-base-100 active:text-base-100 \
            transition-colors duration-300 ease-in-out`}
          onClick={handleClick}
        >
          <ChevronDoubleUpIcon />
        </div>
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
    </div>
  )
}
