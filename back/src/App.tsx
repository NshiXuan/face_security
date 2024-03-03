import React, { Suspense } from 'react'

import routes from './router'
import { useRoutes } from 'react-router-dom'
import AppMenu from './components/app-menu'
import useAuth from './hooks/useAuth'
import Loading from './components/loading'
import BreadCrumb, { CollapseContext } from './components/bread-crumb'
import { useLocalStorage } from '@/hooks/useLocalStorage'
import { BACK_COLLAPSE } from './enums'
import useWebsocket from './hooks/useWebsocket'

const { ws } = useWebsocket()
function App() {
  const { isLogin, pathname } = useAuth()
  const [collapse, setCollapse] = useLocalStorage(BACK_COLLAPSE)

  return (
    <CollapseContext.Provider value={{ ws, collapse, setCollapse }}>
      <div className={`flex h-[100vh] overflow-hidden `}>
        {(isLogin && !pathname.includes('/client')) && <AppMenu />}

        <div className="flex-1 relative overflow-y-auto ">
          {(isLogin && !pathname.includes('/client')) && <BreadCrumb />}
          <Suspense fallback={<Loading />}>
            <div>{useRoutes(routes)}</div>
          </Suspense>
        </div>
      </div>
    </CollapseContext.Provider>
  )
}

export default App
