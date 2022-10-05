import React, { useEffect, useState } from 'react';
import traderApi from '@/services/traderApi';
import { Button } from '@/common/button';
import { useDocumentTitle } from '@/utils/useDocumentTitle';
import Header from '@/components/feader';
import { Box } from '@fower/react';
import { SpotTable } from './spot-table';
import { useNavigate } from 'react-router-dom';
import { Select } from '@/common/select';

/**
 * CODE ANNOTATION
 */
export function SpotOrders() {
  // const [currentPage, setCurrentPage] = useState(1)
  const [spotOrders, setSpotOrders] = useState<any>([])
  const [value, setValue] = useState<number | string>('')

  const navigate = useNavigate();

  useDocumentTitle("spot order");

  const getFutureOrders = async (currentPage: number, pageSize?: number) => {
    const data = {
      currentPage: currentPage || 1,
      pageSize: pageSize || 10
    }
    const res = await traderApi.spotOrdersApi(data)
    if (res.code === 200) {

      setSpotOrders(res.data)
    } else {
      console.log("get future orders error")
    }
  }

  const onSyncFutureOrder = async () => {
    const res = await traderApi.syncSpotOrderApi()
    if (res.code === 200) {
      console.log('success');
      getFutureOrders(1)
    } else {
      console.log("get future orders error")
    }
  }

  const onAddAsset = () => {
    navigate('/trade/addAsset')
  }

  useEffect(() => {
    getFutureOrders(1)
  }, [])

  return (
    <>
      <Header />

      <Box pb='50px' mt='20px'>

        <Box toCenterX mb='20px'>
          <Box w='90%'>
            <div>
              <Select
                width={140}
                size="sm"
                // options={[{ label: '全部策略', value: '' }, ...options]}
                options={[{ label: '全部策略', value: '1' }, { label: '全部策略2', value: '2' }]}
                value={value}
                onChange={(v: number) => {
                  setValue(v)
                  console.log('onChange', v)
                }}
              />
            </div>
            <Button onClick={() => onSyncFutureOrder()} mr4>Sync spot orders</Button>
            <Button ml2 onClick={onAddAsset}>Add code</Button>
          </Box>
        </Box>

        <SpotTable data={spotOrders} />
      </Box>
    </>
  );
}
