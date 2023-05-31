import { FC, useState } from 'react'
import { EyeIcon, TrashIcon } from '@heroicons/react/24/outline'

import { IImagUploaderProps } from '@/shared/interfaces/form.interface'
import { Img } from '@/components/image.component'
import {
  useSettingsStore,
  getRoundedClass,
} from '@/shared/stores/settings.store'

export const ImagUploader: FC<IImagUploaderProps> = ({
  className,
  limit = 2 * 1024 * 1024,
  action,
  value,
  onChange,
}) => {
  const [val, setVal] = useState('')
  const rounded = useSettingsStore((state) => state.rounded)

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      const file = e.target.files[0]
      console.log(file)
      const available = beforeUpload(file)
      available && onUpload(file)
    }
  }

  const beforeUpload = (file: File): boolean => {
    if (limit) {
      return file.size <= limit
    }

    return true
  }

  const onUpload = async (file: File) => {
    if (!action || typeof action !== 'function') return
    const { data, success } = await action(file)
    if (success) {
      setVal(data)
      onChange?.(data)
    }
  }

  return (
    <div className={`relative ${className ?? ''}`}>
      <div className='relative flex justify-start items-center'>
        <input
          type='file'
          accept={'image/*'}
          className='absolute left-0 top-0 w-32 h-12 opacity-0 cursor-pointer'
          style={{ display: 'inline' }}
          onChange={handleFileChange}
        />
        <div
          className={`w-32 h-12 flex justify-center items-center bg-primary text-primary-content \
          rounded-tr-none rounded-br-none \
          ${getRoundedClass(rounded)}`}
        >
          选择图片
        </div>
        <input
          className={`input input-bordered input-primary input-sm flex-1 \
          lg:input-md text-base-content rounded-tl-none rounded-bl-none \
          ${getRoundedClass(rounded)}`}
          value={value || val}
          onChange={(e) => {
            const inputValue = e.target.value
            setVal(inputValue)
            onChange?.(inputValue)
          }}
        />
      </div>
      {value ? (
        <div
          className={`flex justify-center items-center w-24 h-24 mt-2 bg-white \
          border border-primary text-primary relative gap-2 overflow-hidden`}
        >
          <Img
            src={value || val}
            alt='poster'
            width={120}
            height={120}
            className='object-cover'
          />
          <div
            className='flex justify-around items-center absolute left-0 top-0 z-10 \
            w-full h-full transition-all duration-300 ease-in-out \
            bg-base-content opacity-100 lg:bg-transparent lg:opacity-0 \
            hover:opacity-100 hover:bg-base-content bg-opacity-30 hover:bg-opacity-30'
          >
            <label htmlFor='preview-modal'>
              <EyeIcon className='text-base-100 w-6 h-6 cursor-pointer' />
            </label>
            <TrashIcon
              className='text-base-100 w-6 h-6 cursor-pointer'
              onClick={() => {
                setVal('')
                onChange?.('')
              }}
            />
          </div>
        </div>
      ) : null}
      <input type='checkbox' id='preview-modal' className='modal-toggle' />
      <label htmlFor='preview-modal' className='modal'>
        <div className='modal-box w-full lg:w-1/2 max-w-5xl'>
          <Img
            src={value || val}
            alt='poster'
            width={640}
            height={480}
            className='max-w-full'
          />
        </div>
      </label>
    </div>
  )
}
