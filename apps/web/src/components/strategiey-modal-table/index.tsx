import React from 'react';
import { Checkbox } from '@/common/checkbox';
import { Table } from '@/common/table';
import { formatUnixTime } from '@/utils';
import { StrategiesOrder } from '@/utils/types';
import { Box } from '@fower/react';

interface Props {
  data: StrategiesOrder[]
  selectRows: number[]
  onChangeCallback: (selectRows: number[]) => void
}

/**
 * Code annotation
 */
export function StrategieyModalTable(props: Props) {
  const { data, selectRows, onChangeCallback } = props


  const onSelectChange = (index: number, checked: boolean, keySet?: any) => {
    const arrIndex = selectRows.findIndex(i => {
      return i === index;
    });

    if (checked) {
      selectRows.splice(arrIndex, 1)
    } else {
      selectRows.push(index)
    }
    onChangeCallback([...selectRows])
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
      id: 'time', title: 'Date', dataIndex: '', key: 'time', width: 100,
      render(item: StrategiesOrder) {
        return <Box w='200px'>
          <Box>begin:{formatUnixTime(Number(item.time))}</Box>
          {item.is_running ? <Box>update:{formatUnixTime(Number(item.updatedAt))}</Box> : <Box>ended:{formatUnixTime(Number(item.sellingTime))}</Box>}
        </Box>
      },
    },
    { id: 'symbol', title: 'Symbol', dataIndex: 'symbol', key: 'symbol', width: 100 },
    {
      id: 'side', title: 'Side', dataIndex: '', key: 'side', width: 100,
      render(item: StrategiesOrder) {
        return <>
          {item.side ? <Box as='span' color='#0ECB81'>Long</Box>
            : <Box as='span' color='#F6465D'>Short</Box>
          }
        </>
      },
    },
    {
      id: 'is_running', title: 'Status', dataIndex: '', key: 'is_running', width: 100,
      render(item: StrategiesOrder) {
        return <>
          {item.is_running ? <Box as='span' color='#0ECB81'>Running</Box>
            : <Box as='span' color='#F6465D'>Ended</Box>
          }
        </>
      },
    },
    { id: 'strategyId', title: 'StrategyId', dataIndex: 'strategyId', key: 'strategyId', width: 100 },
    {
      id: 'price', title: 'Price', dataIndex: '', key: 'price', width: 100,
      render(item: StrategiesOrder) {
        return <span>{item.price ? item.price : '-'} </span>
      },
    },
    {
      id: 'profit', title: 'Profit', dataIndex: '', key: 'profit', width: 100,
      render(item: StrategiesOrder) {
        return <span>{item.profit} {item.profitRate}</span>
      },
    },
    {
      id: 'entryPrice', title: 'Trade price', dataIndex: '', key: 'entryPrice', width: 100,
      render(item: StrategiesOrder) {
        return <Box>
          <Box>{item.entryPrice}</Box>
          <Box>{item.sellingPrice ? item.sellingPrice : '-'}</Box>
        </Box>
      },
    },
    {
      id: 'qty', title: 'Trade qty', dataIndex: '', key: 'qty', width: 100,
      render(item: StrategiesOrder) {
        return <Box>
          <Box>{item.qty}</Box>
          <Box>{item.quoteQty}</Box>
        </Box>
      },
    },
    { id: 'userId', title: 'UserId', dataIndex: 'userId', key: 'userId', width: 100 },
  ]
  return (
    <Table columns={columns} data={data} className='table-box modal-stg-table' />
  );
}
