import React, { useState } from 'react';
import { Box } from '@fower/react';
import { Table } from '@/components/Table/Table';
import { formatUnixTime } from '@/utils';
import { Checkbox } from '@/components/checkbox';

interface Props {
  data: any
}

/**
 * Code annotation
 */
export function FutureTable(props: Props) {
  const { data } = props
  const [selectRows, setSelectRows] = useState<number[]>([])

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
    { id: 'orderId', title: 'orderId', dataIndex: 'orderId', key: 'orderId', width: 100 },
    { id: 'symbol', title: 'symbol', dataIndex: 'symbol', key: 'symbol', width: 100 },
    { id: 'status', title: 'status', dataIndex: 'status', key: 'status', width: 100 },
    { id: 'origQty', title: 'origQty', dataIndex: 'origQty', key: 'origQty', width: 100 },
    { id: 'cumQuote', title: 'cumQuote', dataIndex: 'cumQuote', key: 'cumQuote', width: 100 },
    { id: 'price', title: 'price', dataIndex: 'price', key: 'price', width: 100 },
    { id: 'side', title: 'side', dataIndex: 'side', key: 'side', width: 100 },
    { id: 'type', title: 'type', dataIndex: 'type', key: 'type', width: 100 },
    { id: 'avgPrice', title: 'avgPrice', dataIndex: 'avgPrice', key: 'avgPrice', width: 100 },
    {
      id: 'updateTime', title: 'updateTime', dataIndex: '', key: 'updateTime', width: 100,
      render(item: any) {
        return <span>{formatUnixTime(Number(item.updateTime))}</span>
      },
    },
    {
      id: 'createdAt', title: 'createdAt', dataIndex: '', key: 'createdAt', width: 100,
      render(item: any) {
        return <span>{formatUnixTime(item.createdAt)}</span>
      },
    },
    { id: 'clientOrderId', title: 'clientOrderId', dataIndex: 'clientOrderId', key: 'clientOrderId', width: 100 },
    { id: 'executedQty', title: 'executedQty', dataIndex: 'executedQty', key: 'executedQty', width: 100 },
    { id: 'timeInForce', title: 'timeInForce', dataIndex: 'timeInForce', key: 'timeInForce', width: 100 },
    {
      id: 'reduceOnly', title: 'reduceOnly', dataIndex: 'reduceOnly', key: 'reduceOnly', width: 100,
      render(item: any) {
        return <span>{item.reduceOnly ? 'ture' : 'false'}</span>
      },
    },
    {
      id: 'closePosition', title: 'closePosition', dataIndex: 'closePosition', key: 'closePosition', width: 100,
      render(item: any) {
        return <span>{item.closePosition ? 'ture' : 'false'}</span>
      },
    },
    { id: 'positionSide', title: 'positionSide', dataIndex: 'positionSide', key: 'positionSide', width: 100 },
    { id: 'stopPrice', title: 'stopPrice', dataIndex: 'stopPrice', key: 'stopPrice', width: 100 },
    { id: 'workingType', title: 'workingType', dataIndex: 'workingType', key: 'workingType', width: 100 },
    {
      id: 'priceProtect', title: 'priceProtect', dataIndex: 'priceProtect', key: 'priceProtect', width: 100,
      render(item: any) {
        return <span>{item.priceProtect ? 'ture' : 'false'}</span>
      },
    },
    { id: 'origType', title: 'origType', dataIndex: 'origType', key: 'origType', width: 100 },
  ]

  console.log('se；', selectRows);

  return (
    <Box toCenterX>
      <Box className='table-box-container'>
        <Table columns={columns} data={data} className='table-box' />
      </Box>
    </Box>
  );
}
