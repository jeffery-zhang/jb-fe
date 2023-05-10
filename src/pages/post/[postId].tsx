import { useRouter } from 'next/router'
import { Viewer } from '@bytemd/react'

import { getAllIds, getOne } from '@/shared/services/posts.service'
import { IPost } from '@/shared/interfaces/post.interface'
import { BasicLayout } from '@/layouts/basic.layout'

export const getStaticPaths = async () => {
  const paths: { params: { postId: string } }[] = []
  const { data, success } = await getAllIds()
  if (success) {
    paths.push(...data.map(({ _id }) => ({ params: { postId: _id } })))
  }
  return {
    paths,
    fallback: 'blocking',
  }
}

export const getStaticProps = async ({ params }) => {
  const { data, success } = await getOne(params.postId)
  if (success) {
    return {
      props: data,
    }
  }
  return {
    props: {},
  }
}

export default function Detail(props: IPost) {
  return (
    <BasicLayout banner>
      <div className='container mx-auto pt-48 pb-20 relative z-10'>
        <div className='max-w-full lg:w-3/5 px-6 py-12 bg-base-100 markdown-body rounded-lg shadow-lg'>
          <Viewer value={props.content} />
        </div>
      </div>
    </BasicLayout>
  )
}
