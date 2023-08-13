import React, { useEffect, useState } from 'react'
import { spotOrdersState } from '@stores/appSlice'
import { useAppSelector } from '@stores/hooks'
import { Button, Pagination, Table, message } from 'antd'
import {
  FetchSpotOrdersAction,
  SpotOrder,
  SpotOrdersParams,
} from '@services/spot.type'
import { formatUnixTime } from '@common/utils'
import { SUCCESS, strategyStatusMap } from '@common/constants'
import { isEmpty } from 'lodash'
import store from '@stores/index'
import { strategyApi } from '@services/strategy'
import NiceModal from '@common/nice-modal'
import { fetchSpotOrders } from '@stores/thunkAction'
import { MergeOrderModal } from '../component/MergeOrderModal'
import { StgCloseModal } from '../component/StgCloseModal'

export default function SpotTable() {
  const { total, data } = useAppSelector(spotOrdersState)
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [selectRowData, setSelectRowData] = useState<SpotOrder[]>([])
  const [, setPageSize] = useState<number>(10)
  const [currentPage, setCurrentPage] = useState<number>(1)

  const oncreateStrategy = async () => {
    if (!selectedRowKeys.length) {
      message.warning('select empty')

      return
    }

    selectRowData.sort((a: SpotOrder, b: SpotOrder) => {
      return Number(a.time) - Number(b.time)
    })

    const isStrategyRelatedOrder = isStrategyRelatedOrderUtil(selectRowData)
    if (isStrategyRelatedOrder) {
      message.warning('Can not select closed order to create')

      return
    }

    createStrategyUtil(selectRowData)
  }

  const createStrategyUtil = async (order: SpotOrder[]) => {
    const res = await strategyApi.createSpotStg(order)
    if (res.code === SUCCESS) {
      getSpotOrdersUtil({})
      setSelectRowData([])
      setSelectedRowKeys([])
      message.success('create strategy succeeded')
    } else {
      message.error('Failed to create Strategy')
    }
  }

  const isStrategyRelatedOrderUtil = (selectRowData: SpotOrder[]): boolean => {
    let isStrategyRelatedOrder = false
    selectRowData.forEach((item) => {
      const { strategyId } = item
      if (strategyId) {
        isStrategyRelatedOrder = true
      }
    })

    return isStrategyRelatedOrder
  }

  const onResetOrderStatus = (item: SpotOrder) => {
    console.log('item', item)
    message.warning('Currently not supported')
  }

  const onRebuildOrderStatus = async (item: SpotOrder) => {
    const { strategyStatus, strategyId } = item
    if (strategyStatus === 2) {
      message.warning('Can not reset ended order')
      return
    }

    const res = await strategyApi.resetStg({
      strategyId,
      orderType: 'spot',
    })
    if (res.code === SUCCESS) {
      getSpotOrdersUtil({})
      setSelectRowData([])
      setSelectedRowKeys([])
      message.success('Reset order succeeded')
    } else {
      message.error('Failed to reset order')
    }
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

    selectRowData.sort((a: SpotOrder, b: SpotOrder) => {
      return Number(b.time) - Number(a.time)
    })

    NiceModal.show('mergeOrderModal')

    /*
    NiceModal.show(mergeOrderModal, selectRowData).then((selectRowData) => {
      // userModal.show(mergeOrderModal,selectRowData).then((selectRowData) => {
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

    selectRowData.sort((a: SpotOrder, b: SpotOrder) => {
      return Number(a.time) - Number(b.time)
    })

    NiceModal.show('closeStrategyModal')
  }

  const modalCallBack = () => {
    getSpotOrdersUtil({
      current: 1,
      page: 10,
    })
    setSelectRowData([])
    setSelectedRowKeys([])
  }

  const columns = [
    {
      id: 'time',
      title: 'Date',
      dataIndex: '',
      key: 'time',
      width: 100,
      render(item: SpotOrder) {
        return <div>{formatUnixTime(Number(item.time))}</div>
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
      id: 'isBuyer',
      title: 'Side',
      dataIndex: '',
      key: 'isBuyer',
      width: 100,
      render(item: SpotOrder) {
        return (
          <div>
            {item.isBuyer ? (
              <span className="primary-c">BUY</span>
            ) : (
              <span className="warm-c">SELL</span>
            )}
          </div>
        )
      },
    },
    /*
    0 : original 1 : running 2 : ended
    */
    {
      id: 'strategyStatus',
      title: 'Status',
      dataIndex: '',
      key: 'strategyStatus',
      width: 100,
      render(item: SpotOrder) {
        return <span>{strategyStatusMap[item.strategyStatus]}</span>
      },
    },
    {
      id: 'price',
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      width: 100,
    },
    {
      id: 'qty',
      title: 'qty',
      dataIndex: '',
      key: 'qty',
      width: 100,
      render(item: SpotOrder) {
        return (
          <div>
            <div>{item.qty}</div>
            <div>{item.quoteQty}</div>
          </div>
        )
      },
    },
    {
      id: 'action',
      title: 'Action',
      dataIndex: '',
      key: 'action',
      width: 100,
      render(item: SpotOrder) {
        return (
          <>
            {item.strategyStatus === 0 && (
              <Button
                onClick={() => createStrategyUtil([item])}
                className="green-btn"
              >
                Create
              </Button>
            )}
            {item.strategyStatus === 1 && (
              <Button
                onClick={() => onRebuildOrderStatus(item)}
                className="warm-btn"
              >
                Rebuild
              </Button>
            )}
            {item.strategyStatus === 2 && (
              <Button danger onClick={() => onResetOrderStatus(item)}>
                Reset
              </Button>
            )}
          </>
        )
      },
    },
    {
      id: 'commission',
      title: 'Commission',
      dataIndex: 'commission',
      key: 'commission',
      width: 100,
    },
    {
      id: 'commissionAsset',
      title: 'CommissionAsset',
      dataIndex: 'commissionAsset',
      key: 'commissionAsset',
    },
    {
      id: 'orderId',
      title: 'OrderId',
      dataIndex: 'orderId',
      key: 'orderId',
      width: 100,
    },
    {
      id: 'strategyId',
      title: 'StrategyId',
      dataIndex: '',
      key: 'strategyId',
      width: 100,
      render(item: SpotOrder) {
        return (
          <div>
            <div>{item.strategyId}</div>
            <div>UserId:{item.userId}</div>
          </div>
        )
      },
    },
    {
      id: 'isMaker',
      title: 'IsMaker',
      dataIndex: 'isMaker',
      key: 'isMaker',
      width: 100,
    },
    {
      id: 'isBestMatch',
      title: 'IsBestMatch',
      dataIndex: 'isBestMatch',
      key: 'isBestMatch',
      width: 100,
    },
    {
      id: 'updatedAt',
      title: 'Updated',
      dataIndex: '',
      key: 'updatedAt',
      width: 100,
      render(item: SpotOrder) {
        return <div>{formatUnixTime(item.updatedAt)}</div>
      },
    },
  ]

  const onChangePage = (current: number, pageSize: number) => {
    setCurrentPage(current)
    getSpotOrdersUtil({
      current,
      page: pageSize,
    })
  }

  const getSpotOrdersUtil = async (spotOrdersParams: SpotOrdersParams) => {
    const { payload } = (await store.dispatch(
      fetchSpotOrders(spotOrdersParams),
    )) as FetchSpotOrdersAction
    if (payload.code === SUCCESS) {
      setCurrentPage(payload.data.currentPage)
      setPageSize(payload.data.pageSize)
    } else {
      message.error(payload.msg || 'error')
    }
  }

  const onShowSizeChange = (page: number, pageSize: number) => {
    setPageSize(pageSize)
    setCurrentPage(page)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: SpotOrder[]) => {
      // console.log(`${selectedRowKeys}`, '--', 'selectedRows: ', selectedRows);
      setSelectedRowKeys(selectedRowKeys)
      setSelectRowData(selectedRows)
    },
  }

  useEffect(() => {
    if (!isEmpty(selectedRowKeys)) {
      console.log('clear selected')
      setSelectedRowKeys([])
    }
  }, [data])

  useEffect(() => {
    getSpotOrdersUtil({})
  }, [])

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
      <div className="spot-operation">
        <Button onClick={() => oncreateStrategy()} className="green-btn">
          Create strategy
        </Button>
        <Button
          onClick={() => onMergeStrategy()}
          className="merge-btn neutral-btn"
        >
          Merge Order
        </Button>
        <Button danger onClick={() => onCloseStrategy()}>
          Close strategy
        </Button>
      </div>

      <MergeOrderModal
        id="mergeOrderModal"
        mergeOrders={selectRowData}
        title="Close strategy"
        orderType="spot"
        modalCallBack={modalCallBack}
      />

      <StgCloseModal
        id="closeStrategyModal"
        closeOrders={selectRowData}
        title="Merge order"
        orderType="spot"
        modalCallBack={modalCallBack}
      />

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
