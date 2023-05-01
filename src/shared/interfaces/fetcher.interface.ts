export interface ISearch {
  keywords?: string
  keywordsKeys?: string[]
  sortBy?: string
  order?: 'desc' | 'asc'
  page?: number
  pageSize?: number
}

export interface IReponse<T = any> {
  success: boolean
  data: T
  status: number
  message: string
}

export interface IResponseRecords<T = any> extends IReponse<IRecords<T>> {}

export interface IRecords<T> {
  total: number
  page: number
  pageSize: number
  records: T[]
}
