import RcTable from 'rc-table'
import { Box } from '@fower/react'

interface Props {
  rowKey?: string
  columns: any[]
  data: any
  className?: string
}

export const Table = ({ columns, data, rowKey = 'id', className: classNames }: Props) => {
  return (
    <RcTable
      columns={columns}
      data={data}
      rowKey={rowKey}
      components={{
        table: (props: any) => (
          <Box
            as="table"
            w-100p
            {...props}
            css={{
              borderCollapse: 'collapse',
            }}
          />
        ),
        header: {
          cell: (props: any) => (
            <Box as="th" borderBottom-2 borderGray200 px3 py2 textLeft {...props} />
          ),
        },
        body: {
          row: (props: any) => <Box as="tr" {...props} />,
          cell: (props: any) => (
            <Box
              as="td"
              borderBottom
              borderBottomGray200
              px3
              py2
              textLeft
              {...props}
              contentEditable={false}
            />
          ),
        },
      }}
      className={classNames}
    />
  )
}
