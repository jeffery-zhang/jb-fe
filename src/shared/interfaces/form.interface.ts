import { ReactNode } from 'react'

export interface IFormProps {
  hasError: boolean
  validate: (currentVal?: any) => void
}

export interface IFormItemProps {
  className?: string
  label?: string
  labelClassName?: string
  fieldClassName?: string
  placeholder?: string
  disabled?: boolean
  value: string
  rules?: IRuleItem[]
  onChange: (value: string) => void
}

export interface IFormInputProps extends IFormItemProps {
  prefix?: ReactNode | null
  suffix?: ReactNode | null
  type?: 'text' | 'password'
}

export interface IFormSelectProps extends IFormItemProps {
  options: IOptionsItem[]
}

export interface IOptionsItem {
  label: string
  value: string
  disabled?: boolean
}

export interface IRuleItem {
  required?: boolean
  pattern?: RegExp
  type?: 'string' | 'number' | 'array' | 'any' | 'boolean'
  max?: number
  min?: number
  message?: string
}

export interface IValidatorResult {
  valid: boolean
  message: string
}
