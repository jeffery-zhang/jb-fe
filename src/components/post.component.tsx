import Image from 'next/image'
import { FC } from 'react'
import dayjs from 'dayjs'

import { IPost } from '@/shared/interfaces/post.interface'
import LoadImgFailed from '../../public/imgs/load-img-failed.jpg'

export const Post: FC<IPost> = ({
  _id,
  title,
  intro,
  poster,
  username,
  updateTime,
}) => {
  return (
    <div className='sm:h-80 md:h-96 lg:h-80 xl:h-96 bg-base-100 rounded-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out'>
      <div className='hero-content w-full justify-between gap-12 flex-col sm:flex-row'>
        {/* <Image
          src={poster || LoadImgFailed}
          alt={title}
          className='max-w-sm rounded-lg shadow-2xl'
        /> */}
        <Image
          src={LoadImgFailed}
          alt={title}
          className='w-full sm:w-2/4 max-h-64 rounded-lg shadow-2xl'
        />
        <div className='flex-1'>
          <h1 className='text-2xl font-bold'>{title}</h1>
          <div className='flex flex-col gap-6 py-6'>
            <span className='text-sm'>{username}</span>
            <span className='text-sm'>
              {dayjs(updateTime).format('YYYY-MM-DD HH:mm:ss')}
            </span>
          </div>
        </div>
      </div>
      <div className='p-4 text-center text-md truncate'>{intro}</div>
    </div>
  )
}
