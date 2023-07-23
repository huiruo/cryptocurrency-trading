import axios, {
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios'
import { Api, ApiConfig, SymbolsPrice } from './request.type'

const baseURL = ''

const apiConfig: ApiConfig = {
  // https://binance-docs.github.io/apidocs/spot/cn/#8ff46b58de
  tickerPrice: 'https://api.binance.com/api/v3/ticker/price',
}

const instance = axios.create({
  baseURL,
})

instance.interceptors.request.use(
  (config: InternalAxiosRequestConfig<AxiosRequestConfig>) => {
    return config
  },
  (error: AxiosError) => {
    console.error('interceptors.request error:', error)
    return Promise.reject(error)
  },
)

instance.interceptors.response.use(
  (response: AxiosResponse) => {
    return response.data
  },
  (error: AxiosError) => {
    return Promise.reject(error)
  },
)

const fetchWithAuth = async <T>(
  url: string,
  options = {},
  method = 'POST',
): Promise<T> => {
  try {
    const config: AxiosRequestConfig = {
      method,
      ...options,
    }
    const response = await instance(url, config)

    return response as T
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any | { response?: AxiosResponse<T> }) {
    console.log('fetchWithAuth error', error)
    return error?.response as T
  }
}

export const services: Api = {
  getSymbolsPrice: async (symbols = []): Promise<SymbolsPrice[]> => {
    const url = `${apiConfig.tickerPrice}?symbols=["${symbols.join('","')}"]`
    console.log('getSymbolsPrice-url', url)
    return await fetchWithAuth(url, { params: {} }, 'GET')
  },
}
