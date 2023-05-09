import { FC, useState } from 'react'

import { withForm } from './with-form.component'
import { uploadFile } from '@/shared/services/common.service'
import { IFormUploaderProps } from '@/shared/interfaces/form.interface'
import { PlusIcon, EyeIcon, TrashIcon } from '@heroicons/react/24/outline'

export const FormUploader: FC<IFormUploaderProps> = withForm(
  ({ fieldClassName, hasError, limit, value, onChange, validate }) => {
    const handleFileChange = (e) => {
      if (e.target.files[0]) {
        const file = e.target.files[0]
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
      const { data, success } = await uploadFile({ file })
      if (success) {
        validate()
        onChange(data)
      }
    }

    return (
      <div className={`relative ${fieldClassName ?? ''}`}>
        <div
          className={`flex justify-center items-center w-24 h-24 \
            border text-primary relative overflow-hidden \
            hover:border-primary-focus hover:text-primary-focus \
            ${hasError ? 'border-error' : 'border-primary'}`}
        >
          {value ? (
            [
              <img src={value} alt='poster' />,
              <div
                className='flex justify-around items-center absolute left-0 top-0 \
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
                    validate()
                    onChange('')
                  }}
                />
              </div>,
            ]
          ) : (
            <PlusIcon className='w-8 h-8' />
          )}
        </div>
        <input
          type='file'
          accept='image/*'
          className={`opacity-0 absolute w-24 h-24 left-0 top-0 cursor-pointer \
            ${value ? 'hidden' : 'inline-block'}`}
          onChange={handleFileChange}
        />
        <input type='checkbox' id='preview-modal' className='modal-toggle' />
        <label htmlFor='preview-modal' className='modal'>
          <div className='modal-box w-full lg:w-1/2 max-w-5xl'>
            <img src={value} alt='poster' className='w-full' />
          </div>
        </label>
      </div>
    )
  },
)
