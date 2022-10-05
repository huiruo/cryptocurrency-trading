import React, { useState } from 'react';
import { Box } from '@fower/react';
import { Table } from '@/common/table';
import { formatUnixTime } from '@/utils';
import { Checkbox } from '@/common/checkbox';
import { FuturesOrder } from '@/utils/types';

interface Props {
  data: FuturesOrder[]
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

    console.log('se；', selectRows);
  }

  const columns = [
    {
      title: '',
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
    {
      id: 'updateTime', title: 'Date', dataIndex: '', key: 'updateTime', width: 100,
      render(item: FuturesOrder) {
        return <Box w='145px'>{formatUnixTime(Number(item.updateTime))}</Box>
      },
    },
    { id: 'symbol', title: 'Symbol', dataIndex: 'symbol', key: 'symbol', width: 100 },
    {
      id: 'side', title: 'Side', dataIndex: '', key: 'side', width: 100,
      render(item: FuturesOrder) {
        return <Box>
          {item.side === 'BUY' ? <Box as='span' color='#0ECB81'>BUY</Box>
            : <Box as='span' color='#F6465D'>SELL</Box>}
        </Box>
      },
    },
    { id: 'price', title: 'Price', dataIndex: 'price', key: 'price', width: 100 },
    { id: 'avgPrice', title: 'AvgPrice', dataIndex: 'avgPrice', key: 'avgPrice', width: 100 },
    {
      id: 'status', title: 'Status', dataIndex: '', key: 'status', width: 100,
      render(item: FuturesOrder) {
        return <Box>
          {item.status === 'CANCELED' ? <Box as='span' color='#474D57'>CANCELED</Box>
            : <Box as='span' color='#FCD535'>{item.status}</Box>}
        </Box>
      },
    },
    { id: 'type', title: 'Type', dataIndex: 'type', key: 'type', width: 100 },
    // { id: 'origType', title: 'origType', dataIndex: 'origType', key: 'origType', width: 100 },
    {
      id: 'origQty', title: 'OrigQty', dataIndex: '', key: 'origQty', width: 100,
      render(item: FuturesOrder) {
        return <Box>
          <Box>{item.origQty}</Box>
          <Box>{item.cumQuote}</Box>
        </Box>
      },
    },
    // { id: 'executedQty', title: 'executedQty', dataIndex: 'executedQty', key: 'executedQty', width: 100 },
    {
      id: 'orderId', title: 'OrderId', dataIndex: '', key: 'orderId', width: 100,
      render(item: FuturesOrder) {
        return <Box>
          <Box>{item.orderId}</Box>
          <Box>UserId:{item.userId}</Box>
        </Box>
      },
    },
    {
      id: 'createdAt', title: 'Created', dataIndex: '', key: 'createdAt', width: 100,
      render(item: any) {
        return <span>{formatUnixTime(item.createdAt)}</span>
      },
    },
    { id: 'clientOrderId', title: 'ClientOrderId', dataIndex: 'clientOrderId', key: 'clientOrderId', width: 100 },
    { id: 'timeInForce', title: 'TimeInForce', dataIndex: 'timeInForce', key: 'timeInForce', width: 100 },
    {
      id: 'reduceOnly', title: 'ReduceOnly', dataIndex: 'reduceOnly', key: 'reduceOnly', width: 100,
      render(item: any) {
        return <span>{item.reduceOnly ? 'ture' : 'false'}</span>
      },
    },
    {
      id: 'closePosition', title: 'ClosePosition', dataIndex: 'closePosition', key: 'closePosition', width: 100,
      render(item: any) {
        return <span>{item.closePosition ? 'ture' : 'false'}</span>
      },
    },
    { id: 'positionSide', title: 'PositionSide', dataIndex: 'positionSide', key: 'positionSide', width: 100 },
    { id: 'stopPrice', title: 'StopPrice', dataIndex: 'stopPrice', key: 'stopPrice', width: 100 },
    { id: 'workingType', title: 'WorkingType', dataIndex: 'workingType', key: 'workingType', width: 100 },
    {
      id: 'priceProtect', title: 'PriceProtect', dataIndex: 'priceProtect', key: 'priceProtect', width: 100,
      render(item: any) {
        return <span>{item.priceProtect ? 'ture' : 'false'}</span>
      },
    },
  ]

  return (
    <Box toCenterX>
      <Box className='table-box-container'>
        <Table columns={columns} data={data} className='table-box' />
      </Box>
    </Box>
  );
}
