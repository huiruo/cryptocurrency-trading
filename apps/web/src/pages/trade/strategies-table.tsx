import React, { useState } from 'react';
import { Box } from '@fower/react';
import { Table } from '@/components/Table/Table';
import { formatUnixTime } from '@/utils';
import { Checkbox } from '@/components/checkbox';
import { Button } from '@/components/Button';
import traderApi from '@/services/traderApi';
import { get } from 'lodash';
import { StrategiesOrder } from '@/utils/types';

interface Props {
  data: StrategiesOrder[]
  syncCallBack: () => void
}

/**
 * Code annotation
 */
export function StrategiesTable(props: Props) {
  const { data, syncCallBack } = props
  const [selectRows, setSelectRows] = useState<number[]>([])

  const onSyncPrice = async () => {
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
    if (!selectRow.is_running) {
      alert('This strategyis closed and cannot be updated')

      return
    }
    const params = {
      ...selectRow
    }
    const res = await traderApi.syncStrategyPriceApi(params)
    if (res.code === 200) {

      console.log('create success');
      syncCallBack()
    } else {
      console.log("creatStrategys error")
    }
  }

  const onMergeStrategy = () => {
    console.log('onMergeStrategy selectRows', selectRows);
  }

  const onSelectChange = (index: number, checked: boolean, keySet?: any) => {
    const arrIndex = selectRows.findIndex(i => {
      return i === index;
    });

    if (checked) {
      selectRows.splice(arrIndex, 1)
    } else {
      selectRows.push(index)
    }
    setSelectRows([...selectRows])

    console.log('se；', selectRows);
  }

  const columns = [
    {
      title: 'Select',
      dataIndex: '',
      key: '',
      width: 200,
      render(_item: any, _e: any, index: number) {
        const checked = selectRows.includes(index)
        return (
          <Checkbox checked={checked} onChange={() => onSelectChange(index, checked)} />
        )
      },
    },
    { id: 'symbol', title: 'symbol', dataIndex: 'symbol', key: 'symbol', width: 100 },
    {
      id: 'time', title: 'time', dataIndex: '', key: 'time', width: 100,
      render(item: any) {
        return <span>{formatUnixTime(Number(item.time))}</span>
      },
    },
    {
      id: 'updatedAt', title: 'updated', dataIndex: '', key: 'updatedAt', width: 100,
      render(item: any) {
        return <span>{formatUnixTime(item.updatedAt)}</span>
      },
    },
    { id: 'price', title: 'price', dataIndex: 'price', key: 'price', width: 100 },
    { id: 'profit', title: 'profit', dataIndex: 'profit', key: 'profit', width: 100 },
    { id: 'profitRate', title: 'profitRate', dataIndex: 'profitRate', key: 'profitRate', width: 100 },
    { id: 'entryPrice', title: 'entryPrice', dataIndex: 'entryPrice', key: 'entryPrice', width: 100 },
    { id: 'sellingPrice', title: 'sellingPrice', dataIndex: 'sellingPrice', key: 'sellingPrice', width: 100 },
    { id: 'qty', title: 'qty', dataIndex: 'qty', key: 'qty', width: 100 },
    { id: 'quoteQty', title: 'quoteQty', dataIndex: 'quoteQty', key: 'quoteQty', width: 100 },
    { id: 'is_running', title: 'is_running', dataIndex: 'is_running', key: 'is_running', width: 100 },
    { id: 'strategyId', title: 'strategyId', dataIndex: 'strategyId', key: 'strategyId', width: 100 },
    { id: 'userId', title: 'userId', dataIndex: 'userId', key: 'userId', width: 100 },
    // {
    //   id: 'createdAt', title: 'createdAt', dataIndex: '', key: 'createdAt', width: 100,
    //   render(item: any) {
    //     return <span>{formatUnixTime(item.createdAt)}</span>
    //   },
    // },
  ]

  return (
    <Box toCenterX>
      <Box className='table-box-container'>
        <Table columns={columns} data={data} className='table-box' />

        <Box mt-10>
          <Button onClick={() => onSyncPrice()} mr4>Sync price</Button>
          <Button onClick={() => onMergeStrategy()} mr4>Merge strategy</Button>
        </Box>
      </Box>
    </Box>
  );
}
