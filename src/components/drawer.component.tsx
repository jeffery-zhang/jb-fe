import {
  FC,
  ReactNode,
  forwardRef,
  useEffect,
  useImperativeHandle,
  useState,
} from 'react'
import { XMarkIcon } from '@heroicons/react/24/outline'

interface IProps {
  ref?: any
  visible?: boolean
  show?: () => void
  hide?: () => void
  title?: string
  children?: ReactNode | null
  footer?: ReactNode | null
}

export const Drawer: FC<IProps> = forwardRef(
  (
    {
      visible: propVisible,
      show,
      hide,
      title = 'Drawer Title',
      children = null,
      footer = null,
    },
    ref,
  ) => {
    const [visible, setVisible] = useState(!!propVisible)

    const hideDrawer = () => {
      console.log(hide && typeof hide === 'function')
      if (hide && typeof hide === 'function') hide()
      else setVisible(false)
    }
    const showDrawer = () => {
      console.log(show && typeof show === 'function')
      if (show && typeof show === 'function') show()
      else setVisible(true)
    }

    useEffect(() => {
      if (typeof propVisible !== 'undefined') setVisible(propVisible)
    }, [propVisible])

    useImperativeHandle(ref, () => ({
      showDrawer,
      hideDrawer,
    }))

    return (
      <div
        className={`fixed left-0 top-0 w-screen h-screen \
        transition-all duration-300 ease-in-out \
        ${visible ? 'bg-black bg-opacity-30 z-50' : 'bg-transparent -z-10'}`}
        onClick={hideDrawer}
      >
        <div
          className={`absolute inset-y-0 right-0 bg-base-100 shadow-lg \
          transition-all duration-300 ease-in-out \
          max-w-lg w-full md:w-4/5 flex flex-col \
          ${visible ? 'translate-x-0' : 'translate-x-full'}`}
          onClick={(e) => e.stopPropagation()}
        >
          <div className='navbar justify-between border-b border-base-200'>
            <h3 className='truncate flex-1 px-2 font-bold'>{title}</h3>
            <div
              className='avatar w-8 md:w-10 text-primary cursor-pointer'
              onClick={hideDrawer}
            >
              <XMarkIcon />
            </div>
          </div>
          <div className='flex-1 px-4 py-8 lg:px-8 overflow-y-auto'>
            {children}
          </div>
          {footer ? (
            <div className='navbar border-t border-base-200'>{footer}</div>
          ) : null}
        </div>
      </div>
    )
  },
)
