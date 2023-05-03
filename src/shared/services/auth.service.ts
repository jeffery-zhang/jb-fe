import { fetcher } from '../fetcher'
import { IResponse, IActionResponse } from '../interfaces/fetcher.interface'

export const path = {
  verify: '/auth/verify',
  login: '/auth/login',
  register: '/auth/register',
  changePwd: '/auth/changePwd',
}

interface ILoginData {
  username: string
  password: string
}

interface IRegisterData extends ILoginData {
  mail: string
  avatar?: string
  roles: string[]
}

interface IChangePwdData {
  oldPwd: string
  password: string
}

interface ILoginResponse {
  id: string
  token: string
  username: string
  mail: string
  avatar: string
}

export const verify = async (): Promise<IResponse<ILoginResponse | null>> =>
  fetcher.get(path.verify)
export const login = async (
  data: ILoginData,
): Promise<IResponse<ILoginResponse>> => fetcher.post(path.login, data)
export const register = async (
  data: IRegisterData,
): Promise<IResponse<ILoginResponse>> => fetcher.post(path.register, data)
export const changePwd = async (
  data: IChangePwdData,
): Promise<IResponse<IActionResponse>> => fetcher.put(path.changePwd, data)

const authService = {
  login,
  register,
  changePwd,
}

export default authService
