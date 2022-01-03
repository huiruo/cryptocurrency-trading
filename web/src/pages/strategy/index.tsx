import React from 'react'
import { Box } from '@fower/react'
import Header from '../../components/Header/index'
import StrategyTable from './strategyTable'

const Strategy =()=>{
  return (
    <Box w='100%'>
      <Header />
      <Box w='100%' mt='.4rem'>
        <Box px='1.2rem'>
          <StrategyTable />
        </Box>
      </Box>
    </Box>
  );
}

export default Strategy;