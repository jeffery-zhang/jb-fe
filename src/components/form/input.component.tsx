import { FC, useState } from 'react'
import EyeIcon from '@heroicons/react/24/outline/EyeIcon'
import EyeSlashIcon from '@heroicons/react/24/outline/EyeSlashIcon'

import { IInputProps } from '@/shared/interfaces/form.interface'
import {
  useSettingsStore,
  getRoundedClass,
} from '@/shared/stores/settings.store'

export const Input: FC<IInputProps> = ({
  className,
  placeholder,
  prefix,
  suffix,
  type,
  disabled,
  value,
  onChange,
  onKeydown,
}) => {
  const [showPwd, setShowPwd] = useState(false)
  const [val, setVal] = useState('')
  const rounded = useSettingsStore((state) => state.rounded)

  return (
    <div className={`relative ${className ?? ''}`}>
      <input
        className={`input input-bordered input-primary \
          input-sm lg:input-md w-full text-base-content \
          ${getRoundedClass(rounded)} \
          ${false ? 'input-error' : ''}
          ${prefix ? 'pl-10 lg:pl-10' : ''} \
          ${suffix || type === 'password' ? 'pr-10 lg:pr-10' : ''}`}
        type={showPwd ? 'text' : type}
        disabled={disabled}
        value={value || val}
        onChange={(e) => {
          const inputValue = e.target.value
          setVal(inputValue)
          onChange?.(inputValue)
        }}
        onKeyDown={(e) => onKeydown?.(e)}
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
}
