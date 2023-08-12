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
      message.success(res.msg)
      setTimeout(() => {
        addAssetCallBack(false, true)
        formRef.current?.resetFields()
      }, 500)
    } else {
      message.error(res.msg || 'Failed to add resource')
    }
  }

  const onCancel = () => {
    addAssetCallBack(false)
    formRef.current?.resetFields()
  }

  return (
    <Modal
      title="Add symbol"
      footer={null}
      open={isModalOpen}
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
          rules={[{ required: true, message: 'such as BTC or ETH' }]}
        >
          <Input placeholder="such as BTC or ETH" />
        </Form.Item>

        <Form.Item
          label="asset"
          name="name"
          rules={[
            { required: true, message: 'symbol + asset,such as BTCUSDT' },
          ]}
        >
          <Input placeholder="symbol + asset,such as BTCUSDT" />
        </Form.Item>

        {/* <Form.Item
          label="tradeUrl"
          name="tradeUrl"
          rules={[{ required: true, message: 'Please input tradeUrl,like ' }]}
        >
          <Input placeholder="Please input tradeUrl" />
        </Form.Item> */}

        <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
          <Button className="bright-btn" htmlType="submit">
            Submit
          </Button>
        </Form.Item>
      </Form>
    </Modal>
  )
}
