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
const CONTENT_TYPE = "application/json;charset=utf-8";

class HttpRequest {
    // private readonly baseUrl: string;
    // loading?: ILoadingInstance
    // interceptor?: customInterceptorType
    protected instance: AxiosInstance
    showLoading: boolean

    constructor(config: customRequest) {
        // this.baseUrl = 'http://localhost:3000'
        this.instance = axios.create(config)
        this.showLoading = config.showLoading || DEFAULT_LOADING

        // instance request拦截
        this.instance.interceptors.request.use((config) => {
          console.log("request拦截=====>",config)
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

        // instance response 拦截,处理返回结果
        this.instance.interceptors.response.use((res) => {
          console.log("instance response 拦截,处理返回结果",res)
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
              "Content-Type": CONTENT_TYPE,
            }
        }
        return config
    }

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
        /*
        if (config.interceptor?.requestInterceptor) {  //可以删除，没有接口拦截器
          config = config.interceptor.requestInterceptor(config)
        }
        */
        if(config.showLoading === false) {
          this.showLoading = false
        }
        console.log("this.instance.request-----====",config)
        this.instance.request<any, T>(config).then((res) => {
          console.log("this.instance.request-----====",res)
          /*
          if (config.interceptor?.resInterceptor) {  //可以删除，没有接口拦截器
            config = config.interceptor.resInterceptor(res)
          }
          */
          resolve(res)
          this.showLoading = DEFAULT_LOADING
        })
      })
    }

    get<T>(options:customRequest,url:string): Promise<T>{
      const config = Object.assign(
        {},
        {
          url,
          options
        },
      );
      return this.request({...config, method: 'GET'})
    }

    post<T>(options:customRequest,url:string): Promise<T>{
      const config = Object.assign(
        {},
        {
          url,
          data: options,
        }
      );
      return this.request({...config,method: 'POST'})
    }
}

const http = new HttpRequest({
    timeout: 10000,
  }
)

export default http;
