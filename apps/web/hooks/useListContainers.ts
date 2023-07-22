import { useState, useEffect } from 'react'
import { codePlatformApi } from '@services/code.platform'
import { message } from 'antd'
import { getCookie, setCookie } from 'cookies-next'

interface ListContainersType {
  loginToken: string
}

const useListContainers = ({ loginToken }: ListContainersType) => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)

  const listContainers = async (isRunning = false) => {
    const params = { isRunning }
    try {
      const data = await codePlatformApi.listContainers(params)
      console.log('listContainers==>', data)
      if (data?.code === 1) {
        setData(data.data)
        setLoading(false)
      } else {
        const isObject =
          Object.prototype.toString.call(data.msg) === '[object Object]'
        message.warning(isObject ? JSON.stringify(data.msg) : data.msg)
        setLoading(false)
      }
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    if (!loginToken) {
      return
    }

    const isExpired = sessionStorage.getItem('isTokenExpired')
    const cookieToken = getCookie('token')
    if (isExpired !== '1' && !cookieToken) {
      sessionStorage.setItem('isTokenExpired', '1')
      setCookie('token', loginToken)
    }

    setLoading(true)

    listContainers()
  }, [])

  const refetch = (isRunning?: boolean) => {
    setLoading(true)
    listContainers(isRunning)
  }

  return { loading, data, refetch }
}

export default useListContainers
