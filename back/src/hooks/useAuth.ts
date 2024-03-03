import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useSyncLocalStorage } from './useSyncLocalStorage'
import { checkRole } from '@/service/auth'

export default function useAuth() {
  const { pathname } = useLocation()
  const nav = useNavigate()
  const [token, setToken] = useSyncLocalStorage<string>("token")
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    if (token == undefined || token.trim() == "") {
      setIsLogin(false)
      return nav('/login')
    }

    // if (pathname == '/login' || pathname == '/register') {
    //   nav('/home')
    // } else {
    setIsLogin(true)
    // }
  }, [pathname])

  return { isLogin, pathname }
}
