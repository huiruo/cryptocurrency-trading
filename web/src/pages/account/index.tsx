import React from 'react'
import Header from '../../components/header/index'
import CryptoWallet from './cryptoWallet'
import SpotOrder from './spotOrder'

const Account =()=>{

  return (
    <div style={{width:'100%'}}>
      <Header />
      <div style={{width:'100%'}}>
        <div style={{paddingLeft:'12rem',paddingRight:'12rem'}}>
          <div style={{marginTop:'2rem'}}>
            <CryptoWallet />
          </div>
          <div style={{marginTop:'4rem'}}>
            <SpotOrder />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;