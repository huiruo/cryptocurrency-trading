import React, { useState } from 'react';
import { DatePicker } from 'antd';
import { Box } from '@fower/react';
import { Button } from '@/common/button/Button';
import { isEmpty } from 'lodash';
import { toast } from '@/common/toast';
import moment from 'moment';

interface Props {
  filterProfitCallback: (selectDate: string[]) => void
  defaultDate: string[]
}

/**
 * Code annotation
 */
const { RangePicker } = DatePicker;
const dateFormat = 'YYYY-MM-DD HH:mm:ss';

export function FilterProfitStatistics(props: Props) {
  const { filterProfitCallback, defaultDate } = props
  const [selectDate, setSelectDate] = useState<string[]>([defaultDate[0], defaultDate[1]]);

  const handleDateChange = (_: any, dateString: string[]) => {
    let startDate = ''
    let endDate = ''
    if (dateString[0]) {
      startDate = moment(dateString[0]).startOf('day').format('YYYY-MM-DD HH:mm:ss')
    }

    if (dateString[1]) {
      endDate = moment(dateString[1]).endOf('day').format('YYYY-MM-DD HH:mm:ss')
    }

    setSelectDate([startDate, endDate])
  }

  const onFilter = () => {
    if (isEmpty(selectDate[0]) || isEmpty(selectDate[1])) {
      toast.warning('Date is empty')

      return
    }

    filterProfitCallback(selectDate)
  }

  return (
    <Box my='10px' ml='10px'>
      <RangePicker
        onChange={handleDateChange}
        defaultValue={[moment(defaultDate[0], dateFormat), moment(defaultDate[1], dateFormat)]}
      // picker="month"
      // format={dateFormat}
      />
      <Button onClick={onFilter} ml='8px'>Filter</Button>
    </Box>
  )
}

export default FilterProfitStatistics;