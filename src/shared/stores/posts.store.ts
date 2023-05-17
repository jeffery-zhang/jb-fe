import { create } from 'zustand'

import { ISearchPosts, TPostRecordsData } from '../interfaces/post.interface'
import { search } from '../services/posts.service'

interface IPostsStore {
  total: number
  records: TPostRecordsData[]
  setTotal: (total: number) => void
  setRecords: (records: TPostRecordsData[]) => void
  onSearch: (params: ISearchPosts) => Promise<void>
}

interface ISearchStore {
  page: number
  pageSize: number
  keywords: string
  author: string
  category: string
  tags: string
  setPage: (page: number) => void
  setPageSize: (pageSize: number) => void
  setKeywords: (keywords: string) => void
  setAuthor: (author: string) => void
  setCategory: (category: string) => void
  setTags: (tags: string) => void
}

export const usePostsStore = create<IPostsStore>((set) => ({
  total: 0,
  records: [],
  setTotal: (total) => set({ total }),
  setRecords: (records) => set({ records }),
  onSearch: async (params) => {
    const { success, data } = await search(params)
    if (success) {
      set({ total: data.total, records: data.records })
    }
  },
}))

export const useSearchStore = create<ISearchStore>((set) => ({
  page: 1,
  pageSize: 10,
  keywords: '',
  author: '',
  category: '',
  tags: '',
  setPage: (page) => set({ page }),
  setPageSize: (pageSize) => set({ pageSize }),
  setKeywords: (keywords) => set({ keywords }),
  setAuthor: (author) => set({ author }),
  setCategory: (category) => set({ category }),
  setTags: (tags) => set({ tags }),
}))
