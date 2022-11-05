import React, { useEffect, useState } from 'react';
import traderApi from '@/services/traderApi';
import { Table } from '@/common/table';
import { useDocumentTitle } from "@/utils/useDocumentTitle"
import { Button } from '@/common/button';
import { formatUnixTime } from '@/utils';
import Header from '@/components/header';
import { Box } from '@fower/react';
import { BalancesType } from '@/utils/types';

/**
 * CODE ANNOTATION
 */
export function Balances() {

  const [balances, setBalances] = useState<BalancesType[]>([])

  useDocumentTitle("balances order");

  const getBalances = async () => {
    const res = await traderApi.balancesApi()
    if (res.code === 200) {

      setBalances(res.data)
    } else {
      alert("get balances error")
    }
  }

  const onSyncBalances = async () => {
    const res = await traderApi.syncBalancesApi()
    if (res.code === 200) {
      getBalances()
    } else {
      alert("get balances error")
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
