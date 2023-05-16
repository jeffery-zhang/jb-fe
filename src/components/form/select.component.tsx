import { FC, useState } from 'react'

import { ISelectProps } from '@/shared/interfaces/form.interface'

export const Select: FC<ISelectProps> = ({
  className,
  placeholder,
  disabled,
  value,
  options,
  onChange,
}) => {
  const [val, setVal] = useState('')

  return (
    <div className={`relative ${className}`}>
      <select
        className={`select select-bordered select-primary \
          select-sm lg:select-md w-full text-base-content`}
        onChange={(e) => {
          const val = e.target.value
          setVal(val)
          onChange?.(val)
        }}
        value={value || val}
        disabled={disabled}
      >
        <option disabled value=''>
          {placeholder}
        </option>
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            disabled={option.disabled}
          >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  )
}
