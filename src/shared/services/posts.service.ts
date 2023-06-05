import { fetcher } from '../utils/fetcher'
import {
  IResponse,
  IResponseRecords,
  IActionResponse,
} from '../interfaces/fetcher.interface'
import {
  ISearchPosts,
  ISavePost,
  IPost,
  TPostRecordsData,
  TSiblingsTwoData,
} from '../interfaces/post.interface'

export const path = {
  base: '/posts',
  ids: '/posts/ids',
  viewOne: '/posts/realView',
  save: '/posts/save',
  siblingsTwo: '/posts/siblingsTwo',
}

export const search = async (
  params: ISearchPosts,
): Promise<IResponseRecords<TPostRecordsData>> =>
  fetcher.get(path.base, {
    params,
  })

export const getAllIds = async (): Promise<IResponse<{ _id: string }[]>> =>
  fetcher.get(path.ids)

export const getOne = async (id: string): Promise<IResponse<IPost>> =>
  fetcher.get(`${path.base}/${id}`)

export const viewOne = async (id: string): Promise<IResponse<IPost>> =>
  fetcher.get(`${path.viewOne}/${id}`)

export const create = async (data: ISavePost): Promise<IActionResponse> =>
  fetcher.post(path.save, {
    ...data,
    isPublic: true,
  })

export const update = async (
  id: string,
  data: ISavePost,
): Promise<IActionResponse> =>
  fetcher.put(path.save, {
    ...data,
    isPublic: true,
    id,
  })

export const del = async (id: string): Promise<IActionResponse> =>
  fetcher.delete(`${path.base}/${id}`)

export const siblingsTwo = async (
  id: string,
): Promise<IResponse<TSiblingsTwoData>> =>
  fetcher.get(`${path.siblingsTwo}/${id}`)

const postsService = {
  search,
  getOne,
  create,
  update,
  del,
  siblingsTwo,
}

export default postsService
