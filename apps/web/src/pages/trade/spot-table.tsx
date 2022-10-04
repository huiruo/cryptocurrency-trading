import React, { useState } from 'react';
import { Box } from '@fower/react';
import { Table } from '@/components/Table/Table';
import { formatUnixTime } from '@/utils';
import { Checkbox } from '@/components/checkbox';
import { Button } from '@/components/Button';
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

  const onCloseStrategy = () => {
    console.log('onMergeStrategy selectRows', selectRows);
  }

  const onMergeStrategy = () => {
    console.log('onMergeStrategy selectRows', selectRows);
    if (!selectRows.length) {
      alert('select empty')

      return
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
      title: 'Select',
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
