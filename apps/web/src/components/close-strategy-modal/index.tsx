import React, { useState } from 'react';
import { Button } from '@/common/button';
import { Checkbox } from '@/common/checkbox';
import { Table } from '@/common/table';
import traderApi from '@/services/traderApi';
import { formatUnixTime } from '@/utils';
import { SpotOrder, StrategiesOrder } from '@/utils/types';
import { Box } from '@fower/react';
import { get } from 'lodash';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { TradeModal } from '../modal';


interface Props {
  closeOrders: SpotOrder[]
  spotTableCallBack(): void
}

/**
 * Code annotation
 */
export const CloseStrategyModal = NiceModal.create((props: Props) => {

  const { visible, hide } = useModal()
  const { closeOrders, spotTableCallBack } = props
  const [strategies, setStrategies] = useState<StrategiesOrder[]>([])
  const [selectRows, setSelectRows] = useState<number[]>([])

  const getStrategies = async (currentPage: number, pageSize?: number) => {
    const data = {
      currentPage: currentPage || 1,
      pageSize: pageSize || 10
    }
    const res = await traderApi.strategiesOrderApi(data)
    if (res.code === 200) {

      setStrategies(res.data)
    } else {
      alert("get Strategies orders error")
    }
  }

  const afterClose = () => {
    setSelectRows([])
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
  }

  const onCloseStrategy = async () => {
    if (!selectRows.length) {
      alert('select empty')

      return
    }

    if (selectRows.length >= 2) {
      alert('select Greater than 2')

      return
    }

    const index = get(selectRows, '[0]', 0)
    const selectRow = get(strategies, `${[index]}`, 0)
    if (!selectRow.is_running) {
      alert('This strategy was closed and cannot be updated')

      return
    }

    const strategyOrder = { ...selectRow }
    const params = {
      spotOrders: closeOrders,
      strategyOrder,
    }

    const res = await traderApi.closeSpotStrategyApi(params)
    if (res.code === 200) {
      hide()
      spotTableCallBack()
    } else {
      alert("Merge strategy error")
    }
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
          {item.is_running ? <Box>update:{formatUnixTime(item.updatedAt)}</Box> : <Box>ended:{formatUnixTime(Number(item.sellingTime))}</Box>}
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
    <TradeModal
      showMask={true}
      showCloseButton={true}
      maskClosable={true}
      header="Select Strategy to be closed"
      width='70%'
      isVisible={visible}
      onClose={hide}
      onOpen={() => getStrategies(1)}
      afterClose={() => afterClose()}
    >
      <Box position='relative' h='412px'>
        <Table columns={columns} data={strategies} className='table-box' />
        <Box mt-10 position='absolute' bottom0>
          <Button onClick={() => onCloseStrategy()} mr4>Close strategy</Button>
        </Box>
      </Box>
    </TradeModal>
  )
})
