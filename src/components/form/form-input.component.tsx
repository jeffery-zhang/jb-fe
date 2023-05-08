import { FC, useState } from 'react'
import EyeIcon from '@heroicons/react/24/outline/EyeIcon'
import EyeSlashIcon from '@heroicons/react/24/outline/EyeSlashIcon'

import { IFormInputProps } from '@/shared/interfaces/form.interface'
import { withForm } from './with-form.component'

export const FormInput: FC<IFormInputProps> = withForm(
  ({
    fieldClassName,
    placeholder,
    prefix,
    suffix,
    type,
    disabled,
    value,
    hasError,
    onChange,
    validate,
  }) => {
    const [showPwd, setShowPwd] = useState(false)

    return (
      <div className={`relative ${fieldClassName ?? ''}`}>
        <input
          className={`input input-bordered input-primary \
            input-sm lg:input-md w-full \
            ${hasError ? 'input-error' : ''} \
            ${prefix ? 'pl-10 lg:pl-10' : ''} \
            ${suffix || type === 'password' ? 'pr-10 lg:pr-10' : ''}`}
          type={showPwd ? 'text' : type}
          disabled={disabled}
          value={value}
          onChange={(e) => {
            const val = e.target.value
            validate(val)
            onChange(val)
          }}
          onBlur={() => validate()}
          placeholder={placeholder}
        />
        {prefix ? (
          <div className='absolute inset-y-0 flex justify-center items-center pl-3'>
            {prefix}
          </div>
        ) : null}
        {suffix && type !== 'password' ? (
          <div className='absolute inset-y-0 right-0 flex justify-center items-center pr-3'>
            {suffix}
          </div>
        ) : null}
        {type === 'password' ? (
          <div className='absolute inset-y-0 right-0 flex justify-center items-center pr-3'>
            {showPwd ? (
              <EyeSlashIcon
                className='w-5 cursor-pointer'
                onClick={() => setShowPwd(!showPwd)}
              />
            ) : (
              <EyeIcon
                className='w-5 cursor-pointer'
                onClick={() => setShowPwd(!showPwd)}
              />
            )}
          </div>
        ) : null}
      </div>
    )
  },
)
