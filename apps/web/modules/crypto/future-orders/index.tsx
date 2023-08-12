import React from 'react'
import SpotOperation from './future-operation'
import { FutureTable } from './FutureTable'

export function FutureOrders() {
  return (
    <div className="spot-container">
      <SpotOperation />
      <FutureTable />
    </div>
  )
}
