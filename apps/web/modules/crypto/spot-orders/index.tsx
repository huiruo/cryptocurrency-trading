import React from 'react'
import SpotOperation from './spot-operation'
import SpotTable from './SpotTable'

export default function SpotOrders() {
  return (
    <div className="spot-container">
      <SpotOperation />
      <SpotTable />
    </div>
  )
}
