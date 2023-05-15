import { ReactNode } from 'react'

export interface IFormFieldProps {
  className?: string
  placeholder?: string
  disabled?: boolean
  value?: string
  onChange?: (value: string) => void
}

export interface IInputProps extends IFormFieldProps {
  prefix?: ReactNode | null
  suffix?: ReactNode | null
  type?: 'text' | 'password'
}

export interface ISelectProps extends IFormFieldProps {
  options: IOptionsItem[]
}

export interface IFormEditorProps extends IFormFieldProps {}

export interface IImagUploaderProps extends IFormFieldProps {
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
