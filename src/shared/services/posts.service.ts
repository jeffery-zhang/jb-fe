import { fetcher } from '../utils/fetcher'
import {
  IResponse,
  IResponseRecords,
  IActionResponse,
} from '../interfaces/fetcher.interface'
import { ISearchPosts, ISavePost, IPost } from '../interfaces/post.interface'

export const path = {
  base: '/posts',
  save: '/posts/save',
}

export const search = async (
  params: ISearchPosts,
): Promise<IResponseRecords<IPost>> =>
  fetcher.get(path.base, {
    params,
  })

export const getOne = async (id: string): Promise<IResponse<IPost>> =>
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
