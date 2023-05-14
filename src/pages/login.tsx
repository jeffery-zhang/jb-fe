import { useState, useEffect } from 'react'
import { message, Form } from 'antd'
import { useRouter } from 'next/router'
import UserCircleIcon from '@heroicons/react/24/outline/UserCircleIcon'
import LockClosedIcon from '@heroicons/react/24/outline/LockClosedIcon'

import { BasicLayout } from '@/layouts/basic.layout'
import { Input } from '@/components/form'
import { Logo } from '@/components/header/logo.component'
import { login } from '@/shared/services/auth.service'
import { useUserStore } from '@/shared/stores/user.store'
import {
  useSettingsStore,
  getRoundedClass,
} from '@/shared/stores/settings.store'

export default function Login() {
  const [form] = Form.useForm()
  const router = useRouter()
  const rounded = useSettingsStore((state) => state.rounded)
  const [inited, setInited] = useState(false)
  const [loading, setLoading] = useState(false)
  const setLoginState = useUserStore((state) => state.login)
  useEffect(() => {
    setInited(true)
  }, [])

  const handleLogin = async () => {
    if (!(await form.validateFields())) return
    setLoading(true)
    const { username, password } = form.getFieldsValue()
    const { data, success } = await login({ username, password })
    if (success) {
      const { id, username, mail, avatar, token } = data
      setLoginState(
        {
          username,
          id,
          mail,
          avatar,
        },
        token,
      )
      router.push('/')
    }
    setLoading(false)
  }

  return (
    <BasicLayout>
      <div className='w-full h-full flex justify-center items-center'>
        <div
          className={`w-full md:max-w-md 2xl:max-w-2xl mx-4 px-6 md:px-24 2xl:px-36 py-12 bg-base-100 shadow-lg \
          transition-all duration-1000 ease-in-out \
          ${inited ? 'translate-y-0 opacity-1' : 'translate-y-2/4 opacity-0'} \
          ${getRoundedClass(rounded)}`}
        >
          <Form form={form} name='LoginForm'>
            <Form.Item className='mb-8 lg:mb-10'>
              <Logo className='text-center' />
            </Form.Item>
            <Form.Item
              className='mb-8 lg:mb-10'
              name='username'
              rules={[{ required: true, message: '请输入用户名' }]}
            >
              <Input
                placeholder='请输入用户名'
                prefix={<UserCircleIcon className='w-5' />}
              />
            </Form.Item>
            <Form.Item
              className='mb-8 lg:mb-10'
              name='password'
              rules={[{ required: true, message: '请输入密码' }]}
            >
              <Input
                placeholder='请输入密码'
                type='password'
                prefix={<LockClosedIcon className='w-5' />}
              />
            </Form.Item>
            <Form.Item className='mb-8 lg:mb-10'>
              <button
                className={`btn btn-primary btn-block btn-md 2xl:btn-lg \
                ${loading ? 'loading' : ''}`}
                onClick={handleLogin}
              >
                登录
              </button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </BasicLayout>
  )
}
