import useSwr from 'swr'

import { BasicLayout } from '@/layouts/basic.layout'
import { Post } from '@/components/post.component'
import { search, path, IPostData } from '@/shared/services/posts.service'

export async function getStaticProps(context: any) {
  let records: IPostData[] = []
  // const res = await fetch('http://localhost:3000/api/posts')
  // console.log(await res.json())
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
      <div className='container mx-auto'>
        {records.map((post) => (
          <Post key={post._id} {...post} />
        ))}
      </div>
    </BasicLayout>
  )
}
