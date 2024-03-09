import { IResp, IUser } from '@/type'
import request from './index'

export type ICreateUserReq = {
  name: string
  password: string
  gender: number
  phone: string
  address: string
  role_id: number
}

export interface IUpdateUserReq extends ICreateUserReq {
  id: number
}

export const createUser = (params: ICreateUserReq) => {
  return request.post<IResp<IUser>>({
    url: '/user',
    data: params
  })
}

export const getUserList = () => {
  return request.get<IResp<IUser[]>>({
    url: '/users'
  })
}

export const getUserByName = (params: { name: string }) => {
  return request.get<IResp<IUser[]>>({
    url: '/user',
    params: params
  })
}

export const getUserById = (id: string) => {
  return request.get<IResp<IUser>>({
    url: '/user/' + id
  })
}

export const updateUser = (params: IUpdateUserReq) => {
  return request.put<IResp<IUser>>({
    url: '/user/' + params.id,
    data: params
  })
}

export const deleteUser = (id: number) => {
  return request.delete<IResp<IUser>>({
    url: '/user/' + id
  })
}

export const deleteUsers = (ids: number[]) => {
  return request.delete<IResp<IUser>>({
    url: '/users',
    params: {
      ids: ids.join(',')
    }
  })
}