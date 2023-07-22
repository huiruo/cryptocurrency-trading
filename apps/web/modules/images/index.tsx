import React from 'react'
import useFetchImg from '@hooks/useFetchImages'
import { Button } from 'antd'
import { Table as AntTable } from 'antd'
import { codePlatformApi } from '@services/code.platform'

export function Image() {
  const [images, isLoading] = useFetchImg()
  if (isLoading) {
    console.log('isLoading:', images)
  }

  const onRunImg = async (item) => {
    const params = { ...item }
    const res = await codePlatformApi.buildDockerImage(params)
    const data = await res.json()
    console.log('onRunImg-res', data)
    if (data.code === 1) {
      console.log('onRunImg-sus')
    } else {
      console.log('onRunImg', data.msg)
    }
  }

  const onStopImg = () => {
    console.log('onStopImg')
  }

  const columns = [
    { id: 'id', title: 'id', dataIndex: 'id', key: 'id', width: 100 },
    { id: 'name', title: 'name', dataIndex: 'name', key: 'name', width: 100 },
    {
      id: 'created',
      title: 'created',
      dataIndex: 'created',
      key: 'created',
      width: 100,
    },
    { id: 'size', title: 'size', dataIndex: 'size', key: 'size', width: 100 },
    {
      id: 'containers',
      title: 'containers',
      dataIndex: 'containers',
      key: 'containers',
      width: 100,
    },
    {
      id: 'action',
      title: 'Action',
      dataIndex: '',
      key: 'action',
      width: 150,
      render(item) {
        return (
          <>
            <Button
              type="primary"
              className="img-start-btn"
              onClick={() => onRunImg(item)}
            >
              运行
            </Button>
            <Button type="primary" danger onClick={onStopImg}>
              停止
            </Button>
          </>
        )
      },
    },
  ]

  return (
    <div className="App">
      <AntTable
        rowKey="id"
        columns={columns}
        dataSource={images}
        pagination={false}
      />
    </div>
  )
}
