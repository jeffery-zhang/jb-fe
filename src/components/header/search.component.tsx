import { FC } from 'react'
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline'

import { Input } from '@/components/form'
import { useSearchStore, usePostsStore } from '@/shared/stores/posts.store'

export const Search: FC = () => {
  const onSearch = usePostsStore((state) => state.onSearch)
  const { keywords, setKeywords } = useSearchStore((state) => ({
    keywords: state.keywords,
    setKeywords: state.setKeywords,
  }))

  return (
    <div className='form-control w-32 md:w-60'>
      <Input
        value={keywords}
        suffix={
          <MagnifyingGlassIcon
            onClick={() => onSearch({ keywords, page: 1 })}
            className='w-5 text-primary cursor-pointer'
          />
        }
        placeholder='search'
        onChange={(value) => setKeywords(value)}
        onKeydown={(e) => {
          if (e.code === 'Enter') {
            onSearch({ keywords, page: 1 })
          }
        }}
      />
    </div>
  )
}
