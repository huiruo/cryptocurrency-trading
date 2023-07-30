import React, { useState } from 'react'
import { Pagination, Table } from 'antd'
import { formatUnixTime } from '@common/utils'
import { StgOrder, StgOrders, StgOrdersParams } from '@services/strategy.type'

interface Props {
  selectedRowKeys: React.Key[]
  onChangeCallback: (
    selectedRowKeys: React.Key[],
    selectedRows: StgOrder[],
  ) => void
  modalCallback: (params: StgOrdersParams) => void
  straOrders: StgOrders
  stgStatus: number
}

export function ModalTable(props: Props) {
  const {
    selectedRowKeys,
    straOrders,
    stgStatus,
    onChangeCallback,
    modalCallback,
  } = props
  const { data, total } = straOrders
  // eslint-disable-next-line no-unused-vars
  const [pageSize, setPageSize] = useState<number>(10)
  const [currentPage, setCurrentPage] = useState<number>(1)

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
        return (
          <>{item.is_running ? <span>Running</span> : <span>Ended</span>}</>
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
      id: 'profit',
      title: 'Profit',
      dataIndex: '',
      key: 'profit',
      width: 100,
      render(item: StgOrder) {
        return (
          <span>
            {item.profit} {item.profitRate}
          </span>
        )
      },
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
      id: 'userId',
      title: 'UserId',
      dataIndex: 'userId',
      key: 'userId',
      width: 100,
    },
  ]

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: StgOrder[]) => {
      onChangeCallback(selectedRowKeys, selectedRows)
    },
  }

  const onShowSizeChange = (page: number, pageSize: number) => {
    setPageSize(pageSize)
    setCurrentPage(page)
  }

  const onChangePage = (page: number, pageSize: number) => {
    setCurrentPage(page)
    setPageSize(pageSize)
    onChangeCallback([], [])
    modalCallback({
      currentPage: page,
      pageSize: pageSize,
      is_running: stgStatus,
      symbol: '',
    })
  }

  return (
    <>
      <Table
        rowSelection={{
          type: 'radio',
          ...rowSelection,
        }}
        rowKey="id"
        columns={columns}
        dataSource={data}
        className="table-box"
        pagination={false}
      />
      <Pagination
        current={currentPage}
        total={total}
        pageSizeOptions={['10', '20', '40']}
        showTotal={(total) => `Total:${total}`}
        showSizeChanger={true}
        onChange={onChangePage}
        onShowSizeChange={onShowSizeChange}
        className="common-top2-mg"
      />
    </>
  )
}
