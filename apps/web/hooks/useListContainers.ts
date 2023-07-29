import { useState, useEffect } from 'react'
import { codePlatformApi } from '@services/code.platform'
import { message } from 'antd'
import { getCookie, setCookie } from 'cookies-next'
import { useRouter } from 'next/router'

const useListContainers = () => {
  const [loading, setLoading] = useState(false)
  const [data, setData] = useState(null)
  const router = useRouter()
  const { codeToken: loginToken } = router.query

  const listContainers = async (isRunning = false) => {
    const params = { isRunning }
    try {
      const res = await codePlatformApi.listContainers(params)
      if (res?.code === 1) {
        setData(res.data)
        setLoading(false)
      } else {
        const isObject =
          Object.prototype.toString.call(res.msg) === '[object Object]'
        message.warning(isObject ? JSON.stringify(res.msg) : res.msg)
        setLoading(false)
      }
    } catch (error) {
      console.error(error)
      setLoading(false)
    }
  }

  useEffect(() => {
    const cookieToken = getCookie('token')
    if (!loginToken && !cookieToken) {
      return
    }

    if (loginToken && loginToken !== cookieToken) {
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
