import React, { useState } from 'react';
import Header from '@/components/Header';
import { Input } from '@/common/input';
import { Button } from '@/common/button';
import traderApi from '@/services/traderApi';
import { useDocumentTitle } from '@/utils/useDocumentTitle';

/**
 * Add asset
 */
export function AddAsset() {
  const [tradeName, setTradeName] = useState('')
  const [symbol, setSymbol] = useState('')
  const [code, setCode] = useState('')

  useDocumentTitle("Add asset");

  const onAdd = async () => {
    /*
    {
    "name":"BTCUSDT",
    "symbol":"BTC",
    "code":"bitcoin",
    }
    */
    console.log('onAdd');

    const data = {
      name: tradeName,
      symbol,
      code
    }
    const res = await traderApi.addAssetApi(data)
    if (res.code === 200) {
      console.log('success');
      setSymbol('')
      setTradeName('')
      setCode('')
    } else {
      console.log(res.message)
    }
  }

  return (
    <div className='root-container'>
      <Header />
      <div className='container symbol-container' style={{ paddingTop: '20px' }} >
        <div className='add-symbol'>
          <div className='custom-input'>
            <Input onChange={(e) => { setTradeName(e.target.value) }} value={tradeName} placeholder="Please enter asset" />
          </div>

          <div className='custom-input'>
            <Input onChange={(e) => { setSymbol(e.target.value) }} value={symbol} placeholder="Please enter symbol" />
          </div>

          <div className='custom-input'>
            <Input onChange={(e) => { setCode(e.target.value) }} value={code} placeholder="Please enter code" />
          </div>

          <div style={{ width: '200px', paddingTop: '20px' }}>
            <Button w-100p onClick={() => onAdd()} size="lg">
              Add
            </Button>
          </div>
        </div>
      </div>

    </div>
  )
}
