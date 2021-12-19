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
        <Box px='1.2rem' pt='.rem'>
          <Box mt='.2rem'>
            <Box>加密钱包:</Box>
            <CryptoWallet />
          </Box>
          <Box mt='.4rem'>
            <Box h='.2rem' leading='.2rem'>交易对</Box>
            <SpotOrder />
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default Account;