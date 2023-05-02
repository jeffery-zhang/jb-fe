import { FC, ReactNode, useState } from 'react'
import EyeIcon from '@heroicons/react/24/outline/EyeIcon'
import EyeSlashIcon from '@heroicons/react/24/outline/EyeSlashIcon'

interface IFormItemProps {
  className?: string
  prefix?: ReactNode | null
  suffix?: ReactNode | null
  required?: boolean
  placeholder?: string
  disabled?: boolean
  type?: string
  value: string
  onChange: (value: string) => void
}

export const FormItem: FC<IFormItemProps> = ({
  className,
  placeholder,
  prefix,
  suffix,
  required,
  type,
  disabled,
  value,
  onChange,
}) => {
  const [hasErr, setErr] = useState(false)
  const [showPwd, setShowPwd] = useState(false)

  const handleBlur = () => {
    if (required && !value) setErr(true)
    else setErr(false)
  }

  return (
    <div
      className={`relative form-control \
      ${className}`}
    >
      <input
        className={`input input-bordered input-primary w-full \
          ${hasErr ? 'input-error' : ''} \
          ${prefix ? 'pl-10' : ''} \
          ${suffix || type === 'password' ? 'pr-10' : ''}`}
        type={showPwd ? 'text' : type}
        disabled={disabled}
        value={value}
        onChange={(e) => {
          const val = e.target.value
          if (required && !val) setErr(true)
          else setErr(false)
          onChange(val)
        }}
        onBlur={handleBlur}
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
