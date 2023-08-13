import React from 'react'
import { FutureOperation } from './future-operation'
import { FutureTable } from './FutureTable'

export function FutureOrders() {
  return (
    <div className="future-container">
      <FutureOperation />
      <FutureTable />
    </div>
  )
}
