import {
  DashboardOutlined,
  FormOutlined,
  ReadOutlined,
  UserOutlined,
  SmileOutlined,
  MessageOutlined
} from '@ant-design/icons'
import React from 'react'

export type MenuDataItem = {
  label: React.ReactNode
  key: string
  link: string
  icon?: React.ReactNode
  children?: MenuDataItem[]
}

// key与link保持一致
export const menuData: MenuDataItem[] = [
  {
    label: '首页',
    key: '/home',
    link: '/home',
    icon: <DashboardOutlined />,
  },
  {
    label: '用户管理',
    key: '/user',
    link: '/user',
    icon: <ReadOutlined />,
  },
  {
    label: '角色管理',
    key: '/role',
    link: '/role',
    icon: <UserOutlined />
  },
  {
    label: '人脸库管理',
    key: '/face',
    link: '/face',
    icon: <SmileOutlined />
  },
  {
    label: '通知管理',
    key: '/notice',
    link: '/notice',
    icon: <MessageOutlined />
  }
]
