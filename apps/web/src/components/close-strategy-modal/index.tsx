import React, { useState } from 'react';
import { Button } from '@/common/button';
import traderApi from '@/services/traderApi';
import { FiterStrategyOrderType, SpotOrder, StrategiesOrder } from '@/utils/types';
import { Box } from '@fower/react';
import { get } from 'lodash';
import NiceModal, { useModal } from '@ebay/nice-modal-react';
import { TradeModal } from '../modal';
import { StrategieyModalTable } from '../strategiey-modal-table';
import { Pagination } from '../pagination';
import { toast } from '@/common/toast';


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
  const [selectRows, setSelectRows] = useState<number[]>([])
  const [currentPage, setCurrentPage] = useState<number>(1);

  const getStrategies = async (params: FiterStrategyOrderType) => {
    const { currentPage, pageSize, is_running } = params
    const data = {
      currentPage: currentPage || 1,
      pageSize: pageSize || 10,
      is_running
    }
    const res = await traderApi.strategiesOrderApi(data)
    if (res.code === 200) {
      setStrategies(res.data)
    } else {
      alert("get Strategies orders error")
    }
  }

  const afterClose = () => {
    setSelectRows([])
    setCurrentPage(1)
  }

  const onCloseStrategy = async () => {
    if (!selectRows.length) {
      alert('select empty')

      return
    }

    if (selectRows.length >= 2) {
      alert('select Greater than 2')

      return
    }

    const toaster = toast.loading('Close Strategy...', { showLayer: true })

    const index = get(selectRows, '[0]', 0)
    const selectRow = get(strategies, `${[index]}`, 0)
    if (!selectRow.is_running) {
      alert('This strategy was closed and cannot be updated')

      return
    }

    const strategyOrder = { ...selectRow }
    const params = {
      spotOrders: closeOrders,
      strategyOrder,
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

  const onPage = (currentPage: number, pageSize: number) => {
    const params = {
      currentPage,
      pageSize,
      is_running: defaultRunning
    }
    setCurrentPage(currentPage)
    getStrategies(params)
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
        <StrategieyModalTable data={strategies}
          onChangeCallback={setSelectRows}
          selectRows={selectRows}
        />
        <Box flex mb-8px>
          <Pagination onChange={onPage} currentPage={currentPage} />
        </Box>
        <Box position='absolute' bottom0>
          <Button onClick={() => onCloseStrategy()} mr4>Close strategy</Button>
        </Box>
      </Box>
    </TradeModal>
  )
})
