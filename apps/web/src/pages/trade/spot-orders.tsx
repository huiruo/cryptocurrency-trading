import React, { useEffect, useRef, useState } from 'react';
import traderApi from '@/services/traderApi';
import { SpotOrderFilter } from '@/components/spot-order-filter';
import { useDocumentTitle } from '@/utils/useDocumentTitle';
import Header from '@/components/header';
import { Box } from '@fower/react';
import { SpotTable } from './spot-table';
import { AssetSync } from '@/components/asset-sync';
import { toast } from '@/common/toast';
import { useLocation } from "react-router-dom";
import { get, isEmpty } from 'lodash'

/**
 * CODE ANNOTATION
 */
export function SpotOrders() {
  const [selectAssetValue, setSelectAssetValue] = useState<string>('')
  const [assetSyncValue, setAssetSyncValue] = useState<string>('BTCUSDT')
  const location = useLocation();
  const spotTableRef = useRef<any>(null)

  useDocumentTitle("spot order");

  const onFilterSpotOrder = (symbolAsset: string, isUpdate: boolean) => {
    spotTableRef.current.getOrders({ symbol: symbolAsset, currentPage: 1 }, true);
  }

  const onSyncSpotOrder = async (value: string, filterTime: number[]) => {
    const toaster = toast.loading('Sync spot order...', { showLayer: true })
    let assetName = value
    if (!value) {
      assetName = 'BTCUSDT'
    }

    const params = {
      symbol: assetName,
      startTime: filterTime[0],
      endTime: filterTime[1],
    }


    const res = await traderApi.syncSpotOrderApi(params)
    if (res.code === 200) {
      setSelectAssetValue(assetName)
      spotTableRef.current.getOrders({ symbol: assetName, currentPage: 1 }, true);

      toaster.update('Sync spot order succeeded', {
        type: 'success',
        duration: 1000,
      })
    } else {
      toaster.update(res.message, {
        type: 'error',
      })
    }
  }

  const selectCallback = (val: string) => {
    setSelectAssetValue(val)
  }

  useEffect(() => {
    const isEmptyState = isEmpty(location.state)
    if (!isEmptyState) {
      const asset = get(location.state, `asset`, '') as string
      setSelectAssetValue(asset)
      setAssetSyncValue(asset)
    }
  }, [])

  const spotCallBack = () => {
    console.log('spotCallBack');
  }

  return (
    <>
      <Header />
      <Box pb='50px' mt='20px'>
        <Box toCenterX mb='20px'>
          <Box w='90%'>
            <AssetSync assetSyncValue={assetSyncValue} assetSyncValueCallback={setAssetSyncValue} syncSpotOrder={onSyncSpotOrder} />
            <SpotOrderFilter selectAssetValue={selectAssetValue} selectCallback={selectCallback} spotCallBack={onFilterSpotOrder} />
            <SpotTable ref={spotTableRef} selectAssetValue={selectAssetValue} spotCallBack={spotCallBack} />
          </Box>
        </Box>
      </Box>
    </>
  );
}
