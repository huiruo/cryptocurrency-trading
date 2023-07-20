import React, { useRef, useState } from 'react';
import { useDocumentTitle } from '@/utils/useDocumentTitle';
import Header from '@/components/header';
import { Box } from '@fower/react';
import { StrategiesTable } from './strategies-table';
import { FiterStrategyOrderType } from '@/utils/types';
import { StrategieyFilter } from '@/components/strategiey-filter';
import TradeCount from '@/components/trade-count';

/**
 * CODE ANNOTATION
 */
export function Strategies() {
  const [selectAssetValue, setSelectAssetValue] = useState<string>('')
  const [selectStatusValue, setSelectStatusValue] = useState<number>(1)

  const strategiesTableRef = useRef<any>(null)
  useDocumentTitle("strategies");

  const syncCallBack = () => {
    /*
    const params = {
      is_running: selectStatusValue,
      currentPage: 1,
      symbol: selectAssetValue
    }
    getStrategies(params)
    */
  }

  const selectStatusCallback = (val: number) => {
    setSelectStatusValue(val)
  }

  const onFiterStrategyOrder = (params: FiterStrategyOrderType) => {
    strategiesTableRef.current.getStrategies(params, true);
  }

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
              fiterStrategyOrderCallback={onFiterStrategyOrder}
            />
            <StrategiesTable
              ref={strategiesTableRef}
              selectStatusValue={selectStatusValue}
              selectAssetValue={selectAssetValue} syncCallBack={syncCallBack} />
            <TradeCount />
          </Box>
        </Box>
      </Box>
    </>
  );
}
