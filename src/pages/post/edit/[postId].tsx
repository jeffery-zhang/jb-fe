import { useEffect } from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { message as antdMessage } from 'antd'

import { BasicLayout } from '@/layouts/basic.layout'
import { FormInput, FormSelect, FormUploader, Editor } from '@/components/form'
import { usePostFormStore, initPostForm } from '@/shared/stores/post.store'
import { path, getAll } from '@/shared/services/categories.service'
import { batchCreate } from '@/shared/services/tags.service'
import { getOne } from '@/shared/services/posts.service'
import { create, update } from '@/shared/services/posts.service'

export default function EditPost() {
  const router = useRouter()
  const { form, setForm, resetForm } = usePostFormStore()
  const { data: categories } = useSWR(path.getAll, async () => {
    const { data, success } = await getAll()
    if (success) {
      return data
    }
    return []
  })

  const getPostDetail = async () => {
    const { data, success } = await getOne(router.query.postId as string)
    if (success) {
      setForm({
        ...data,
        tagNames: data.tags.join(','),
      })
    }
  }

  const onSubmit = async () => {
    const tags = form.tagNames.split(',')
    await batchCreate(tags)
    if (form._id) {
      const { _id, ...rest } = form
      const { success, message } = await update(_id, {
        ...rest,
        tags: rest.tagNames.split(','),
      })
      if (success) {
        antdMessage.success(message)
        router.push('/')
      }
    } else {
      const { success, message } = await create({
        ...form,
        tags: form.tagNames.split(','),
      })
      if (success) {
        antdMessage.success(message)
        router.push('/')
      }
    }
  }

  useEffect(() => {
    if (router.query.postId) {
      getPostDetail()
    } else {
      setForm(initPostForm)
    }
  }, [router.query.postId])

  return (
    <BasicLayout>
      <div className='container mx-auto navbar bg-base-100 mt-10 shadow-lg rounded-lg px-6 lg:px-10'>
        <h2 className='font-bold'>编辑文章</h2>
      </div>
      <div className='container flex justify-between mx-auto py-10 lg:pb-20 relative'>
        <div className='form-control w-full lg:w-3/5 bg-base-100 rounded-lg shadow-lg p-6 lg:p-10'>
          <FormInput
            label='文章标题'
            value={form.title}
            onChange={(val) => setForm({ title: val })}
          />
          <FormInput
            label='简介'
            value={form.intro}
            onChange={(val) => setForm({ intro: val })}
          />
          <FormUploader
            label='封面图'
            value={form.poster}
            limit={2 * 1024 * 1024}
            onChange={(val) => setForm({ poster: val })}
          />
          <Editor
            value={form.content}
            onChange={(val) => setForm({ content: val })}
          />
          <FormSelect
            className='lg:hidden'
            label='分类'
            options={
              categories?.map(({ name, _id }) => ({
                label: name,
                value: _id,
              })) || []
            }
            value={form.category}
            onChange={(val) => setForm({ category: val })}
          />
          <FormInput
            className='lg:hidden'
            label='标签(标签之间用逗号(,)分隔)'
            value={form.tagNames}
            onChange={(val) => setForm({ tagNames: val })}
            placeholder='标签之间用逗号(,)分隔'
          />
          <div className='flex justify-end lg:hidden'>
            <label
              htmlFor='resetModal'
              className='btn btn-error btn-sm lg:btn-md'
            >
              重置内容
            </label>
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.localStorage.setItem(
                    'tempPostForm',
                    JSON.stringify(form),
                  )
                }
              }}
              className='btn btn-secondary btn-sm lg:btn-md ml-6 lg:ml-8'
            >
              暂存文章
            </button>
            <button
              onClick={onSubmit}
              className='btn btn-primary btn-sm lg:btn-md ml-6 lg:ml-8'
            >
              发布文章
            </button>
          </div>
        </div>
        <div className='hidden lg:block ml-10 form-control flex-1 bg-base-100 rounded-lg shadow-lg p-6 lg:p-10'>
          <FormSelect
            label='分类'
            options={
              categories?.map(({ name, _id }) => ({
                label: name,
                value: _id,
              })) || []
            }
            value={form.category}
            onChange={(val) => setForm({ category: val })}
          />
          <FormInput
            label='标签(标签之间用逗号(,)分隔)'
            value={form.tagNames}
            onChange={(val) => setForm({ tagNames: val })}
            placeholder='标签之间用逗号(,)分隔'
          />
          <div className='flex justify-end'>
            <label
              htmlFor='resetModal'
              className='btn btn-error btn-sm lg:btn-md'
            >
              重置内容
            </label>
            <button
              onClick={() => {
                if (typeof window !== 'undefined') {
                  window.localStorage.setItem(
                    'tempPostForm',
                    JSON.stringify(form),
                  )
                }
              }}
              className='btn btn-secondary btn-sm lg:btn-md ml-6 lg:ml-8'
            >
              暂存文章
            </button>
            <button
              onClick={onSubmit}
              className='btn btn-primary btn-sm lg:btn-md ml-6 lg:ml-8'
            >
              发布文章
            </button>
          </div>
        </div>
        <input type='checkbox' id='resetModal' className='modal-toggle' />
        <div className='modal'>
          <div className='modal-box'>
            <p className='py-4'>未保存的内容将会丢失, 确定要重置吗?</p>
            <div className='modal-action'>
              <label htmlFor='resetModal' className='btn btn-outline'>
                取消
              </label>
              <label
                htmlFor='resetModal'
                className='btn btn-error'
                onClick={resetForm}
              >
                确定
              </label>
            </div>
          </div>
        </div>
      </div>
    </BasicLayout>
  )
}
