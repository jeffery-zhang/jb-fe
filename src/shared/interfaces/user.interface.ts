export interface ILoginData {
  username: string
  password: string
}

export interface IRegisterData extends ILoginData {
  mail: string
  avatar?: string
  roles: string[]
}

export interface IChangePwdData {
  oldPwd: string
  password: string
}

export interface ILoginResponse {
  id: string
  token: string
  username: string
  mail: string
  avatar: string
}

export type UserDataType = Omit<ILoginResponse, 'token'>
