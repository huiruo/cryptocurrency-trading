import React, { useEffect, useState } from 'react'
import { stgOrdersState } from '@stores/appSlice'
import { useAppSelector } from '@stores/hooks'
import { Button, Pagination, Table, message } from 'antd'
import { formatUnixTime, generateBianceUri } from '@common/utils'
import { SUCCESS } from '@common/constants'
import { isEmpty } from 'lodash'
import store from '@stores/index'
import { StgOrder } from '@services/strategy.type'
import { strategyApi } from '@services/strategy'
import {
  FetchStgOrdersAction,
  StgOrdersParams,
  fetchStgOrders,
} from '@stores/thunkAction'

export function StgTable() {
  const { total, data } = useAppSelector(stgOrdersState)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [selectRowData, setSelectRowData] = useState<StgOrder[]>([])
  const [, setPageSize] = useState<number>(10)
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

    const res = await strategyApi.syncStgPrice(stgOrder)
    if (res.code) {
      message.success(res.msg)
      getStgOrdersUtil({})
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

  const onChangePage = (current: number, pageSize: number) => {
    setCurrentPage(current)
    getStgOrdersUtil({
      current,
      page: pageSize,
    })
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

  const getStgOrdersUtil = async (stgOrdersParams: StgOrdersParams) => {
    const { payload } = (await store.dispatch(
      fetchStgOrders(stgOrdersParams),
    )) as FetchStgOrdersAction
    if (payload.code === SUCCESS) {
      setCurrentPage(payload.data.currentPage)
      setPageSize(payload.data.pageSize)
    } else {
      message.error(payload.msg || 'error')
    }
  }

  useEffect(() => {
    if (!isEmpty(selectedRowKeys)) {
      console.log('clear selected')
      setSelectedRowKeys([])
    }
  }, [data])

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
