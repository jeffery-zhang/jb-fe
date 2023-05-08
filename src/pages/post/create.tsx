import useSWR from 'swr'

import { BasicLayout } from '@/layouts/basic.layout'
import { FormInput, FormSelect } from '@/components/form'
import { usePostFormStore } from '@/shared/stores/post.store'
import { path, getAll } from '@/shared/services/categories.service'

export default function CreatePost() {
  const { form, setForm, resetForm } = usePostFormStore()
  const { data: categories } = useSWR(path.getAll, async () => {
    const { data, success } = await getAll()
    if (success) {
      return data
    }
    return []
  })

  return (
    <BasicLayout>
      <div className='container mx-auto py-10 lg:py-20 relative z-10'>
        <div className='form-control max-w-full lg:w-3/5 gap-y-6 bg-base-100 rounded-lg shadow-lg p-6 lg:p-10'>
          <FormInput
            label='文章标题'
            value={form.title}
            onChange={(val) => setForm({ title: val })}
          />
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
          <div className='flex justify-end'>
            <button
              onClick={resetForm}
              className='btn btn-secondary btn-sm lg:btn-md'
            >
              重置内容
            </button>
            <button className='btn btn-primary btn-sm lg:btn-md ml-6 lg:ml-8'>
              发布文章
            </button>
          </div>
        </div>
      </div>
    </BasicLayout>
  )
}
