import { INotice, IResp } from '@/type'
import request from './index'

export const getNoticeList = () => {
  return request.get<IResp<INotice[]>>({
    url: '/notices'
  })
}

export interface IGetNoticesReq {
  start: number
  end: number
}
export const getNoticesByTime = (params: IGetNoticesReq) => {
  return request.get<IResp<INotice[]>>({
    url: '/notice',
    params: params
  })
}

export const createNotice = (params: { message: string }) => {
  return request.post<IResp<INotice>>({
    url: '/notice',
    data: params
  })
}

export const deleteNotice = (id: number) => {
  return request.delete<IResp<INotice>>({
    url: '/notice/' + id
  })
}

export const deleteNotices = (ids: number[]) => {
  return request.delete<IResp<INotice>>({
    url: '/notices',
    params: {
      ids: ids.join(',')
    }
  })
}