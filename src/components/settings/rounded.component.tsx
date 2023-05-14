import { FC, useMemo } from 'react'

import { useUserStore } from '@/shared/stores/user.store'
import {
  useSettingsStore,
  getRoundedClass,
} from '@/shared/stores/settings.store'
import { putOne } from '@/shared/services/settings.service'
import { ISetting } from '@/shared/interfaces/setting.interface'

export const Rounded: FC = () => {
  const isLogin = useUserStore((state) => state.isLogin)
  const { rounded, ...rest } = useSettingsStore((state) => ({
    banner: state.banner,
    theme: state.theme,
    rounded: state.rounded,
  }))
  const setRounded = useSettingsStore((state) => state.setRounded)
  const choices: { name: string; value: ISetting['rounded'] }[] = useMemo(
    () => [
      { name: '无', value: 0 },
      { name: '小', value: 1 },
      { name: '中', value: 2 },
      { name: '大', value: 3 },
    ],
    [],
  )

  const onSelectRounded = async (val: ISetting['rounded']) => {
    if (!isLogin) return setRounded(val)
    const { success } = await putOne({ ...rest, rounded: val })
    if (success) {
      setRounded(val)
    }
  }

  return (
    <div className='flex justify-center items-start w-full mb-12 lg:mb-16'>
      <label className='w-1/4 text-right'>圆角设置</label>
      <div className='flex-1 ml-4 lg:ml-8 flex flex-wrap gap-2'>
        {choices.map(({ name, value }) => (
          <div
            key={name}
            className={`w-20 h-12 border border-base-300 flex justify-center items-center \
            bg-base-100 hover:bg-primary hover:text-primary-content cursor-pointer \
            transition-all duration-300 ease-in-out \
            ${rounded === value ? 'bg-primary text-primary-content' : ''}
            ${getRoundedClass(value)}`}
            onClick={() => onSelectRounded(value)}
          >
            {name}
          </div>
        ))}
      </div>
    </div>
  )
}
