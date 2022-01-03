import React from 'react'
import { Box } from '@fower/react'
import Header from '../../components/Header/index'
import CryptoWallet from './cryptoWallet'
import SpotOrder from './spotOrder'

const Account =()=>{

  return (
    <Box w='100%'>
      <Header />
      <Box w='100%'>
        <Box px='1.2rem'>
          <Box mt='.2rem'>
            <CryptoWallet />
          </Box>
          <Box mt='.4rem'>
            <SpotOrder />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Account;