import { useEffect } from 'react'
import useSWR from 'swr'
import { useRouter } from 'next/router'
import { message as antdMessage, Form } from 'antd'

import { BasicLayout } from '@/layouts/basic.layout'
import { Input, Select, FormUploader, Editor } from '@/components/form'
import { usePostFormStore, initPostForm } from '@/shared/stores/post.store'
import { path, getAll } from '@/shared/services/categories.service'
import { batchCreate } from '@/shared/services/tags.service'
import { getOne } from '@/shared/services/posts.service'
import { create, update } from '@/shared/services/posts.service'
import {
  useSettingsStore,
  getRoundedClass,
} from '@/shared/stores/settings.store'

export default function EditPost() {
  const [formRef] = Form.useForm()
  const router = useRouter()
  const { form, setForm, resetForm } = usePostFormStore()
  const rounded = useSettingsStore((state) => state.rounded)
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
      if (router.query.postId === 'create') {
        setForm(initPostForm)
      } else {
        getPostDetail()
      }
    }
  }, [router.query.postId])

  return (
    <BasicLayout showHome>
      <div
        className={`container mx-auto navbar bg-base-100 mt-10 shadow-lg px-6 lg:px-10 ${getRoundedClass(
          rounded,
        )}`}
      >
        <h2 className='font-bold'>编辑文章</h2>
      </div>
      <Form labelCol={{ span: 4 }} form={formRef}>
        <div className='container flex justify-between mx-auto py-10 lg:pb-20 relative'>
          <div
            className={`form-control w-full lg:w-3/5 bg-base-100 shadow-lg p-6 lg:p-10 ${getRoundedClass(
              rounded,
            )}`}
          >
            <Form.Item
              name='title'
              label={
                <span className='text-right text-base-content'>文章标题</span>
              }
              className='mb-8 lg:mb-10'
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='intro'
              label={
                <span className='text-right text-base-content'>文章简介</span>
              }
              className='mb-8 lg:mb-10'
            >
              <Input />
            </Form.Item>
            <Form.Item
              name='poster'
              label={
                <span className='text-right text-base-content'>文章封面</span>
              }
              className='mb-8 lg:mb-10'
            >
              <FormUploader limit={2 * 1024 * 1024} accept='image/*' />
            </Form.Item>
            <Editor
              value={form.content}
              onChange={(val) => setForm({ content: val })}
            />
            <Form.Item
              name='category'
              label={<span className='text-right text-base-content'>分类</span>}
              className='mb-8 lg:mb-10 lg:hidden'
            >
              <Select
                options={
                  categories?.map(({ name }) => ({
                    label: name,
                    value: name,
                  })) || []
                }
              />
            </Form.Item>
            <Form.Item
              name='tagNames'
              label={<span className='text-right text-base-content'>标签</span>}
              className='mb-8 lg:mb-10 lg:hidden'
            >
              <Input placeholder='标签之间用逗号(,)分隔' />
            </Form.Item>
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
          <div
            className={`hidden lg:block ml-10 form-control flex-1 bg-base-100 shadow-lg p-6 lg:p-10 ${getRoundedClass(
              rounded,
            )}`}
          >
            <Form.Item
              name='category'
              label={<span className='text-right text-base-content'>分类</span>}
              className='mb-8 lg:mb-10 hidden lg:block'
            >
              <Select
                options={
                  categories?.map(({ name }) => ({
                    label: name,
                    value: name,
                  })) || []
                }
              />
            </Form.Item>
            <Form.Item
              name='tagNames'
              labelCol={{ span: 4 }}
              label={<span className='text-right text-base-content'>标签</span>}
              className='mb-8 lg:mb-10 hidden lg:block'
            >
              <Input placeholder='标签之间用逗号(,)分隔' />
            </Form.Item>
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
                className='btn btn-secondary btn-sm lg:btn-md ml-6'
              >
                暂存文章
              </button>
              <button
                onClick={onSubmit}
                className='btn btn-primary btn-sm lg:btn-md ml-6'
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
      </Form>
    </BasicLayout>
  )
}
