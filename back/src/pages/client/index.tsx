import React, { useEffect, useState } from "react"

import { AlertOutlined, LogoutOutlined, UserOutlined } from "@ant-design/icons"
import { Alert, Avatar, Tag } from "antd"
import bgImg from '@/assets/img/bg.png'
import { getUserById } from "@/service/user"
import { IUser } from "@/type"
import { useNavigate, useParams } from "react-router-dom"
import useWebsocket from "@/hooks/useWebsocket"
import { getNoticeList } from "@/service/notice"
import { formatTimeV2 } from "@/utils"
import { useSyncLocalStorage } from "@/hooks/useSyncLocalStorage"
import { ILoginResp, layout } from "@/service/auth"

const Client = function () {
  const [user, setUser] = useState<IUser>()
  const [notices, setNotices] = useState<string[]>([])
  const [userInfo, setUserInfo] = useSyncLocalStorage<ILoginResp>("user_info")
  const { ws } = useWebsocket()
  const nav = useNavigate()
  const params = useParams()

  useEffect(() => {
    handleGetUser()
    ws.onmessage = function (event: any) {
      setNotices((notices) => [...notices, event.data])
    }

    handleGetNotices()
    //   return () => {
    //     ws.close();
    //   }
  }, [])

  function handleGetNotices() {
    getNoticeList().then(res => {
      if (res.code == 200) {
        setNotices(res.data!.map(item => {
          return formatTimeV2(item.ctime!) + " : " + item.message
        }))
      }
    })
  }

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
    if (userInfo) {
      layout(userInfo.user_id).then(res => {
        if (res.code == 200) {
          localStorage.removeItem('user_info')
          nav('/login')
        }
      })
    }
  }

  function handleGetNotice() {
  }

  return (
    <div className="flex">
      <div className="h-screen py-2 border-r-2 flex flex-col justify-between ">
        <div className="px-2">
          <div className="p-2 pb-4 flex items-center gap-2 cursor-pointer border-b-2">
            <Avatar className="bg-yellow-400" size={"large"} icon={<UserOutlined />} />
            <div>
              <div>{user?.name}</div>
              <Tag color="blue" >{user?.role?.name}</Tag>
            </div>
          </div>
          <div onClick={handleGetNotice} className="py-2 px-6 mt-4 cursor-pointer hover:bg-blue-500 hover:text-white rounded-full">
            <Avatar className="bg-red-500 mr-2" icon={<AlertOutlined />} />
            <span >陌生人警告</span>
          </div>
        </div>
        <div onClick={handleLogout} className="mx-2 px-4 py-2 bg-red-500 text-white cursor-pointer rounded-full">
          <Avatar className="mr-2" size={"small"} icon={<LogoutOutlined />} />
          退出登录
        </div>
      </div>
      <div className="flex-1 h-screen px-4 py-2 overflow-y-auto bg-slate-50 relative">
        {notices.length > 0 ? <div className="flex flex-col gap-3">
          {notices.map((notice, index) =>
            <div key={index}>
              <Alert
                message="警告"
                description={notice}
                type="warning"
                showIcon
              />
            </div>
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