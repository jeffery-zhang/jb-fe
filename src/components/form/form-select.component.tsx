import { FC, useState } from 'react'

import { IFormSelectProps } from '@/shared/interfaces/form.interface'
import { withForm } from './with-form.component'

export const FormSelect: FC<IFormSelectProps> = withForm(
  ({
    fieldClassName,
    placeholder,
    disabled,
    value,
    options,
    hasError,
    onChange,
    validate,
  }) => {
    return (
      <div className={`relative ${fieldClassName}`}>
        <select
          className={`select select-bordered select-primary \
            select-sm lg:select-md w-full \
            ${hasError ? 'select-error' : ''}`}
          onBlur={() => validate()}
          onChange={(e) => {
            const val = e.target.value
            validate(val)
            onChange(val)
          }}
          value={value}
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
  },
)
