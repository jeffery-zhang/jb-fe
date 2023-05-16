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

export interface IImagUploaderProps extends IFormFieldProps {
  limit?: number
  action?: (file: File) => Promise<any>
}

export interface IEditorProps extends IFormFieldProps {}

export interface IOptionsItem {
  label: string
  value: string
  disabled?: boolean
}
