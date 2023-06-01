import { useEffect } from 'react'
import Head from 'next/head'
import { shallow } from 'zustand/shallow'
import { throttle } from 'lodash'

import { BasicLayout } from '@/layouts/basic.layout'
import { fetcher } from '@/shared/utils/fetcher'
import { Post } from '@/components/post.component'
import { search, path } from '@/shared/services/posts.service'
import { usePostsStore, useSearchStore } from '@/shared/stores/posts.store'
import { IPost } from '@/shared/interfaces/post.interface'
import { IRecords } from '@/shared/interfaces/fetcher.interface'
import { Pager } from '@/components/pager.component'

export async function getServerSideProps() {
  const { data }: any = await fetcher(`${process.env.SERVER_URL}${path.base}`)

  return {
    props: {
      page: data.page ?? 1,
      pageSize: data.pageSize ?? 10,
      total: data.total ?? 0,
      records: data.records ?? [],
    },
  }
}

export default function Home(props: IRecords<IPost>) {
  const { total, records, setTotal, setRecords } = usePostsStore(
    (state) => state,
    shallow,
  )
  const searchState = useSearchStore((state) => state, shallow)

  const onSearchWithThrottle = throttle(async (page, pageSize = 10) => {
    const { success, data } = await search({
      ...searchState,
      page,
      pageSize,
    })
    if (success) {
      searchState.setPage(data.page)
      searchState.setPageSize(data.pageSize)
      setTotal(data.total)
      setRecords(data.records)
    }
  }, 1000)

  useEffect(() => {
    searchState.setPage(props.page)
    searchState.setPageSize(props.pageSize)
    setTotal(props.total)
    setRecords(props.records)
  }, [])

  return (
    <>
      <Head>
        <title>JBlog</title>
      </Head>
      <BasicLayout banner showCreate>
        <div className='container mx-auto pt-48 pb-40 relative z-10'>
          <div className='flex flex-col max-w-full lg:w-3/5 gap-y-6'>
            {records.map((post) => (
              <Post key={post._id} {...post} />
            ))}
            <Pager
              page={searchState.page}
              pageSize={searchState.pageSize}
              total={total}
              onChange={onSearchWithThrottle}
            />
          </div>
        </div>
      </BasicLayout>
    </>
  )
}
