import { useState, useEffect } from 'react'
import { spotApi } from '@services/spot'
import { AssetType } from '@services/spot.type'
import { SUCCESS } from '@common/constants'

const useFetchAssets = (): [AssetType[], boolean, string] => {
  const [data, setData] = useState<AssetType[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    const fetchImages = async () => {
      setIsLoading(true)

      try {
        const data = await spotApi.getAssets({
          currentPage: 1,
          pageSize: 20,
        })
        if (data.code === SUCCESS) {
          setData(data.data)
        } else {
          setError(data.msg)
        }
      } catch (error: unknown) {
        setError('getAssets error')
      }

      setIsLoading(false)
    }

    fetchImages()
  }, [])

  return [data, isLoading, error]
}

export default useFetchAssets
