import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSyncLocalStorage } from './useSyncLocalStorage'
import { ILoginResp } from '@/service/auth'

export default function useAuth() {
  const { pathname } = useLocation()
  const nav = useNavigate()
  const [userInfo, setUserInfo] = useSyncLocalStorage<ILoginResp>("user_info")
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    const { token, role_id, user_id } = userInfo
    if (token == undefined || token.trim() == "") {
      setIsLogin(false)
      return nav('/login')
    }

    if (pathname == '/login' || pathname == '/register') {
      // Note(nsx): 1-代表管理员，重定向到管理后台 其它-代表业主和安保，重定向到客户端
      if (role_id == 1) {
        nav('/home')
      } else {
        nav('/client/' + user_id)
      }
    } else {
      setIsLogin(true)
    }
  }, [pathname])

  return { isLogin, pathname }
}
