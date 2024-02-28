import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSyncLocalStorage } from './useSyncLocalStorage'

export default function useAuth() {
  const { pathname } = useLocation()
  const nav = useNavigate()
  const [token, setToken] = useSyncLocalStorage<string>("token")
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    // TODO(nsx): 使用 session 验证
    // if (!user || (user.phone != '18888888888' && user.password != '123456')) {
    //   setIsLogin(false)
    //   return nav('/login')
    // }
    if (token == undefined || token.trim() == "") {
      setIsLogin(false)
      return nav('/login')
    }

    pathname == '/login' || pathname == '/register' ? nav('/home') : setIsLogin(true)
  }, [pathname])

  return { isLogin }
}
