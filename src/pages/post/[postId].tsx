import Image from 'next/image'
import { useRouter } from 'next/router'
import { Viewer } from '@bytemd/react'
import dayjs from 'dayjs'

import { getAllIds, getOne } from '@/shared/services/posts.service'
import { IPost } from '@/shared/interfaces/post.interface'
import { BasicLayout } from '@/layouts/basic.layout'
import { Img } from '@/components/image.component'

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
        <div className='max-w-full lg:w-4/5 px-4 md:px-8 lg:px-12 py-24 bg-base-100 markdown-body rounded-lg shadow-lg'>
          <article className='prose max-w-full prose-sm lg:prose-lg'>
            <div>
              <Img
                className='mx-auto max-w-fit'
                shouldRender={false}
                src={props.poster}
                alt={props.title}
                width={640}
                height={480}
              />
            </div>
            <h1 className='text-center py-6 border-b border-primary'>
              {props.title}
            </h1>
            <blockquote>作者: {props.username}</blockquote>
            <blockquote>
              发布时间: {dayjs(props.createTime).format('YYYY-MM-DD HH:mm:ss')}
            </blockquote>
            <Viewer value={props.content} />
          </article>
        </div>
      </div>
    </BasicLayout>
  )
}
