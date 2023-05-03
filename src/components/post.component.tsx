import Image from 'next/image'
import { FC } from 'react'

import { IPostData } from '@/shared/services/posts.service'
import LoadImgFailed from '../../public/load-img-failed.jpg'

export const Post: FC<IPostData> = ({ _id, title, intro, poster }) => {
  return (
    <div className='hero bg-base-100'>
      <div className='hero-content flex-col lg:flex-row'>
        {/* <Image src={poster || LoadImgFailed} alt={title} /> */}
        <Image src={LoadImgFailed} alt={title} />
        <div>
          <h1 className='text-2xl font-bold'>{title}</h1>
          <p className='py-6'>{intro}</p>
        </div>
      </div>
    </div>
  )
}
