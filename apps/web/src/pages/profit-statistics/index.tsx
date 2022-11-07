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
const startTimeDefault = moment().month(moment().month() - 1).startOf('month').format('YYYY-MM-DD HH:mm:ss');
const endTimeDefault = moment().endOf('day').format('YYYY-MM-DD HH:mm:ss');

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

  const getProfitStatistics = async (filterTime: string[]) => {
    const res = await traderApi.getDailyProfit({
      startTime: filterTime[0],
      endTime: filterTime[1],
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
    getProfitStatistics([startTimeDefault, endTimeDefault])
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
          <FilterProfitStatistics filterProfitCallback={getProfitStatistics} defaultTime={[startTimeDefault, endTimeDefault]} />
          <RadioGroup options={options} onChange={onChangeRadioGroup} value={chartType} />
        </Box>
        <Box ref={echartRef} bg='#fafafa' h='500px' w='100%' />
      </Box>
    </Box>
  )
}
