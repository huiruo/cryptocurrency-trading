import React, { useState } from 'react';
import { formatUnixTime } from '@/utils';
import { StrategiesOrder } from '@/utils/types';
import { Box } from '@fower/react';
import { Pagination, Table as AntTable } from 'antd';

interface Props {
  data: StrategiesOrder[]
  selectedRowKeys: React.Key[]
  total: number
  onChangeCallback: (selectedRowKeys: React.Key[], selectedRows: StrategiesOrder[]) => void
  modalCallback: (params: any) => void
}

/**
 * Code annotation
 */
export function StrategieyModalTable(props: Props) {
  const { data, selectedRowKeys, onChangeCallback, total, modalCallback } = props

  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

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

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: StrategiesOrder[]) => {
      onChangeCallback(selectedRowKeys, selectedRows)
    },
  };

  const onShowSizeChange = (page: number, pageSize: number) => {
    setPageSize(pageSize)
    setCurrentPage(page)
  }

  const onChangePage = (page: number, pageSize: number) => {
    const params = {
      currentPage: page,
      pageSize: pageSize,
      symbol: ''
    }
    setCurrentPage(page)
    setPageSize(pageSize)
    onChangeCallback([], [])
    modalCallback(params)
  }

  return (
    <>
      <AntTable
        rowSelection={{
          type: 'radio',
          ...rowSelection
        }}
        rowKey="id"
        columns={columns}
        dataSource={data} className='table-box modal-stg-table'
        pagination={false}
      />
      <Box flex mt-10px>
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
    </>
  );
}
