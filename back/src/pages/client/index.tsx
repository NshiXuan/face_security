import React, { useEffect, useState } from "react"

import { AlertOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons"
import { Avatar, Tag } from "antd"
import bgImg from '@/assets/img/bg.png'
import { getUserById } from "@/service/user"
import { IUser } from "@/type"
import { useNavigate, useParams } from "react-router-dom"

const Client = function () {
  const [user, setUser] = useState<IUser>()
  const [notices, setNotices] = useState<any[]>()
  const nav = useNavigate()
  const params = useParams()
  useEffect(() => {
    handleGetUser()
  }, [])

  function handleGetUser() {
    const id = params.id
    if (id) {
      getUserById(id).then(res => {
        if (res.code == 200) {
          setUser(res.data)
        }
      })
    }
  }

  function handleLogout() {
    localStorage.removeItem('token')
    nav('/login')
  }

  function handleGetNotice() {
    setNotices(["hello", "world"])
  }

  return (
    <div className="flex">
      <div className="h-screen py-2 border-r-2 flex flex-col justify-between ">
        <div className="px-2">
          <div className="p-2 flex items-center gap-2 cursor-pointer border-b-2">
            <Avatar className="bg-yellow-400" size={"large"} icon={<UserOutlined />} />
            <div>
              <div>{user?.name}</div>
              <Tag color="blue" >{user?.role?.name}</Tag>
            </div>
          </div>
          <div onClick={handleGetNotice} className="flex items-center gap-3 py-2 px-6 mt-4 cursor-pointer hover:bg-blue-500 hover:text-white rounded-full">
            <Avatar className="bg-red-500" icon={<AlertOutlined />} />
            <span >陌生人警告</span>
          </div>
        </div>
        <div onClick={handleLogout} className="mx-2 px-4 py-2 bg-red-500 text-white cursor-pointer rounded-full">
          <Avatar className="mr-2" size={"small"} icon={<LogoutOutlined />} />
          退出登录
        </div>
      </div>
      <div className="flex-1 h-screen px-4 py-2 bg-slate-50 relative">
        {notices ? <div>
          {notices.map(item =>
            <div key={item}>{item}</div>
          )}
        </div> :
          <div className="w-96 rounded-full overflow-hidden absolute top-2/4 left-1/2 -translate-x-2/4 -translate-y-2/4">
            <img src={bgImg} className="bg-contain" alt="" />
          </div>
        }
      </div>
    </div>
  )
}

export default Client

// 设置一个方便调试的name 可以不写 默认为组件名称
Client.displayName = "Client"