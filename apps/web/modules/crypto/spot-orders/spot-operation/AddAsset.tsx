import React, { useRef } from 'react'
import { Modal, Button, Form, Input, FormInstance, message } from 'antd'
import { AssetType } from '@services/spot.type'
import { spotApi } from '@services/spot'
import { SUCCESS } from '@common/constants'

interface Props {
  isModalOpen: boolean
  addAssetCallBack: (isModalOpen: boolean, isSucceed?: boolean) => void
}

export default function AddAsset(props: Props) {
  const { isModalOpen, addAssetCallBack } = props
  const formRef = useRef<FormInstance>(null)

  const onFinish = async (values: AssetType) => {
    const res = await spotApi.addAsset(values)
    if (res.code === SUCCESS) {
      setTimeout(() => {
        addAssetCallBack(false, true)
      }, 500)
    } else {
      message.error(res.msg || 'Failed to add resource')
    }
  }

  const handleOk = () => {
    // setIsModalOpen(false)
  }

  const onCancel = () => {
    addAssetCallBack(false)
    formRef.current?.resetFields()
  }

  return (
    <Modal
      title="Add Asset"
      footer={null}
      open={isModalOpen}
      onOk={handleOk}
      onCancel={onCancel}
    >
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 16 }}
        style={{ maxWidth: 600 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        ref={formRef}
        autoComplete="off"
      >
        <Form.Item
          label="symbol"
          name="symbol"
          rules={[{ required: true, message: 'Please input symbol' }]}
        >
          <Input placeholder="Please input symbol" />
        </Form.Item>

        <Form.Item
          label="asset"
          name="name"
          rules={[{ required: true, message: 'Input asset,like XXXUSDT' }]}
        >
          <Input placeholder="Input asset,like XXXUSDT" />
        </Form.Item>

        <Form.Item
          label="tradeUrl"
          name="tradeUrl"
          rules={[{ required: false, message: 'Please input tradeUrl' }]}
        >
          <Input placeholder="Please input tradeUrl" />
        </Form.Item>

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button type="primary" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}
