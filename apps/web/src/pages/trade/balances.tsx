import React, { useEffect, useState } from 'react';
import traderApi from '@/services/traderApi';
import { Table } from '@/components/Table/Table';
import { useDocumentTitle } from "@/utils/useDocumentTitle"
import { Button } from '@/components/Button';
import { formatUnixTime } from '@/utils';
import Header from '@/components/Header';
import { Box } from '@fower/react';
import { BalancesTypes } from '@/utils/types';

/**
 * CODE ANNOTATION
 */
export function Balances() {

  const [balances, setBalances] = useState<BalancesTypes[]>([])

  useDocumentTitle("balances order");

  const getBalances = async () => {
    const res = await traderApi.balancesApi()
    if (res.code === 200) {

      setBalances(res.data)
    } else {
      console.log("get balances error")
    }
  }

  const onSyncBalances = async () => {
    const res = await traderApi.syncBalancesApi()
    if (res.code === 200) {
      console.log('success');
      getBalances()
    } else {
      console.log("get balances error")
    }
  }

  const columns = [
    { id: 'asset', title: 'Symbol', dataIndex: 'asset', key: 'asset', width: 100 },
    { id: 'free', title: 'Free', dataIndex: 'free', key: 'free', width: 100 },
    { id: 'locked', title: 'Locked', dataIndex: 'locked', key: 'locked', width: 100 },
    {
      id: 'updatedAt', title: 'Updated', dataIndex: '', key: 'updatedAt', width: 100,
      render(item: any) {
        return <span>{formatUnixTime(item.updatedAt)}</span>
      },
    },
    // {
    //   id: 'createdAt', title: 'createdAt', dataIndex: '', key: 'createdAt', width: 50,
    //   render(item: any) {
    //     return <span>{formatUnixTime(item.createdAt)}</span>
    //   },
    // },
  ]

  useEffect(() => {
    getBalances()
  }, [])

  return (
    <>
      <Header />

      <Box pb='50px' mt='20px'>
        <Box toCenterX mb='20px'>
          <Box w='90%'>
            <Button onClick={() => onSyncBalances()} mr4>Sync balances</Button>
          </Box>
        </Box>

        <Box toCenterX>
          <Box className='table-box-container'>
            <Table columns={columns} data={balances} className='table-box' />
          </Box>
        </Box>
      </Box>
    </>
  );
}
