import React, { useState, useEffect, forwardRef, useImperativeHandle } from 'react';
import NiceModal from '@ebay/nice-modal-react'
import { Box } from '@fower/react';
import { formatUnixTime } from '@/utils';
import { Button } from '@/common/button';
import traderApi from '@/services/traderApi';
import { SearchParmas, SpotOrder } from '@/utils/types';
import { MergeStrategyModal } from '@/components/merge-strategy-modal';
import { CloseStrategyModal } from '@/components/close-strategy-modal';
import { toast } from '@/common/toast';
import { isEmpty } from 'lodash';
import { Pagination, Table as AntTable } from 'antd';

interface Props {
  selectAssetValue: string
  spotCallBack: (searchParmas: SearchParmas) => void
}

const strategyStatusMap = [
  'original',
  'running',
  'ended'
]

/**
 * Code annotation
 */
export const SpotTable = forwardRef((props: Props, ref) => {
  const { spotCallBack, selectAssetValue } = props
  const [spotOrders, setSpotOrders] = useState<SpotOrder[]>([])

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectRowData, setSelectRowData] = useState<SpotOrder[]>([])
  const [total, setTotal] = useState<number>(1);
  const [pageSize, setPageSize] = useState<number>(10);
  const [currentPage, setCurrentPage] = useState<number>(1);

  useImperativeHandle(ref, () => ({
    getOrders: (params: SearchParmas, isUpdate: boolean) => {
      console.log('getOrder', params, isUpdate);
      getSpotOrders(params, isUpdate)
    }
  }));

  const oncreateStrategy = async () => {
    if (!selectedRowKeys.length) {
      toast.warning('select empty')

      return
    }

    selectRowData.sort((a: SpotOrder, b: SpotOrder) => {
      return Number(a.time) - Number(b.time);
    })

    const isStrategyRelatedOrder = isStrategyRelatedOrderUtil(selectRowData)
    if (isStrategyRelatedOrder) {
      toast.warning('Can not select closed order to create')

      return
    }

    createStrategyUtil(selectRowData)
  }

  const createStrategyUtil = async (order: SpotOrder[]) => {

    const toaster = toast.loading('create strategy...', { showLayer: true })

    const res = await traderApi.createSpotStrategyApi(order)
    if (res.code === 200) {
      const params = {
        symbol: ''
      }
      // spotCallBack(params)
      getSpotOrders(params)
      setSelectRowData([])
      setSelectedRowKeys([])

      toaster.update('create Strategy succeeded', {
        type: 'success',
        duration: 1000,
      })

    } else {
      toaster.update("Failed to create Strategy", {
        type: 'error',
      })
    }
  }

  const isStrategyRelatedOrderUtil = (selectRowData: SpotOrder[]): boolean => {
    let isStrategyRelatedOrder = false
    selectRowData.forEach(item => {
      const { strategyId } = item
      if (strategyId) {
        isStrategyRelatedOrder = true
      }
    })

    return isStrategyRelatedOrder
  }

  const onResetOrderStatus = (item: SpotOrder) => {
    console.log('item', item);
    toast.warning('Currently not supported')
  }

  const onRebuildOrderStatus = async (item: SpotOrder) => {
    if (item.strategyStatus === 2) {
      toast.warning('Can not reset ended order')
      return
    }

    const toaster = toast.loading('Reset order...', { showLayer: true })

    const res = await traderApi.resetSpotOrderStatus(item)
    if (res.code === 200) {
      const params = {
        symbol: ''
      }
      getSpotOrders(params)
      setSelectRowData([])
      setSelectedRowKeys([])

      toaster.update('Reset order succeeded', {
        type: 'success',
        duration: 1000,
      })
    } else {
      toaster.update("Failed to reset order", {
        type: 'error',
      })
    }
  }

  const onMergeStrategy = () => {
    if (!selectedRowKeys.length) {
      toast.warning('select empty')

      return
    }

    const isStrategyRelatedOrder = isStrategyRelatedOrderUtil(selectRowData)
    if (isStrategyRelatedOrder) {
      toast.warning('Can not select closed order to merge')
      return
    }

    selectRowData.sort((a: SpotOrder, b: SpotOrder) => {
      return Number(b.time) - Number(a.time);
    })

    NiceModal.show('mergeStrategyModal')
    /*
    NiceModal.show(MergeStrategyModal, selectRowData).then((selectRowData) => {
      // userModal.show(MergeStrategyModal,selectRowData).then((selectRowData) => {
      // setUsers([newUser, ...users]);
    });
    */
  }

  const onCloseStrategy = async () => {
    if (!selectedRowKeys.length) {
      toast.warning('select empty')

      return
    }

    const isStrategyRelatedOrder = isStrategyRelatedOrderUtil(selectRowData)
    if (isStrategyRelatedOrder) {
      toast.warning('Can not select closed order to close')
      return
    }

    selectRowData.sort((a: SpotOrder, b: SpotOrder) => {
      return Number(a.time) - Number(b.time);
    })

    NiceModal.show('closeStrategyModal')
  }

  const spotTableCallBack = () => {
    const params = {
      symbol: ''
    }
    getSpotOrders(params)
    setSelectRowData([])
    setSelectedRowKeys([])
  }

  const columns = [
    {
      id: 'time', title: 'Date', dataIndex: '', key: 'time', width: 100,
      render(item: SpotOrder) {
        return <Box w='145px'>{formatUnixTime(Number(item.time))}</Box>
      },
    },
    { id: 'symbol', title: 'Symbol', dataIndex: 'symbol', key: 'symbol', width: 100 },
    {
      id: 'isBuyer', title: 'Side', dataIndex: '', key: 'isBuyer', width: 100,
      render(item: SpotOrder) {
        return <Box>
          {item.isBuyer ? <Box as='span' color='#0ECB81'>BUY</Box>
            : <Box as='span' color='#F6465D'>SELL</Box>}
        </Box>
      },
    },
    /*
    0 : original 1 : running 2 : ended
    */
    {
      id: 'strategyStatus', title: 'Status', dataIndex: '', key: 'strategyStatus', width: 100,
      render(item: SpotOrder) {
        return <Box as='span' mr='5px'>{strategyStatusMap[item.strategyStatus]}</Box>
      },
    },
    {
      id: 'action', title: 'Action', dataIndex: '', key: 'action', width: 100,
      render(item: SpotOrder) {
        return <>
          {item.strategyStatus === 0 && <Box as='button' cursor='pointer' color='#fff' bg='#0ECB81' rounded-4px onClick={() => createStrategyUtil([item])}>Create</Box>}
          {item.strategyStatus === 1 && <Box as='button' cursor='pointer' color='#fff' bg='#ff7875' rounded-4px onClick={() => onRebuildOrderStatus(item)}>Rebuild</Box>}
          {item.strategyStatus === 2 && <Box as='button' cursor='pointer' color='#fff' bg='#d9d9d9' rounded-4px onClick={() => onResetOrderStatus(item)}>Reset</Box>}
        </>
      },
    },
    { id: 'price', title: 'Price', dataIndex: 'price', key: 'price', width: 100 },
    {
      id: 'qty', title: 'qty', dataIndex: '', key: 'qty', width: 100,
      render(item: SpotOrder) {
        return <Box>
          <Box>{item.qty}</Box>
          <Box>{item.quoteQty}</Box>
        </Box>
      },
    },
    { id: 'orderId', title: 'OrderId', dataIndex: 'orderId', key: 'orderId', width: 100 },
    {
      id: 'strategyId', title: 'StrategyId', dataIndex: '', key: 'strategyId', width: 100,
      render(item: SpotOrder) {
        return <Box>
          <Box>{item.strategyId}</Box>
          <Box>UserId:{item.userId}</Box>
        </Box>
      },
    },
    { id: 'commission', title: 'Commission', dataIndex: 'commission', key: 'commission', width: 100 },
    { id: 'commissionAsset', title: 'CommissionAsset', dataIndex: 'commissionAsset', key: 'commissionAsset' },
    { id: 'isMaker', title: 'IsMaker', dataIndex: 'isMaker', key: 'isMaker', width: 100 },
    { id: 'isBestMatch', title: 'IsBestMatch', dataIndex: 'isBestMatch', key: 'isBestMatch', width: 100 },
    {
      id: 'updatedAt', title: 'Updated', dataIndex: '', key: 'updatedAt', width: 100,
      render(item: any) {
        return <Box w='145px'>{formatUnixTime(item.updatedAt)}</Box>
      },
    },
  ]

  const onChangePage = (page: number, pageSize: number) => {
    const params = {
      currentPage: page,
      pageSize: pageSize,
      symbol: ''
    }
    setCurrentPage(currentPage)
    getSpotOrders(params)
  }

  const onShowSizeChange = (page: number, pageSize: number) => {
    setPageSize(pageSize)
    setCurrentPage(page)
  }

  const rowSelection = {
    selectedRowKeys,
    onChange: (selectedRowKeys: React.Key[], selectedRows: SpotOrder[]) => {
      // console.log(`${selectedRowKeys}`, '--', 'selectedRows: ', selectedRows);
      setSelectedRowKeys(selectedRowKeys);
      setSelectRowData(selectedRows)
    },
    /*
    getCheckboxProps: (record: SpotOrder) => (
      {
      disabled: record.name === 'Disabled User', // Column configuration not to be checked
      name: record.name,
    }
    ),
    */
  };

  const getSpotOrders = async (params: SearchParmas, isUpdate = false) => {
    const { symbol, currentPage: current, pageSize: size } = params
    const data = {
      currentPage: current || currentPage,
      pageSize: size || pageSize,
      symbol: symbol || selectAssetValue
    }

    // console.log('params', params);
    // console.log('data', data);

    const res = await traderApi.spotOrdersApi(data)
    if (res.code === 200) {
      if (isUpdate) {
        toast.success('Get orders succeeded')
      }

      setTotal(res.data.total)
      setCurrentPage(data.currentPage)
      setSpotOrders(res.data.res)
    } else {
      toast.error('Failed to get orders')
    }
  }

  useEffect(() => {
    if (!isEmpty(selectedRowKeys)) {
      console.log('clear selected');
      setSelectedRowKeys([]);
    }
  }, [spotOrders])

  useEffect(() => {
    const params = {
      currentPage: 1,
      pageSize: pageSize,
      symbol: ''
    }
    getSpotOrders(params)
  }, [])

  return (
    <Box className='table-box-container' mt-10px>
      <AntTable
        rowSelection={rowSelection}
        rowKey="id"
        columns={columns} dataSource={spotOrders} className='table-box'
        pagination={false}
      />
      <Box mt-10 mb-10>
        <Button onClick={() => oncreateStrategy()} mr4>Create strategy</Button>
        <Button onClick={() => onMergeStrategy()} mr4>Merge strategy</Button>
        <Button onClick={() => onCloseStrategy()} mr4>Close strategy</Button>
      </Box>
      <MergeStrategyModal id='mergeStrategyModal' mergeOrders={selectRowData} spotTableCallBack={() => spotTableCallBack()} />
      <CloseStrategyModal id='closeStrategyModal' closeOrders={selectRowData} spotTableCallBack={() => spotTableCallBack()} />
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
  );
})
