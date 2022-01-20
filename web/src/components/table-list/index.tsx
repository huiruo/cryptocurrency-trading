import React, { FC, useEffect, useState } from 'react'
import _ from 'lodash'
import './style.css'

interface TablistColumnsOption {
  title: string | React.ReactNode
  key: string
  render?: (text: string | number, row: object) => string | React.ReactNode
}

interface TableListProps {
  rowKey: string
  className?: string
  style?: React.CSSProperties
  headerStyle?: React.CSSProperties
  columns: Array<TablistColumnsOption>
  dataSource: Array<object>
  defaultSort?: string
}

const getContent = (
  render: undefined | ((text: string, row: object) => string | React.ReactNode),
  data: object,
  text: string
) => {
  if (typeof render !== 'function') return text
  return render(text, data)
}

/**
 * 表格组件
 * @param rowKey 唯一row key
 * @param defaultSort 默认排序项
 * @param columns 表格配置项
 * @param dataSource 数据源
 */
const TableList: FC<TableListProps> = ({
  rowKey,
  defaultSort = '',
  columns = [],
  className,
  dataSource = [],
  style,
  headerStyle ={}
}) => {
  // 排序字段
  const [sortKey, setSortKey] = useState(defaultSort)
  // 是否升序
  const [isAsc, setIsAsc] = useState(false)

  useEffect(() => {
    setSortKey(defaultSort)
  }, [defaultSort])

  const handleClickSort = (key: string) => {
    setSortKey(key)
    if (key === sortKey) setIsAsc(v => !v)
    else setIsAsc(false)
  }

  if (sortKey){
    dataSource = _.orderBy(
      dataSource,
      data => {
        if (
          _.get(data, sortKey) &&
          typeof _.get(data, sortKey) === 'string' &&
          /^([a-zA-Z]|[\u4e00-\u9fa5])*$/.test(_.get(data, sortKey))
        ) {
          return _.get(data, sortKey)
        }
        return _.isNil(_.get(data, sortKey)) ? (isAsc ? 100000000000 : -100000000000) : Number(_.get(data, sortKey))
      },
      isAsc ? 'asc' : 'desc'
    )
  }

  return (
    <>
      <table className={`table-content ${className||''}`} style={style || {}}>
        <thead className='table-thead' style={headerStyle || {}}>
          <tr>
            {columns.map((v, i) => (
              <td
                key={v?.key + '_title_' + i}
                className='table-thead-td'
                onClick={() => handleClickSort(v?.key)}
                style={{ width: _.round(100 / (_.get(columns, 'length') || 1), 2) + '%' }}
              >
                <span>{v.title}</span>
              </td>
            ))}
          </tr>
        </thead>
        
        <tbody className='table-tbody'>
          {dataSource.map((item, idx) => (
            <tr key={_.get(item, rowKey) +'_'+ idx} className='tbody-tr'>
              {columns.map((v, i) => (
                <td
                  key={v?.key + '_content_' + i}
                  className='td-item'
                  style={{ width: _.round(100 / (_.get(columns, 'length') || 1), 2) + '%' }}
                >
                  {getContent(v?.render, item, v?.key ? _.get(item, v?.key) : '')}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>

      {_.isEmpty(dataSource) && <div>暂无数据</div>}
    </>
  )
}

export default TableList