import React from 'react';
import Header from '@/components/header';
import { ProfitStatistics } from '../profit-statistics';

/**
 * home
 */
function Home() {

  return (
    <div className='root-container'>
      <Header />
      <ProfitStatistics />
    </div >
  );
}

export default Home;