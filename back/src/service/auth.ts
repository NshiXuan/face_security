import { IResp, IUser } from '@/type'
import request from './index'

export type ILoginReq = {
  phone: string
  password: string
}

export type ILoginResp = {
  user_id: number
  role_id: number
  token: string
}

export const login = (params: ILoginReq) => {
  return request.post<IResp<ILoginResp>>({
    url: '/auth/login',
    data: params
  })
}

export type CheckRoleResp = {
  user_name: string
  role_id: number
}

export const checkRole = (params: { token: string }) => {
  return request.post<IResp<CheckRoleResp>>({
    url: '/auth/check',
    data: params
  })
}