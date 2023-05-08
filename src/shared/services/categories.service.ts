import { fetcher } from '../utils/fetcher'
import {
  IResponse,
  IResponseRecords,
  IActionResponse,
} from '../interfaces/fetcher.interface'
import { ICategory } from '../interfaces/category.interface'

export const path = {
  base: '/categories',
  getAll: '/categories/all',
}

export const getAll = async (): Promise<IResponse<ICategory[]>> =>
  fetcher.get(path.getAll)
