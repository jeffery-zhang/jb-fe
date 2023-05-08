import { ISearch } from './fetcher.interface'

export interface ISearchPosts extends ISearch {
  userId?: string
  category?: string
  tags?: string
  sortBy?: Sorter
}

export type Sorter = 'createTime' | 'updateTime' | 'like' | 'pv'

export interface ISavePost {
  title: string
  content: string
  intro: string
  poster: string
  category: string
  tags: string[]
}

export interface IPost extends ISavePost {
  _id: string
  userId: string
  username: string
  like: number
  pv: number
  createTime: string
  updateTime: string
}
