import { FC, useState, useEffect } from 'react'
import { ChevronDoubleUpIcon } from '@heroicons/react/24/outline'

interface IProps {
  element: HTMLElement | null
}

export const BackTop: FC<IProps> = ({ element }) => {
  const [show, setShow] = useState(false)
  const [isScrolling, setIsScrolling] = useState(false)

  const handleClick = () => {
    if (!element || isScrolling || typeof window === 'undefined') return
    setIsScrolling(true)
    const content = element
    const duration = 500 // 滚动动画的时长，单位为毫秒
    const startTime = performance.now()
    const startY = content.scrollTop

    function animate(currentTime: number) {
      const timeElapsed = currentTime - startTime
      const fraction = timeElapsed / duration

      if (fraction < 1) {
        const newY = startY * (1 - fraction * fraction)
        content.scrollTop = newY
        window.requestAnimationFrame(animate)
      } else {
        content.scrollTop = 0
        setIsScrolling(false)
      }
    }

    window.requestAnimationFrame(animate)
  }
  const handleScroll = () => {
    if (element) {
      const { scrollTop } = element
      if (scrollTop >= 500) {
        setShow(true)
      } else {
        setShow(false)
      }
    }
  }

  useEffect(() => {
    if (element) {
      element.addEventListener('scroll', handleScroll)
    }

    return () => {
      element?.removeEventListener('scroll', handleScroll)
    }
  }, [element])

  return (
    <div
      className={`${show ? 'block' : 'hidden'} \
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
  )
}
