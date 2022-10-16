import React, { useEffect, useState } from 'react';
import traderApi from '@/services/traderApi';
import { formatUnixTime } from '@/utils';
import { Button } from '@/common/button';
import { Box } from '@fower/react';
import { Input } from '@/common/input';
import { Table } from '@/common/table';
import Header from '@/components/feader';
import { useDocumentTitle } from '@/utils/useDocumentTitle';
import { useNavigate } from 'react-router-dom';

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

  const navigate = useNavigate();

  useDocumentTitle("coin list");

  const onDetail = async (item: any) => {
    // push(`/coin/detail?code=${item.code}`)
  }

  const onSyncCoinInfo = async (item: any) => {
    const data = {
      code: item.code
    }
    const res = await traderApi.syncCoinInfoApi(data)
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

    setCoinData(res)
    if (res.code === 200) {
    } else {
      alert("Sync failed")
    }
  }

  const onSearch = async () => {
    alert('onSearch');
  }

  const onAddCode = () => {
    navigate('/coin/addCode')
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
            <Box flex>
              <Box flex w='400px'>
                <Input
                  placeholder="Seach coin"
                  value={searchSymbol}
                  onChange={(e) => setSearchSymbol(e.target.value)}
                />
                <Button ml2 onClick={onSearch}>Search</Button>
              </Box>

              <Button ml2 onClick={onAddCode}>Add code</Button>
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
            <Button onClick={onPrePage}>Previous page</Button>  Current Page：{currentPage} <Button onClick={onNextPage}>Next page</Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
