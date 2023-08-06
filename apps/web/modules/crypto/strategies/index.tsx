import React, { useEffect } from 'react'
import { StgTable } from './StgTable'
import { StrategieyFilter } from './StrategieyFilter'

export default function Strategies() {
  useEffect(() => {
    console.log('strategies-1')
  }, [])

  return (
    <div className="strategy-container">
      <StrategieyFilter />
      <StgTable />
    </div>
  )
}
