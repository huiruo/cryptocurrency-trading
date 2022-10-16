import React, { useEffect, useState } from 'react';
import traderApi from '@/services/traderApi';
import { SpotOrderFilter } from '@/components/spot-order-filter';
import { useDocumentTitle } from '@/utils/useDocumentTitle';
import Header from '@/components/feader';
import { Box } from '@fower/react';
import { SpotTable } from './spot-table';
import { AssetSync } from '@/components/asset-sync';
import { SearchParmas, SpotOrder } from '@/utils/types';
import { Pagination } from '@/components/pagination';

/**
 * CODE ANNOTATION
 */
export function SpotOrders() {
  const [spotOrders, setSpotOrders] = useState<SpotOrder[]>([])
  const [selectAssetValue, setSelectAssetValue] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1);

  useDocumentTitle("spot order");

  const getSpotOrders = async (params: SearchParmas) => {
    const { symbol, currentPage: current, pageSize: size } = params
    const data = {
      currentPage: current || currentPage,
      pageSize: size || 10,
      symbol: symbol || selectAssetValue
    }

    const res = await traderApi.spotOrdersApi(data)
    if (res.code === 200) {

      setSpotOrders(res.data)
    } else {
      alert("get spot orders error")
    }
  }

  const onSyncSpotOrder = async (value: string | number) => {
    let assetName = value
    if (!value) {
      assetName = 'BTCUSDT'
    }

    const params = {
      name: assetName
    }
    const res = await traderApi.syncSpotOrderApi(params)
    if (res.code === 200) {
      const params = {
        currentPage: 1,
        pageSize: 10,
        symbol: selectAssetValue
      }
      getSpotOrders(params)
    } else {
      alert("get spot orders error")
    }
  }

  const selectCallback = (val: string) => {
    setSelectAssetValue(val)
  }

  const onPage = (currentPage: number, pageSize: number) => {
    const params = {
      currentPage,
      pageSize,
      symbol: ''
    }
    setCurrentPage(currentPage)
    getSpotOrders(params)
  }

  useEffect(() => {
    const params = {
      currentPage: 1,
      pageSize: 10,
      symbol: ''
    }
    getSpotOrders(params)
  }, [])

  return (
    <>
      <Header />
      <Box pb='50px' mt='20px'>
        <Box toCenterX mb='20px'>
          <Box w='90%'>
            <AssetSync spotCallBack={onSyncSpotOrder} />
            <SpotOrderFilter selectAssetValue={selectAssetValue} selectCallback={selectCallback} spotCallBack={getSpotOrders} />
            <SpotTable data={spotOrders} spotCallBack={getSpotOrders} />
            <Pagination onChange={onPage} currentPage={currentPage} />
          </Box>
        </Box>
      </Box>
    </>
  );
}
