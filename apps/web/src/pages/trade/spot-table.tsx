import React, { useCallback, useState } from 'react';
import NiceModal from '@ebay/nice-modal-react'
import { Box } from '@fower/react';
import { Table } from '@/common/table';
import { formatUnixTime } from '@/utils';
import { Checkbox } from '@/common/checkbox';
import { Button } from '@/common/button';
import traderApi from '@/services/traderApi';
import { SearchParmas, SpotOrder } from '@/utils/types';
import { MergeStrategyModal } from '@/components/merge-strategy-modal';
import { CloseStrategyModal } from '@/components/close-strategy-modal';

interface Props {
  data: SpotOrder[]
  spotCallBack: (searchParmas: SearchParmas) => void
  // spotCallBack: (symbol: string) => void
}

const strategyStatusMap = [
  'original',
  'running',
  'ended'
]

/**
 * Code annotation
 */
export function SpotTable(props: Props) {
  const { data, spotCallBack } = props
  const [selectRows, setSelectRows] = useState<number[]>([])
  const [selectRowData, setSelectRowData] = useState<SpotOrder[]>([])

  const onCreatStrategy = async () => {
    if (!selectRows.length) {
      alert('select empty')

      return
    }

    /*
    if (selectRows.length >= 2) {
      alert('select Greater than 2')

      return
    }
    */
    selectRowData.sort((a: SpotOrder, b: SpotOrder) => {
      return Number(a.time) - Number(b.time);
    })

    /*
    const index = get(selectRows, '[0]', 0)
    const selectRow = get(data, `${[index]}`, 0)
    const params = { ...selectRow }
    */
    const isStrategyRelatedOrder = isStrategyRelatedOrderUtil(selectRowData)
    if (isStrategyRelatedOrder) {
      alert('Can not select strategy related order')
      return
    }
    creatStrategyUtil(selectRowData)
  }

  const creatStrategyUtil = async (order: SpotOrder[]) => {
    console.log('creatStrategyUtil:', order);
    const res = await traderApi.creatStrategyApi(order)
    if (res.code === 200) {
      console.log('create success');
      const params = {
        symbol: ''
      }
      spotCallBack(params)
      setSelectRowData([])
      setSelectRows([])
    } else {
      console.log("creatStrategys error")
    }
  }

  const isStrategyRelatedOrderUtil = (selectRowData: SpotOrder[]): boolean => {
    let isStrategyRelatedOrder = false
    selectRowData.forEach(item => {
      const { strategyId } = item
      if (strategyId) {
        isStrategyRelatedOrder = true
      }
    })

    return isStrategyRelatedOrder
  }

  const onResetOrderStatus = async (item: SpotOrder) => {
    const res = await traderApi.resetSpotOrderStatus(item)
    if (res.code === 200) {
      console.log('ResetOrderStatus success');
      const params = {
        symbol: ''
      }
      spotCallBack(params)
      setSelectRowData([])
      setSelectRows([])
    } else {
      console.log("ResetOrderStatus error")
    }
  }

  const onMergeStrategy = () => {
    console.log('onMergeStrategy selectRows', selectRows);
    if (!selectRows.length) {
      alert('select empty')

      return
    }

    const isStrategyRelatedOrder = isStrategyRelatedOrderUtil(selectRowData)
    if (isStrategyRelatedOrder) {
      alert('Can not select strategy related order')
      return
    }

    selectRowData.sort((a: SpotOrder, b: SpotOrder) => {
      return Number(b.time) - Number(a.time);
    })

    console.log('sorted:', selectRowData);
    NiceModal.show('mergeStrategyModal')
    /*
    NiceModal.show(MergeStrategyModal, selectRowData).then((selectRowData) => {
      // userModal.show(MergeStrategyModal,selectRowData).then((selectRowData) => {
      // setUsers([newUser, ...users]);
      console.log('handleNewUser selectRowData:', selectRowData);
    });
    */
  }

  const onCloseStrategy = async () => {
    if (!selectRows.length) {
      alert('select empty')

      return
    }

    selectRowData.sort((a: SpotOrder, b: SpotOrder) => {
      return Number(a.time) - Number(b.time);
    })

    NiceModal.show('closeStrategyModal')
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

  const spotTableCallBack = () => {
    const params = {
      // currentPage: ,
      // pageSize: 10,
      symbol: ''
    }
    spotCallBack(params)
    setSelectRowData([])
    setSelectRows([])
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
    /*
    0 : original 1 : running 2 : ended
    */
    {
      id: 'strategyStatus', title: 'Status', dataIndex: '', key: 'strategyStatus', width: 100,
      render(item: SpotOrder) {
        return <Box as='span' mr='5px'>{strategyStatusMap[item.strategyStatus]}</Box>
      },
    },
    {
      id: 'action', title: 'Action', dataIndex: '', key: 'action', width: 100,
      render(item: SpotOrder) {
        return <>
          {item.strategyStatus !== 0 ?
            <Box as='button' cursor='pointer' color='#fff' bg='#ff7875' rounded-4px onClick={() => onResetOrderStatus(item)}>Reset</Box> :
            <Box as='button' cursor='pointer' color='#fff' bg='#0ECB81' rounded-4px onClick={() => creatStrategyUtil([item])}>Create</Box>
          }
        </>
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
    <Box className='table-box-container'>
      <Table columns={columns} data={data} className='table-box' />
      <Box mt-10>
        <Button onClick={() => onCreatStrategy()} mr4>Creat strategy</Button>
        <Button onClick={() => onMergeStrategy()} mr4>Merge strategy</Button>
        <Button onClick={() => onCloseStrategy()} mr4>Close strategy</Button>
      </Box>
      <MergeStrategyModal id='mergeStrategyModal' mergeOrders={selectRowData} spotTableCallBack={() => spotTableCallBack()} />
      <CloseStrategyModal id='closeStrategyModal' closeOrders={selectRowData} spotTableCallBack={() => spotTableCallBack()} />
    </Box>
  );
}
