import{}from 'swr'

import { fetcher } from '@/shared/fetcher'
import { SearchOutlined } from '@ant-design/icons'

export const Search = () => {
  return (
    <div
      className='w-32 md:w-60 relative rounded-l-full rounded-r-full \
        border border-gray-300 focus-within:border-blue-400 \
        transition-colors duration-300 ease-in-out'
    >
      <input
        type='text'
        className='block w-full py-1 px-2 md:px-3 rounded-l-full rounded-r-full outline-none'
        placeholder='Search'
      />
      <div className='absolute inset-y-0 right-0 flex items-center pr-3'>
        <SearchOutlined />
      </div>
    </div>
  )
}
