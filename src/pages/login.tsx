import { useState, useEffect } from 'react'
import { message } from 'antd'
import { useRouter } from 'next/router'
import UserCircleIcon from '@heroicons/react/24/outline/UserCircleIcon'
import LockClosedIcon from '@heroicons/react/24/outline/LockClosedIcon'

import { BasicLayout } from '@/layouts/basic.layout'
import { FormItem } from '@/components/form-item.component'
import { Logo } from '@/components/header.component'
import { login } from '@/shared/services/auth.service'
import { useUserStore } from '@/stores/user.store'

export default function Login() {
  const router = useRouter()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [inited, setInited] = useState(false)
  const [loading, setLoading] = useState(false)
  const setLoginState = useUserStore((state) => state.login)
  useEffect(() => {
    setInited(true)
  }, [])

  const handleLogin = async () => {
    if (!username || !password) {
      message.error('请输入用户名和密码')
      return
    }
    setLoading(true)
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
          className={`w-full md:max-w-md 2xl:max-w-2xl mx-4 px-6 md:px-24 2xl:px-36 py-12 rounded-lg bg-white shadow-lg \
          transition-all duration-1000 ease-in-out \
          ${inited ? 'translate-y-0 opacity-1' : 'translate-y-2/4 opacity-0'}`}
        >
          <Logo className='text-center mb-8 2xl:12' />
          <FormItem
            className='mb-8 2xl:mb-12'
            placeholder='请输入用户名'
            required
            value={username}
            onChange={setUsername}
            prefix={<UserCircleIcon className='w-5' />}
          />
          <FormItem
            className='mb-8 2xl:mb-12'
            placeholder='请输入密码'
            type='password'
            required
            value={password}
            onChange={setPassword}
            prefix={<LockClosedIcon className='w-5' />}
          />
          <button
            className={`btn btn-primary btn-block btn-md 2xl:btn-lg \
              ${loading ? 'loading' : ''}`}
            onClick={() => handleLogin()}
          >
            登录
          </button>
        </div>
      </div>
    </BasicLayout>
  )
}
