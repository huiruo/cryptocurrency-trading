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
// import { Pagination } from '../pagination';

interface Props {
  closeOrders: SpotOrder[]
  spotTableCallBack(): void
}

const defaultRunning = 1

/**
 * Code annotation
 */
export const CloseStrategyModal = NiceModal.create((props: Props) => {
  const { visible, hide } = useModal()
  const { closeOrders, spotTableCallBack } = props
  const [strategies, setStrategies] = useState<StrategiesOrder[]>([])

  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
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
      alert("get Strategies orders error")
    }
  }

  const afterClose = () => {
    setSelectedRowKeys([])
    setSelectRowData([])
  }

  const onCloseStrategy = async () => {
    if (!selectedRowKeys.length) {
      toast.warning('Select empty')

      return
    }

    if (selectedRowKeys.length >= 2) {
      toast.warning('select Greater than 2')

      return
    }

    const toaster = toast.loading('Close Strategy...', { showLayer: true })

    const selectRow = get(selectRowData, `[0]`, {})
    if (!selectRow.is_running) {
      alert('This strategy was closed and cannot be updated')

      return
    }

    const params = {
      spotOrders: closeOrders,
      strategyOrder: selectRow,
    }

    const res = await traderApi.closeSpotStrategyApi(params)
    if (res.code === 200) {
      hide()
      spotTableCallBack()

      toaster.update('Close Strategy succeeded', {
        type: 'success',
        duration: 1000,
      })
    } else {
      toaster.update("Failed to close strategy", {
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
      header="Select Strategy to be closed"
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
          onChangeCallback={onChangeCallback}
          modalCallback={modalCallback}
          selectedRowKeys={selectedRowKeys}
          total={total}
        />
        <Box position='absolute' bottom0>
          <Button onClick={() => onCloseStrategy()} mr4>Close strategy</Button>
        </Box>
      </Box>
    </TradeModal>
  )
})
