import React, { useEffect, useState } from 'react';
import traderApi from '@/services/traderApi';
import { AssetSearch } from '@/components/asset-search';
import { useDocumentTitle } from '@/utils/useDocumentTitle';
import Header from '@/components/feader';
import { Box } from '@fower/react';
import { SpotTable } from './spot-table';
import { AssetSelect } from '@/components/asset-select';
import { AssetType, SearchParmas, SpotOrder } from '@/utils/types';
import { get } from 'lodash';

/**
 * CODE ANNOTATION
 */
export function SpotOrders() {
  // const [currentPage, setCurrentPage] = useState(1)
  const [spotOrders, setSpotOrders] = useState<SpotOrder[]>([])
  const [asset, setAsset] = useState<AssetType[]>([])

  useDocumentTitle("spot order");

  const getSpotOrders = async (params: SearchParmas) => {
    const { currentPage, pageSize, symbol } = params
    const data = {
      currentPage: currentPage || 1,
      pageSize: pageSize || 10,
      symbol: symbol || ''
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
      const params = {
        currentPage: 1,
        pageSize: 10,
        symbol: ''
      }
      getSpotOrders(params)
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
    const params = {
      currentPage: 1,
      pageSize: 10,
      symbol: ''
    }
    getSpotOrders(params)
    getAsset()
  }, [])

  return (
    <>
      <Header />
      <Box pb='50px' mt='20px'>

        <Box toCenterX mb='20px'>
          <Box w='90%'>
            <AssetSelect options={asset} spotCallBack={onSyncSpotOrder} />
            <AssetSearch spotCallBack={getSpotOrders} options={asset} />
          </Box>
        </Box>

        <SpotTable data={spotOrders} spotCallBack={getSpotOrders} />
      </Box>
    </>
  );
}
