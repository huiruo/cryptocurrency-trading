import React, { useEffect, useState } from 'react';
import traderApi from '@/services/traderApi';
import { formatUnixTime } from '@/utils';
import { Button } from '@/common/button';
import { Box } from '@fower/react';
import { Input } from '@/common/input';
import { Pagination, Table as AntTable } from 'antd';
import Header from '@/components/header';
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
  const [searchSymbol, setSearchSymbol] = useState<string>('')
  const [total, setTotal] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const navigate = useNavigate();

  useDocumentTitle("coin list");

  const onDetail = async (item: any) => {
    // push(`/coin/detail?code=${item.code}`)
  }

  const onSyncCoinInfo = async (item: any) => {
    const data = {
      code: item.code
    }
    await traderApi.syncCoinInfoApi(data)
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
    if (res.code === 200) {
      setCoinData(res.data.res)
      setTotal(res.data.total)
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

  const onShowSizeChange = (page: number, pageSize: number) => {
    setPageSize(pageSize)
    setCurrentPage(page)
  }

  const onChangePage = (page: number, pageSize: number) => {
    console.log('onChangePage page, pageSize', page, pageSize)
    setCurrentPage(page)
    // const params = {
    //   currentPage: page,
    //   pageSize: pageSize,
    //   symbol: '',
    // }
    getCoin(page, pageSize)
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
            <AntTable
              columns={columns}
              dataSource={coinData}
              className='table-box'
              pagination={false}
            />
          </Box>
        </Box>

        <Box toCenterX mt='20px' mb='20px'>
          <Box w='90%'>
            {/* <Button onClick={onPrePage}>Previous page</Button>  Current Page：{currentPage} <Button onClick={onNextPage}>Next page</Button> */}
            <Pagination
              current={currentPage}
              total={total}
              pageSizeOptions={["10", "20", "40"]}
              showTotal={total => `Total:${total}`}
              showSizeChanger={true}
              onChange={onChangePage}
              onShowSizeChange={onShowSizeChange}
            />
          </Box>
        </Box>
      </Box>
    </>
  );
}
