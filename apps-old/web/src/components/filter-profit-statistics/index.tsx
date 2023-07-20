import React, { useState } from 'react';
import { DatePicker as MyDatePicker } from 'antd';
import { Box } from '@fower/react';
import { Button } from '@/common/button/Button';
import { isEmpty } from 'lodash';
import { toast } from '@/common/toast';
import moment from 'moment';

interface Props {
  filterProfitCallback: (selectTime: string[]) => void
  defaultTime: string[]
}

/**
 * Code annotation
 */
let DatePicker: any = MyDatePicker
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD HH:mm:ss';

export function FilterProfitStatistics(props: Props) {
  const { filterProfitCallback, defaultTime } = props
  const [selectTime, setSelectTime] = useState<string[]>([defaultTime[0], defaultTime[1]]);

  const handleDateChange = (_: any, dateString: string[]) => {
    let startTime = ''
    let endTime = ''
    if (dateString[0]) {
      startTime = moment(dateString[0]).startOf('day').format('YYYY-MM-DD HH:mm:ss')
    }

    if (dateString[1]) {
      endTime = moment(dateString[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss')
    }

    setSelectTime([startTime, endTime])
  }

  const onFilter = () => {
    if (isEmpty(selectTime[0]) || isEmpty(selectTime[1])) {
      toast.warning('Date is empty')

      return
    }

    filterProfitCallback(selectTime)
  }

  return (
    <Box my='10px' ml='10px'>
      <RangePicker
        onChange={handleDateChange}
        defaultValue={[moment(defaultTime[0], dateFormat), moment(defaultTime[1], dateFormat)]}
      // picker="month"
      // format={dateFormat}
      />
      <Button onClick={onFilter} ml='8px'>Filter</Button>
    </Box>
  )
}

export default FilterProfitStatistics;