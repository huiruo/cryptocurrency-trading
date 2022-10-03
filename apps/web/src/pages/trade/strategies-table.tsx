import React, { useState } from 'react';
import { Box } from '@fower/react';
import { Table } from '@/components/Table/Table';
import { formatUnixTime } from '@/utils';
import { Checkbox } from '@/components/checkbox';
import { Button } from '@/components/Button';
import traderApi from '@/services/traderApi';
import { get } from 'lodash';

interface Props {
  data: any
}

/**
 * Code annotation
 */
export function StrategiesTable(props: Props) {
  const { data } = props
  const [selectRows, setSelectRows] = useState<number[]>([])

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
    { id: 'strategyId', title: 'strategyId', dataIndex: 'strategyId', key: 'strategyId', width: 100 },
    {
      id: 'updatedAt', title: 'updatedAt', dataIndex: '', key: 'updatedAt', width: 100,
      render(item: any) {
        return <span>{formatUnixTime(item.updatedAt)}</span>
      },
    },
    { id: 'userId', title: 'userId', dataIndex: 'userId', key: 'userId', width: 100 },
    { id: 'price', title: 'price', dataIndex: 'price', key: 'price', width: 100 },
    { id: 'quantity', title: 'quantity', dataIndex: 'quantity', key: 'quantity', width: 100 },
    { id: 'profit_ratio', title: 'profit_ratio', dataIndex: 'profit_ratio', key: 'profit_ratio', width: 100 },
    { id: 'cost_price', title: 'cost_price', dataIndex: 'cost_price', key: 'cost_price', width: 100 },
    { id: 'profit_amount', title: 'profit_amount', dataIndex: 'profit_amount', key: 'profit_amount', width: 100 },
    { id: 'is_running', title: 'is_running', dataIndex: 'is_running', key: 'is_running', width: 100 },
    {
      id: 'createdAt', title: 'createdAt', dataIndex: '', key: 'createdAt', width: 100,
      render(item: any) {
        return <span>{formatUnixTime(item.createdAt)}</span>
      },
    },
  ]

  return (
    <Box toCenterX>
      <Box className='table-box-container'>
        <Table columns={columns} data={data} className='table-box' />

        <Button onClick={() => onCreatStrategy()} mr4>Creat strategy</Button>
        <Button onClick={() => onMergeStrategy()} mr4>Merge strategy</Button>
      </Box>
    </Box>
  );
}
