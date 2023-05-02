import { create } from 'zustand'

interface IUserStore {
  user: IUser | null
  token: string
  isLogin: boolean
  login: (user: IUser, token: string) => void
  logout: () => void
}

interface IUser {
  id: string
  username: string
  mail: string
  avatar: string
}

export const useUserStore = create<IUserStore>((set) => ({
  user: null,
  token: '',
  isLogin: false,
  login: (user, token) => {
    if (!user || !token) return
    if (window) window.localStorage.setItem('token', token)
    set({ user, token, isLogin: true })
  },
  logout: () => {
    if (window) window.localStorage.removeItem('token')
    set({ user: null, token: '', isLogin: false })
  },
}))
