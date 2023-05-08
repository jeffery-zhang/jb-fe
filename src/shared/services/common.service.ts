import { fetcher } from '../utils/fetcher'
import {
  IResponse,
  IResponseRecords,
  IActionResponse,
} from '../interfaces/fetcher.interface'

interface IUploadData {
  file: File
}

export const path = {
  uploadFile: '/minio/uploadFile',
}

export const uploadFile = async (
  data: IUploadData,
): Promise<IResponse<string>> =>
  fetcher.post(path.uploadFile, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  })
