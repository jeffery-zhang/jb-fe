import Image from 'next/image'
import { FC } from 'react'

import { IPostData } from '@/shared/services/posts.service'
import LoadImgFailed from '../../public/load-img-failed.jpg'

export const Post: FC<IPostData> = ({ _id, title, intro, poster }) => {
  return (
    <div className='hero bg-base-100'>
      <div className='hero-content w-full lg:w-3/4 justify-between gap-12 flex-col lg:flex-row'>
        {/* <Image
          src={poster || LoadImgFailed}
          alt={title}
          className='max-w-sm rounded-lg shadow-2xl'
        /> */}
        <Image
          src={LoadImgFailed}
          alt={title}
          className='max-w-sm rounded-lg shadow-2xl'
        />
        <div className='flex-1'>
          <h1 className='text-2xl font-bold'>{title}</h1>
          <p className='py-6'>{intro}</p>
        </div>
      </div>
    </div>
  )
}
