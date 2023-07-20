import React, { useState } from 'react';
import { Button } from '@/common/button';
import traderApi from '@/services/traderApi';
import { FiterStrategyOrderType, SpotOrder, StrategiesOrder } from '@/utils/types';
import { Box } from '@fower/react';
import { get } from 'lodash';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { TradeModal } from '../modal';
import { StrategieyModalTable } from '../strategiey-modal-table';
import { toast } from '@/common/toast';


interface Props {
  mergeOrders: SpotOrder[]
  spotTableCallBack(): void
}

const defaultRunning = 1

/**
 * Code annotation
 */
export const MergeStrategyModal = NiceModal.create((props: Props) => {
  const { visible, hide } = useModal()
  const { mergeOrders, spotTableCallBack } = props
  const [strategies, setStrategies] = useState<StrategiesOrder[]>([])

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([]);
  const [selectRowData, setSelectRowData] = useState<StrategiesOrder[]>([])
  const [total, setTotal] = useState<number>(1);

  const getStrategies = async (params: FiterStrategyOrderType) => {
    const { currentPage, pageSize, is_running } = params
    const data = {
      currentPage: currentPage || 1,
      pageSize: pageSize || 10,
      is_running
    }
    const res = await traderApi.strategiesOrderApi(data)
    if (res.code === 200) {
      setTotal(res.data.total)
      setStrategies(res.data.res)
    } else {
      toast.error('Failed to get Strategies orders')
    }
  }

  const afterClose = () => {
    setSelectedRowKeys([])
    setSelectRowData([])
  }

  const onMergeStrategy = async () => {
    if (!selectedRowKeys.length) {
      toast.warning('Select empty')

      return
    }

    if (selectedRowKeys.length >= 2) {
      toast.warning('select Greater than 2')

      return
    }

    const selectRow = get(selectRowData, `[0]`, {}) as StrategiesOrder
    if (!selectRow.is_running) {
      toast.warning('This strategy was closed and cannot be updated')

      return
    }

    const toaster = toast.loading('Sync spot order...', { showLayer: true })

    const params = {
      spotOrders: mergeOrders,
      strategyOrder: selectRow,
    }

    const res = await traderApi.mergeSpotStrategy(params)
    if (res.code === 200) {
      toaster.update('Merge spot strategy succeeded', {
        type: 'success',
        duration: 1000,
      })
      hide()
      spotTableCallBack()
    } else {
      toaster.update("Failed to merge strategy error", {
        type: 'error',
      })
    }
  }

  const modalCallback = (params: any) => {
    params.is_running = defaultRunning
    getStrategies(params)
  }

  const onChangeCallback = (selectedRowKeys: React.Key[], selectedRows: StrategiesOrder[]) => {
    setSelectedRowKeys(selectedRowKeys);
    setSelectRowData(selectedRows)
  }

  return (
    <TradeModal
      showMask={true}
      showCloseButton={true}
      maskClosable={true}
      header="Select Strategy to merge orders"
      width='70%'
      height='600px'
      isVisible={visible}
      onClose={hide}
      onOpen={() => getStrategies({
        currentPage: 1,
        pageSize: 10,
        is_running: defaultRunning
      })}
      afterClose={() => afterClose()}
    >
      <Box position='relative' h='560px'>
        <StrategieyModalTable
          data={strategies}
          modalCallback={modalCallback}
          onChangeCallback={onChangeCallback}
          selectedRowKeys={selectedRowKeys}
          total={total}
        />
        <Box mt-10 position='absolute' bottom0>
          <Button onClick={() => onMergeStrategy()} mr4>Merge strategy</Button>
        </Box>
      </Box>
    </TradeModal>
  )
})
