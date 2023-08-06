import React, { useEffect, useState } from 'react'
import { Button, Modal, message } from 'antd'
import NiceModal, { useModal } from '@common/nice-modal'
import { SpotOrder } from '@services/spot.type'
import { StgOrder, StgOrders, StgOrdersParams } from '@services/strategy.type'
import { ModalTable } from './ModalTable'
import { SUCCESS, defaultRunning } from '@common/constants'
import { strategyApi } from '@services/strategy'

interface Props {
  modalCallBack(): void
  title: string
  closeOrders: SpotOrder[]
}

export const StgCloseModal = NiceModal.create((props: Props) => {
  const { closeOrders, title, modalCallBack } = props
  const { visible, hide, remove } = useModal()
  const [straOrders, setStgOrders] = useState<StgOrders>({
    data: [],
    total: 0,
    currentPage: 1,
    pageSize: 10,
  })
  const [selectedRowKeys, setSelectedRowKeys] = useState<React.Key[]>([])
  const [selectRowData, setSelectRowData] = useState<StgOrder[]>([])
  // const [total, setTotal] = useState<number>(1)

  const getStgOrdersUtil = async (strategyOrdersParams: StgOrdersParams) => {
    const res = await strategyApi.getStgOrders(strategyOrdersParams)
    if (res.code === SUCCESS) {
      setStgOrders(res.data)
    } else {
      message.error(res.msg || 'error')
    }
  }

  const handleOk = () => {
    hide()
  }

  const onCancel = () => {
    console.log('onCancel==>')
    hide()
    // addAssetCallBack(false)
    // formRef.current?.resetFields()
  }

  const modalCallback = (params: StgOrdersParams) => {
    getStgOrdersUtil(params)
  }

  const afterOpenChange = (open: boolean) => {
    if (open) {
      getStgOrdersUtil({
        currentPage: 1,
        pageSize: 10,
        is_running: defaultRunning,
        symbol: '',
      })
    }
  }

  const onChangeCallback = (
    selectedRowKeys: React.Key[],
    selectedRows: StgOrder[],
  ) => {
    setSelectedRowKeys(selectedRowKeys)
    setSelectRowData(selectedRows)
  }

  const onCloseStrategy = async () => {
    console.log('onCloseStrategy:')

    if (!selectedRowKeys.length) {
      message.warning('Select empty')

      return
    }

    if (selectedRowKeys.length >= 2) {
      message.warning('Select Greater no more than 2')

      return
    }

    const selectRow = selectRowData[0]
    if (!selectRow.is_running) {
      message.warning('This strategy was closed and cannot be updated')

      return
    }

    const res = await strategyApi.closeStg({
      spotOrders: closeOrders,
      stgOrder: selectRow,
    })

    if (res.code === SUCCESS) {
      message.success(res.msg)
      modalCallBack()
      setTimeout(() => {
        hide()
      }, 1000)
    } else {
      message.error(res.msg)
    }
  }

  useEffect(() => {
    console.log('strategies-5')
  }, [])

  return (
    <Modal
      title={title}
      footer={null}
      open={visible}
      onOk={handleOk}
      afterOpenChange={afterOpenChange}
      onCancel={onCancel}
      afterClose={() => remove()}
      width="80%"
    >
      <div className="modal-stg-table">
        <Button onClick={onCloseStrategy} danger className="common-bottom-mg">
          Close strategy
        </Button>
        <ModalTable
          onChangeCallback={onChangeCallback}
          modalCallback={modalCallback}
          selectedRowKeys={selectedRowKeys}
          straOrders={straOrders}
          stgStatus={defaultRunning}
        />
      </div>
    </Modal>
  )
})
