import useSwr from 'swr'

import { BasicLayout } from '@/layouts/basic.layout'
import { Post } from '@/components/post.component'
import { search, IPostData } from '@/shared/services/posts.service'

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
      <div className='container flex flex-col mx-auto gap-y-6'>
        {records.map((post) => (
          <Post key={post._id} {...post} />
        ))}
      </div>
    </BasicLayout>
  )
}
