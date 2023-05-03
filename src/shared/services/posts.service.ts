import { fetcher } from '../fetcher'
import {
  ISearch,
  IResponse,
  IResponseRecords,
  IActionResponse,
} from '../interfaces/fetcher.interface'

export const path = {
  base: '/posts',
  save: '/posts/save',
}

interface ISearchPosts extends ISearch {
  author?: string
  category?: string
  tags?: string
  sortBy?: Sorter
}

export type Sorter = 'createTime' | 'updateTime' | 'like' | 'pv'

interface ISavePost {
  title: string
  content: string
  intro: string
  poster: string
  author: string
  category: string
  tags: string[]
}

export interface IPostData extends ISavePost {
  _id: string
  like: number
  pv: number
  createTime: string
  updateTime: string
}

export const search = async (
  params: ISearchPosts,
): Promise<IResponseRecords<IPostData>> =>
  fetcher.get(path.base, {
    params,
  })

export const getOne = async (id: string): Promise<IResponse<IPostData>> =>
  fetcher.get(`${path.base}/${id}`)

export const create = async (data: ISavePost): Promise<IActionResponse> =>
  fetcher.post(path.save, data)

export const update = async (
  id: string,
  data: ISavePost,
): Promise<IActionResponse> =>
  fetcher.put(path.save, {
    ...data,
    id,
  })

export const del = async (id: string): Promise<IActionResponse> =>
  fetcher.delete(`${path.base}/${id}`)

const postsService = {
  search,
  getOne,
  create,
  update,
  del,
}

export default postsService
