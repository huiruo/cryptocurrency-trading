import Header from '../../components/Header/index.tsx'
// import Footer from '../../components/Footer/index.tsx'
import React from 'react'
import { Box } from '@fower/react'
import CenterPanel from './centerPanel.tsx'
import OrderOperation from './orderOperation.tsx'
import UserPanel from './userPanel.tsx'

const Trader=()=>{

  return (
    <Box column h='100%' w='100%' minH='8.5rem' style={{margin:'0 auto',flex:'1'}}>
			<Header/>
      <CenterPanel />
      <Box flex h='3.88rem'>
        <UserPanel />
        <OrderOperation />
      </Box>
    </Box>
  );
}

export default Trader;