import React from 'react'
import { StgTable } from './StgTable'
import { StrategieyFilter } from './StrategieyFilter'

export default function Strategies() {
  return (
    <div className="strategy-container">
      <StrategieyFilter />
      <StgTable />
    </div>
  )
}
