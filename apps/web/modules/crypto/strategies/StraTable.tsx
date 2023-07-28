import React, { useEffect, useState } from 'react'
import { appStoreActions, countState, straOrdersState } from '@stores/appSlice'
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
  const count = useAppSelector(countState)

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

  const oncreateStrategy = async () => {
    if (!selectedRowKeys.length) {
      message.warning('select empty')

      return
    }

    selectRowData.sort((a: StraOrder, b: StraOrder) => {
      return Number(a.time) - Number(b.time)
    })

    const isStrategyRelatedOrder = isStrategyRelatedOrderUtil(selectRowData)
    if (isStrategyRelatedOrder) {
      message.warning('Can not select closed order to create')

      return
    }

    createStrategyUtil(selectRowData)
  }

  const createStrategyUtil = async (order: StraOrder[]) => {
    /*
    // const toaster = toast.loading('create strategy...', { showLayer: true })

    const res = await traderApi.createSpotStrategyApi(order)
    if (res.code === 200) {
      const params = {
        symbol: ''
      }
      // spotCallBack(params)
      getSpotOrders(params)
      setSelectRowData([])
      setSelectedRowKeys([])

      // toaster.update('create Strategy succeeded', {
      //   type: 'success',
      //   duration: 1000,
      // })

    } else {
      // toaster.update("Failed to create Strategy", {
      //   type: 'error',
      // })
    }
    */
  }

  const isStrategyRelatedOrderUtil = (selectRowData: StraOrder[]): boolean => {
    let isStrategyRelatedOrder = false
    selectRowData.forEach((item) => {
      const { strategyId } = item
      if (strategyId) {
        isStrategyRelatedOrder = true
      }
    })

    return isStrategyRelatedOrder
  }

  const onMergeStrategy = () => {
    if (!selectedRowKeys.length) {
      message.warning('select empty')

      return
    }

    const isStrategyRelatedOrder = isStrategyRelatedOrderUtil(selectRowData)
    if (isStrategyRelatedOrder) {
      message.warning('Can not select closed order to merge')
      return
    }

    selectRowData.sort((a: StraOrder, b: StraOrder) => {
      return Number(b.time) - Number(a.time)
    })

    // NiceModal.show('mergeStrategyModal')

    /*
    NiceModal.show(MergeStrategyModal, selectRowData).then((selectRowData) => {
      // userModal.show(MergeStrategyModal,selectRowData).then((selectRowData) => {
      // setUsers([newUser, ...users]);
    });
    */
  }

  const onCloseStrategy = async () => {
    if (!selectedRowKeys.length) {
      message.warning('select empty')

      return
    }

    const isStrategyRelatedOrder = isStrategyRelatedOrderUtil(selectRowData)
    if (isStrategyRelatedOrder) {
      message.warning('Can not select closed order to close')
      return
    }

    selectRowData.sort((a: StraOrder, b: StraOrder) => {
      return Number(a.time) - Number(b.time)
    })

    // NiceModal.show('closeStrategyModal')
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
          <div>
            <button onClick={() => syncPriceUtil([item])}>Update</button>
            <button onClick={() => onKline(item)}>Kline</button>
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
          <div>
            <button onClick={() => onStopLostProfit(item)}>Trade plan</button>
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

  console.log('StraTable->render', { data, count })

  return (
    <div className="table-box-container">
      <Table
        rowSelection={rowSelection}
        rowKey="id"
        columns={columns}
        dataSource={data}
        className="table-box"
        pagination={false}
      />
      <div>
        <Button onClick={() => oncreateStrategy()}>Create strategy</Button>
        <Button onClick={() => onMergeStrategy()}>Merge strategy</Button>
        <Button onClick={() => onCloseStrategy()}>Close strategy</Button>
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
