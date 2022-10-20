import React, { useEffect, useState } from 'react';
import traderApi from '@/services/traderApi';
import { useDocumentTitle } from '@/utils/useDocumentTitle';
import Header from '@/components/feader';
import { Box } from '@fower/react';
import { StrategiesTable } from './strategies-table';
import { FiterStrategyOrderType, StrategiesOrder } from '@/utils/types';
import { StrategieyFilter } from '@/components/strategiey-filter';
import { Pagination } from '@/components/pagination';
import { toast } from '@/common/toast';

/**
 * CODE ANNOTATION
 */
export function Strategies() {
  const [strategies, setStrategies] = useState<StrategiesOrder[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [selectAssetValue, setSelectAssetValue] = useState<string>('')
  const [selectStatusValue, setSelectStatusValue] = useState<string | number>(1)

  useDocumentTitle("strategies");

  const getStrategies = async (params: FiterStrategyOrderType, isUpdate = false) => {
    const { currentPage, pageSize, is_running } = params
    const paramsReq = {
      currentPage: currentPage || 1,
      pageSize: pageSize || 10,
      is_running,
      symbol: selectAssetValue
    }
    const res = await traderApi.strategiesOrderApi(paramsReq)
    if (res.code === 200) {
      if (isUpdate) {
        toast.success('Get orders succeeded')
      }
      setStrategies(res.data)
    } else {
      toast.error('Failed to get orders')
    }
  }

  const syncCallBack = () => {
    const params = {
      is_running: selectStatusValue,
      currentPage: currentPage,
      symbol: selectAssetValue
    }
    getStrategies(params)
  }

  const onPage = (currentPage: number, pageSize: number) => {
    const params = {
      is_running: selectStatusValue,
      currentPage: currentPage,
      symbol: selectAssetValue
    }
    setCurrentPage(currentPage)
    getStrategies(params)
  }

  const selectStatusCallback = (val: string | number) => {
    setSelectStatusValue(val)
  }

  useEffect(() => {
    const params = {
      is_running: selectStatusValue,
      currentPage: currentPage,
      symbol: selectAssetValue
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
