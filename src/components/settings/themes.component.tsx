import { FC } from 'react'
import useSWR from 'swr'
import { shallow } from 'zustand/shallow'

import { getThemes, putOne, path } from '@/shared/services/settings.service'
import { useUserStore } from '@/shared/stores/user.store'
import {
  useSettingsStore,
  getRoundedClass,
} from '@/shared/stores/settings.store'

export const Themes: FC = () => {
  const isLogin = useUserStore((state) => state.isLogin)
  const { theme, rounded, banner, setTheme } = useSettingsStore(
    (state) => ({
      theme: state.theme,
      banner: state.banner,
      rounded: state.rounded,
      setTheme: state.setTheme,
    }),
    shallow,
  )
  const { data = { data: [] } } = useSWR(path.allThemes, async () => {
    const result = await getThemes()
    return result
  })

  const onSelectTheme = async (val: string) => {
    if (!isLogin) return setTheme(val)
    const { success } = await putOne({ banner, rounded, theme: val })
    if (success) {
      setTheme(val)
    }
  }

  return (
    <div className='flex justify-center items-start w-full mb-12 lg:mb-16'>
      <label className='w-1/4 text-right'>主题设置</label>
      <div className='flex-1 ml-4 lg:ml-8 flex gap-2 lg:gap-4 flex-wrap'>
        {data.data.map(({ label, value }) => (
          <div
            className={`w-28 h-16 border border-base-300 overflow-hidden cursor-pointer \
            ${theme === value ? 'ring-4 ring-primary' : ''} \
            ${getRoundedClass(rounded)}`}
            key={value}
            onClick={() => onSelectTheme(value)}
          >
            <div className='w-full h-full flex bg-base-100' data-theme={value}>
              <div className='w-8 h-full flex flex-col'>
                <div className='h-1/2 bg-base-200 font-bold text-center leading-8'>
                  J
                </div>
                <div className='h-1/2 bg-base-300 font-bold text-center leading-8'>
                  B
                </div>
              </div>
              <div className='flex-1'>
                <div className='font-bold h-1/2 leading-8'>{label}</div>
                <div className='h-1/2 flex justify-center items-center'>
                  <div className='w-1/3 h-8 font-bold text-center leading-8 bg-primary text-primary-content'>
                    L
                  </div>
                  <div className='w-1/3 h-8 font-bold text-center leading-8 bg-secondary text-secondary-content'>
                    O
                  </div>
                  <div className='w-1/3 h-8 font-bold text-center leading-8 bg-accent text-accent-content'>
                    G
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
