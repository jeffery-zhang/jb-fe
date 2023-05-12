import { FC } from 'react'

interface IProps {
  name: string
}

export const Tag: FC<IProps> = ({ name }) => {
  return (
    <span className='inline-block px-4 py-1 rounded-md bg-secondary mr-2 text-xs'>
      {name}
    </span>
  )
}
