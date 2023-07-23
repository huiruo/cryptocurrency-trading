import { apiPrefix } from '@common/constants'
import { ResType, fetchWithAuth } from './base'
import { Api, StatisticsAccountResponse, Account } from './market.center.type'

interface ApiConfig {
  syncAccount: string
  statisticsAccount: string
}

const apiConfig: ApiConfig = {
  syncAccount: '/market.center/syncBalances',
  statisticsAccount: '/market.center/statisticsAccount',
}

export const marketCenterApi: Api = {
  syncAccount: async (): Promise<ResType<Account>> => {
    const url = `${apiPrefix}${apiConfig.syncAccount}`
    return await fetchWithAuth<Account>(url, { body: {} }, 'GET')
  },
  statisticsAccount: async (): Promise<ResType<StatisticsAccountResponse>> => {
    const url = `${apiPrefix}${apiConfig.statisticsAccount}`
    return await fetchWithAuth<StatisticsAccountResponse>(
      url,
      { body: {} },
      'GET',
    )
  },
}
