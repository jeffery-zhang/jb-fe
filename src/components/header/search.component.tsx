import { FC } from 'react'

import {
  useSettingsStore,
  getRoundedClass,
} from '@/shared/stores/settings.store'

export const Search: FC = () => {
  const rounded = useSettingsStore((state) => state.rounded)

  return (
    <div className='form-control w-32 md:w-60'>
      <input
        type='text'
        placeholder='Search'
        className={`input input-bordered input-primary input-sm md:input-md w-full ${getRoundedClass(
          rounded,
        )}`}
      />
    </div>
  )
}
