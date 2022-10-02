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
export function SpotTable(props: Props) {
  const { data } = props
  const [selectRows, setSelectRows] = useState<number[]>([])

  const onSelectChange = (index: number, checked: boolean, keySet?: any) => {
    /*
    if (checked) {
      keySet.delete(index);
      setSelectRows(Array.from(keySet))
    } else {
      keySet.add(index);
      setSelectRows(Array.from(keySet))
    }
    */
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
        /*
        const keySet = new Set(selectRows);
        const checked = keySet.has(index);
        */
        const checked = selectRows.includes(index)
        return (
          // <Checkbox checked={checked} onChange={() => onSelectChange(index, checked, keySet)} />
          <Checkbox checked={checked} onChange={() => onSelectChange(index, checked)} />
        )
      },
    },
    { id: 'orderId', title: 'orderId', dataIndex: 'orderId', key: 'orderId', width: 100 },
    { id: 'userId', title: 'userId', dataIndex: 'userId', key: 'userId', width: 100 },
    { id: 'symbol', title: 'symbol', dataIndex: 'symbol', key: 'symbol', width: 100 },
    { id: 'strategyId', title: 'strategyId', dataIndex: 'strategyId', key: 'strategyId', width: 100 },
    { id: 'price', title: 'price', dataIndex: 'price', key: 'price', width: 100 },
    { id: 'qty', title: 'qty', dataIndex: 'qty', key: 'qty', width: 100 },
    { id: 'quoteQty', title: 'quoteQty', dataIndex: 'quoteQty', key: 'quoteQty', width: 100 },
    { id: 'commission', title: 'commission', dataIndex: 'commission', key: 'commission', width: 100 },
    { id: 'commissionAsset', title: 'commissionAsset', dataIndex: 'commissionAsset', key: 'commissionAsset' },
    { id: 'isBuyer', title: 'isBuyer', dataIndex: 'isBuyer', key: 'isBuyer', width: 100 },
    { id: 'isMaker', title: 'isMaker', dataIndex: 'isMaker', key: 'isMaker', width: 100 },
    { id: 'isBestMatch', title: 'isBestMatch', dataIndex: 'isBestMatch', key: 'isBestMatch', width: 100 },
    {
      id: 'time', title: 'time', dataIndex: '', key: 'time', width: 100,
      render(item: any) {
        return <span>{formatUnixTime(Number(item.time))}</span>
      },
    },
    {
      id: 'updatedAt', title: 'updatedAt', dataIndex: '', key: 'updatedAt', width: 100,
      render(item: any) {
        return <span>{formatUnixTime(item.updatedAt)}</span>
      },
    },
    {
      id: 'createdAt', title: 'createdAt', dataIndex: '', key: 'createdAt', width: 100,
      render(item: any) {
        return <span>{formatUnixTime(item.createdAt)}</span>
      },
    },
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
