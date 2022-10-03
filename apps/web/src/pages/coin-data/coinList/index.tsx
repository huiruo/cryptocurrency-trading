import React, { useEffect, useState } from 'react';
import traderApi from '@/services/traderApi';
import { formatUnixTime } from '@/utils';
import { Button } from '@/components/Button';
import { Box } from '@fower/react';
import { Input } from '@/components/Input';
import { Table } from '@/components/Table/Table';
import Header from '@/components/Header';
import { useDocumentTitle } from '@/utils/useDocumentTitle';

/*
interface Props {
  test: React.ReactNode
}
*/

/**
 * CODE ANNOTATION
 */
export function CoinList() {

  const [coinData, setCoinData] = useState<any>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [searchSymbol, setSearchSymbol] = useState<string>('')

  useDocumentTitle("coin list");

  const onDetail = async (item: any) => {
    console.log('onDetail', item);
    // push(`/coin/detail?code=${item.code}`)
  }

  const onSyncCoinInfo = async (item: any) => {
    console.log('onSyncInfo', item);
    const data = {
      code: item.code
    }
    const res = await traderApi.syncCoinInfoApi(data)
    console.log('success', res);
  }

  const onNextPage = () => {
    setCurrentPage(currentPage + 1)
    getCoin(currentPage + 1)
  }

  const onPrePage = () => {
    setCurrentPage(currentPage - 1)
    getCoin(currentPage - 1)
  }

  const columns = [
    { id: 'ranked', title: '排名', dataIndex: 'ranked', key: 'ranked', width: 100 },
    { id: 'symbol', title: '币种', dataIndex: 'symbol', key: 'symbol', width: 100 },
    { id: 'price', title: '价格', dataIndex: 'price', key: 'price', width: 100 },
    { id: 'marketcap', title: '流通市值', dataIndex: 'marketcap', key: 'marketcap', width: 100 },
    { id: 'marketcap', title: '流通市值', dataIndex: 'marketcap', key: 'marketcap', width: 100 },
    { id: 'supply', title: '流通总量', dataIndex: 'supply', key: 'supply', width: 100 },
    { id: 'maxsupply', title: '最大供应量', dataIndex: 'maxsupply', key: 'maxsupply', width: 100 },
    {
      id: 'updatetime', title: 'updatetime', dataIndex: '', key: 'updatetime', width: 100,
      render(item: any) {
        return <span>{formatUnixTime(item.updatetime * 1000)}</span>
      },
    },
    {
      title: 'Operations',
      dataIndex: '',
      key: 'd',
      width: 200,
      render(item: any) {
        return (
          <>
            <Button onClick={() => onSyncCoinInfo(item)} mr4>Sync</Button>
            <Button onClick={() => onDetail(item)}>Detail</Button>
          </>
        )
      },
    },
  ]

  const getCoin = async (currentPage: number, pageSize?: number) => {
    const data = {
      currentPage: currentPage || 1,
      pageSize: pageSize || 10
    }
    const res = await traderApi.getCoinApi(data)
    console.log('success', res);

    setCoinData(res)
    if (res.code === 200) {
      console.log('success', res);
    } else {
      console.log("Sync failed")
    }
  }

  const onSearch = async () => {
    console.log('onSearch');
    // const res = await apiService.filterCoinlList({ symbol: searchSymbol })
    // console.log('res', res);
    // setCoinData(res)
  }

  useEffect(() => {
    getCoin(1)
  }, [])

  return (
    <>
      <Header />

      <Box pb='50px' mt='20px'>
        <Box toCenterX mb='20px'>
          <Box w='90%'>
            <Box flex w='400px'>
              <Input
                placeholder="Seach coin"
                value={searchSymbol}
                onChange={(e) => setSearchSymbol(e.target.value)}
              />
              <Button ml2 onClick={onSearch}>Search</Button>
            </Box>
          </Box>
        </Box>

        <Box toCenterX>
          <Box className='table-box-container'>
            <Table columns={columns} data={coinData} className='table-box' />
          </Box>
        </Box>

        <Box toCenterX mt='20px' mb='20px'>
          <Box w='90%'>
            <Button onClick={onPrePage}>上一页</Button>  当前页：{currentPage} <Button onClick={onNextPage}>下一页</Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
