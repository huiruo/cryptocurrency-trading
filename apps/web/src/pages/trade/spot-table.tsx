import React, { useState } from 'react';
import { Box } from '@fower/react';
import { Table } from '@/common/table/Table';
import { formatUnixTime } from '@/utils';
import { Checkbox } from '@/common/checkbox';
import { Button } from '@/common/button';
import traderApi from '@/services/traderApi';
import { get } from 'lodash';
import { SpotOrder } from '@/utils/types';

interface Props {
  data: SpotOrder[]
}

/**
 * Code annotation
 */
export function SpotTable(props: Props) {
  const { data } = props
  const [selectRows, setSelectRows] = useState<number[]>([])
  const [selectRowData, setSelectRowData] = useState<SpotOrder[]>([])

  const onCreatStrategy = async () => {
    if (!selectRows.length) {
      alert('select empty')

      return
    }

    if (selectRows.length >= 2) {
      alert('select Greater than 2')

      return
    }

    const index = get(selectRows, '[0]', 0)
    const selectRow = get(data, `${[index]}`, 0)
    const params = {
      ...selectRow
    }
    const res = await traderApi.creatStrategiesApi(params)
    if (res.code === 200) {

      console.log('create success');

    } else {
      console.log("creatStrategys error")
    }
  }

  const onCloseStrategy = async () => {
    console.log('onCloseStrategy selectRows', selectRows);
    if (!selectRows.length) {
      alert('select empty')

      return
    }

    selectRowData.sort((a: SpotOrder, b: SpotOrder) => {
      // return Number(b.time) - Number(a.time);
      return Number(a.time) - Number(b.time);
    })
    console.log('sorted:', selectRowData);
    const res = await traderApi.closeSpotStrategyApi(selectRowData)
    if (res.code === 200) {

      console.log('Merge strategy success');

    } else {
      console.log("Merge strategy error")
    }
  }

  const onMergeStrategy = async () => {
    console.log('onMergeStrategy selectRows', selectRows);
    if (!selectRows.length) {
      alert('select empty')

      return
    }

    selectRowData.sort((a: SpotOrder, b: SpotOrder) => {
      return Number(b.time) - Number(a.time);
    })
    console.log('sorted:', selectRowData);
    const res = await traderApi.mergeSpotStrategiesApi(selectRowData)
    if (res.code === 200) {

      console.log('Merge strategy success');

    } else {
      console.log("Merge strategy error")
    }
  }

  const onSelectChange = (index: number, checked: boolean, item: SpotOrder) => {
    /*
    if (checked) {
      keySet.delete(index);
      setSelectRows(Array.from(keySet))
    } else {
      keySet.add(index);
      setSelectRows(Array.from(keySet))
    }
    */

    if (checked) {
      const { strategyId } = item
      const arrIndex = selectRows.findIndex(i => {
        return i === index;
      });
      const arrDataIndex = selectRowData.findIndex(item => {
        return item.strategyId === strategyId;
      });
      selectRows.splice(arrIndex, 1)
      selectRowData.splice(arrDataIndex, 1)
    } else {
      selectRows.push(index)
      selectRowData.push(item)
    }
    setSelectRows([...selectRows])
    setSelectRowData([...selectRowData])

    console.log('se；', selectRows);
    console.log('se；', selectRowData);
  }

  const columns = [
    {
      title: '',
      dataIndex: '',
      key: '',
      width: 200,
      render(item: SpotOrder, _e: any, index: number) {
        /*
        const keySet = new Set(selectRows);
        const checked = keySet.has(index);
        */
        const checked = selectRows.includes(index)
        return (
          // <Checkbox checked={checked} onChange={() => onSelectChange(index, checked, keySet)} />
          <Checkbox checked={checked} onChange={() => onSelectChange(index, checked, item)} />
        )
      },
    },
    {
      id: 'time', title: 'Date', dataIndex: '', key: 'time', width: 100,
      render(item: SpotOrder) {
        return <Box w='145px'>{formatUnixTime(Number(item.time))}</Box>
      },
    },
    { id: 'symbol', title: 'Symbol', dataIndex: 'symbol', key: 'symbol', width: 100 },
    {
      id: 'isBuyer', title: 'Side', dataIndex: '', key: 'isBuyer', width: 100,
      render(item: SpotOrder) {
        return <Box>
          {item.isBuyer ? <Box as='span' color='#0ECB81'>BUY</Box>
            : <Box as='span' color='#F6465D'>SELL</Box>}
        </Box>
      },
    },
    { id: 'price', title: 'Price', dataIndex: 'price', key: 'price', width: 100 },
    {
      id: 'qty', title: 'qty', dataIndex: '', key: 'qty', width: 100,
      render(item: SpotOrder) {
        return <Box>
          <Box>{item.qty}</Box>
          <Box>{item.quoteQty}</Box>
        </Box>
      },
    },
    // { id: 'qty', title: 'qty', dataIndex: 'qty', key: 'qty', width: 100 },
    // { id: 'quoteQty', title: 'quoteQty', dataIndex: 'quoteQty', key: 'quoteQty', width: 100 },
    { id: 'orderId', title: 'OrderId', dataIndex: 'orderId', key: 'orderId', width: 100 },
    {
      id: 'strategyId', title: 'StrategyId', dataIndex: '', key: 'strategyId', width: 100,
      render(item: SpotOrder) {
        return <Box>
          <Box>{item.strategyId}</Box>
          <Box>UserId:{item.userId}</Box>
        </Box>
      },
    },
    { id: 'commission', title: 'Commission', dataIndex: 'commission', key: 'commission', width: 100 },
    { id: 'commissionAsset', title: 'CommissionAsset', dataIndex: 'commissionAsset', key: 'commissionAsset' },
    { id: 'isMaker', title: 'IsMaker', dataIndex: 'isMaker', key: 'isMaker', width: 100 },
    { id: 'isBestMatch', title: 'IsBestMatch', dataIndex: 'isBestMatch', key: 'isBestMatch', width: 100 },
    {
      id: 'updatedAt', title: 'Updated', dataIndex: '', key: 'updatedAt', width: 100,
      render(item: any) {
        return <Box w='145px'>{formatUnixTime(item.updatedAt)}</Box>
      },
    },
  ]

  return (
    <Box toCenterX>
      <Box className='table-box-container'>
        <Table columns={columns} data={data} className='table-box' />

        <Box mt-10>
          <Button onClick={() => onCreatStrategy()} mr4>Creat strategy</Button>
          <Button onClick={() => onMergeStrategy()} mr4>Merge strategy</Button>
          <Button onClick={() => onCloseStrategy()} mr4>Close strategy</Button>
        </Box>
      </Box>
    </Box>
  );
}
