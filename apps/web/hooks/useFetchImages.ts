import { services } from '@services/api'
import { useState, useEffect } from 'react'

interface ImgType {
  containers: number
  created: number
  id: string
  name: string
  size: number
}

const useFetchImg = (): [ImgType[], boolean, Error | null] => {
  const [data, setData] = useState<ImgType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true)

      try {
        console.log('useFetchImg==>')
        const data = await services.listImg()
        if (data.code === 1) {
          setData(data.data)
        } else {
          setError(data.msg)
        }
      } catch (error: unknown) {
        setError(error as Error)
      }

      setIsLoading(false)
    }

    fetchImages()
  }, [])

  return [data, isLoading, error]
}

export default useFetchImg
