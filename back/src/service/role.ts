import { IResp, IRole } from '@/type'
import request from './index'

export interface ICreateRoleReq {
  name: string
  desc?: string
}

export interface IUpdateRoleReq extends ICreateRoleReq { }

export const createRole = (params: ICreateRoleReq) => {
  return request.post<IResp<IRole>>({
    url: '/role',
    data: params
  })
}

export const getRoleList = () => {
  return request.get<IResp<IRole[]>>({
    url: '/roles'
  })
}

export const updateRole = (id: number, params: IUpdateRoleReq) => {
  return request.put<IResp<IRole>>({
    url: '/role/' + id,
    data: params
  })
}

export const deleteRole = (id: number) => {
  return request.delete<IResp<IRole>>({
    url: '/role/' + id,
  })
}