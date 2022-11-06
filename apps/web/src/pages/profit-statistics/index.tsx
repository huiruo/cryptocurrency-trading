import React, { useEffect, useRef, useState } from 'react';
import traderApi from '@/services/traderApi';
import { DailyProfitType } from '@/utils/types';
import { Box } from '@fower/react';
import { toast } from '@/common/toast';
import moment from 'moment';
import * as echarts from 'echarts';
import { EChartsType } from 'echarts/core';
import FilterProfitStatistics from '@/components/filter-profit-statistics';
import { RadioGroup } from '@/common/radio';

/**
 * Code annotation
 */
const startDateDefault = moment().month(moment().month() - 1).startOf('month').format('YYYY-MM-DD HH:mm:ss');
const endDateDefault = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');

const options = [
  { label: 'Bar', value: 'bar' },
  { label: 'Line', value: 'line' },
];

export function ProfitStatistics() {
  const [dateList, setDateList] = useState<any[]>()
  const [profitList, setProfitList] = useState<any[]>()
  const [chartType, setChartType] = useState('line');

  const echartRef = useRef<any>(null)
  const cInstance = useRef<EChartsType>();

  const getProfitStatistics = async (filterDate: string[]) => {
    const res = await traderApi.getDailyProfit({
      startDate: filterDate[0],
      endDate: filterDate[1],
    })

    if (res.code === 200) {
      const dateList: string[] = []
      const profitList: number[] = []
      res.data.forEach((item: DailyProfitType) => {
        const { time, profit } = item
        dateList.push(time)
        profitList.push(profit)
      })

      setProfitList(profitList)
      setDateList(dateList)
    } else {
      toast.error("Failed to get daily profit", {
        type: 'error',
      })
    }
  }

  useEffect(() => {
    getProfitStatistics([startDateDefault, endDateDefault])
    cInstance.current = echarts.init(echartRef.current) as any;
  }, [])

  useEffect(() => {
    const option = {
      xAxis: {
        type: 'category',
        data: dateList
      },
      yAxis: {
        type: 'value'
      },
      series: [{
        data: profitList,
        type: chartType
      }],
      tooltip: {
        show: true,
        confine: true,
      },
      label: {
        show: true
      }
    }

    cInstance.current && cInstance.current.setOption(option);

  }, [profitList, dateList, chartType])

  const onChangeRadioGroup = (val: any) => {
    setChartType(val)
  }

  return (
    <Box toCenterX mb='20px'>
      {/* <Header /> */}
      <Box w='90%'>
        <Box flex justifyContent='space-between'>
          <FilterProfitStatistics filterProfitCallback={getProfitStatistics} defaultDate={[startDateDefault, endDateDefault]} />
          <RadioGroup options={options} onChange={onChangeRadioGroup} value={chartType} />
        </Box>
        <Box ref={echartRef} bg='#fafafa' h='500px' w='100%' />
      </Box>
    </Box>
  )
}
