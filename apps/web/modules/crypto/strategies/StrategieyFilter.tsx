import React, { useEffect } from 'react'
import { Button, Select } from 'antd'
import { SelectStatusType, StgStatus } from '@services/strategy.type'
import useFetchAssets from '../spot-orders/spot-operation/useFetchAssets'
import store from '@stores/index'
import { appStoreActions, stgFilterState } from '@stores/appSlice'
import { useAppSelector } from '@stores/hooks'
import { fetchStgOrders } from '@stores/thunkAction'

const options: SelectStatusType[] = [
  {
    label: 'All status',
    name: 2,
  },
  {
    label: 'Running',
    name: 1,
  },
  {
    label: 'Ended',
    name: 0,
  },
]

export function StrategieyFilter() {
  const [assets] = useFetchAssets()
  const { asset, status } = useAppSelector(stgFilterState)

  const onChangeStatus = (value: number) => {
    store.dispatch(
      appStoreActions.setStgFilter({
        status: value as StgStatus,
        asset,
      }),
    )
  }

  const onChangeAsset = (value: string) => {
    store.dispatch(
      appStoreActions.setStgFilter({
        status,
        asset: value,
      }),
    )
  }

  const getStgOrder = () => {
    store.dispatch(fetchStgOrders({}))
  }

  useEffect(() => {
    getStgOrder()
  }, [])

  return (
    <div className="common-top2-mg">
      <span>status: </span>
      <Select
        options={options.map((i) => ({ label: i.label, value: i.name }))}
        value={status}
        onChange={onChangeStatus}
        className="common-right-mg"
      />
      <span>symbol: </span>
      <Select
        showSearch
        placeholder="Select a asset"
        optionFilterProp="children"
        onChange={(e) => onChangeAsset(e)}
        filterOption={(input, option) =>
          (option?.name ?? '').toLowerCase().includes(input.toLowerCase())
        }
        value={asset}
        fieldNames={{ label: 'name', value: 'name' }}
        options={assets}
        style={{ width: '150px' }}
      />

      <Button onClick={getStgOrder} className="bright-btn common-left-mg">
        Search strategies
      </Button>
    </div>
  )
}
