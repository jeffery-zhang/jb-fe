import { ISearch } from './fetcher.interface'

export interface ISearchPosts extends ISearch {
  author?: string
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
  isPublic: boolean
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

export type TPostRecordsData = Omit<IPost, 'content'>
