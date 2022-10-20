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
      toast.error('Failed to get Strategies orders')
    }
  }

  const afterClose = () => {
    setSelectRows([])
    setCurrentPage(1)
  }

  const onMergeStrategy = async () => {
    if (!selectRows.length) {
      toast.warning('Select empty')

      return
    }

    if (selectRows.length >= 2) {
      toast.warning('select Greater than 2')

      return
    }

    const index = get(selectRows, '[0]', 0)
    const selectRow = get(strategies, `${[index]}`, 0)
    if (!selectRow.is_running) {
      toast.warning('This strategy was closed and cannot be updated')

      return
    }


    const toaster = toast.loading('Sync spot order...', { showLayer: true })

    const strategyOrder = { ...selectRow }
    const params = {
      spotOrders: mergeOrders,
      strategyOrder,
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
        <StrategieyModalTable data={strategies}
          onChangeCallback={setSelectRows}
          selectRows={selectRows}
        />
        <Box flex mb-8px>
          <Pagination onChange={onPage} currentPage={currentPage} />
        </Box>
        <Box mt-10 position='absolute' bottom0>
          <Button onClick={() => onMergeStrategy()} mr4>Merge strategy</Button>
        </Box>
      </Box>
    </TradeModal>
  )
})
