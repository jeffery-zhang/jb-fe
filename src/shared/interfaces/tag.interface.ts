export interface ISaveTag {
  name: string
}

export interface ITag extends ISaveTag {
  _id: string
  createTime: string
  updateTime: string
}
