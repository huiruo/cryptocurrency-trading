import React, { useState } from 'react';
import { Box } from '@fower/react';
import { Table } from '@/common/table';
import { formatUnixTime } from '@/utils';
import { Checkbox } from '@/common/checkbox';
import { Button } from '@/common/button';
import traderApi from '@/services/traderApi';
import { StrategiesOrder } from '@/utils/types';
import { toast } from '@/common/toast';
import { TradePlanModal } from '@/components/trade-plan-modal';
import NiceModal from '@ebay/nice-modal-react';

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

  const syncPriceUtil = async (order: StrategiesOrder) => {

    const toaster = toast.loading('Sync price...', { showLayer: true })

    const res = await traderApi.syncStrategyPriceApi(order)
    if (res.code === 200) {
      toaster.dismiss()
      syncCallBack()
    } else {
      toaster.update("Failed to Sync price", {
        type: 'error',
      })
    }
  }

  const onStopLostProfit = async (order: StrategiesOrder) => {
    NiceModal.show('tradePlanModal')
  }

  const onKline = async (order: StrategiesOrder) => {
    if (order.tradeUrl) {
      window.open(order.tradeUrl, '_blank')
    } else {
      alert('No link')
    }
  }


  const onSyncPrice = async () => {
    const toaster = toast.loading('Sync all Strategies price...', { showLayer: true })

    const res = await traderApi.syncAllStrategiesPriceApi(data)
    if (res.code === 200) {
      toaster.dismiss()
      syncCallBack()
    } else {
      toaster.update("Failed to Sync price", {
        type: 'error',
      })
    }
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
    {
      id: 'price', title: 'Price', dataIndex: '', key: 'price', width: 100,
      render(item: StrategiesOrder) {
        return <span>{item.price ? item.price : '-'} </span>
      },
    },
    {
      id: 'action', title: 'Action', dataIndex: '', key: 'action', width: 100,
      render(item: StrategiesOrder) {
        return (
          <Box w-120>
            <Box as='button' cursor='pointer' color='#fff' bg='#0ECB81' mr-10 rounded-4px onClick={() => syncPriceUtil(item)}>Update</Box>
            <Box as='button' cursor='pointer' color='#fff' bg='#0ECB81' rounded-4px onClick={() => onKline(item)}>Kline</Box>
          </Box>
        )
      },
    },
    {
      id: 'profit', title: 'Profit', dataIndex: '', key: 'profit', width: 200,
      render(item: StrategiesOrder) {
        return (
          <>
            <Box as='span' mr='8px'>{item.profit} {item.profitRate}</Box>
          </>
        )
      },
    },
    {
      id: 'free', title: 'Free', dataIndex: 'free', key: 'free', width: 100,
    },
    {
      id: 'realizedProfit', title: 'Final profit', dataIndex: '', key: 'profit', width: 100,
      render(item: StrategiesOrder) {
        return <Box w='100px'>
          {item.is_running ? 'Running' : <span>
            {item.realizedProfit} {item.realizedProfitRate}
          </span>}
        </Box>
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
    {
      id: 'sellingQty', title: 'Selling qty', dataIndex: '', key: 'sellingQty', width: 100,
      render(item: StrategiesOrder) {
        return <Box>
          {item.is_running ? 'Running' :
            <>
              <Box>
                {item.sellingQty}
              </Box>
              <Box>
                {item.sellingQuoteQty}
              </Box>
            </>
          }
        </Box>
      },
    },
    {
      id: 'trade', title: 'Trade', dataIndex: '', key: 'trade', width: 200,
      render(item: StrategiesOrder) {
        return (
          <Box w='80px'>
            <Box as='button' cursor='pointer' color='#fff' bg='#0ECB81' rounded-4px onClick={() => onStopLostProfit(item)}>Trade plan</Box>
          </Box>
        )
      },
    },
    { id: 'strategyId', title: 'StrategyId', dataIndex: 'strategyId', key: 'strategyId', width: 100 },
    { id: 'userId', title: 'UserId', dataIndex: 'userId', key: 'userId', width: 100 },
  ]

  return (
    <Box className='table-box-container' mt-10px>
      <Table columns={columns} data={data} className='table-box' />

      <TradePlanModal id='tradePlanModal' />

      <Box mt-10>
        <Button onClick={() => onSyncPrice()} mr4>Sync price</Button>
      </Box>
    </Box>
  );
}
