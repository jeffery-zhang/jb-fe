import Image from 'next/image'
import { useRouter } from 'next/router'
import { FC } from 'react'
import dayjs from 'dayjs'
import { PencilSquareIcon } from '@heroicons/react/24/outline'

import { useUserStore } from '@/shared/stores/user.store'
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
  const user = useUserStore((state) => state.user)
  const router = useRouter()

  return (
    <div className='relative sm:h-80 md:h-96 lg:h-80 xl:h-96 bg-base-100 rounded-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 ease-in-out'>
      <div className='hero-content w-full justify-between gap-12 flex-col sm:flex-row'>
        <Image
          src={
            poster.startsWith('http') || poster.startsWith('/')
              ? poster
              : LoadImgFailed
          }
          alt={title}
          className='w-full sm:w-2/4 max-h-64 rounded-lg shadow-2xl cursor-pointer'
          width={640}
          height={480}
          onClick={() => router.push(`/post/${_id}`)}
        />
        <div className='flex-1'>
          <h1
            className='text-2xl font-bold cursor-pointer'
            onClick={() => router.push(`/post/${_id}`)}
          >
            {title}
          </h1>
          <div className='flex flex-col gap-6 py-6 text-secondary-content'>
            <span className='text-sm'>{username}</span>
            <span className='text-sm'>
              {dayjs(updateTime).format('YYYY-MM-DD HH:mm:ss')}
            </span>
          </div>
        </div>
      </div>
      <div className='p-4 text-center text-md truncate mr-12 lg:mr-0'>
        {intro}
      </div>
      {user && user?.username === username && (
        <div
          className='absolute bottom-5 right-5 w-8 h-8 text-primary cursor-pointer'
          onClick={() => router.push(`/post/edit/${_id}`)}
        >
          <PencilSquareIcon />
        </div>
      )}
    </div>
  )
}
