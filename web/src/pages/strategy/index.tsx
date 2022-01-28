import React from 'react'
import Header from '../../components/header/index'
import StrategyTable from './strategyTable'

const Strategy =()=>{
  return (
    <div className='root-container'>
      <Header />
      <div style={{width:'100%',marginTop: '4rem'}}>
        <div style={{paddingLeft:'12rem',paddingRight:'12rem'}}>
          <StrategyTable />
        </div>
      </div>
    </div>
  );
}

export default Strategy;