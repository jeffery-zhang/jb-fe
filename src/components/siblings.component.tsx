import { FC } from 'react'
import Link from 'next/link'

import { TSiblingsTwoData } from '@/shared/interfaces/post.interface'

export const Siblings: FC<TSiblingsTwoData> = ({ prev, next }) => {
  return (
    <div className='py-12 bg-base-100 text-base-content'>
      <div>
        上一篇:{` `}
        {prev ? (
          <Link href={`/post/details/${prev._id}`}>{prev.title}</Link>
        ) : (
          <span>没有上一篇了</span>
        )}
      </div>
      <div>
        下一篇:{` `}
        {next ? (
          <Link href={`/post/details/${next._id}`}>{next.title}</Link>
        ) : (
          <span>没有下一篇了</span>
        )}
      </div>
    </div>
  )
}
