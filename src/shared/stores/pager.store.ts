import { create } from 'zustand'

interface IPagerStore {
  page: number
  pageSize: number
  total: number
  setPage: (page: number) => void
  setPageSize: (pageSize: number) => void
  setTotal: (total: number) => void
}

export const usePagerStore = create<IPagerStore>((set) => ({
  page: 0,
  pageSize: 10,
  total: 0,
  setPage: (page) => {
    console.log('setPage: ', page)
    set({ page })
  },
  setPageSize: (pageSize) => set({ pageSize }),
  setTotal: (total) => set({ total }),
}))
