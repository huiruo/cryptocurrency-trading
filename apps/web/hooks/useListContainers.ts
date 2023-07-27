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
  console.log('useListContainers=>token==>', loginToken, router)

  const listContainers = async (isRunning = false) => {
    const params = { isRunning }
    try {
      const res = await codePlatformApi.listContainers(params)
      console.log('listContainers==>', data)
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
    /*
    if (!loginToken) {
      return
    }

    const isExpired = sessionStorage.getItem('isTokenExpired')
    if (isExpired !== '1' && !cookieToken) {
    */

    const cookieToken = getCookie('token')
    console.log('isTokenExpired==>1', cookieToken)
    if (loginToken && loginToken !== cookieToken) {
      // console.log('isTokenExpired==>2')
      // sessionStorage.setItem('isTokenExpired', '1')
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
