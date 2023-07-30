import React, { useState } from 'react'
import dayjs, { Dayjs } from 'dayjs'
import { Button, DatePicker, Select, message } from 'antd'
import AddAsset from './AddAsset'
import useFetchAssets from './useFetchAssets'
import { spotApi } from '@services/spot'
import { GetSpotOrderParamsNoPage } from '@services/spot.type'
import { SUCCESS } from '@common/constants'

// in milliseconds
const startTimeDefault = dayjs().startOf('day')
const endTimeDefault = dayjs().endOf('day')
const dateFormat = 'YYYY-MM-DD HH:mm:ss'

const { RangePicker } = DatePicker

interface Props {
  searchCallBack: (getSpotOrderParams: GetSpotOrderParamsNoPage) => void
}

export default function SpotOperation(props: Props) {
  const { searchCallBack } = props
  const [isModalOpen, setIsModalOpen] = useState(false)
  // test MKRUSDT ARUSDT
  const [searchAssetValue, setSearchAssetValue] = useState<string>('MKRUSDT')
  const [syncAssetValue, setSyncAssetValue] = useState<string>('')
  const [assets] = useFetchAssets()

  const [selectedDates, setSelectedDates] = useState<[Dayjs, Dayjs]>([
    startTimeDefault,
    endTimeDefault,
  ])

  const syncSpotOrder = async () => {
    const [startOfSelectedDay, endOfSelectedDay] = selectedDates
    console.log('syncSpotOrder:', startOfSelectedDay, endOfSelectedDay)
    // const params = {
    //   symbol: syncAssetValue,
    //   startTime: startOfSelectedDay.valueOf(),
    //   endTime: endOfSelectedDay.valueOf(),
    // }
    // TODO:test
    /*
    const params = {
      symbol: 'BTCUSDT',
      startTime: 1677945600000,
      endTime: 1678031999999,
    }
    */
    const params = {
      endTime: 1677513599999,
      startTime: 1677427200000,
      symbol: 'ARUSDT',
    }
    const res = await spotApi.syncSpotOrder(params)
    if (res.code === SUCCESS) {
      message.success(res.msg)
    } else {
      message.error(res.msg || 'error')
    }
  }

  const onAddAsset = () => {
    setIsModalOpen(true)
  }

  const addAssetCallBack = (isModalOpen: boolean) => {
    setIsModalOpen(isModalOpen)
  }

  const onChangeAssetValue = (value: string, type: number) => {
    if (type === 1) {
      setSyncAssetValue(value)
    } else {
      setSearchAssetValue(value)
    }
  }

  const onSearchSpotOrder = () => {
    searchCallBack({ symbol: searchAssetValue })
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
            onChange={(e) => onChangeAssetValue(e, 1)}
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

          <Button onClick={() => syncSpotOrder()} className="bright-btn">
            Sync spot orders
          </Button>
        </div>

        <Button onClick={onAddAsset}>Add symbol</Button>
      </div>

      <div className="common-bottom-mg">
        <span>symbol: </span>
        <Select
          showSearch
          placeholder="Select a asset"
          optionFilterProp="children"
          onChange={(e) => onChangeAssetValue(e, 2)}
          filterOption={(input, option) =>
            (option?.name ?? '').toLowerCase().includes(input.toLowerCase())
          }
          fieldNames={{ label: 'name', value: 'name' }}
          value={searchAssetValue}
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

      <AddAsset isModalOpen={isModalOpen} addAssetCallBack={addAssetCallBack} />
    </div>
  )
}
