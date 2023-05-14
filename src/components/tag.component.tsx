import { FC } from 'react'

import {
  useSettingsStore,
  getRoundedClass,
} from '@/shared/stores/settings.store'

interface IProps {
  name: string
}

export const Tag: FC<IProps> = ({ name }) => {
  const rounded = useSettingsStore((state) => state.rounded)

  return (
    <span
      className={`inline-block px-4 py-1 bg-secondary mr-2 text-xs ${getRoundedClass(
        rounded,
      )}`}
    >
      {name}
    </span>
  )
}
