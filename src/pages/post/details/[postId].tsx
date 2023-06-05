import { Viewer } from '@bytemd/react'
import Head from 'next/head'
import dayjs from 'dayjs'
import { EyeIcon } from '@heroicons/react/24/outline'

import { siblingsTwo, viewOne } from '@/shared/services/posts.service'
import { IPost, TSiblingsTwoData } from '@/shared/interfaces/post.interface'
import { BasicLayout } from '@/layouts/basic.layout'
import { Img } from '@/components/image.component'
import { Tag } from '@/components/tag.component'
import { Siblings } from '@/components/siblings.component'
import {
  useSettingsStore,
  getRoundedClass,
} from '@/shared/stores/settings.store'

interface IProps {
  post: IPost | null
  siblings: TSiblingsTwoData
}

export async function getServerSideProps({ params }) {
  const props: IProps = {
    post: null,
    siblings: {},
  }
  const { data, success } = await viewOne(params.postId)
  const { data: siblings, success: siblingsSuccess } = await siblingsTwo(
    params.postId,
  )
  if (success) {
    props['post'] = data
  }
  if (siblingsSuccess) {
    props['siblings'] = siblings
  }
  return {
    props,
  }
}

export default function Detail(props: IProps) {
  const rounded = useSettingsStore((state) => state.rounded)
  const { post, siblings } = props

  if (!post) return null

  return (
    <>
      <Head>
        <title>{`${post.title} - ${post.username}`}</title>
      </Head>
      <BasicLayout banner showHome>
        <div className='container mx-auto pt-48 pb-40 relative z-10'>
          <div
            className={`max-w-full lg:w-3/5 px-4 md:px-8 lg:px-12 py-24 bg-base-100 markdown-body shadow-lg ${getRoundedClass(
              rounded,
            )}`}
          >
            <article className='prose max-w-full prose-sm lg:prose-lg border-b border-secondary-focus'>
              <div>
                <Img
                  className='mx-auto max-w-full'
                  shouldRender={false}
                  src={post.poster}
                  alt={post.title}
                  width={640}
                  height={480}
                />
              </div>
              <h1 className='text-center py-12 border-b border-secondary-focus'>
                {post.title}
              </h1>
              <div className='flex justify-end items-center'>
                <EyeIcon className='w-6 h-6 mr-2' />
                {post.pv}
              </div>
              <blockquote>作者: {post.username}</blockquote>
              <blockquote>
                发布: {dayjs(post.createTime).format('YYYY-MM-DD HH:mm:ss')}
              </blockquote>
              <blockquote>
                更新: {dayjs(post.updateTime).format('YYYY-MM-DD HH:mm:ss')}
              </blockquote>
              <blockquote>分类: {post.category}</blockquote>
              <blockquote
                className={`${
                  post.tags && post.tags.length ? 'block' : 'hidden'
                } flex items-start`}
              >
                <span className='w-12'>标签: </span>
                <span>
                  {post.tags.map((tag) => (
                    <Tag name={tag} />
                  ))}
                </span>
              </blockquote>
              <Viewer value={post.content} />
            </article>
            <Siblings prev={siblings.prev} next={siblings.next} />
          </div>
        </div>
      </BasicLayout>
    </>
  )
}
