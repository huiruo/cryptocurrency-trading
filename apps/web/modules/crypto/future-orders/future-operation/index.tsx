import React, { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { Button, DatePicker, Select, message } from 'antd'
import useFetchAssets from './useFetchAssets'
import { SUCCESS } from '@common/constants'
import store from '@stores/index'
import { appStoreActions, spotFilterState } from '@stores/appSlice'
import { fetchSpotOrders } from '@stores/thunkAction'
import { useAppSelector } from '@stores/hooks'
import { futureApi } from '@services/future'

// in milliseconds
const startTimeDefault = dayjs().startOf('day')
const endTimeDefault = dayjs().endOf('day')
const dateFormat = 'YYYY-MM-DD HH:mm:ss'

const { RangePicker } = DatePicker

export default function SpotOperation() {
  const { symbol } = useAppSelector(spotFilterState)
  const [syncAssetValue, setSyncAssetValue] = useState<string>('ARUSDT')
  const [assets] = useFetchAssets()

  const [selectedDates, setSelectedDates] = useState<[Dayjs, Dayjs]>([
    startTimeDefault,
    endTimeDefault,
  ])

  const syncFutureOrder = async () => {
    const [startOfSelectedDay, endOfSelectedDay] = selectedDates
    console.log('syncFutureOrder:', startOfSelectedDay, endOfSelectedDay)
    const params = {
      symbol: syncAssetValue,
      startTime: startOfSelectedDay.valueOf(),
      endTime: endOfSelectedDay.valueOf(),
    }
    // TODO:test
    /*
    const params = {
      symbol: 'BTCUSDT',
      startTime: 1677945600000,
      endTime: 1678031999999,
    }
    */
    /*
    const params = {
      endTime: 1677513599999,
      startTime: 1677427200000,
      symbol: syncAssetValue,
    }
    */
    const res = await futureApi.syncFutureOrder(params)
    if (res.code === SUCCESS) {
      message.success(res.msg)
      store.dispatch(appStoreActions.setSpotFilter({ symbol: syncAssetValue }))
      await store.dispatch(fetchSpotOrders({}))
    } else {
      message.error(res.msg || 'error')
    }
  }

  const onChangeAsset = (value: string, type: number) => {
    if (type === 1) {
      setSyncAssetValue(value)
    } else {
      store.dispatch(appStoreActions.setSpotFilter({ symbol: value }))
    }
  }

  const onSearchSpotOrder = () => {
    store.dispatch(
      fetchSpotOrders({
        current: 1,
        page: 10,
      }),
    )
  }

  const handleRangePickerChange = (dates: null | (Dayjs | null)[]) => {
    if (dates) {
      const startOfSelectedDay = dates[0]?.startOf('day') as Dayjs
      const endOfSelectedDay = dates[1]?.endOf('day') as Dayjs
      setSelectedDates([startOfSelectedDay, endOfSelectedDay])
    }
  }

  return (
    <div>
      <div className="flex-between common-top2-mg">
        <div className="common-bottom-mg">
          <span>symbol: </span>
          <Select
            showSearch
            placeholder="Select a asset"
            optionFilterProp="children"
            onChange={(e) => onChangeAsset(e, 1)}
            filterOption={(input, option) =>
              (option?.name ?? '').toLowerCase().includes(input.toLowerCase())
            }
            value={syncAssetValue}
            fieldNames={{ label: 'name', value: 'name' }}
            options={assets}
            style={{ width: '150px' }}
          />
          <RangePicker
            value={selectedDates}
            onChange={handleRangePickerChange}
            format={dateFormat}
            className="common-x-mg"
          />

          <Button onClick={() => syncFutureOrder()} className="bright-btn">
            Sync future orders
          </Button>
        </div>
      </div>

      <div className="common-bottom-mg">
        <span>symbol: </span>
        <Select
          showSearch
          placeholder="Select a asset"
          optionFilterProp="children"
          onChange={(e) => onChangeAsset(e, 2)}
          filterOption={(input, option) =>
            (option?.name ?? '').toLowerCase().includes(input.toLowerCase())
          }
          fieldNames={{ label: 'name', value: 'name' }}
          value={symbol}
          options={assets}
          style={{ width: '150px' }}
        />

        <Button
          onClick={onSearchSpotOrder}
          className="bright-btn search-btn common-left-mg"
        >
          Search
        </Button>
      </div>
    </div>
  )
}
