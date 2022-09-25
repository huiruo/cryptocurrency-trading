import React, { useEffect, useState } from 'react';
import traderApi from '@/services/traderApi';
import { Table } from '@/components/Table/Table';
import { Button } from '@/components/Button';
import { formatUnixTime } from '@/utils';

/**
 * CODE ANNOTATION
 */
export function Balances() {

  const [balances, setBalances] = useState<any>([])

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

      setBalances(res.data)
    } else {
      console.log("get balances error")
    }
  }

  const columns = [
    { id: 'asset', title: 'asset', dataIndex: 'asset', key: 'asset', width: 100 },
    { id: 'free', title: 'free', dataIndex: 'free', key: 'free', width: 100 },
    { id: 'locked', title: 'locked', dataIndex: 'locked', key: 'locked', width: 100 },
    {
      id: 'updateTime', title: 'updateTime', dataIndex: '', key: 'updateTime', width: 100,
      render(item: any) {
        return <span>{formatUnixTime(item.updateTime)}</span>
      },
    },
  ]

  useEffect(() => {
    getBalances()
  }, [])

  return <div>
    <div>
      <Button onClick={() => onSyncBalances()} mr4>Sync balances</Button>
    </div>
    <div>
      <Table columns={columns} data={balances} />
    </div>
  </div>;
}
