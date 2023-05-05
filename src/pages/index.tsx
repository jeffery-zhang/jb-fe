import Image from 'next/image'

import { BasicLayout } from '@/layouts/basic.layout'
import { Post } from '@/components/post.component'
import { search, IPostData } from '@/shared/services/posts.service'
import Banner from '../../public/banner.jpg'

export async function getStaticProps() {
  let records: IPostData[] = []
  const res = await search({ pageSize: 20 })
  if (res.success) {
    records = res.data.records
  }
  return {
    props: {
      records,
    },
  }
}

export default function Home({ records }: { records: IPostData[] }) {
  return (
    <BasicLayout>
      <div className='w-full h-full relative'>
        <div className='w-full absolute'>
          <Image src={Banner} alt='banner' />
          <div className='absolute bottom-0 w-full h-full bg-gradient-to-b from-transparent to-base-200'></div>
        </div>
        <div className='container mx-auto pt-48 pb-20 relative z-10'>
          <div className='flex flex-col max-w-full lg:w-3/5 gap-y-6'>
            {records.map((post) => (
              <Post key={post._id} {...post} />
            ))}
          </div>
        </div>
      </div>
    </BasicLayout>
  )
}
