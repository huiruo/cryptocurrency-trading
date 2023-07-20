import React, { forwardRef, useEffect, useImperativeHandle, useState } from 'react';
import { Box } from '@fower/react';
import { formatUnixTime, generateBianceUri } from '@/utils';
import { Button } from '@/common/button';
import traderApi from '@/services/traderApi';
import { FiterStrategyOrderType, StrategiesOrder } from '@/utils/types';
import { toast } from '@/common/toast';
import { TradePlanModal } from '@/components/trade-plan-modal';
import NiceModal from '@ebay/nice-modal-react';
import { Pagination, Table as AntTable } from 'antd';

interface Props {
  selectAssetValue: string
  selectStatusValue: number
  syncCallBack: () => void
}

/**
 * Code annotation
 */
export const StrategiesTable = forwardRef((props: Props, ref) => {
  const { syncCallBack, selectAssetValue, selectStatusValue } = props

  const [strategies, setStrategies] = useState<StrategiesOrder[]>([])

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectRowData, setSelectRowData] = useState<StrategiesOrder[]>([])
  const [total, setTotal] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useImperativeHandle(ref, () => ({
    getStrategies: (params: FiterStrategyOrderType, isUpdate: boolean) => {
      console.log('getOrder', params, isUpdate);
      getStrategies(params)
    }
  }));

  const syncPriceUtil = async (order: StrategiesOrder[]) => {
    const toaster = toast.loading('Sync price...', { showLayer: true })
    const res = await traderApi.syncAllStrategiesPriceApi(order)
    if (res.code === 200) {
      toaster.dismiss()
      getStrategies({
        is_running: selectStatusValue,
        symbol: selectAssetValue,
        pageSize,
        currentPage,
      })
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
    const { assetUri } = generateBianceUri(order.symbol)
    if (assetUri) {
      window.open(assetUri, '_blank')
    } else {
      alert('No link')
    }
  }

  const onSyncPrice = async () => {
    const toaster = toast.loading('Sync all Strategies price...', { showLayer: true })

    const res = await traderApi.syncAllStrategiesPriceApi(strategies)
    if (res.code === 200) {
      toaster.dismiss()
      getStrategies({
        is_running: selectStatusValue,
        symbol: selectAssetValue,
        pageSize,
        currentPage,
      })
    } else {
      toaster.update("Failed to Sync price", {
        type: 'error',
      })
    }
  }

  const columns = [
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
            <Box as='button' cursor='pointer' color='#fff' bg='#0ECB81' mr-10 rounded-4px onClick={() => syncPriceUtil([item])}>Update</Box>
            <Box as='button' cursor='pointer' color='#fff' bg='#0ECB81' rounded-4px onClick={() => onKline(item)}>Kline</Box>
          </Box>
        )
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


  const getStrategies = async (params: FiterStrategyOrderType, isUpdate = false) => {
    const { currentPage, pageSize: size, is_running: isrunning } = params
    const data = {
      currentPage: currentPage || 1,
      pageSize: pageSize || size,
      is_running: isrunning,
      symbol: selectAssetValue
    }

    const res = await traderApi.strategiesOrderApi(data)
    if (res.code === 200) {
      if (isUpdate) {
        toast.success('Get orders succeeded')
      }
      setTotal(res.data.total)
      setCurrentPage(data.currentPage)
      setStrategies(res.data.res)
    } else {
      toast.error('Failed to get orders')
    }
  }

  const onShowSizeChange = (page: number, pageSize: number) => {
    setPageSize(pageSize)
    setCurrentPage(page)
  }

  const onChangePage = (page: number, pageSize: number) => {
    const params = {
      currentPage: page,
      pageSize: pageSize,
      symbol: '',
      is_running: selectStatusValue
    }
    setCurrentPage(page)
    getStrategies(params)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: StrategiesOrder[]) => {
      setSelectedRowKeys(selectedRowKeys);
      setSelectRowData(selectedRows)
    },
  };

  useEffect(() => {
    const params = {
      is_running: selectStatusValue,
      currentPage: currentPage,
      pageSize,
      symbol: selectAssetValue,
    }
    getStrategies(params)
  }, [])

  return (
    <Box className='table-box-container' mt-10px>
      <AntTable
        className='table-box'
        rowKey="id"
        rowSelection={rowSelection}
        columns={columns}
        dataSource={strategies}
        pagination={false}
      />

      <TradePlanModal id='tradePlanModal' />

      <Box mt-10 mb-10>
        <Button onClick={() => onSyncPrice()} mr4>Sync price</Button>
      </Box>

      <Pagination
        current={currentPage}
        total={total}
        pageSizeOptions={["10", "20", "40"]}
        showTotal={total => `Total:${total}`}
        showSizeChanger={true}
        onChange={onChangePage}
        onShowSizeChange={onShowSizeChange}
      />
    </Box>
  );
})
