import { useLocation, useNavigate } from 'react-router-dom'
import { BACK_USER } from '@/enums'
import { ILoginUser } from '@/type'
import { useEffect, useState } from 'react'
import { useSyncLocalStorage } from './useSyncLocalStorage'

export default function useAuth() {
  const { pathname } = useLocation()
  const nav = useNavigate()
  const [user, setUser] = useSyncLocalStorage<ILoginUser>(BACK_USER)
  const [isLogin, setIsLogin] = useState(false)

  useEffect(() => {
    if (!user || (user.phone != '18888888888' && user.password != '123456')) {
      setIsLogin(false)
      return nav('/login')
    }

    pathname == '/login' || pathname == '/register' ? nav('/home') : setIsLogin(true)
  }, [pathname])

  return { isLogin }
}
