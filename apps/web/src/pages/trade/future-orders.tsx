import React, { useEffect, useState } from 'react';
import traderApi from '@/services/traderApi';
import { Table } from '@/components/Table/Table';
import { Button } from '@/components/Button';
import { formatUnixTime } from '@/utils';

/**
 * CODE ANNOTATION
 */
export function FutureOrders() {

  const [currentPage, setCurrentPage] = useState(1)
  const [futureOrders, setFutureOrders] = useState<any>([])

  const getFutureOrders = async (currentPage: number, pageSize?: number) => {
    const data = {
      currentPage: currentPage || 1,
      pageSize: pageSize || 10
    }
    const res = await traderApi.futureOrdersApi(data)
    if (res.code === 200) {

      setFutureOrders(res.data)
    } else {
      console.log("get future orders error")
    }
  }

  const onSyncFutureOrder = async () => {
    const res = await traderApi.syncFutureOrderApi()
    if (res.code === 200) {
      console.log('success');

      // setFutureOrders(res.data)
    } else {
      console.log("get future orders error")
    }
  }

  useEffect(() => {
    getFutureOrders(1)
  }, [])

  const columns = [
    { id: 'orderId', title: 'orderId', dataIndex: 'orderId', key: 'orderId', width: 100 },
    { id: 'symbol', title: 'symbol', dataIndex: 'symbol', key: 'symbol', width: 100 },
    { id: 'status', title: 'status', dataIndex: 'status', key: 'status', width: 100 },
    { id: 'origQty', title: 'origQty', dataIndex: 'origQty', key: 'origQty', width: 100 },
    { id: 'cumQuote', title: 'cumQuote', dataIndex: 'cumQuote', key: 'cumQuote', width: 100 },
    { id: 'price', title: 'price', dataIndex: 'price', key: 'price', width: 100 },
    { id: 'side', title: 'side', dataIndex: 'side', key: 'side', width: 100 },
    { id: 'type', title: 'type', dataIndex: 'type', key: 'type', width: 100 },
    { id: 'avgPrice', title: 'avgPrice', dataIndex: 'avgPrice', key: 'avgPrice', width: 100 },
    {
      id: 'updateTime', title: 'updateTime', dataIndex: '', key: 'updateTime', width: 100,
      render(item: any) {
        return <span>{formatUnixTime(Number(item.updateTime))}</span>
      },
    },
    { id: 'clientOrderId', title: 'clientOrderId', dataIndex: 'clientOrderId', key: 'clientOrderId', width: 100 },
    { id: 'executedQty', title: 'executedQty', dataIndex: 'executedQty', key: 'executedQty', width: 100 },
    { id: 'timeInForce', title: 'timeInForce', dataIndex: 'timeInForce', key: 'timeInForce', width: 100 },
    {
      id: 'reduceOnly', title: 'reduceOnly', dataIndex: 'reduceOnly', key: 'reduceOnly', width: 100,
      render(item: any) {
        return <span>{item.reduceOnly ? 'ture' : 'false'}</span>
      },
    },
    {
      id: 'closePosition', title: 'closePosition', dataIndex: 'closePosition', key: 'closePosition', width: 100,
      render(item: any) {
        return <span>{item.closePosition ? 'ture' : 'false'}</span>
      },
    },
    { id: 'positionSide', title: 'positionSide', dataIndex: 'positionSide', key: 'positionSide', width: 100 },
    { id: 'stopPrice', title: 'stopPrice', dataIndex: 'stopPrice', key: 'stopPrice', width: 100 },
    { id: 'workingType', title: 'workingType', dataIndex: 'workingType', key: 'workingType', width: 100 },
    {
      id: 'priceProtect', title: 'priceProtect', dataIndex: 'priceProtect', key: 'priceProtect', width: 100,
      render(item: any) {
        return <span>{item.priceProtect ? 'ture' : 'false'}</span>
      },
    },
    { id: 'origType', title: 'origType', dataIndex: 'origType', key: 'origType', width: 100 },
  ]


  return <div>
    <div>
      <Button onClick={() => onSyncFutureOrder()} mr4>Sync future orders</Button>
    </div>
    <div>
      <Table columns={columns} data={futureOrders} />
    </div>
  </div>;
}
