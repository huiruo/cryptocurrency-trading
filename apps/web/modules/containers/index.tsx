import React, { ReactNode, useEffect } from 'react'
import { Button, message } from 'antd'
import { Table as AntTable } from 'antd'
import { codePlatformApi } from '@services/code.platform'
import useListContainers from '@hooks/useListContainers'
import { LoginSuccessPayload } from 'types'
import { useAppSelector } from '@stores/hooks'
import { countState } from '@stores/appSlice'
import { appStoreActions } from '@stores/appSlice'
import { useDispatch } from 'react-redux'

export interface Props {
  payload: LoginSuccessPayload
}

interface ContainerType {
  Id: string
  Image: string
  Names: string[]
  created: string
  State: string
  Status: string
}

export function Containers() {
  const count = useAppSelector(countState)
  const { loading, data = [], refetch } = useListContainers()

  // TODO: test
  const onAdd = (test): void => {
    console.log('test', test)
    const temp = count
    dispatch(appStoreActions.setCount(temp + 1))
  }

  const dispatch = useDispatch()

  const onRunContainer = async (item: ContainerType) => {
    console.log('docker', item)
    const params = { ...item, containerName: item.Names?.[0] }
    const data = await codePlatformApi.startContainer(params)
    console.log('onRunContainer-res', data)
    if (data.code === 1) {
      message.success(data.msg)
      console.log('重新刷新数据2')
      refetch()
    } else {
      const isObject =
        Object.prototype.toString.call(data.msg) === '[object Object]'
      message.warning(isObject ? JSON.stringify(data.msg) : data.msg)
    }
  }

  const onStopContainer = async (item: ContainerType) => {
    const params = { ...item, containerName: item.Names?.[0] }
    const data = await codePlatformApi.stopContainer(params)
    console.log('onStopContainer-res', data)
    if (data.code === 1) {
      message.success(data.msg)
      console.log('重新刷新数据1')
      refetch()
    } else {
      const isObject =
        Object.prototype.toString.call(data.msg) === '[object Object]'
      message.warning(isObject ? JSON.stringify(data.msg) : data.msg)
    }
  }

  const columns = [
    { id: 'Id', title: 'id', dataIndex: 'Id', key: 'Id', width: 100 },
    {
      id: 'Image',
      title: 'Image',
      dataIndex: 'Image',
      key: 'Image',
      width: 100,
    },
    {
      id: 'container',
      title: 'container name',
      dataIndex: '',
      key: 'container',
      width: 100,
      render(item: ContainerType) {
        console.log('item', item.Names)
        return (
          <div>
            {Array.isArray(item.Names) &&
              item.Names.map((cell: string, index) => {
                return <div key={index}>{cell}</div>
              })}
          </div>
        )
      },
    },
    {
      id: 'created',
      title: 'created',
      dataIndex: 'created',
      key: 'created',
      width: 100,
    },
    {
      id: 'State',
      title: 'State',
      dataIndex: 'State',
      key: 'State',
      width: 100,
    },
    {
      id: 'Status',
      title: 'Status',
      dataIndex: 'Status',
      key: 'Status',
      width: 100,
    },
    {
      id: 'action',
      title: 'Action',
      dataIndex: '',
      key: 'action',
      width: 200,
      render(item: ContainerType): ReactNode {
        return (
          <>
            {item.State !== 'exited' && (
              <Button
                type="primary"
                danger
                onClick={() => onStopContainer(item)}
              >
                停止
              </Button>
            )}
            {item.State === 'exited' && (
              <Button
                type="primary"
                className="common-right-mg"
                onClick={() => onRunContainer(item)}
              >
                运行
              </Button>
            )}
          </>
        )
      },
    },
  ]

  useEffect(() => {
    console.log('containers-component-useEffect')
  }, [])

  if (loading) return null

  return (
    <div className="App">
      <AntTable
        rowKey="Id"
        columns={columns}
        // 消除 TypeScript 中的警告
        dataSource={data?.length ? data : undefined}
        pagination={false}
      />
      <div>test: {count}</div>
      <div>
        <Button onClick={onAdd}>test add</Button>
      </div>
    </div>
  )
}
