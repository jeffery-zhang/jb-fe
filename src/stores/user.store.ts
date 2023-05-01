import { create } from 'zustand'

interface IUserStore {
  user: IUser | null
  token: string
  isLogin: boolean
  setUser: (user: IUser, token: string) => void
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
  setUser: (user, token) => set({ user, token, isLogin: true }),
}))
