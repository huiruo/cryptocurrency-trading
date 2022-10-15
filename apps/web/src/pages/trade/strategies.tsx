import React, { useEffect, useState } from 'react';
import traderApi from '@/services/traderApi';
import { useDocumentTitle } from '@/utils/useDocumentTitle';
import Header from '@/components/feader';
import { Box } from '@fower/react';
import { StrategiesTable } from './strategies-table';
import { FiterStrategyOrderType, StrategiesOrder } from '@/utils/types';
import { StrategieyFilter } from '@/components/strategiey-filter';
import { Pagination } from '@/components/pagination';

/**
 * CODE ANNOTATION
 */
export function Strategies() {
  const [strategies, setStrategies] = useState<StrategiesOrder[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectAssetValue, setSelectAssetValue] = useState<string>('')
  const [selectStatusValue, setSelectStatusValue] = useState<string | number>('')

  useDocumentTitle("strategies");

  const getStrategies = async (params: FiterStrategyOrderType) => {
    const { currentPage, pageSize, is_running } = params
    const paramsReq = {
      currentPage: currentPage || 1,
      pageSize: pageSize || 10,
      is_running,
      symbol: selectAssetValue
    }

    console.log('getStrategies:', paramsReq);

    const res = await traderApi.strategiesOrderApi(paramsReq)
    if (res.code === 200) {

      setStrategies(res.data)
    } else {
      console.log("get Strategies orders error")
    }
  }

  const syncCallBack = () => {
    const params = {
      is_running: '',
      currentPage: 1,
      symbol: ''
    }
    getStrategies(params)
  }

  const onPage = (currentPage: number, pageSize: number) => {
    const params = {
      currentPage,
      pageSize,
      is_running: '',
      symbol: ''
    }
    setCurrentPage(currentPage)
    getStrategies(params)
  }

  const selectStatusCallback = (val: string | number) => {
    setSelectStatusValue(val)
  }

  useEffect(() => {
    const params = {
      is_running: '',
      currentPage: 1,
      symbol: ''
    }
    getStrategies(params)
  }, [])

  return (
    <>
      <Header />

      <Box toCenterX mb='20px'>
        <Box w='90%'>
          <Box pb='50px' mt='20px'>
            <StrategieyFilter
              selectStatus={selectStatusValue}
              selectAsset={selectAssetValue}
              selectStatusCallback={selectStatusCallback}
              selectAssetCallback={setSelectAssetValue}
              fiterStrategyOrderCallback={getStrategies}
            />
            <StrategiesTable data={strategies} syncCallBack={syncCallBack} />
            <Pagination onChange={onPage} currentPage={currentPage} />
          </Box>
        </Box>
      </Box>
    </>
  );
}
