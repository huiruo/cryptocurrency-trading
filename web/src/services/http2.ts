
import axios, {AxiosInstance, AxiosRequestConfig} from 'axios'

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

class HttpRequest {
    // private readonly baseUrl: string;
    // loading?: ILoadingInstance
    protected instance: AxiosInstance
    interceptor?: customInterceptorType
    showLoading: boolean

    constructor(config: customRequest) {
        // this.baseUrl = 'http://localhost:3000'
        this.instance = axios.create(config)
        this.showLoading = config.showLoading || DEFAULT_LOADING

        this.instance.interceptors.request.use(
          (config) => {
            //loading图标加载
            // if(this.showLoading) {
            // this.loading = ElLoading.service({
            //   lock: true,
            //   text: '正在加载中...'
            // })
            // console.log("正在加载中...")
            // }
            //token拦截
            /*
            const token = localStorage.getItem('token')
            if(token) {
              //@ts-ignore
              config.headers.Authorization = token
            }
            */
            return config
          },
          (error) => {
            return error
          }
        )

        this.instance.interceptors.response.use(
          (res) => {
            //当响应成功的时候，关闭loading
            /*
            setTimeout(() => {
              this.loading?.close()
            }, 1000)
          */
            return res.data
          },
          (error) => {
            //当响应失败的时候，关闭loading
            /*
            this.loading?.close()
            */
            return error
          }
        )
    }
    getInsideConfig() {
        const config = {
            // baseURL: this.baseUrl,
            headers: {
                //
            }
        }
        return config
    }


// 请求拦截
    interceptors(instance: AxiosInstance, url: string | number | undefined) {
        instance.interceptors.request.use(config => {
            // 添加全局的loading..
            // 请求头携带token
            return config
        }, (error: any) => {
            return Promise.reject(error)
        })
        //响应拦截
        instance.interceptors.response.use(res => {
            //返回数据
            const {data} = res
            console.log('返回数据处理',res)
            return data
        }, (error: any) => {
            console.log('error==>',error)
            return Promise.reject(error)
        })
    }

    request(options: AxiosRequestConfig) {
        /*
        const instance = axios.create()
        options = Object.assign(this.getInsideConfig(), options)
        this.interceptors(instance, options.url)
        return instance(options)
        */
        const instance = this.instance
        options = Object.assign(this.getInsideConfig(), options)
        this.interceptors(instance, options.url)
        return instance(options)
    }

    get(url:any, options:any){
      const instance = this.instance
      const config = Object.assign(
        {},
        {
          url,
          method: "GET"
        },
        options
      );
      this.interceptors(instance, options.url)
      return instance(config);
    }
}

// const http = new Http({
//   baseURL: BASE_URL,
//   timeout: TIME_OUT
// })
const http2 = new HttpRequest({
  // baseURL: BASE_URL,
  // timeout: TIME_OUT
  timeout: 1000}
)
export default http2
/*
// 文件api/index.ts
import http  from '../utils/axios'

export const menuList =()=>{
    return http.request({
        url: '/users/menuList',
        method: 'get'
    })
}
*/
