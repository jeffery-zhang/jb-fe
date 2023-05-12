import { BasicLayout } from '@/layouts/basic.layout'
import { Post } from '@/components/post.component'
import { search } from '@/shared/services/posts.service'
import { IPost } from '@/shared/interfaces/post.interface'

export async function getStaticProps() {
  let records: Omit<IPost, 'content'>[] = []
  const { data, success } = await search({ pageSize: 10 })
  if (success) {
    records = data.records
  }
  return {
    props: {
      records,
    },
  }
}

export default function Home({ records }: { records: IPost[] }) {
  return (
    <BasicLayout banner showCreate>
      <div className='container mx-auto pt-48 pb-40 relative z-10'>
        <div className='flex flex-col max-w-full lg:w-3/5 gap-y-6'>
          {records.map((post) => (
            <Post key={post._id} {...post} />
          ))}
        </div>
      </div>
    </BasicLayout>
  )
}
