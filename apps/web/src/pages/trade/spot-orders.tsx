import React, { useEffect, useState } from 'react';
import traderApi from '@/services/traderApi';
import { useDocumentTitle } from '@/utils/useDocumentTitle';
import Header from '@/components/feader';
import { Box } from '@fower/react';
import { SpotTable } from './spot-table';
import { AssetSelect } from '@/components/asset-select';
import { AssetType, SpotOrder } from '@/utils/types';
import { get } from 'lodash';

/**
 * CODE ANNOTATION
 */
export function SpotOrders() {
  // const [currentPage, setCurrentPage] = useState(1)
  const [spotOrders, setSpotOrders] = useState<SpotOrder[]>([])
  const [asset, setAsset] = useState<AssetType[]>([])

  useDocumentTitle("spot order");

  const getSpotOrders = async (currentPage: number, pageSize?: number) => {
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

  const onSyncSpotOrder = async (value: string | number) => {
    let assetName = value
    if (!value) {
      assetName = get(asset, '[0].name', '')
    }

    const params = {
      name: assetName
    }
    const res = await traderApi.syncSpotOrderApi(params)
    if (res.code === 200) {
      console.log('success');
      getSpotOrders(1)
    } else {
      console.log("get future orders error")
    }
  }

  const getAsset = async () => {
    console.log('getAsset');
    const res = await traderApi.getAssetApi()
    if (res.code === 200) {
      setAsset(res.data)
      console.log('success', res.data);
    } else {
      console.log("Get asset oerror")
    }
  }

  useEffect(() => {
    getSpotOrders(1)
    getAsset()
  }, [])

  return (
    <>
      <Header />
      <Box pb='50px' mt='20px'>
        <AssetSelect options={asset} spotCallBack={onSyncSpotOrder} />
        <SpotTable data={spotOrders} />
      </Box>
    </>
  );
}
