import React, { useEffect, useState } from 'react'
import { appStoreActions, stgOrdersState } from '@stores/appSlice'
import { useAppSelector } from '@stores/hooks'
import { Button, Pagination, Table, message } from 'antd'
import { formatUnixTime, generateBianceUri } from '@common/utils'
import { SUCCESS } from '@common/constants'
import { isEmpty } from 'lodash'
import store from '@stores/index'
import { StgOrder, StgOrdersParams } from '@services/strategy.type'
import { strategyApi } from '@services/strategy'

export function StgTable() {
  const { total, data } = useAppSelector(stgOrdersState)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [selectRowData, setSelectRowData] = useState<StgOrder[]>([])
  // eslint-disable-next-line @typescript-eslint/no-unused-vars, no-unused-vars
  const [pageSize, setPageSize] = useState<number>(10)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const onKline = (order: StgOrder) => {
    const { assetUri } = generateBianceUri(order.symbol)
    if (assetUri) {
      window.open(assetUri, '_blank')
    } else {
      alert('No link')
    }
  }

  const onStopLostProfit = (order: StgOrder) => {
    console.log('onStopLostProfit', order)
  }

  const onSyncPrice = async (orders: StgOrder[]) => {
    const stgOrder = orders.map((item) => {
      return {
        symbol: item.symbol,
        qty: item.qty,
        entryPrice: item.entryPrice,
        quoteQty: item.quoteQty,
        userId: item.userId,
        strategyId: item.strategyId,
      }
    })

    console.log('onSyncPrice', { orders, stgOrder })
    const res = await strategyApi.syncStgPrice(stgOrder)
    if (res.code) {
      message.success(res.msg)
      getStgOrdersUtil({
        symbol: '',
        is_running: 1,
        pageSize: 10,
        currentPage: 1,
      })
    } else {
      message.error(res.msg)
    }
  }

  const columns = [
    {
      id: 'time',
      title: 'Date',
      dataIndex: '',
      key: 'time',
      width: 100,
      render(item: StgOrder) {
        return (
          <div>
            <div>begin:{formatUnixTime(Number(item.time))}</div>
            {item.is_running ? (
              <div>update:{formatUnixTime(Number(item.updatedAt))}</div>
            ) : (
              <div>ended:{formatUnixTime(Number(item.sellingTime))}</div>
            )}
          </div>
        )
      },
    },
    {
      id: 'symbol',
      title: 'Symbol',
      dataIndex: 'symbol',
      key: 'symbol',
      width: 100,
    },
    {
      id: 'side',
      title: 'Side',
      dataIndex: '',
      key: 'side',
      width: 100,
      render(item: StgOrder) {
        return <>{item.side ? <span>Long</span> : <span>Short</span>}</>
      },
    },
    {
      id: 'is_running',
      title: 'Status',
      dataIndex: '',
      key: 'is_running',
      width: 100,
      render(item: StgOrder) {
        return <>{item.is_running ? <div>Running</div> : <div>Ended</div>}</>
      },
    },
    {
      id: 'price',
      title: 'Price',
      dataIndex: '',
      key: 'price',
      width: 100,
      render(item: StgOrder) {
        return <span>{item.price ? item.price : '-'} </span>
      },
    },
    {
      id: 'action',
      title: 'Action',
      dataIndex: '',
      key: 'action',
      width: 100,
      render(item: StgOrder) {
        return (
          <div className="action1">
            <Button onClick={() => onSyncPrice([item])} className="bright-btn">
              Update
            </Button>
            <Button
              onClick={() => onKline(item)}
              className="warm-btn common-left-mg"
            >
              Kline
            </Button>
          </div>
        )
      },
    },
    {
      id: 'realizedProfit',
      title: 'Final profit',
      dataIndex: '',
      key: 'profit',
      width: 100,
      render(item: StgOrder) {
        return (
          <div>
            {item.is_running ? (
              'Running'
            ) : (
              <span>
                {item.realizedProfit} {item.realizedProfitRate}
              </span>
            )}
          </div>
        )
      },
    },
    {
      id: 'profit',
      title: 'Profit',
      dataIndex: '',
      key: 'profit',
      width: 200,
      render(item: StgOrder) {
        return (
          <>
            <span>
              {item.profit} {item.profitRate}
            </span>
          </>
        )
      },
    },
    {
      id: 'free',
      title: 'Free',
      dataIndex: 'free',
      key: 'free',
      width: 100,
    },
    {
      id: 'entryPrice',
      title: 'Trade price',
      dataIndex: '',
      key: 'entryPrice',
      width: 100,
      render(item: StgOrder) {
        return (
          <div>
            <div>{item.entryPrice}</div>
            <div>{item.sellingPrice ? item.sellingPrice : '-'}</div>
          </div>
        )
      },
    },
    {
      id: 'qty',
      title: 'Trade qty',
      dataIndex: '',
      key: 'qty',
      width: 100,
      render(item: StgOrder) {
        return (
          <div>
            <div>{item.qty}</div>
            <div>{item.quoteQty}</div>
          </div>
        )
      },
    },
    {
      id: 'sellingQty',
      title: 'Selling qty',
      dataIndex: '',
      key: 'sellingQty',
      width: 100,
      render(item: StgOrder) {
        return (
          <div>
            {item.is_running ? (
              'Running'
            ) : (
              <>
                <div>{item.sellingQty}</div>
                <div>{item.sellingQuoteQty}</div>
              </>
            )}
          </div>
        )
      },
    },
    {
      id: 'trade',
      title: 'Trade',
      dataIndex: '',
      key: 'trade',
      width: 200,
      render(item: StgOrder) {
        return (
          <div className="action2">
            <Button
              onClick={() => onStopLostProfit(item)}
              className="bright-btn"
            >
              Trade plan
            </Button>
          </div>
        )
      },
    },
    {
      id: 'strategyId',
      title: 'StrategyId',
      dataIndex: 'strategyId',
      key: 'strategyId',
      width: 100,
    },
    {
      id: 'userId',
      title: 'UserId',
      dataIndex: 'userId',
      key: 'userId',
      width: 100,
    },
  ]

  const onChangePage = (page: number, pageSize: number) => {
    const params = {
      currentPage: page,
      pageSize: pageSize,
      symbol: '',
      is_running: 1,
    }
    setCurrentPage(page)
    getStgOrdersUtil(params)
  }

  const onShowSizeChange = (page: number, pageSize: number) => {
    setPageSize(pageSize)
    setCurrentPage(page)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: StgOrder[]) => {
      // console.log(`${selectedRowKeys}`, '--', 'selectedRows: ', selectedRows);
      setSelectedRowKeys(selectedRowKeys)
      setSelectRowData(selectedRows)
    },
  }

  const getStgOrdersUtil = async (strategyOrdersParams: StgOrdersParams) => {
    const res = await strategyApi.getStgOrders(strategyOrdersParams)
    if (res.code === SUCCESS) {
      store.dispatch(appStoreActions.setStraOrders(res.data))
      setCurrentPage(strategyOrdersParams.currentPage)
      setCurrentPage(res.data.currentPage)
      setPageSize(res.data.pageSize)
    } else {
      message.error(res.msg || 'error')
    }
  }

  useEffect(() => {
    if (!isEmpty(selectedRowKeys)) {
      console.log('clear selected')
      setSelectedRowKeys([])
    }
  }, [data])

  useEffect(() => {
    getStgOrdersUtil({
      symbol: '',
      is_running: 1,
      pageSize: 10,
      currentPage: 1,
    })
  }, [])

  console.log('StraTable->render', { selectRowData })

  return (
    <div className="table-box-container common-top2-mg">
      <Table
        rowSelection={rowSelection}
        rowKey="id"
        columns={columns}
        dataSource={data}
        className="table-box"
        pagination={false}
      />

      <div className="common-y-mg">
        <Button onClick={() => onSyncPrice(data)} className="neutral-btn">
          Sync price
        </Button>
      </div>

      <Pagination
        current={currentPage}
        total={total}
        pageSizeOptions={['10', '20', '40']}
        showTotal={(total) => `Total:${total}`}
        showSizeChanger={true}
        onChange={onChangePage}
        onShowSizeChange={onShowSizeChange}
      />
    </div>
  )
}
