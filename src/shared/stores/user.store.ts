import { create } from 'zustand'

import { UserDataType } from '../interfaces/user.interface'

interface IUserStore {
  user: UserDataType | null
  token: string
  isLogin: boolean
  login: (user: UserDataType, token: string) => void
  logout: () => void
}

export const useUserStore = create<IUserStore>((set) => ({
  user: null,
  token: '',
  isLogin: false,
  login: (user, token) => {
    if (!user || !token) return
    if (typeof window !== 'undefined')
      window.localStorage.setItem('token', token)
    set({ user, token, isLogin: true })
  },
  logout: () => {
    if (typeof window !== 'undefined') window.localStorage.removeItem('token')
    set({ user: null, token: '', isLogin: false })
  },
}))
