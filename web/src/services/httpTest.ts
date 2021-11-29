import axios from 'axios'
import type { AxiosInstance, AxiosRequestConfig } from 'axios'

import { ElLoading } from 'element-plus'
import { ILoadingInstance } from 'element-plus/lib/el-loading/src/loading.type'

//自定义拦截器类型
interface customInterceptorType {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  resInterceptor?: (res: any) => any
  resInterceptorCatch?: (error: any) => any
}

//定义自己的实例类型
interface customRequest extends AxiosRequestConfig {
  interceptor?: customInterceptorType,
  showLoading?: boolean
}

const DEFAULT_LOADING = true   //loading 的默认值

class Http {
  protected instance: AxiosInstance
  interceptor?: customInterceptorType
  loading?: ILoadingInstance
  showLoading: boolean

  constructor(config: customRequest) {
    this.instance = axios.create(config)
    this.interceptor = config?.interceptor
    this.showLoading = config.showLoading || DEFAULT_LOADING

    //从config里面取出每个实例的不同拦截器 （可以删除，如果没有单独实例处理）
    this.instance.interceptors.request.use(
      this.interceptor?.requestInterceptor,
      this.interceptor?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptor?.resInterceptor,
      this.interceptor?.resInterceptorCatch
    )

    //统一，所以实例都会拦截
    this.instance.interceptors.request.use(
      (config) => {
        //loading图标加载
        if(this.showLoading) {
          this.loading = ElLoading.service({
            lock: true,
            text: '正在加载中...'
          })
        }
        //token拦截
        const token = localStorage.getItem('token')
        if(token) {
          config.headers.Authorization = token
        }
        return config
      },
      (error) => {
        return error
      }
    )
    this.instance.interceptors.response.use(
      (res) => {
        //当响应成功的时候，关闭loading
        setTimeout(() => {
          this.loading?.close()
        }, 1000)

        return res.data
      },
      (error) => {
        //当响应失败的时候，关闭loading
        this.loading?.close()
        return error
      }
    )
  }

  // request<T>(params: customRequest): Promise<T>
  // request<T>(...args: any[]): Promise<T>
  //对部分接口的进行拦截配置
  request<T>(params: customRequest): Promise<T> {
    let config:customRequest
    if(typeof params === 'string') {   //字符串
      // config = arguments[1] || {}
      // config.url = arguments[0]   //处理url
      // if(arguments[2]) {
      //   config.showLoading = arguments[2] || {}   //处理showLoading
      // }
    } else {  //对象
      config = params || {}
    }

    return new Promise((resolve) => {
      if (config.interceptor?.requestInterceptor) {  //可以删除，没有接口拦截器
        config = config.interceptor.requestInterceptor(config)
      }
      if(config.showLoading === false) {
        this.showLoading = false
      }
      this.instance.request<any, T>(config).then((res) => {
        if (config.interceptor?.resInterceptor) {  //可以删除，没有接口拦截器
          config = config.interceptor.resInterceptor(res)
        }
        resolve(res)
        this.showLoading = DEFAULT_LOADING
      })
    })
  }

  get<T>(config: customRequest): Promise<T>{
    return this.request({...config, method: 'GET'})
  }

  post<T>(config: customRequest): Promise<T>{
    return this.request({...config, method: 'POST'})
  }
}

export default Http
