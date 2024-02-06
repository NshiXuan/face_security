import { message } from 'antd'
import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig, AxiosRequestHeaders, AxiosResponse } from 'axios'

// export const BASE_URL = process.env.NODE_ENV === 'development' ? 'http://localhost:8088/api/v1' : ''
export const BASE_URL = "http://localhost:8088/api/v1"
export const TIME_OUT = 5000

class Request {
  // 1.定义实例属性
  instance: AxiosInstance

  // 2.在构造函数中创建实例instance
  constructor(config: AxiosRequestConfig) {
    // 创建实例
    this.instance = axios.create(config)

    // 5.封装拦截器
    this.instance.interceptors.request.use(
      (config) => {
        console.log("🚀 ~ Request ~ constructor ~ config:", config)
        config.headers = { ...config.headers } as AxiosRequestHeaders
        return config
      },
      (err) => {
        return err
      }
    )

  }

  // 3.封装公共的request函数
  request<T>(config: AxiosRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      this.instance
        .request<T, AxiosResponse<T>>(config)
        .then((res) => {
          resolve(res.data)
        })
        .catch((err) => {
          reject(err)
        })
    })
  }

  // 4.封装get post patch delete请求
  get<T = any>(config: AxiosRequestConfig) {
    return this.request<T>({ ...config, method: 'GET' })
  }

  post<T = any>(config: AxiosRequestConfig) {
    return this.request<T>({ ...config, method: 'POST' })
  }

  put<T = any>(config: AxiosRequestConfig) {
    return this.request<T>({ ...config, method: 'PUT' })
  }

  delete<T = any>(config: AxiosRequestConfig) {
    return this.request<T>({ ...config, method: 'DELETE' })
  }
}

const request = new Request({
  baseURL: BASE_URL,
  timeout: TIME_OUT
})

export default request
