import React, { useEffect, useState } from 'react';
import traderApi from '@/services/traderApi';
import { useDocumentTitle } from '@/utils/useDocumentTitle';
import Header from '@/components/feader';
import { Box } from '@fower/react';
import { StrategiesTable } from './strategies-table';
import { StrategiesOrder } from '@/utils/types';

/**
 * CODE ANNOTATION
 */
export function Strategies() {
  const [strategies, setStrategies] = useState<StrategiesOrder[]>([])

  useDocumentTitle("strategies");

  const getStrategies = async (currentPage: number, pageSize?: number) => {
    const data = {
      currentPage: currentPage || 1,
      pageSize: pageSize || 10
    }
    const res = await traderApi.strategiesOrderApi(data)
    if (res.code === 200) {

      setStrategies(res.data)
    } else {
      console.log("get future orders error")
    }
  }

  const syncCallBack = () => {
    getStrategies(1)
  }

  useEffect(() => {
    getStrategies(1)
  }, [])

  return (
    <>
      <Header />

      <Box pb='50px' mt='20px'>

        <Box toCenterX mb='20px'>
          {/* <Box w='90%'>
            <Button onClick={() => onSyncFutureOrder()} mr4>Sync spot orders</Button>
          </Box> */}
        </Box>

        <StrategiesTable data={strategies} syncCallBack={syncCallBack} />
      </Box>
    </>
  );
}
