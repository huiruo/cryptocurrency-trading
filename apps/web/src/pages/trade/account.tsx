import React, { useEffect, useState } from 'react';
import traderApi from '@/services/traderApi';

/**
 * 注释
 */
export function TradeAccount() {

  const [spotData, setSpotData] = useState<any>([])

  const getCoin = async () => {
    const res = await traderApi.getAccountInfoApi()
    console.log('success', res);

    if (res.code === 200) {
      console.log('success', res);
      // setCoinData(res)
    } else {
      console.log("同步失败")
    }
  }


  useEffect(() => {
    getCoin()
  }, [])

  return <div>app</div>;
}

// export default App;
