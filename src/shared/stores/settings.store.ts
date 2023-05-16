import { create } from 'zustand'

import { ISetting } from '../interfaces/setting.interface'

interface IDrawerStore {
  visible: boolean
  theme: ISetting['theme']
  banner: ISetting['banner']
  rounded: ISetting['rounded']
  show: () => void
  hide: () => void
  setTheme: (theme: ISetting['theme']) => void
  setBanner: (banner: ISetting['banner']) => void
  setRounded: (rounded: ISetting['rounded']) => void
}

const setLocalStorage = (key: string, value: string | number) => {
  if (typeof window !== 'undefined') {
    localStorage.setItem(key, String(value))
  }
}

export const getRoundedClass = (rounded: ISetting['rounded']) => {
  switch (rounded) {
    case 0:
      return 'rounded-none'
    case 1:
      return 'rounded'
    case 2:
      return 'rounded-lg'
    case 3:
      return 'rounded-2xl'
    default:
      return ''
  }
}

export const useSettingsStore = create<IDrawerStore>((set, get) => ({
  visible: false,
  theme: 'light',
  banner: 'Lake',
  rounded: 2,
  show: () => set({ visible: true }),
  hide: () => set({ visible: false }),
  setTheme: (theme) => {
    if (get().theme === theme) return
    // setLocalStorage('theme', theme)
    if (typeof window !== 'undefined') {
      document.documentElement.setAttribute('data-theme', theme)
    }
    set({ theme })
  },
  setBanner: (banner) => {
    if (get().banner === banner) return
    // setLocalStorage('banner', banner)
    set({ banner })
  },
  setRounded: (rounded) => {
    if (get().rounded === rounded) return
    // setLocalStorage('rounded', rounded)
    set({ rounded })
  },
}))
