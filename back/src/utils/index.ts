import { IRole } from '@/type'
import dayjs from 'dayjs'

export const formatTimeV1 = (time: number) => {
  return dayjs(time).format('YYYY/MM/DD HH:mm:ss')
}

export const formatTimeV2 = (time: number) => {
  return dayjs(time).format('YYYY-MM-DD HH:mm:ss')
}

export const formatTimeV3 = (time: number) => {
  return dayjs(time).format('YYYY-MM-DD')
}

export const formatRole = (role: number) => {
  switch (role) {
    case 1:
      return '管理员'
    case 2:
      return '业主'
    case 3:
      return '安保'
  }
}

export const mapRole = (roles?: IRole[], roleId?: string) => {
  const role = roles?.filter((item) => item.id === roleId)
  return role?.[0]?.name
}
