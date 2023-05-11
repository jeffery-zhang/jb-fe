import { fetcher } from '../utils/fetcher'
import {
  IResponse,
  IResponseRecords,
  IActionResponse,
} from '../interfaces/fetcher.interface'
import { ISaveTag, ITag } from '../interfaces/tag.interface'

const path = {
  base: '/tags',
  getAll: '/tags/all',
  batchCreate: '/tags/batchCreate',
}

export const getAll = async (): Promise<IResponse<ITag[]>> =>
  fetcher.get(path.getAll)

export const batchCreate = async (tags: string[]):Promise<IResponse<string>> => fetcher.post(path.batchCreate, tags)
