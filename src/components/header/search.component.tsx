import { FC } from 'react'

export const Search: FC = () => {
  return (
    <div className='form-control w-32 md:w-60'>
      <input
        type='text'
        placeholder='Search'
        className='input input-bordered input-primary input-sm md:input-md w-full'
      />
    </div>
  )
}
