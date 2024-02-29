import { IResp, IUser } from '@/type'
import request from './index'

export type ILoginReq = {
  phone: string
  password: string
}

export type ILoginResp = {
  user_id: number
  token: string
}

export const login = (params: ILoginReq) => {
  return request.post<IResp<ILoginResp>>({
    url: '/auth/login',
    data: params
  })
} 