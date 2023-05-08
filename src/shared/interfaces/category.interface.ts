export interface ISaveCategory {
  name: string
  alias: string
  sort: number
}

export interface ICategory extends ISaveCategory {
  _id: string
  postNum: number
  createTime: string
  updateTime: string
}
