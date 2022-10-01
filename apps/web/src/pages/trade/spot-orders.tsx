import React, { useEffect, useState } from 'react';
import traderApi from '@/services/traderApi';
import { Table } from '@/components/Table/Table';
import { Button } from '@/components/Button';
import { formatUnixTime } from '@/utils';
import { useDocumentTitle } from '@/utils/useDocumentTitle';
import Header from '@/components/Header';
import { Box } from '@fower/react';

/**
 * CODE ANNOTATION
 */
export function SpotOrders() {

  const [currentPage, setCurrentPage] = useState(1)
  const [spotOrders, setSpotOrders] = useState<any>([])

  useDocumentTitle("spot order");

  const getFutureOrders = async (currentPage: number, pageSize?: number) => {
    const data = {
      currentPage: currentPage || 1,
      pageSize: pageSize || 10
    }
    const res = await traderApi.spotOrdersApi(data)
    if (res.code === 200) {

      setSpotOrders(res.data)
    } else {
      console.log("get future orders error")
    }
  }

  const onSyncFutureOrder = async () => {
    const res = await traderApi.syncSpotOrderApi()
    if (res.code === 200) {
      console.log('success');

      // setFutureOrders(res.data)
    } else {
      console.log("get future orders error")
    }
  }

  useEffect(() => {
    getFutureOrders(1)
  }, [])

  const columns = [
    { id: 'orderId', title: 'orderId', dataIndex: 'orderId', key: 'orderId', width: 100 },
    { id: 'userId', title: 'userId', dataIndex: 'userId', key: 'userId', width: 100 },
    { id: 'symbol', title: 'symbol', dataIndex: 'symbol', key: 'symbol', width: 100 },
    { id: 'strategyId', title: 'strategyId', dataIndex: 'strategyId', key: 'strategyId', width: 100 },
    { id: 'price', title: 'price', dataIndex: 'price', key: 'price', width: 100 },
    { id: 'qty', title: 'qty', dataIndex: 'qty', key: 'qty', width: 100 },
    { id: 'quoteQty', title: 'quoteQty', dataIndex: 'quoteQty', key: 'quoteQty', width: 100 },
    { id: 'commission', title: 'commission', dataIndex: 'commission', key: 'commission', width: 100 },
    { id: 'commissionAsset', title: 'commissionAsset', dataIndex: 'commissionAsset', key: 'commissionAsset' },
    { id: 'isBuyer', title: 'isBuyer', dataIndex: 'isBuyer', key: 'isBuyer', width: 100 },
    { id: 'isMaker', title: 'isMaker', dataIndex: 'isMaker', key: 'isMaker', width: 100 },
    { id: 'isBestMatch', title: 'isBestMatch', dataIndex: 'isBestMatch', key: 'isBestMatch', width: 100 },
    {
      id: 'time', title: 'time', dataIndex: '', key: 'time', width: 100,
      render(item: any) {
        return <span>{formatUnixTime(Number(item.time))}</span>
      },
    },
    {
      id: 'updatedAt', title: 'updatedAt', dataIndex: '', key: 'updatedAt', width: 100,
      render(item: any) {
        return <span>{formatUnixTime(item.updatedAt)}</span>
      },
    },
    {
      id: 'createdAt', title: 'createdAt', dataIndex: '', key: 'createdAt', width: 100,
      render(item: any) {
        return <span>{formatUnixTime(item.createdAt)}</span>
      },
    },
  ]

  return (
    <>
      <Header />

      <Box pb='50px' mt='20px'>
        <Box toCenterX mb='20px'>
          <Box w='90%'>
            <Button onClick={() => onSyncFutureOrder()} mr4>Sync spot orders</Button>
          </Box>
        </Box>

        <Box toCenterX>
          <Box className='table-box-container'>
            <Table columns={columns} data={spotOrders} className='table-box' />
          </Box>
        </Box>
      </Box>
    </>
  );
}
