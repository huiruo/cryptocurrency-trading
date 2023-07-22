import { apiPrefix } from '@common/constants'
import { ResType, fetchWithAuth } from './base'
import { Api, CodeListOptions, CodeListResponse } from './market.center.type'

interface ApiConfig {
  codeList: string

  // Add more API endpoints here...
  [key: string]: string
}

const apiConfig: ApiConfig = {
  codeList: '/code-engine/codeList',
}

export const marketCenterApi: Api = {
  codeList: async (
    options: CodeListOptions = { test: 123 },
  ): Promise<ResType<CodeListResponse>> => {
    const url = `${apiPrefix}${apiConfig.codeList}`
    const res = await fetchWithAuth<CodeListResponse>(
      url,
      { body: options },
      'GET',
    )
    const data = res.data || []
    return {
      code: res.code,
      msg: res.msg,
      data,
    }
  },
}
