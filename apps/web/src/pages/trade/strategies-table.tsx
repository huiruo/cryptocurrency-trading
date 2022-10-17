import React, { useState } from 'react';
import { Box } from '@fower/react';
import { Table } from '@/common/table';
import { formatUnixTime } from '@/utils';
import { Checkbox } from '@/common/checkbox';
import { Button } from '@/common/button';
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

  const syncPriceUtil = async (order: StrategiesOrder) => {
    const res = await traderApi.syncStrategyPriceApi(order)
    if (res.code === 200) {

      syncCallBack()
    }
  }

  const onStopLostProfit = async (order: StrategiesOrder) => {
    alert('onStopLostProfit:');
  }

  const onKline = async (order: StrategiesOrder) => {
    if (order.tradeUrl) {
      window.open(order.tradeUrl, '_blank')
    } else {
      alert('No link')
    }
  }


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
      alert('This strategy was closed and cannot be updated')

      return
    }

    const params = { ...selectRow }

    syncPriceUtil(params)
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
          <>
            <Box as='button' cursor='pointer' color='#fff' bg='#0ECB81' rounded-4px onClick={() => syncPriceUtil(item)}>Update</Box>
            <Box as='button' cursor='pointer' color='#fff' bg='#0ECB81' rounded-4px onClick={() => onStopLostProfit(item)}>Stopt Loss / Profit</Box>
          </>
        )
      },
    },
    {
      id: 'analysis', title: 'analysis', dataIndex: '', key: 'analysis', width: 100,
      render(item: StrategiesOrder) {
        return (
          <Box as='button' cursor='pointer' color='#fff' bg='#0ECB81' rounded-4px onClick={() => onKline(item)}>K line</Box>
        )
      },
    },
    {
      id: 'profit', title: 'Profit', dataIndex: '', key: 'profit', width: 100,
      render(item: StrategiesOrder) {
        return <span>{item.profit} {item.profitRate}</span>
      },
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
    { id: 'strategyId', title: 'StrategyId', dataIndex: 'strategyId', key: 'strategyId', width: 100 },
    { id: 'userId', title: 'UserId', dataIndex: 'userId', key: 'userId', width: 100 },
  ]

  return (
    <Box className='table-box-container' mt-10px>
      <Table columns={columns} data={data} className='table-box' />

      <Box mt-10>
        <Button onClick={() => onSyncPrice()} mr4>Sync price</Button>
      </Box>
    </Box>
  );
}
