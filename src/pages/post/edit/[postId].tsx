import { useEffect } from 'react'
import Head from 'next/head'
import { useRouter } from 'next/router'
import useSWR from 'swr'
import { message as antdMessage, Form } from 'antd'

import { BasicLayout } from '@/layouts/basic.layout'
import { Input, Select, ImagUploader, Editor } from '@/components/form'
import { path, getAll } from '@/shared/services/categories.service'
import { batchCreate } from '@/shared/services/tags.service'
import { uploadPoster } from '@/shared/services/common.service'
import { create, update, getOne } from '@/shared/services/posts.service'
import {
  useSettingsStore,
  getRoundedClass,
} from '@/shared/stores/settings.store'

export default function EditPost() {
  const [formRef] = Form.useForm()
  const router = useRouter()
  const rounded = useSettingsStore((state) => state.rounded)
  const { data: categories } = useSWR(path.getAll, async () => {
    const { data, success } = await getAll()
    if (success) {
      return data
    }
    return []
  })
  useSWR(
    router.query.postId ? `${path.base}/${router.query.postId}` : null,
    async () => {
      const id = router.query.postId
      if (id) {
        if (id === 'create') {
          if (typeof window !== 'undefined') {
            const cachedForm = window.localStorage.getItem('cachedForm')
            if (cachedForm) formRef.setFieldsValue(JSON.parse(cachedForm))
          }
        } else {
          const { data, success } = await getOne(id as string)
          if (success) {
            formRef.setFieldsValue({
              ...data,
              tagNames: data.tags.join(','),
            })
          }
        }
      }
    },
  )

  const onCached = () => {
    const cachedForm = formRef.getFieldsValue()
    if (typeof window !== 'undefined') {
      window.localStorage.setItem('cachedForm', JSON.stringify(cachedForm))
    }
  }

  const onSubmit = async () => {
    if (!(await formRef.validateFields())) return
    const vals = formRef.getFieldsValue()
    const tags = vals['tagNames'].split(',')
    await batchCreate(tags)
    if (vals['_id']) {
      const { _id, tagNames, ...rest } = vals
      const { success, message } = await update(_id, {
        ...rest,
        tags,
      })
      if (success) {
        antdMessage.success(message)
        router.push('/')
      }
    } else {
      const { tagNames, ...rest } = vals
      const { success, message } = await create({
        ...rest,
        tags,
      })
      if (success) {
        antdMessage.success(message)
        router.push('/')
      }
    }
  }

  return (
    <>
      <Head>
        <title>编辑文章</title>
      </Head>
      <BasicLayout showHome>
        <div
          className={`container mx-auto navbar bg-base-100 mt-10 shadow-lg px-6 lg:px-10 ${getRoundedClass(
            rounded,
          )}`}
        >
          <h2 className='font-bold'>编辑文章</h2>
        </div>
        <Form
          labelCol={{ span: 4 }}
          form={formRef}
          colon={false}
          requiredMark={false}
        >
          <div className='container flex justify-between mx-auto py-10 lg:pb-20 relative'>
            <div
              className={`form-control w-full lg:w-3/5 bg-base-100 shadow-lg p-6 lg:p-10 ${getRoundedClass(
                rounded,
              )}`}
            >
              <Form.Item name='_id' hidden></Form.Item>
              <Form.Item
                name='title'
                className='mb-8 lg:mb-10'
                rules={[{ required: true, message: '请输入文章标题' }]}
                label={
                  <span className='text-right text-base-content'>文章标题</span>
                }
              >
                <Input />
              </Form.Item>
              <Form.Item
                name='intro'
                className='mb-8 lg:mb-10'
                rules={[{ required: true, message: '请输入文章简介' }]}
                label={
                  <span className='text-right text-base-content'>文章简介</span>
                }
              >
                <Input />
              </Form.Item>
              <Form.Item
                name='poster'
                className='mb-8 lg:mb-10'
                rules={[{ required: true, message: '请上传文章封面' }]}
                label={
                  <span className='text-right text-base-content'>文章封面</span>
                }
              >
                <ImagUploader
                  limit={1 * 1024 * 1024}
                  action={(file) => uploadPoster({ file })}
                />
              </Form.Item>
              <Form.Item
                name='content'
                className='mb-8 lg:mb-10'
                rules={[{ required: true, message: '请输入文章内容' }]}
              >
                <Editor />
              </Form.Item>
              <Form.Item
                name='category'
                className='mb-8 lg:mb-10 lg:hidden'
                rules={[{ required: true, message: '请选择文章分类' }]}
                label={
                  <span className='text-right text-base-content'>分类</span>
                }
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
                className='mb-8 lg:mb-10 lg:hidden'
                rules={[{ required: true, message: '请输入文章标签' }]}
                label={
                  <span className='text-right text-base-content'>标签</span>
                }
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
                  onClick={onCached}
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
                className='mb-8 lg:mb-10 hidden lg:block'
                rules={[{ required: true, message: '请选择文章分类' }]}
                label={
                  <span className='text-right text-base-content'>分类</span>
                }
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
                className='mb-8 lg:mb-10 hidden lg:block'
                rules={[{ required: true, message: '请输入文章标签' }]}
                label={
                  <span className='text-right text-base-content'>标签</span>
                }
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
                  onClick={onCached}
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
                    onClick={() => formRef.resetFields()}
                  >
                    确定
                  </label>
                </div>
              </div>
            </div>
          </div>
        </Form>
      </BasicLayout>
    </>
  )
}
