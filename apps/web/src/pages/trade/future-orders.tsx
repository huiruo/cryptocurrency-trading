import React, { useEffect, useState } from 'react';
import traderApi from '@/services/traderApi';
import { Button } from '@/common/button';
import { useDocumentTitle } from '@/utils/useDocumentTitle';
import Header from '@/components/header';
import { Box } from '@fower/react';
import { FutureTable } from './future-table';
import { FuturesOrder } from '@/utils/types';

/**
 * CODE ANNOTATION
 */
export function FutureOrders() {
  // const [currentPage, setCurrentPage] = useState(1)
  const [futureOrders, setFutureOrders] = useState<FuturesOrder[]>([])

  useDocumentTitle("future order");

  const getFutureOrders = async (currentPage: number, pageSize?: number) => {
    const data = {
      currentPage: currentPage || 1,
      pageSize: pageSize || 10
    }
    const res = await traderApi.futureOrdersApi(data)
    if (res.code === 200) {

      setFutureOrders(res.data)
    } else {
      console.log("get future orders error")
    }
  }

  const onSyncFutureOrder = async () => {
    const res = await traderApi.syncFutureOrderApi()
    console.log('onSyncFutureOrder:', res)

    if (res.code === 200) {
      setFutureOrders(res.data)
    } else {
      console.log("onSyncFutureOrder future orders error")
    }
  }

  const onCancelAllOpenOrders = async () => {
    const openOrderSymbol = futureOrders.map(item => {
      return item.symbol
    })
    for (const symbol of Array.from(new Set(openOrderSymbol))) {
      const res = await traderApi.cancelFutureAllOpenOrders({ symbol })
      if (res.code === 200) {
        console.log("CancelAllOpenOrders success")
      } else {
        console.log("CancelAllOpenOrders future orders error")
      }
    };
  }

  useEffect(() => {
    // getFutureOrders(1)
  }, [])

  return (
    <>
      <Header />

      <Box pb='50px' mt='20px'>
        <Box toCenterX mb='20px'>
          <Box w='90%'>
            <Button onClick={() => onSyncFutureOrder()} mr4>Sync future orders</Button>
            <Button onClick={() => onCancelAllOpenOrders()} mr4>Cancel All Open Orders</Button>
          </Box>
        </Box>

        <FutureTable data={futureOrders} />
      </Box>
    </>
  );
}
