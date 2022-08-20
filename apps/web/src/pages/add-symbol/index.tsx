import React, { useState } from 'react';
import Header from '@/components/Header';
import { Input } from '@/components/Input';
import { Button } from '@/components/Button';
import traderApi from '@/services/traderApi';
import SymbolList from './symbol-list';

/**
 * add symbol form server
 */
function AddSymbol() {
  const [code, setCode] = useState('')
  const [symbol, setSymbol] = useState('')
  const [baseAsset, setbaseAsset] = useState('')

  const onAdd = async () => {
    /*
    {
    "symbol":"BTCUSDT",
    "baseAsset":"BTC",
    "quoteAsset":"USDT",
    "code":"bitcoin",
    "addlink":1,
    "webp":1
    }
    */
    const data = {
      symbol,
      baseAsset,
      code
    }
    const res = await traderApi.addSimplifySymbol(data)
    if (res.code === 200) {
      console.log('success');
    } else {
      console.log("同步失败")
    }
  }

  return (
    <div className='root-container'>
      <Header />
      <div className='container symbol-container' style={{ paddingTop: '20px' }} >
        <div className='add-symbol'>
          <div className='custom-input'>
            <Input onChange={(e) => { setSymbol(e.target.value) }} value={symbol} placeholder="Please enter symbol code" />
          </div>

          <div className='custom-input'>
            <Input onChange={(e) => { setbaseAsset(e.target.value) }} value={baseAsset} placeholder="Please enter base asset" />
          </div>

          <div className='custom-input'>
            <Input onChange={(e) => { setCode(e.target.value) }} value={code} placeholder="Please enter code" />
          </div>

          <div style={{ width: '200px', paddingTop: '20px' }}>
            <Button w-100p onClick={() => { onAdd() }} size="lg">
              add
            </Button>
          </div>
        </div>

        <SymbolList />
      </div>

    </div>
  )
}

export default AddSymbol;