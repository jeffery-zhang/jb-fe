import { Viewer } from '@bytemd/react'
import dayjs from 'dayjs'

import { getAllIds, viewOne } from '@/shared/services/posts.service'
import { IPost } from '@/shared/interfaces/post.interface'
import { BasicLayout } from '@/layouts/basic.layout'
import { Img } from '@/components/image.component'
import {
  useSettingsStore,
  getRoundedClass,
} from '@/shared/stores/settings.store'

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
  const { data, success } = await viewOne(params.postId)
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
  const rounded = useSettingsStore((state) => state.rounded)

  return (
    <BasicLayout banner showHome>
      <div className='container mx-auto pt-48 pb-40 relative z-10'>
        <div
          className={`max-w-full lg:w-3/5 px-4 md:px-8 lg:px-12 py-24 bg-base-100 markdown-body shadow-lg ${getRoundedClass(
            rounded,
          )}`}
        >
          <article className='prose max-w-full prose-sm lg:prose-lg'>
            <div>
              <Img
                className='mx-auto max-w-full'
                shouldRender={false}
                src={props.poster}
                alt={props.title}
                width={640}
                height={480}
              />
            </div>
            <h1 className='text-center py-6 border-b border-base-200'>
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
