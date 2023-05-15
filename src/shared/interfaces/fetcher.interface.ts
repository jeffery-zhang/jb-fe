export interface ISearch {
  keywords?: string
  keywordsKeys?: string[]
  sortBy?: string
  order?: 'desc' | 'asc'
  page?: number
  pageSize?: number
}

export interface IResponse<T = any> {
  success: boolean
  data: T
  status: number
  message: string
}

export interface IResponseRecords<T = any> extends IResponse<IRecords<T>> {}

export interface IRecords<T = any> {
  total: number
  page: number
  pageSize: number
  records: T[]
}

export interface IActionResponse extends IResponse {
  data: {
    message: string
  }
}
