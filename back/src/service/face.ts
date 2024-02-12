import { IFace, IResp } from '@/type'
import request from './index'

// TODO(nsx): 有 bug , headers 没传过去
export const createFace = (params: FormData) => {
  return request.post({
    url: '/face/create',
    params: params,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

export const findFace = (params: FormData) => {
  return request.post({
    url: '/face',
    params: params,
    headers: {
      "Content-Type": "multipart/form-data"
    }
  })
}

export const getFaceList = () => {
  return request.get<IResp<IFace[]>>({
    url: '/faces',
  })
}

export const getFaceListByName = (params: { name: string }) => {
  return request.get<IResp<IFace[]>>({
    url: '/face',
    params: params
  })
}

export const deleteFace = (id: number) => {
  return request.delete<IResp>({
    url: '/face/' + id,
  })
}