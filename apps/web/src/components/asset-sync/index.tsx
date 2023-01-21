import React, { useState } from 'react';
import { Box } from '@fower/react';
import { Button } from '@/common/button';
import { useNavigate } from 'react-router-dom';
import { Asset } from '../asset';
import moment from 'moment';
import { DatePicker as MyDatePicker } from 'antd';

interface Props {
  spotCallBack: (value: string, selectTime: number[]) => void
  assetSyncValue: string
  assetSyncValueCallback: (value: string) => void
}

const startTimeDefault = Number(moment().startOf('day').format('x'));
const endTimeDefault = Number(moment().endOf('day').format('x'));
const dateFormat = 'YYYY-MM-DD HH:mm:ss';

let DatePicker: any = MyDatePicker
const { RangePicker } = DatePicker;

/**
 * Asset Select
 */
export function AssetSync(props: Props) {

  const { spotCallBack, assetSyncValue, assetSyncValueCallback } = props
  const [selectTime, setSelectTime] = useState<number[]>([startTimeDefault, endTimeDefault]);
  const navigate = useNavigate();

  const onAddAsset = () => {
    navigate('/trade/addAsset')
  }

  const assetSelectCallback = (val: string) => {
    assetSyncValueCallback(val)
  }

  const handleDateChange = (_: any, dateString: string[]) => {
    let startDateUnix = 0
    let endDateUnix = 0
    if (dateString[0]) {
      const startDate = moment(dateString[0]).startOf('day').format('YYYY-MM-DD HH:mm:ss')
      startDateUnix = Number(moment(startDate).format('x'))
    }

    if (dateString[1]) {
      const endDate = moment(dateString[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss')
      endDateUnix = Number(moment(endDate).format('x'))
    }

    console.log('handleDateChange:', [startDateUnix, endDateUnix]);
    setSelectTime([startDateUnix, endDateUnix])
  }

  return (
    <Box flex toCenterY>
      <Asset onChange={assetSelectCallback} value={assetSyncValue} />

      <Box ml='4px'>
        <RangePicker
          onChange={handleDateChange}
          defaultValue={[moment(moment(startTimeDefault).format(dateFormat)), moment(moment(endTimeDefault).format(dateFormat))]}
        />
      </Box>

      <Button onClick={() => spotCallBack(assetSyncValue, selectTime)} ml4 mr4>Sync spot orders</Button>
      <Button ml2 onClick={onAddAsset}>Add code</Button>
    </Box>
  )
}
