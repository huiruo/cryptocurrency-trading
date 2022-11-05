import React, { useEffect, useRef, useState } from 'react';
import Header from '@/components/header';
import traderApi from '@/services/traderApi';
import { DailyProfitType } from '@/utils/types';
import { Box } from '@fower/react';
import { toast } from '@/common/toast';


import * as echarts from 'echarts';
import { EChartsType } from 'echarts/core';
import {
  BarChart,
  // 系列类型的定义后缀都为 SeriesOption
  BarSeriesOption,
  LineChart,
  LineSeriesOption
} from 'echarts/charts';
import {
  TitleComponent,
  // 组件类型的定义后缀都为 ComponentOption
  TitleComponentOption,
  TooltipComponent,
  TooltipComponentOption,
  GridComponent,
  GridComponentOption,
  // 数据集组件
  DatasetComponent,
  DatasetComponentOption,
  // 内置数据转换器组件 (filter, sort)
  TransformComponent
} from 'echarts/components';
import { LabelLayout, UniversalTransition } from 'echarts/features';
import { CanvasRenderer } from 'echarts/renderers';

// 通过 ComposeOption 来组合出一个只有必须组件和图表的 Option 类型
type ECOption = echarts.ComposeOption<
  | BarSeriesOption
  | LineSeriesOption
  | TitleComponentOption
  | TooltipComponentOption
  | GridComponentOption
  | DatasetComponentOption
>;

// 注册必须的组件
// echarts.use([
//   TitleComponent,
//   TooltipComponent,
//   GridComponent,
//   DatasetComponent,
//   TransformComponent,
//   BarChart,
//   LineChart,
//   LabelLayout,
//   UniversalTransition,
//   CanvasRenderer
// ]);


// 注册必须的组件
echarts.use([
  TitleComponent as any,
  TooltipComponent,
  GridComponent,
  DatasetComponent,
  TransformComponent,
  BarChart,
  LineChart,
  LabelLayout,
  UniversalTransition,
  CanvasRenderer
]);

/**
 * Code annotation
 */
export function ProfitStatistics() {
  const [dateList, setDateList] = useState<any[]>()
  const [profitList, setProfitList] = useState<any[]>()

  const echartRef = useRef<any>(null)

  const cInstance = useRef<EChartsType>();


  const getProfitStatistics = async () => {
    const res = await traderApi.getDailyProfit({})
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
    getProfitStatistics()
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
      series: [
        {
          data: profitList,
          type: 'bar'
        }
      ],
      tooltip: {
        show: true,
        confine: true,
      },
      label: {
        show: true
      }
    };

    /*
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
        type: 'line'
      }],
      tooltip: {
        show: true,
        confine: true,
      },
      label: {
        show: true
      }
    }
    */
    cInstance.current && cInstance.current.setOption(option);
  }, [profitList, dateList])

  return (
    <>
      <Header />
      <Box ref={echartRef} style={{ height: 400 }} />
    </>
  )
}
