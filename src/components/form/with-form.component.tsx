import { ComponentType, useState } from 'react'

import { IFormProps, IFormItemProps } from '@/shared/interfaces/form.interface'
import { validate } from '@/shared/utils/form-validator'

export const withForm = <T extends IFormItemProps>(
  Component: ComponentType<T & IFormProps>,
) => {
  const WithForm = (props: T) => {
    const [hasError, setError] = useState(false)
    const [msg, setMsg] = useState('')

    const handleValidate = (currentVal: any) => {
      validate(currentVal ?? props.value, props.rules ?? []).then((result) => {
        if (!result.valid) {
          setError(true)
          setMsg(result.message)
        } else {
          setError(false)
          setMsg('')
        }
      })
    }

    return (
      <div className={`relative mb-8 lg:mb-10 ${props.className ?? ''}`}>
        {props.label && (
          <label className={`label ${props.labelClassName ?? ''}`}>
            <span className='label-text'>{props.label}</span>
          </label>
        )}
        <Component {...props} hasError={hasError} validate={handleValidate} />
        <div
          className={`absolute left-0 text-error text-sm translate-y-1 \
            ${hasError ? 'block' : 'hidden'}`}
        >
          {msg}
        </div>
      </div>
    )
  }

  return WithForm
}
