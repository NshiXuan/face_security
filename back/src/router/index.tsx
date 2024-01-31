import React, { lazy } from 'react'
import { Navigate, RouteObject } from 'react-router-dom'

const Login = lazy(() => import('@/pages/login'))
const User = lazy(() => import('@/pages/user'))
const Home = lazy(() => import('@/pages/home'))
const Role = lazy(() => import('@/pages/role'))
const Face = lazy(() => import('@/pages/face'))
const NoFound = lazy(() => import('@/pages/no-found'))

const routes: RouteObject[] = [
  {
    path: '/',
    // 重定向
    element: <Navigate to={'/login'} />
  },
  {
    path: '/login',
    element: <Login />
  },
  {
    path: '/home',
    element: <Home />
  },
  {
    path: '/user',
    element: <User />
  },
  {
    path: '/role',
    element: <Role />
  },
  {
    path: '/face',
    element: <Face />
  },
  {
    path: '/*',
    element: <NoFound />
  }
]

export default routes
