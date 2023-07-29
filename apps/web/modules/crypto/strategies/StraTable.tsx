import React, { useEffect, useState } from 'react'
import { appStoreActions, straOrdersState } from '@stores/appSlice'
import { useAppSelector } from '@stores/hooks'
import { Button, Pagination, Table, message } from 'antd'
import { GetSpotOrderParamsNoPage } from '@services/spot.type'
import { formatUnixTime } from '@common/utils'
import { SUCCESS } from '@common/constants'
import { isEmpty } from 'lodash'
import { spotApi } from '@services/spot'
import store from '@stores/index'
import { StraOrder } from '@services/strategy.type'

export default function StraTable() {
  const { total, data } = useAppSelector(straOrdersState)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [selectRowData, setSelectRowData] = useState<StraOrder[]>([])
  const [pageSize, setPageSize] = useState<number>(10)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const syncPriceUtil = (orders: StraOrder[]) => {
    console.log('syncPriceUtil', orders)
  }

  const onKline = (order: StraOrder) => {
    console.log('onKline', order)
  }

  const onStopLostProfit = (order: StraOrder) => {
    console.log('onStopLostProfit', order)
  }

  const onSyncPrice = async () => {
    console.log('onSyncPrice')
  }

  /*
  const spotTableCallBack = () => {
    const params = {
      symbol: ''
    }
    getSpotOrders(params)
    setSelectRowData([])
    setSelectedRowKeys([])
  }
  */

  const columns = [
    {
      id: 'time',
      title: 'Date',
      dataIndex: '',
      key: 'time',
      width: 100,
      render(item: StraOrder) {
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
      render(item: StraOrder) {
        return <>{item.side ? <span>Long</span> : <span>Short</span>}</>
      },
    },
    {
      id: 'is_running',
      title: 'Status',
      dataIndex: '',
      key: 'is_running',
      width: 100,
      render(item: StraOrder) {
        return <>{item.is_running ? <div>Running</div> : <div>Ended</div>}</>
      },
    },
    {
      id: 'price',
      title: 'Price',
      dataIndex: '',
      key: 'price',
      width: 100,
      render(item: StraOrder) {
        return <span>{item.price ? item.price : '-'} </span>
      },
    },
    {
      id: 'action',
      title: 'Action',
      dataIndex: '',
      key: 'action',
      width: 100,
      render(item: StraOrder) {
        return (
          <div className="action1">
            <Button
              onClick={() => syncPriceUtil([item])}
              className="bright-btn"
            >
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
      render(item: StraOrder) {
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
      render(item: StraOrder) {
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
      render(item: StraOrder) {
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
      render(item: StraOrder) {
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
      render(item: StraOrder) {
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
      render(item: StraOrder) {
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
    }
    setCurrentPage(page)
    getSpotOrders(params)
  }

  const onShowSizeChange = (page: number, pageSize: number) => {
    setPageSize(pageSize)
    setCurrentPage(page)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: StraOrder[]) => {
      // console.log(`${selectedRowKeys}`, '--', 'selectedRows: ', selectedRows);
      setSelectedRowKeys(selectedRowKeys)
      setSelectRowData(selectedRows)
    },
  }

  const getSpotOrders = async ({
    symbol,
    pageSize = 10,
    currentPage = 1,
  }: GetSpotOrderParamsNoPage) => {
    const res = await spotApi.getSpotOrders({ pageSize, currentPage, symbol })
    if (res.code === SUCCESS) {
      store.dispatch(appStoreActions.setSpotOrders(res.data))
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
    const params = {
      currentPage: 1,
      pageSize: pageSize,
      symbol: '',
    }

    getSpotOrders(params)
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
        <Button onClick={() => onSyncPrice()} className="neutral-btn">
          Sync price
        </Button>
      </div>

      {/* <MergeStrategyModal id='mergeStrategyModal' mergeOrders={selectRowData} spotTableCallBack={() => spotTableCallBack()} />
        <CloseStrategyModal id='closeStrategyModal' closeOrders={selectRowData} spotTableCallBack={() => spotTableCallBack()} /> */}

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
