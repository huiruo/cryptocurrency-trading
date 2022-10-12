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
import { Pagination } from '@/components/pagination';

/**
 * CODE ANNOTATION
 */
export function SpotOrders() {
  // const [currentPage, setCurrentPage] = useState(1)
  const [spotOrders, setSpotOrders] = useState<SpotOrder[]>([])
  const [asset, setAsset] = useState<AssetType[]>([])
  const [selectValue, setSelectValue] = useState<string>('')
  const [currentPage, setCurrentPage] = useState<number>(1);

  useDocumentTitle("spot order");

  const getSpotOrders = async (params: SearchParmas) => {
    const { symbol, currentPage: current, pageSize: size } = params
    const data = {
      currentPage: current || currentPage,
      pageSize: size || 10,
      symbol: symbol || selectValue
    }
    console.log('data:', data);

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
        symbol: selectValue
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

  const selectCallback = (val: string) => {
    setSelectValue(val)
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
    getAsset()
  }, [])

  return (
    <>
      <Header />
      <Box pb='50px' mt='20px'>

        <Box toCenterX mb='20px'>
          <Box w='90%'>
            <AssetSelect options={asset} spotCallBack={onSyncSpotOrder} />
            <AssetSearch selectCallback={selectCallback} spotCallBack={getSpotOrders} options={asset} />
          </Box>
        </Box>

        <SpotTable data={spotOrders} spotCallBack={getSpotOrders} />

        <Box toCenterX>
          <Box w='90%' >
            <Pagination onChange={onPage} currentPage={currentPage} />
          </Box>
        </Box>
      </Box>
    </>
  );
}
