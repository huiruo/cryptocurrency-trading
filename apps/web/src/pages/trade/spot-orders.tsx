import React, { useEffect, useState } from 'react';
import traderApi from '@/services/traderApi';
import { Button } from '@/components/Button';
import { useDocumentTitle } from '@/utils/useDocumentTitle';
import Header from '@/components/Header';
import { Box } from '@fower/react';
import { SpotTable } from './spot-table';

/**
 * CODE ANNOTATION
 */
export function SpotOrders() {
  // const [currentPage, setCurrentPage] = useState(1)
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

  return (
    <>
      <Header />

      <Box pb='50px' mt='20px'>

        <Box toCenterX mb='20px'>
          <Box w='90%'>
            <Button onClick={() => onSyncFutureOrder()} mr4>Sync spot orders</Button>
          </Box>
        </Box>

        <SpotTable data={spotOrders} />
      </Box>
    </>
  );
}
