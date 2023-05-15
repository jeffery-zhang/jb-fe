import { FC, useMemo } from 'react'

import {
  useSettingsStore,
  getRoundedClass,
} from '@/shared/stores/settings.store'

interface IProps {
  page: number
  pageSize: number
  total: number
  onChange: (page: number, pageSize: number) => void
}

export const Pager: FC<IProps> = ({ page, pageSize, total, onChange }) => {
  const rounded = useSettingsStore((state) => state.rounded)
  const pages = useMemo(() => Math.ceil(total / pageSize), [pageSize, total])

  return (
    <div className='flex justify-end items-center gap-x-2'>
      <button
        className={`btn btn-ghost ${getRoundedClass(rounded)}`}
        disabled={page === 1}
        onClick={() => onChange(page - 1, pageSize)}
      >
        {'<'}
      </button>
      {Array.from({ length: pages }).map((_, index) => (
        <button
          key={index}
          className={`btn btn-ghost ${getRoundedClass(rounded)}`}
          disabled={page === index + 1}
          onClick={() => onChange(index + 1, pageSize)}
        >
          {index + 1}
        </button>
      ))}
      <button
        className={`btn btn-ghost ${getRoundedClass(rounded)}`}
        disabled={page === pages}
        onClick={() => onChange(page + 1, pageSize)}
      >
        {'>'}
      </button>
    </div>
  )
}
