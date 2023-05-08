import { fetcher } from '../utils/fetcher'
import { IResponse, IActionResponse } from '../interfaces/fetcher.interface'
import {
  ILoginData,
  IRegisterData,
  IChangePwdData,
  ILoginResponse,
} from '../interfaces/user.interface'

export const path = {
  verify: '/auth/verify',
  login: '/auth/login',
  register: '/auth/register',
  changePwd: '/auth/changePwd',
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
