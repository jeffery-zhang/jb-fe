import { useEffect } from 'react'
import { shallow } from 'zustand/shallow'

import { BasicLayout } from '@/layouts/basic.layout'
import { Post } from '@/components/post.component'
import { search } from '@/shared/services/posts.service'
import { usePagerStore } from '@/shared/stores/pager.store'
import { IPost } from '@/shared/interfaces/post.interface'
import { IRecords } from '@/shared/interfaces/fetcher.interface'
import { Pager } from '@/components/pager.component'

export async function getStaticProps() {
  const { data } = await search({ pageSize: 10 })

  return {
    props: {
      page: data.page || 0,
      pageSize: data.pageSize || 0,
      total: data.total || 0,
      records: data.records || [],
    },
  }
}

export default function Home(props: IRecords<IPost>) {
  const { page, pageSize, total, setPage, setPageSize, setTotal } =
    usePagerStore((state) => state)

  useEffect(() => {
    setPage(props.page)
    setPageSize(props.pageSize)
    setTotal(props.total)
  }, [props])

  return (
    <BasicLayout banner showCreate>
      <div className='container mx-auto pt-48 pb-40 relative z-10'>
        <div className='flex flex-col max-w-full lg:w-3/5 gap-y-6'>
          {props.records.map((post) => (
            <Post key={post._id} {...post} />
          ))}
          <Pager
            page={page}
            pageSize={pageSize}
            total={total}
            onChange={(page) => {
              console.log(page)
            }}
          />
        </div>
      </div>
    </BasicLayout>
  )
}
