import { fetcher } from '../utils/fetcher'
import { IResponse, IActionResponse } from '../interfaces/fetcher.interface'

import { IBanner, ISetting, ITheme } from '../interfaces/setting.interface'

export const path = {
  base: '/settings',
  getOne: '/settings/getOne',
  allThemes: '/settings/themes',
  allBanners: '/settings/banners',
}

export const getUserSetting = async (): Promise<IResponse<ISetting>> =>
  fetcher.get(path.getOne)

export const getThemes = async (): Promise<IResponse<ITheme[]>> =>
  fetcher.get(path.allThemes)

export const getBanners = async (): Promise<IResponse<IBanner[]>> =>
  fetcher.get(path.allBanners)

export const putOne = async (data: ISetting): Promise<IResponse<ISetting>> =>
  fetcher.post(path.base, data)
