import { fetcher } from '../fetcher'
import { IReponse, IActionResponse } from '../interfaces/fetcher.interface'

const path = {
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

export const login = async (
  data: ILoginData,
): Promise<IReponse<ILoginResponse>> => fetcher.post(path.login, data)
export const register = async (
  data: IRegisterData,
): Promise<IReponse<ILoginResponse>> => fetcher.post(path.register, data)
export const changePwd = async (
  data: IChangePwdData,
): Promise<IReponse<IActionResponse>> => fetcher.post(path.changePwd, data)

const authService = {
  login,
  register,
  changePwd,
}

export default authService
