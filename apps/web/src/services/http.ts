import axios, {AxiosInstance, AxiosRequestConfig} from 'axios'

/*
//自定义拦截器类型
interface customInterceptorType {
  requestInterceptor?: (config: AxiosRequestConfig) => AxiosRequestConfig
  requestInterceptorCatch?: (error: any) => any
  resInterceptor?: (res: any) => any
  resInterceptorCatch?: (error: any) => any
}
*/

//定义自己的实例类型
interface customRequest extends AxiosRequestConfig {
  // interceptor?: customInterceptorType,
  // showLoading?: boolean
  data?: any, 
  code?: number,
  msg?: string
}

const CONTENT_TYPE = "application/json;charset=utf-8";
const codeMessage = new Map([
  [200, '请求返回成功'],
  [201, '新建或修改数据成功'],
  [202, '一个请求已经进入后台排队'],
  [204, '删除数据成功'],
  [400, '请求错误(InvalidParameter)'],
  [401, '用户没有权限'],
  [403, '用户得到授权，但是访问是被禁止的'],
  [404, 'Not found'],
  [408,'请求超时'],
  [410,'请求的资源被永久删除'],
  [500, '服务器内部错误(InternalError)'],
  [502, '网关错误'],
  [503, '服务不可用，服务器暂时过载或维护'],
  [504, '请求超时(Gateway Timeout)'],
]);

class HttpRequest {
    // private readonly baseUrl: string;
    // loading?: ILoadingInstance
    // interceptor?: customInterceptorType
    protected instance: AxiosInstance
    // showLoading: boolean

    constructor(config: customRequest) {
        // this.baseUrl = 'http://localhost:3000'
        this.instance = axios.create(config)
        // this.showLoading = config.showLoading || DEFAULT_LOADING

        //1.request拦截
        this.instance.interceptors.request.use((config) => {
          // console.log("request拦截=====>",config)

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
            config.headers.Authorization = token
          }
          */
            return config
          },
          (error) => {
            return error
          }
        )

        //2.response 拦截,处理返回结果
        this.instance.interceptors.response.use(res => {
          //console.log("instance response 拦截,处理返回结果",res)
          /*
            setTimeout(() => {
              this.loading?.close()
            }, 1000)
          */
            return res.data
          },
          (error) => {
            console.log("instance response错误处理1:",error.response)
            console.log("instance response错误处理2:",error)
            if(!error.response){
             return {
              data: null, 
              code: 408,
              msg:error
             }
            }
            const {status}=error.response
            const errorReq:customRequest ={
              data: null, 
              code: status,
              msg:codeMessage.get(status)
            }
            return errorReq
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
      //字符串
      if(typeof params === 'string') {
        // config = arguments[1] || {}
        //处理url
        // config.url = arguments[0]
        // if(arguments[2]) {
        //   config.showLoading = arguments[2] || {}
        // }
      } else {  
        config = params || {}
      }
      return new Promise((resolve) => {
        /*
        if (config.interceptor?.requestInterceptor) {  //可以删除，没有接口拦截器
          config = config.interceptor.requestInterceptor(config)
        }
        if(config.showLoading === false) {
          this.showLoading = false
        }
        */
        this.instance.request<any, T>(config).then((res) => {
          // console.log("this.instance.request-----res:",res)
          /*
          if (config.interceptor?.resInterceptor) {  //可以删除，没有接口拦截器
            config = config.interceptor.resInterceptor(res)
          }
          // this.showLoading = DEFAULT_LOADING
          */
          resolve(res)
        })
      })
    }

    toQueryString(obj:any) {
      return obj
        ? "?" +
        Object.keys(obj)
          .sort()
          .map(key => {
            let val = obj[key];
            if (Array.isArray(val)) {
              return val
                .sort()
                .map(function (val2) {
                  return key + "=" + val2;
                })
                .join("&");
            }
            return key + "=" + val;
          })
          .join("&")
        : "";
    }

    get<T>(options:customRequest,url:string): Promise<T>{
      if (options) {
        url += http.toQueryString(options);
      }
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
    timeout: 30000,
  }
)

export default http;
