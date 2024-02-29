import React, { createContext, useContext } from 'react'

import { MenuFoldOutlined, MenuUnfoldOutlined } from '@ant-design/icons'
import useMenu from '@/hooks/useMenu'
import { menuData } from '@/data/menu-data'
import { Dropdown, MenuProps } from 'antd'
import avatar from '@/assets/img/bg.png'
import { useNavigate } from 'react-router-dom'

interface ICollapseContext {
  collapse: boolean
  setCollapse: any
}

export const CollapseContext = createContext<ICollapseContext>({
  collapse: false,
  setCollapse: undefined
})

const BreadCrumb = function () {
  const { collapse, setCollapse } = useContext(CollapseContext)
  const { menuBread } = useMenu(menuData)
  const nav = useNavigate()

  function handleLogout() {
    localStorage.removeItem('token')
    nav('/login')
  }

  const items: MenuProps['items'] = [
    {
      key: '1',
      danger: true,
      label: <span onClick={handleLogout}>退出登录</span>
    },
  ];

  return (
    <div className="flex items-center h-[50px] mb-2 border-b-2">
      {collapse ? (
        <MenuUnfoldOutlined
          className="py-[10px] pl-[15px] cursor-pointer"
          onClick={() => {
            setCollapse(false)
          }}
        />
      ) : (
        <MenuFoldOutlined
          className="py-[10px] pl-[15px] cursor-pointer"
          onClick={() => {
            setCollapse(true)
          }}
        />
      )}
      <div className='flex-1 flex justify-between items-center'>
        <span className="ml-3">{menuBread}</span>
        <div className='pr-4'>
          <Dropdown menu={{ items }}>
            <img src={avatar} width={40} height={40} alt="avatar" className='rounded-full shadow-md cursor-pointer' />
          </Dropdown>
        </div>
      </div>
    </div>
  )
}

export default BreadCrumb


