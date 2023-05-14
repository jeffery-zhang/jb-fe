import { ReactNode } from 'react'

export interface IFormProps {
  hasError: boolean
  validate: (currentVal?: any) => void
}

export interface IFormItemProps {
  className?: string
  placeholder?: string
  disabled?: boolean
  value?: string
  onChange?: (value: string) => void
}

export interface IInputProps extends IFormItemProps {
  prefix?: ReactNode | null
  suffix?: ReactNode | null
  type?: 'text' | 'password'
}

export interface ISelectProps extends IFormItemProps {
  options: IOptionsItem[]
}

export interface IFormEditorProps extends IFormItemProps {}

export interface IFormUploaderProps extends IFormItemProps {
  accept?: string
  limit?: number
}

export interface IEditorProps {
  value: any
  onChange: (val: any) => void
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
