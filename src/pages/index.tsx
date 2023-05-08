import { BasicLayout } from '@/layouts/basic.layout'
import { Post } from '@/components/post.component'
import { search } from '@/shared/services/posts.service'
import { IPost } from '@/shared/interfaces/post.interface'

export async function getStaticProps() {
  let records: IPost[] = []
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

export default function Home({ records }: { records: IPost[] }) {
  return (
    <BasicLayout banner={true} showCreate={true}>
      <div className='container mx-auto pt-48 pb-20 relative z-10'>
        <div className='flex flex-col max-w-full lg:w-3/5 gap-y-6'>
          {records.map((post) => (
            <Post key={post._id} {...post} />
          ))}
        </div>
      </div>
    </BasicLayout>
  )
}
