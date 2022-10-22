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
import { toast } from '@/common/toast';
import { useLocation } from "react-router-dom";
import { get, isEmpty } from 'lodash'

/**
 * CODE ANNOTATION
 */
export function SpotOrders() {
  const [spotOrders, setSpotOrders] = useState<SpotOrder[]>([])
  const [selectAssetValue, setSelectAssetValue] = useState<string>('')
  const [assetSyncValue, setAssetSyncValue] = useState<string>('BTCUSDT')
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const location = useLocation();

  useDocumentTitle("spot order");

  const getSpotOrders = async (params: SearchParmas, isUpdate = false) => {
    const { symbol, currentPage: current, pageSize: size } = params
    const data = {
      currentPage: current || currentPage,
      pageSize: size || pageSize,
      symbol: symbol || selectAssetValue
    }

    const res = await traderApi.spotOrdersApi(data)
    if (res.code === 200) {
      if (isUpdate) {
        toast.success('Get orders succeeded')
      }
      setSpotOrders(res.data)
    } else {
      toast.error('Failed to get orders')
    }
  }

  const onFilterSpotOrder = (params: SearchParmas) => {
    setCurrentPage(1)
    getSpotOrders(params)
  }

  const onSyncSpotOrder = async (value: string) => {
    const toaster = toast.loading('Sync spot order...', { showLayer: true })
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
        // symbol: selectAssetValue
        symbol: assetName
      }
      setCurrentPage(1)
      setSelectAssetValue(assetName)
      getSpotOrders(params)

      toaster.update('Sync spot order succeeded', {
        type: 'success',
        duration: 1000,
      })
    } else {
      toaster.update("Failed to sync spot orders", {
        type: 'error',
      })
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
      pageSize: pageSize,
      symbol: ''
    }
    getSpotOrders(params)

    const isEmptyState = isEmpty(location.state)
    if (!isEmptyState) {
      const asset = get(location.state, `asset`, '') as string
      setSelectAssetValue(asset)
      setAssetSyncValue(asset)
    }
  }, [])

  return (
    <>
      <Header />
      <Box pb='50px' mt='20px'>
        <Box toCenterX mb='20px'>
          <Box w='90%'>
            <AssetSync assetSyncValue={assetSyncValue} assetSyncValueCallback={setAssetSyncValue} spotCallBack={onSyncSpotOrder} />
            <SpotOrderFilter selectAssetValue={selectAssetValue} selectCallback={selectCallback} spotCallBack={onFilterSpotOrder} />
            <SpotTable data={spotOrders} spotCallBack={getSpotOrders} />
            <Pagination onChange={onPage} currentPage={currentPage} showPageSelect={true} pageSize={pageSize} onChangePageSize={setPageSize} />
          </Box>
        </Box>
      </Box>
    </>
  );
}
