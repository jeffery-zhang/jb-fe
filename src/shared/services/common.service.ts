import { fetcher } from '../utils/fetcher'
import {
  IResponse,
} from '../interfaces/fetcher.interface'

interface IUploadData {
  file: File
}

export const path = {
  uploadFile: '/minio/uploadFile',
  uploadPoster: '/minio/uploadPoster',
  uploadContentImg: '/minio/uploadContent',
}

export const uploadFile = async (
  data: IUploadData,
): Promise<IResponse<string>> =>
  fetcher.post(path.uploadFile, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })

export const uploadPoster = async (
  data: IUploadData,
): Promise<IResponse<string>> => fetcher.post(path.uploadPoster, data)

export const uploadContentImg = async (
  data: IUploadData,
): Promise<IResponse<string>> => fetcher.post(path.uploadContentImg, data)
