import Image from 'next/image'
import { UserOutlined } from '@ant-design/icons'

import { useUserStore } from '@/stores/user.store'
import DefaultAvatar from '../../public/doge.svg'

export const Avatar = () => {
  const { user, isLogin } = useUserStore()

  return isLogin ? (
    <div
      className={`flex justify-center items-center w-8 h-8 ml-6 cursor-pointer rounded-full ${
        user?.avatar ? '' : 'bg-blue-400'
      }`}
    >
      <Image src={user?.avatar || DefaultAvatar} alt={user?.username || ''} />
    </div>
  ) : (
    <div
      className='flex justify-center items-center w-8 h-8 ml-6 cursor-pointer rounded-full \
        hover:bg-blue-400 border border-gray-400 hover:border-blue-400 text-gray-400 hover:text-white \
        transition-colors duration-300 ease-in-out'
    >
      <UserOutlined />
    </div>
  )
}
