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
  const allPages = useMemo(() => Math.ceil(total / pageSize), [pageSize, total])
  const pages: number[] = useMemo(() => {
    if (allPages <= 1) return []
    const first = Math.max(1, Math.min(page - 3, allPages - 6))
    const last = Math.min(allPages, Math.max(page + 3, 7))
    return [
      first,
      ...Array.from({ length: last - first - 1 }, (_, i) => i + first + 1),
      last,
    ]
  }, [page, pageSize, total])

  return allPages > 1 ? (
    <div className='flex justify-end items-center gap-x-2'>
      <button
        className={`btn btn-ghost ${getRoundedClass(rounded)}`}
        disabled={page === 1}
        onClick={() => onChange(page - 1, pageSize)}
      >
        {'<'}
      </button>
      {pages[0] > 1 && (
        <button
          className={`btn btn-ghost ${getRoundedClass(rounded)}`}
          onClick={() => onChange(page - 4, pageSize)}
        >
          ...
        </button>
      )}
      {pages.map((number) => (
        <button
          key={number}
          className={`btn btn-ghost ${getRoundedClass(rounded)}`}
          disabled={page === number}
          onClick={() => onChange(number, pageSize)}
        >
          {number}
        </button>
      ))}
      {pages[pages.length - 1] < allPages && (
        <button
          className={`btn btn-ghost ${getRoundedClass(rounded)}`}
          onClick={() => onChange(page + 4, pageSize)}
        >
          ...
        </button>
      )}
      <button
        className={`btn btn-ghost ${getRoundedClass(rounded)}`}
        disabled={page === allPages}
        onClick={() => onChange(page + 1, pageSize)}
      >
        {'>'}
      </button>
    </div>
  ) : null
}
